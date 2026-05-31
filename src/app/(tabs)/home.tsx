import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/expo";
import { usePostHog } from "posthog-react-native";

import { useLearningStore } from "@/store/learning";
import { getLanguage } from "@/data/languages";
import { getUnitsForLanguage } from "@/data/units";
import { getLessonsForLanguage } from "@/data/lessons";
import { HomeHeader } from "@/components/HomeHeader";
import { DailyGoalCard } from "@/components/DailyGoalCard";
import { ContinueLearningCard } from "@/components/ContinueLearningCard";
import { TodaysPlanItem } from "@/components/TodaysPlanItem";
import type { TodaysPlanItemData } from "@/components/TodaysPlanItem";
import { NextUpCard } from "@/components/NextUpCard";
import type { Unit, Lesson, LessonProgress } from "@/types/learning";

/** Map activity type to an emoji icon for today's plan items. */
const ACTIVITY_ICON: Record<string, string> = {
  speaking: "🎤",
  listen_repeat: "🎧",
  multiple_choice: "📖",
  fill_blank: "📖",
  matching: "📖",
  reading: "📖",
};

/**
 * Selects an emoji icon representing a lesson's primary activity.
 *
 * Uses the lesson's first activity type to look up a corresponding emoji.
 *
 * @param lesson - The lesson whose first activity's type will determine the icon
 * @returns An emoji character for the lesson's primary activity; `📚` if the activity type is missing or has no mapping
 */
function getLessonIcon(lesson: Lesson): string {
  const firstType = lesson.activities[0]?.type;
  return firstType ? ACTIVITY_ICON[firstType] ?? "📚" : "📚";
}


/**
 * Returns the unit the user should be working on — the first unit
 * with incomplete lessons, falling back to the first unit when all
 * are complete.
 *
 * @param units - Ordered list of units to search
 * @param completedLessons - Mapping of lesson IDs to their progress objects
 * @returns The first unit with incomplete lessons, or the first unit if all lessons are complete. Returns `undefined` when `units` is empty.
 */
function getCurrentUnit(
  units: Unit[],
  completedLessons: Record<string, LessonProgress>,
): Unit | undefined {
  for (const unit of units) {
    const allComplete = unit.lessonIds.every(
      (id) => completedLessons[id]?.status === "completed",
    );
    if (!allComplete) return unit;
  }
  return units[0];
}

/**
 * Derive today's plan items (up to 3) from the current unit's lessons.
 */
function getTodayPlanItems(
  currentUnit: Unit,
  allLessons: Lesson[],
  completedLessons: Record<string, LessonProgress>,
): TodaysPlanItemData[] {
  return allLessons
    .filter((l) => l.unitId === currentUnit.id)
    .slice(0, 3)
    .map((lesson) => ({
      lessonId: lesson.id,
      title: lesson.title,
      subtitle: lesson.description,
      icon: getLessonIcon(lesson),
      iconBgColor: currentUnit.color,
      completed: completedLessons[lesson.id]?.status === "completed",
    }));
}

/**
 * Home tab — main dashboard showing daily progress,
 * continue learning, today's plan, and next up.
 */
export default function HomeScreen() {
  const { user } = useUser();
  const posthog = usePostHog();

  const selectedLanguageCode = useLearningStore((s) => s.selectedLanguage);
  const totalXp = useLearningStore((s) => s.totalXp);
  const streakDays = useLearningStore((s) => s.streakDays);
  const completedLessons = useLearningStore((s) => s.completedLessons);

  const language = selectedLanguageCode
    ? getLanguage(selectedLanguageCode)
    : undefined;

  // ── Derived data ────────────────────────────────────────────────────────
  const units = selectedLanguageCode
    ? getUnitsForLanguage(selectedLanguageCode)
    : [];
  const allLessons = selectedLanguageCode
    ? getLessonsForLanguage(selectedLanguageCode)
    : [];

  const currentUnit = getCurrentUnit(units, completedLessons);

  const todayPlanItems: TodaysPlanItemData[] =
    currentUnit ? getTodayPlanItems(currentUnit, allLessons, completedLessons) : [];

  // Next up: first incomplete lesson in the current unit
  const nextIncompleteLesson = currentUnit
    ? allLessons
        .filter((l) => l.unitId === currentUnit.id)
        .find((l) => completedLessons[l.id]?.status !== "completed")
    : undefined;

  const nextUpSubtitle = nextIncompleteLesson
    ? `Practice: ${nextIncompleteLesson.title}`
    : "Practice speaking";

  // ── Greeting ────────────────────────────────────────────────────────────
  const userName = user?.firstName ?? "Alex";

  // ── Analytics handlers ──────────────────────────────────────────────────
  const handleContinuePress = () => {
    posthog.capture("continue_learning_tapped", {
      language: selectedLanguageCode ?? "",
      unit_title: currentUnit?.title ?? "",
      unit_number: currentUnit?.order ?? 0,
    });
    // TODO: navigate to lesson
  };

  const handleTodayPlanItemPress = (item: TodaysPlanItemData) => {
    posthog.capture("today_plan_item_tapped", {
      lesson_title: item.title,
      lesson_id: item.lessonId,
      completed: item.completed,
      language: selectedLanguageCode ?? "",
    });
    // TODO: navigate to lesson
  };

  const handleNextUpPress = () => {
    posthog.capture("next_up_tapped", {
      lesson_title: nextIncompleteLesson?.title ?? "",
      language: selectedLanguageCode ?? "",
    });
    // TODO: navigate to AI video call
  };
  if (!language) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
        <View className="flex-1 flex-center px-8">
          <Text className="text-h4 text-text-primary mb-2">
            No language selected
          </Text>
          <Text className="text-body text-text-tertiary text-center">
            Select a language to start learning.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
      {/* Header */}
      <HomeHeader
        userName={userName}
        flag={language.flag}
        streakDays={streakDays}
        onNotificationPress={() => {
          // TODO: notifications
        }}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Goal Card */}
        <View className="mt-4">
          <DailyGoalCard currentXp={totalXp} />
        </View>

        {/* Continue Learning Card */}
        <View className="mt-4">
          <ContinueLearningCard
            languageName={language.name}
            unitTitle={currentUnit?.title ?? ""}
            unitNumber={currentUnit?.order ?? 1}
            onContinuePress={handleContinuePress}
          />
        </View>

        {/* Today's Plan Header */}
        <View className="flex-row items-center justify-between px-4 mt-6 mb-1">
          <Text className="text-h4 text-text-primary">Today&apos;s plan</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="text-body-sm text-brand-purple font-semibold">
              View all
            </Text>
          </TouchableOpacity>
        </View>

        {/* Today's Plan List */}
        {todayPlanItems.length > 0 ? (
          todayPlanItems.map((item) => (
            <TodaysPlanItem
              key={item.lessonId}
              item={item}
              onPress={() => handleTodayPlanItemPress(item)}
            />
          ))
        ) : (
          <View className="px-4 py-6 flex-center">
            <Text className="text-body-sm text-text-tertiary">
              No lessons available yet.
            </Text>
          </View>
        )}

        {/* Next Up Card */}
        <View className="mt-4">
          <NextUpCard
            title="AI Video Call"
            subtitle={nextUpSubtitle}
            onPress={handleNextUpPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
