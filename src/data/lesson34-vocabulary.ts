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

export const lesson34Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'みがきます I', kanji: '磨きます', meaning: 'đánh [răng], đánh [giày]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'main' },
  { id: '2', hiragana: 'くみたてます II', kanji: '組み立てます', meaning: 'lắp ráp', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'main' },
  { id: '3', hiragana: 'おります I', kanji: '折ります', meaning: 'gập, bẻ', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'main' },
  { id: '4', hiragana: 'きがつきます II', kanji: '気がつきます', meaning: 'để ý đến, chú ý đến [đồ quên]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'main' },
  { id: '5', hiragana: 'つけます II', kanji: '付けます', meaning: 'chấm [xì dầu]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'main' },
  { id: '6', hiragana: 'みつかります II', kanji: '見つかります', meaning: 'tìm thấy [chìa khóa]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'main' },
  { id: '7', hiragana: 'しつもんします III', kanji: '質問します', meaning: 'hỏi', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'main' },
  { id: '8', hiragana: 'さします I', kanji: '指します', meaning: 'chỉ [ô]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'main' },
  { id: '9', hiragana: 'スポーツクラブ', kanji: '', meaning: 'câu lạc bộ thể thao', difficulty: 'medium', category: 'Places', lesson: 'Bài 34', section: 'main' },
  { id: '10', hiragana: 'おしろ', kanji: '[お]城', meaning: 'thành', difficulty: 'medium', category: 'Places', lesson: 'Bài 34', section: 'main' },
  { id: '11', hiragana: 'せつめいしょ', kanji: '説明書', meaning: 'sách hướng dẫn', difficulty: 'medium', category: 'Books', lesson: 'Bài 34', section: 'main' },
  { id: '12', hiragana: 'ず', kanji: '図', meaning: 'hình vẽ minh họa', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'main' },
  { id: '13', hiragana: 'せん', kanji: '線', meaning: 'đường kẻ', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'main' },
  { id: '14', hiragana: 'やじるし', kanji: '矢印', meaning: 'mũi tên (ký hiệu)', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'main' },
  { id: '15', hiragana: 'くろ', kanji: '黒', meaning: 'màu đen (danh từ)', difficulty: 'easy', category: 'Colors', lesson: 'Bài 34', section: 'main' },
  { id: '16', hiragana: 'しろ', kanji: '白', meaning: 'màu trắng (danh từ)', difficulty: 'easy', category: 'Colors', lesson: 'Bài 34', section: 'main' },
  { id: '17', hiragana: 'あか', kanji: '赤', meaning: 'màu đỏ (danh từ)', difficulty: 'easy', category: 'Colors', lesson: 'Bài 34', section: 'main' },
  { id: '18', hiragana: 'あお', kanji: '青', meaning: 'màu xanh (danh từ)', difficulty: 'easy', category: 'Colors', lesson: 'Bài 34', section: 'main' },
  { id: '19', hiragana: 'ちゃいろ', kanji: '茶色', meaning: 'màu nâu (danh từ)', difficulty: 'medium', category: 'Colors', lesson: 'Bài 34', section: 'main' },
  { id: '20', hiragana: 'しょうゆ', kanji: 'しょうゆ', meaning: 'xì dầu', difficulty: 'medium', category: 'Food', lesson: 'Bài 34', section: 'main' },
  { id: '21', hiragana: 'ソース', kanji: '', meaning: 'nước sốt', difficulty: 'medium', category: 'Food', lesson: 'Bài 34', section: 'main' },
  { id: '22', hiragana: 'おきゃくさん', kanji: '[お]客さん', meaning: '[vị] khách', difficulty: 'medium', category: 'People', lesson: 'Bài 34', section: 'main' },
  { id: '23', hiragana: '～が～', kanji: '', meaning: '~ hay là ~', difficulty: 'medium', category: 'Particles', lesson: 'Bài 34', section: 'main' },
  { id: '24', hiragana: 'ゆうべ', kanji: '夕べ', meaning: 'tối qua', difficulty: 'medium', category: 'Time', lesson: 'Bài 34', section: 'main' },
  { id: '25', hiragana: 'さっき', kanji: '', meaning: 'lúc nãy', difficulty: 'medium', category: 'Time', lesson: 'Bài 34', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '26', hiragana: 'さどう', kanji: '茶道', meaning: 'trà đạo', difficulty: 'hard', category: 'Culture', lesson: 'Bài 34', section: 'conversation' },
  { id: '27', hiragana: 'おちゃをたてます II', kanji: 'お茶を点てます', meaning: 'đánh trà (trong trà đạo)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 34', section: 'conversation' },
  { id: '28', hiragana: 'さきに', kanji: '先に', meaning: 'trước', difficulty: 'medium', category: 'Time', lesson: 'Bài 34', section: 'conversation' },
  { id: '29', hiragana: 'のせます II', kanji: '載せます', meaning: 'để lên', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'conversation' },
  { id: '30', hiragana: 'これでいいですか', kanji: '', meaning: 'Như thế này có được không?', difficulty: 'medium', category: 'Questions', lesson: 'Bài 34', section: 'conversation' },
  { id: '31', hiragana: 'いかがですか', kanji: '', meaning: 'Như thế nào ạ?', difficulty: 'medium', category: 'Questions', lesson: 'Bài 34', section: 'conversation' },
  { id: '32', hiragana: 'にがい', kanji: '苦い', meaning: 'đắng', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 34', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '33', hiragana: 'おやこどんぶり', kanji: '親子丼', meaning: 'Oyakodonburi (món cơm gồm có thịt gà và trứng để trong tô lớn)', difficulty: 'hard', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '34', hiragana: 'ざいりょう', kanji: '材料', meaning: 'nguyên liệu', difficulty: 'medium', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '35', hiragana: '～ぶん', kanji: '～分', meaning: 'phần ~ (biểu thị lượng)', difficulty: 'medium', category: 'Suffixes', lesson: 'Bài 34', section: 'reading' },
  { id: '36', hiragana: '～グラム', kanji: '', meaning: 'gram', difficulty: 'medium', category: 'Units', lesson: 'Bài 34', section: 'reading' },
  { id: '37', hiragana: '～こ', kanji: '～個', meaning: '~ cái (trợ số từ dùng để đếm vật nhỏ)', difficulty: 'medium', category: 'Counters', lesson: 'Bài 34', section: 'reading' },
  { id: '38', hiragana: 'たまねぎ', kanji: '玉ねぎ', meaning: 'hành tây', difficulty: 'medium', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '39', hiragana: 'よんぶんのいち', kanji: '四分の一', meaning: 'một phần tư', difficulty: 'hard', category: 'Fractions', lesson: 'Bài 34', section: 'reading' },
  { id: '40', hiragana: 'ちょうみりょう', kanji: '調味料', meaning: 'gia vị', difficulty: 'hard', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '41', hiragana: 'てきとう', kanji: '適当', meaning: 'độ lớn thích hợp', difficulty: 'hard', category: 'Adjectives', lesson: 'Bài 34', section: 'reading' },
  { id: '42', hiragana: 'なべ', kanji: '鍋', meaning: 'nồi', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '43', hiragana: 'かにかけます II', kanji: '火にかけます', meaning: 'bắc lên bếp', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 34', section: 'reading' },
  { id: '44', hiragana: 'にます I', kanji: '煮ます', meaning: 'nấu', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'reading' },
  { id: '45', hiragana: 'にえます II', kanji: '煮えます', meaning: 'chín', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'reading' },
  { id: '46', hiragana: 'どんぶり', kanji: '', meaning: 'bát tô lớn', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '47', hiragana: 'たちます I', kanji: '経ちます', meaning: 'trôi qua (thời gian)', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'reading' },

  // Nấu ăn (料理)
  { id: '48', hiragana: 'りょうり', kanji: '料理', meaning: 'nấu ăn', difficulty: 'medium', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '49', hiragana: 'にます I', kanji: '煮ます', meaning: 'nấu', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'reading' },
  { id: '50', hiragana: 'やきます I', kanji: '焼きます', meaning: 'nướng, rán', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'reading' },
  { id: '51', hiragana: 'あげます II', kanji: '揚げます', meaning: 'chiên', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'reading' },
  { id: '52', hiragana: 'いためもす II', kanji: '炒めもす', meaning: 'xào', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 34', section: 'reading' },
  { id: '53', hiragana: 'ゆでます II', kanji: '茹でます', meaning: 'luộc', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'reading' },
  { id: '54', hiragana: 'むします I', kanji: '蒸します', meaning: 'hấp', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'reading' },
  { id: '55', hiragana: 'かんそうします III', kanji: '乾燥します', meaning: 'sấy khô', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 34', section: 'reading' },
  { id: '56', hiragana: 'まぜます II', kanji: '混ぜます', meaning: 'trộn', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'reading' },
  { id: '57', hiragana: 'ゆでます II', kanji: '茹でます', meaning: 'luộc', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 34', section: 'reading' },
  { id: '58', hiragana: 'しょうゆ', kanji: '醤油', meaning: 'xì dầu', difficulty: 'medium', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '59', hiragana: 'さとう', kanji: '砂糖', meaning: 'đường', difficulty: 'medium', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '60', hiragana: 'しお', kanji: '塩', meaning: 'muối', difficulty: 'easy', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '61', hiragana: 'こしょう', kanji: '胡椒', meaning: 'hạt tiêu', difficulty: 'medium', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '62', hiragana: 'みそ', kanji: '味噌', meaning: 'miso (tương Nhật)', difficulty: 'medium', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '63', hiragana: 'マヨネーズ', kanji: '', meaning: 'mayonnaise', difficulty: 'medium', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '64', hiragana: 'ケチャップ', kanji: '', meaning: 'tương cà chua (Ketchup)', difficulty: 'medium', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '65', hiragana: 'マスタード', kanji: '', meaning: 'mù-tạt, mù-tác', difficulty: 'medium', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '66', hiragana: 'けずりぶし', kanji: '削り節', meaning: 'hạt tiêu', difficulty: 'hard', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '67', hiragana: 'わさび', kanji: '', meaning: 'wasabi', difficulty: 'medium', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '68', hiragana: 'カレー粉', kanji: '', meaning: 'bột ca-ri', difficulty: 'hard', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '69', hiragana: 'だいどころようひん', kanji: '台所用品', meaning: 'đồ dùng trong bếp', difficulty: 'hard', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '70', hiragana: 'なべ', kanji: '', meaning: 'chảo, cái nồi', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '71', hiragana: 'てつなべ', kanji: '鉄鍋', meaning: 'nồi gang', difficulty: 'hard', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '72', hiragana: 'かん', kanji: '缶', meaning: 'hộp', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '73', hiragana: 'おわん', kanji: 'お椀', meaning: 'bát', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '74', hiragana: 'かんづめ', kanji: '缶詰', meaning: 'đồ hộp', difficulty: 'medium', category: 'Food', lesson: 'Bài 34', section: 'reading' },
  { id: '75', hiragana: 'やかん', kanji: '', meaning: 'ấm nước', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '76', hiragana: 'おたま', kanji: '', meaning: 'vá múc', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '77', hiragana: 'かいじゅう', kanji: '', meaning: 'cái muỗng', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '78', hiragana: 'かいしゃ', kanji: '', meaning: 'cái thìa', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '79', hiragana: 'かない', kanji: '', meaning: 'cái nĩa', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '80', hiragana: 'かいがい', kanji: '', meaning: 'cái dao', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '81', hiragana: 'ほうちょう', kanji: '包丁', meaning: 'cái kéo', difficulty: 'hard', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '82', hiragana: 'フライパン', kanji: '', meaning: 'chảo rán', difficulty: 'medium', category: 'Objects', lesson: 'Bài 34', section: 'reading' },
  { id: '83', hiragana: 'でんしレンジ', kanji: '電子レンジ', meaning: 'lò vi sóng', difficulty: 'hard', category: 'Appliances', lesson: 'Bài 34', section: 'reading' },
  { id: '84', hiragana: 'ホットプレート', kanji: '', meaning: 'bếp điện (dùng để nướng)', difficulty: 'hard', category: 'Appliances', lesson: 'Bài 34', section: 'reading' },
  { id: '85', hiragana: 'かんきせん', kanji: '換気扇', meaning: 'quạt hút khí', difficulty: 'hard', category: 'Appliances', lesson: 'Bài 34', section: 'reading' }
];
