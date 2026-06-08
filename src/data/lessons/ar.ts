import type { Lesson } from "@/types/learning";

/**
 * Arabic conversational lesson content.
 *
 * Unlike structured language lessons (Spanish, French, etc.), Arabic lessons are
 * open-ended conversation sessions. The AI teacher handles everything — there are
 * no multiple-choice quizzes or fill-in-the-blank activities here.
 *
 * The user can ask about anything in Arabic: travel, food, culture, daily life,
 * or just practice casual conversation. The AI teacher adapts to the user's level.
 */

export const arLessons: Lesson[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ARABIC — Conversation 1
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "ar-conversation-1-free",
    unitId: "ar-conversation-1",
    title: "Free Conversation",
    description:
      "Ask anything in Arabic — the AI teacher responds conversationally on any topic you choose.",
    order: 1,
    durationMinutes: 10,
    xp: 30,
    imageKey: "earth",
    goals: [
      {
        title: "Practice open-ended Arabic conversation",
        description:
          "Speak naturally in Arabic about any topic. The AI teacher will respond, correct gently, and keep the conversation flowing.",
      },
      {
        title: "Build speaking confidence",
        description:
          "No scripts, no quizzes — just real conversation. Make mistakes freely; the teacher helps you learn from them.",
      },
    ],
    vocabulary: [
      {
        word: "مرحباً",
        translation: "Hello",
        pronunciation: "mar-ha-ban",
        partOfSpeech: "greeting",
      },
      {
        word: "كيف حالك؟",
        translation: "How are you?",
        pronunciation: "kay-fa haa-luk",
        partOfSpeech: "phrase",
      },
      {
        word: "شكراً",
        translation: "Thank you",
        pronunciation: "shuk-ran",
        partOfSpeech: "expression",
      },
      {
        word: "نعم",
        translation: "Yes",
        pronunciation: "na-am",
        partOfSpeech: "particle",
      },
      {
        word: "لا",
        translation: "No",
        pronunciation: "laa",
        partOfSpeech: "particle",
      },
      {
        word: "مع السلامة",
        translation: "Goodbye",
        pronunciation: "ma-a as-sa-laa-ma",
        partOfSpeech: "phrase",
      },
    ],
    phrases: [
      {
        phrase: "أهلاً وسهلاً",
        translation: "Welcome",
        pronunciation: "ah-lan wa sah-lan",
      },
      {
        phrase: "كيف يمكنني مساعدتك؟",
        translation: "How can I help you?",
        pronunciation: "kay-fa yum-ki-nu-ni mu-saa-a-da-tuk",
      },
    ],
    activities: [
      {
        id: "ar-free-speak-1",
        type: "speaking",
        prompt:
          "Start a conversation in Arabic. Say hello and introduce yourself, or ask the teacher any question!",
        correctAnswer: "",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "ar",
      topic: "Free Arabic Conversation",
      keyVocabulary: [
        "مرحباً",
        "كيف حالك",
        "شكراً",
        "نعم",
        "لا",
        "مع السلامة",
      ],
      prompt:
        "This is an open-ended Arabic conversation session. " +
        "The student can ask about ANY topic — travel, food, culture, work, hobbies, or just practice casual chat. " +
        "Greet the student warmly in Arabic, ask what they'd like to talk about, and follow their lead. " +
        "Adapt to their Arabic level — if they're a beginner, use simple words and speak slowly. " +
        "If they're more advanced, use natural conversational speed and richer vocabulary. " +
        "Correct mistakes gently by repeating what they said correctly, not by stopping the conversation. " +
        "Keep the conversation flowing naturally — this is not a structured grammar lesson.",
    },
  },

  {
    id: "ar-conversation-1-daily",
    unitId: "ar-conversation-1",
    title: "Daily Life",
    description:
      "Talk about your day, food, family, and everyday situations in Arabic.",
    order: 2,
    durationMinutes: 10,
    xp: 30,
    imageKey: "treasure",
    goals: [
      {
        title: "Discuss daily routines in Arabic",
        description:
          "Talk about your morning routine, meals, work, and evening activities in natural Arabic conversation.",
      },
      {
        title: "Learn practical everyday vocabulary",
        description:
          "Pick up words and phrases for food, family, time, and common situations through actual conversation.",
      },
    ],
    vocabulary: [
      {
        word: "صباح الخير",
        translation: "Good morning",
        pronunciation: "sa-baa-H al-khayr",
        partOfSpeech: "greeting",
      },
      {
        word: "مساء الخير",
        translation: "Good evening",
        pronunciation: "ma-saa' al-khayr",
        partOfSpeech: "greeting",
      },
      {
        word: "أكل",
        translation: "Food / eating",
        pronunciation: "akl",
        partOfSpeech: "noun/verb",
      },
      {
        word: "عائلة",
        translation: "Family",
        pronunciation: "aa-i-la",
        partOfSpeech: "noun",
      },
      {
        word: "عمل",
        translation: "Work",
        pronunciation: "a-mal",
        partOfSpeech: "noun",
      },
      {
        word: "بيت",
        translation: "House / home",
        pronunciation: "bayt",
        partOfSpeech: "noun",
      },
    ],
    phrases: [
      {
        phrase: "ماذا تأكل على الفطور؟",
        translation: "What do you eat for breakfast?",
        pronunciation: "maa-dhaa ta'-kul a-la al-fu-Toor",
      },
      {
        phrase: "أين تعمل؟",
        translation: "Where do you work?",
        pronunciation: "ay-na ta'-mal",
      },
    ],
    activities: [
      {
        id: "ar-daily-speak-1",
        type: "speaking",
        prompt:
          "Tell the teacher about your day in Arabic — or ask them about daily life topics like food, work, or family!",
        correctAnswer: "",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "ar",
      topic: "Daily Life Arabic Conversation",
      keyVocabulary: [
        "صباح الخير",
        "مساء الخير",
        "أكل",
        "عائلة",
        "عمل",
        "بيت",
      ],
      prompt:
        "This is a daily-life Arabic conversation session. " +
        "Guide the conversation around everyday topics: morning routines, meals, family, work, home life. " +
        "Start by asking the student about their day or what they ate. " +
        "If the student wants to talk about something else, follow their lead — these topics are just starting points. " +
        "Use simple, practical Arabic that the student can use in real life. " +
        "Keep the conversation natural — as if chatting with a friend over coffee.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ARABIC — Conversation 2
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: "ar-conversation-2-topics",
    unitId: "ar-conversation-2",
    title: "Topics & Opinions",
    description:
      "Discuss news, hobbies, interests, and share opinions — all in conversational Arabic.",
    order: 1,
    durationMinutes: 10,
    xp: 35,
    imageKey: "palace",
    goals: [
      {
        title: "Express opinions in Arabic",
        description:
          "Learn to agree, disagree, and share your thoughts on various topics in natural Arabic.",
      },
      {
        title: "Expand vocabulary through discussion",
        description:
          "Talk about hobbies, sports, technology, books, movies — whatever interests you.",
      },
    ],
    vocabulary: [
      {
        word: "أعتقد",
        translation: "I think / I believe",
        pronunciation: "a'-ta-qid",
        partOfSpeech: "verb",
      },
      {
        word: "في رأيي",
        translation: "In my opinion",
        pronunciation: "fee ra'-yi",
        partOfSpeech: "phrase",
      },
      {
        word: "أحب",
        translation: "I like / I love",
        pronunciation: "u-Hibb",
        partOfSpeech: "verb",
      },
      {
        word: "لا أحب",
        translation: "I don't like",
        pronunciation: "laa u-Hibb",
        partOfSpeech: "phrase",
      },
      {
        word: "جيد",
        translation: "Good",
        pronunciation: "jay-yid",
        partOfSpeech: "adjective",
      },
      {
        word: "ممتاز",
        translation: "Excellent",
        pronunciation: "mum-taaz",
        partOfSpeech: "adjective",
      },
    ],
    phrases: [
      {
        phrase: "ما رأيك في...؟",
        translation: "What do you think about...?",
        pronunciation: "maa ra'-yu-ka fee...",
      },
      {
        phrase: "أنا أوافق",
        translation: "I agree",
        pronunciation: "a-naa u-waa-fiq",
      },
    ],
    activities: [
      {
        id: "ar-topics-speak-1",
        type: "speaking",
        prompt:
          "Share your opinion about something in Arabic — a movie, a hobby, a place you've visited, or anything on your mind!",
        correctAnswer: "",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "ar",
      topic: "Topics & Opinions Arabic Conversation",
      keyVocabulary: [
        "أعتقد",
        "في رأيي",
        "أحب",
        "لا أحب",
        "جيد",
        "ممتاز",
      ],
      prompt:
        "This is an opinion-and-topics Arabic conversation session. " +
        "Encourage the student to share opinions on various topics: hobbies, sports, movies, books, technology, travel. " +
        "Start by asking what they're interested in or what they've been doing lately. " +
        "Introduce opinion phrases like 'في رأيي' (in my opinion) and 'أعتقد' (I think) naturally during conversation. " +
        "Ask follow-up questions to go deeper: 'Why do you think that?' 'Tell me more about that.' " +
        "Challenge them gently with 'What about...?' questions to stretch their Arabic.",
    },
  },

  {
    id: "ar-conversation-2-culture",
    unitId: "ar-conversation-2",
    title: "Culture & Travel",
    description:
      "Explore Arab culture, travel destinations, food, traditions, and customs through conversation.",
    order: 2,
    durationMinutes: 10,
    xp: 35,
    imageKey: "mascotWelcome",
    goals: [
      {
        title: "Discuss Arab culture in Arabic",
        description:
          "Talk about traditions, customs, cuisine, music, and cultural practices across the Arab world.",
      },
      {
        title: "Practice travel-related Arabic",
        description:
          "Learn to talk about places, directions, transportation, and travel experiences.",
      },
    ],
    vocabulary: [
      {
        word: "سفر",
        translation: "Travel",
        pronunciation: "sa-far",
        partOfSpeech: "noun",
      },
      {
        word: "ثقافة",
        translation: "Culture",
        pronunciation: "tha-qaa-fa",
        partOfSpeech: "noun",
      },
      {
        word: "طعام",
        translation: "Food / cuisine",
        pronunciation: "Ta-aam",
        partOfSpeech: "noun",
      },
      {
        word: "موسيقى",
        translation: "Music",
        pronunciation: "muu-sii-qaa",
        partOfSpeech: "noun",
      },
      {
        word: "مدينة",
        translation: "City",
        pronunciation: "ma-dii-na",
        partOfSpeech: "noun",
      },
      {
        word: "جميل",
        translation: "Beautiful",
        pronunciation: "ja-miil",
        partOfSpeech: "adjective",
      },
    ],
    phrases: [
      {
        phrase: "من أين أنت؟",
        translation: "Where are you from?",
        pronunciation: "min ay-na an-ta",
      },
      {
        phrase: "هل زرت بلداً عربياً من قبل؟",
        translation: "Have you visited an Arab country before?",
        pronunciation: "hal zur-ta ba-la-dan a-ra-biy-yan min qabl",
      },
    ],
    activities: [
      {
        id: "ar-culture-speak-1",
        type: "speaking",
        prompt:
          "Ask the teacher about Arab culture — food, music, travel destinations, traditions — or share your own cultural experiences in Arabic!",
        correctAnswer: "",
      },
    ],
    aiTeacherPrompt: {
      languageCode: "ar",
      topic: "Culture & Travel Arabic Conversation",
      keyVocabulary: [
        "سفر",
        "ثقافة",
        "طعام",
        "موسيقى",
        "مدينة",
        "جميل",
      ],
      prompt:
        "This is a culture-and-travel Arabic conversation session. " +
        "Explore Arab culture, food, music, traditions, and travel destinations. " +
        "Start by asking if the student has visited any Arab countries or tried Arab food. " +
        "Share interesting cultural facts naturally during conversation — about Ramadan, Eid, traditional dishes, famous cities, music. " +
        "Ask about the student's own culture and travel experiences to create a cultural exchange. " +
        "Keep the conversation warm and exploratory — this is about discovery, not drilling vocabulary.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
];
