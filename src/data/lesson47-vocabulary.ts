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

export const lesson47Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'ふきます I', kanji: '吹きます', meaning: 'thổi [gió~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 47', section: 'main' },
  { id: '2', hiragana: 'もえます II', kanji: '燃えます', meaning: 'cháy [rác~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 47', section: 'main' },
  { id: '3', hiragana: 'なくなります I', kanji: 'なくなります', meaning: 'qua đời (từ nói tránh của 亡くなります)', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 47', section: 'main' },
  { id: '4', hiragana: 'あつまります I', kanji: '集まります', meaning: 'tập trung [người~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 47', section: 'main' },
  { id: '5', hiragana: 'わかれます II', kanji: '別れます', meaning: 'chia tay [người~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 47', section: 'main' },
  { id: '6', hiragana: 'きびしい', kanji: '厳しい', meaning: 'nghiêm khắc', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 47', section: 'main' },
  { id: '7', hiragana: 'ひどい', kanji: 'ひどい', meaning: 'khủng khiếp', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 47', section: 'main' },
  { id: '8', hiragana: 'じっけん', kanji: '実験', meaning: 'thử nghiệm', difficulty: 'medium', category: 'Experiments', lesson: 'Bài 47', section: 'main' },
  { id: '9', hiragana: 'データ', kanji: '', meaning: 'dữ liệu', difficulty: 'medium', category: 'Data', lesson: 'Bài 47', section: 'main' },
  { id: '10', hiragana: 'じんこう', kanji: '人口', meaning: 'dân số', difficulty: 'medium', category: 'Population', lesson: 'Bài 47', section: 'main' },
  { id: '11', hiragana: 'におい', kanji: 'におい', meaning: 'mùi', difficulty: 'medium', category: 'Smell', lesson: 'Bài 47', section: 'main' },
  { id: '12', hiragana: 'かがく', kanji: '科学', meaning: 'khoa học', difficulty: 'medium', category: 'Science', lesson: 'Bài 47', section: 'main' },
  { id: '13', hiragana: 'ぶんがく', kanji: '文学', meaning: 'văn học', difficulty: 'medium', category: 'Literature', lesson: 'Bài 47', section: 'main' },
  { id: '14', hiragana: 'いがく', kanji: '異文学', meaning: 'văn học', difficulty: 'hard', category: 'Literature', lesson: 'Bài 47', section: 'main' },
  { id: '15', hiragana: 'きゅうきゅうしゃ', kanji: '救急車', meaning: 'xe cấp cứu', difficulty: 'hard', category: 'Vehicles', lesson: 'Bài 47', section: 'main' },
  { id: '16', hiragana: 'さんせい', kanji: '賛成', meaning: 'tán thành', difficulty: 'medium', category: 'Agreement', lesson: 'Bài 47', section: 'main' },
  { id: '17', hiragana: 'はんたい', kanji: '反対', meaning: 'phản đối', difficulty: 'medium', category: 'Disagreement', lesson: 'Bài 47', section: 'main' },
  { id: '18', hiragana: 'だいとうりょう', kanji: '大統領', meaning: 'tổng thống', difficulty: 'hard', category: 'Politics', lesson: 'Bài 47', section: 'main' },
  { id: '19', hiragana: '〜によります', kanji: '〜によります', meaning: 'theo ~ (biểu thị nguồn thông tin)', difficulty: 'medium', category: 'Sources', lesson: 'Bài 47', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '20', hiragana: 'けっこんします III', kanji: '結婚します', meaning: 'đính ước, ăn hỏi', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 47', section: 'conversation' },
  { id: '21', hiragana: 'どうも', kanji: 'どうも', meaning: 'có vẻ như (được dùng khi biểu thị sự suy đoán)', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 47', section: 'conversation' },
  { id: '22', hiragana: 'こいびと', kanji: '恋人', meaning: 'người yêu', difficulty: 'medium', category: 'Relationships', lesson: 'Bài 47', section: 'conversation' },
  { id: '23', hiragana: 'あいて', kanji: '相手', meaning: 'đối phương, hôn phu, hôn thê', difficulty: 'medium', category: 'People', lesson: 'Bài 47', section: 'conversation' },
  { id: '24', hiragana: 'しりあいます I', kanji: '知り合います', meaning: 'quen biết', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 47', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '25', hiragana: 'けしょう', kanji: '化粧', meaning: 'trang điểm (~を します: trang điểm)', difficulty: 'medium', category: 'Makeup', lesson: 'Bài 47', section: 'reading' },
  { id: '26', hiragana: 'おせわします III', kanji: 'お世話します', meaning: 'chăm sóc', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 47', section: 'reading' },
  { id: '27', hiragana: 'せいべつ', kanji: '性別', meaning: 'phụ nữ, nữ', difficulty: 'medium', category: 'Gender', lesson: 'Bài 47', section: 'reading' },
  { id: '28', hiragana: 'だんせい', kanji: '男性', meaning: 'nam giới, nam', difficulty: 'medium', category: 'Gender', lesson: 'Bài 47', section: 'reading' },
  { id: '29', hiragana: 'ちょうじゅ', kanji: '長寿', meaning: 'thọ (~します: sống lâu)', difficulty: 'hard', category: 'Longevity', lesson: 'Bài 47', section: 'reading' },
  { id: '30', hiragana: 'りゆう', kanji: '理由', meaning: 'lý do', difficulty: 'medium', category: 'Reasons', lesson: 'Bài 47', section: 'reading' },
  { id: '31', hiragana: 'かんけい', kanji: '関係', meaning: 'quan hệ', difficulty: 'medium', category: 'Relationships', lesson: 'Bài 47', section: 'reading' }
];
