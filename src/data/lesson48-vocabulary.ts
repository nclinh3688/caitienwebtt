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

export const lesson48Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'おろします I', kanji: '下ろします', meaning: 'lấy xuống', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 48', section: 'main' },
  { id: '2', hiragana: 'とどけます II', kanji: '届けます', meaning: 'đưa đến, chuyển đến', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 48', section: 'main' },
  { id: '3', hiragana: 'せわします III', kanji: '世話します', meaning: 'chăm sóc', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 48', section: 'main' },
  { id: '4', hiragana: 'ろくおんします III', kanji: '録音します', meaning: 'ghi âm', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 48', section: 'main' },
  { id: '5', hiragana: 'いや[な]', kanji: '嫌[な]', meaning: 'chán, không thích', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 48', section: 'main' },
  { id: '6', hiragana: 'じゅく', kanji: '塾', meaning: 'lò luyện thi, nơi học thêm', difficulty: 'medium', category: 'Education', lesson: 'Bài 48', section: 'main' },
  { id: '7', hiragana: 'せいと', kanji: '生徒', meaning: 'học sinh', difficulty: 'medium', category: 'Students', lesson: 'Bài 48', section: 'main' },
  { id: '8', hiragana: 'ファイル', kanji: '', meaning: 'fai tài liệu, kẹp tài liệu', difficulty: 'medium', category: 'Objects', lesson: 'Bài 48', section: 'main' },
  { id: '9', hiragana: 'じゆうに', kanji: '自由に', meaning: 'một cách tự do, một cách thoải mái', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 48', section: 'main' },
  { id: '10', hiragana: '〜かん', kanji: '〜間', meaning: 'trong khoảng ~', difficulty: 'medium', category: 'Suffixes', lesson: 'Bài 48', section: 'main' },
  { id: '11', hiragana: 'いいですね', kanji: 'いいですね', meaning: 'Điều đó hay quá nhỉ!', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 48', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '12', hiragana: 'おしいですか', kanji: 'おしいですか', meaning: 'Anh/Chị có bận không ạ? (được dùng khi hỏi người trên)', difficulty: 'hard', category: 'Questions', lesson: 'Bài 48', section: 'conversation' },
  { id: '13', hiragana: 'きんゆう', kanji: '金融', meaning: 'kinh doanh', difficulty: 'medium', category: 'Finance', lesson: 'Bài 48', section: 'conversation' },
  { id: '14', hiragana: 'それまでに', kanji: 'それまでに', meaning: 'Đến lúc đấy. cho đến lúc đấy', difficulty: 'medium', category: 'Time', lesson: 'Bài 48', section: 'conversation' },
  { id: '15', hiragana: 'かまいません', kanji: 'かまいません', meaning: 'Không sao.', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 48', section: 'conversation' },
  { id: '16', hiragana: 'たのしみます I', kanji: '楽しみます', meaning: 'tận hưởng', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 48', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '17', hiragana: 'おや', kanji: '親', meaning: 'bố mẹ', difficulty: 'medium', category: 'Family', lesson: 'Bài 48', section: 'reading' },
  { id: '18', hiragana: 'しょうがくせい', kanji: '小学生', meaning: 'học sinh tiểu học', difficulty: 'medium', category: 'Students', lesson: 'Bài 48', section: 'reading' },
  { id: '19', hiragana: '〜パーセント', kanji: '〜%', meaning: 'phần trăm', difficulty: 'medium', category: 'Percentages', lesson: 'Bài 48', section: 'reading' },
  { id: '20', hiragana: 'そのつぎ', kanji: 'その次', meaning: 'tiếp theo đó', difficulty: 'medium', category: 'Order', lesson: 'Bài 48', section: 'reading' },
  { id: '21', hiragana: 'しゅうじ', kanji: '習字', meaning: 'học viết chữ bằng bút lông', difficulty: 'hard', category: 'Calligraphy', lesson: 'Bài 48', section: 'reading' },
  { id: '22', hiragana: 'ふつうの', kanji: '普通の', meaning: 'thông thường, bình thường', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 48', section: 'reading' }
];
