import { useState, useMemo, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { router } from "expo-router";

import { useLearningStore } from "@/store/learning";
import { getLanguage } from "@/data/languages";
import { getUnitsForLanguage } from "@/data/units";
import { getLessonsForLanguage } from "@/data/lessons";
import { images } from "@/constants/images";
import { TabSwitcher } from "@/components/TabSwitcher";
import { LessonCard } from "@/components/LessonCard";
import type { Unit, LessonStatus } from "@/types/learning";

const TABS = [
  { key: "lessons", label: "Lessons" },
  { key: "practice", label: "Practice" },
];

/** Derive a lesson's status from the completedLessons store record. */
function getLessonStatus(
  lessonId: string,
  completedLessons: Record<string, { status: LessonStatus }>,
): LessonStatus {
  return completedLessons[lessonId]?.status ?? "available";
}

/** Count completed lessons in a unit. */
function countCompleted(
  unit: Unit,
  completedLessons: Record<string, { status: LessonStatus }>,
): number {
  return unit.lessonIds.filter(
    (id) => completedLessons[id]?.status === "completed",
  ).length;
}

/**
 * Learn tab — compact hero with language flag, unit section headers,
 * numbered lesson cards with status indicators, and a functional bookmark.
 */
export default function LearnScreen() {
  const selectedLanguageCode = useLearningStore((s) => s.selectedLanguage);
  const completedLessons = useLearningStore((s) => s.completedLessons);
  const [activeTab, setActiveTab] = useState("lessons");
  const [bookmarkedUnitId, setBookmarkedUnitId] = useState<string | null>(null);

  const language = selectedLanguageCode
    ? getLanguage(selectedLanguageCode)
    : undefined;

  const units = useMemo(
    () =>
      selectedLanguageCode ? getUnitsForLanguage(selectedLanguageCode) : [],
    [selectedLanguageCode],
  );

  const allLessons = useMemo(
    () =>
      selectedLanguageCode
        ? getLessonsForLanguage(selectedLanguageCode)
        : [],
    [selectedLanguageCode],
  );

  // The "current" unit is the first one with any incomplete lessons.
  const currentUnit = useMemo(() => {
    for (const u of units) {
      if (countCompleted(u, completedLessons) < u.lessonIds.length) return u;
    }
    return units[0] ?? null;
  }, [units, completedLessons]);

  const toggleBookmark = useCallback(() => {
    if (!currentUnit) return;
    setBookmarkedUnitId((prev) =>
      prev === currentUnit.id ? null : currentUnit.id,
    );
  }, [currentUnit]);

  // Group lessons by unit for section headers
  const lessonsByUnit = useMemo(() => {
    const map = new Map<string, { unit: Unit; lessons: typeof allLessons }>();
    for (const lesson of allLessons) {
      const unit = units.find((u) => u.id === lesson.unitId);
      if (!unit) continue;
      if (!map.has(unit.id)) {
        map.set(unit.id, { unit, lessons: [] });
      }
      map.get(unit.id)!.lessons.push(lesson);
    }
    return Array.from(map.values());
  }, [allLessons, units]);

  // No language selected guard
  if (!selectedLanguageCode || !language) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFEFE" }}>
        <View className="flex-1 flex-center px-8">
          <Text className="text-h4 text-text-primary mb-2">
            No language selected
          </Text>
          <TouchableOpacity
            onPress={() => router.replace("/language-select")}
            activeOpacity={0.7}
            className="bg-brand-purple px-6 py-3 rounded-2xl mt-4"
          >
            <Text className="text-btn text-white">Choose a language</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const heroUnit = currentUnit ?? units[0];
  const completed = heroUnit ? countCompleted(heroUnit, completedLessons) : 0;
  const total = heroUnit?.lessonIds.length ?? 0;
  const isBookmarked = bookmarkedUnitId === heroUnit?.id;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FEFEFE" }}
      edges={["top"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ═══════════════════════════════════════════
            Hero Section (compact)
            ═══════════════════════════════════════════ */}
        <View className="bg-brand-purple rounded-b-3xl pt-3 pb-6 px-5 overflow-hidden">
          {/* Top row: language flag + title area + bookmark */}
          <View className="flex-row items-center justify-between mb-2">
            <TouchableOpacity
              onPress={() => router.push("/language-select")}
              activeOpacity={0.6}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            >
              <Text style={{ fontSize: 22 }}>{language.flag}</Text>
            </TouchableOpacity>

            <View className="flex-1 items-center mx-3">
              <Text
                className="text-h4 text-white text-center"
                numberOfLines={1}
              >
                {heroUnit?.title ?? language.name}
              </Text>
              <Text className="text-caption text-white/70 mt-0.5">
                Unit {heroUnit?.order ?? 1} • {completed} / {total} lessons
              </Text>
            </View>

            <TouchableOpacity
              onPress={toggleBookmark}
              activeOpacity={0.6}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            >
              <Text style={{ fontSize: 18 }}>
                {isBookmarked ? "🔖" : "🏷️"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Hero illustration (smaller) */}
          <View className="items-center mt-1">
            <Image
              source={images.mascotAuth}
              style={{ width: 100, height: 100 }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* ═══════════════════════════════════════════
            Tab Switcher (overlaps hero bottom)
            ═══════════════════════════════════════════ */}
        <View className="mx-5 -mt-5">
          <TabSwitcher
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </View>

        {/* ═══════════════════════════════════════════
            Content Area
            ═══════════════════════════════════════════ */}
        {activeTab === "lessons" ? (
          <View className="px-5 mt-4">
            {lessonsByUnit.map(({ unit, lessons }) => (
              <View key={unit.id} className="mb-6">
                {/* Unit section header */}
                <View className="flex-row items-center gap-2 mb-3 ml-1">
                  <View
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: unit.color }}
                  />
                  <Text className="text-body font-semibold text-text-primary">
                    {unit.title}
                  </Text>
                  <Text className="text-caption text-text-muted ml-1">
                    {unit.subtitle}
                  </Text>
                </View>

                {/* Lesson cards */}
                <View className="gap-3">
                  {lessons.map((lesson) => {
                    const status = getLessonStatus(lesson.id, completedLessons);
                    return (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        status={status}
                        order={lesson.order}
                        unitColor={unit.color}
                        onPress={() =>
                          router.push(`/lesson/${lesson.id}` as any)
                        }
                      />
                    );
                  })}
                </View>
              </View>
            ))}

            {allLessons.length === 0 && (
              <View className="items-center py-12">
                <Text className="text-body text-text-tertiary">
                  No lessons available for {language.name} yet.
                </Text>
              </View>
            )}
          </View>
        ) : (
          /* Practice tab placeholder */
          <View className="items-center py-16 px-8">
            <Image
              source={images.treasure}
              style={{ width: 100, height: 100 }}
              contentFit="contain"
            />
            <Text className="text-h4 text-text-primary mt-6 mb-2">
              Practice
            </Text>
            <Text className="text-body text-text-tertiary text-center">
              Review vocabulary, strengthen weak skills, and earn bonus XP.
              Coming soon!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
