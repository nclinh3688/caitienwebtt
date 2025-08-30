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

export const lesson45Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'しんじます II', kanji: '信じます', meaning: 'tin', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 45', section: 'main' },
  { id: '2', hiragana: 'キャンセルします III', kanji: 'キャンセルします', meaning: 'hủy', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 45', section: 'main' },
  { id: '3', hiragana: 'しらせます II', kanji: '知らせます', meaning: 'thông báo', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 45', section: 'main' },
  { id: '4', hiragana: 'ほしょうしょ', kanji: '保証書', meaning: 'phiếu bảo hành', difficulty: 'hard', category: 'Documents', lesson: 'Bài 45', section: 'main' },
  { id: '5', hiragana: 'りょうしゅうしょ', kanji: '領収書', meaning: 'hóa đơn', difficulty: 'hard', category: 'Documents', lesson: 'Bài 45', section: 'main' },
  { id: '6', hiragana: 'キャンプ', kanji: '', meaning: 'cắm trại', difficulty: 'medium', category: 'Activities', lesson: 'Bài 45', section: 'main' },
  { id: '7', hiragana: 'ちゅうし', kanji: '中止', meaning: 'hủy', difficulty: 'medium', category: 'Cancellation', lesson: 'Bài 45', section: 'main' },
  { id: '8', hiragana: 'てん', kanji: '点', meaning: 'điểm, điểm số', difficulty: 'medium', category: 'Points', lesson: 'Bài 45', section: 'main' },
  { id: '9', hiragana: 'うめ', kanji: '梅', meaning: 'hoa mơ', difficulty: 'medium', category: 'Flowers', lesson: 'Bài 45', section: 'main' },
  { id: '10', hiragana: '１１０ばん', kanji: '１１０番', meaning: 'số điện thoại báo cảnh sát khi khẩn cấp', difficulty: 'hard', category: 'Emergency', lesson: 'Bài 45', section: 'main' },
  { id: '11', hiragana: '１１９ばん', kanji: '１１９番', meaning: 'số điện thoại báo cháy khi khẩn cấp', difficulty: 'hard', category: 'Emergency', lesson: 'Bài 45', section: 'main' },
  { id: '12', hiragana: 'きゅうに', kanji: '急に', meaning: 'đột nhiên', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 45', section: 'main' },
  { id: '13', hiragana: 'むりに', kanji: '無理に', meaning: 'cố, gắng (làm không hợp lý)', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 45', section: 'main' },
  { id: '14', hiragana: 'たのしみにしています', kanji: '楽しみにしています', meaning: 'tôi rất mong chờ', difficulty: 'hard', category: 'Expressions', lesson: 'Bài 45', section: 'main' },
  { id: '15', hiragana: 'いじょうです', kanji: '以上です', meaning: 'xin hết.', difficulty: 'hard', category: 'Expressions', lesson: 'Bài 45', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '16', hiragana: 'かかりいん', kanji: '係員', meaning: 'người phụ trách', difficulty: 'medium', category: 'Staff', lesson: 'Bài 45', section: 'conversation' },
  { id: '17', hiragana: 'コース', kanji: '', meaning: 'đường chạy ma-ra-tông', difficulty: 'medium', category: 'Routes', lesson: 'Bài 45', section: 'conversation' },
  { id: '18', hiragana: 'スタート', kanji: '', meaning: 'xuất phát', difficulty: 'medium', category: 'Start', lesson: 'Bài 45', section: 'conversation' },
  { id: '19', hiragana: '１い', kanji: '1位', meaning: 'thứ –', difficulty: 'medium', category: 'Ranking', lesson: 'Bài 45', section: 'conversation' },
  { id: '20', hiragana: 'ゆうしょうします III', kanji: '優勝します', meaning: 'chiến thắng', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 45', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '21', hiragana: 'なやみ', kanji: '悩み', meaning: 'điều bận tâm, điều khó khám', difficulty: 'medium', category: 'Worries', lesson: 'Bài 45', section: 'reading' },
  { id: '22', hiragana: 'めざまし[時計]', kanji: '目覚まし[時計]', meaning: '[đồng hồ] báo thức', difficulty: 'hard', category: 'Objects', lesson: 'Bài 45', section: 'reading' },
  { id: '23', hiragana: 'めがさめます II', kanji: '目が覚めます', meaning: 'tỉnh giấc, thức giấc', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 45', section: 'reading' },
  { id: '24', hiragana: 'だいがくせい', kanji: '大学生', meaning: 'sinh viên đại học', difficulty: 'medium', category: 'Students', lesson: 'Bài 45', section: 'reading' },
  { id: '25', hiragana: 'こたえ', kanji: '答え', meaning: 'câu trả lời (～をします: trả lời)', difficulty: 'medium', category: 'Answers', lesson: 'Bài 45', section: 'reading' },
  { id: '26', hiragana: 'よびます I', kanji: '呼びます', meaning: 'kêu', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 45', section: 'reading' },
  { id: '27', hiragana: 'セットします III', kanji: 'セットします', meaning: 'đặt (giờ)', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 45', section: 'reading' },
  { id: '28', hiragana: 'それでも', kanji: '', meaning: 'kể cả như thế, mặc dù như thế', difficulty: 'medium', category: 'Conjunctions', lesson: 'Bài 45', section: 'reading' }
];
