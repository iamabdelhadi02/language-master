import { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
} from "react-native";
import {
  useCallStateHooks,
} from "@stream-io/video-react-native-sdk";

const BUTTON_SIZE = 88;
const RING_SIZE = BUTTON_SIZE + 16;

/**
 * Large hold-to-talk button with pulsing ring animation.
 *
 * The mic stays enabled at all times (audio track always published) so
 * Gemini doesn't see the user as having "left" between turns. The button
 * is a visual/tactile indicator:
 *
 * - **Press and hold** → your turn to speak (pulsing ring + purple glow).
 * - **Release** → your turn is done; Gemini responds via VAD detection.
 *
 * Gemini's built-in voice activity detection handles turn-taking naturally.
 *
 * Must be rendered inside `<StreamCall>`.
 */
export function PushToTalkButton() {
  const { useMicrophoneState } = useCallStateHooks();
  const { status: micStatus } = useMicrophoneState();

  const [isPressed, setIsPressed] = useState(false);
  // Stable Animated.Value — useState initialiser runs once.
  const [pulseAnim] = useState(() => new Animated.Value(1));
  const pulseLoop = useRef<Animated.CompositeAnimation | null>(null);

  // The mic stays enabled while the lesson is active — the audio track
  // is always published so Gemini never sees the user as having "left".
  // Push-to-talk is a visual/tactile indicator: hold while speaking,
  // release when done. Gemini's built-in VAD handles turn-taking.
  const isMicEnabled = micStatus === "enabled";

  // ── Pulse animation ──────────────────────────────────────────────────
  const startPulse = useCallback(() => {
    pulseLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );
    pulseLoop.current.start();
  }, [pulseAnim]);

  const stopPulse = useCallback(() => {
    pulseLoop.current?.stop();
    pulseAnim.setValue(1);
  }, [pulseAnim]);

  // ── Press handlers ───────────────────────────────────────────────────
  const handlePressIn = useCallback(() => {
    setIsPressed(true);
    startPulse();
  }, [startPulse]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
    stopPulse();
  }, [stopPulse]);

  // ── Label ────────────────────────────────────────────────────────────
  const label = isPressed ? "Release when done" : "Hold to talk";

  // ── Render ───────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      {/* Pulsing ring */}
      <Animated.View
        style={[
          styles.ring,
          {
            borderColor: isPressed
              ? "rgba(82, 56, 252, 0.5)"
              : "rgba(255,255,255,0.12)",
            transform: [{ scale: isPressed ? pulseAnim : 1 }],
            opacity: isPressed ? 0.6 : 1,
          },
        ]}
        pointerEvents="none"
      />

      {/* Main button */}
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityLabel={label}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: (isPressed || pressed) ? "#5238FC" : "rgba(255,255,255,0.15)",
            borderColor: (isPressed || pressed)
              ? "rgba(82, 56, 252, 0.4)"
              : "rgba(255,255,255,0.2)",
            transform: [{ scale: pressed ? 0.96 : 1 }],
          },
        ]}
      >
        {/* Mic icon (simple SVG via characters) */}
        <Text style={styles.icon}>🎤</Text>
      </Pressable>

      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Active indicator — shown while pressed */}
      {isPressed && (
        <View style={styles.activeBar}>
          <View style={styles.activeBarInner} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  ring: {
    position: "absolute",
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 2.5,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5238FC",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  icon: {
    fontSize: 36,
    lineHeight: 42,
  },
  label: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  activeBar: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(82, 56, 252, 0.2)",
    overflow: "hidden",
  },
  activeBarInner: {
    width: "100%",
    height: "100%",
    backgroundColor: "#5238FC",
    borderRadius: 2,
  },
});
