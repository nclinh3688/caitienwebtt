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

export const lesson33Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'にげます II', kanji: '逃げます', meaning: 'trốn', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'main' },
  { id: '2', hiragana: 'さわぎます I', kanji: '騒ぎます', meaning: 'làm ồn', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'main' },
  { id: '3', hiragana: 'あきらめます II', kanji: '諦めます', meaning: 'từ bỏ', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'main' },
  { id: '4', hiragana: 'なげます II', kanji: '投げます', meaning: 'ném', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'main' },
  { id: '5', hiragana: 'まもります I', kanji: '守ります', meaning: 'giữ [lời hứa], tuân thủ (quy tắc)', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'main' },
  { id: '6', hiragana: 'はじめます II', kanji: '始めます', meaning: 'bắt đầu [lễ ~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'main' },
  { id: '7', hiragana: 'しゅっせきします III', kanji: '出席します', meaning: 'dự [họp]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'main' },
  { id: '8', hiragana: 'つたえます II', kanji: '伝えます', meaning: 'nói lại, truyền đạt lại', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'main' },
  { id: '9', hiragana: 'ちゅういします III', kanji: '注意します', meaning: 'chú ý [xe ô tô]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'main' },
  { id: '10', hiragana: 'はずします I', kanji: '外します', meaning: 'rời [ghế]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'main' },
  { id: '11', hiragana: 'もどします I', kanji: '戻します', meaning: 'trở lại, quay trở lại', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'main' },
  { id: '12', hiragana: 'あります', kanji: '', meaning: 'có [điện thoại]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'main' },
  { id: '13', hiragana: 'りようします III', kanji: '利用します', meaning: 'tái chế', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'main' },
  { id: '14', hiragana: 'おなじ', kanji: '同じ', meaning: 'không được', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 33', section: 'main' },
  { id: '15', hiragana: 'けいさつ', kanji: '警察', meaning: 'cảnh sát, sở cảnh sát', difficulty: 'medium', category: 'Professions', lesson: 'Bài 33', section: 'main' },
  { id: '16', hiragana: 'せき', kanji: '席', meaning: 'ghế, chỗ (ngồi)', difficulty: 'medium', category: 'Objects', lesson: 'Bài 33', section: 'main' },
  { id: '17', hiragana: 'マーク', kanji: '', meaning: 'ký hiệu', difficulty: 'medium', category: 'Objects', lesson: 'Bài 33', section: 'main' },
  { id: '18', hiragana: 'ボール', kanji: '', meaning: 'bóng', difficulty: 'medium', category: 'Objects', lesson: 'Bài 33', section: 'main' },
  { id: '19', hiragana: 'しめきり', kanji: '締め切り', meaning: 'hạn chót, hạn cuối', difficulty: 'medium', category: 'Time', lesson: 'Bài 33', section: 'main' },
  { id: '20', hiragana: 'きそく', kanji: '規則', meaning: 'quy tắc', difficulty: 'medium', category: 'Rules', lesson: 'Bài 33', section: 'main' },
  { id: '21', hiragana: 'きけん', kanji: '危険', meaning: 'nguy hiểm', difficulty: 'medium', category: 'Safety', lesson: 'Bài 33', section: 'main' },
  { id: '22', hiragana: 'しようきんし', kanji: '使用禁止', meaning: 'cấm sử dụng', difficulty: 'hard', category: 'Signs', lesson: 'Bài 33', section: 'main' },
  { id: '23', hiragana: 'たちいりきんし', kanji: '立ち入り禁止', meaning: 'cấm vào', difficulty: 'hard', category: 'Signs', lesson: 'Bài 33', section: 'main' },
  { id: '24', hiragana: 'じゅうしゃきんし', kanji: '駐車禁止', meaning: 'chạy chậm, đi chậm', difficulty: 'hard', category: 'Signs', lesson: 'Bài 33', section: 'main' },
  { id: '25', hiragana: 'いりぐち', kanji: '入り口', meaning: 'lối vào', difficulty: 'medium', category: 'Places', lesson: 'Bài 33', section: 'main' },
  { id: '26', hiragana: 'でぐち', kanji: '出口', meaning: 'lối ra', difficulty: 'medium', category: 'Places', lesson: 'Bài 33', section: 'main' },
  { id: '27', hiragana: 'ひじょうぐち', kanji: '非常口', meaning: 'cửa thoát hiểm', difficulty: 'hard', category: 'Places', lesson: 'Bài 33', section: 'main' },
  { id: '28', hiragana: 'むりょう', kanji: '無料', meaning: 'miễn phí', difficulty: 'medium', category: 'Price', lesson: 'Bài 33', section: 'main' },
  { id: '29', hiragana: 'わりびき', kanji: '割引', meaning: 'giảm giá', difficulty: 'medium', category: 'Price', lesson: 'Bài 33', section: 'main' },
  { id: '30', hiragana: 'のみほうだい', kanji: '飲み放題', meaning: 'uống thoải mái không giới hạn (uống bao nhiêu đi nữa giá tiền cũng không đổi)', difficulty: 'hard', category: 'Food', lesson: 'Bài 33', section: 'main' },
  { id: '31', hiragana: 'しようちゅう', kanji: '使用中', meaning: 'đang sử dụng', difficulty: 'hard', category: 'Status', lesson: 'Bài 33', section: 'main' },
  { id: '32', hiragana: 'ぼしゅうちゅう', kanji: '募集中', meaning: 'đang tuyển', difficulty: 'hard', category: 'Status', lesson: 'Bài 33', section: 'main' },
  { id: '33', hiragana: 'どういう～', kanji: '', meaning: 'như thế nào', difficulty: 'medium', category: 'Questions', lesson: 'Bài 33', section: 'main' },
  { id: '34', hiragana: 'いくらでも', kanji: '', meaning: '[đồ cối] bao nhiêu đi nữa', difficulty: 'medium', category: 'Quantity', lesson: 'Bài 33', section: 'main' },
  { id: '35', hiragana: 'もう', kanji: '', meaning: 'nữa (dùng với thể phủ định)', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 33', section: 'main' },
  { id: '36', hiragana: '～と～', kanji: '', meaning: 'còn ~', difficulty: 'medium', category: 'Particles', lesson: 'Bài 33', section: 'main' },
  { id: '37', hiragana: '～ほど', kanji: '', meaning: 'khoảng ~', difficulty: 'medium', category: 'Particles', lesson: 'Bài 33', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '38', hiragana: 'じしん', kanji: '地震', meaning: 'động đất', difficulty: 'medium', category: 'Disasters', lesson: 'Bài 33', section: 'conversation' },
  { id: '39', hiragana: 'おきます II', kanji: '起きます', meaning: 'xảy ra', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'conversation' },
  { id: '40', hiragana: 'たすけあいます I', kanji: '助け合います', meaning: 'giúp đỡ lẫn nhau', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'conversation' },
  { id: '41', hiragana: 'もともと', kanji: '', meaning: 'vốn là, nguyên là', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 33', section: 'conversation' },
  { id: '42', hiragana: 'かなしい', kanji: '', meaning: 'buồn', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 33', section: 'conversation' },
  { id: '43', hiragana: 'もっと', kanji: '', meaning: 'hơn', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 33', section: 'conversation' },
  { id: '44', hiragana: 'あいさつ', kanji: '', meaning: 'chào hỏi [~: chào]', difficulty: 'medium', category: 'Communication', lesson: 'Bài 33', section: 'conversation' },
  { id: '45', hiragana: 'あいて', kanji: '相手', meaning: 'đối phương', difficulty: 'medium', category: 'People', lesson: 'Bài 33', section: 'conversation' },
  { id: '46', hiragana: 'きもち', kanji: '気持ち', meaning: 'tâm trạng', difficulty: 'medium', category: 'Feelings', lesson: 'Bài 33', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '47', hiragana: 'けむり', kanji: '煙', meaning: 'khói', difficulty: 'medium', category: 'Objects', lesson: 'Bài 33', section: 'reading' },
  { id: '48', hiragana: 'じょんそく', kanji: '乗速', meaning: 'tốc độ', difficulty: 'medium', category: 'Speed', lesson: 'Bài 33', section: 'reading' },
  { id: '49', hiragana: 'ばくはつ', kanji: '爆発', meaning: 'nổ', difficulty: 'hard', category: 'Disasters', lesson: 'Bài 33', section: 'reading' },
  { id: '50', hiragana: 'しんごう', kanji: '信号', meaning: 'tín hiệu', difficulty: 'medium', category: 'Traffic', lesson: 'Bài 33', section: 'reading' },
  { id: '51', hiragana: 'はんざい', kanji: '犯罪', meaning: 'tội phạm', difficulty: 'hard', category: 'Crime', lesson: 'Bài 33', section: 'reading' },
  { id: '52', hiragana: 'れいぼう', kanji: '冷房', meaning: 'máy lạnh', difficulty: 'medium', category: 'Appliances', lesson: 'Bài 33', section: 'reading' },
  { id: '53', hiragana: 'だんぼう', kanji: '暖房', meaning: 'máy sưởi', difficulty: 'medium', category: 'Appliances', lesson: 'Bài 33', section: 'reading' },
  { id: '54', hiragana: 'じこ', kanji: '事故', meaning: 'tai nạn', difficulty: 'medium', category: 'Accidents', lesson: 'Bài 33', section: 'reading' },
  { id: '55', hiragana: 'めんどう', kanji: '面倒', meaning: 'phiền toái', difficulty: 'medium', category: 'Feelings', lesson: 'Bài 33', section: 'reading' },
  { id: '56', hiragana: 'ふくろ', kanji: '袋', meaning: 'túi', difficulty: 'medium', category: 'Objects', lesson: 'Bài 33', section: 'reading' },
  { id: '57', hiragana: 'けいかく', kanji: '計画', meaning: 'kế hoạch', difficulty: 'medium', category: 'Planning', lesson: 'Bài 33', section: 'reading' },
  { id: '58', hiragana: 'りゆう', kanji: '理由', meaning: 'lý do', difficulty: 'medium', category: 'Reasons', lesson: 'Bài 33', section: 'reading' },
  { id: '59', hiragana: 'ちゅうしゃ', kanji: '駐車', meaning: 'đỗ xe', difficulty: 'medium', category: 'Traffic', lesson: 'Bài 33', section: 'reading' },
  { id: '60', hiragana: 'ばしょ', kanji: '場所', meaning: 'chỗ', difficulty: 'medium', category: 'Places', lesson: 'Bài 33', section: 'reading' },
  { id: '61', hiragana: 'しょくじ', kanji: '食事', meaning: 'bữa ăn', difficulty: 'medium', category: 'Food', lesson: 'Bài 33', section: 'reading' },
  { id: '62', hiragana: 'とまります II', kanji: '止まります', meaning: 'dừng', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'reading' },
  { id: '63', hiragana: 'ふとります II', kanji: '太ります', meaning: 'béo', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'reading' },
  { id: '64', hiragana: 'やせます II', kanji: '痩せます', meaning: 'gầy', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'reading' },
  { id: '65', hiragana: 'にゅういんします III', kanji: '入院します', meaning: 'nhập viện', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'reading' },
  { id: '66', hiragana: 'たいいんします III', kanji: '退院します', meaning: 'xuất viện', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'reading' },
  { id: '67', hiragana: 'あらいます I', kanji: '洗います', meaning: 'rửa', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'reading' },
  { id: '68', hiragana: 'ふきます I', kanji: '拭きます', meaning: 'lau', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 33', section: 'reading' },

  // Ký hiệu (記号)
  { id: '69', hiragana: 'えいぎょうちゅう', kanji: '営業中', meaning: 'Đang mở cửa', difficulty: 'hard', category: 'Signs', lesson: 'Bài 33', section: 'reading' },
  { id: '70', hiragana: 'じゅんびちゅう', kanji: '準備中', meaning: 'Đang chuẩn bị', difficulty: 'hard', category: 'Signs', lesson: 'Bài 33', section: 'reading' },
  { id: '71', hiragana: 'へいてん', kanji: '閉店', meaning: 'Đóng cửa', difficulty: 'hard', category: 'Signs', lesson: 'Bài 33', section: 'reading' },
  { id: '72', hiragana: 'ていきゅうび', kanji: '定休日', meaning: 'Ngày nghỉ quy định', difficulty: 'hard', category: 'Signs', lesson: 'Bài 33', section: 'reading' },
  { id: '73', hiragana: 'けしょうしつ', kanji: '化粧室', meaning: 'Toa-lét', difficulty: 'hard', category: 'Signs', lesson: 'Bài 33', section: 'reading' },
  { id: '74', hiragana: 'きんえん', kanji: '禁煙', meaning: 'Ghế hút thuốc', difficulty: 'hard', category: 'Signs', lesson: 'Bài 33', section: 'reading' },
  { id: '75', hiragana: 'よやくせき', kanji: '予約席', meaning: 'Ghế đặt', difficulty: 'hard', category: 'Signs', lesson: 'Bài 33', section: 'reading' },
  { id: '76', hiragana: 'ひじょうぐち', kanji: '非常口', meaning: 'Cửa thoát hiểm', difficulty: 'hard', category: 'Signs', lesson: 'Bài 33', section: 'reading' },
  { id: '77', hiragana: 'かざん', kanji: '火山', meaning: 'Cấm lửa', difficulty: 'hard', category: 'Signs', lesson: 'Bài 33', section: 'reading' },
  { id: '78', hiragana: 'ちゅうい', kanji: '注意', meaning: 'Chú ý đổ vỡ', difficulty: 'hard', category: 'Signs', lesson: 'Bài 33', section: 'reading' },
  { id: '79', hiragana: 'うんてんちゅうい', kanji: '運転注意', meaning: 'Chú ý người mới lái xe', difficulty: 'hard', category: 'Signs', lesson: 'Bài 33', section: 'reading' }
];
