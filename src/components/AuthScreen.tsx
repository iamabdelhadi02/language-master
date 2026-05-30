import { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import { useSSO } from "@clerk/expo";
import { useSignUp, useSignIn } from "@clerk/expo/legacy";

import { images } from "@/constants/images";
import {
  BackChevron,
  SocialButton,
  VerificationModal,
} from "@/components/AuthShared";

WebBrowser.maybeCompleteAuthSession();

/* ────────────────────────────────────────────
   Social Icon (consolidated)
   ──────────────────────────────────────────── */

function SocialIcon({ provider }: { provider: "google" | "facebook" | "apple" }) {
  const cfg = {
    google:  { glyph: "G", color: "#4285F4", bg: "transparent", font: "Poppins-SemiBold" as const, size: 14, rounded: false },
    facebook:{ glyph: "f", color: "#FFFFFF", bg: "#1877F2",    font: "Poppins-Bold"     as const, size: 12, rounded: true  },
    apple:   { glyph: "\uF8FF", color: "#000000", bg: "transparent", font: "Poppins-Bold"     as const, size: 16, rounded: false },
  }[provider];

  return (
    <View
      className="w-5 h-5 items-center justify-center"
      style={cfg.rounded ? { backgroundColor: cfg.bg, borderRadius: 9999 } : undefined}
    >
      <Text style={{ fontFamily: cfg.font, fontSize: cfg.size, color: cfg.color }}>
        {cfg.glyph}
      </Text>
    </View>
  );
}

/* ────────────────────────────────────────────
   Eye Icon (sign-up password toggle)
   ──────────────────────────────────────────── */

function EyeIcon({ visible }: { visible: boolean }) {
  return (
    <View className="w-5 h-5 items-center justify-center">
      {visible ? (
        <View className="w-4 h-3 border-2 border-text-muted rounded-full relative">
          <View className="absolute w-1.5 h-1.5 bg-text-muted rounded-full top-1/2 left-1/2" />
        </View>
      ) : (
        <View className="relative">
          <View className="w-4 h-3 border-2 border-text-muted rounded-full" />
          <View
            className="absolute w-5 h-0.5 bg-text-muted top-1/2 left-1/2"
            style={{
              transform: [{ rotate: "-30deg" }, { translateX: -10 }, { translateY: 1 }],
            }}
          />
        </View>
      )}
    </View>
  );
}

/* ────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────── */

/**
 * Extract a human-readable message from a Clerk error object.
 * Handles both thrown errors (ClerkAPIError) and resource-level
 * error payloads (e.g. verification failure results).
 */
function clerkErrorMessage(
  source: unknown,
  fallback: string,
): string {
  if (!source || typeof source !== "object") return fallback;
  const obj = source as Record<string, unknown>;
  // ClerkAPIError shape: { errors: [{ message: string }] }
  const errors = obj.errors as { message: string }[] | undefined;
  if (errors?.[0]?.message) return errors[0].message;
  // Standard Error
  if (obj.message && typeof obj.message === "string") return obj.message;
  return fallback;
}

/**
 * Find the email_code first factor on a SignIn resource and prepare it
 * (send the verification email). Returns false if the factor is unavailable.
 */
async function prepareEmailCodeFactor(
  signIn: NonNullable<ReturnType<typeof useSignIn>["signIn"]>,
): Promise<boolean> {
  const factor = signIn.supportedFirstFactors?.find(
    (f) => f.strategy === "email_code",
  );
  if (!factor) return false;
  await signIn.prepareFirstFactor({
    strategy: "email_code",
    emailAddressId: factor.emailAddressId,
  });
  return true;
}

/* ────────────────────────────────────────────
   Auth Screen
   ──────────────────────────────────────────── */

type AuthMode = "sign-up" | "sign-in";

const COPY = {
  "sign-up": {
    heading: "Create your account",
    subheading: "Start your language journey today \u2728",
    buttonLabel: "Sign Up",
    footerQuestion: "Already have an account?",
    footerLinkLabel: "Log in",
    footerHref: "/(auth)/sign-in",
  },
  "sign-in": {
    heading: "Welcome back",
    subheading: "Continue your language journey \u2728",
    buttonLabel: "Sign In",
    footerQuestion: "Don\u2019t have an account?",
    footerLinkLabel: "Sign Up",
    footerHref: "/(auth)/sign-up",
  },
} as const satisfies Record<AuthMode, Record<string, string>>;

export default function AuthScreen({ mode }: { mode: AuthMode }) {
  const router = useRouter();

  // ── Clerk hooks ────────────────────────────
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn();
  const { startSSOFlow } = useSSO();

  const clerkLoaded = mode === "sign-up" ? signUpLoaded : signInLoaded;

  // ── Form state ─────────────────────────────
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ── Flow state ─────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const openVerification = () => {
    setShowVerification(true);
    setModalKey((k) => k + 1);
  };

  const c = COPY[mode];

  // ── Sign Up handler ────────────────────────
  const handleSignUp = async () => {
    setFormError(null);
    setIsSubmitting(true);
    try {
      const result = await signUp!.create({
        emailAddress: email.trim(),
        password,
      });

      if (result.status === "complete") {
        if (result.createdSessionId && setActive) {
          await setActive({ session: result.createdSessionId });
        }
        router.replace("/");
        return;
      }

      await signUp!.prepareEmailAddressVerification();
      openVerification();
    } catch (err: unknown) {
      setFormError(
        clerkErrorMessage(err, "Something went wrong. Please try again."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Sign In handler (email code / OTP) ─────
  const handleSignIn = async () => {
    setFormError(null);
    setIsSubmitting(true);
    try {
      await signIn!.create({
        identifier: email.trim(),
      });

      const ok = await prepareEmailCodeFactor(signIn!);
      if (!ok) {
        setFormError(
          "Email code sign-in is not available. Please try another method.",
        );
        return;
      }

      openVerification();
    } catch (err: unknown) {
      setFormError(
        clerkErrorMessage(err, "Something went wrong. Please try again."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (mode === "sign-up") {
      handleSignUp();
    } else {
      handleSignIn();
    }
  };

  // ── Verification: Sign Up ──────────────────
  const verifySignUpCode = useCallback(
    async (code: string) => {
      setVerificationError(null);
      try {
        const result = await signUp!.attemptEmailAddressVerification({ code });

        if (result.status !== "complete") {
          setVerificationError(
            clerkErrorMessage(result, "Invalid code. Please check and try again."),
          );
          return;
        }

        if (result.createdSessionId && setActive) {
          await setActive({ session: result.createdSessionId });
        }
        router.replace("/");
      } catch (err: unknown) {
        setVerificationError(
          clerkErrorMessage(err, "Verification failed. Please try again."),
        );
      }
    },
    [signUp, setActive, router],
  );

  // ── Verification: Sign In ──────────────────
  const verifySignInCode = useCallback(
    async (code: string) => {
      setVerificationError(null);
      try {
        const result = await signIn!.attemptFirstFactor({
          strategy: "email_code",
          code,
        });

        if (result.status !== "complete") {
          setVerificationError(
            clerkErrorMessage(result, "Invalid code. Please check and try again."),
          );
          return;
        }

        if (result.createdSessionId && setActive) {
          await setActive({ session: result.createdSessionId });
        }
        router.replace("/");
      } catch (err: unknown) {
        setVerificationError(
          clerkErrorMessage(err, "Verification failed. Please try again."),
        );
      }
    },
    [signIn, setActive, router],
  );

  // ── Resend code handler ────────────────────
  const handleResend = useCallback(async () => {
    try {
      if (mode === "sign-up") {
        await signUp!.prepareEmailAddressVerification();
      } else {
        await prepareEmailCodeFactor(signIn!);
      }
      setVerificationError(null);
    } catch (err: unknown) {
      console.error("Resend code failed:", clerkErrorMessage(err, ""));
      setVerificationError("Failed to resend code. Please try again.");
    }
  }, [mode, signUp, signIn]);

  // ── Social auth handlers ───────────────────
  const handleSocialAuth = useCallback(
    async (strategy: "oauth_google" | "oauth_facebook" | "oauth_apple") => {
      try {
        const { createdSessionId, setActive: setSSOActive } =
          await startSSOFlow({
            strategy,
            redirectUrl: "languagemaster://oauth-callback",
          });
        if (createdSessionId && setSSOActive) {
          await setSSOActive({ session: createdSessionId });
          router.replace("/");
        }
      } catch (err: unknown) {
        console.error(`OAuth ${strategy} error:`, clerkErrorMessage(err, ""));
      }
    },
    [startSSOFlow, router],
  );

  // ── Loading state ──────────────────────────
  if (!clerkLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#5238FC" />
        </View>
      </SafeAreaView>
    );
  }

  const isButtonDisabled =
    !email.trim() ||
    (mode === "sign-up" && !password) ||
    isSubmitting;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-2 pb-6">
            {/* Back */}
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.6}
              className="mb-4 -ml-2"
            >
              <BackChevron />
            </TouchableOpacity>

            {/* Heading */}
            <Text className="text-h2 text-text-primary mb-1">{c.heading}</Text>
            <Text className="text-body text-text-tertiary mb-4">
              {c.subheading}
            </Text>

            {/* Mascot */}
            <View className="items-center mb-3">
              <Image
                source={images.mascotAuth}
                style={{ width: 110, height: 110 }}
                contentFit="contain"
              />
            </View>

            {/* Email */}
            <View className={mode === "sign-up" ? "mb-3" : "mb-5"}>
              <Text className="text-body-sm text-text-tertiary mb-1 ml-1">
                Email
              </Text>
              <View className="w-full h-12 rounded-xl border border-border bg-white px-4 justify-center">
                <TextInput
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    setFormError(null);
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="text-body text-text-primary"
                  style={{ fontFamily: "Poppins-Regular" }}
                  placeholderTextColor="#9599A9"
                  editable={!isSubmitting}
                />
              </View>
            </View>

            {/* Password (sign-up only) */}
            {mode === "sign-up" && (
              <View className="mb-5">
                <Text className="text-body-sm text-text-tertiary mb-1 ml-1">
                  Password
                </Text>
                <View className="w-full h-12 rounded-xl border border-border bg-white px-4 flex-row items-center">
                  <TextInput
                    value={password}
                    onChangeText={(t) => {
                      setPassword(t);
                      setFormError(null);
                    }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="flex-1 text-body text-text-primary"
                    style={{ fontFamily: "Poppins-Regular" }}
                    placeholderTextColor="#9599A9"
                    editable={!isSubmitting}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword((p) => !p)}
                    activeOpacity={0.5}
                    className="ml-3"
                  >
                    <EyeIcon visible={showPassword} />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Error message */}
            {formError && (
              <Text className="text-body-sm text-red mb-4 -mt-1 ml-1">
                {formError}
              </Text>
            )}

            {/* Submit */}
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.85}
              disabled={isButtonDisabled}
              className="bg-brand-purple w-full h-12 rounded-2xl items-center justify-center mb-4 shadow-lg"
              style={isButtonDisabled ? { opacity: 0.5 } : undefined}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text className="text-btn-lg text-white">{c.buttonLabel}</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-4">
              <View className="flex-1 h-px bg-border" />
              <Text className="text-body-sm text-text-muted mx-4">
                or continue with
              </Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* Social */}
            <View className="gap-2 mb-5">
              <SocialButton
                icon={<SocialIcon provider="google" />}
                label="Continue with Google"
                onPress={() => handleSocialAuth("oauth_google")}
              />
              <SocialButton
                icon={<SocialIcon provider="facebook" />}
                label="Continue with Facebook"
                onPress={() => handleSocialAuth("oauth_facebook")}
              />
              <SocialButton
                icon={<SocialIcon provider="apple" />}
                label="Continue with Apple"
                onPress={() => handleSocialAuth("oauth_apple")}
              />
            </View>

            {/* Footer */}
            <View className="flex-row justify-center gap-1">
              <Text className="text-body text-text-tertiary">
                {c.footerQuestion}{" "}
              </Text>
              <TouchableOpacity
                onPress={() => router.push(c.footerHref)}
                activeOpacity={0.6}
              >
                <Text
                  className="text-body text-brand-purple"
                  style={{ fontFamily: "Poppins-SemiBold" }}
                >
                  {c.footerLinkLabel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <VerificationModal
        key={modalKey}
        visible={showVerification}
        onVerify={
          mode === "sign-up" ? verifySignUpCode : verifySignInCode
        }
        onResend={handleResend}
        onEdit={() => setVerificationError(null)}
        onClose={() => setShowVerification(false)}
        error={verificationError}
      />
    </SafeAreaView>
  );
}
