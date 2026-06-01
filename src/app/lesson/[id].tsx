import { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Image } from "expo-image";
import { useUser } from "@clerk/expo";
import { StreamCall } from "@stream-io/video-react-native-sdk";

import { getLesson } from "@/data/lessons";
import { getUnit } from "@/data/units";
import { getLanguage } from "@/data/languages";
import { images } from "@/constants/images";
import { colors } from "@/theme/colors";
import { spacing, borderRadius } from "@/theme/spacing";
import { fontSize } from "@/theme/typography";
import { TeacherSpeechBubble } from "@/components/TeacherSpeechBubble";
import { StreamAudioControls } from "@/components/StreamAudioControls";
import { LessonStatsCard } from "@/components/LessonStatsCard";
import { useAudioCall } from "@/hooks/useAudioCall";
import type { AudioCallStatus } from "@/hooks/useAudioCall";
import {
  BackChevronIcon,
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

// ─── Status metadata ─────────────────────────────────────────────────

const STATUS_LABEL: Record<AudioCallStatus, string> = {
  idle: "Preparing…",
  creating: "Creating session…",
  joining: "Connecting to AI Teacher…",
  joined: "Connected",
  reconnecting: "Reconnecting…",
  ended: "Call ended",
  error: "Connection error",
};

const STATUS_DESCRIPTION: Partial<Record<AudioCallStatus, string>> = {
  creating: "Setting up your lesson session with the AI teacher.",
  joining: "Establishing a secure audio connection.",
  reconnecting: "Your network connection seems unstable. Hang tight…",
};

// ─── Sub-components ──────────────────────────────────────────────────

/**
 * Full-screen overlay for loading and connecting states.
 */
function CallOverlay({
  status,
  error,
  onRetry,
  onGoBack,
}: {
  status: AudioCallStatus;
  error: string | null;
  onRetry: () => void;
  onGoBack: () => void;
}) {
  const isError = status === "error";
  const isEnded = status === "ended";

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(13, 12, 26, 0.92)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: 32,
      }}
    >
      {isEnded ? (
        <>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: "#EF4444",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Text style={{ color: "white", fontSize: 28 }}>✓</Text>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "700",
              marginBottom: 8,
            }}
          >
            {STATUS_LABEL.ended}
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            Your lesson session has ended. Great practice!
          </Text>
          <TouchableOpacity
            onPress={onGoBack}
            activeOpacity={0.7}
            style={{
              backgroundColor: "#5238FC",
              paddingHorizontal: 32,
              paddingVertical: 12,
              borderRadius: 16,
            }}
            accessibilityLabel="Go back to lessons"
            accessibilityRole="button"
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 16 }}>
              Back to lessons
            </Text>
          </TouchableOpacity>
        </>
      ) : isError ? (
        <>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <Text style={{ color: "#EF4444", fontSize: 28 }}>!</Text>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "700",
              marginBottom: 8,
            }}
          >
            {STATUS_LABEL.error}
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            {error ?? "An unexpected error occurred."}
          </Text>
          <View
            style={{ flexDirection: "row", gap: 12, marginTop: 16 }}
          >
            <TouchableOpacity
              onPress={onRetry}
              activeOpacity={0.7}
              style={{
                backgroundColor: "#5238FC",
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 16,
              }}
              accessibilityLabel="Retry connection"
              accessibilityRole="button"
            >
              <Text
                style={{ color: "white", fontWeight: "600", fontSize: 14 }}
              >
                Retry
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onGoBack}
              activeOpacity={0.7}
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 16,
              }}
              accessibilityLabel="Go back to lessons"
              accessibilityRole="button"
            >
              <Text
                style={{ color: "rgba(255,255,255,0.7)", fontWeight: "600", fontSize: 14 }}
              >
                Go back
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <ActivityIndicator size="large" color="#5238FC" />
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "600",
              marginTop: 20,
            }}
          >
            {STATUS_LABEL[status]}
          </Text>
          {STATUS_DESCRIPTION[status] && (
            <Text
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: 14,
                textAlign: "center",
                marginTop: 8,
              }}
            >
              {STATUS_DESCRIPTION[status]}
            </Text>
          )}
        </>
      )}
    </View>
  );
}

/**
 * Small user-info badge shown when connected to the call.
 */
