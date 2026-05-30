import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  InteractionManager,
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
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <TouchableOpacity
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
  onVerified,
}: {
  visible: boolean;
  onVerified: () => void;
}) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  const digits = code.replace(/\D/g, "").slice(0, 6).split("");

  const handleChange = (text: string) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 6);
    setCode(cleaned);
    if (cleaned.length === 6) {
      InteractionManager.runAfterInteractions(() => onVerified());
    }
  };

  const handleBoxPress = () => {
    inputRef.current?.focus();
  };

  if (!visible) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, justifyContent: "flex-end" }}
      className="absolute inset-0 z-50"
    >
      {/* Overlay */}
      <View className="absolute inset-0 bg-black/40" />

      {/* Modal card */}
      <View className="bg-white rounded-t-3xl px-6 pt-8 pb-10">
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
          className="flex-row justify-center gap-3 mb-6"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <View
              key={i}
              className={cn(
                "w-12 h-14 rounded-xl border-2 items-center justify-center",
                digits[i]
                  ? "border-brand-purple bg-brand-purple/5"
                  : "border-border"
              )}
            >
              <Text className="text-h3 text-text-primary">
                {digits[i] ?? ""}
              </Text>
            </View>
          ))}
        </TouchableOpacity>

        {/* Hidden input — drives the digit boxes */}
        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={handleChange}
          keyboardType="number-pad"
          maxLength={6}
          autoFocus
          caretHidden
          className="absolute opacity-0 h-0 w-0"
          aria-hidden
        />

        {/* Resend link */}
        <TouchableOpacity className="items-center">
          <Text className="text-body-sm text-brand-purple font-medium">
            Resend code
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
