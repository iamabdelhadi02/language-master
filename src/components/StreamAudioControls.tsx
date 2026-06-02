import { View, Text, TouchableOpacity } from "react-native";
import {
  useCall,
  useCallStateHooks,
  CallingState,
} from "@stream-io/video-react-native-sdk";
import { useRouter } from "expo-router";

import { spacing } from "@/theme/spacing";
import {
  MicOffIcon,
  EndCallIcon,
  SpeakerIcon,
} from "@/components/icons";
import { PushToTalkButton } from "@/components/PushToTalkButton";

type StreamAudioControlsProps = {
  /** Called after the call is successfully left. */
  onCallEnded?: () => void;
};

/**
 * Audio-only call controls with push-to-talk interaction.
 *
 * The large center button is **hold-to-talk**: press and hold to speak to the
 * AI teacher, release to let the AI respond. This prevents audio collisions.
 *
 * Must be rendered inside `<StreamCall>` so `useCall()` and
 * `useCallStateHooks()` resolve the active call.
 */
export function StreamAudioControls({
  onCallEnded,
}: StreamAudioControlsProps) {
  const call = useCall();
  const router = useRouter();
  const { useMicrophoneState } = useCallStateHooks();
  const { isSpeakingWhileMuted } = useMicrophoneState();

  const hangup = async () => {
    if (!call || call.state.callingState === CallingState.LEFT) return;
    try {
      await call.leave();
      onCallEnded?.();
      router.back();
    } catch (err) {
      console.error("hangup error:", err);
    }
  };

  // ── Controls ──────────────────────────────────────────────────────

  return (
    <View
      style={{
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.sm,
      }}
    >
      {/* ═══════════════════════════════════════════
          Push-to-Talk — large center button
          ═══════════════════════════════════════════ */}
      <View style={{ alignItems: "center" }}>
        <PushToTalkButton />
      </View>

      {/* "You're muted" hint when speaking while muted */}
      {isSpeakingWhileMuted && (
        <View style={{ alignItems: "center", marginTop: spacing.sm }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.xs,
              borderRadius: 12,
              backgroundColor: "rgba(245, 158, 11, 0.12)",
            }}
          >
            <MicOffIcon size={12} color="#F59E0B" />
            <Text
              style={{
                color: "#F59E0B",
                fontSize: 11,
                fontWeight: "500",
              }}
              numberOfLines={1}
            >
              Hold the button to speak
            </Text>
          </View>
        </View>
      )}

      {/* ═══════════════════════════════════════════
          Bottom row — Speaker + End Call
          ═══════════════════════════════════════════ */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: spacing.lg,
        }}
      >
        {/* Speaker indicator (non-interactive) */}
        <View style={{ alignItems: "center", width: 64, minHeight: 44 }}>
          <View
            className="flex-center bg-white/15"
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              marginBottom: spacing.sm,
            }}
          >
            <SpeakerIcon size={22} color="#FFFFFF" />
          </View>
          <Text
            className="text-caption font-medium text-center text-white/60"
            numberOfLines={1}
          >
            Speaker
          </Text>
        </View>

        {/* End call */}
        <TouchableOpacity
          onPress={hangup}
          activeOpacity={0.7}
          accessibilityLabel="End call"
          accessibilityRole="button"
          style={{ alignItems: "center", width: 64, minHeight: 44 }}
        >
          <View
            className="flex-center bg-red"
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              marginBottom: spacing.sm,
            }}
          >
            <EndCallIcon size={22} color="#FFFFFF" />
          </View>
          <Text
            className="text-caption font-medium text-center text-red"
            numberOfLines={1}
          >
            End Call
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
