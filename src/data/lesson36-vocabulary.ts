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

export const lesson36Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'あいます I', kanji: '合います', meaning: 'gặp [tai nạn]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 36', section: 'main' },
  { id: '2', hiragana: 'ちょきんします III', kanji: '貯金します', meaning: 'tiết kiệm tiền', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 36', section: 'main' },
  { id: '3', hiragana: 'すぎます II', kanji: '過ぎます', meaning: 'quá [7 giờ]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 36', section: 'main' },
  { id: '4', hiragana: 'なれます II', kanji: '慣れます', meaning: 'quen với [công việc]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 36', section: 'main' },
  { id: '5', hiragana: 'くさります II', kanji: '腐ります', meaning: 'bị hỏng, bị thiu, bị ôi, bị nát [thức ăn ~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 36', section: 'main' },
  { id: '6', hiragana: 'けんどう', kanji: '剣道', meaning: 'kiếm đạo (môn đấu kiếm truyền thống kiểu Nhật)', difficulty: 'hard', category: 'Sports', lesson: 'Bài 36', section: 'main' },
  { id: '7', hiragana: 'じゅうどう', kanji: '柔道', meaning: 'Judo', difficulty: 'medium', category: 'Sports', lesson: 'Bài 36', section: 'main' },
  { id: '8', hiragana: 'ラッシュ', kanji: '', meaning: 'tắc đường', difficulty: 'medium', category: 'Traffic', lesson: 'Bài 36', section: 'main' },
  { id: '9', hiragana: 'うちゅう', kanji: '宇宙', meaning: 'vũ trụ', difficulty: 'hard', category: 'Science', lesson: 'Bài 36', section: 'main' },
  { id: '10', hiragana: 'きょく', kanji: '曲', meaning: 'ca khúc, bản nhạc', difficulty: 'medium', category: 'Music', lesson: 'Bài 36', section: 'main' },
  { id: '11', hiragana: 'まいしゅう', kanji: '毎週', meaning: 'hàng tuần', difficulty: 'medium', category: 'Time', lesson: 'Bài 36', section: 'main' },
  { id: '12', hiragana: 'まいつき', kanji: '毎月', meaning: 'hàng tháng', difficulty: 'medium', category: 'Time', lesson: 'Bài 36', section: 'main' },
  { id: '13', hiragana: 'まいとし', kanji: '毎年', meaning: 'hàng năm', difficulty: 'medium', category: 'Time', lesson: 'Bài 36', section: 'main' },
  { id: '14', hiragana: 'このごろ', kanji: '', meaning: 'dạo này', difficulty: 'medium', category: 'Time', lesson: 'Bài 36', section: 'main' },
  { id: '15', hiragana: 'やっと', kanji: '', meaning: 'cuối cùng thì cũng', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 36', section: 'main' },
  { id: '16', hiragana: 'かなり', kanji: '', meaning: 'khá', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 36', section: 'main' },
  { id: '17', hiragana: 'かならず', kanji: '必ず', meaning: 'nhất định', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 36', section: 'main' },
  { id: '18', hiragana: 'ぜったい', kanji: '絶対', meaning: 'tuyệt đối', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 36', section: 'main' },
  { id: '19', hiragana: 'じょうずに', kanji: '上手に', meaning: 'giỏi', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 36', section: 'main' },
  { id: '20', hiragana: 'できるだけ', kanji: '', meaning: 'trong khả năng có thể', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 36', section: 'main' },
  { id: '21', hiragana: 'ほとんど', kanji: '', meaning: 'hầu hết, phần lớn (trong câu khẳng định), gần như hoàn toàn (trong câu phủ định)', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 36', section: 'main' },
  { id: '22', hiragana: 'ショパン', kanji: '', meaning: 'Chopin', difficulty: 'medium', category: 'Names', lesson: 'Bài 36', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '23', hiragana: 'おきゃくさま', kanji: 'お客様', meaning: 'quý khách (kính ngữ của おきゃくさん)', difficulty: 'medium', category: 'People', lesson: 'Bài 36', section: 'conversation' },
  { id: '24', hiragana: 'とくべつ', kanji: '特別', meaning: 'đặc biệt', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 36', section: 'conversation' },
  { id: '25', hiragana: 'うかがいます I', kanji: '伺います', meaning: 'đang làm (kính ngữ của しています)', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 36', section: 'conversation' },
  { id: '26', hiragana: 'すいえい', kanji: '水泳', meaning: 'bơi', difficulty: 'medium', category: 'Sports', lesson: 'Bài 36', section: 'conversation' },
  { id: '27', hiragana: 'ちがいます I', kanji: '違います', meaning: 'khác nhau', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 36', section: 'conversation' },
  { id: '28', hiragana: 'すごい', kanji: '', meaning: 'đang dùng (kính ngữ của つかっているんですね)', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 36', section: 'conversation' },
  { id: '29', hiragana: 'チャレンジします III', kanji: '', meaning: 'thử sức, thử làm', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 36', section: 'conversation' },
  { id: '30', hiragana: 'きもち', kanji: '気持ち', meaning: 'tâm thế', difficulty: 'medium', category: 'Feelings', lesson: 'Bài 36', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '31', hiragana: 'たびもの', kanji: '旅物', meaning: 'phương tiện đi lại', difficulty: 'hard', category: 'Transport', lesson: 'Bài 36', section: 'reading' },
  { id: '32', hiragana: 'せいき', kanji: '世紀', meaning: 'thế kỷ', difficulty: 'hard', category: 'Time', lesson: 'Bài 36', section: 'reading' },
  { id: '33', hiragana: 'とおい', kanji: '遠い', meaning: 'xa', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 36', section: 'reading' },
  { id: '34', hiragana: 'めずらしい', kanji: '珍しい', meaning: 'hiếm', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 36', section: 'reading' },
  { id: '35', hiragana: 'きふね', kanji: '貴船', meaning: 'tàu lửa chạy bằng hơi nước', difficulty: 'hard', category: 'Transport', lesson: 'Bài 36', section: 'reading' },
  { id: '36', hiragana: 'きせん', kanji: '汽船', meaning: 'tàu thủy chạy bằng hơi nước', difficulty: 'hard', category: 'Transport', lesson: 'Bài 36', section: 'reading' },
  { id: '37', hiragana: 'おおぜい', kanji: '大勢', meaning: 'nhiều ~ (dùng cho người)', difficulty: 'medium', category: 'Quantity', lesson: 'Bài 36', section: 'reading' },
  { id: '38', hiragana: 'りようします III', kanji: '利用します', meaning: 'sử dụng', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 36', section: 'reading' },
  { id: '39', hiragana: 'じゆう', kanji: '自由', meaning: 'thoải mái', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 36', section: 'reading' },

  // Sức khỏe (健康)
  { id: '40', hiragana: 'いいです', kanji: '', meaning: 'tốt', difficulty: 'easy', category: 'Health', lesson: 'Bài 36', section: 'reading' },
  { id: '41', hiragana: 'わるい', kanji: '', meaning: 'không tốt', difficulty: 'easy', category: 'Health', lesson: 'Bài 36', section: 'reading' },
  { id: '42', hiragana: 'きそくてきなせいかつ', kanji: '規則的な生活', meaning: 'sinh hoạt đúng giờ', difficulty: 'hard', category: 'Health', lesson: 'Bài 36', section: 'reading' },
  { id: '43', hiragana: 'よくねます II', kanji: 'よく寝ます', meaning: 'ngủ sớm, dậy sớm', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 36', section: 'reading' },
  { id: '44', hiragana: 'うんどうします III', kanji: '運動します', meaning: 'vận động', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 36', section: 'reading' },
  { id: '45', hiragana: 'やすみます II', kanji: '休みます', meaning: 'nghỉ ngơi', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 36', section: 'reading' },
  { id: '46', hiragana: 'よくたべます II', kanji: 'よく食べます', meaning: 'ăn nhiều', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 36', section: 'reading' },
  { id: '47', hiragana: 'きんえん', kanji: '禁煙', meaning: 'không hút thuốc', difficulty: 'medium', category: 'Health', lesson: 'Bài 36', section: 'reading' },
  { id: '48', hiragana: 'きんし', kanji: '禁酒', meaning: 'không uống rượu', difficulty: 'medium', category: 'Health', lesson: 'Bài 36', section: 'reading' },
  { id: '49', hiragana: 'ストレスかいしょう', kanji: '', meaning: 'giải tỏa stress', difficulty: 'hard', category: 'Health', lesson: 'Bài 36', section: 'reading' },
  { id: '50', hiragana: 'たいじゅう', kanji: '体重', meaning: 'cân nặng', difficulty: 'medium', category: 'Health', lesson: 'Bài 36', section: 'reading' },
  { id: '51', hiragana: 'けんこうしんだん', kanji: '健康診断', meaning: 'khám sức khỏe', difficulty: 'hard', category: 'Health', lesson: 'Bài 36', section: 'reading' },
  { id: '52', hiragana: 'しょくもつせんい', kanji: '食物繊維', meaning: 'chất bột', difficulty: 'hard', category: 'Nutrition', lesson: 'Bài 36', section: 'reading' },
  { id: '53', hiragana: 'いも', kanji: '芋', meaning: 'khoai', difficulty: 'medium', category: 'Food', lesson: 'Bài 36', section: 'reading' },
  { id: '54', hiragana: 'とうにゅう', kanji: '豆乳', meaning: 'đậu phụ', difficulty: 'medium', category: 'Food', lesson: 'Bài 36', section: 'reading' },
  { id: '55', hiragana: 'たんぱくしつ', kanji: '蛋白質', meaning: 'chất đạm', difficulty: 'hard', category: 'Nutrition', lesson: 'Bài 36', section: 'reading' },
  { id: '56', hiragana: 'のり', kanji: '', meaning: 'tảo biển', difficulty: 'medium', category: 'Food', lesson: 'Bài 36', section: 'reading' },
  { id: '57', hiragana: 'かんずめ', kanji: '缶詰', meaning: 'can-xi', difficulty: 'hard', category: 'Nutrition', lesson: 'Bài 36', section: 'reading' },
  { id: '58', hiragana: 'かいそう', kanji: '海藻', meaning: 'rong biển', difficulty: 'hard', category: 'Food', lesson: 'Bài 36', section: 'reading' },
  { id: '59', hiragana: 'ビタミン', kanji: '', meaning: 'vitamin', difficulty: 'medium', category: 'Nutrition', lesson: 'Bài 36', section: 'reading' }
];
