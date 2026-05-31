import { View, Text, TouchableOpacity } from "react-native";
import { SpeakerIcon } from "@/components/icons";
import { spacing, borderRadius } from "@/theme/spacing";

type TeacherSpeechBubbleProps = {
  /** Phrase in the target language (e.g. Spanish) */
  targetPhrase: string;
  /** English translation */
  translation: string;
  /** Called when the speaker icon is pressed */
  onSpeakerPress?: () => void;
};

/**
 * Speech bubble displaying the AI teacher's current phrase.
 *
 * Shows target-language text prominently with English translation below
 * and a tappable speaker replay button. Includes a directional tail
 * and soft shadow for visual depth.
 */
export function TeacherSpeechBubble({
  targetPhrase,
  translation,
  onSpeakerPress,
}: TeacherSpeechBubbleProps) {
  return (
    <View style={{ position: "relative" }}>
      {/* Bubble body */}
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: borderRadius["3xl"],
          paddingHorizontal: spacing["2xl"],
          paddingVertical: spacing.xl,
          // Soft shadow — Modern Dark / Cinema Mobile
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        {/* Target language phrase */}
        <Text
          className="font-semibold text-lg text-text-primary"
          style={{ lineHeight: 28, marginBottom: spacing.xs }}
        >
          {targetPhrase}
        </Text>

        {/* English translation */}
        <Text
          className="font-regular text-base text-text-secondary"
          style={{ lineHeight: 24, marginBottom: spacing.lg }}
        >
          {translation}
        </Text>

        {/* Speaker replay button */}
        <TouchableOpacity
          onPress={onSpeakerPress}
          activeOpacity={0.7}
          accessibilityLabel="Replay phrase"
          accessibilityRole="button"
          style={{
            alignSelf: "flex-start",
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.sm,
            backgroundColor: "#EEECFF",
            borderRadius: borderRadius.full,
            paddingLeft: spacing.md,
            paddingRight: spacing.lg,
            paddingVertical: spacing.sm,
            minHeight: 44,
          }}
        >
          <SpeakerIcon size={18} />
          <Text className="font-medium text-sm text-brand-purple">
            Replay
          </Text>
        </TouchableOpacity>
      </View>

      {/* Triangle tail pointing down-right */}
      <View
        style={{
          position: "absolute",
          bottom: -10,
          right: 40,
          width: 0,
          height: 0,
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderTopWidth: 12,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: "#FFFFFF",
        }}
      />
    </View>
  );
}
