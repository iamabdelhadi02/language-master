import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { UserLearningState, LessonProgress } from "@/types/learning";

interface LearningActions {
  /** Select a language for the user */
  selectLanguage: (code: string) => void;
  /** Clear the selected language (for testing) */
  clearLanguage: () => void;
  /** Mark a lesson status change */
  updateLessonProgress: (progress: LessonProgress) => void;
  /** Clear all progress (for testing) */
  clearAll: () => void;
}

const initialState: UserLearningState = {
  selectedLanguage: undefined,
  completedLessons: {},
  totalXp: 0,
  streakDays: 0,
  lastActiveDate: undefined,
};

export const useLearningStore = create<UserLearningState & LearningActions>()(
  persist(
    (set) => ({
      ...initialState,

      selectLanguage: (code) =>
        set({ selectedLanguage: code }),

      clearLanguage: () =>
        set({ selectedLanguage: undefined }),

      updateLessonProgress: (progress) =>
        set((state) => ({
          completedLessons: {
            ...state.completedLessons,
            [progress.lessonId]: progress,
          },
          totalXp:
            state.totalXp +
            (progress.status === "completed"
              ? progress.xpEarned -
                (state.completedLessons[progress.lessonId]?.xpEarned ?? 0)
              : 0),
        })),

      clearAll: () => set({ ...initialState }),
    }),
    {
      name: "learning-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
