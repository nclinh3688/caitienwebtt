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

export const lesson21Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'おもいます I', kanji: '思います I', meaning: 'nghĩ', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 21', section: 'main' },
  { id: '2', hiragana: 'いいます I', kanji: '言います I', meaning: 'nói', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 21', section: 'main' },
  { id: '3', hiragana: 'かちます I', kanji: '勝ちます I', meaning: 'thắng', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 21', section: 'main' },
  { id: '4', hiragana: 'まけます II', kanji: '負けます II', meaning: 'thua', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 21', section: 'main' },
  { id: '5', hiragana: 'あります I', kanji: 'あります I', meaning: '[lễ hội] được tổ chức, diễn ra', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 21', section: 'main' },
  { id: '6', hiragana: 'おまつりが', kanji: 'お祭りが', meaning: '[lễ hội] được tổ chức, diễn ra', difficulty: 'easy', category: 'Events', lesson: 'Bài 21', section: 'main' },
  { id: '7', hiragana: 'やくにたちます I', kanji: '役に立ちます I', meaning: 'hữu ích, giúp ích', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 21', section: 'main' },
  { id: '8', hiragana: 'うごきます I', kanji: '動きます I', meaning: 'chuyển động, chạy', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 21', section: 'main' },
  { id: '9', hiragana: 'やめます II', kanji: 'やめます II', meaning: 'bỏ, thôi [việc công ty]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 21', section: 'main' },
  { id: '10', hiragana: 'きをつけます II', kanji: '気をつけます II', meaning: 'chú ý, bảo trọng', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 21', section: 'main' },
  { id: '11', hiragana: 'りゅうがくします III', kanji: '留学します III', meaning: 'du học', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 21', section: 'main' },
  { id: '12', hiragana: 'むだな', kanji: '無駄な', meaning: 'lãng phí, vô ích', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 21', section: 'main' },
  { id: '13', hiragana: 'ふべんな', kanji: '不便な', meaning: 'bất tiện', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 21', section: 'main' },
  { id: '14', hiragana: 'すごい', kanji: '', meaning: 'ghê quá, giỏi quá', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 21', section: 'main' },
  { id: '15', hiragana: 'ほんとう', kanji: '本当', meaning: 'sự thật', difficulty: 'easy', category: 'Truth', lesson: 'Bài 21', section: 'main' },
  { id: '16', hiragana: 'うそ', kanji: '嘘', meaning: 'sự giả dối, giả dối', difficulty: 'easy', category: 'Truth', lesson: 'Bài 21', section: 'main' },
  { id: '17', hiragana: 'じどうしゃ', kanji: '自動車', meaning: 'ô tô, xe hơi', difficulty: 'easy', category: 'Transport', lesson: 'Bài 21', section: 'main' },
  { id: '18', hiragana: 'こうつう', kanji: '交通', meaning: 'giao thông, đi lại', difficulty: 'easy', category: 'Transport', lesson: 'Bài 21', section: 'main' },
  { id: '19', hiragana: 'ぶっか', kanji: '物価', meaning: 'giá cả, mức giá, vật giá', difficulty: 'easy', category: 'Economy', lesson: 'Bài 21', section: 'main' },
  { id: '20', hiragana: 'ほうそう', kanji: '放送', meaning: 'phát, phát thanh', difficulty: 'easy', category: 'Media', lesson: 'Bài 21', section: 'main' },
  { id: '21', hiragana: 'ニュース', kanji: '', meaning: 'tin tức, bản tin', difficulty: 'easy', category: 'Media', lesson: 'Bài 21', section: 'main' },
  { id: '22', hiragana: 'アニメ', kanji: '', meaning: 'phim hoạt hình (Nhật Bản)', difficulty: 'easy', category: 'Media', lesson: 'Bài 21', section: 'main' },
  { id: '23', hiragana: 'マンガ', kanji: '', meaning: 'truyện tranh', difficulty: 'easy', category: 'Media', lesson: 'Bài 21', section: 'main' },
  { id: '24', hiragana: 'デザイン', kanji: '', meaning: 'thiết kế', difficulty: 'easy', category: 'Art', lesson: 'Bài 21', section: 'main' },
  { id: '25', hiragana: 'ゆめ', kanji: '夢', meaning: 'giấc mơ', difficulty: 'easy', category: 'Dreams', lesson: 'Bài 21', section: 'main' },
  { id: '26', hiragana: 'てんさい', kanji: '天才', meaning: 'thiên tài', difficulty: 'easy', category: 'People', lesson: 'Bài 21', section: 'main' },
  { id: '27', hiragana: 'しあい', kanji: '試合', meaning: 'trận đấu', difficulty: 'easy', category: 'Sports', lesson: 'Bài 21', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '28', hiragana: 'いけん', kanji: '意見', meaning: 'ý kiến', difficulty: 'easy', category: 'Communication', lesson: 'Bài 21', section: 'conversation' },
  { id: '29', hiragana: 'はなし', kanji: '話', meaning: 'câu chuyện, bài nói chuyện', difficulty: 'easy', category: 'Communication', lesson: 'Bài 21', section: 'conversation' },
  { id: '30', hiragana: 'ちきゅう', kanji: '地球', meaning: 'trái đất', difficulty: 'easy', category: 'Geography', lesson: 'Bài 21', section: 'conversation' },
  { id: '31', hiragana: 'つき', kanji: '月', meaning: 'mặt trăng, trăng', difficulty: 'easy', category: 'Geography', lesson: 'Bài 21', section: 'conversation' },
  { id: '32', hiragana: 'さいきん', kanji: '最近', meaning: 'gần đây', difficulty: 'easy', category: 'Time', lesson: 'Bài 21', section: 'conversation' },
  { id: '33', hiragana: 'たぶん', kanji: '多分', meaning: 'chắc, có thể', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 21', section: 'conversation' },
  { id: '34', hiragana: 'きっと', kanji: '', meaning: 'chắc chắn, nhất định', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 21', section: 'conversation' },
  { id: '35', hiragana: 'ほんとうに', kanji: '本当に', meaning: 'thật sự', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 21', section: 'conversation' },
  { id: '36', hiragana: 'そんなに', kanji: '', meaning: '(không) ~ lắm', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 21', section: 'conversation' },
  { id: '37', hiragana: 'について', kanji: '', meaning: 'về ~', difficulty: 'easy', category: 'Grammar', lesson: 'Bài 21', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '38', hiragana: 'くに', kanji: '国', meaning: 'nhà nước, chính phủ', difficulty: 'easy', category: 'Politics', lesson: 'Bài 21', section: 'reading' },
  { id: '39', hiragana: 'しゅと', kanji: '首都', meaning: 'tỉnh, thành phố', difficulty: 'easy', category: 'Politics', lesson: 'Bài 21', section: 'reading' },
  { id: '40', hiragana: 'し', kanji: '市', meaning: 'thành phố (trong tỉnh)', difficulty: 'easy', category: 'Politics', lesson: 'Bài 21', section: 'reading' },
  { id: '41', hiragana: 'まち', kanji: '町', meaning: 'khu phố', difficulty: 'easy', category: 'Politics', lesson: 'Bài 21', section: 'reading' },
  { id: '42', hiragana: 'むら', kanji: '村', meaning: 'thôn', difficulty: 'easy', category: 'Politics', lesson: 'Bài 21', section: 'reading' },
  { id: '43', hiragana: 'しゅしょう', kanji: '首相', meaning: '(Nội các) thủ tướng', difficulty: 'easy', category: 'Politics', lesson: 'Bài 21', section: 'reading' },
  { id: '44', hiragana: 'ちじ', kanji: '知事', meaning: 'tỉnh trưởng, thị trưởng', difficulty: 'easy', category: 'Politics', lesson: 'Bài 21', section: 'reading' },
  { id: '45', hiragana: 'しちょう', kanji: '市長', meaning: 'thị trưởng', difficulty: 'easy', category: 'Politics', lesson: 'Bài 21', section: 'reading' },
  { id: '46', hiragana: 'ちょうちょう', kanji: '町長', meaning: 'trưởng khu phố', difficulty: 'easy', category: 'Politics', lesson: 'Bài 21', section: 'reading' },
  { id: '47', hiragana: 'そんちょう', kanji: '村長', meaning: 'trưởng thôn', difficulty: 'easy', category: 'Politics', lesson: 'Bài 21', section: 'reading' },
  { id: '48', hiragana: 'だいがく', kanji: '大学', meaning: 'đại học', difficulty: 'easy', category: 'Education', lesson: 'Bài 21', section: 'reading' },
  { id: '49', hiragana: 'こうとうがっこう', kanji: '高等学校', meaning: 'trung học phổ thông', difficulty: 'easy', category: 'Education', lesson: 'Bài 21', section: 'reading' },
  { id: '50', hiragana: 'ちゅうがっこう', kanji: '中学校', meaning: 'trung học cơ sở', difficulty: 'easy', category: 'Education', lesson: 'Bài 21', section: 'reading' },
  { id: '51', hiragana: 'しょうがっこう', kanji: '小学校', meaning: 'tiểu học', difficulty: 'easy', category: 'Education', lesson: 'Bài 21', section: 'reading' },
  { id: '52', hiragana: 'ようちえん', kanji: '幼稚園', meaning: 'mẫu giáo', difficulty: 'easy', category: 'Education', lesson: 'Bài 21', section: 'reading' },
  { id: '53', hiragana: 'がくちょう', kanji: '学長', meaning: 'hiệu trưởng', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' },
  { id: '54', hiragana: 'こうちょう', kanji: '校長', meaning: 'hiệu trưởng', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' },
  { id: '55', hiragana: 'えんちょう', kanji: '園長', meaning: 'hiệu trưởng', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' },
  { id: '56', hiragana: 'かいしゃ', kanji: '会社', meaning: 'công ty', difficulty: 'easy', category: 'Business', lesson: 'Bài 21', section: 'reading' },
  { id: '57', hiragana: 'ぎんこう', kanji: '銀行', meaning: 'ngân hàng', difficulty: 'easy', category: 'Business', lesson: 'Bài 21', section: 'reading' },
  { id: '58', hiragana: 'かいちょう', kanji: '会長', meaning: 'chủ tịch', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' },
  { id: '59', hiragana: 'しゃちょう', kanji: '社長', meaning: 'giám đốc điều hành', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' },
  { id: '60', hiragana: 'せんむ', kanji: '専務', meaning: 'thành viên ban quản trị', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' },
  { id: '61', hiragana: 'ぶちょう', kanji: '部長', meaning: 'trưởng phòng', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' },
  { id: '62', hiragana: 'かちょう', kanji: '課長', meaning: 'tổ trưởng', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' },
  { id: '63', hiragana: 'とうどり', kanji: '頭取', meaning: 'giám đốc', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' },
  { id: '64', hiragana: 'してんちょう', kanji: '支店長', meaning: 'giám đốc chi nhánh', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' },
  { id: '65', hiragana: 'えき', kanji: '駅', meaning: 'nhà ga', difficulty: 'easy', category: 'Transport', lesson: 'Bài 21', section: 'reading' },
  { id: '66', hiragana: 'えきちょう', kanji: '駅長', meaning: 'trưởng ga', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' },
  { id: '67', hiragana: 'びょういん', kanji: '病院', meaning: 'bệnh viện', difficulty: 'easy', category: 'Health', lesson: 'Bài 21', section: 'reading' },
  { id: '68', hiragana: 'いちょう', kanji: '医長', meaning: 'giám đốc bệnh viện', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' },
  { id: '69', hiragana: 'ぶちょう', kanji: '部長', meaning: 'trưởng phòng, trưởng khoa', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' },
  { id: '70', hiragana: 'かんごしちょう', kanji: '看護師長', meaning: 'y tá', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' },
  { id: '71', hiragana: 'けいさつ', kanji: '警察', meaning: 'cảnh sát', difficulty: 'easy', category: 'Law', lesson: 'Bài 21', section: 'reading' },
  { id: '72', hiragana: 'しょちょう', kanji: '署長', meaning: 'cảnh sát trưởng, trưởng đồn', difficulty: 'easy', category: 'Positions', lesson: 'Bài 21', section: 'reading' }
];
