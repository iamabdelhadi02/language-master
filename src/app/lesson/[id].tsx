import { useState, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Image } from "expo-image";

import { getLesson } from "@/data/lessons";
import { getUnit } from "@/data/units";
import { getLanguage } from "@/data/languages";
import { images } from "@/constants/images";
import { colors } from "@/theme/colors";
import { spacing, borderRadius } from "@/theme/spacing";
import { fontSize } from "@/theme/typography";
import { TeacherSpeechBubble } from "@/components/TeacherSpeechBubble";
import { AudioLessonControls } from "@/components/AudioLessonControls";
import { LessonStatsCard } from "@/components/LessonStatsCard";
import {
  BackChevronIcon,
  CameraIcon,
  SubtitlesIcon,
  BellIcon,
  TimerIcon,
  OnlineDot,
} from "@/components/icons";

/** Default greeting per language code when a lesson has no phrases. */
const DEFAULT_GREETINGS: Record<string, { phrase: string; translation: string }> = {
  es: { phrase: "¡Hola! ¿Cómo estás?", translation: "Hello! How are you?" },
  fr: { phrase: "Bonjour ! Comment ça va ?", translation: "Hello! How are you?" },
  de: { phrase: "Hallo! Wie geht's?", translation: "Hello! How are you?" },
  ja: { phrase: "こんにちは！お元気ですか？", translation: "Hello! How are you?" },
};
const DEFAULT_GREETING = { phrase: "Hello! How are you?", translation: "Hello! How are you?" };

/** Stats ratings drawn from lesson feedback (simulated for audio-only). */
type StatRatings = "Excellent" | "Great" | "Good" | "Fair" | "NeedsWork";

/**
 * AI Teacher Audio Lesson screen.
 *
 * Opens when the user taps a lesson from the Learn tab.
 * Displays the AI teacher mascot, speech bubble with lesson phrases,
 * audio call controls, lesson goals, and feedback stats.
 *
 * Audio-only experience — no real video calling.
 * Styled per Modern Dark (Cinema Mobile) from ui-ux-pro-max.
 */
