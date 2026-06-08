import type { Unit } from "@/types/learning";

/**
 * Units group lessons thematically within each language.
 *
 * To add a new unit:
 * 1. Add an entry below with a unique id ({languageCode}-{slug}).
 * 2. Populate lessonIds with the ids of the lessons that belong to it.
 * 3. Add those lessons in data/lessons/{code}.ts.
 */
export const units: Unit[] = [
  // ── Spanish ──────────────────────────────────────────────────────────────
  {
    id: "es-basics-1",
    languageCode: "es",
    title: "Basics 1",
    subtitle: "Letters, sounds, and first words",
    order: 1,
    color: "#5238FC",
    lessonIds: ["es-basics-1-nouns", "es-basics-1-verbs"],
  },
  {
    id: "es-greetings",
    languageCode: "es",
    title: "Greetings",
    subtitle: "Say hello and introduce yourself",
    order: 2,
    color: "#1DBB64",
    lessonIds: ["es-greetings-hello", "es-greetings-intro"],
  },

  // ── French ───────────────────────────────────────────────────────────────
  {
    id: "fr-basics-1",
    languageCode: "fr",
    title: "Basics 1",
    subtitle: "Letters, sounds, and first words",
    order: 1,
    color: "#4087FE",
    lessonIds: ["fr-basics-1-nouns", "fr-basics-1-verbs"],
  },
  {
    id: "fr-greetings",
    languageCode: "fr",
    title: "Greetings",
    subtitle: "Say hello and introduce yourself",
    order: 2,
    color: "#FD8502",
    lessonIds: ["fr-greetings-hello", "fr-greetings-intro"],
  },

  // ── Japanese ─────────────────────────────────────────────────────────────
  {
    id: "ja-basics-1",
    languageCode: "ja",
    title: "Basics 1",
    subtitle: "Hiragana, sounds, and first words",
    order: 1,
    color: "#FD474A",
    lessonIds: ["ja-basics-1-nouns", "ja-basics-1-verbs"],
  },
  {
    id: "ja-greetings",
    languageCode: "ja",
    title: "Greetings",
    subtitle: "Say hello and introduce yourself",
    order: 2,
    color: "#FEC104",
    lessonIds: ["ja-greetings-hello", "ja-greetings-intro"],
  },

  // ── German ───────────────────────────────────────────────────────────────
  {
    id: "de-basics-1",
    languageCode: "de",
    title: "Basics 1",
    subtitle: "Letters, sounds, and first words",
    order: 1,
    color: "#5238FC",
    lessonIds: ["de-basics-1-nouns", "de-basics-1-verbs"],
  },
  {
    id: "de-greetings",
    languageCode: "de",
    title: "Greetings",
    subtitle: "Say hello and introduce yourself",
    order: 2,
    color: "#1DBB64",
    lessonIds: ["de-greetings-hello", "de-greetings-intro"],
  },

  // ── Arabic ───────────────────────────────────────────────────────────────
  {
    id: "ar-conversation-1",
    languageCode: "ar",
    title: "Conversation 1",
    subtitle: "Open-ended Arabic conversation practice",
    order: 1,
    color: "#2E8B57",
    lessonIds: ["ar-conversation-1-free", "ar-conversation-1-daily"],
  },
  {
    id: "ar-conversation-2",
    languageCode: "ar",
    title: "Conversation 2",
    subtitle: "Deeper topics and cultural exchanges",
    order: 2,
    color: "#DAA520",
    lessonIds: ["ar-conversation-2-topics", "ar-conversation-2-culture"],
  },
];

/** Get all units for a language, ordered by `order`. */
export function getUnitsForLanguage(languageCode: string): Unit[] {
  return units
    .filter((u) => u.languageCode === languageCode)
    .sort((a, b) => a.order - b.order);
}

/** Lookup a single unit by id. */
export function getUnit(id: string): Unit | undefined {
  return units.find((u) => u.id === id);
}
