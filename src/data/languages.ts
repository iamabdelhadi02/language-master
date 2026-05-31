import type { Language } from "@/types/learning";

/**
 * Supported languages for the Language Master app.
 *
 * To add a new language:
 * 1. Add an entry below.
 * 2. Add units in data/units.ts.
 * 3. Add lessons in data/lessons/{code}.ts and re-export from the barrel.
 */
export const languages: Language[] = [
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    imageKey: "palace",
    learners: 42_100_000,
    description:
      "The world's second-most spoken native language — vibrant, musical, and spoken across 20+ countries.",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    imageKey: "palace",
    learners: 19_300_000,
    description:
      "The language of diplomacy, cuisine, and art — spoken on every continent.",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    imageKey: "palace",
    learners: 14_800_000,
    description:
      "Master hiragana, katakana, and everyday conversation in this beautiful and logical language.",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    imageKey: "palace",
    learners: 11_200_000,
    description:
      "The most widely spoken native language in Europe — precise, expressive, and rewarding to learn.",
  },
];

/** Lookup a language by its code */
export function getLanguage(code: string): Language | undefined {
  return languages.find((l) => l.code === code);
}
