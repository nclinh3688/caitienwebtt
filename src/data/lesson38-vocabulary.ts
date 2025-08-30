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

export const lesson38Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'さんかします III', kanji: '参加します', meaning: 'tham gia [~du lịch]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'main' },
  { id: '2', hiragana: 'そだてます II', kanji: '育てます', meaning: 'chăm sóc, nuôi dưỡng', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'main' },
  { id: '3', hiragana: 'はこびます I', kanji: '運びます', meaning: 'vận chuyển', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'main' },
  { id: '4', hiragana: 'にゅういんします III', kanji: '入院します', meaning: 'nhập viện', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'main' },
  { id: '5', hiragana: 'たいいんします III', kanji: '退院します', meaning: 'ra viện', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'main' },
  { id: '6', hiragana: 'いれます II', kanji: '入れます', meaning: 'bật [điện nguồn]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'main' },
  { id: '7', hiragana: 'きります I', kanji: '切ります', meaning: 'tắt [điện nguồn]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'main' },
  { id: '8', hiragana: 'かけます II', kanji: '掛けます', meaning: 'khóa [ổ khóa]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'main' },
  { id: '9', hiragana: 'つきます I', kanji: 'つきます', meaning: 'nói dối', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'main' },
  { id: '10', hiragana: 'きもちがいい', kanji: '気持ちがいい', meaning: 'tâm trạng sảng khoái, tốt', difficulty: 'medium', category: 'Feelings', lesson: 'Bài 38', section: 'main' },
  { id: '11', hiragana: 'きもちがわるい', kanji: '気持ちが悪い＊', meaning: 'tâm trạng không tốt', difficulty: 'medium', category: 'Feelings', lesson: 'Bài 38', section: 'main' },
  { id: '12', hiragana: 'おおきな', kanji: '大きな～', meaning: '~ lớn, ~to', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 38', section: 'main' },
  { id: '13', hiragana: 'ちいさな', kanji: '小さな～', meaning: '~ bé, ~ nhỏ', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 38', section: 'main' },
  { id: '14', hiragana: 'あかちゃん', kanji: '赤ちゃん', meaning: 'em bé', difficulty: 'medium', category: 'People', lesson: 'Bài 38', section: 'main' },
  { id: '15', hiragana: 'しょうがっこう', kanji: '小学校', meaning: 'trường tiểu học, trường cấp 1', difficulty: 'medium', category: 'Education', lesson: 'Bài 38', section: 'main' },
  { id: '16', hiragana: 'ちゅうがっこう', kanji: '中学校', meaning: 'trường trung học cơ sở, trường cấp 2', difficulty: 'medium', category: 'Education', lesson: 'Bài 38', section: 'main' },
  { id: '17', hiragana: 'えきまえ', kanji: '駅前', meaning: 'trước ga', difficulty: 'medium', category: 'Places', lesson: 'Bài 38', section: 'main' },
  { id: '18', hiragana: 'かいがん', kanji: '海岸', meaning: 'bờ biển', difficulty: 'medium', category: 'Places', lesson: 'Bài 38', section: 'main' },
  { id: '19', hiragana: 'こうじょう', kanji: '工場', meaning: 'nhà máy', difficulty: 'medium', category: 'Places', lesson: 'Bài 38', section: 'main' },
  { id: '20', hiragana: 'むら', kanji: '村', meaning: 'làng', difficulty: 'medium', category: 'Places', lesson: 'Bài 38', section: 'main' },
  { id: '21', hiragana: 'かな', kanji: 'かな', meaning: 'chữ Kana', difficulty: 'medium', category: 'Language', lesson: 'Bài 38', section: 'main' },
  { id: '22', hiragana: 'ゆびわ', kanji: '指輪', meaning: 'nhẫn', difficulty: 'medium', category: 'Objects', lesson: 'Bài 38', section: 'main' },
  { id: '23', hiragana: 'でんげん', kanji: '電源', meaning: 'điện nguồn', difficulty: 'medium', category: 'Technology', lesson: 'Bài 38', section: 'main' },
  { id: '24', hiragana: 'しゅうかん', kanji: '習慣', meaning: 'thói quen, tập quán', difficulty: 'medium', category: 'Behavior', lesson: 'Bài 38', section: 'main' },
  { id: '25', hiragana: 'けんこう', kanji: '健康', meaning: 'sức khỏe', difficulty: 'medium', category: 'Health', lesson: 'Bài 38', section: 'main' },
  { id: '26', hiragana: '～せい', kanji: '～製', meaning: 'hàng ~', difficulty: 'medium', category: 'Suffixes', lesson: 'Bài 38', section: 'main' },
  { id: '27', hiragana: 'おととし', kanji: 'おととし', meaning: 'năm kia', difficulty: 'medium', category: 'Time', lesson: 'Bài 38', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '28', hiragana: 'あ、いけない。', kanji: '', meaning: '[A,] không được rồi. (dùng khi làm nhầm hay thất bại việc gì đó)', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 38', section: 'conversation' },
  { id: '29', hiragana: 'おさきに', kanji: '', meaning: 'Tôi (xin phép) về trước.', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 38', section: 'conversation' },
  { id: '30', hiragana: 'しつれいします', kanji: '[失礼します]', meaning: 'Xin lỗi, tôi xin phép', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 38', section: 'conversation' },
  { id: '31', hiragana: 'げんぱく', kanji: '※原爆ドーム', meaning: 'nhà vòm tưởng niệm vụ ném bom nguyên tử ở Hiroshima', difficulty: 'hard', category: 'Places', lesson: 'Bài 38', section: 'conversation' },
  { id: '32', hiragana: 'いずもたいしゃ', kanji: '※出雲大社', meaning: 'đền thờ ở thành phố Izumo, tỉnh Shimane', difficulty: 'hard', category: 'Places', lesson: 'Bài 38', section: 'conversation' },
  { id: '33', hiragana: '※チェンマイ', kanji: '', meaning: 'Chiềng Mai (ở Thái Lan)', difficulty: 'hard', category: 'Places', lesson: 'Bài 38', section: 'conversation' },
  { id: '34', hiragana: 'かいわ', kanji: '回覧', meaning: 'tài liệu thông báo', difficulty: 'hard', category: 'Documents', lesson: 'Bài 38', section: 'conversation' },
  { id: '35', hiragana: 'けんきゅうしつ', kanji: '研究室', meaning: 'phòng nghiên cứu', difficulty: 'medium', category: 'Places', lesson: 'Bài 38', section: 'conversation' },
  { id: '36', hiragana: 'きちんと', kanji: '', meaning: 'ngay ngắn', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 38', section: 'conversation' },
  { id: '37', hiragana: 'せいりします III', kanji: '整理しますⅢ', meaning: 'sắp xếp', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'conversation' },
  { id: '38', hiragana: 'ほうほう', kanji: '方法', meaning: 'phương pháp', difficulty: 'medium', category: 'Methods', lesson: 'Bài 38', section: 'conversation' },
  { id: '39', hiragana: '~という', kanji: '', meaning: 'có tên gọi là ~', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 38', section: 'conversation' },
  { id: '40', hiragana: 'さつ', kanji: '一冊', meaning: 'quyển, cuốn (trợ số từ dùng để đếm sách, v.v.)', difficulty: 'medium', category: 'Counters', lesson: 'Bài 38', section: 'conversation' },
  { id: '41', hiragana: 'はんこ', kanji: 'はんこ', meaning: 'con dấu', difficulty: 'medium', category: 'Objects', lesson: 'Bài 38', section: 'conversation' },
  { id: '42', hiragana: 'おします I', kanji: '押しますⅠ [はんこを~]', meaning: 'đóng [dấu]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '43', hiragana: 'ふたご', kanji: '双子', meaning: 'sinh đôi', difficulty: 'medium', category: 'People', lesson: 'Bài 38', section: 'reading' },
  { id: '44', hiragana: 'しまい', kanji: '姉妹', meaning: 'chị em', difficulty: 'medium', category: 'Family', lesson: 'Bài 38', section: 'reading' },
  { id: '45', hiragana: 'ねんせい', kanji: '5年生', meaning: 'năm thứ 5', difficulty: 'medium', category: 'Education', lesson: 'Bài 38', section: 'reading' },
  { id: '46', hiragana: 'にています II', kanji: '似ていますⅡ', meaning: 'giống', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'reading' },
  { id: '47', hiragana: 'せいかく', kanji: '性格', meaning: 'tính cách', difficulty: 'medium', category: 'Personality', lesson: 'Bài 38', section: 'reading' },
  { id: '48', hiragana: 'おとなしい', kanji: '', meaning: 'ngoan ngoãn', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 38', section: 'reading' },
  { id: '49', hiragana: 'やさしい', kanji: '優しい', meaning: 'hiền lành', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 38', section: 'reading' },
  { id: '50', hiragana: 'せわ', kanji: '世話をしますⅢ', meaning: 'chăm sóc', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'reading' },
  { id: '51', hiragana: 'じかん', kanji: '時間がたちますⅠ', meaning: 'thời gian trôi', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'reading' },
  { id: '52', hiragana: 'だいすき[な]', kanji: '大好き[な]', meaning: 'rất thích', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 38', section: 'reading' },
  { id: '53', hiragana: 'いってん', kanji: '一点', meaning: '- điểm', difficulty: 'medium', category: 'Points', lesson: 'Bài 38', section: 'reading' },
  { id: '54', hiragana: 'きがつよい', kanji: '気が強い', meaning: 'tính cách mạnh mẽ', difficulty: 'hard', category: 'Personality', lesson: 'Bài 38', section: 'reading' },
  { id: '55', hiragana: 'けんかします III', kanji: 'けんかしますⅢ', meaning: 'cãi nhau', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 38', section: 'reading' },
  { id: '56', hiragana: 'ふしぎ[な]', kanji: '不思議[な]', meaning: 'kỳ lạ', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 38', section: 'reading' },
  { id: '57', hiragana: 'ねんれい', kanji: '年齡', meaning: 'tuổi tác', difficulty: 'medium', category: 'Age', lesson: 'Bài 38', section: 'reading' },
  { id: '58', hiragana: 'しかた', kanji: '仕方', meaning: 'cách làm', difficulty: 'medium', category: 'Methods', lesson: 'Bài 38', section: 'reading' }
];