export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = id ? getLesson(id) : undefined;
  const unit = lesson ? getUnit(lesson.unitId) : undefined;
  const language = unit ? getLanguage(unit.languageCode) : undefined;

  // Control toggle state
  const [activeControls, setActiveControls] = useState<
    Record<string, boolean>
  >({
    camera: true,
    mic: true,
    subtitles: true,
  });

  // Current phrase index (cycles through lesson phrases)
  const [phraseIndex, setPhraseIndex] = useState(0);

  const currentPhrase = useMemo(() => {
    if (!lesson?.phrases.length) return null;
    return lesson.phrases[phraseIndex % lesson.phrases.length];
  }, [lesson, phraseIndex]);

  // Simulated stats
  const stats = useMemo(() => {
    const ratings: StatRatings[] = ["Excellent", "Great", "Good"];
    const i = phraseIndex % ratings.length;
    return {
      pronunciation: ratings[i],
      fluency: ratings[(i + 1) % ratings.length],
      vocabulary: ratings[(i + 2) % ratings.length],
    };
  }, [phraseIndex]);

  // Language-aware fallback greeting
  const defaultGreeting = useMemo(
    () => (language ? DEFAULT_GREETINGS[language.code] : undefined) ?? DEFAULT_GREETING,
    [language],
  );

  // ── Handlers ──────────────────────────────────────────────────────────

  const handleToggle = useCallback((key: string) => {
    setActiveControls((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleEndCall = useCallback(() => {
    router.back();
  }, []);

  const handleSpeakerPress = useCallback(() => {
    setPhraseIndex((prev) => prev + 1);
  }, []);

  // ── Not found ─────────────────────────────────────────────────────────

  if (!lesson || !language) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface.primary }}>
        <View className="flex-1 flex-center px-8">
          <Text className="text-h3 text-text-primary mb-2">
            Lesson not found
          </Text>
          <Text className="text-body text-text-tertiary text-center mb-6">
            {id
              ? `The lesson "${id}" does not exist.`
              : "No lesson specified."}
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="bg-brand-purple px-6 py-3 rounded-2xl"
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Text className="text-btn text-white">Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0C1A" }}>
      {/* Top ambient gradient — Modern Dark style */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 320,
          backgroundColor: "#1A173A",
          borderBottomLeftRadius: 48,
          borderBottomRightRadius: 48,
        }}
      />

      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 48 }}
          showsVerticalScrollIndicator={false}
        >
          {/* ═══════════════════════════════════════════
              Header
              ═══════════════════════════════════════════ */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: spacing.lg,
              paddingTop: spacing.sm,
              paddingBottom: spacing.md,
            }}
          >
            {/* Back button */}
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.6}
              accessibilityLabel="Go back"
              accessibilityRole="button"
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={{
                width: 44,
                height: 44,
                borderRadius: borderRadius.full,
                backgroundColor: "rgba(255,255,255,0.12)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BackChevronIcon size={24} />
            </TouchableOpacity>

            {/* Title + status */}
            <View style={{ flex: 1, alignItems: "center", marginHorizontal: spacing.md }}>
              <Text
                className="text-white font-bold text-lg"
                numberOfLines={1}
              >
                AI Teacher
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 2,
                }}
              >
                <OnlineDot size={8} />
                <Text
                  className="text-xs font-medium"
                  style={{ marginLeft: 6, color: "#22C55E" }}
                >
                  Online
                </Text>
              </View>
            </View>

            {/* Right action buttons */}
            <View style={{ flexDirection: "row", gap: spacing.sm }}>
              {/* Camera toggle */}
              <TouchableOpacity
                onPress={() => handleToggle("camera")}
                activeOpacity={0.6}
                accessibilityLabel={`Camera ${activeControls.camera ? "on" : "off"}, double-tap to toggle`}
                accessibilityRole="button"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: borderRadius.full,
                  backgroundColor: "rgba(255,255,255,0.12)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CameraIcon size={18} />
              </TouchableOpacity>

              {/* Subtitles toggle */}
              <TouchableOpacity
                onPress={() => handleToggle("subtitles")}
                activeOpacity={0.6}
                accessibilityLabel={`Subtitles ${activeControls.subtitles ? "on" : "off"}, double-tap to toggle`}
                accessibilityRole="button"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: borderRadius.full,
                  backgroundColor: "rgba(255,255,255,0.12)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SubtitlesIcon size={18} />
              </TouchableOpacity>

              {/* Bell */}
              <TouchableOpacity
                activeOpacity={0.6}
                accessibilityLabel="Notifications"
                accessibilityRole="button"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: borderRadius.full,
                  backgroundColor: "rgba(255,255,255,0.12)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BellIcon size={18} />
              </TouchableOpacity>
            </View>
          </View>

          {/* ═══════════════════════════════════════════
              Stage Area — 320px canvas matching HTML design exactly
              ═══════════════════════════════════════════ */}
          <View
            style={{
              marginHorizontal: spacing.md,
              marginTop: spacing.sm,
              height: 320,
              borderTopLeftRadius: borderRadius["3xl"],
              borderTopRightRadius: borderRadius["3xl"],
              overflow: "hidden",
              backgroundColor: "#2A265C",
            }}
          >
            {/* Decorative ambient blobs */}
            <View
              style={{
                position: "absolute",
                top: 40,
                left: 40,
                width: 160,
                height: 160,
                borderRadius: 80,
                backgroundColor: "rgba(94, 106, 210, 0.35)",
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: -30,
                width: 240,
                height: 240,
                borderRadius: 120,
                backgroundColor: "rgba(82, 56, 252, 0.25)",
              }}
            />
            <View
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 128,
                height: 128,
                borderRadius: 64,
                backgroundColor: "rgba(123, 99, 252, 0.2)",
                transform: [{ translateX: -64 }, { translateY: -64 }],
              }}
            />

            {/* Mascot — positioned at bottom center, matching HTML */}
            <View
              style={{
                position: "absolute",
                bottom: 8,
                left: 0,
                right: 0,
                alignItems: "center",
              }}
            >
              <Image
                source={images.mascotWelcome}
                style={{ width: 160, height: 180 }}
                contentFit="contain"
                accessibilityLabel="AI Teacher mascot"
              />
            </View>

            {/* User video PIP (placeholder — audio-only) */}
            <View style={{ position: "absolute", top: spacing.lg, right: spacing.lg }}>
              <View
                style={{
                  width: 88,
                  height: 118,
                  borderRadius: borderRadius["2xl"],
                  overflow: "hidden",
                  borderWidth: 2,
                  borderColor: "rgba(255,255,255,0.8)",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 6,
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "#1E1B4B",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={images.mascotAuth}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                    contentFit="cover"
                    accessibilityLabel="Your video preview"
                  />
                </View>

                {/* "You" label */}
                <View
                  style={{
                    position: "absolute",
                    bottom: 6,
                    left: 6,
                    right: 6,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    borderRadius: 6,
                    paddingVertical: 2,
                    alignItems: "center",
                  }}
                >
                  <Text className="text-white text-[10px] font-semibold">
                    You
                  </Text>
                </View>

                {/* Mic status dot */}
                <View
                  style={{
                    position: "absolute",
                    top: spacing.sm,
                    right: spacing.sm,
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.6)",
                    backgroundColor: activeControls.mic ? "#22C55E" : "#EF4444",
                  }}
                />
              </View>
            </View>
          </View>

          {/* ═══════════════════════════════════════════
              Speech Bubble (overlaps stage bottom)
              ═══════════════════════════════════════════ */}
          <View
            style={{
              marginHorizontal: spacing["2xl"],
              marginTop: -32,
              zIndex: 10,
            }}
          >
            <TeacherSpeechBubble
              targetPhrase={
                currentPhrase?.phrase ?? defaultGreeting.phrase
              }
              translation={
                currentPhrase?.translation ?? defaultGreeting.translation
              }
              onSpeakerPress={handleSpeakerPress}
            />
          </View>

          {/* ═══════════════════════════════════════════
              Lesson info bar
              ═══════════════════════════════════════════ */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: spacing.xl,
              gap: spacing.md,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 24, marginRight: spacing.sm }}>
                {language.flag}
              </Text>
              <Text className="text-white/80 text-body-sm font-medium">
                {language.name}
              </Text>
            </View>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.25)",
              }}
            />
            <Text className="text-white/80 text-body-sm font-medium">
              {lesson.title}
            </Text>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.25)",
              }}
            />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <TimerIcon size={14} color="rgba(255,255,255,0.6)" />
              <Text className="text-white/80 text-body-sm font-medium">
                {lesson.durationMinutes}m
              </Text>
            </View>
          </View>

          {/* ═══════════════════════════════════════════
              Audio Controls
              ═══════════════════════════════════════════ */}
          <View style={{ marginTop: spacing["3xl"] }}>
            <AudioLessonControls
              activeControls={activeControls}
              onToggle={handleToggle}
              onEndCall={handleEndCall}
            />
          </View>

          {/* ═══════════════════════════════════════════
              Lesson Goals
              ═══════════════════════════════════════════ */}
          {lesson.goals.length > 0 && (
            <View
              style={{
                marginHorizontal: spacing.xl,
                marginTop: spacing["3xl"],
                paddingHorizontal: spacing.xl,
                paddingVertical: spacing.lg,
                borderRadius: borderRadius["2xl"],
                backgroundColor: "rgba(255,255,255,0.06)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <Text
                className="text-white font-semibold text-body-sm"
                style={{ marginBottom: spacing.md }}
              >
                Lesson goals
              </Text>
              {lesson.goals.map((goal, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginBottom: i < lesson.goals.length - 1 ? spacing.sm : 0,
                  }}
                >
                  <Text
                    style={{
                      color: colors.brand.purpleLight,
                      fontSize: fontSize.base,
                      marginRight: 10,
                      marginTop: 1,
                    }}
                  >
                    •
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text className="text-white/85 text-body-sm font-medium">
                      {goal.title}
                    </Text>
                    <Text
                      className="text-white/50 text-caption"
                      style={{ marginTop: 2 }}
                    >
                      {goal.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* ═══════════════════════════════════════════
              Stats Card
              ═══════════════════════════════════════════ */}
          <View style={{ marginTop: spacing["3xl"], marginBottom: spacing.sm }}>
            <LessonStatsCard
              pronunciation={stats.pronunciation}
              fluency={stats.fluency}
              vocabulary={stats.vocabulary}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
