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

export const lesson25Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'かんがえます II', kanji: '考えます II', meaning: 'nghĩ, suy nghĩ', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 25', section: 'main' },
  { id: '2', hiragana: 'つきます I', kanji: '着きます I', meaning: 'đến', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 25', section: 'main' },
  { id: '3', hiragana: 'とります I', kanji: '取ります I', meaning: 'có, thêm [tuổi]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 25', section: 'main' },
  { id: '4', hiragana: 'とります II', kanji: '取ります II', meaning: 'đú', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 25', section: 'main' },
  { id: '5', hiragana: 'いなか', kanji: '田舎', meaning: 'quê, nông thôn', difficulty: 'easy', category: 'Places', lesson: 'Bài 25', section: 'main' },
  { id: '6', hiragana: 'チャンス', kanji: '', meaning: 'cơ hội', difficulty: 'easy', category: 'Opportunity', lesson: 'Bài 25', section: 'main' },
  { id: '7', hiragana: 'おく', kanji: '億', meaning: 'một trăm triệu', difficulty: 'easy', category: 'Numbers', lesson: 'Bài 25', section: 'main' },
  { id: '8', hiragana: 'もし', kanji: '', meaning: 'nếu', difficulty: 'easy', category: 'Conjunctions', lesson: 'Bài 25', section: 'main' },
  { id: '9', hiragana: 'いみ', kanji: '意味', meaning: 'nghĩa, ý nghĩa', difficulty: 'easy', category: 'Meaning', lesson: 'Bài 25', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '10', hiragana: 'もしもし', kanji: '', meaning: 'A-lô', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 25', section: 'conversation' },
  { id: '11', hiragana: 'てんきん', kanji: '転勤', meaning: 'việc chuyển địa điểm làm việc', difficulty: 'easy', category: 'Work', lesson: 'Bài 25', section: 'conversation' },
  { id: '12', hiragana: 'こと', kanji: '', meaning: 'việc, chuyện', difficulty: 'easy', category: 'Nouns', lesson: 'Bài 25', section: 'conversation' },
  { id: '13', hiragana: 'ひま', kanji: '暇', meaning: 'thời gian rảnh', difficulty: 'easy', category: 'Time', lesson: 'Bài 25', section: 'conversation' },
  { id: '14', hiragana: 'いろいろおせわになりました', kanji: 'いろいろお世話になりました', meaning: 'Cám ơn anh/chị đã giúp đỡ tôi (nhiều)', difficulty: 'easy', category: 'Politeness', lesson: 'Bài 25', section: 'conversation' },
  { id: '15', hiragana: 'がんばります I', kanji: 'がんばります I', meaning: 'cố gắng', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 25', section: 'conversation' },
  { id: '16', hiragana: 'どうぞおげんきで', kanji: 'どうぞお元気で', meaning: 'Chúc anh/chị mạnh khỏe. Anh/Chị hãy bảo trọng', difficulty: 'easy', category: 'Wishes', lesson: 'Bài 25', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '17', hiragana: 'うまれます', kanji: '生まれます', meaning: 'sinh ra', difficulty: 'easy', category: 'Life', lesson: 'Bài 25', section: 'reading' },
  { id: '18', hiragana: 'あかちゃん', kanji: '赤ちゃん', meaning: 'em bé', difficulty: 'easy', category: 'Family', lesson: 'Bài 25', section: 'reading' },
  { id: '19', hiragana: 'ほいくえん', kanji: '保育園', meaning: 'nhà trẻ', difficulty: 'easy', category: 'Education', lesson: 'Bài 25', section: 'reading' },
  { id: '20', hiragana: 'ようちえん', kanji: '幼稚園', meaning: 'mẫu giáo', difficulty: 'easy', category: 'Education', lesson: 'Bài 25', section: 'reading' },
  { id: '21', hiragana: 'こども', kanji: '子ども', meaning: 'trẻ con', difficulty: 'easy', category: 'Family', lesson: 'Bài 25', section: 'reading' },
  { id: '22', hiragana: 'しょうがっこう', kanji: '小学校', meaning: 'tiểu học (6 năm)', difficulty: 'easy', category: 'Education', lesson: 'Bài 25', section: 'reading' },
  { id: '23', hiragana: 'ちゅうがっこう', kanji: '中学校', meaning: 'trung học cơ sở (3 năm)', difficulty: 'easy', category: 'Education', lesson: 'Bài 25', section: 'reading' },
  { id: '24', hiragana: 'こうこう', kanji: '高校', meaning: 'trung học phổ thông (3 năm)', difficulty: 'easy', category: 'Education', lesson: 'Bài 25', section: 'reading' },
  { id: '25', hiragana: 'だいがく', kanji: '大学', meaning: 'đại học', difficulty: 'easy', category: 'Education', lesson: 'Bài 25', section: 'reading' },
  { id: '26', hiragana: 'だいがく (4)', kanji: '大学 (4)', meaning: 'đại học (4 năm)', difficulty: 'easy', category: 'Education', lesson: 'Bài 25', section: 'reading' },
  { id: '27', hiragana: 'たんだい (2)', kanji: '短大 (2)', meaning: 'trung học chuyên nghiệp (dạy nghề)', difficulty: 'easy', category: 'Education', lesson: 'Bài 25', section: 'reading' },
  { id: '28', hiragana: 'だいがくいん (2～6)', kanji: '大学院 (2～6)', meaning: 'trên đại học (cao học)', difficulty: 'easy', category: 'Education', lesson: 'Bài 25', section: 'reading' },
  { id: '29', hiragana: 'がっこうをでます', kanji: '学校を出ます', meaning: 'tốt nghiệp', difficulty: 'easy', category: 'Education', lesson: 'Bài 25', section: 'reading' },
  { id: '30', hiragana: 'しゅうしょくします', kanji: '就職します', meaning: 'đi làm', difficulty: 'easy', category: 'Work', lesson: 'Bài 25', section: 'reading' },
  { id: '31', hiragana: 'けっこんします', kanji: '結婚します', meaning: 'lập gia đình', difficulty: 'easy', category: 'Life', lesson: 'Bài 25', section: 'reading' },
  { id: '32', hiragana: 'こどもがうまれます', kanji: '子どもが生まれます', meaning: 'sinh con', difficulty: 'easy', category: 'Life', lesson: 'Bài 25', section: 'reading' },
  { id: '33', hiragana: 'りこん', kanji: '離婚', meaning: 'ly hôn', difficulty: 'easy', category: 'Life', lesson: 'Bài 25', section: 'reading' },
  { id: '34', hiragana: 'さいこん', kanji: '再婚', meaning: 'tái hôn', difficulty: 'easy', category: 'Life', lesson: 'Bài 25', section: 'reading' },
  { id: '35', hiragana: 'しごとをやめます', kanji: '仕事を辞めます', meaning: 'nghỉ hưu', difficulty: 'easy', category: 'Work', lesson: 'Bài 25', section: 'reading' },
  { id: '36', hiragana: 'しにます', kanji: '死にます', meaning: 'chết', difficulty: 'easy', category: 'Life', lesson: 'Bài 25', section: 'reading' },
  { id: '37', hiragana: 'じゅみょう', kanji: '寿命', meaning: 'tuổi thọ', difficulty: 'easy', category: 'Life', lesson: 'Bài 25', section: 'reading' },
  { id: '38', hiragana: 'おとこ', kanji: '男', meaning: 'nam', difficulty: 'easy', category: 'Gender', lesson: 'Bài 25', section: 'reading' },
  { id: '39', hiragana: 'おんな', kanji: '女', meaning: 'nữ', difficulty: 'easy', category: 'Gender', lesson: 'Bài 25', section: 'reading' }
];
