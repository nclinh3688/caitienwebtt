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

export const lesson44Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'なきます I', kanji: '泣きます', meaning: 'khóc', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 44', section: 'main' },
  { id: '2', hiragana: 'わらいます I', kanji: '笑います', meaning: 'cười', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 44', section: 'main' },
  { id: '3', hiragana: 'ねむります I', kanji: '眠ります', meaning: 'ngủ', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 44', section: 'main' },
  { id: '4', hiragana: 'かわきます I', kanji: '乾きます', meaning: 'khô [áo sơ-mi ～]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 44', section: 'main' },
  { id: '5', hiragana: 'ぬれます II', kanji: '濡れます', meaning: 'ướt [áo sơ-mi ～]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 44', section: 'main' },
  { id: '6', hiragana: 'すべります II', kanji: '滑ります', meaning: 'trượt', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 44', section: 'main' },
  { id: '7', hiragana: 'おこります I', kanji: '起こります', meaning: 'xảy ra [tai nạn ～]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 44', section: 'main' },
  { id: '8', hiragana: 'ちょうせつします III', kanji: '調節します', meaning: 'điều chỉnh', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 44', section: 'main' },
  { id: '9', hiragana: 'あんぜん[な]', kanji: '安全[な]', meaning: 'an toàn', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 44', section: 'main' },
  { id: '10', hiragana: 'きけん[な]', kanji: '危険[な]', meaning: 'nguy hiểm', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 44', section: 'main' },
  { id: '11', hiragana: 'くうき', kanji: '空気', meaning: 'không khí', difficulty: 'medium', category: 'Elements', lesson: 'Bài 44', section: 'main' },
  { id: '12', hiragana: 'なみだ', kanji: '涙', meaning: 'nước mắt', difficulty: 'medium', category: 'Body', lesson: 'Bài 44', section: 'main' },
  { id: '13', hiragana: 'わしょく', kanji: '和食', meaning: 'món ăn kiểu Nhật', difficulty: 'medium', category: 'Food', lesson: 'Bài 44', section: 'main' },
  { id: '14', hiragana: 'ようしょく', kanji: '洋食', meaning: 'món ăn kiểu Tây', difficulty: 'medium', category: 'Food', lesson: 'Bài 44', section: 'main' },
  { id: '15', hiragana: 'おかず', kanji: 'おかず', meaning: 'thức ăn', difficulty: 'medium', category: 'Food', lesson: 'Bài 44', section: 'main' },
  { id: '16', hiragana: 'りょう', kanji: '量', meaning: 'lượng', difficulty: 'medium', category: 'Quantity', lesson: 'Bài 44', section: 'main' },
  { id: '17', hiragana: '～ばい', kanji: '～倍', meaning: 'gấp ～ lần', difficulty: 'medium', category: 'Suffixes', lesson: 'Bài 44', section: 'main' },
  { id: '18', hiragana: 'シングル', kanji: '', meaning: 'phòng đơn', difficulty: 'medium', category: 'Rooms', lesson: 'Bài 44', section: 'main' },
  { id: '19', hiragana: 'ツイン', kanji: '', meaning: 'phòng đôi', difficulty: 'medium', category: 'Rooms', lesson: 'Bài 44', section: 'main' },
  { id: '20', hiragana: 'せんたくもの', kanji: '洗濯物', meaning: 'áo quần giặt', difficulty: 'medium', category: 'Clothing', lesson: 'Bài 44', section: 'main' },
  { id: '21', hiragana: 'DVD', kanji: '', meaning: 'DVD', difficulty: 'medium', category: 'Media', lesson: 'Bài 44', section: 'main' },
  { id: '22', hiragana: 'ホテルひろしま', kanji: 'ホテル広島', meaning: 'tên khách sạn giả định', difficulty: 'hard', category: 'Places', lesson: 'Bài 44', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '23', hiragana: 'どうなさいますか', kanji: '', meaning: 'chị muốn làm gì?', difficulty: 'hard', category: 'Questions', lesson: 'Bài 44', section: 'conversation' },
  { id: '24', hiragana: 'カット', kanji: '', meaning: 'cắt tóc', difficulty: 'medium', category: 'Hair', lesson: 'Bài 44', section: 'conversation' },
  { id: '25', hiragana: 'シャンプー', kanji: '', meaning: 'gội đầu', difficulty: 'medium', category: 'Hair', lesson: 'Bài 44', section: 'conversation' },
  { id: '26', hiragana: 'ブロー', kanji: '', meaning: 'sấy tóc', difficulty: 'medium', category: 'Hair', lesson: 'Bài 44', section: 'conversation' },
  { id: '27', hiragana: '～みたいにしてください', kanji: '', meaning: 'anh hãy cắt như ～', difficulty: 'hard', category: 'Requests', lesson: 'Bài 44', section: 'conversation' },
  { id: '28', hiragana: 'これでよろしいでしょうか', kanji: '', meaning: 'như thế này được chưa ạ?', difficulty: 'hard', category: 'Questions', lesson: 'Bài 44', section: 'conversation' },
  { id: '29', hiragana: '[どうも]おつかれさまでした', kanji: '[どうも]お疲れ様でした', meaning: 'Xong rồi ạ, cám ơn chị. (nhân viên nói với khách hàng)', difficulty: 'hard', category: 'Expressions', lesson: 'Bài 44', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '30', hiragana: 'いやがります I', kanji: '嫌がります', meaning: 'ghét, không thích', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 44', section: 'reading' },
  { id: '31', hiragana: 'また', kanji: '', meaning: 'hơn nữa', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 44', section: 'reading' },
  { id: '32', hiragana: 'じゅんじょ', kanji: '順序', meaning: 'trình tự', difficulty: 'medium', category: 'Order', lesson: 'Bài 44', section: 'reading' },
  { id: '33', hiragana: 'あんしん[な]', kanji: '安心[な]', meaning: 'yên tâm', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 44', section: 'reading' },
  { id: '34', hiragana: 'ひょうげん', kanji: '表現', meaning: 'biểu hiện, cách nói', difficulty: 'medium', category: 'Expression', lesson: 'Bài 44', section: 'reading' },
  { id: '35', hiragana: 'たとえば', kanji: '例えば', meaning: 'ví dụ', difficulty: 'medium', category: 'Examples', lesson: 'Bài 44', section: 'reading' },
  { id: '36', hiragana: 'べつれます II', kanji: '別れます', meaning: 'chia tay', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 44', section: 'reading' },
  { id: '37', hiragana: 'これら', kanji: '', meaning: 'những thứ này', difficulty: 'medium', category: 'Pronouns', lesson: 'Bài 44', section: 'reading' },
  { id: '38', hiragana: 'えんぎがわるい', kanji: '縁起が悪い', meaning: 'xui, không may', difficulty: 'hard', category: 'Luck', lesson: 'Bài 44', section: 'reading' }
];
