import type { Lesson } from "@/types/learning";

/**
 * Japanese lesson content.
 */

export const jaLessons: Lesson[] = [
// JAPANESE — Basics 1
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "ja-basics-1-nouns",
    unitId: "ja-basics-1",
    title: "First Words",
    description:
      "Learn your first Japanese words: everyday objects and people.",
    order: 1,
    durationMinutes: 5,
    xp: 20,
    imageKey: "palace",
    goals: [
      {
        title: "Learn basic nouns",
        description:
          "Recognize and say common nouns like 'boy', 'girl', 'man', 'woman' in Japanese.",
      },
      {
        title: "Understand particles",
        description:
          "Learn the basic topic marker 'wa' (は) and how Japanese sentences are structured.",
      },
    ],
    vocabulary: [
      {
        word: "おとこのこ",
        translation: "boy",
        pronunciation: "otoko no ko",
        partOfSpeech: "noun",
      },
      {
        word: "おんなのこ",
        translation: "girl",
        pronunciation: "onna no ko",
        partOfSpeech: "noun",
      },
      {
        word: "おとこ",
        translation: "man",
        pronunciation: "otoko",
        partOfSpeech: "noun",
      },
      {
        word: "おんな",
        translation: "woman",
        pronunciation: "onna",
        partOfSpeech: "noun",
      },
      {
        word: "みず",
        translation: "water",
        pronunciation: "mizu",
        partOfSpeech: "noun",
      },
      {
        word: "たべもの",
        translation: "food",
        pronunciation: "tabemono",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        phrase: "おとこのこが たべます。",
        translation: "The boy eats.",
        pronunciation: "otoko no ko ga tabemasu",
      },
      {
        phrase: "おんなのこが みずを のみます。",
        translation: "The girl drinks water.",
        pronunciation: "onna no ko ga mizu o nomimasu",
      },
    ],
    activities: [
      {
        id: "ja-nouns-mc-1",
        type: "multiple_choice",
        prompt: 'What does "おとこのこ" (otoko no ko) mean?',
        correctAnswer: "boy",
        options: ["boy", "girl", "man", "food"],
      },
      {
        id: "ja-nouns-mc-2",
        type: "multiple_choice",
        prompt: 'What does "おんな" (onna) mean?',
        correctAnswer: "woman",
        options: ["man", "water", "woman", "boy"],
      },
      {
        id: "ja-nouns-fill-1",
        type: "fill_blank",
        prompt: "Complete the sentence:",
        correctAnswer: "みず",
        sentence: "おんなのこが ___ を のみます。 (The girl drinks ___.)",
        options: ["みず", "たべもの", "おとこ", "おとこのこ"],
      },
      {
        id: "ja-nouns-match-1",
        type: "matching",
        prompt: "Match the Japanese words to their English translations.",
        pairs: [
          ["おとこ", "man"],
          ["おんなのこ", "girl"],
          ["たべもの", "food"],
          ["みず", "water"],
        ],
      },
      {
        id: "ja-nouns-speak-1",
        type: "speaking",
        prompt: "Say 'おとこのこ' (otoko no ko — boy) out loud.",
        correctAnswer: "otoko no ko",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "ja",
      topic: "First Words (Japanese Basics 1)",
      keyVocabulary: ["otoko no ko", "onna no ko", "otoko", "onna", "mizu", "tabemono"],
      prompt:
        "Lesson: First Words (Japanese Basics 1). " +
        "Teaching 'otoko no ko' (boy), 'onna no ko' (girl), 'otoko' (man), " +
        "'onna' (woman), 'mizu' (water), 'tabemono' (food). " +
        "The goal is for the student to recognize these nouns. " +
        "Japanese doesn't have gendered articles like Spanish or French, so no need to worry about that. " +
        "Start by introducing one word at a time. Say the word in Japanese, then in English, " +
        "then ask the student to repeat it. After a few words, ask simple questions like " +
        '"Which one means water?" and give positive feedback.',
    },
  },

  {
    id: "ja-basics-1-verbs",
    unitId: "ja-basics-1",
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
          "Recognize and use common verbs like 'to eat', 'to drink', 'to read' in Japanese.",
      },
      {
        title: "Form simple sentences",
        description:
          "Combine nouns and verbs with particles to make short sentences.",
      },
    ],
    vocabulary: [
      {
        word: "たべます",
        translation: "eats",
        pronunciation: "tabemasu",
        partOfSpeech: "verb",
      },
      {
        word: "のみます",
        translation: "drinks",
        pronunciation: "nomimasu",
        partOfSpeech: "verb",
      },
      {
        word: "よみます",
        translation: "reads",
        pronunciation: "yomimasu",
        partOfSpeech: "verb",
      },
      {
        word: "かきます",
        translation: "writes",
        pronunciation: "kakimasu",
        partOfSpeech: "verb",
      },
      {
        word: "ほん",
        translation: "book",
        pronunciation: "hon",
        partOfSpeech: "noun",
      },
      {
        word: "てがみ",
        translation: "letter",
        pronunciation: "tegami",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        phrase: "おとこのこが ほんを よみます。",
        translation: "The boy reads a book.",
        pronunciation: "otoko no ko ga hon o yomimasu",
      },
      {
        phrase: "おんなのこが てがみを かきます。",
        translation: "The girl writes a letter.",
        pronunciation: "onna no ko ga tegami o kakimasu",
      },
      {
        phrase: "わたしは たべます。",
        translation: "I eat.",
        pronunciation: "watashi wa tabemasu",
      },
    ],
    activities: [
      {
        id: "ja-verbs-mc-1",
        type: "multiple_choice",
        prompt: 'What does "たべます" (tabemasu) mean?',
        correctAnswer: "eats",
        options: ["eats", "drinks", "reads", "writes"],
      },
      {
        id: "ja-verbs-mc-2",
        type: "multiple_choice",
        prompt: 'What does "よみます" (yomimasu) mean?',
        correctAnswer: "reads",
        options: ["eats", "drinks", "reads", "writes"],
      },
      {
        id: "ja-verbs-fill-1",
        type: "fill_blank",
        prompt: "Complete the sentence:",
        correctAnswer: "たべます",
        sentence: "おとこのこが ___。 (The boy eats.)",
        options: ["たべます", "のみます", "よみます", "かきます"],
      },
      {
        id: "ja-verbs-match-1",
        type: "matching",
        prompt: "Match the Japanese verbs to their English translations.",
        pairs: [
          ["たべます", "eats"],
          ["のみます", "drinks"],
          ["よみます", "reads"],
          ["かきます", "writes"],
        ],
      },
      {
        id: "ja-verbs-speak-1",
        type: "speaking",
        prompt: "Say 'わたしは たべます' (watashi wa tabemasu — I eat) out loud.",
        correctAnswer: "watashi wa tabemasu",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "ja",
      topic: "First Verbs (Japanese Basics 1)",
      keyVocabulary: ["tabemasu", "nomimasu", "yomimasu", "kakimasu", "hon", "tegami", "Otoko no ko ga tabemasu", "Now let"],
      prompt:
        "Lesson: First Verbs (Japanese Basics 1). " +
        "Teaching 'tabemasu' (eats), 'nomimasu' (drinks), 'yomimasu' (reads), " +
        "'kakimasu' (writes), 'hon' (book), 'tegami' (letter). " +
        "The goal is for the student to recognize these verbs and combine them with " +
        "nouns from the previous lesson to form simple sentences. " +
        "Start by reviewing one noun from the previous lesson, then introduce a verb. " +
        "Say a short sentence like 'Otoko no ko ga tabemasu' (The boy eats), then ask the student " +
        "to repeat it. Build up slowly: 'Now let's try: Watashi wa tabemasu. That's I eat.'",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // JAPANESE — Greetings
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "ja-greetings-hello",
    unitId: "ja-greetings",
    title: "Hello & Goodbye",
    description: "Learn how to greet people and say goodbye in Japanese.",
    order: 1,
    durationMinutes: 5,
    xp: 20,
    imageKey: "mascotWelcome",
    goals: [
      {
        title: "Say hello and goodbye",
        description:
          "Use 'konnichiwa', 'ohayō gozaimasu', 'konbanwa', and 'sayōnara' naturally.",
      },
      {
        title: "Know when to use each greeting",
        description:
          "Understand which greeting to use based on the time of day and formality.",
      },
    ],
    vocabulary: [
      {
        word: "こんにちは",
        translation: "hello / good afternoon",
        pronunciation: "konnichiwa",
        partOfSpeech: "greeting",
      },
      {
        word: "おはよう ございます",
        translation: "good morning (polite)",
        pronunciation: "ohayō gozaimasu",
        partOfSpeech: "greeting",
      },
      {
        word: "こんばんは",
        translation: "good evening",
        pronunciation: "konbanwa",
        partOfSpeech: "greeting",
      },
      {
        word: "さようなら",
        translation: "goodbye",
        pronunciation: "sayōnara",
        partOfSpeech: "greeting",
      },
      {
        word: "また あした",
        translation: "see you tomorrow",
        pronunciation: "mata ashita",
        partOfSpeech: "phrase",
      },
    ],
    phrases: [
      {
        phrase: "おはよう ございます！",
        translation: "Good morning!",
        pronunciation: "ohayō gozaimasu",
      },
      {
        phrase: "こんにちは、おげんき です か？",
        translation: "Hello, how are you?",
        pronunciation: "konnichiwa, ogenki desu ka",
      },
      {
        phrase: "さようなら、また あした。",
        translation: "Goodbye, see you tomorrow.",
        pronunciation: "sayōnara, mata ashita",
      },
    ],
    activities: [
      {
        id: "ja-greet-mc-1",
        type: "multiple_choice",
        prompt: 'You see someone at 9 AM. What do you say?',
        correctAnswer: "おはよう ございます",
        options: [
          "おはよう ございます",
          "こんにちは",
          "こんばんは",
          "さようなら",
        ],
      },
      {
        id: "ja-greet-mc-2",
        type: "multiple_choice",
        prompt: 'What does "また あした" (mata ashita) mean?',
        correctAnswer: "see you tomorrow",
        options: [
          "good morning",
          "hello",
          "see you tomorrow",
          "good night",
        ],
      },
      {
        id: "ja-greet-fill-1",
        type: "fill_blank",
        prompt: "Complete the greeting:",
        correctAnswer: "こんばんは",
        sentence: "It's 7 PM. You say: ___ (good evening).",
        options: [
          "おはよう ございます",
          "こんにちは",
          "こんばんは",
          "さようなら",
        ],
      },
      {
        id: "ja-greet-match-1",
        type: "matching",
        prompt: "Match each greeting to when you'd use it.",
        pairs: [
          ["おはよう ございます", "morning (polite)"],
          ["こんにちは", "afternoon"],
          ["こんばんは", "evening"],
          ["さようなら", "goodbye"],
        ],
      },
      {
        id: "ja-greet-speak-1",
        type: "speaking",
        prompt: "Say 'こんにちは' (konnichiwa) out loud.",
        correctAnswer: "konnichiwa",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "ja",
      topic: "Hello & Goodbye (Japanese Greetings)",
      keyVocabulary: ["ohayō gozaimasu", "konnichiwa", "konbanwa", "sayōnara", "mata ashita", "Konnichiwa!", "ohayō gozaimasu", "s polite and used in the morning. " +
        "Pretend it"],
      prompt:
        "Lesson: Hello & Goodbye (Japanese Greetings). " +
        "Teaching 'ohayō gozaimasu' (good morning polite), 'konnichiwa' (hello/afternoon), " +
        "'konbanwa' (good evening), 'sayōnara' (goodbye), 'mata ashita' (see you tomorrow). " +
        "The goal is for the student to greet someone naturally based on time of day. " +
        "Start by saying 'Konnichiwa!' and waiting for the student to repeat. " +
        "Then introduce 'ohayō gozaimasu' — explain it's polite and used in the morning. " +
        "Pretend it's different times of day and ask the student which greeting to use. " +
        "End the session by saying 'Sayōnara' and encouraging the student to say it back.",
    },
  },

  {
    id: "ja-greetings-intro",
    unitId: "ja-greetings",
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
          "Say 'Watashi wa... desu' (I am...) and ask 'O-namae wa?' (What's your name?).",
      },
      {
        title: "Use polite phrases",
        description:
          "Learn 'hajimemashite' (nice to meet you) and 'yoroshiku onegai shimasu' (pleased to meet you).",
      },
    ],
    vocabulary: [
      {
        word: "わたし",
        translation: "I / me",
        pronunciation: "watashi",
        partOfSpeech: "pronoun",
      },
      {
        word: "おなまえ",
        translation: "name (polite)",
        pronunciation: "o-namae",
        partOfSpeech: "noun",
      },
      {
        word: "はじめまして",
        translation: "nice to meet you",
        pronunciation: "hajimemashite",
        partOfSpeech: "phrase",
      },
      {
        word: "よろしく おねがい します",
        translation: "pleased to meet you / please be kind to me",
        pronunciation: "yoroshiku onegai shimasu",
        partOfSpeech: "phrase",
      },
      {
        word: "です",
        translation: "am / is / are",
        pronunciation: "desu",
        partOfSpeech: "copula",
      },
    ],
    phrases: [
      {
        phrase: "はじめまして、わたしは たなか です。",
        translation: "Nice to meet you, I am Tanaka.",
        pronunciation: "hajimemashite, watashi wa Tanaka desu",
      },
      {
        phrase: "おなまえ は？",
        translation: "What's your name?",
        pronunciation: "o-namae wa",
      },
      {
        phrase: "よろしく おねがい します。",
        translation: "Pleased to meet you.",
        pronunciation: "yoroshiku onegai shimasu",
      },
    ],
    activities: [
      {
        id: "ja-intro-mc-1",
        type: "multiple_choice",
        prompt: 'What does "はじめまして" (hajimemashite) mean?',
        correctAnswer: "nice to meet you",
        options: ["goodbye", "how are you?", "nice to meet you", "my name is"],
      },
      {
        id: "ja-intro-mc-2",
        type: "multiple_choice",
        prompt: 'What does "わたし" (watashi) mean?',
        correctAnswer: "I / me",
        options: ["you", "I / me", "name", "hello"],
      },
      {
        id: "ja-intro-fill-1",
        type: "fill_blank",
        prompt: "Complete the introduction:",
        correctAnswer: "です",
        sentence: "わたしは アナ ___。 (I am Ana.)",
        options: ["です", "は", "わたし", "おなまえ"],
      },
      {
        id: "ja-intro-match-1",
        type: "matching",
        prompt: "Match the Japanese phrase to its meaning.",
        pairs: [
          ["はじめまして", "nice to meet you"],
          ["わたし", "I / me"],
          ["おなまえ", "name (polite)"],
          ["よろしく おねがい します", "pleased to meet you"],
        ],
      },
      {
        id: "ja-intro-speak-1",
        type: "speaking",
        prompt: "Say 'はじめまして、わたしは [your name] です' out loud.",
        correctAnswer: "hajimemashite watashi wa",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "ja",
      topic: "Introduce Yourself (Japanese Greetings)",
      keyVocabulary: ["watashi", "o-namae", "hajimemashite", "yoroshiku onegai shimasu", "desu", "Hajimemashite, watashi wa Yuki desu.", "O-namae wa?", "Yoroshiku onegai shimasu"],
      prompt:
        "Lesson: Introduce Yourself (Japanese Greetings). " +
        "Teaching 'watashi' (I/me), 'o-namae' (name polite), " +
        "'hajimemashite' (nice to meet you), 'yoroshiku onegai shimasu' (pleased to meet you), " +
        "'desu' (am/is/are). " +
        "The goal is for the student to introduce themselves and respond when someone else introduces themselves. " +
        "Start by introducing yourself: 'Hajimemashite, watashi wa Yuki desu.' " +
        "Then ask the student 'O-namae wa?' and gently help them form the answer. " +
        "When they respond, say 'Yoroshiku onegai shimasu' and encourage them to say it back. " +
        "Roleplay a short introduction conversation back and forth.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
];
