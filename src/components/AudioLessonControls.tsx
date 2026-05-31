import { View, Text, TouchableOpacity } from "react-native";
import { cn } from "@/lib/cn";
import { spacing } from "@/theme/spacing";
import {
  CameraIcon,
  MicIcon,
  MicOffIcon,
  SubtitlesIcon,
  EndCallIcon,
} from "@/components/icons";

type ControlDef = {
  key: string;
  label: string;
  isEndCall?: boolean;
};

const CONTROLS: ControlDef[] = [
  { key: "camera", label: "Camera" },
  { key: "mic", label: "Mic" },
  { key: "subtitles", label: "Subtitles" },
  { key: "end", label: "End Call", isEndCall: true },
];

type AudioLessonControlsProps = {
  activeControls: Record<string, boolean>;
  onToggle: (key: string) => void;
  onEndCall: () => void;
};

/**
 * Audio lesson call controls row.
 *
 * Camera, Mic, and Subtitles are toggle buttons with SVG icons
 * and clear active/inactive visual feedback. End Call is a
 * destructive red action that navigates back.
 *
 * All buttons meet ≥44pt touch targets (ui-ux-pro-max Priority 2).
 */
export function AudioLessonControls({
  activeControls,
  onToggle,
  onEndCall,
}: AudioLessonControlsProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        paddingHorizontal: spacing.sm,
      }}
    >
      {CONTROLS.map((control) => {
        const isActive = activeControls[control.key] ?? true;
        const isEnd = control.isEndCall;

        return (
          <TouchableOpacity
            key={control.key}
            onPress={() => (isEnd ? onEndCall() : onToggle(control.key))}
            activeOpacity={0.7}
            accessibilityLabel={
              isEnd
                ? "End call"
                : `${control.label} ${isActive ? "on" : "off"}, double-tap to toggle`
            }
            accessibilityRole="button"
            style={{
              alignItems: "center",
              width: 64,
              minHeight: 44,
            }}
          >
            {/* Circle button — 48×48px for comfortable touch */}
            <View
              className={cn(
                "flex-center",
                isEnd
                  ? "bg-red"
                  : isActive
                    ? "bg-white"
                    : "bg-white/25 border border-white/30",
              )}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                marginBottom: spacing.sm,
                ...(isEnd || !isActive
                  ? {}
                  : {
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 3 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      elevation: 4,
                    }),
              }}
            >
              {/* Icon */}
              {control.key === "camera" && (
                <CameraIcon
                  size={22}
                  color={isActive ? "#0A1334" : "#FFFFFF"}
                />
              )}
              {control.key === "mic" &&
                (isActive ? (
                  <MicIcon size={22} color="#0A1334" />
                ) : (
                  <MicOffIcon size={22} color="#EF4444" />
                ))}
              {control.key === "subtitles" && (
                <SubtitlesIcon
                  size={22}
                  color={isActive ? "#0A1334" : "#FFFFFF"}
                />
              )}
              {control.key === "end" && (
                <EndCallIcon size={22} color="#FFFFFF" />
              )}

              {/* Slash indicator for inactive non-end controls */}
              {!isActive && !isEnd && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 2,
                      height: 32,
                      backgroundColor: "rgba(255,255,255,0.6)",
                      borderRadius: 1,
                      transform: [{ rotate: "45deg" }],
                    }}
                  />
                </View>
              )}
            </View>

            {/* Label */}
            <Text
              className={cn(
                "text-caption font-medium text-center",
                isEnd
                  ? "text-red"
                  : isActive
                    ? "text-white"
                    : "text-white/40",
              )}
              numberOfLines={1}
            >
              {control.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
