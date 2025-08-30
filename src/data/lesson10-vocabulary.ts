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

export const lesson10Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'あります', kanji: '', meaning: 'ở (tồn tại, dùng cho đồ vật)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 10', section: 'main' },
  { id: '2', hiragana: 'います', kanji: '', meaning: 'ở (tồn tại, dùng cho người và động vật)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 10', section: 'main' },
  { id: '3', hiragana: 'いろいろ', kanji: '', meaning: 'nhiều, đa dạng', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 10', section: 'main' },
  { id: '4', hiragana: 'おとこのひと', kanji: '男の人', meaning: 'người đàn ông', difficulty: 'easy', category: 'People', lesson: 'Bài 10', section: 'main' },
  { id: '5', hiragana: 'おんなのひと', kanji: '女の人', meaning: 'người đàn bà', difficulty: 'easy', category: 'People', lesson: 'Bài 10', section: 'main' },
  { id: '6', hiragana: 'おとこのこ', kanji: '男の子', meaning: 'cậu con trai', difficulty: 'easy', category: 'People', lesson: 'Bài 10', section: 'main' },
  { id: '7', hiragana: 'おんなのこ', kanji: '女の子', meaning: 'cô con gái', difficulty: 'easy', category: 'People', lesson: 'Bài 10', section: 'main' },
  { id: '8', hiragana: 'いぬ', kanji: '犬', meaning: 'chó', difficulty: 'easy', category: 'Animals', lesson: 'Bài 10', section: 'main' },
  { id: '9', hiragana: 'ねこ', kanji: '猫', meaning: 'mèo', difficulty: 'easy', category: 'Animals', lesson: 'Bài 10', section: 'main' },
  { id: '10', hiragana: 'パンダ', kanji: '', meaning: 'gấu trúc', difficulty: 'easy', category: 'Animals', lesson: 'Bài 10', section: 'main' },
  { id: '11', hiragana: 'ぞう', kanji: '象', meaning: 'voi', difficulty: 'easy', category: 'Animals', lesson: 'Bài 10', section: 'main' },
  { id: '12', hiragana: 'き', kanji: '木', meaning: 'cây, gỗ', difficulty: 'easy', category: 'Nature', lesson: 'Bài 10', section: 'main' },
  { id: '13', hiragana: 'もの', kanji: '物', meaning: 'vật, đồ vật', difficulty: 'easy', category: 'Objects', lesson: 'Bài 10', section: 'main' },
  { id: '14', hiragana: 'でんち', kanji: '電池', meaning: 'pin', difficulty: 'easy', category: 'Electronics', lesson: 'Bài 10', section: 'main' },
  { id: '15', hiragana: 'はこ', kanji: '箱', meaning: 'hộp', difficulty: 'easy', category: 'Objects', lesson: 'Bài 10', section: 'main' },
  { id: '16', hiragana: 'スイッチ', kanji: '', meaning: 'công tắc', difficulty: 'easy', category: 'Electronics', lesson: 'Bài 10', section: 'main' },
  { id: '17', hiragana: 'れいぞうこ', kanji: '冷蔵庫', meaning: 'tủ lạnh', difficulty: 'easy', category: 'Appliances', lesson: 'Bài 10', section: 'main' },
  { id: '18', hiragana: 'テーブル', kanji: '', meaning: 'bàn', difficulty: 'easy', category: 'Furniture', lesson: 'Bài 10', section: 'main' },
  { id: '19', hiragana: 'ベッド', kanji: '', meaning: 'giường', difficulty: 'easy', category: 'Furniture', lesson: 'Bài 10', section: 'main' },
  { id: '20', hiragana: 'たな', kanji: '棚', meaning: 'giá sách, kệ sách', difficulty: 'easy', category: 'Furniture', lesson: 'Bài 10', section: 'main' },
  { id: '21', hiragana: 'ドア', kanji: '', meaning: 'cửa', difficulty: 'easy', category: 'Furniture', lesson: 'Bài 10', section: 'main' },
  { id: '22', hiragana: 'まど', kanji: '窓', meaning: 'cửa sổ', difficulty: 'easy', category: 'Furniture', lesson: 'Bài 10', section: 'main' },
  { id: '23', hiragana: 'ポスト', kanji: '', meaning: 'hộp thư, hòm thư', difficulty: 'easy', category: 'Objects', lesson: 'Bài 10', section: 'main' },
  { id: '24', hiragana: 'ビル', kanji: '', meaning: 'tòa nhà', difficulty: 'easy', category: 'Buildings', lesson: 'Bài 10', section: 'main' },
  { id: '25', hiragana: 'ATM', kanji: '', meaning: 'máy rút tiền tự động', difficulty: 'easy', category: 'Machines', lesson: 'Bài 10', section: 'main' },
  { id: '26', hiragana: 'コンビニ', kanji: '', meaning: 'cửa hàng tiện lợi', difficulty: 'easy', category: 'Places', lesson: 'Bài 10', section: 'main' },
  { id: '27', hiragana: 'こうえん', kanji: '公園', meaning: 'công viên', difficulty: 'easy', category: 'Places', lesson: 'Bài 10', section: 'main' },
  { id: '28', hiragana: 'きっさてん', kanji: '喫茶店', meaning: 'quán giải khát, quán cà-phê', difficulty: 'easy', category: 'Places', lesson: 'Bài 10', section: 'main' },
  { id: '29', hiragana: 'や', kanji: '屋', meaning: 'hiệu ~, cửa hàng ~', difficulty: 'easy', category: 'Places', lesson: 'Bài 10', section: 'main' },
  { id: '30', hiragana: 'のりば', kanji: '乗り場', meaning: 'điểm đón tắc-xi, tàu', difficulty: 'easy', category: 'Places', lesson: 'Bài 10', section: 'main' },
  { id: '31', hiragana: 'けん', kanji: '県', meaning: 'tỉnh', difficulty: 'easy', category: 'Geography', lesson: 'Bài 10', section: 'main' },
  { id: '32', hiragana: 'うえ', kanji: '上', meaning: 'trên', difficulty: 'easy', category: 'Position', lesson: 'Bài 10', section: 'main' },
  { id: '33', hiragana: 'した', kanji: '下', meaning: 'dưới', difficulty: 'easy', category: 'Position', lesson: 'Bài 10', section: 'main' },
  { id: '34', hiragana: 'まえ', kanji: '前', meaning: 'trước', difficulty: 'easy', category: 'Position', lesson: 'Bài 10', section: 'main' },
  { id: '35', hiragana: 'うしろ', kanji: '後ろ', meaning: 'sau', difficulty: 'easy', category: 'Position', lesson: 'Bài 10', section: 'main' },
  { id: '36', hiragana: 'みぎ', kanji: '右', meaning: 'phải', difficulty: 'easy', category: 'Position', lesson: 'Bài 10', section: 'main' },
  { id: '37', hiragana: 'ひだり', kanji: '左', meaning: 'trái', difficulty: 'easy', category: 'Position', lesson: 'Bài 10', section: 'main' },
  { id: '38', hiragana: 'なか', kanji: '中', meaning: 'trong, giữa', difficulty: 'easy', category: 'Position', lesson: 'Bài 10', section: 'main' },
  { id: '39', hiragana: 'そと', kanji: '外', meaning: 'ngoài', difficulty: 'easy', category: 'Position', lesson: 'Bài 10', section: 'main' },
  { id: '40', hiragana: 'となり', kanji: '隣', meaning: 'bên cạnh', difficulty: 'easy', category: 'Position', lesson: 'Bài 10', section: 'main' },
  { id: '41', hiragana: 'ちかく', kanji: '近く', meaning: 'gần', difficulty: 'easy', category: 'Position', lesson: 'Bài 10', section: 'main' },
  { id: '42', hiragana: 'あいだ', kanji: '間', meaning: 'giữa, ở giữa', difficulty: 'easy', category: 'Position', lesson: 'Bài 10', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '43', hiragana: 'すみません', kanji: '', meaning: 'Cảm ơn', difficulty: 'easy', category: 'Politeness', lesson: 'Bài 10', section: 'conversation' },
  { id: '44', hiragana: 'ナンプラー', kanji: '', meaning: 'nampla, nước mắm', difficulty: 'easy', category: 'Food', lesson: 'Bài 10', section: 'conversation' },
  { id: '45', hiragana: 'コーナー', kanji: '', meaning: 'góc, khu vực', difficulty: 'easy', category: 'Places', lesson: 'Bài 10', section: 'conversation' },
  { id: '46', hiragana: 'いちばんうえ', kanji: '一番上', meaning: 'ở trên cùng', difficulty: 'easy', category: 'Position', lesson: 'Bài 10', section: 'conversation' },
  { id: '47', hiragana: 'とうきょうディズニーランド', kanji: '東京ディズニーランド', meaning: 'Công viên Tokyo Disneyland', difficulty: 'easy', category: 'Places', lesson: 'Bài 10', section: 'conversation' },
  { id: '48', hiragana: 'アジアストア', kanji: '', meaning: 'tên siêu thị giả định', difficulty: 'easy', category: 'Places', lesson: 'Bài 10', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '49', hiragana: 'げんかん', kanji: '玄関', meaning: 'cửa ra vào', difficulty: 'easy', category: 'House', lesson: 'Bài 10', section: 'reading' },
  { id: '50', hiragana: 'トイレ', kanji: '', meaning: 'toa-lét, phòng vệ sinh', difficulty: 'easy', category: 'House', lesson: 'Bài 10', section: 'reading' },
  { id: '51', hiragana: 'ふろば', kanji: '風呂場', meaning: 'phòng tắm', difficulty: 'easy', category: 'House', lesson: 'Bài 10', section: 'reading' },
  { id: '52', hiragana: 'せんめんじょ', kanji: '洗面所', meaning: 'bồn rửa', difficulty: 'easy', category: 'House', lesson: 'Bài 10', section: 'reading' },
  { id: '53', hiragana: 'だいどころ', kanji: '台所', meaning: 'bếp', difficulty: 'easy', category: 'House', lesson: 'Bài 10', section: 'reading' },
  { id: '54', hiragana: 'しょくどう', kanji: '食堂', meaning: 'nhà ăn, phòng ăn', difficulty: 'easy', category: 'House', lesson: 'Bài 10', section: 'reading' },
  { id: '55', hiragana: 'いま', kanji: '居間', meaning: 'phòng khách, phòng sinh hoạt chung', difficulty: 'easy', category: 'House', lesson: 'Bài 10', section: 'reading' },
  { id: '56', hiragana: 'しんしつ', kanji: '寝室', meaning: 'phòng ngủ', difficulty: 'easy', category: 'House', lesson: 'Bài 10', section: 'reading' },
  { id: '57', hiragana: 'ろうか', kanji: '廊下', meaning: 'hành lang', difficulty: 'easy', category: 'House', lesson: 'Bài 10', section: 'reading' },
  { id: '58', hiragana: 'ベランダ', kanji: '', meaning: 'ban-công', difficulty: 'easy', category: 'House', lesson: 'Bài 10', section: 'reading' }
];