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

export const lesson39Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'こたえます II', kanji: '答えます', meaning: 'trả lời [câu hỏi]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 39', section: 'main' },
  { id: '2', hiragana: 'たおれます II', kanji: '倒れます', meaning: 'đổ [nhà ~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 39', section: 'main' },
  { id: '3', hiragana: 'ビル', kanji: '', meaning: 'tòa nhà', difficulty: 'medium', category: 'Buildings', lesson: 'Bài 39', section: 'main' },
  { id: '4', hiragana: 'とおります I', kanji: '通ります', meaning: 'đi (xuyên qua) [đường]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 39', section: 'main' },
  { id: '5', hiragana: 'しにます I', kanji: '死にます', meaning: 'chết', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 39', section: 'main' },
  { id: '6', hiragana: 'びっくりします III', kanji: '', meaning: 'giật mình', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 39', section: 'main' },
  { id: '7', hiragana: 'がっかりします III', kanji: '', meaning: 'thất vọng', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 39', section: 'main' },
  { id: '8', hiragana: 'あんしんします III', kanji: '安心します', meaning: 'yên tâm', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 39', section: 'main' },
  { id: '9', hiragana: 'けんかします III', kanji: '喧嘩します', meaning: 'cãi nhau', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 39', section: 'main' },
  { id: '10', hiragana: 'りこんします III', kanji: '離婚します', meaning: 'ly hôn', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 39', section: 'main' },
  { id: '11', hiragana: 'ふとります II', kanji: '太ります', meaning: 'béo ra', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 39', section: 'main' },
  { id: '12', hiragana: 'やせます II', kanji: '痩せます', meaning: 'gầy đi', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 39', section: 'main' },
  { id: '13', hiragana: 'ふくざつ', kanji: '複雑', meaning: 'phức tạp', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 39', section: 'main' },
  { id: '14', hiragana: 'じゃま', kanji: '邪魔', meaning: 'vướng, vướng víu', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 39', section: 'main' },
  { id: '15', hiragana: 'かたい', kanji: '硬い', meaning: 'cứng', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 39', section: 'main' },
  { id: '16', hiragana: 'やわらかい', kanji: '柔らかい', meaning: 'mềm', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 39', section: 'main' },
  { id: '17', hiragana: 'きたない', kanji: '汚い', meaning: 'bẩn', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 39', section: 'main' },
  { id: '18', hiragana: 'うれしい', kanji: '', meaning: 'vui', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 39', section: 'main' },
  { id: '19', hiragana: 'かなしい', kanji: '', meaning: 'buồn', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 39', section: 'main' },
  { id: '20', hiragana: 'くやしい', kanji: '', meaning: 'xấu hổ, ngượng', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 39', section: 'main' },
  { id: '21', hiragana: 'しゅしょう', kanji: '首相', meaning: 'thủ tướng', difficulty: 'hard', category: 'Professions', lesson: 'Bài 39', section: 'main' },
  { id: '22', hiragana: 'じしん', kanji: '地震', meaning: 'động đất', difficulty: 'medium', category: 'Disasters', lesson: 'Bài 39', section: 'main' },
  { id: '23', hiragana: 'つなみ', kanji: '津波', meaning: 'sóng thần', difficulty: 'hard', category: 'Disasters', lesson: 'Bài 39', section: 'main' },
  { id: '24', hiragana: 'たいふう', kanji: '台風', meaning: 'bão', difficulty: 'medium', category: 'Disasters', lesson: 'Bài 39', section: 'main' },
  { id: '25', hiragana: 'かみなり', kanji: '雷', meaning: 'sấm', difficulty: 'medium', category: 'Disasters', lesson: 'Bài 39', section: 'main' },
  { id: '26', hiragana: 'かじ', kanji: '火事', meaning: 'hỏa hoạn', difficulty: 'medium', category: 'Disasters', lesson: 'Bài 39', section: 'main' },
  { id: '27', hiragana: 'じこ', kanji: '事故', meaning: 'tai nạn, sự cố', difficulty: 'medium', category: 'Accidents', lesson: 'Bài 39', section: 'main' },
  { id: '28', hiragana: 'ハイキング', kanji: '', meaning: 'dã ngoại', difficulty: 'medium', category: 'Activities', lesson: 'Bài 39', section: 'main' },
  { id: '29', hiragana: 'おみあい', kanji: 'お見合い', meaning: 'xem mặt (để kết hôn)', difficulty: 'hard', category: 'Activities', lesson: 'Bài 39', section: 'main' },
  { id: '30', hiragana: 'そうさ', kanji: '操作', meaning: 'thao tác [~: thao tác]', difficulty: 'hard', category: 'Actions', lesson: 'Bài 39', section: 'main' },
  { id: '31', hiragana: 'かいじょう', kanji: '会場', meaning: 'hội trường', difficulty: 'medium', category: 'Places', lesson: 'Bài 39', section: 'main' },
  { id: '32', hiragana: '～だい', kanji: '～代', meaning: 'phí ~, tiền ~', difficulty: 'medium', category: 'Suffixes', lesson: 'Bài 39', section: 'main' },
  { id: '33', hiragana: '～や', kanji: '～屋', meaning: 'người bán ~', difficulty: 'medium', category: 'Suffixes', lesson: 'Bài 39', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '34', hiragana: 'フロント', kanji: '', meaning: 'lễ tân', difficulty: 'medium', category: 'Professions', lesson: 'Bài 39', section: 'conversation' },
  { id: '35', hiragana: '～ごうしつ', kanji: '～号室', meaning: 'số phòng ~', difficulty: 'hard', category: 'Rooms', lesson: 'Bài 39', section: 'conversation' },
  { id: '36', hiragana: 'タオル', kanji: '', meaning: 'khăn tắm', difficulty: 'medium', category: 'Objects', lesson: 'Bài 39', section: 'conversation' },
  { id: '37', hiragana: 'せっけん', kanji: '', meaning: 'xà phòng', difficulty: 'medium', category: 'Objects', lesson: 'Bài 39', section: 'conversation' },
  { id: '38', hiragana: 'おおぜい', kanji: '大勢', meaning: 'nhiều (người)', difficulty: 'medium', category: 'Quantity', lesson: 'Bài 39', section: 'conversation' },
  { id: '39', hiragana: 'おつかれさまでした', kanji: 'お疲れ様でした', meaning: 'Anh/Chị đã vất vả quá. (lời động viên dành cho đồng nghiệp hoặc người dưới)', difficulty: 'hard', category: 'Expressions', lesson: 'Bài 39', section: 'conversation' },
  { id: '40', hiragana: 'うかがいます I', kanji: '伺います', meaning: 'Tôi đi đến chỗ anh/chị ạ. (khiêm nhường ngữ của いきます)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 39', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '41', hiragana: 'おとな', kanji: '大人', meaning: 'người lớn', difficulty: 'medium', category: 'People', lesson: 'Bài 39', section: 'reading' },
  { id: '42', hiragana: 'しかし', kanji: '', meaning: 'nhưng', difficulty: 'medium', category: 'Conjunctions', lesson: 'Bài 39', section: 'reading' },
  { id: '43', hiragana: 'また', kanji: '', meaning: 'hơn nữa, và', difficulty: 'medium', category: 'Conjunctions', lesson: 'Bài 39', section: 'reading' },
  { id: '44', hiragana: 'ようふく', kanji: '洋服', meaning: 'áo quần', difficulty: 'medium', category: 'Clothing', lesson: 'Bài 39', section: 'reading' },
  { id: '45', hiragana: 'せいようかします III', kanji: '西洋化します', meaning: 'Âu Mỹ hóa', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 39', section: 'reading' },
  { id: '46', hiragana: 'あいます I', kanji: '合います', meaning: 'phù hợp (với)', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 39', section: 'reading' },
  { id: '47', hiragana: 'こんや', kanji: '今夜', meaning: 'bây giờ, hiện nay', difficulty: 'medium', category: 'Time', lesson: 'Bài 39', section: 'reading' },
  { id: '48', hiragana: 'せいじん', kanji: '成人', meaning: 'lễ thành nhân', difficulty: 'hard', category: 'Events', lesson: 'Bài 39', section: 'reading' },
  { id: '49', hiragana: 'でんとうてき', kanji: '伝統的', meaning: 'mang tính truyền thống', difficulty: 'hard', category: 'Adjectives', lesson: 'Bài 39', section: 'reading' },
  { id: '50', hiragana: 'たのしい', kanji: '', meaning: 'vui vẻ', difficulty: 'medium', category: 'Feelings', lesson: 'Bài 39', section: 'reading' },
  { id: '51', hiragana: 'さびしい', kanji: '', meaning: 'buồn, cô đơn', difficulty: 'medium', category: 'Feelings', lesson: 'Bài 39', section: 'reading' },
  { id: '52', hiragana: 'おもしろい', kanji: '', meaning: 'thú vị', difficulty: 'medium', category: 'Feelings', lesson: 'Bài 39', section: 'reading' },
  { id: '53', hiragana: 'うらやましい', kanji: '', meaning: 'đáng ghen tị', difficulty: 'hard', category: 'Feelings', lesson: 'Bài 39', section: 'reading' },
  { id: '54', hiragana: 'はずかしい', kanji: '', meaning: 'xấu hổ', difficulty: 'medium', category: 'Feelings', lesson: 'Bài 39', section: 'reading' },
  { id: '55', hiragana: 'なつかしい', kanji: '', meaning: 'nhớ nhung, thương nhớ', difficulty: 'hard', category: 'Feelings', lesson: 'Bài 39', section: 'reading' },
  { id: '56', hiragana: 'うっとりします III', kanji: '', meaning: 'mải mê, bị hút vào', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 39', section: 'reading' },
  { id: '57', hiragana: 'いらいらします III', kanji: '', meaning: 'nóng ruột, thiếu kiên nhẫn', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 39', section: 'reading' },
  { id: '58', hiragana: 'どきどきします III', kanji: '', meaning: 'hồi hộp, run', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 39', section: 'reading' },
  { id: '59', hiragana: 'はらはらします III', kanji: '', meaning: 'lo sợ, run', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 39', section: 'reading' },
  { id: '60', hiragana: 'わくわくします III', kanji: '', meaning: 'ngóng đợi, nóng lòng', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 39', section: 'reading' }
];
