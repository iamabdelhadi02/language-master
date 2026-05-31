import type { Lesson } from "@/types/learning";

/**
 * French lesson content.
 */

export const frLessons: Lesson[] = [
// FRENCH — Basics 1
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "fr-basics-1-nouns",
    unitId: "fr-basics-1",
    title: "First Words",
    description: "Learn your first French words: everyday objects and people.",
    order: 1,
    durationMinutes: 5,
    xp: 20,
    imageKey: "palace",
    goals: [
      {
        title: "Learn basic nouns",
        description:
          "Recognize and say common nouns like 'boy', 'girl', 'man', 'woman' in French.",
      },
      {
        title: "Understand gendered articles",
        description:
          "Learn when to use 'le' vs 'la' for masculine and feminine nouns.",
      },
    ],
    vocabulary: [
      {
        word: "le garçon",
        translation: "the boy",
        pronunciation: "luh gahr-sohn",
        partOfSpeech: "noun",
      },
      {
        word: "la fille",
        translation: "the girl",
        pronunciation: "lah fee-yuh",
        partOfSpeech: "noun",
      },
      {
        word: "l'homme",
        translation: "the man",
        pronunciation: "lohm",
        partOfSpeech: "noun",
      },
      {
        word: "la femme",
        translation: "the woman",
        pronunciation: "lah fahm",
        partOfSpeech: "noun",
      },
      {
        word: "l'eau",
        translation: "the water",
        pronunciation: "loh",
        partOfSpeech: "noun",
      },
      {
        word: "la nourriture",
        translation: "the food",
        pronunciation: "lah noo-ree-tyur",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        phrase: "Le garçon mange.",
        translation: "The boy eats.",
        pronunciation: "luh gahr-sohn mahnzh",
      },
      {
        phrase: "La femme boit de l'eau.",
        translation: "The woman drinks water.",
        pronunciation: "lah fahm bwah duh loh",
      },
    ],
    activities: [
      {
        id: "fr-nouns-mc-1",
        type: "multiple_choice",
        prompt: 'What does "le garçon" mean?',
        correctAnswer: "the boy",
        options: ["the boy", "the girl", "the man", "the food"],
      },
      {
        id: "fr-nouns-mc-2",
        type: "multiple_choice",
        prompt: 'What does "la femme" mean?',
        correctAnswer: "the woman",
        options: ["the man", "the water", "the woman", "the boy"],
      },
      {
        id: "fr-nouns-fill-1",
        type: "fill_blank",
        prompt: "Complete the sentence:",
        correctAnswer: "eau",
        sentence: "La femme boit de l'___.",
        options: ["eau", "nourriture", "garçon", "homme"],
      },
      {
        id: "fr-nouns-match-1",
        type: "matching",
        prompt: "Match the French words to their English translations.",
        pairs: [
          ["l'homme", "the man"],
          ["la fille", "the girl"],
          ["la nourriture", "the food"],
          ["l'eau", "the water"],
        ],
      },
      {
        id: "fr-nouns-speak-1",
        type: "speaking",
        prompt: "Say 'le garçon' (the boy) out loud.",
        correctAnswer: "le garçon",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "fr",
      topic: "First Words (French Basics 1)",
      keyVocabulary: ["le garçon", "la fille", "l\\", " (the man), " +
        "", " (the woman), ", "eau", "la nourriture", "le"],
      prompt:
        "Lesson: First Words (French Basics 1). " +
        "Teaching 'le garçon' (the boy), 'la fille' (the girl), 'l\\'homme' (the man), " +
        "'la femme' (the woman), 'l\\'eau' (the water), 'la nourriture' (the food). " +
        "The goal is for the student to recognize these nouns and understand " +
        "the difference between 'le' (masculine) and 'la' (feminine) articles. " +
        "Start by introducing one word at a time. Say the word in French, then in English, " +
        "then ask the student to repeat it. After a few words, ask simple questions like " +
        '"Which one means the boy?" and give positive feedback.',
    },
  },

  {
    id: "fr-basics-1-verbs",
    unitId: "fr-basics-1",
    title: "First Verbs",
    description: "Learn action words: eat, drink, read, and write.",
    order: 2,
    durationMinutes: 5,
    xp: 20,
    imageKey: "earth",
    goals: [
      {
        title: "Learn basic verbs",
        description:
          "Recognize and use common verbs like 'to eat', 'to drink', 'to read' in French.",
      },
      {
        title: "Form simple sentences",
        description:
          "Combine nouns and verbs to make short sentences like 'The boy eats.'",
      },
    ],
    vocabulary: [
      {
        word: "mange",
        translation: "eats",
        pronunciation: "mahnzh",
        partOfSpeech: "verb",
      },
      {
        word: "boit",
        translation: "drinks",
        pronunciation: "bwah",
        partOfSpeech: "verb",
      },
      {
        word: "lit",
        translation: "reads",
        pronunciation: "lee",
        partOfSpeech: "verb",
      },
      {
        word: "écrit",
        translation: "writes",
        pronunciation: "ay-kree",
        partOfSpeech: "verb",
      },
      {
        word: "le livre",
        translation: "the book",
        pronunciation: "luh leevr",
        partOfSpeech: "noun",
      },
      {
        word: "la lettre",
        translation: "the letter",
        pronunciation: "lah lehtr",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        phrase: "Le garçon lit un livre.",
        translation: "The boy reads a book.",
        pronunciation: "luh gahr-sohn lee uhn leevr",
      },
      {
        phrase: "La fille écrit une lettre.",
        translation: "The girl writes a letter.",
        pronunciation: "lah fee-yuh ay-kree ewn lehtr",
      },
      {
        phrase: "Je mange.",
        translation: "I eat.",
        pronunciation: "zhuh mahnzh",
      },
    ],
    activities: [
      {
        id: "fr-verbs-mc-1",
        type: "multiple_choice",
        prompt: 'What does "mange" mean in English?',
        correctAnswer: "eats",
        options: ["eats", "drinks", "reads", "writes"],
      },
      {
        id: "fr-verbs-mc-2",
        type: "multiple_choice",
        prompt: 'What does "lit" mean in English?',
        correctAnswer: "reads",
        options: ["eats", "drinks", "reads", "writes"],
      },
      {
        id: "fr-verbs-fill-1",
        type: "fill_blank",
        prompt: "Complete the sentence:",
        correctAnswer: "mange",
        sentence: "Le garçon ___.",
        options: ["mange", "boit", "lit", "écrit"],
      },
      {
        id: "fr-verbs-match-1",
        type: "matching",
        prompt: "Match the French verbs to their English translations.",
        pairs: [
          ["mange", "eats"],
          ["boit", "drinks"],
          ["lit", "reads"],
          ["écrit", "writes"],
        ],
      },
      {
        id: "fr-verbs-speak-1",
        type: "speaking",
        prompt: "Say 'Je mange' (I eat) out loud.",
        correctAnswer: "je mange",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "fr",
      topic: "First Verbs (French Basics 1)",
      keyVocabulary: ["mange", "boit", "lit", "écrit", "le livre", "la lettre", "Le garçon mange", "Now let"],
      prompt:
        "Lesson: First Verbs (French Basics 1). " +
        "Teaching 'mange' (eats), 'boit' (drinks), 'lit' (reads), 'écrit' (writes), " +
        "'le livre' (the book), 'la lettre' (the letter). " +
        "The goal is for the student to recognize these verbs and combine them with " +
        "nouns from the previous lesson to form simple sentences. " +
        "Start by reviewing one noun from the previous lesson, then introduce a verb. " +
        "Say a short sentence like 'Le garçon mange' (The boy eats), then ask the student " +
        "to repeat it. Build up slowly: 'Now let's try: Je mange. That's I eat.'",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FRENCH — Greetings
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "fr-greetings-hello",
    unitId: "fr-greetings",
    title: "Hello & Goodbye",
    description: "Learn how to greet people and say goodbye in French.",
    order: 1,
    durationMinutes: 5,
    xp: 20,
    imageKey: "mascotWelcome",
    goals: [
      {
        title: "Say hello and goodbye",
        description:
          "Use 'bonjour', 'bonsoir', 'salut', and 'au revoir' naturally.",
      },
      {
        title: "Know formal vs. informal",
        description:
          "Understand when to use 'bonjour' (formal) vs 'salut' (informal).",
      },
    ],
    vocabulary: [
      {
        word: "bonjour",
        translation: "hello / good day",
        pronunciation: "bohn-zhoor",
        partOfSpeech: "greeting",
      },
      {
        word: "salut",
        translation: "hi / bye (informal)",
        pronunciation: "sah-lew",
        partOfSpeech: "greeting",
      },
      {
        word: "bonsoir",
        translation: "good evening",
        pronunciation: "bohn-swahr",
        partOfSpeech: "greeting",
      },
      {
        word: "au revoir",
        translation: "goodbye",
        pronunciation: "oh ruh-vwahr",
        partOfSpeech: "greeting",
      },
      {
        word: "à bientôt",
        translation: "see you soon",
        pronunciation: "ah byan-toh",
        partOfSpeech: "phrase",
      },
    ],
    phrases: [
      {
        phrase: "Bonjour, comment allez-vous?",
        translation: "Hello, how are you? (formal)",
        pronunciation: "bohn-zhoor, koh-mahn tah-lay voo",
      },
      {
        phrase: "Salut, ça va?",
        translation: "Hi, how's it going? (informal)",
        pronunciation: "sah-lew, sah vah",
      },
      {
        phrase: "Au revoir, à bientôt!",
        translation: "Goodbye, see you soon!",
        pronunciation: "oh ruh-vwahr, ah byan-toh",
      },
    ],
    activities: [
      {
        id: "fr-greet-mc-1",
        type: "multiple_choice",
        prompt: 'You meet a stranger during the day. What do you say?',
        correctAnswer: "bonjour",
        options: ["bonjour", "salut", "bonsoir", "au revoir"],
      },
      {
        id: "fr-greet-mc-2",
        type: "multiple_choice",
        prompt: 'What does "à bientôt" mean?',
        correctAnswer: "see you soon",
        options: ["good evening", "hello", "see you soon", "goodbye"],
      },
      {
        id: "fr-greet-fill-1",
        type: "fill_blank",
        prompt: "Complete the greeting:",
        correctAnswer: "bonsoir",
        sentence: "It's 8 PM. You say: ___ (good evening).",
        options: ["bonjour", "salut", "bonsoir", "au revoir"],
      },
      {
        id: "fr-greet-match-1",
        type: "matching",
        prompt: "Match each greeting to its situation.",
        pairs: [
          ["bonjour", "formal daytime"],
          ["salut", "informal / friends"],
          ["bonsoir", "evening"],
          ["au revoir", "leaving"],
        ],
      },
      {
        id: "fr-greet-speak-1",
        type: "speaking",
        prompt: "Say 'Bonjour, ça va?' out loud.",
        correctAnswer: "bonjour ça va",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "fr",
      topic: "Hello & Goodbye (French Greetings)",
      keyVocabulary: ["bonjour", "salut", "bonsoir", "au revoir", "à bientôt", "Bonjour!", "salut", "bonjour"],
      prompt:
        "Lesson: Hello & Goodbye (French Greetings). " +
        "Teaching 'bonjour' (hello/good day), 'salut' (hi/bye informal), " +
        "'bonsoir' (good evening), 'au revoir' (goodbye), 'à bientôt' (see you soon). " +
        "The goal is for the student to greet someone naturally and know when to be formal vs informal. " +
        "Start by saying 'Bonjour!' and waiting for the student to repeat. " +
        "Explain that 'salut' is for friends and 'bonjour' is for everyone else. " +
        "Pretend it's evening and ask the student which greeting to use. " +
        "End the session by saying 'Au revoir' and encouraging the student to say it back.",
    },
  },

  {
    id: "fr-greetings-intro",
    unitId: "fr-greetings",
    title: "Introduce Yourself",
    description:
      "Learn to say your name, ask someone's name, and say 'nice to meet you'.",
    order: 2,
    durationMinutes: 5,
    xp: 25,
    imageKey: "treasure",
    goals: [
      {
        title: "Introduce yourself",
        description:
          "Say 'Je m'appelle...' (My name is...) and ask 'Comment tu t'appelles?' (What's your name?).",
      },
      {
        title: "Use polite phrases",
        description:
          "Learn 'enchanté(e)' (nice to meet you) and 'moi aussi' (me too).",
      },
    ],
    vocabulary: [
      {
        word: "je m'appelle",
        translation: "my name is",
        pronunciation: "zhuh mah-pehl",
        partOfSpeech: "phrase",
      },
      {
        word: "comment tu t'appelles?",
        translation: "what's your name? (informal)",
        pronunciation: "koh-mahn tew tah-pehl",
        partOfSpeech: "phrase",
      },
      {
        word: "enchanté",
        translation: "nice to meet you",
        pronunciation: "ahn-shahn-tay",
        partOfSpeech: "phrase",
      },
      {
        word: "moi aussi",
        translation: "me too",
        pronunciation: "mwah oh-see",
        partOfSpeech: "phrase",
      },
    ],
    phrases: [
      {
        phrase: "Bonjour, je m'appelle Marie.",
        translation: "Hello, my name is Marie.",
      },
      {
        phrase: "Enchanté!",
        translation: "Nice to meet you!",
      },
      {
        phrase: "Comment tu t'appelles?",
        translation: "What's your name?",
      },
    ],
    activities: [
      {
        id: "fr-intro-mc-1",
        type: "multiple_choice",
        prompt: 'What does "Je m\'appelle..." mean?',
        correctAnswer: "my name is...",
        options: [
          "my name is...",
          "how are you?",
          "nice to meet you",
          "goodbye",
        ],
      },
      {
        id: "fr-intro-mc-2",
        type: "multiple_choice",
        prompt: 'How do you say "nice to meet you"?',
        correctAnswer: "enchanté",
        options: ["enchanté", "moi aussi", "je m'appelle", "au revoir"],
      },
      {
        id: "fr-intro-fill-1",
        type: "fill_blank",
        prompt: "Complete the introduction:",
        correctAnswer: "m'appelle",
        sentence: "Bonjour, je ___ Marie.",
        options: ["m'appelle", "enchanté", "suis", "comment"],
      },
      {
        id: "fr-intro-match-1",
        type: "matching",
        prompt: "Match the French phrase to its meaning.",
        pairs: [
          ["je m'appelle", "my name is"],
          ["enchanté", "nice to meet you"],
          ["moi aussi", "me too"],
          ["comment tu t'appelles?", "what's your name?"],
        ],
      },
      {
        id: "fr-intro-speak-1",
        type: "speaking",
        prompt: "Say 'Bonjour, je m'appelle [your name]' out loud.",
        correctAnswer: "bonjour je m'appelle",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "fr",
      topic: "Introduce Yourself (French Greetings)",
      keyVocabulary: ["je m\\", " (my name is), ", "appelles?", "s your name?), " +
        "", " (nice to meet you), ", " (me too). " +
        "The goal is for the student to introduce themselves and respond when someone else introduces themselves. " +
        "Start by introducing yourself in French: ", "appelle Camille.", "Comment tu t\\"],
      prompt:
        "Lesson: Introduce Yourself (French Greetings). " +
        "Teaching 'je m\\'appelle' (my name is), 'comment tu t\\'appelles?' (what's your name?), " +
        "'enchanté' (nice to meet you), 'moi aussi' (me too). " +
        "The goal is for the student to introduce themselves and respond when someone else introduces themselves. " +
        "Start by introducing yourself in French: 'Bonjour, je m\\'appelle Camille.' " +
        "Then ask the student 'Comment tu t\\'appelles?' and gently help them form the answer. " +
        "When they respond, say 'Enchantée!' and encourage them to say it back. " +
        "Roleplay a short introduction conversation back and forth.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
];
