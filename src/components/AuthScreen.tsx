import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

import { images } from "@/constants/images";
import {
  BackChevron,
  SocialButton,
  VerificationModal,
} from "@/components/AuthShared";

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
  const [email, setEmail] = useState("alex@gmail.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const c = COPY[mode];

  const handleSubmit = () => setShowVerification(true);
  const handleVerified = () => router.replace("/");

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
            <Text className="text-body text-text-tertiary mb-4">{c.subheading}</Text>

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
              <Text className="text-body-sm text-text-tertiary mb-1 ml-1">Email</Text>
              <View className="w-full h-12 rounded-xl border border-border bg-white px-4 justify-center">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="text-body text-text-primary"
                  style={{ fontFamily: "Poppins-Regular" }}
                  placeholderTextColor="#9599A9"
                />
              </View>
            </View>

            {/* Password (sign-up only) */}
            {mode === "sign-up" && (
              <View className="mb-5">
                <Text className="text-body-sm text-text-tertiary mb-1 ml-1">Password</Text>
                <View className="w-full h-12 rounded-xl border border-border bg-white px-4 flex-row items-center">
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="flex-1 text-body text-text-primary"
                    style={{ fontFamily: "Poppins-Regular" }}
                    placeholderTextColor="#9599A9"
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

            {/* Submit */}
            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.85}
              className="bg-brand-purple w-full h-12 rounded-2xl items-center justify-center mb-4 shadow-lg"
            >
              <Text className="text-btn-lg text-white">{c.buttonLabel}</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-4">
              <View className="flex-1 h-px bg-border" />
              <Text className="text-body-sm text-text-muted mx-4">or continue with</Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* Social */}
            <View className="gap-2 mb-5">
              <SocialButton icon={<SocialIcon provider="google" />} label="Continue with Google" />
              <SocialButton icon={<SocialIcon provider="facebook" />} label="Continue with Facebook" />
              <SocialButton icon={<SocialIcon provider="apple" />} label="Continue with Apple" />
            </View>

            {/* Footer */}
            <View className="flex-row justify-center gap-1">
              <Text className="text-body text-text-tertiary">{c.footerQuestion} </Text>
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

      <VerificationModal visible={showVerification} onVerified={handleVerified} />
    </SafeAreaView>
  );
}
