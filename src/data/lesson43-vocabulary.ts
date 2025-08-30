export interface VocabularyWord {
  section?: 'main' | 'conversation' | 'reading';
  id: string;
  hiragana: string;
  kanji: string;
  meaning: string;
  example?: string;
  exampleMeaning?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  lesson: string;
}

export const lesson43Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'ふえます II', kanji: '増えます', meaning: 'tăng [xuất khẩu ～]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 43', section: 'main' },
  { id: '2', hiragana: 'へります II', kanji: '減ります', meaning: 'giảm [xuất khẩu ～]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 43', section: 'main' },
  { id: '3', hiragana: 'あがります I', kanji: '上がります', meaning: 'tăng [giá cả ～]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 43', section: 'main' },
  { id: '4', hiragana: 'さがります I', kanji: '下がります', meaning: 'giảm [giá cả ～]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 43', section: 'main' },
  { id: '5', hiragana: 'きれます II', kanji: '切れます', meaning: 'bị đứt [sợi dây ～]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 43', section: 'main' },
  { id: '6', hiragana: 'とれます II', kanji: '取れます', meaning: 'bị đứt [cúc áo ～]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 43', section: 'main' },
  { id: '7', hiragana: 'おちます I', kanji: '落ちます', meaning: 'bị rơi [hành lý ～]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 43', section: 'main' },
  { id: '8', hiragana: 'なくなります I', kanji: 'なくなります', meaning: 'hết [xăng], mất', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 43', section: 'main' },
  { id: '9', hiragana: 'へん[な]', kanji: '変[な]', meaning: 'lạ', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 43', section: 'main' },
  { id: '10', hiragana: 'しあわせ[な]', kanji: '幸せ[な]', meaning: 'hạnh phúc', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 43', section: 'main' },
  { id: '11', hiragana: 'らく[な]', kanji: '楽[な]', meaning: 'nhàn, nhàn nhã', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 43', section: 'main' },
  { id: '12', hiragana: 'うまい', kanji: 'うまい', meaning: 'ngon', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 43', section: 'main' },
  { id: '13', hiragana: 'まずい', kanji: 'まずい', meaning: 'dở', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 43', section: 'main' },
  { id: '14', hiragana: 'つまらない', kanji: 'つまらない', meaning: 'chán, không hay, không đâu (lý do)', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 43', section: 'main' },
  { id: '15', hiragana: 'やさしい', kanji: '優しい', meaning: 'hiền lành', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 43', section: 'main' },
  { id: '16', hiragana: 'ガソリン', kanji: '', meaning: 'xăng', difficulty: 'medium', category: 'Fuel', lesson: 'Bài 43', section: 'main' },
  { id: '17', hiragana: 'ひ', kanji: '火', meaning: 'lửa', difficulty: 'medium', category: 'Elements', lesson: 'Bài 43', section: 'main' },
  { id: '18', hiragana: 'パンフレット', kanji: '', meaning: 'tờ rơi quảng cáo', difficulty: 'medium', category: 'Documents', lesson: 'Bài 43', section: 'main' },
  { id: '19', hiragana: 'いまにも', kanji: '今にも', meaning: 'bất kỳ lúc nào (dùng khi biểu thị một trạng thái ngay trước khi sự biến đổi xảy ra.)', difficulty: 'hard', category: 'Time', lesson: 'Bài 43', section: 'main' },
  { id: '20', hiragana: 'わあ', kanji: 'わあ', meaning: 'Ồ!!', difficulty: 'medium', category: 'Interjections', lesson: 'Bài 43', section: 'main' },

  // 📖 II. 読み物 (ĐỌC THÊM)
  { id: '21', hiragana: 'ばら', kanji: 'バラ', meaning: 'hoa hồng', difficulty: 'medium', category: 'Flowers', lesson: 'Bài 43', section: 'reading' },
  { id: '22', hiragana: 'ドライブ', kanji: '', meaning: 'lái xe ô tô (theo sở thích)', difficulty: 'medium', category: 'Activities', lesson: 'Bài 43', section: 'reading' },
  { id: '23', hiragana: 'りゆう', kanji: '理由', meaning: 'lý do', difficulty: 'medium', category: 'Reasons', lesson: 'Bài 43', section: 'reading' },
  { id: '24', hiragana: 'あやまります I', kanji: '謝ります', meaning: 'xin lỗi', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 43', section: 'reading' },
  { id: '25', hiragana: 'しりあいます I', kanji: '知り合います', meaning: 'quen biết', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 43', section: 'reading' }
];
