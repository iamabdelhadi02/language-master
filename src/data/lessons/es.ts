import type { Lesson } from "@/types/learning";

/**
 * Spanish lesson content.
 */

export const esLessons: Lesson[] = [
// SPANISH — Basics 1
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "es-basics-1-nouns",
    unitId: "es-basics-1",
    title: "First Words",
    description: "Learn your first Spanish words: everyday objects and people.",
    order: 1,
    durationMinutes: 5,
    xp: 20,
    imageKey: "palace",
    goals: [
      {
        title: "Learn basic nouns",
        description:
          "Recognize and say common nouns like 'boy', 'girl', 'man', 'woman' in Spanish.",
      },
      {
        title: "Understand gendered articles",
        description:
          "Learn when to use 'el' vs 'la' for masculine and feminine nouns.",
      },
    ],
    vocabulary: [
      {
        word: "el niño",
        translation: "the boy",
        pronunciation: "el neen-yo",
        partOfSpeech: "noun",
      },
      {
        word: "la niña",
        translation: "the girl",
        pronunciation: "la neen-ya",
        partOfSpeech: "noun",
      },
      {
        word: "el hombre",
        translation: "the man",
        pronunciation: "el om-breh",
        partOfSpeech: "noun",
      },
      {
        word: "la mujer",
        translation: "the woman",
        pronunciation: "la moo-hehr",
        partOfSpeech: "noun",
      },
      {
        word: "el agua",
        translation: "the water",
        pronunciation: "el ah-gwah",
        partOfSpeech: "noun",
      },
      {
        word: "la comida",
        translation: "the food",
        pronunciation: "la koh-mee-dah",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        phrase: "El niño come.",
        translation: "The boy eats.",
        pronunciation: "el neen-yo koh-meh",
      },
      {
        phrase: "La mujer bebe agua.",
        translation: "The woman drinks water.",
        pronunciation: "la moo-hehr beh-beh ah-gwah",
      },
    ],
    activities: [
      {
        id: "es-nouns-mc-1",
        type: "multiple_choice",
        prompt: 'What does "el niño" mean?',
        correctAnswer: "the boy",
        options: ["the boy", "the girl", "the man", "the food"],
      },
      {
        id: "es-nouns-mc-2",
        type: "multiple_choice",
        prompt: 'What does "la mujer" mean?',
        correctAnswer: "the woman",
        options: ["the man", "the water", "the woman", "the boy"],
      },
      {
        id: "es-nouns-fill-1",
        type: "fill_blank",
        prompt: "Complete the sentence:",
        correctAnswer: "agua",
        sentence: "La mujer bebe ___.",
        options: ["agua", "comida", "niño", "hombre"],
      },
      {
        id: "es-nouns-match-1",
        type: "matching",
        prompt: "Match the Spanish words to their English translations.",
        pairs: [
          ["el hombre", "the man"],
          ["la niña", "the girl"],
          ["la comida", "the food"],
          ["el agua", "the water"],
        ],
      },
      {
        id: "es-nouns-speak-1",
        type: "speaking",
        prompt: "Say 'el niño' (the boy) out loud.",
        correctAnswer: "el niño",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "es",
      topic: "First Words (Spanish Basics 1)",
      keyVocabulary: ["el niño", "la niña", "el hombre", "la mujer", "el agua", "la comida", "el", "la"],
      prompt:
        "Lesson: First Words (Spanish Basics 1). " +
        "Teaching 'el niño' (the boy), 'la niña' (the girl), 'el hombre' (the man), " +
        "'la mujer' (the woman), 'el agua' (the water), 'la comida' (the food). " +
        "The goal is for the student to recognize these nouns and understand " +
        "the difference between 'el' (masculine) and 'la' (feminine) articles. " +
        "Start by introducing one word at a time. Say the word in Spanish, then in English, " +
        "then ask the student to repeat it. After a few words, ask simple questions like " +
        '"Which one means the boy?" and give positive feedback.',
    },
  },

  {
    id: "es-basics-1-verbs",
    unitId: "es-basics-1",
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
          "Recognize and use common verbs like 'to eat', 'to drink', 'to read' in Spanish.",
      },
      {
        title: "Form simple sentences",
        description:
          "Combine nouns and verbs to make short sentences like 'The boy eats.'",
      },
    ],
    vocabulary: [
      {
        word: "come",
        translation: "eats",
        pronunciation: "koh-meh",
        partOfSpeech: "verb",
      },
      {
        word: "bebe",
        translation: "drinks",
        pronunciation: "beh-beh",
        partOfSpeech: "verb",
      },
      {
        word: "lee",
        translation: "reads",
        pronunciation: "leh-eh",
        partOfSpeech: "verb",
      },
      {
        word: "escribe",
        translation: "writes",
        pronunciation: "ehs-kree-beh",
        partOfSpeech: "verb",
      },
      {
        word: "el libro",
        translation: "the book",
        pronunciation: "el lee-broh",
        partOfSpeech: "noun",
      },
      {
        word: "la carta",
        translation: "the letter",
        pronunciation: "la kahr-tah",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        phrase: "El niño lee un libro.",
        translation: "The boy reads a book.",
        pronunciation: "el neen-yo leh-eh oon lee-broh",
      },
      {
        phrase: "La niña escribe una carta.",
        translation: "The girl writes a letter.",
        pronunciation: "la neen-ya ehs-kree-beh oo-nah kahr-tah",
      },
      {
        phrase: "Yo como.",
        translation: "I eat.",
        pronunciation: "yoh koh-moh",
      },
    ],
    activities: [
      {
        id: "es-verbs-mc-1",
        type: "multiple_choice",
        prompt: 'What does "come" mean in English?',
        correctAnswer: "eats",
        options: ["eats", "drinks", "reads", "writes"],
      },
      {
        id: "es-verbs-mc-2",
        type: "multiple_choice",
        prompt: 'What does "lee" mean in English?',
        correctAnswer: "reads",
        options: ["eats", "drinks", "reads", "writes"],
      },
      {
        id: "es-verbs-fill-1",
        type: "fill_blank",
        prompt: "Complete the sentence:",
        correctAnswer: "come",
        sentence: "El niño ___.",
        options: ["come", "bebe", "lee", "escribe"],
      },
      {
        id: "es-verbs-match-1",
        type: "matching",
        prompt: "Match the Spanish verbs to their English translations.",
        pairs: [
          ["come", "eats"],
          ["bebe", "drinks"],
          ["lee", "reads"],
          ["escribe", "writes"],
        ],
      },
      {
        id: "es-verbs-speak-1",
        type: "speaking",
        prompt: "Say 'Yo como' (I eat) out loud.",
        correctAnswer: "yo como",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "es",
      topic: "First Verbs (Spanish Basics 1)",
      keyVocabulary: ["come", "bebe", "lee", "escribe", "el libro", "la carta", "El niño come", "Now let"],
      prompt:
        "Lesson: First Verbs (Spanish Basics 1). " +
        "Teaching 'come' (eats), 'bebe' (drinks), 'lee' (reads), 'escribe' (writes), " +
        "'el libro' (the book), 'la carta' (the letter). " +
        "The goal is for the student to recognize these verbs and combine them with " +
        "nouns from the previous lesson to form simple sentences. " +
        "Start by reviewing one noun from the previous lesson, then introduce a verb. " +
        "Say a short sentence like 'El niño come' (The boy eats), then ask the student " +
        "to repeat it. Build up slowly: 'Now let's try: Yo como. That's I eat.'",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SPANISH — Greetings
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "es-greetings-hello",
    unitId: "es-greetings",
    title: "Hello & Goodbye",
    description: "Learn how to greet people and say goodbye in Spanish.",
    order: 1,
    durationMinutes: 5,
    xp: 20,
    imageKey: "mascotWelcome",
    goals: [
      {
        title: "Say hello and goodbye",
        description:
          "Use 'hola', 'buenos días', 'buenas tardes', 'buenas noches', and 'adiós' naturally.",
      },
      {
        title: "Know when to use each greeting",
        description:
          "Understand which greeting to use based on the time of day.",
      },
    ],
    vocabulary: [
      {
        word: "hola",
        translation: "hello",
        partOfSpeech: "greeting",
      },
      {
        word: "buenos días",
        translation: "good morning",
        partOfSpeech: "greeting",
      },
      {
        word: "buenas tardes",
        translation: "good afternoon",
        partOfSpeech: "greeting",
      },
      {
        word: "buenas noches",
        translation: "good evening / good night",
        partOfSpeech: "greeting",
      },
      {
        word: "adiós",
        translation: "goodbye",
        partOfSpeech: "greeting",
      },
      {
        word: "hasta luego",
        translation: "see you later",
        pronunciation: "ahs-tah loo-eh-goh",
        partOfSpeech: "phrase",
      },
    ],
    phrases: [
      {
        phrase: "¡Hola! Buenos días.",
        translation: "Hello! Good morning.",
      },
      {
        phrase: "Buenas tardes, ¿cómo estás?",
        translation: "Good afternoon, how are you?",
        pronunciation: "bweh-nahs tahr-dehs, koh-moh ehs-tahs",
      },
      {
        phrase: "Adiós, hasta luego.",
        translation: "Goodbye, see you later.",
      },
    ],
    activities: [
      {
        id: "es-greet-mc-1",
        type: "multiple_choice",
        prompt: 'You see someone at 10 AM. What do you say?',
        correctAnswer: "buenos días",
        options: ["buenos días", "buenas tardes", "buenas noches", "adiós"],
      },
      {
        id: "es-greet-mc-2",
        type: "multiple_choice",
        prompt: 'What does "hasta luego" mean?',
        correctAnswer: "see you later",
        options: [
          "good morning",
          "hello",
          "see you later",
          "good night",
        ],
      },
      {
        id: "es-greet-fill-1",
        type: "fill_blank",
        prompt: "Complete the greeting:",
        correctAnswer: "tardes",
        sentence: "Buenas ___ (good afternoon).",
        options: ["días", "tardes", "noches", "hola"],
      },
      {
        id: "es-greet-match-1",
        type: "matching",
        prompt: "Match each greeting to when you'd use it.",
        pairs: [
          ["buenos días", "morning"],
          ["buenas tardes", "afternoon"],
          ["buenas noches", "night"],
          ["adiós", "leaving"],
        ],
      },
      {
        id: "es-greet-speak-1",
        type: "speaking",
        prompt: "Say 'Hola, buenos días' out loud.",
        correctAnswer: "hola buenos días",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "es",
      topic: "Hello & Goodbye (Spanish Greetings)",
      keyVocabulary: ["hola", "buenos días", "buenas tardes", "buenas noches", "adiós", "hasta luego", "Hola!", "buenos días"],
      prompt:
        "Lesson: Hello & Goodbye (Spanish Greetings). " +
        "Teaching 'hola' (hello), 'buenos días' (good morning), " +
        "'buenas tardes' (good afternoon), 'buenas noches' (good evening/night), " +
        "'adiós' (goodbye), 'hasta luego' (see you later). " +
        "The goal is for the student to greet someone naturally based on time of day. " +
        "Start by saying 'Hola!' and waiting for the student to repeat. " +
        "Then introduce 'buenos días' — explain it's for morning. " +
        "Pretend it's different times of day and ask the student which greeting to use. " +
        "End the session by saying 'Adiós' and encouraging the student to say it back.",
    },
  },

  {
    id: "es-greetings-intro",
    unitId: "es-greetings",
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
          "Say 'Me llamo...' (My name is...) and ask '¿Cómo te llamas?' (What's your name?).",
      },
      {
        title: "Use polite phrases",
        description:
          "Learn 'mucho gusto' (nice to meet you) and 'igualmente' (likewise).",
      },
    ],
    vocabulary: [
      {
        word: "me llamo",
        translation: "my name is",
        pronunciation: "meh yah-moh",
        partOfSpeech: "phrase",
      },
      {
        word: "¿cómo te llamas?",
        translation: "what's your name?",
        pronunciation: "koh-moh teh yah-mahs",
        partOfSpeech: "phrase",
      },
      {
        word: "mucho gusto",
        translation: "nice to meet you",
        pronunciation: "moo-choh goos-toh",
        partOfSpeech: "phrase",
      },
      {
        word: "igualmente",
        translation: "likewise / same to you",
        pronunciation: "ee-gwahl-mehn-teh",
        partOfSpeech: "adverb",
      },
      {
        word: "soy",
        translation: "I am",
        pronunciation: "soy",
        partOfSpeech: "verb",
      },
    ],
    phrases: [
      {
        phrase: "Hola, me llamo Ana.",
        translation: "Hello, my name is Ana.",
      },
      {
        phrase: "¿Cómo te llamas?",
        translation: "What's your name?",
      },
      {
        phrase: "Mucho gusto.",
        translation: "Nice to meet you.",
      },
    ],
    activities: [
      {
        id: "es-intro-mc-1",
        type: "multiple_choice",
        prompt: 'What does "Me llamo..." mean?',
        correctAnswer: "my name is...",
        options: [
          "my name is...",
          "how are you?",
          "nice to meet you",
          "goodbye",
        ],
      },
      {
        id: "es-intro-mc-2",
        type: "multiple_choice",
        prompt: 'How do you say "nice to meet you"?',
        correctAnswer: "mucho gusto",
        options: ["mucho gusto", "igualmente", "me llamo", "adiós"],
      },
      {
        id: "es-intro-fill-1",
        type: "fill_blank",
        prompt: "Complete the introduction:",
        correctAnswer: "llamo",
        sentence: "Hola, me ___ Ana.",
        options: ["llamo", "gusto", "soy", "cómo"],
      },
      {
        id: "es-intro-match-1",
        type: "matching",
        prompt: "Match the Spanish phrase to its meaning.",
        pairs: [
          ["me llamo", "my name is"],
          ["mucho gusto", "nice to meet you"],
          ["igualmente", "likewise"],
          ["¿cómo te llamas?", "what's your name?"],
        ],
      },
      {
        id: "es-intro-speak-1",
        type: "speaking",
        prompt: "Say 'Hola, me llamo [your name]' out loud.",
        correctAnswer: "hola me llamo",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "es",
      topic: "Introduce Yourself (Spanish Greetings)",
      keyVocabulary: ["me llamo", "¿cómo te llamas?", "s your name?), " +
        "", " (nice to meet you), ", " (likewise), ", " (I am). " +
        "The goal is for the student to introduce themselves and respond when someone else introduces themselves. " +
        "Start by introducing yourself in Spanish: ", " " +
        "Then ask the student ", " and gently help them form the answer. " +
        "When they respond, say "],
      prompt:
        "Lesson: Introduce Yourself (Spanish Greetings). " +
        "Teaching 'me llamo' (my name is), '¿cómo te llamas?' (what's your name?), " +
        "'mucho gusto' (nice to meet you), 'igualmente' (likewise), 'soy' (I am). " +
        "The goal is for the student to introduce themselves and respond when someone else introduces themselves. " +
        "Start by introducing yourself in Spanish: 'Hola, me llamo Sofia.' " +
        "Then ask the student '¿Cómo te llamas?' and gently help them form the answer. " +
        "When they respond, say 'Mucho gusto' and encourage them to say it back. " +
        "Roleplay a short introduction conversation back and forth.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
];