function UserInfoBadge({
  userName,
  userImage,
  isMuted,
  isConnecting,
}: {
  userName: string;
  userImage?: string;
  isMuted: boolean;
  isConnecting: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        gap: spacing.sm,
      }}
    >
      {/* Avatar */}
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          overflow: "hidden",
          backgroundColor: "#1E1B4B",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.2)",
        }}
      >
        {userImage ? (
          <Image
            source={{ uri: userImage }}
            style={{ width: 28, height: 28 }}
            contentFit="cover"
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 14, fontWeight: "700" }}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      {/* Name */}
      <Text
        className="text-white/80 text-body-sm font-medium"
        numberOfLines={1}
        style={{ flexShrink: 1 }}
      >
        {userName}
      </Text>

      {/* Status dot */}
      {isConnecting ? (
        <ActivityIndicator size="small" color="#F59E0B" />
      ) : isMuted ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#EF4444",
            }}
          />
          <Text style={{ color: "#EF4444", fontSize: 11, fontWeight: "600" }}>
            Muted
          </Text>
        </View>
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <OnlineDot size={8} />
          <Text style={{ color: "#22C55E", fontSize: 11, fontWeight: "600" }}>
            Live
          </Text>
        </View>
      )}
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────

/**
 * AI Teacher Audio Lesson screen with Stream audio call integration.
 *
 * Opens when the user taps a lesson from the Learn tab.
 * Automatically creates and joins a Stream audio call for the lesson.
 *
 * States:
 *  - idle/creating/joining → overlay with spinner and status message
 *  - joined → full lesson UI with live Stream mic controls
 *  - reconnecting → overlay with "Reconnecting…" message
 *  - ended → overlay confirming call end, with back button
 *  - error → overlay with error message, retry, and back button
 */
