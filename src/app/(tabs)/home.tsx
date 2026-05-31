import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/expo";

import { useLearningStore } from "@/store/learning";
import { getLanguage } from "@/data/languages";
import { getUnitsForLanguage } from "@/data/units";
import { getLessonsForLanguage } from "@/data/lessons";
import { DAILY_XP_GOAL } from "@/constants/learning";
import { HomeHeader } from "@/components/HomeHeader";
import { DailyGoalCard } from "@/components/DailyGoalCard";
import { ContinueLearningCard } from "@/components/ContinueLearningCard";
import { TodaysPlanItem } from "@/components/TodaysPlanItem";
import type { TodaysPlanItemData } from "@/components/TodaysPlanItem";
import { NextUpCard } from "@/components/NextUpCard";
import type { Unit, LessonProgress } from "@/types/learning";

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
function getLessonIcon(
  lesson: ReturnType<typeof getLessonsForLanguage>[number],
): string {
  const firstType = lesson.activities[0]?.type;
  return firstType ? ACTIVITY_ICON[firstType] ?? "📚" : "📚";
}

/**
 * Selects the first unit that contains at least one lesson not marked as "completed".
 *
 * @param units - Ordered list of units to search
 * @param completedLessons - Mapping of lesson IDs to their progress objects
 * @returns The first unit that has at least one lesson whose progress `status` is not `"completed"`. If every unit's lessons are completed, returns `units[0]`. Returns `undefined` when `units` is empty.
 */
function findFirstIncompleteUnit(
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
 * Home tab — main dashboard showing daily progress,
 * continue learning, today's plan, and next up.
 */
export default function HomeScreen() {
  const { user } = useUser();

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

  const currentUnit = findFirstIncompleteUnit(units, completedLessons);

  // Today's plan: up to 3 lessons from the first incomplete unit
  const todayPlanItems: TodaysPlanItemData[] = (() => {
    if (!currentUnit) return [];

    return allLessons
      .filter((l) => l.unitId === currentUnit.id)
      .slice(0, 3)
      .map((lesson) => ({
        title: lesson.title,
        subtitle: lesson.description,
        icon: getLessonIcon(lesson),
        iconBgColor: currentUnit.color,
        completed: completedLessons[lesson.id]?.status === "completed",
      }));
  })();

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
          <DailyGoalCard currentXp={totalXp % DAILY_XP_GOAL} />
        </View>

        {/* Continue Learning Card */}
        <View className="mt-4">
          <ContinueLearningCard
            languageName={language.name}
            unitTitle={currentUnit?.title ?? ""}
            unitNumber={currentUnit?.order ?? 1}
            onContinuePress={() => {
              // TODO: navigate to lesson
            }}
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
          todayPlanItems.map((item, i) => (
            <TodaysPlanItem
              key={i}
              item={item}
              onPress={() => {
                // TODO: navigate to lesson
              }}
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
            onPress={() => {
              // TODO: navigate to AI video call
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
