export interface VocabularyWord {
  section?: 'main' | 'conversation' | 'reading'; // Thêm trường section
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

export const lesson7Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'あいます', kanji: '会います', meaning: 'gặp', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 7', section: 'main' },
  { id: '2', hiragana: 'わかります', kanji: '分かります', meaning: 'hiểu, biết', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 7', section: 'main' },
  { id: '3', hiragana: 'あります', kanji: 'あります', meaning: 'có (đồ vật)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 7', section: 'main' },
  { id: '4', hiragana: 'すき', kanji: '好き', meaning: 'thích', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 7', section: 'main' },
  { id: '5', hiragana: 'きらい', kanji: '嫌い', meaning: 'ghét, không thích', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 7', section: 'main' },
  { id: '6', hiragana: 'じょうず', kanji: '上手', meaning: 'giỏi, khéo', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 7', section: 'main' },
  { id: '7', hiragana: 'へた', kanji: '下手', meaning: 'kém, vụng', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 7', section: 'main' },
  { id: '8', hiragana: 'りゅうがくせい', kanji: '留学生', meaning: 'du học sinh', difficulty: 'easy', category: 'People', lesson: 'Bài 7', section: 'main' },
  { id: '9', hiragana: 'だいがく', kanji: '大学', meaning: 'đại học', difficulty: 'easy', category: 'Places', lesson: 'Bài 7', section: 'main' },
  { id: '10', hiragana: 'びょういん', kanji: '病院', meaning: 'bệnh viện', difficulty: 'easy', category: 'Places', lesson: 'Bài 7', section: 'main' },
  { id: '11', hiragana: 'ぎんこう', kanji: '銀行', meaning: 'ngân hàng', difficulty: 'easy', category: 'Places', lesson: 'Bài 7', section: 'main' },
  { id: '12', hiragana: 'ゆうびんきょく', kanji: '郵便局', meaning: 'bưu điện', difficulty: 'easy', category: 'Places', lesson: 'Bài 7', section: 'main' },
  { id: '13', hiragana: 'としょかん', kanji: '図書館', meaning: 'thư viện', difficulty: 'easy', category: 'Places', lesson: 'Bài 7', section: 'main' },
  { id: '14', hiragana: 'びじゅつかん', kanji: '美術館', meaning: 'bảo tàng mỹ thuật', difficulty: 'easy', category: 'Places', lesson: 'Bài 7', section: 'main' },
  { id: '15', hiragana: 'こうえん', kanji: '公園', meaning: 'công viên', difficulty: 'easy', category: 'Places', lesson: 'Bài 7', section: 'main' },
  { id: '16', hiragana: 'えき', kanji: '駅', meaning: 'ga (xe lửa)', difficulty: 'easy', category: 'Places', lesson: 'Bài 7', section: 'main' },
  { id: '17', hiragana: 'みち', kanji: '道', meaning: 'đường, con đường', difficulty: 'easy', category: 'Places', lesson: 'Bài 7', section: 'main' },
  { id: '18', hiragana: 'ひだり', kanji: '左', meaning: 'trái, bên trái', difficulty: 'easy', category: 'Direction', lesson: 'Bài 7', section: 'main' },
  { id: '19', hiragana: 'みぎ', kanji: '右', meaning: 'phải, bên phải', difficulty: 'easy', category: 'Direction', lesson: 'Bài 7', section: 'main' },
  { id: '20', hiragana: 'まえ', kanji: '前', meaning: 'trước, phía trước', difficulty: 'easy', category: 'Direction', lesson: 'Bài 7', section: 'main' },
  { id: '21', hiragana: 'うしろ', kanji: '後ろ', meaning: 'sau, phía sau', difficulty: 'easy', category: 'Direction', lesson: 'Bài 7', section: 'main' },
  { id: '22', hiragana: 'なか', kanji: '中', meaning: 'trong, bên trong', difficulty: 'easy', category: 'Direction', lesson: 'Bài 7', section: 'main' },
  { id: '23', hiragana: 'そと', kanji: '外', meaning: 'ngoài, bên ngoài', difficulty: 'easy', category: 'Direction', lesson: 'Bài 7', section: 'main' },
  { id: '24', hiragana: 'となり', kanji: '隣', meaning: 'bên cạnh, kế bên', difficulty: 'easy', category: 'Direction', lesson: 'Bài 7', section: 'main' },
  { id: '25', hiragana: 'ちかく', kanji: '近く', meaning: 'gần, gần đây', difficulty: 'easy', category: 'Direction', lesson: 'Bài 7', section: 'main' },
  { id: '26', hiragana: 'とおく', kanji: '遠く', meaning: 'xa, xa xôi', difficulty: 'easy', category: 'Direction', lesson: 'Bài 7', section: 'main' },
  { id: '27', hiragana: 'ここ', kanji: '', meaning: 'chỗ này, đây', difficulty: 'easy', category: 'Location', lesson: 'Bài 7', section: 'main' },
  { id: '28', hiragana: 'そこ', kanji: '', meaning: 'chỗ đó, đó', difficulty: 'easy', category: 'Location', lesson: 'Bài 7', section: 'main' },
  { id: '29', hiragana: 'あそこ', kanji: '', meaning: 'chỗ kia, kia', difficulty: 'easy', category: 'Location', lesson: 'Bài 7', section: 'main' },
  { id: '30', hiragana: 'どこ', kanji: '', meaning: 'chỗ nào, đâu', difficulty: 'easy', category: 'Location', lesson: 'Bài 7', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '31', hiragana: 'いつ', kanji: '', meaning: 'bao giờ, khi nào', difficulty: 'easy', category: 'Questions', lesson: 'Bài 7', section: 'conversation' },
  { id: '32', hiragana: 'だれ', kanji: '誰', meaning: 'ai', difficulty: 'easy', category: 'Questions', lesson: 'Bài 7', section: 'conversation' },
  { id: '33', hiragana: 'なに', kanji: '何', meaning: 'cái gì', difficulty: 'easy', category: 'Questions', lesson: 'Bài 7', section: 'conversation' },
  { id: '34', hiragana: 'どう', kanji: '', meaning: 'như thế nào', difficulty: 'easy', category: 'Questions', lesson: 'Bài 7', section: 'conversation' },
  { id: '35', hiragana: 'どこ', kanji: '', meaning: 'ở đâu, chỗ nào', difficulty: 'easy', category: 'Questions', lesson: 'Bài 7', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '36', hiragana: 'きのう', kanji: '昨日', meaning: 'hôm qua', difficulty: 'easy', category: 'Time', lesson: 'Bài 7', section: 'reading' },
  { id: '37', hiragana: 'きょう', kanji: '今日', meaning: 'hôm nay', difficulty: 'easy', category: 'Time', lesson: 'Bài 7', section: 'reading' },
  { id: '38', hiragana: 'あした', kanji: '明日', meaning: 'ngày mai', difficulty: 'easy', category: 'Time', lesson: 'Bài 7', section: 'reading' },
  { id: '39', hiragana: 'せんしゅう', kanji: '先週', meaning: 'tuần trước', difficulty: 'easy', category: 'Time', lesson: 'Bài 7', section: 'reading' },
  { id: '40', hiragana: 'こんしゅう', kanji: '今週', meaning: 'tuần này', difficulty: 'easy', category: 'Time', lesson: 'Bài 7', section: 'reading' }
];