export default function AudioLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = id ? getLesson(id) : undefined;
  const unit = lesson ? getUnit(lesson.unitId) : undefined;
  const language = unit ? getLanguage(unit.languageCode) : undefined;
  const { user: clerkUser } = useUser();

  // ── Stream audio call ──────────────────────────────────────────────

  const userId = clerkUser?.id ?? "";
  const userName =
    clerkUser?.fullName ??
    clerkUser?.primaryEmailAddress?.emailAddress ??
    "";

  const {
    call,
    status,
    error,
    isMuted,
    endCall,
    retry,
  } = useAudioCall({
    lessonId: lesson?.id ?? "",
    languageCode: language?.code ?? "",
    lessonTitle: lesson?.title ?? "",
    userId,
    userName,
  });

  // ── Local UI state ─────────────────────────────────────────────────

  const [subtitlesOn, setSubtitlesOn] = useState(true);
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

  const defaultGreeting = useMemo(
    () => (language ? DEFAULT_GREETINGS[language.code] : undefined) ?? DEFAULT_GREETING,
    [language],
  );

  // ── Handlers ───────────────────────────────────────────────────────

  const handleEndCall = useCallback(async () => {
    await endCall();
  }, [endCall]);

  const handleGoBack = useCallback(() => {
    router.back();
  }, []);

  const handleSpeakerPress = useCallback(() => {
    setPhraseIndex((prev) => prev + 1);
  }, []);

  const toggleSubtitles = useCallback(() => {
    setSubtitlesOn((prev) => !prev);
  }, []);

  const handleNotificationsPress = useCallback(() => {
    // TODO: implement notifications
  }, []);

  // ── Not found ──────────────────────────────────────────────────────

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

  const showOverlay =
    status === "creating" || status === "joining" ||
    status === "reconnecting" || status === "ended" || status === "error";

  // ── Main content ───────────────────────────────────────────────────

  const mainContent = (
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
          contentContainerStyle={{ paddingBottom: spacing.lg }}
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
              onPress={handleGoBack}
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
                {status === "joined" ? (
                  <>
                    {isMuted ? (
                      <>
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: "#EF4444",
                          }}
                        />
                        <Text
                          className="text-xs font-medium"
                          style={{ marginLeft: 6, color: "#EF4444" }}
                        >
                          Muted
                        </Text>
                      </>
                    ) : (
                      <>
                        <OnlineDot size={8} />
                        <Text
                          className="text-xs font-medium"
                          style={{ marginLeft: 6, color: "#22C55E" }}
                        >
                          Connected
                        </Text>
                      </>
                    )}
                  </>
                ) : status === "reconnecting" ? (
                  <>
                    <ActivityIndicator size="small" color="#F59E0B" style={{ width: 8, height: 8 }} />
                    <Text
                      className="text-xs font-medium"
                      style={{ marginLeft: 6, color: "#F59E0B" }}
                    >
                      Reconnecting…
                    </Text>
                  </>
                ) : (
                  <>
                    <ActivityIndicator size="small" color="#9CA3AF" style={{ width: 8, height: 8 }} />
                    <Text
                      className="text-xs font-medium"
                      style={{ marginLeft: 6, color: "#9CA3AF" }}
                    >
                      Connecting…
                    </Text>
                  </>
                )}
              </View>
            </View>

            {/* Right action buttons */}
            <View style={{ flexDirection: "row", gap: spacing.sm }}>
              {/* Subtitles toggle */}
              <TouchableOpacity
                onPress={toggleSubtitles}
                activeOpacity={0.6}
                accessibilityLabel={`Subtitles ${subtitlesOn ? "on" : "off"}, double-tap to toggle`}
                accessibilityRole="button"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: borderRadius.full,
                  backgroundColor: subtitlesOn
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(255,255,255,0.06)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SubtitlesIcon size={18} color={subtitlesOn ? "#FFFFFF" : "rgba(255,255,255,0.4)"} />
              </TouchableOpacity>

              {/* Bell */}
              <TouchableOpacity
                onPress={handleNotificationsPress}
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
              User Info Bar (shown when connected)
              ═══════════════════════════════════════════ */}
          {status === "joined" && (
            <UserInfoBadge
              userName={userName || "You"}
              userImage={clerkUser?.imageUrl}
              isMuted={isMuted}
              isConnecting={false}
            />
          )}
          {(status === "joining" || status === "reconnecting") && (
            <UserInfoBadge
              userName={userName || "You"}
              userImage={clerkUser?.imageUrl}
              isMuted={isMuted}
              isConnecting={true}
            />
          )}

          {/* ═══════════════════════════════════════════
              Stage Area — 320px canvas
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

            {/* Mascot */}
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

        {/* ═══════════════════════════════════════════
            User video PIP — floating over stage, outside scroll
            ═══════════════════════════════════════════ */}
        <View
          style={{
            position: "absolute",
            top: 110,
            right: spacing.lg,
            zIndex: 10,
          }}
        >
          <View
            style={{
              width: 88,
              height: 118,
              borderRadius: borderRadius["2xl"],
              overflow: "hidden",
              borderWidth: 2,
              borderColor: status === "joined" && !isMuted
                ? "rgba(34, 197, 94, 0.6)"
                : "rgba(255,255,255,0.8)",
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
              {clerkUser?.imageUrl ? (
                <Image
                  source={{ uri: clerkUser.imageUrl }}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                  contentFit="cover"
                  accessibilityLabel="Your profile picture"
                />
              ) : (
                <Image
                  source={images.mascotAuth}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                  contentFit="cover"
                  accessibilityLabel="Your avatar"
                />
              )}
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
                {userName ? userName.split(" ")[0] : "You"}
              </Text>
            </View>

            {/* Mic status dot */}
            {status === "joined" && (
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
                  backgroundColor: isMuted ? "#EF4444" : "#22C55E",
                }}
              />
            )}
          </View>
        </View>

        {/* ═══════════════════════════════════════════
            Audio Controls — Sticky bottom bar
            ═══════════════════════════════════════════ */}
        <View
          style={{
            paddingTop: spacing.md,
            paddingBottom: spacing.lg,
            backgroundColor: "#0D0C1A",
          }}
        >
          {call && !showOverlay ? (
            <StreamAudioControls onCallEnded={handleEndCall} />
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
                paddingHorizontal: spacing.sm,
              }}
            >
              <View style={{ alignItems: "center", width: 64, minHeight: 44 }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: spacing.sm,
                  }}
                >
                  <ActivityIndicator size="small" color="rgba(255,255,255,0.5)" />
                </View>
                <Text className="text-caption font-medium text-center text-white/30">
                  Mic
                </Text>
              </View>
              <View style={{ alignItems: "center", width: 64, minHeight: 44 }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: spacing.sm,
                  }}
                >
                  <ActivityIndicator size="small" color="rgba(255,255,255,0.5)" />
                </View>
                <Text className="text-caption font-medium text-center text-white/30">
                  Speaker
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleGoBack}
                activeOpacity={0.7}
                accessibilityLabel="End call"
                accessibilityRole="button"
                style={{ alignItems: "center", width: 64, minHeight: 44 }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: "#EF4444",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: spacing.sm,
                  }}
                >
                  <BellIcon size={18} />
                </View>
                <Text className="text-caption font-medium text-center text-red">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>

      {/* ═══════════════════════════════════════════
          Status Overlay
          ═══════════════════════════════════════════ */}
      {showOverlay && (
        <CallOverlay
          status={status}
          error={error}
          onRetry={retry}
          onGoBack={handleGoBack}
        />
      )}
    </View>
  );

  // ── Wrap in StreamCall when we have a live call ────────────────────
  // Always wrap when call exists so `useCall()` works in descendants.
  // The overlay covers the UI during connecting/error states.

  if (call) {
    return <StreamCall call={call}>{mainContent}</StreamCall>;
  }

  return mainContent;
}
