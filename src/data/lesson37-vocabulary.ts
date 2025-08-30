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

export const lesson37Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'ほめます II', kanji: '褒めます', meaning: 'khen', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '2', hiragana: 'しかります I', kanji: '叱ります', meaning: 'mắng', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '3', hiragana: 'さそいます I', kanji: '誘います', meaning: 'mời, rủ', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '4', hiragana: 'おこします I', kanji: '起こします', meaning: 'nhờ', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '5', hiragana: 'さそいます I', kanji: '誘います', meaning: 'nhập cấp', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '6', hiragana: 'よびます I', kanji: '呼びます', meaning: 'lấy cấp', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '7', hiragana: 'ふみます I', kanji: '踏みます', meaning: 'dẫm', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '8', hiragana: 'こわします I', kanji: '壊します', meaning: 'làm hỏng', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '9', hiragana: 'よごします I', kanji: '汚します', meaning: 'làm bẩn', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '10', hiragana: 'おこないます III', kanji: '行います', meaning: 'tổ chức', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '11', hiragana: 'ゆしゅつします III', kanji: '輸出します', meaning: 'xuất nhập khẩu', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '12', hiragana: 'ゆにゅうします III', kanji: '輸入します', meaning: 'nhập khẩu', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '13', hiragana: 'ほんやくします III', kanji: '翻訳します', meaning: 'biên dịch', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '14', hiragana: 'はっけんします III', kanji: '発見します', meaning: 'giải thích, thuyết trình', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '15', hiragana: 'はつめいします III', kanji: '発明します', meaning: 'phát hiện', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 37', section: 'main' },
  { id: '16', hiragana: 'こめ', kanji: '米', meaning: 'gạo', difficulty: 'easy', category: 'Food', lesson: 'Bài 37', section: 'main' },
  { id: '17', hiragana: 'むぎ', kanji: '麦', meaning: 'lúa mạch', difficulty: 'medium', category: 'Food', lesson: 'Bài 37', section: 'main' },
  { id: '18', hiragana: 'せきゆ', kanji: '石油', meaning: 'dầu mỏ', difficulty: 'hard', category: 'Resources', lesson: 'Bài 37', section: 'main' },
  { id: '19', hiragana: 'げんりょう', kanji: '原料', meaning: 'nguyên liệu', difficulty: 'hard', category: 'Materials', lesson: 'Bài 37', section: 'main' },
  { id: '20', hiragana: 'インスタントラーメン', kanji: '', meaning: 'mì ăn liền, mì gói', difficulty: 'hard', category: 'Food', lesson: 'Bài 37', section: 'main' },
  { id: '21', hiragana: 'デート', kanji: '', meaning: 'hẹn hò', difficulty: 'medium', category: 'Activities', lesson: 'Bài 37', section: 'main' },
  { id: '22', hiragana: 'どろぼう', kanji: '泥棒', meaning: 'kẻ trộm', difficulty: 'medium', category: 'Crime', lesson: 'Bài 37', section: 'main' },
  { id: '23', hiragana: 'けいかん', kanji: '警官', meaning: 'cảnh sát', difficulty: 'medium', category: 'Professions', lesson: 'Bài 37', section: 'main' },
  { id: '24', hiragana: 'せかいじゅう', kanji: '世界中', meaning: 'trên toàn thế giới', difficulty: 'hard', category: 'Places', lesson: 'Bài 37', section: 'main' },
  { id: '25', hiragana: '～じゅう', kanji: '～中', meaning: 'toàn ~', difficulty: 'medium', category: 'Suffixes', lesson: 'Bài 37', section: 'main' },
  { id: '26', hiragana: '～せいき', kanji: '～世紀', meaning: 'thế kỷ ~', difficulty: 'hard', category: 'Time', lesson: 'Bài 37', section: 'main' },
  { id: '27', hiragana: 'なに', kanji: '何', meaning: 'tiếng gì', difficulty: 'easy', category: 'Questions', lesson: 'Bài 37', section: 'main' },
  { id: '28', hiragana: 'だれか', kanji: '', meaning: 'ai đó', difficulty: 'medium', category: 'People', lesson: 'Bài 37', section: 'main' },
  { id: '29', hiragana: 'よかったですね', kanji: '', meaning: 'Hay quá nhỉ./Vui quá nhỉ.', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 37', section: 'main' },
  { id: '30', hiragana: 'オリンピック', kanji: '', meaning: 'Olympic', difficulty: 'medium', category: 'Events', lesson: 'Bài 37', section: 'main' },
  { id: '31', hiragana: 'ワールドカップ', kanji: '', meaning: 'Cúp bóng đá thế giới', difficulty: 'hard', category: 'Events', lesson: 'Bài 37', section: 'main' },
  { id: '32', hiragana: 'おおみそか', kanji: '大晦日', meaning: 'Chùa Todaiji', difficulty: 'hard', category: 'Places', lesson: 'Bài 37', section: 'main' },
  { id: '33', hiragana: 'だいぶつ', kanji: '大仏', meaning: 'tượng Phật lớn', difficulty: 'hard', category: 'Places', lesson: 'Bài 37', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '34', hiragana: 'きゃく', kanji: '客', meaning: 'quý vị (kính ngữ của みなさん)', difficulty: 'medium', category: 'People', lesson: 'Bài 37', section: 'conversation' },
  { id: '35', hiragana: 'おたく', kanji: 'お宅', meaning: 'cháy [nhà ~]', difficulty: 'medium', category: 'Disasters', lesson: 'Bài 37', section: 'conversation' },
  { id: '36', hiragana: 'そのご', kanji: 'その後', meaning: 'sau đó', difficulty: 'medium', category: 'Time', lesson: 'Bài 37', section: 'conversation' },
  { id: '37', hiragana: 'せかいさん', kanji: '世界遺産', meaning: 'di sản thế giới', difficulty: 'hard', category: 'Heritage', lesson: 'Bài 37', section: 'conversation' },
  { id: '38', hiragana: '～のいち', kanji: '', meaning: 'một trong những ~', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 37', section: 'conversation' },
  { id: '39', hiragana: 'きんいろ', kanji: '金色', meaning: 'màu (của) vàng', difficulty: 'medium', category: 'Colors', lesson: 'Bài 37', section: 'conversation' },
  { id: '40', hiragana: 'ほんもの', kanji: '本物', meaning: 'đồ thật', difficulty: 'medium', category: 'Quality', lesson: 'Bài 37', section: 'conversation' },
  { id: '41', hiragana: 'きん', kanji: '金', meaning: 'vàng', difficulty: 'medium', category: 'Materials', lesson: 'Bài 37', section: 'conversation' },
  { id: '42', hiragana: '～キロ', kanji: '', meaning: '~ kilôgam, ~ kilômét', difficulty: 'medium', category: 'Units', lesson: 'Bài 37', section: 'conversation' },
  { id: '43', hiragana: 'うつくしい', kanji: '美しい', meaning: 'đẹp', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 37', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '44', hiragana: 'りっぱな', kanji: '立派な', meaning: 'sang trọng, hoành tráng', difficulty: 'hard', category: 'Adjectives', lesson: 'Bài 37', section: 'reading' },
  { id: '45', hiragana: 'べつに', kanji: '別に', meaning: 'điều khác', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 37', section: 'reading' },
  { id: '46', hiragana: 'でんせつ', kanji: '伝説', meaning: 'truyền thuyết', difficulty: 'hard', category: 'Stories', lesson: 'Bài 37', section: 'reading' },
  { id: '47', hiragana: 'いっしょう', kanji: '一生', meaning: 'một đời, một kiếp', difficulty: 'hard', category: 'Time', lesson: 'Bài 37', section: 'reading' },
  { id: '48', hiragana: 'かたち', kanji: '形', meaning: 'hình dáng', difficulty: 'medium', category: 'Appearance', lesson: 'Bài 37', section: 'reading' },
  { id: '49', hiragana: 'なかま', kanji: '仲間', meaning: 'đồng nghiệp', difficulty: 'medium', category: 'People', lesson: 'Bài 37', section: 'reading' },
  { id: '50', hiragana: 'しかし', kanji: '', meaning: 'nhưng', difficulty: 'medium', category: 'Conjunctions', lesson: 'Bài 37', section: 'reading' },
  { id: '51', hiragana: 'そのあと', kanji: '', meaning: 'sau đó', difficulty: 'medium', category: 'Time', lesson: 'Bài 37', section: 'reading' },
  { id: '52', hiragana: 'ちから', kanji: '力', meaning: 'chăm chỉ, gắng hết sức', difficulty: 'medium', category: 'Effort', lesson: 'Bài 37', section: 'reading' },
  { id: '53', hiragana: 'ねずみ', kanji: '', meaning: 'chuột', difficulty: 'medium', category: 'Animals', lesson: 'Bài 37', section: 'reading' },
  { id: '54', hiragana: 'むすめ', kanji: '娘', meaning: 'không có một con nào cả.', difficulty: 'medium', category: 'Family', lesson: 'Bài 37', section: 'reading' },
  { id: '55', hiragana: 'にっこう', kanji: '日光', meaning: 'đền thờ Tokugawa Ieyasu nằm ở Nikko, tỉnh Tochigi', difficulty: 'hard', category: 'Places', lesson: 'Bài 37', section: 'reading' },
  { id: '56', hiragana: 'ねこ', kanji: '猫', meaning: 'con mèo ngủ', difficulty: 'easy', category: 'Animals', lesson: 'Bài 37', section: 'reading' },
  { id: '57', hiragana: 'ねずみ', kanji: '鼠', meaning: 'nhà điều khắc nổi tiếng thời Edo', difficulty: 'hard', category: 'Professions', lesson: 'Bài 37', section: 'reading' },

  // Tai nạn & Vụ án (事故・事件)
  { id: '58', hiragana: 'ころします I', kanji: '殺します', meaning: 'giết', difficulty: 'hard', category: 'Crime', lesson: 'Bài 37', section: 'reading' },
  { id: '59', hiragana: 'うちます I', kanji: '撃ちます', meaning: 'bắn', difficulty: 'hard', category: 'Crime', lesson: 'Bài 37', section: 'reading' },
  { id: '60', hiragana: 'さします I', kanji: '刺します', meaning: 'đâm', difficulty: 'hard', category: 'Crime', lesson: 'Bài 37', section: 'reading' },
  { id: '61', hiragana: 'かみます I', kanji: '噛みます', meaning: 'cắn', difficulty: 'hard', category: 'Crime', lesson: 'Bài 37', section: 'reading' },
  { id: '62', hiragana: 'ひきます I', kanji: '轢きます', meaning: 'đâm phải đuổi, đâm từ phía sau', difficulty: 'hard', category: 'Crime', lesson: 'Bài 37', section: 'reading' },
  { id: '63', hiragana: 'ひきます I', kanji: '轢きます', meaning: 'đâm phải, va chạm', difficulty: 'hard', category: 'Crime', lesson: 'Bài 37', section: 'reading' },
  { id: '64', hiragana: 'こわします I', kanji: '壊します', meaning: 'đâm nhau', difficulty: 'hard', category: 'Crime', lesson: 'Bài 37', section: 'reading' },
  { id: '65', hiragana: 'おちます II', kanji: '落ちます', meaning: 'làm rơi', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 37', section: 'reading' },
  { id: '66', hiragana: 'ぬすみます I', kanji: '盗みます', meaning: 'ăn trộm', difficulty: 'hard', category: 'Crime', lesson: 'Bài 37', section: 'reading' },
  { id: '67', hiragana: 'ゆうかいします III', kanji: '誘拐します', meaning: 'bắt cóc, tống tiền', difficulty: 'hard', category: 'Crime', lesson: 'Bài 37', section: 'reading' },
  { id: '68', hiragana: 'ハイジャックします III', kanji: '', meaning: 'không tặc, cướp máy bay', difficulty: 'hard', category: 'Crime', lesson: 'Bài 37', section: 'reading' },
  { id: '69', hiragana: 'おちます II', kanji: '落ちます', meaning: 'rơi [máy bay]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 37', section: 'reading' },
  { id: '70', hiragana: 'はこびます I', kanji: '運びます', meaning: 'chở, vận chuyển', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 37', section: 'reading' },
  { id: '71', hiragana: 'たすけます II', kanji: '助けます', meaning: 'cứu, cứu giúp, cứu trợ', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 37', section: 'reading' },
  { id: '72', hiragana: 'ばくはつします III', kanji: '爆発します', meaning: 'nổ', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 37', section: 'reading' },
  { id: '73', hiragana: 'しずみます II', kanji: '沈みます', meaning: 'chìm, đắm', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 37', section: 'reading' }
];
