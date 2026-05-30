import type { Lesson } from "@/types/learning";

/**
 * German lesson content.
 */

export const deLessons: Lesson[] = [
// GERMAN — Basics 1
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "de-basics-1-nouns",
    unitId: "de-basics-1",
    title: "First Words",
    description: "Learn your first German words: everyday objects and people.",
    order: 1,
    durationMinutes: 5,
    xp: 20,
    imageKey: "treasure",
    goals: [
      {
        title: "Learn basic nouns",
        description:
          "Recognize and say common nouns like 'boy', 'girl', 'man', 'woman' in German.",
      },
      {
        title: "Understand gendered articles",
        description:
          "Learn when to use 'der', 'die', or 'das' for masculine, feminine, and neuter nouns.",
      },
    ],
    vocabulary: [
      {
        word: "der Junge",
        translation: "the boy",
        pronunciation: "dehr yoong-eh",
        partOfSpeech: "noun",
      },
      {
        word: "das Mädchen",
        translation: "the girl",
        pronunciation: "dahs meyd-khen",
        partOfSpeech: "noun",
      },
      {
        word: "der Mann",
        translation: "the man",
        pronunciation: "dehr mahn",
        partOfSpeech: "noun",
      },
      {
        word: "die Frau",
        translation: "the woman",
        pronunciation: "dee frow",
        partOfSpeech: "noun",
      },
      {
        word: "das Wasser",
        translation: "the water",
        pronunciation: "dahs vah-ser",
        partOfSpeech: "noun",
      },
      {
        word: "das Essen",
        translation: "the food",
        pronunciation: "dahs eh-sen",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        phrase: "Der Junge isst.",
        translation: "The boy eats.",
        pronunciation: "dehr yoong-eh isst",
      },
      {
        phrase: "Die Frau trinkt Wasser.",
        translation: "The woman drinks water.",
        pronunciation: "dee frow trinkt vah-ser",
      },
    ],
    activities: [
      {
        id: "de-nouns-mc-1",
        type: "multiple_choice",
        prompt: 'What does "der Junge" mean?',
        correctAnswer: "the boy",
        options: ["the boy", "the girl", "the man", "the food"],
      },
      {
        id: "de-nouns-mc-2",
        type: "multiple_choice",
        prompt: 'What does "die Frau" mean?',
        correctAnswer: "the woman",
        options: ["the man", "the water", "the woman", "the boy"],
      },
      {
        id: "de-nouns-fill-1",
        type: "fill_blank",
        prompt: "Complete the sentence:",
        correctAnswer: "Wasser",
        sentence: "Die Frau trinkt ___.",
        options: ["Wasser", "Essen", "Junge", "Mann"],
      },
      {
        id: "de-nouns-match-1",
        type: "matching",
        prompt: "Match the German words to their English translations.",
        pairs: [
          ["der Mann", "the man"],
          ["das Mädchen", "the girl"],
          ["das Essen", "the food"],
          ["das Wasser", "the water"],
        ],
      },
      {
        id: "de-nouns-speak-1",
        type: "speaking",
        prompt: "Say 'der Junge' (the boy) out loud.",
        correctAnswer: "der Junge",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "de",
      topic: "First Words (German Basics 1)",
      keyVocabulary: ["der Junge", "das Mädchen", "der Mann", "die Frau", "das Wasser", "das Essen", "der", "die"],
      prompt:
        "Lesson: First Words (German Basics 1). " +
        "Teaching 'der Junge' (the boy), 'das Mädchen' (the girl), 'der Mann' (the man), " +
        "'die Frau' (the woman), 'das Wasser' (the water), 'das Essen' (the food). " +
        "The goal is for the student to recognize these nouns and understand " +
        "the three German articles: 'der' (masculine), 'die' (feminine), 'das' (neuter). " +
        "Start by introducing one word at a time. Say the word in German, then in English, " +
        "then ask the student to repeat it. After a few words, ask simple questions like " +
        '"Which one means the boy?" and give positive feedback.',
    },
  },

  {
    id: "de-basics-1-verbs",
    unitId: "de-basics-1",
    title: "First Verbs",
    description: "Learn action words: eat, drink, read, and write.",
    order: 2,
    durationMinutes: 5,
    xp: 20,
    imageKey: "treasure",
    goals: [
      {
        title: "Learn basic verbs",
        description:
          "Recognize and use common verbs like 'to eat', 'to drink', 'to read' in German.",
      },
      {
        title: "Form simple sentences",
        description:
          "Combine nouns and verbs to make short sentences like 'The boy eats.'",
      },
    ],
    vocabulary: [
      {
        word: "isst",
        translation: "eats",
        pronunciation: "isst",
        partOfSpeech: "verb",
      },
      {
        word: "trinkt",
        translation: "drinks",
        pronunciation: "trinkt",
        partOfSpeech: "verb",
      },
      {
        word: "liest",
        translation: "reads",
        pronunciation: "leest",
        partOfSpeech: "verb",
      },
      {
        word: "schreibt",
        translation: "writes",
        pronunciation: "shrypt",
        partOfSpeech: "verb",
      },
      {
        word: "das Buch",
        translation: "the book",
        pronunciation: "dahs bookh",
        partOfSpeech: "noun",
      },
      {
        word: "der Brief",
        translation: "the letter",
        pronunciation: "dehr breef",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        phrase: "Der Junge liest ein Buch.",
        translation: "The boy reads a book.",
        pronunciation: "dehr yoong-eh leest eye-n bookh",
      },
      {
        phrase: "Das Mädchen schreibt einen Brief.",
        translation: "The girl writes a letter.",
        pronunciation: "dahs meyd-khen shrypt eye-nen breef",
      },
      {
        phrase: "Ich esse.",
        translation: "I eat.",
        pronunciation: "ikh eh-seh",
      },
    ],
    activities: [
      {
        id: "de-verbs-mc-1",
        type: "multiple_choice",
        prompt: 'What does "isst" mean in English?',
        correctAnswer: "eats",
        options: ["eats", "drinks", "reads", "writes"],
      },
      {
        id: "de-verbs-mc-2",
        type: "multiple_choice",
        prompt: 'What does "liest" mean in English?',
        correctAnswer: "reads",
        options: ["eats", "drinks", "reads", "writes"],
      },
      {
        id: "de-verbs-fill-1",
        type: "fill_blank",
        prompt: "Complete the sentence:",
        correctAnswer: "isst",
        sentence: "Der Junge ___.",
        options: ["isst", "trinkt", "liest", "schreibt"],
      },
      {
        id: "de-verbs-match-1",
        type: "matching",
        prompt: "Match the German verbs to their English translations.",
        pairs: [
          ["isst", "eats"],
          ["trinkt", "drinks"],
          ["liest", "reads"],
          ["schreibt", "writes"],
        ],
      },
      {
        id: "de-verbs-speak-1",
        type: "speaking",
        prompt: "Say 'Ich esse' (I eat) out loud.",
        correctAnswer: "ich esse",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "de",
      topic: "First Verbs (German Basics 1)",
      keyVocabulary: ["isst", "trinkt", "liest", "schreibt", "das Buch", "der Brief", "Der Junge isst", "Now let"],
      prompt:
        "Lesson: First Verbs (German Basics 1). " +
        "Teaching 'isst' (eats), 'trinkt' (drinks), 'liest' (reads), 'schreibt' (writes), " +
        "'das Buch' (the book), 'der Brief' (the letter). " +
        "The goal is for the student to recognize these verbs and combine them with " +
        "nouns from the previous lesson to form simple sentences. " +
        "Start by reviewing one noun from the previous lesson, then introduce a verb. " +
        "Say a short sentence like 'Der Junge isst' (The boy eats), then ask the student " +
        "to repeat it. Build up slowly: 'Now let's try: Ich esse. That's I eat.'",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GERMAN — Greetings
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "de-greetings-hello",
    unitId: "de-greetings",
    title: "Hello & Goodbye",
    description: "Learn how to greet people and say goodbye in German.",
    order: 1,
    durationMinutes: 5,
    xp: 20,
    imageKey: "palace",
    goals: [
      {
        title: "Say hello and goodbye",
        description:
          "Use 'hallo', 'guten Morgen', 'guten Tag', 'guten Abend', and 'tschüss' naturally.",
      },
      {
        title: "Know formal vs. informal",
        description:
          "Understand when to use 'hallo' (informal) vs 'guten Tag' (formal).",
      },
    ],
    vocabulary: [
      {
        word: "hallo",
        translation: "hello",
        partOfSpeech: "greeting",
      },
      {
        word: "guten Morgen",
        translation: "good morning",
        pronunciation: "goo-ten mor-gen",
        partOfSpeech: "greeting",
      },
      {
        word: "guten Tag",
        translation: "good day",
        pronunciation: "goo-ten tahk",
        partOfSpeech: "greeting",
      },
      {
        word: "guten Abend",
        translation: "good evening",
        pronunciation: "goo-ten ah-bent",
        partOfSpeech: "greeting",
      },
      {
        word: "tschüss",
        translation: "bye (informal)",
        pronunciation: "chewss",
        partOfSpeech: "greeting",
      },
      {
        word: "auf Wiedersehen",
        translation: "goodbye (formal)",
        pronunciation: "owf vee-der-zay-en",
        partOfSpeech: "greeting",
      },
    ],
    phrases: [
      {
        phrase: "Guten Morgen! Wie geht es Ihnen?",
        translation: "Good morning! How are you? (formal)",
        pronunciation: "goo-ten mor-gen, vee gayt es ee-nen",
      },
      {
        phrase: "Hallo, wie geht's?",
        translation: "Hi, how's it going? (informal)",
        pronunciation: "hah-loh, vee gayts",
      },
      {
        phrase: "Tschüss, bis später!",
        translation: "Bye, see you later!",
        pronunciation: "chewss, biss shpay-ter",
      },
    ],
    activities: [
      {
        id: "de-greet-mc-1",
        type: "multiple_choice",
        prompt: 'You meet someone formally during the day. What do you say?',
        correctAnswer: "guten Tag",
        options: ["guten Tag", "hallo", "guten Abend", "tschüss"],
      },
      {
        id: "de-greet-mc-2",
        type: "multiple_choice",
        prompt: 'What does "auf Wiedersehen" mean?',
        correctAnswer: "goodbye (formal)",
        options: [
          "good morning",
          "hello",
          "goodbye (formal)",
          "see you later",
        ],
      },
      {
        id: "de-greet-fill-1",
        type: "fill_blank",
        prompt: "Complete the greeting:",
        correctAnswer: "Abend",
        sentence: "It's 8 PM. You say: Guten ___ (good evening).",
        options: ["Morgen", "Tag", "Abend", "tschüss"],
      },
      {
        id: "de-greet-match-1",
        type: "matching",
        prompt: "Match each greeting to its situation.",
        pairs: [
          ["guten Morgen", "morning"],
          ["guten Tag", "formal daytime"],
          ["guten Abend", "evening"],
          ["tschüss", "casual goodbye"],
        ],
      },
      {
        id: "de-greet-speak-1",
        type: "speaking",
        prompt: "Say 'Guten Morgen' out loud.",
        correctAnswer: "guten Morgen",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "de",
      topic: "Hello & Goodbye (German Greetings)",
      keyVocabulary: ["hallo", "guten Morgen", "guten Tag", "guten Abend", "tschüss", "auf Wiedersehen", "Hallo!", "guten Tag"],
      prompt:
        "Lesson: Hello & Goodbye (German Greetings). " +
        "Teaching 'hallo' (hello informal), 'guten Morgen' (good morning), " +
        "'guten Tag' (good day formal), 'guten Abend' (good evening), " +
        "'tschüss' (bye informal), 'auf Wiedersehen' (goodbye formal). " +
        "The goal is for the student to greet someone naturally and know when to be formal vs informal. " +
        "Start by saying 'Hallo!' and waiting for the student to repeat. " +
        "Explain that 'guten Tag' is more formal and 'hallo' is casual. " +
        "Pretend it's different times of day and ask the student which greeting to use. " +
        "End the session by saying 'Tschüss' and encouraging the student to say it back.",
    },
  },

  {
    id: "de-greetings-intro",
    unitId: "de-greetings",
    title: "Introduce Yourself",
    description:
      "Learn to say your name, ask someone's name, and say 'nice to meet you'.",
    order: 2,
    durationMinutes: 5,
    xp: 25,
    imageKey: "palace",
    goals: [
      {
        title: "Introduce yourself",
        description:
          "Say 'Ich heiße...' (My name is...) and ask 'Wie heißt du?' (What's your name?).",
      },
      {
        title: "Use polite phrases",
        description:
          "Learn 'freut mich' (nice to meet you) and 'gleichfalls' (likewise).",
      },
    ],
    vocabulary: [
      {
        word: "ich heiße",
        translation: "my name is / I am called",
        pronunciation: "ikh hy-seh",
        partOfSpeech: "phrase",
      },
      {
        word: "wie heißt du?",
        translation: "what's your name? (informal)",
        pronunciation: "vee hyst doo",
        partOfSpeech: "phrase",
      },
      {
        word: "freut mich",
        translation: "nice to meet you",
        pronunciation: "froyt mikh",
        partOfSpeech: "phrase",
      },
      {
        word: "gleichfalls",
        translation: "likewise",
        pronunciation: "glykh-fals",
        partOfSpeech: "adverb",
      },
      {
        word: "ich bin",
        translation: "I am",
        pronunciation: "ikh bin",
        partOfSpeech: "phrase",
      },
    ],
    phrases: [
      {
        phrase: "Hallo, ich heiße Anna.",
        translation: "Hello, my name is Anna.",
      },
      {
        phrase: "Wie heißt du?",
        translation: "What's your name?",
      },
      {
        phrase: "Freut mich!",
        translation: "Nice to meet you!",
      },
    ],
    activities: [
      {
        id: "de-intro-mc-1",
        type: "multiple_choice",
        prompt: 'What does "Ich heiße..." mean?',
        correctAnswer: "my name is...",
        options: [
          "my name is...",
          "how are you?",
          "nice to meet you",
          "goodbye",
        ],
      },
      {
        id: "de-intro-mc-2",
        type: "multiple_choice",
        prompt: 'How do you say "nice to meet you"?',
        correctAnswer: "freut mich",
        options: ["freut mich", "gleichfalls", "ich heiße", "tschüss"],
      },
      {
        id: "de-intro-fill-1",
        type: "fill_blank",
        prompt: "Complete the introduction:",
        correctAnswer: "heiße",
        sentence: "Hallo, ich ___ Anna.",
        options: ["heiße", "freut", "bin", "wie"],
      },
      {
        id: "de-intro-match-1",
        type: "matching",
        prompt: "Match the German phrase to its meaning.",
        pairs: [
          ["ich heiße", "my name is"],
          ["freut mich", "nice to meet you"],
          ["gleichfalls", "likewise"],
          ["wie heißt du?", "what's your name?"],
        ],
      },
      {
        id: "de-intro-speak-1",
        type: "speaking",
        prompt: "Say 'Hallo, ich heiße [your name]' out loud.",
        correctAnswer: "hallo ich heiße",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "de",
      topic: "Introduce Yourself (German Greetings)",
      keyVocabulary: ["ich heiße", "wie heißt du?", "s your name?), " +
        "", " (nice to meet you), ", " (likewise), ", " (I am). " +
        "The goal is for the student to introduce themselves and respond when someone else introduces themselves. " +
        "Start by introducing yourself in German: ", " " +
        "Then ask the student ", " and gently help them form the answer. " +
        "When they respond, say "],
      prompt:
        "Lesson: Introduce Yourself (German Greetings). " +
        "Teaching 'ich heiße' (my name is), 'wie heißt du?' (what's your name?), " +
        "'freut mich' (nice to meet you), 'gleichfalls' (likewise), 'ich bin' (I am). " +
        "The goal is for the student to introduce themselves and respond when someone else introduces themselves. " +
        "Start by introducing yourself in German: 'Hallo, ich heiße Klaus.' " +
        "Then ask the student 'Wie heißt du?' and gently help them form the answer. " +
        "When they respond, say 'Freut mich!' and encourage them to say it back. " +
        "Roleplay a short introduction conversation back and forth.",
    },
  },
];
