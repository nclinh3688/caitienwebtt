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

export const lesson22Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'きます II', kanji: '着ます II', meaning: 'mặc (áo sơ mi, v.v.)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 22', section: 'main' },
  { id: '2', hiragana: 'はきます I', kanji: '履きます I', meaning: 'đi, mặc (giày, quần, v.v.)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 22', section: 'main' },
  { id: '3', hiragana: 'かぶります I', kanji: '被ります I', meaning: 'đội (mũ, v.v.)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 22', section: 'main' },
  { id: '4', hiragana: 'かけます II', kanji: '掛けます II', meaning: 'đeo (kính)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 22', section: 'main' },
  { id: '5', hiragana: 'します III', kanji: 'します III', meaning: 'đeo [cà vạt]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 22', section: 'main' },
  { id: '6', hiragana: 'ネクタイを', kanji: 'ネクタイを', meaning: 'đeo [cà vạt]', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'main' },
  { id: '7', hiragana: 'うまれます II', kanji: '生まれます II', meaning: 'sinh ra', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 22', section: 'main' },
  { id: '8', hiragana: 'わたしたち', kanji: '私たち', meaning: 'chúng tôi, chúng ta', difficulty: 'easy', category: 'Pronouns', lesson: 'Bài 22', section: 'main' },
  { id: '9', hiragana: 'コート', kanji: '', meaning: 'áo khoác', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'main' },
  { id: '10', hiragana: 'セーター', kanji: '', meaning: 'áo len', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'main' },
  { id: '11', hiragana: 'スーツ', kanji: '', meaning: 'com-lê, vét', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'main' },
  { id: '12', hiragana: 'ぼうし', kanji: '帽子', meaning: 'mũ', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'main' },
  { id: '13', hiragana: 'めがね', kanji: '眼鏡', meaning: 'kính', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'main' },
  { id: '14', hiragana: 'ケーキ', kanji: '', meaning: 'bánh ngọt', difficulty: 'easy', category: 'Food', lesson: 'Bài 22', section: 'main' },
  { id: '15', hiragana: 'おべんとう', kanji: 'お弁当', meaning: 'cơm hộp', difficulty: 'easy', category: 'Food', lesson: 'Bài 22', section: 'main' },
  { id: '16', hiragana: 'ロボット', kanji: '', meaning: 'rô bốt', difficulty: 'easy', category: 'Technology', lesson: 'Bài 22', section: 'main' },
  { id: '17', hiragana: 'ユーモア', kanji: '', meaning: 'sự hài hước', difficulty: 'easy', category: 'Personality', lesson: 'Bài 22', section: 'main' },
  { id: '18', hiragana: 'つごう', kanji: '都合', meaning: '(sự) thích hợp', difficulty: 'easy', category: 'Status', lesson: 'Bài 22', section: 'main' },
  { id: '19', hiragana: 'よく', kanji: '', meaning: 'thường, hay', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 22', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '20', hiragana: 'えーと', kanji: '', meaning: 'ừ, à', difficulty: 'easy', category: 'Interjections', lesson: 'Bài 22', section: 'conversation' },
  { id: '21', hiragana: 'おめでとうございます', kanji: 'おめでとうございます', meaning: 'Chúc mừng', difficulty: 'easy', category: 'Wishes', lesson: 'Bài 22', section: 'conversation' },
  { id: '22', hiragana: 'おさがしですか', kanji: 'お探しですか', meaning: 'Anh/Chị tìm ~ à?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 22', section: 'conversation' },
  { id: '23', hiragana: 'では', kanji: '', meaning: 'Thế/Vậy (nhé)', difficulty: 'easy', category: 'Conjunctions', lesson: 'Bài 22', section: 'conversation' },
  { id: '24', hiragana: 'こちら', kanji: '', meaning: 'đây, cái này', difficulty: 'easy', category: 'Pronouns', lesson: 'Bài 22', section: 'conversation' },
  { id: '25', hiragana: 'やちん', kanji: '家賃', meaning: 'tiền thuê nhà', difficulty: 'easy', category: 'Money', lesson: 'Bài 22', section: 'conversation' },
  { id: '26', hiragana: 'ダイニングキッチン', kanji: '', meaning: 'bếp kèm phòng ăn', difficulty: 'easy', category: 'Rooms', lesson: 'Bài 22', section: 'conversation' },
  { id: '27', hiragana: 'わしつ', kanji: '和室', meaning: 'phòng kiểu Nhật', difficulty: 'easy', category: 'Rooms', lesson: 'Bài 22', section: 'conversation' },
  { id: '28', hiragana: 'おしいれ', kanji: '押し入れ', meaning: 'chỗ để chăn gối, đệm trong một căn phòng kiểu Nhật', difficulty: 'easy', category: 'Rooms', lesson: 'Bài 22', section: 'conversation' },
  { id: '29', hiragana: 'ふとん', kanji: '布団', meaning: 'chăn, đệm kiểu Nhật', difficulty: 'easy', category: 'Objects', lesson: 'Bài 22', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '30', hiragana: 'スーツ', kanji: '', meaning: 'com-lê', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '31', hiragana: 'ワンピース', kanji: '', meaning: 'váy liền thân', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '32', hiragana: 'うわぎ', kanji: '上着', meaning: 'áo khoác', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '33', hiragana: 'ズボン/パンツ', kanji: 'ズボン/パンツ', meaning: 'quần âu', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '34', hiragana: 'ジーンズ', kanji: '', meaning: 'quần bò, quần Jeans', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '35', hiragana: 'スカート', kanji: '', meaning: 'váy ngắn', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '36', hiragana: 'ブラウス', kanji: '', meaning: 'áo bờ-lu-zông', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '37', hiragana: 'ワイシャツ', kanji: '', meaning: 'áo sơ-mi (trắng)', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '38', hiragana: 'セーター', kanji: '', meaning: 'áo len', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '39', hiragana: 'マフラー', kanji: '', meaning: 'khăn', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '40', hiragana: 'てぶくろ', kanji: '手袋', meaning: 'găng tay', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '41', hiragana: 'したぎ', kanji: '下着', meaning: 'quần áo lót', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '42', hiragana: 'くつした', kanji: '靴下', meaning: 'tất (păng-ti)', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '43', hiragana: 'ストッキング', kanji: '', meaning: 'quần tất', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '44', hiragana: 'きもの', kanji: '着物', meaning: 'kimono', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '45', hiragana: 'おび', kanji: '帯', meaning: 'đai', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '46', hiragana: 'オーバーコート', kanji: '', meaning: 'áo choàng', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '47', hiragana: 'ネクタイ', kanji: '', meaning: 'cà vạt', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '48', hiragana: 'ハイヒール', kanji: '', meaning: 'giày cao gót', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '49', hiragana: 'レインコート', kanji: '', meaning: 'áo mưa', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '50', hiragana: 'ベルト', kanji: '', meaning: 'thắt lưng', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '51', hiragana: 'ブーツ', kanji: '', meaning: 'ủng, giày cao cổ', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '52', hiragana: 'うんどうぐつ', kanji: '運動靴', meaning: 'giày thể thao', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '53', hiragana: 'ぞうり', kanji: '草履', meaning: 'guốc (đi kèm với kimono)', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' },
  { id: '54', hiragana: 'たび', kanji: '足袋', meaning: 'tất (đi kèm với kimono)', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 22', section: 'reading' }
];
