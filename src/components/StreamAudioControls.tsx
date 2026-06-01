import { View, Text, TouchableOpacity } from "react-native";
import {
  useCall,
  useCallStateHooks,
  CallingState,
} from "@stream-io/video-react-native-sdk";
import { useRouter } from "expo-router";

import { cn } from "@/lib/cn";
import { spacing } from "@/theme/spacing";
import {
  MicIcon,
  MicOffIcon,
  EndCallIcon,
  SpeakerIcon,
} from "@/components/icons";

type StreamAudioControlsProps = {
  /** Called after the call is successfully left. */
  onCallEnded?: () => void;
};

/**
 * Audio-only call controls that read live mic & call state
 * directly from the Stream Video SDK.
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
  const { status: micStatus, isSpeakingWhileMuted } = useMicrophoneState();

  const isMicEnabled = micStatus === "enabled";

  const toggleMic = async () => {
    if (!call) return;
    try {
      await call.microphone.toggle();
    } catch (err) {
      console.error("toggleMic error:", err);
    }
  };

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
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        paddingHorizontal: spacing.sm,
      }}
    >
      {/* Mic toggle */}
      <TouchableOpacity
        onPress={toggleMic}
        activeOpacity={0.7}
        accessibilityLabel={
          isMicEnabled
            ? "Microphone on, double-tap to mute"
            : "Microphone muted, double-tap to unmute"
        }
        accessibilityRole="button"
        style={{ alignItems: "center", width: 64, minHeight: 44 }}
      >
        <View
          className={cn(
            "flex-center",
            isMicEnabled
              ? "bg-white"
              : "bg-white/25 border border-white/30",
          )}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            marginBottom: spacing.sm,
            ...(isMicEnabled
              ? {
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }
              : {}),
          }}
        >
          {isMicEnabled ? (
            <MicIcon size={22} color="#0A1334" />
          ) : (
            <MicOffIcon size={22} color="#EF4444" />
          )}

          {/* Slash for muted state (MicOffIcon already includes slash) */}
        </View>

        <Text
          className={cn(
            "text-caption font-medium text-center",
            isMicEnabled ? "text-white" : "text-white/40",
          )}
          numberOfLines={1}
        >
          {isMicEnabled ? "Mic On" : "Muted"}
        </Text>

        {/* "You're muted" hint when speaking while muted */}
        {isSpeakingWhileMuted && (
          <Text
            style={{
              color: "#F59E0B",
              fontSize: 10,
              marginTop: 2,
              textAlign: "center",
            }}
            numberOfLines={1}
          >
            Speaking…
          </Text>
        )}
      </TouchableOpacity>

      {/* Speaker indicator (non-interactive — audio routing is auto-managed) */}
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
  );
}
