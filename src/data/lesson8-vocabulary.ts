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

export const lesson8Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'ハンサム', kanji: '', meaning: 'đẹp trai', difficulty: 'easy', category: 'Appearance', lesson: 'Bài 8', section: 'main' },
  { id: '2', hiragana: 'きれい', kanji: '', meaning: 'đẹp, sạch', difficulty: 'easy', category: 'Appearance', lesson: 'Bài 8', section: 'main' },
  { id: '3', hiragana: 'しずか', kanji: '静か', meaning: 'yên tĩnh', difficulty: 'easy', category: 'Environment', lesson: 'Bài 8', section: 'main' },
  { id: '4', hiragana: 'にぎやか', kanji: '', meaning: 'náo nhiệt', difficulty: 'easy', category: 'Environment', lesson: 'Bài 8', section: 'main' },
  { id: '5', hiragana: 'ゆうめい', kanji: '有名', meaning: 'nổi tiếng', difficulty: 'easy', category: 'Status', lesson: 'Bài 8', section: 'main' },
  { id: '6', hiragana: 'しんせつ', kanji: '親切', meaning: 'tốt bụng, thân thiện', difficulty: 'easy', category: 'Personality', lesson: 'Bài 8', section: 'main' },
  { id: '7', hiragana: 'げんき', kanji: '元気', meaning: 'khỏe khoắn', difficulty: 'easy', category: 'Health', lesson: 'Bài 8', section: 'main' },
  { id: '8', hiragana: 'ひま', kanji: '暇', meaning: 'rảnh rỗi', difficulty: 'easy', category: 'Time', lesson: 'Bài 8', section: 'main' },
  { id: '9', hiragana: 'べんり', kanji: '便利', meaning: 'tiện lợi', difficulty: 'easy', category: 'Utility', lesson: 'Bài 8', section: 'main' },
  { id: '10', hiragana: 'すてき', kanji: '', meaning: 'đẹp, hay', difficulty: 'easy', category: 'Appearance', lesson: 'Bài 8', section: 'main' },
  { id: '11', hiragana: 'おおきい', kanji: '大きい', meaning: 'to, lớn', difficulty: 'easy', category: 'Size', lesson: 'Bài 8', section: 'main' },
  { id: '12', hiragana: 'ちいさい', kanji: '小さい', meaning: 'nhỏ, bé', difficulty: 'easy', category: 'Size', lesson: 'Bài 8', section: 'main' },
  { id: '13', hiragana: 'あたらしい', kanji: '新しい', meaning: 'mới', difficulty: 'easy', category: 'Condition', lesson: 'Bài 8', section: 'main' },
  { id: '14', hiragana: 'ふるい', kanji: '古い', meaning: 'cũ', difficulty: 'easy', category: 'Condition', lesson: 'Bài 8', section: 'main' },
  { id: '15', hiragana: 'いい', kanji: '良い', meaning: 'tốt', difficulty: 'easy', category: 'Quality', lesson: 'Bài 8', section: 'main' },
  { id: '16', hiragana: 'わるい', kanji: '悪い', meaning: 'xấu', difficulty: 'easy', category: 'Quality', lesson: 'Bài 8', section: 'main' },
  { id: '17', hiragana: 'あつい', kanji: '暑い', meaning: 'nóng (thời tiết)', difficulty: 'easy', category: 'Weather', lesson: 'Bài 8', section: 'main' },
  { id: '18', hiragana: 'さむい', kanji: '寒い', meaning: 'lạnh, buốt', difficulty: 'easy', category: 'Weather', lesson: 'Bài 8', section: 'main' },
  { id: '19', hiragana: 'つめたい', kanji: '冷たい', meaning: 'lạnh, buốt (cảm giác)', difficulty: 'easy', category: 'Sensation', lesson: 'Bài 8', section: 'main' },
  { id: '20', hiragana: 'むずかしい', kanji: '難しい', meaning: 'khó', difficulty: 'easy', category: 'Difficulty', lesson: 'Bài 8', section: 'main' },
  { id: '21', hiragana: 'やさしい', kanji: '易しい', meaning: 'dễ', difficulty: 'easy', category: 'Difficulty', lesson: 'Bài 8', section: 'main' },
  { id: '22', hiragana: 'たかい', kanji: '高い', meaning: 'đắt, cao', difficulty: 'easy', category: 'Price', lesson: 'Bài 8', section: 'main' },
  { id: '23', hiragana: 'やすい', kanji: '安い', meaning: 'rẻ', difficulty: 'easy', category: 'Price', lesson: 'Bài 8', section: 'main' },
  { id: '24', hiragana: 'ひくい', kanji: '低い', meaning: 'thấp', difficulty: 'easy', category: 'Height', lesson: 'Bài 8', section: 'main' },
  { id: '25', hiragana: 'おもしろい', kanji: '', meaning: 'thú vị, hay', difficulty: 'easy', category: 'Interest', lesson: 'Bài 8', section: 'main' },
  { id: '26', hiragana: 'おいしい', kanji: '', meaning: 'ngon', difficulty: 'easy', category: 'Taste', lesson: 'Bài 8', section: 'main' },
  { id: '27', hiragana: 'いそがしい', kanji: '忙しい', meaning: 'bận', difficulty: 'easy', category: 'Status', lesson: 'Bài 8', section: 'main' },
  { id: '28', hiragana: 'たのしい', kanji: '楽しい', meaning: 'vui', difficulty: 'easy', category: 'Emotion', lesson: 'Bài 8', section: 'main' },
  { id: '29', hiragana: 'しろい', kanji: '白い', meaning: 'trắng', difficulty: 'easy', category: 'Color', lesson: 'Bài 8', section: 'main' },
  { id: '30', hiragana: 'くろい', kanji: '黒い', meaning: 'đen', difficulty: 'easy', category: 'Color', lesson: 'Bài 8', section: 'main' },
  { id: '31', hiragana: 'あかい', kanji: '赤い', meaning: 'đỏ', difficulty: 'easy', category: 'Color', lesson: 'Bài 8', section: 'main' },
  { id: '32', hiragana: 'あおい', kanji: '青い', meaning: 'xanh da trời', difficulty: 'easy', category: 'Color', lesson: 'Bài 8', section: 'main' },
  { id: '33', hiragana: 'さくら', kanji: '桜', meaning: 'hoa anh đào', difficulty: 'easy', category: 'Nature', lesson: 'Bài 8', section: 'main' },
  { id: '34', hiragana: 'やま', kanji: '山', meaning: 'núi', difficulty: 'easy', category: 'Nature', lesson: 'Bài 8', section: 'main' },
  { id: '35', hiragana: 'まち', kanji: '町', meaning: 'thị trấn, thị xã, thành phố', difficulty: 'easy', category: 'Places', lesson: 'Bài 8', section: 'main' },
  { id: '36', hiragana: 'たべもの', kanji: '食べ物', meaning: 'đồ ăn', difficulty: 'easy', category: 'Food', lesson: 'Bài 8', section: 'main' },
  { id: '37', hiragana: 'ところ', kanji: '所', meaning: 'nơi, chỗ', difficulty: 'easy', category: 'Places', lesson: 'Bài 8', section: 'main' },
  { id: '38', hiragana: 'りょう', kanji: '寮', meaning: 'kí túc xá', difficulty: 'easy', category: 'Places', lesson: 'Bài 8', section: 'main' },
  { id: '39', hiragana: 'レストラン', kanji: '', meaning: 'nhà hàng', difficulty: 'easy', category: 'Places', lesson: 'Bài 8', section: 'main' },
  { id: '40', hiragana: 'せいかつ', kanji: '生活', meaning: 'cuộc sống, sinh hoạt', difficulty: 'easy', category: 'Life', lesson: 'Bài 8', section: 'main' },
  { id: '41', hiragana: 'しごと', kanji: '仕事', meaning: 'việc, công việc', difficulty: 'easy', category: 'Work', lesson: 'Bài 8', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '42', hiragana: 'どう', kanji: '', meaning: 'thế nào', difficulty: 'easy', category: 'Questions', lesson: 'Bài 8', section: 'conversation' },
  { id: '43', hiragana: 'とても', kanji: '', meaning: 'rất, lắm', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 8', section: 'conversation' },
  { id: '44', hiragana: 'あまり', kanji: '', meaning: 'không ~ lắm', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 8', section: 'conversation' },
  { id: '45', hiragana: 'そして', kanji: '', meaning: 'và, thêm nữa', difficulty: 'easy', category: 'Conjunctions', lesson: 'Bài 8', section: 'conversation' },
  { id: '46', hiragana: 'が', kanji: '', meaning: 'nhưng', difficulty: 'easy', category: 'Conjunctions', lesson: 'Bài 8', section: 'conversation' },
  { id: '47', hiragana: 'おげんきですか', kanji: 'お元気ですか', meaning: 'Anh/Chị có khỏe không?', difficulty: 'easy', category: 'Greetings', lesson: 'Bài 8', section: 'conversation' },
  { id: '48', hiragana: 'そうですね', kanji: '', meaning: 'Thế à./Để tôi xem.', difficulty: 'easy', category: 'Responses', lesson: 'Bài 8', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '49', hiragana: 'いっぱい', kanji: '一杯', meaning: 'một chén', difficulty: 'easy', category: 'Food', lesson: 'Bài 8', section: 'reading' },
  { id: '50', hiragana: 'いかがですか', kanji: '如何ですか', meaning: 'Anh/Chị dùng ~ nhé?', difficulty: 'easy', category: 'Offers', lesson: 'Bài 8', section: 'reading' },
  { id: '51', hiragana: 'けっこうです', kanji: '結構です', meaning: 'đủ rồi ạ', difficulty: 'easy', category: 'Responses', lesson: 'Bài 8', section: 'reading' },
  { id: '52', hiragana: 'しつれいします', kanji: '失礼します', meaning: 'xin phép', difficulty: 'easy', category: 'Politeness', lesson: 'Bài 8', section: 'reading' },
  { id: '53', hiragana: 'いらっしゃってください', kanji: 'いらっしゃってください', meaning: 'hãy đến chơi', difficulty: 'easy', category: 'Invitations', lesson: 'Bài 8', section: 'reading' },
  { id: '54', hiragana: 'シャンハイ', kanji: '上海', meaning: 'Thượng Hải', difficulty: 'easy', category: 'Places', lesson: 'Bài 8', section: 'reading' },
  { id: '55', hiragana: 'きんかくじ', kanji: '金閣寺', meaning: 'Chùa Kinkaku-ji (Chùa Vàng)', difficulty: 'easy', category: 'Places', lesson: 'Bài 8', section: 'reading' },
  { id: '56', hiragana: 'ならこうえん', kanji: '奈良公園', meaning: 'Công viên Nara', difficulty: 'easy', category: 'Places', lesson: 'Bài 8', section: 'reading' },
  { id: '57', hiragana: 'ふじさん', kanji: '富士山', meaning: 'Núi Phú Sĩ', difficulty: 'easy', category: 'Places', lesson: 'Bài 8', section: 'reading' },
  { id: '58', hiragana: 'しちにんのさむらい', kanji: '七人の侍', meaning: 'Bảy võ sĩ', difficulty: 'easy', category: 'Culture', lesson: 'Bài 8', section: 'reading' },
  { id: '59', hiragana: 'いろ', kanji: '色', meaning: 'màu', difficulty: 'easy', category: 'Colors', lesson: 'Bài 8', section: 'reading' },
  { id: '60', hiragana: 'あじ', kanji: '味', meaning: 'vị', difficulty: 'easy', category: 'Taste', lesson: 'Bài 8', section: 'reading' }
];