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

export const lesson11Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'います', kanji: '', meaning: 'có (con)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 11', section: 'main' },
  { id: '2', hiragana: 'にほん', kanji: '日本', meaning: 'ở Nhật', difficulty: 'easy', category: 'Places', lesson: 'Bài 11', section: 'main' },
  { id: '3', hiragana: 'かかります', kanji: '', meaning: 'mất, tốn (thời gian, tiền bạc)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 11', section: 'main' },
  { id: '4', hiragana: 'やすみます', kanji: '休みます', meaning: 'nghỉ (làm việc)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 11', section: 'main' },
  { id: '5', hiragana: 'ひとつ', kanji: '一つ', meaning: 'một cái', difficulty: 'easy', category: 'Numbers', lesson: 'Bài 11', section: 'main' },
  { id: '6', hiragana: 'ふたつ', kanji: '二つ', meaning: 'hai cái', difficulty: 'easy', category: 'Numbers', lesson: 'Bài 11', section: 'main' },
  { id: '7', hiragana: 'みっつ', kanji: '三つ', meaning: 'ba cái', difficulty: 'easy', category: 'Numbers', lesson: 'Bài 11', section: 'main' },
  { id: '8', hiragana: 'よっつ', kanji: '四つ', meaning: 'bốn cái', difficulty: 'easy', category: 'Numbers', lesson: 'Bài 11', section: 'main' },
  { id: '9', hiragana: 'いつつ', kanji: '五つ', meaning: 'năm cái', difficulty: 'easy', category: 'Numbers', lesson: 'Bài 11', section: 'main' },
  { id: '10', hiragana: 'むっつ', kanji: '六つ', meaning: 'sáu cái', difficulty: 'easy', category: 'Numbers', lesson: 'Bài 11', section: 'main' },
  { id: '11', hiragana: 'ななつ', kanji: '七つ', meaning: 'bảy cái', difficulty: 'easy', category: 'Numbers', lesson: 'Bài 11', section: 'main' },
  { id: '12', hiragana: 'やっつ', kanji: '八つ', meaning: 'tám cái', difficulty: 'easy', category: 'Numbers', lesson: 'Bài 11', section: 'main' },
  { id: '13', hiragana: 'ここのつ', kanji: '九つ', meaning: 'chín cái', difficulty: 'easy', category: 'Numbers', lesson: 'Bài 11', section: 'main' },
  { id: '14', hiragana: 'とお', kanji: '十', meaning: 'mười cái', difficulty: 'easy', category: 'Numbers', lesson: 'Bài 11', section: 'main' },
  { id: '15', hiragana: 'いくつ', kanji: '', meaning: 'mấy cái, bao nhiêu cái', difficulty: 'easy', category: 'Questions', lesson: 'Bài 11', section: 'main' },
  { id: '16', hiragana: 'ひとり', kanji: '一人', meaning: 'một người', difficulty: 'easy', category: 'Numbers', lesson: 'Bài 11', section: 'main' },
  { id: '17', hiragana: 'ふたり', kanji: '二人', meaning: 'hai người', difficulty: 'easy', category: 'Numbers', lesson: 'Bài 11', section: 'main' },
  { id: '18', hiragana: 'にん', kanji: '人', meaning: 'người', difficulty: 'easy', category: 'Counters', lesson: 'Bài 11', section: 'main' },
  { id: '19', hiragana: 'だい', kanji: '台', meaning: 'cái, chiếc (máy móc, xe cộ)', difficulty: 'easy', category: 'Counters', lesson: 'Bài 11', section: 'main' },
  { id: '20', hiragana: 'まい', kanji: '枚', meaning: 'tờ, tấm (vật mỏng)', difficulty: 'easy', category: 'Counters', lesson: 'Bài 11', section: 'main' },
  { id: '21', hiragana: 'かい', kanji: '回', meaning: 'lần', difficulty: 'easy', category: 'Counters', lesson: 'Bài 11', section: 'main' },
  { id: '22', hiragana: 'りんご', kanji: '', meaning: 'táo', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'main' },
  { id: '23', hiragana: 'みかん', kanji: '', meaning: 'quýt', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'main' },
  { id: '24', hiragana: 'サンドイッチ', kanji: '', meaning: 'bánh san-uých', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'main' },
  { id: '25', hiragana: 'カレー', kanji: '', meaning: 'món cà-ri', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'main' },
  { id: '26', hiragana: 'アイスクリーム', kanji: '', meaning: 'kem', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'main' },
  { id: '27', hiragana: 'きって', kanji: '切手', meaning: 'tem', difficulty: 'easy', category: 'Objects', lesson: 'Bài 11', section: 'main' },
  { id: '28', hiragana: 'はがき', kanji: '', meaning: 'bưu thiếp', difficulty: 'easy', category: 'Objects', lesson: 'Bài 11', section: 'main' },
  { id: '29', hiragana: 'ふうとう', kanji: '封筒', meaning: 'phong bì', difficulty: 'easy', category: 'Objects', lesson: 'Bài 11', section: 'main' },
  { id: '30', hiragana: 'りょうしん', kanji: '両親', meaning: 'bố mẹ', difficulty: 'easy', category: 'Family', lesson: 'Bài 11', section: 'main' },
  { id: '31', hiragana: 'きょうだい', kanji: '兄弟', meaning: 'anh chị em', difficulty: 'easy', category: 'Family', lesson: 'Bài 11', section: 'main' },
  { id: '32', hiragana: 'あに', kanji: '兄', meaning: 'anh trai (mình)', difficulty: 'easy', category: 'Family', lesson: 'Bài 11', section: 'main' },
  { id: '33', hiragana: 'おにいさん', kanji: 'お兄さん', meaning: 'anh trai (của người khác)', difficulty: 'easy', category: 'Family', lesson: 'Bài 11', section: 'main' },
  { id: '34', hiragana: 'あね', kanji: '姉', meaning: 'chị gái (mình)', difficulty: 'easy', category: 'Family', lesson: 'Bài 11', section: 'main' },
  { id: '35', hiragana: 'おねえさん', kanji: 'お姉さん', meaning: 'chị gái (của người khác)', difficulty: 'easy', category: 'Family', lesson: 'Bài 11', section: 'main' },
  { id: '36', hiragana: 'おとうと', kanji: '弟', meaning: 'em trai (mình)', difficulty: 'easy', category: 'Family', lesson: 'Bài 11', section: 'main' },
  { id: '37', hiragana: 'おとうとさん', kanji: '弟さん', meaning: 'em trai (của người khác)', difficulty: 'easy', category: 'Family', lesson: 'Bài 11', section: 'main' },
  { id: '38', hiragana: 'いもうと', kanji: '妹', meaning: 'em gái (mình)', difficulty: 'easy', category: 'Family', lesson: 'Bài 11', section: 'main' },
  { id: '39', hiragana: 'いもうとさん', kanji: '妹さん', meaning: 'em gái (của người khác)', difficulty: 'easy', category: 'Family', lesson: 'Bài 11', section: 'main' },
  { id: '40', hiragana: 'がいこく', kanji: '外国', meaning: 'nước ngoài', difficulty: 'easy', category: 'Places', lesson: 'Bài 11', section: 'main' },
  { id: '41', hiragana: 'りゅうがくせい', kanji: '留学生', meaning: 'lưu học sinh', difficulty: 'easy', category: 'People', lesson: 'Bài 11', section: 'main' },
  { id: '42', hiragana: 'クラス', kanji: '', meaning: 'lớp học', difficulty: 'easy', category: 'Education', lesson: 'Bài 11', section: 'main' },
  { id: '43', hiragana: 'じかん', kanji: '時間', meaning: 'tiếng', difficulty: 'easy', category: 'Time', lesson: 'Bài 11', section: 'main' },
  { id: '44', hiragana: 'しゅうかん', kanji: '週間', meaning: 'tuần', difficulty: 'easy', category: 'Time', lesson: 'Bài 11', section: 'main' },
  { id: '45', hiragana: 'かげつ', kanji: 'か月', meaning: 'tháng', difficulty: 'easy', category: 'Time', lesson: 'Bài 11', section: 'main' },
  { id: '46', hiragana: 'ねん', kanji: '年', meaning: 'năm', difficulty: 'easy', category: 'Time', lesson: 'Bài 11', section: 'main' },
  { id: '47', hiragana: 'ぐらい', kanji: '', meaning: 'khoảng', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 11', section: 'main' },
  { id: '48', hiragana: 'どのくらい', kanji: '', meaning: 'bao lâu', difficulty: 'easy', category: 'Questions', lesson: 'Bài 11', section: 'main' },
  { id: '49', hiragana: 'ぜんぶ', kanji: '全部', meaning: 'tổng cộng', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 11', section: 'main' },
  { id: '50', hiragana: 'みんな', kanji: '', meaning: 'tất cả', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 11', section: 'main' },
  { id: '51', hiragana: 'だけ', kanji: '', meaning: 'chỉ', difficulty: 'easy', category: 'Particles', lesson: 'Bài 11', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '52', hiragana: 'てんき', kanji: '天気', meaning: 'Trời đẹp nhỉ', difficulty: 'easy', category: 'Weather', lesson: 'Bài 11', section: 'conversation' },
  { id: '53', hiragana: 'おでかけ', kanji: '', meaning: 'Anh/Chị đi ra ngoài đấy à?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 11', section: 'conversation' },
  { id: '54', hiragana: 'ちょっと', kanji: '', meaning: 'Tôi đi ~ một chút', difficulty: 'easy', category: 'Responses', lesson: 'Bài 11', section: 'conversation' },
  { id: '55', hiragana: 'いっていらっしゃい', kanji: '', meaning: 'Anh/Chị đi nhé', difficulty: 'easy', category: 'Farewells', lesson: 'Bài 11', section: 'conversation' },
  { id: '56', hiragana: 'いってきます', kanji: '', meaning: 'Tôi đi đây', difficulty: 'easy', category: 'Farewells', lesson: 'Bài 11', section: 'conversation' },
  { id: '57', hiragana: 'ふなびん', kanji: '船便', meaning: 'gửi bằng đường biển', difficulty: 'easy', category: 'Shipping', lesson: 'Bài 11', section: 'conversation' },
  { id: '58', hiragana: 'こうくうびん', kanji: '航空便', meaning: 'gửi bằng đường hàng không', difficulty: 'easy', category: 'Shipping', lesson: 'Bài 11', section: 'conversation' },
  { id: '59', hiragana: 'おねがいします', kanji: 'お願いします', meaning: 'Nhờ anh/chị', difficulty: 'easy', category: 'Requests', lesson: 'Bài 11', section: 'conversation' },
  { id: '60', hiragana: 'オーストラリア', kanji: '', meaning: 'Úc', difficulty: 'easy', category: 'Countries', lesson: 'Bài 11', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '61', hiragana: 'ていしょく', kanji: '定食', meaning: 'cơm suất', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '62', hiragana: 'ランチ', kanji: '', meaning: 'cơm trưa', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '63', hiragana: 'てんどん', kanji: '天どん', meaning: 'cơm và tôm chiên tẩm bột', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '64', hiragana: 'おやこどん', kanji: '親子どん', meaning: 'cơm với thịt gà và trứng', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '65', hiragana: 'ぎゅうどん', kanji: '牛どん', meaning: 'cơm với thịt bò', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '66', hiragana: 'やきにく', kanji: '焼き肉', meaning: 'thịt nướng', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '67', hiragana: 'やさいいため', kanji: '野菜いため', meaning: 'rau xào', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '68', hiragana: 'つけもの', kanji: '漬物', meaning: 'dưa muối', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '69', hiragana: 'みそしる', kanji: 'みそ汁', meaning: 'súp miso', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '70', hiragana: 'おにぎり', kanji: '', meaning: 'cơm nắm', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '71', hiragana: 'てんぷら', kanji: '天ぷら', meaning: 'tôm chiên tẩm bột', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '72', hiragana: 'すし', kanji: '', meaning: 'sushi', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '73', hiragana: 'うどん', kanji: '', meaning: 'mì được làm từ bột lúa mạch', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '74', hiragana: 'そば', kanji: '', meaning: 'mì được làm từ bột kiều mạch', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '75', hiragana: 'ラーメン', kanji: '', meaning: 'mì Tàu', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '76', hiragana: 'やきそば', kanji: '焼きそば', meaning: 'mì soba xào với rau và thịt', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '77', hiragana: 'おこのみやき', kanji: 'お好み焼き', meaning: 'okonomiyaki', difficulty: 'easy', category: 'Food', lesson: 'Bài 11', section: 'reading' },
  { id: '78', hiragana: 'コーヒー', kanji: '', meaning: 'cà-phê', difficulty: 'easy', category: 'Drinks', lesson: 'Bài 11', section: 'reading' },
  { id: '79', hiragana: 'こうちゃ', kanji: '紅茶', meaning: 'trà đen', difficulty: 'easy', category: 'Drinks', lesson: 'Bài 11', section: 'reading' },
  { id: '80', hiragana: 'ココア', kanji: '', meaning: 'ca-cao', difficulty: 'easy', category: 'Drinks', lesson: 'Bài 11', section: 'reading' },
  { id: '81', hiragana: 'ジュース', kanji: '', meaning: 'nước hoa quả', difficulty: 'easy', category: 'Drinks', lesson: 'Bài 11', section: 'reading' },
  { id: '82', hiragana: 'コーラ', kanji: '', meaning: 'cô-ca cô-la', difficulty: 'easy', category: 'Drinks', lesson: 'Bài 11', section: 'reading' }
];
