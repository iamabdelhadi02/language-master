import { useCallback, useEffect, useRef, useMemo } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-native-sdk";

import { spacing, borderRadius } from "@/theme/spacing";

/** The vision agent's Stream user ID — used to distinguish teacher vs user captions. */
const TEACHER_USER_ID = "language-teacher";

type LiveCaptionsProps = {
  /** Whether captions are visible (controlled by the subtitles toggle). */
  visible: boolean;
};

/**
 * Displays real-time live captions for both the AI teacher's speech and the
 * user's own speech during an audio lesson.
 *
 * Uses Stream's built-in `useCallClosedCaptions` hook which receives
 * server-side speech-to-text results as WebSocket events.
 *
 * Must be rendered inside `<StreamCall>` so `useCall()` and
 * `useCallStateHooks()` resolve the active call.
 */
export function LiveCaptions({ visible }: LiveCaptionsProps) {
  const call = useCall();
  const { useCallClosedCaptions } = useCallStateHooks();
  const closedCaptions = useCallClosedCaptions();

  // ── Ref for auto-scrolling to the latest caption ─────────────────────
  const scrollRef = useRef<ScrollView>(null);

  // Scroll to bottom when new captions arrive
  useEffect(() => {
    if (closedCaptions.length > 0) {
      const timer = setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [closedCaptions.length]);

  // ── Keep captions visible indefinitely ───────────────────────────────
  useEffect(() => {
    call?.updateClosedCaptionSettings({
      visibilityDurationMs: 0,
      maxVisibleCaptions: 10,
    });
  }, [call]);

  // ── Derive speaker label ─────────────────────────────────────────────
  const getSpeakerLabel = useCallback(
    (speakerId: string): { label: string; isTeacher: boolean } => {
      if (speakerId === TEACHER_USER_ID) {
        return { label: "Teacher", isTeacher: true };
      }
      return { label: "You", isTeacher: false };
    },
    [],
  );

  // ── Data ─────────────────────────────────────────────────────────────
  const data = useMemo(() => closedCaptions, [closedCaptions]);

  // ── Render ───────────────────────────────────────────────────────────
  if (!visible || data.length === 0) return null;

  return (
    <View
      style={{
        marginHorizontal: spacing.lg,
        maxHeight: 160,
      }}
    >
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          gap: spacing.xs,
          paddingVertical: spacing.xs,
        }}
      >
        {data.map((item) => {
          const { label, isTeacher } = getSpeakerLabel(item.speaker_id);
          return (
            <View
              key={item.id || `${item.speaker_id}-${item.start_time}`}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingHorizontal: spacing.md,
                paddingVertical: spacing.xs,
                borderRadius: borderRadius.lg,
                backgroundColor: isTeacher
                  ? "rgba(82, 56, 252, 0.18)"
                  : "rgba(34, 197, 94, 0.15)",
                borderLeftWidth: 3,
                borderLeftColor: isTeacher ? "#5238FC" : "#22C55E",
              }}
            >
              {/* Speaker label */}
              <View style={{ minWidth: 52, marginRight: spacing.sm }}>
                <Text
                  className="text-[11px] font-semibold"
                  style={{
                    color: isTeacher ? "#A78BFA" : "#4ADE80",
                  }}
                >
                  {label}
                </Text>
              </View>

              {/* Caption text */}
              <Text
                className="text-white/90 text-body-sm flex-1"
                style={{ lineHeight: 20 }}
              >
                {item.text}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
