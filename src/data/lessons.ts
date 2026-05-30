/**
 * Lesson content barrel — re-exports from per-language files.
 *
 * To add a new language:
 * 1. Create data/lessons/{code}.ts with a `{code}Lessons: Lesson[]` export.
 * 2. Add it to the import + spread below.
 */

import type { Lesson } from "@/types/learning";
import { units } from "@/data/units";

import { esLessons } from "./lessons/es";
import { frLessons } from "./lessons/fr";
import { jaLessons } from "./lessons/ja";
import { deLessons } from "./lessons/de";

export const lessons: Lesson[] = [
  ...esLessons,
  ...frLessons,
  ...jaLessons,
  ...deLessons,
];

/** Get all lessons for a given unit, ordered. */
export function getLessonsForUnit(unitId: string): Lesson[] {
  return lessons
    .filter((l) => l.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

/** Lookup a single lesson by id. */
export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

/** Get all lessons for a given language via unit join, ordered by unit → lesson. */
export function getLessonsForLanguage(languageCode: string): Lesson[] {
  const langUnitIds = new Set(
    units
      .filter((u) => u.languageCode === languageCode)
      .map((u) => u.id),
  );
  return lessons
    .filter((l) => langUnitIds.has(l.unitId))
    .sort((a, b) => a.unitId.localeCompare(b.unitId) || a.order - b.order);
}
