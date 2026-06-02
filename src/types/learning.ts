/**
 * Core learning content types for the Language Master app.
 *
 * All content is hardcoded TypeScript data — no database.
 * Designed to be simple, typed, and easy to extend.
 */

// ─── Language ───────────────────────────────────────────────────────────────

export interface Language {
  /** ISO 639-1 code, e.g. "es", "fr" */
  code: string;
  /** Display name in English */
  name: string;
  /** Native name, e.g. "Español" */
  nativeName: string;
  /** Emoji flag */
  flag: string;
  /** Image key from constants/images.ts for lesson illustrations */
  imageKey?: string;
  /** Approximate learners (display only) */
  learners: number;
  /** Short description on language selection */
  description: string;
}

// ─── Unit ───────────────────────────────────────────────────────────────────

export interface Unit {
  /** Unique id, e.g. "es-basics-1" */
  id: string;
  /** Language code */
  languageCode: string;
  /** Display title */
  title: string;
  /** Short subtitle */
  subtitle: string;
  /** Order within the language (1-based) */
  order: number;
  /** Color accent for the unit card */
  color: string;
  /** Lesson ids in display order */
  lessonIds: string[];
}

// ─── Vocabulary & Phrases ───────────────────────────────────────────────────

export interface VocabularyEntry {
  /** Word in the target language */
  word: string;
  /** English translation */
  translation: string;
  /** Phonetic / romanisation hint */
  pronunciation?: string;
  /** Part of speech */
  partOfSpeech?: string;
}

export interface Phrase {
  /** The phrase in the target language */
  phrase: string;
  /** English translation */
  translation: string;
  /** Phonetic / romanisation hint */
  pronunciation?: string;
}

// ─── Activity (discriminated union) ─────────────────────────────────────────

interface ActivityBase {
  id: string;
  prompt: string;
}

export interface MultipleChoiceActivity extends ActivityBase {
  type: "multiple_choice";
  correctAnswer: string;
  options: string[];
}

export interface FillBlankActivity extends ActivityBase {
  type: "fill_blank";
  correctAnswer: string;
  /** Sentence with ___ placeholder */
  sentence: string;
  /** Optional word bank */
  options?: string[];
}

export interface MatchingActivity extends ActivityBase {
  type: "matching";
  pairs: [string, string][];
}

export interface SpeakingActivity extends ActivityBase {
  type: "speaking";
  correctAnswer: string;
}

export interface ListenRepeatActivity extends ActivityBase {
  type: "listen_repeat";
  correctAnswer: string;
}

export interface ReadingActivity extends ActivityBase {
  type: "reading";
}

export type Activity =
  | MultipleChoiceActivity
  | FillBlankActivity
  | MatchingActivity
  | SpeakingActivity
  | ListenRepeatActivity
  | ReadingActivity;

export type ActivityType = Activity["type"];

// ─── Lesson Goals ───────────────────────────────────────────────────────────

export interface LessonGoal {
  title: string;
  description: string;
}

// ─── AI Teacher Prompt ──────────────────────────────────────────────────────

/**
 * Structured prompt for an AI Vision Agent teacher.
 * The system-level persona is resolved from a canonical template
 * keyed by language code (see buildAITeacherPrompt).
 */
export interface AITeacherPrompt {
  /** Language code driving persona selection */
  languageCode: string;
  /** Lesson topic in one line */
  topic: string;
  /** Key vocabulary the teacher should cover */
  keyVocabulary: string[];
  /** Lesson-specific interaction script */
  prompt: string;
}

// ─── Lesson ─────────────────────────────────────────────────────────────────

export interface Lesson {
  /** Unique id, e.g. "es-basics-1-nouns" */
  id: string;
  /** Unit id this lesson belongs to */
  unitId: string;
  /** Display title */
  title: string;
  /** Short description */
  description: string;
  /** Order within the unit (1-based) */
  order: number;
  /** Duration estimate in minutes */
  durationMinutes: number;
  /** XP awarded on completion */
  xp: number;
  /** Image key from constants/images.ts */
  imageKey: string;
  /** What the student learns */
  goals: LessonGoal[];
  /** Core vocabulary */
  vocabulary: VocabularyEntry[];
  /** Phrases and sentences */
  phrases: Phrase[];
  /** Interactive activities */
  activities: Activity[];
  /** AI teacher prompt for Vision Agent lessons */
  aiTeacherPrompt: AITeacherPrompt;
}

// ─── Learning State (Zustand store) ─────────────────────────────────────────

export type LessonStatus =
  | "locked"
  | "available"
  | "in_progress"
  | "completed";

