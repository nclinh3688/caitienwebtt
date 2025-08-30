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

export const lesson30Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'はります I', kanji: '張ります', meaning: 'dán', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'main' },
  { id: '2', hiragana: 'かけます II', kanji: '掛けます', meaning: 'treo', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'main' },
  { id: '3', hiragana: 'かざります I', kanji: '飾ります', meaning: 'trang trí', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'main' },
  { id: '4', hiragana: 'ならべます II', kanji: '並べます', meaning: 'xếp hàng', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'main' },
  { id: '5', hiragana: 'うえます II', kanji: '植えます', meaning: 'trồng', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'main' },
  { id: '6', hiragana: 'もどします I', kanji: '戻します', meaning: 'để lại', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'main' },
  { id: '7', hiragana: 'まとめます II', kanji: 'まとめます', meaning: 'thu dọn [hành lý]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'main' },
  { id: '8', hiragana: 'かたづけます II', kanji: '片づけます', meaning: 'cất', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'main' },
  { id: '9', hiragana: 'きめます II', kanji: '決めます', meaning: 'quyết định', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'main' },
  { id: '10', hiragana: 'よしゅうします III', kanji: '予習します', meaning: 'chuẩn bị bài', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'main' },
  { id: '11', hiragana: 'ふくしゅうします III', kanji: '復習します', meaning: 'ôn tập', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'main' },
  { id: '12', hiragana: 'そのままにします III', kanji: 'そのままにします', meaning: 'để nguyên như thế', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'main' },
  { id: '13', hiragana: 'じゅぎょう', kanji: '授業', meaning: 'giờ học', difficulty: 'medium', category: 'Education', lesson: 'Bài 30', section: 'main' },
  { id: '14', hiragana: 'こうぎ', kanji: '講義', meaning: 'bài giảng', difficulty: 'medium', category: 'Education', lesson: 'Bài 30', section: 'main' },
  { id: '15', hiragana: 'ミーティング', kanji: '', meaning: 'cuộc họp', difficulty: 'medium', category: 'Business', lesson: 'Bài 30', section: 'main' },
  { id: '16', hiragana: 'よてい', kanji: '予定', meaning: 'dự định, kế hoạch', difficulty: 'medium', category: 'Planning', lesson: 'Bài 30', section: 'main' },
  { id: '17', hiragana: 'おしらせ', kanji: 'お知らせ', meaning: 'thông báo', difficulty: 'medium', category: 'Communication', lesson: 'Bài 30', section: 'main' },
  { id: '18', hiragana: 'ガイドブック', kanji: '', meaning: 'sách hướng dẫn du lịch', difficulty: 'medium', category: 'Books', lesson: 'Bài 30', section: 'main' },
  { id: '19', hiragana: 'カレンダー', kanji: '', meaning: 'lịch', difficulty: 'medium', category: 'Objects', lesson: 'Bài 30', section: 'main' },
  { id: '20', hiragana: 'ポスター', kanji: '', meaning: 'poster', difficulty: 'medium', category: 'Objects', lesson: 'Bài 30', section: 'main' },
  { id: '21', hiragana: 'よていひょう', kanji: '予定表', meaning: 'lịch làm việc', difficulty: 'medium', category: 'Objects', lesson: 'Bài 30', section: 'main' },
  { id: '22', hiragana: 'ごみばこ', kanji: 'ごみばこ', meaning: 'thùng rác', difficulty: 'medium', category: 'Objects', lesson: 'Bài 30', section: 'main' },
  { id: '23', hiragana: 'にんぎょう', kanji: '人形', meaning: 'búp bê', difficulty: 'medium', category: 'Objects', lesson: 'Bài 30', section: 'main' },
  { id: '24', hiragana: 'かびん', kanji: '花瓶', meaning: 'bình hoa, lọ hoa', difficulty: 'medium', category: 'Objects', lesson: 'Bài 30', section: 'main' },
  { id: '25', hiragana: 'かがみ', kanji: '鏡', meaning: 'gương', difficulty: 'medium', category: 'Objects', lesson: 'Bài 30', section: 'main' },
  { id: '26', hiragana: 'ひきだし', kanji: '引き出し', meaning: 'ngăn kéo', difficulty: 'medium', category: 'Objects', lesson: 'Bài 30', section: 'main' },
  { id: '27', hiragana: 'げんかん', kanji: '玄関', meaning: 'lối vào nhà, sảnh vào nhà', difficulty: 'medium', category: 'Places', lesson: 'Bài 30', section: 'main' },
  { id: '28', hiragana: 'ろうか', kanji: '廊下', meaning: 'hành lang', difficulty: 'medium', category: 'Places', lesson: 'Bài 30', section: 'main' },
  { id: '29', hiragana: 'かべ', kanji: '壁', meaning: 'tường', difficulty: 'medium', category: 'Places', lesson: 'Bài 30', section: 'main' },
  { id: '30', hiragana: 'いけ', kanji: '池', meaning: 'ao, hồ', difficulty: 'medium', category: 'Nature', lesson: 'Bài 30', section: 'main' },
  { id: '31', hiragana: 'もとのところ', kanji: '元の所', meaning: 'chỗ cũ', difficulty: 'medium', category: 'Places', lesson: 'Bài 30', section: 'main' },
  { id: '32', hiragana: 'まわり', kanji: '周り', meaning: 'xung quanh', difficulty: 'medium', category: 'Location', lesson: 'Bài 30', section: 'main' },
  { id: '33', hiragana: 'まんなか', kanji: '真ん中', meaning: 'ở giữa', difficulty: 'medium', category: 'Location', lesson: 'Bài 30', section: 'main' },
  { id: '34', hiragana: 'まだ', kanji: '', meaning: 'vẫn', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 30', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '35', hiragana: 'ばしょ', kanji: '場所', meaning: 'ba lô', difficulty: 'medium', category: 'Objects', lesson: 'Bài 30', section: 'conversation' },
  { id: '36', hiragana: 'リュック', kanji: '', meaning: 'túi (đựng vật dụng trong trường hợp) khẩn cấp', difficulty: 'medium', category: 'Objects', lesson: 'Bài 30', section: 'conversation' },
  { id: '37', hiragana: 'ひじょうじ', kanji: '非常時', meaning: 'trường hợp khẩn cấp, lúc khẩn cấp', difficulty: 'medium', category: 'Situations', lesson: 'Bài 30', section: 'conversation' },
  { id: '38', hiragana: 'せいかつします III', kanji: '生活します', meaning: 'sinh hoạt, sống', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'conversation' },
  { id: '39', hiragana: 'でんちゅう', kanji: '電柱', meaning: 'đèn pin', difficulty: 'medium', category: 'Objects', lesson: 'Bài 30', section: 'conversation' },
  { id: '40', hiragana: '～とか～', kanji: '', meaning: 'như (là) ~, như (là) ~', difficulty: 'medium', category: 'Particles', lesson: 'Bài 30', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '41', hiragana: 'まるい', kanji: '丸い', meaning: 'tròn', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 30', section: 'reading' },
  { id: '42', hiragana: '～ほどう', kanji: '', meaning: '~mở', difficulty: 'medium', category: 'Suffixes', lesson: 'Bài 30', section: 'reading' },
  { id: '43', hiragana: 'ゆめをみます II', kanji: '夢を見ます', meaning: 'mơ', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'reading' },
  { id: '44', hiragana: 'うれしい', kanji: '', meaning: 'vui', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 30', section: 'reading' },
  { id: '45', hiragana: 'きらい', kanji: '嫌い', meaning: 'ghét, không thích', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 30', section: 'reading' },
  { id: '46', hiragana: '～と', kanji: '', meaning: 'khi đó', difficulty: 'medium', category: 'Particles', lesson: 'Bài 30', section: 'reading' },
  { id: '47', hiragana: 'めをさます I', kanji: '目を覚ます', meaning: 'thức giấc, tỉnh giấc', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'reading' },

  // Trường hợp khẩn cấp (非常時)
  { id: '48', hiragana: 'じしん', kanji: '地震', meaning: 'trường hợp có động đất', difficulty: 'hard', category: 'Disasters', lesson: 'Bài 30', section: 'reading' },
  { id: '49', hiragana: 'じゅんび', kanji: '準備', meaning: 'việc chuẩn bị là quan trọng', difficulty: 'medium', category: 'Preparation', lesson: 'Bài 30', section: 'reading' },
  { id: '50', hiragana: 'こていします III', kanji: '固定します', meaning: 'cố định đồ dùng nói thật không di chuyển', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 30', section: 'reading' },
  { id: '51', hiragana: 'しょうかき', kanji: '消火器', meaning: 'bình cứu hỏa và dự trữ nước', difficulty: 'hard', category: 'Equipment', lesson: 'Bài 30', section: 'reading' },
  { id: '52', hiragana: 'ひじょうぶくろ', kanji: '非常袋', meaning: 'chuẩn bị túi đựng đồ dùng cần thiết trong trường hợp khẩn cấp', difficulty: 'hard', category: 'Equipment', lesson: 'Bài 30', section: 'reading' },
  { id: '53', hiragana: 'ちいき', kanji: '地域', meaning: 'xác nhận nơi lánh nạn ở khu vực mình sống', difficulty: 'medium', category: 'Places', lesson: 'Bài 30', section: 'reading' },
  { id: '54', hiragana: 'かぞく', kanji: '家族', meaning: 'hỏi người thân', difficulty: 'medium', category: 'Family', lesson: 'Bài 30', section: 'reading' },
  { id: '55', hiragana: 'じしんがおきたばあい', kanji: '地震が起きた場合', meaning: 'trường hợp động đất xảy ra', difficulty: 'hard', category: 'Situations', lesson: 'Bài 30', section: 'reading' },
  { id: '56', hiragana: '～こわれます II', kanji: '～壊れます', meaning: 'chui xuống gầm bàn', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'reading' },
  { id: '57', hiragana: 'きゅうかさい', kanji: '急火災', meaning: 'phát hiện lửa cháy từ các chỗ cũ', difficulty: 'hard', category: 'Disasters', lesson: 'Bài 30', section: 'reading' },
  { id: '58', hiragana: 'おと', kanji: '音', meaning: 'mở cửa để giữ lối thoát', difficulty: 'medium', category: 'Objects', lesson: 'Bài 30', section: 'reading' },
  { id: '59', hiragana: 'そとへでない', kanji: '外へ出ない', meaning: 'không hoảng hốt hoặc chạy ra ngoài', difficulty: 'medium', category: 'Instructions', lesson: 'Bài 30', section: 'reading' },
  { id: '60', hiragana: 'ごみしゅうしゅう', kanji: 'ごみ収集', meaning: 'khi hết động đất', difficulty: 'medium', category: 'Services', lesson: 'Bài 30', section: 'reading' },
  { id: '61', hiragana: 'せいかく', kanji: '正確', meaning: 'nghe thông tin chính xác', difficulty: 'medium', category: 'Quality', lesson: 'Bài 30', section: 'reading' },
  { id: '62', hiragana: 'つなみ', kanji: '津波', meaning: 'sóng thần, động đất, và nước nhận được', difficulty: 'hard', category: 'Disasters', lesson: 'Bài 30', section: 'reading' },
  { id: '63', hiragana: 'にげます II', kanji: '逃げます', meaning: 'chạy', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 30', section: 'reading' },
  { id: '64', hiragana: 'じしんがおきると', kanji: '地震が起きると', meaning: 'khi có động đất', difficulty: 'hard', category: 'Situations', lesson: 'Bài 30', section: 'reading' },
  { id: '65', hiragana: 'きんじょ', kanji: '近所', meaning: 'kiểm tra quanh nhà', difficulty: 'medium', category: 'Places', lesson: 'Bài 30', section: 'reading' },
  { id: '66', hiragana: 'ちゅうじゅんび', kanji: '充電準備', meaning: 'chuẩn bị pin của đèn pin', difficulty: 'hard', category: 'Preparation', lesson: 'Bài 30', section: 'reading' },
  { id: '67', hiragana: 'すいじょう', kanji: '水上', meaning: 'nước uống và thực phẩm', difficulty: 'hard', category: 'Objects', lesson: 'Bài 30', section: 'reading' }
];
