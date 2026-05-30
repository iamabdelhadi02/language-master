import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  InteractionManager,
  BackHandler,
} from "react-native";
import { cn } from "@/lib/cn";

/* ────────────────────────────────────────────
   Back Chevron
   ──────────────────────────────────────────── */

export function BackChevron() {
  return (
    <View className="w-8 h-8 items-center justify-center">
      <View
        className="w-2.5 h-2.5 border-t-2 border-l-2 border-text-primary"
        style={{ transform: [{ rotate: "-45deg" }] }}
      />
    </View>
  );
}

/* ────────────────────────────────────────────
   Social Button
   ──────────────────────────────────────────── */

export function SocialButton({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center justify-center gap-3 h-12 w-full rounded-2xl border border-border bg-white"
    >
      {icon}
      <Text className="text-btn text-text-primary">{label}</Text>
    </TouchableOpacity>
  );
}

/* ────────────────────────────────────────────
   Verification Modal
   ──────────────────────────────────────────── */
export function VerificationModal({
  visible,
  onVerify,
  onResend,
  onEdit,
  onClose,
  error,
}: {
  visible: boolean;
  onVerify: (code: string) => Promise<void>;
  onResend?: () => void;
  /** Called when the user edits the code after an error — parent can clear the error. */
  onEdit?: () => void;
  /** Called when the user dismisses the modal (backdrop tap, close button, Android back). */
  onClose?: () => void;
  error?: string | null;
}) {
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const digits = code.replace(/\D/g, "").slice(0, 6).split("");

  const handleChange = (text: string) => {
    if (verifying) return;
    const cleaned = text.replace(/\D/g, "").slice(0, 6);
    setCode(cleaned);

    // Clear the error as soon as the user starts editing
    if (error && cleaned.length > 0) {
      onEdit?.();
    }

    if (cleaned.length === 6) {
      setVerifying(true);
      InteractionManager.runAfterInteractions(async () => {
        try {
          await onVerify(cleaned);
        } finally {
          setVerifying(false);
        }
      });
    }
  };

  const handleBoxPress = () => {
    if (!verifying) inputRef.current?.focus();
  };



  // Android hardware back button
  useEffect(() => {
    if (!visible) return;
    const handler = () => {
      onClose?.();
      return true;
    };
    const sub = BackHandler.addEventListener("hardwareBackPress", handler);
    return () => sub.remove();
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "flex-end" }}
      className="absolute inset-0 z-50"
    >
      {/* Overlay — tappable to dismiss */}
      <Pressable
        onPress={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Modal card */}
      <View className="bg-white rounded-t-3xl px-6 pt-8 pb-10">
        {/* Close button */}
        {onClose && (
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.6}
            className="absolute top-4 right-4 w-8 h-8 items-center justify-center z-10"
          >
            <Text className="text-xl text-text-muted">✕</Text>
          </TouchableOpacity>
        )}

        {/* Heading */}
        <Text className="text-h2 text-text-primary text-center mb-2">
          Check your email
        </Text>
        <Text className="text-body text-text-tertiary text-center mb-8">
          We{"'"}ve sent a 6-digit code to your email address.
        </Text>

        {/* Digit boxes */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBoxPress}
          disabled={verifying}
          className="flex-row justify-center gap-3 mb-6"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <View
              key={i}
              className={cn(
                "w-12 h-14 rounded-xl border-2 items-center justify-center",
                error
                  ? "border-red bg-red/5"
                  : digits[i]
                    ? "border-brand-purple bg-brand-purple/5"
                    : "border-border",
              )}
            >
              <Text
                className={cn(
                  "text-h3",
                  verifying ? "text-text-muted" : "text-text-primary",
                )}
              >
                {digits[i] ?? ""}
              </Text>
            </View>
          ))}
        </TouchableOpacity>

        {/* Error message */}
        {error && (
          <Text className="text-body-sm text-red text-center mb-4">
            {error}
          </Text>
        )}

        {/* Hidden input — drives the digit boxes */}
        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={handleChange}
          keyboardType="number-pad"
          maxLength={6}
          autoFocus
          caretHidden
          editable={!verifying}
          className="absolute opacity-0 h-0 w-0"
          aria-hidden
        />

        {/* Resend link */}
        <TouchableOpacity
          onPress={onResend}
          disabled={verifying}
          className="items-center"
        >
          <Text
            className={cn(
              "text-body-sm font-medium",
              verifying ? "text-text-muted" : "text-brand-purple",
            )}
          >
            Resend code
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