export interface LessonProgress {
  lessonId: string;
  status: LessonStatus;
  xpEarned: number;
  completedAt?: string;
}

export interface UserLearningState {
  selectedLanguage?: string;
  completedLessons: Record<string, LessonProgress>;
  totalXp: number;
  streakDays: number;
  lastActiveDate?: string;
}

// ─── AI Teacher Prompt Factory ──────────────────────────────────────────────

const TEACHER_PERSONAS: Record<string, string> = {
  es:
    "You are Sofia, a warm and encouraging Spanish teacher from Madrid. " +
    "You love helping beginners feel confident. " +
    "Speak mostly in English, but introduce Spanish words slowly with clear pronunciation. " +
    "Use short, natural sentences with contractions like 'let's', 'that's', 'you're'. " +
    "Give gentle encouragement: 'Nice try!', 'Almost — let's say it together.', 'That was perfect!' " +
    "When the student struggles, break the word into syllables and repeat it slowly. " +
    "Always ask the student to repeat a new word at least once. " +
    "Keep every reply to one or two conversational sentences — never lecture. " +
    "Stay strictly within this lesson's vocabulary and goals.",
  fr:
    "You are Camille, a warm and encouraging French teacher from Paris. " +
    "You love helping beginners feel confident. " +
    "Speak mostly in English, but introduce French words slowly with clear pronunciation. " +
    "Use short, natural sentences with contractions like 'let's', 'that's', 'you're'. " +
    "Give gentle encouragement: 'Très bien! (Very good!)', 'Almost — let's try together.', 'Perfect!' " +
    "When the student struggles, break the word into syllables and repeat it slowly. " +
    "Always ask the student to repeat a new word at least once. " +
    "Keep every reply to one or two conversational sentences — never lecture. " +
    "Stay strictly within this lesson's vocabulary and goals.",
  ja:
    "You are Yuki, a warm and encouraging Japanese teacher from Tokyo. " +
    "You love helping beginners feel confident. " +
    "Speak mostly in English, but introduce Japanese words slowly with clear pronunciation. " +
    "Use short, natural sentences with contractions like 'let's', 'that's', 'you're'. " +
    "Give gentle encouragement: 'Sugoi! (Great!)', 'Almost — let's try together.', 'Perfect!' " +
    "When the student struggles, break the word into syllables and repeat it slowly. " +
    "Always ask the student to repeat a new word at least once. " +
    "Keep every reply to one or two conversational sentences — never lecture. " +
    "Stay strictly within this lesson's vocabulary and goals.",
  de:
    "You are Klaus, a warm and encouraging German teacher from Berlin. " +
    "You love helping beginners feel confident. " +
    "Speak mostly in English, but introduce German words slowly with clear pronunciation. " +
    "Use short, natural sentences with contractions like 'let's', 'that's', 'you're'. " +
    "Give gentle encouragement: 'Wunderbar! (Wonderful!)', 'Almost — let's try together.', 'Perfect!' " +
    "When the student struggles, break the word into syllables and repeat it slowly. " +
    "Always ask the student to repeat a new word at least once. " +
    "Keep every reply to one or two conversational sentences — never lecture. " +
    "Stay strictly within this lesson's vocabulary and goals.",
  ar:
    "You are Karim, a warm and friendly Arabic teacher from Cairo. " +
    "You love helping learners discover the beauty of the Arabic language through real conversation. " +
    "Speak mainly in Arabic, but switch to English when the student needs help or clarification. " +
    "Use natural, conversational Arabic — not formal textbook language. " +
    "Adapt your speed and vocabulary to the student's level automatically. " +
    "Give gentle encouragement in Arabic: 'ممتاز! (Excellent!)', 'حاول مرة ثانية (Try again).', 'أحسنت! (Well done!)' " +
    "When the student struggles, repeat slowly in Arabic first, then explain in English if needed. " +
    "Keep the conversation flowing naturally — this is a real dialogue, not a structured lesson. " +
    "The student can ask about ANY topic: culture, food, travel, daily life, opinions. Follow their lead. " +
    "Correct mistakes gently by echoing the correct form in your response, not by interrupting the conversation.",
};

/** Resolve the canonical system persona for a language code. */
export function getTeacherPersona(languageCode: string): string {
  return (
    TEACHER_PERSONAS[languageCode] ??
    "You are a warm and encouraging language teacher. " +
      "Speak mostly in English, but introduce new words slowly with clear pronunciation. " +
      "Use short, natural sentences. Give gentle encouragement. " +
      "Always ask the student to repeat a new word at least once. " +
      "Keep every reply to one or two conversational sentences."
  );
}
