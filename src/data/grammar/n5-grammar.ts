// src/data/grammar/n5-grammar.ts

export interface GrammarPoint {
  id: string;
  pattern: string; // e.g., Noun + は + Noun + です
  meaning: string; // e.g., "is (a noun)"
  explanation: string; // Detailed explanation
  usage: string[]; // Array of usage rules/conjugations
  examples: {
    kanji: string; // Example sentence with Kanji
    hiragana: string; // Example sentence in Hiragana (furigana or full hiragana)
    translation: string; // Meaning of the example sentence
  }[];
  notes?: string[]; // Additional notes
  difficulty: 'easy' | 'medium' | 'hard';
  category: string; // e.g., "Particles", "Verbs", "Adjectives"
  lesson: string; // e.g., "N5 Bài 1"
}

export const n5Grammar: GrammarPoint[] = [
  // N5 Bài 1 - Grammar Point 1
  {
    id: 'n5-g1-1',
    pattern: 'Noun + は + Noun + です',
    meaning: '"là (một danh từ)"',
    explanation: 'Đây là cấu trúc câu cơ bản để khẳng định một vật là một vật khác. 「は」 (wa) là trợ từ chỉ chủ đề, và 「です」 (desu) là trợ động từ lịch sự.',
    usage: [
      'Dùng để giới thiệu bản thân hoặc nói về sự thật.',
      '「は」 được phát âm là "wa" khi dùng làm trợ từ.',
    ],
    examples: [
      { kanji: '私は学生です。', hiragana: 'わたしはがくせいです。', translation: 'Tôi là học sinh.' },
      { kanji: 'これは本です。', hiragana: 'これはほんです。', translation: 'Đây là sách.' },
    ],
    notes: ['「です」 làm cho câu lịch sự hơn.'],
    difficulty: 'easy',
    category: 'Cấu trúc câu cơ bản',
    lesson: 'N5 Bài 1',
  },
  // N5 Bài 1 - Grammar Point 2
  {
    id: 'n5-g1-2',
    pattern: 'Noun + は + Noun + じゃありません / ではありません',
    meaning: '"không phải là (một danh từ)"',
    explanation: 'Đây là dạng phủ định của cấu trúc 「Noun + は + Noun + です」. 「じゃありません」 và 「ではありません」 đều có nghĩa là "không phải là", trong đó 「ではありません」 lịch sự hơn.',
    usage: [
      'Dùng để phủ định một sự vật, sự việc.',
      '「じゃありません」 thường dùng trong văn nói, 「ではありません」 dùng trong văn viết hoặc tình huống trang trọng hơn.',
    ],
    examples: [
      { kanji: '私は医者じゃありません。', hiragana: 'わたしはいしゃじゃありません。', translation: 'Tôi không phải là bác sĩ.' },
      { kanji: 'これは辞書ではありません。', hiragana: 'これはじしょではありません。', translation: 'Đây không phải là từ điển.' },
    ],
    notes: ['Cả hai đều có thể dùng, tùy thuộc vào mức độ trang trọng.'],
    difficulty: 'easy',
    category: 'Cấu trúc câu cơ bản',
    lesson: 'N5 Bài 1',
  },
];