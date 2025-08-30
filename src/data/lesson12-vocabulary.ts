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

export const lesson12Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'かんたん', kanji: '簡単', meaning: 'đơn giản, dễ', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 12', section: 'main' },
  { id: '2', hiragana: 'ちかい', kanji: '近い', meaning: 'gần', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 12', section: 'main' },
  { id: '3', hiragana: 'とおい', kanji: '遠い', meaning: 'xa', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 12', section: 'main' },
  { id: '4', hiragana: 'はやい', kanji: '早い', meaning: 'nhanh, sớm', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 12', section: 'main' },
  { id: '5', hiragana: 'おそい', kanji: '遅い', meaning: 'chậm, muộn', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 12', section: 'main' },
  { id: '6', hiragana: 'おおい', kanji: '多い', meaning: 'nhiều [người]', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 12', section: 'main' },
  { id: '7', hiragana: 'すくない', kanji: '少ない', meaning: 'ít [người]', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 12', section: 'main' },
  { id: '8', hiragana: 'あたたかい', kanji: '暖かい', meaning: 'ấm', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 12', section: 'main' },
  { id: '9', hiragana: 'すずしい', kanji: '涼しい', meaning: 'mát', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 12', section: 'main' },
  { id: '10', hiragana: 'あまい', kanji: '甘い', meaning: 'ngọt', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 12', section: 'main' },
  { id: '11', hiragana: 'からい', kanji: '辛い', meaning: 'cay', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 12', section: 'main' },
  { id: '12', hiragana: 'おもい', kanji: '重い', meaning: 'nặng', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 12', section: 'main' },
  { id: '13', hiragana: 'かるい', kanji: '軽い', meaning: 'nhẹ', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 12', section: 'main' },
  { id: '14', hiragana: 'いい', kanji: '', meaning: 'thích, chọn, dùng [cà phê]', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 12', section: 'main' },
  { id: '15', hiragana: 'きせつ', kanji: '季節', meaning: 'mùa', difficulty: 'easy', category: 'Nature', lesson: 'Bài 12', section: 'main' },
  { id: '16', hiragana: 'はる', kanji: '春', meaning: 'mùa xuân', difficulty: 'easy', category: 'Seasons', lesson: 'Bài 12', section: 'main' },
  { id: '17', hiragana: 'なつ', kanji: '夏', meaning: 'mùa hè', difficulty: 'easy', category: 'Seasons', lesson: 'Bài 12', section: 'main' },
  { id: '18', hiragana: 'あき', kanji: '秋', meaning: 'mùa thu', difficulty: 'easy', category: 'Seasons', lesson: 'Bài 12', section: 'main' },
  { id: '19', hiragana: 'ふゆ', kanji: '冬', meaning: 'mùa đông', difficulty: 'easy', category: 'Seasons', lesson: 'Bài 12', section: 'main' },
  { id: '20', hiragana: 'てんき', kanji: '天気', meaning: 'thời tiết', difficulty: 'easy', category: 'Weather', lesson: 'Bài 12', section: 'main' },
  { id: '21', hiragana: 'あめ', kanji: '雨', meaning: 'mưa', difficulty: 'easy', category: 'Weather', lesson: 'Bài 12', section: 'main' },
  { id: '22', hiragana: 'ゆき', kanji: '雪', meaning: 'tuyết', difficulty: 'easy', category: 'Weather', lesson: 'Bài 12', section: 'main' },
  { id: '23', hiragana: 'くもり', kanji: '曇り', meaning: 'có mây', difficulty: 'easy', category: 'Weather', lesson: 'Bài 12', section: 'main' },
  { id: '24', hiragana: 'ホテル', kanji: '', meaning: 'khách sạn', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'main' },
  { id: '25', hiragana: 'くうこう', kanji: '空港', meaning: 'sân bay', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'main' },
  { id: '26', hiragana: 'うみ', kanji: '海', meaning: 'biển, đại dương', difficulty: 'easy', category: 'Nature', lesson: 'Bài 12', section: 'main' },
  { id: '27', hiragana: 'せかい', kanji: '世界', meaning: 'thế giới', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'main' },
  { id: '28', hiragana: 'パーティー', kanji: '', meaning: 'tiệc', difficulty: 'easy', category: 'Events', lesson: 'Bài 12', section: 'main' },
  { id: '29', hiragana: 'まつり', kanji: '祭り', meaning: 'lễ hội', difficulty: 'easy', category: 'Events', lesson: 'Bài 12', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '30', hiragana: 'ただいま', kanji: '', meaning: 'Tôi đã về đây', difficulty: 'easy', category: 'Greetings', lesson: 'Bài 12', section: 'conversation' },
  { id: '31', hiragana: 'おかえりなさい', kanji: 'お帰りなさい', meaning: 'Anh/Chị đã về đấy à', difficulty: 'easy', category: 'Greetings', lesson: 'Bài 12', section: 'conversation' },
  { id: '32', hiragana: 'すごいひと', kanji: 'すごい人', meaning: 'Ồi, đông quá nhỉ!', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 12', section: 'conversation' },
  { id: '33', hiragana: 'つかれました', kanji: '疲れました', meaning: 'Tôi mệt rồi', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 12', section: 'conversation' },
  { id: '34', hiragana: 'ぎおんまつり', kanji: '祇園祭', meaning: 'Lễ hội Gion', difficulty: 'easy', category: 'Events', lesson: 'Bài 12', section: 'conversation' },
  { id: '35', hiragana: 'ホンコン', kanji: '', meaning: 'Hồng Kông', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'conversation' },
  { id: '36', hiragana: 'シンガポール', kanji: '', meaning: 'Singapore', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'conversation' },
  { id: '37', hiragana: 'ABCストア', kanji: '', meaning: 'tên siêu thị gia đình', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'conversation' },
  { id: '38', hiragana: 'ジャパン', kanji: '', meaning: 'tên siêu thị gia đình', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '39', hiragana: 'きんかくじ', kanji: '金閣寺', meaning: 'Chùa Kinkaku-ji (Chùa Vàng)', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'reading' },
  { id: '40', hiragana: 'ふじさん', kanji: '富士山', meaning: 'Núi Phú Sĩ', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'reading' },
  { id: '41', hiragana: 'ひめじじょう', kanji: '姫路城', meaning: 'Lâu đài Himeji', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'reading' },
  { id: '42', hiragana: 'げんばくドーム', kanji: '原爆ドーム', meaning: 'Vòm Bom nguyên tử Hiroshima', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'reading' },
  { id: '43', hiragana: 'とうしょうぐう', kanji: '東照宮', meaning: 'Đền Toshogu', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'reading' },
  { id: '44', hiragana: 'いせ', kanji: '伊勢', meaning: 'Ise', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'reading' },
  { id: '45', hiragana: 'おおさか', kanji: '大阪', meaning: 'Osaka', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'reading' },
  { id: '46', hiragana: 'てんじんまつり', kanji: '天神祭', meaning: 'Lễ hội Tenjin', difficulty: 'easy', category: 'Events', lesson: 'Bài 12', section: 'reading' },
  { id: '47', hiragana: 'とうだいじ', kanji: '東大寺', meaning: 'Todai-ji (Đông Đại Tự)', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'reading' },
  { id: '48', hiragana: 'だいぶつ', kanji: '大仏', meaning: 'Đại Phật', difficulty: 'easy', category: 'Places', lesson: 'Bài 12', section: 'reading' },
  { id: '49', hiragana: 'かんだまつり', kanji: '神田祭', meaning: 'Lễ hội Kanda', difficulty: 'easy', category: 'Events', lesson: 'Bài 12', section: 'reading' }
];
