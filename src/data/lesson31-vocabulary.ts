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

export const lesson31Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'つづけます II', kanji: '続けます', meaning: 'tiếp tục', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 31', section: 'main' },
  { id: '2', hiragana: 'みつけます II', kanji: '見つけます', meaning: 'tìm', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 31', section: 'main' },
  { id: '3', hiragana: 'うけます II', kanji: '受けます', meaning: 'dự [thi]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 31', section: 'main' },
  { id: '4', hiragana: 'にゅうがくします III', kanji: '入学します', meaning: 'đăng ký', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 31', section: 'main' },
  { id: '5', hiragana: 'そつぎょうします III', kanji: '卒業します', meaning: 'nghỉ giải lao', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 31', section: 'main' },
  { id: '6', hiragana: 'きゅうけいします III', kanji: '休憩します', meaning: 'nghỉ ngơi liên tục', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 31', section: 'main' },
  { id: '7', hiragana: 'さくぶん', kanji: '作文', meaning: 'bài tập làm văn', difficulty: 'medium', category: 'Education', lesson: 'Bài 31', section: 'main' },
  { id: '8', hiragana: 'はっぴょう', kanji: '発表', meaning: 'phát biểu, công bố [~: phát biểu]', difficulty: 'medium', category: 'Education', lesson: 'Bài 31', section: 'main' },
  { id: '9', hiragana: 'てんらんかい', kanji: '展覧会', meaning: 'cuộc triển lãm', difficulty: 'medium', category: 'Events', lesson: 'Bài 31', section: 'main' },
  { id: '10', hiragana: 'けっこんしき', kanji: '結婚式', meaning: 'lễ cưới', difficulty: 'medium', category: 'Events', lesson: 'Bài 31', section: 'main' },
  { id: '11', hiragana: '[お]そうしき', kanji: '[お]葬式', meaning: 'đám tang', difficulty: 'medium', category: 'Events', lesson: 'Bài 31', section: 'main' },
  { id: '12', hiragana: 'しき', kanji: '式', meaning: 'lễ', difficulty: 'medium', category: 'Events', lesson: 'Bài 31', section: 'main' },
  { id: '13', hiragana: 'ほんしゃ', kanji: '本社', meaning: 'trụ sở chính, tổng công ty', difficulty: 'medium', category: 'Business', lesson: 'Bài 31', section: 'main' },
  { id: '14', hiragana: 'してん', kanji: '支店', meaning: 'chi nhánh', difficulty: 'medium', category: 'Business', lesson: 'Bài 31', section: 'main' },
  { id: '15', hiragana: 'きょうかい', kanji: '教会', meaning: 'nhà thờ', difficulty: 'medium', category: 'Places', lesson: 'Bài 31', section: 'main' },
  { id: '16', hiragana: 'だいがくいん', kanji: '大学院', meaning: 'cao học', difficulty: 'medium', category: 'Education', lesson: 'Bài 31', section: 'main' },
  { id: '17', hiragana: 'どうぶつえん', kanji: '動物園', meaning: 'sở thú', difficulty: 'medium', category: 'Places', lesson: 'Bài 31', section: 'main' },
  { id: '18', hiragana: 'おんせん', kanji: '温泉', meaning: 'suối nước nóng', difficulty: 'medium', category: 'Places', lesson: 'Bài 31', section: 'main' },
  { id: '19', hiragana: 'かえり', kanji: '帰り', meaning: 'chiều về', difficulty: 'medium', category: 'Time', lesson: 'Bài 31', section: 'main' },
  { id: '20', hiragana: 'おこさん', kanji: 'お子さん', meaning: 'con (dùng nói về con người khác)', difficulty: 'medium', category: 'Family', lesson: 'Bài 31', section: 'main' },
  { id: '21', hiragana: '～ごう', kanji: '～号', meaning: 'số (hiệu) ~', difficulty: 'medium', category: 'Suffixes', lesson: 'Bài 31', section: 'main' },
  { id: '22', hiragana: '～のほう', kanji: '～の方', meaning: 'phía ~', difficulty: 'medium', category: 'Location', lesson: 'Bài 31', section: 'main' },
  { id: '23', hiragana: 'バリ', kanji: '', meaning: 'Bali', difficulty: 'medium', category: 'Places', lesson: 'Bài 31', section: 'main' },
  { id: '24', hiragana: 'ピカソ', kanji: '', meaning: 'Pablo Picasso', difficulty: 'medium', category: 'Names', lesson: 'Bài 31', section: 'main' },
  { id: '25', hiragana: 'のぞみ', kanji: 'のぞみ', meaning: 'tên của tàu Shinkansen', difficulty: 'medium', category: 'Names', lesson: 'Bài 31', section: 'main' },
  { id: '26', hiragana: 'しんこうべ', kanji: '新神戸', meaning: 'tên ga ở tỉnh Hyogo', difficulty: 'medium', category: 'Places', lesson: 'Bài 31', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '27', hiragana: 'ざいごう', kanji: '在郷', meaning: 'ở lại, còn', difficulty: 'medium', category: 'Status', lesson: 'Bài 31', section: 'conversation' },
  { id: '28', hiragana: 'きいじめ', kanji: '際初め', meaning: 'kỳ thi đầu vào', difficulty: 'medium', category: 'Education', lesson: 'Bài 31', section: 'conversation' },
  { id: '29', hiragana: '～かげつ', kanji: '～ヶ月', meaning: '(trong) một tháng', difficulty: 'medium', category: 'Time', lesson: 'Bài 31', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '30', hiragana: 'むら', kanji: '村', meaning: 'làng', difficulty: 'medium', category: 'Places', lesson: 'Bài 31', section: 'reading' },
  { id: '31', hiragana: 'そつぎょうします III', kanji: '卒業します', meaning: 'tốt nghiệp', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 31', section: 'reading' },
  { id: '32', hiragana: 'えいがかん', kanji: '映画館', meaning: 'rạp chiếu phim, rạp phim', difficulty: 'medium', category: 'Places', lesson: 'Bài 31', section: 'reading' },
  { id: '33', hiragana: 'さびしい', kanji: '', meaning: 'chán', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 31', section: 'reading' },
  { id: '34', hiragana: 'そら', kanji: '空', meaning: 'bầu trời', difficulty: 'easy', category: 'Nature', lesson: 'Bài 31', section: 'reading' },
  { id: '35', hiragana: 'とじます II', kanji: '閉じます', meaning: 'nhầm', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 31', section: 'reading' },
  { id: '36', hiragana: 'とかい', kanji: '都会', meaning: 'thành phố', difficulty: 'medium', category: 'Places', lesson: 'Bài 31', section: 'reading' },
  { id: '37', hiragana: 'こどもたち', kanji: '子供たち', meaning: 'trẻ con, bọn trẻ', difficulty: 'medium', category: 'People', lesson: 'Bài 31', section: 'reading' },
  { id: '38', hiragana: 'じゆうに', kanji: '自由に', meaning: 'thoải mái', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 31', section: 'reading' },

  // Chuyên ngành học (専攻)
  { id: '39', hiragana: 'いがく', kanji: '医学', meaning: 'y học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '40', hiragana: 'かがく', kanji: '化学', meaning: 'dược học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '41', hiragana: 'けしょうひん', kanji: '化粧品', meaning: 'hóa học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '42', hiragana: 'せいかがく', kanji: '生化学', meaning: 'sinh hóa học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '43', hiragana: 'しんりがく', kanji: '心理学', meaning: 'tâm lý học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '44', hiragana: 'のうがく', kanji: '農学', meaning: 'nông học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '45', hiragana: 'ちりがく', kanji: '地理学', meaning: 'địa lý học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '46', hiragana: 'すうがく', kanji: '数学', meaning: 'toán học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '47', hiragana: 'ぶつりがく', kanji: '物理学', meaning: 'vật lý học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '48', hiragana: 'こうがく', kanji: '工学', meaning: 'kỹ thuật', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '49', hiragana: 'どぼくこうがく', kanji: '土木工学', meaning: 'kỹ thuật xây dựng', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '50', hiragana: 'でんしこうがく', kanji: '電子工学', meaning: 'kỹ thuật điện tử', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '51', hiragana: 'きかいこうがく', kanji: '機械工学', meaning: 'kỹ thuật cơ khí', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '52', hiragana: 'コンピューターこうがく', kanji: 'コンピューター工学', meaning: 'khoa học máy tính', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '53', hiragana: 'いでんしこうがく', kanji: '遺伝子工学', meaning: 'di truyền học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '54', hiragana: 'けんちくがく', kanji: '建築学', meaning: 'kiến trúc học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '55', hiragana: 'てんもんがく', kanji: '天文学', meaning: 'thiên văn học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '56', hiragana: 'かんきょうがく', kanji: '環境学', meaning: 'khoa học môi trường', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '57', hiragana: 'せいじがく', kanji: '政治学', meaning: 'chính trị học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '58', hiragana: 'こくさいかんけいがく', kanji: '国際関係学', meaning: 'quan hệ quốc tế', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '59', hiragana: 'ほうりつがく', kanji: '法律学', meaning: 'luật học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '60', hiragana: 'けいざいがく', kanji: '経済学', meaning: 'kinh tế học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '61', hiragana: 'けいえいがく', kanji: '経営学', meaning: 'kinh doanh', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '62', hiragana: 'しゃかいがく', kanji: '社会学', meaning: 'xã hội học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '63', hiragana: 'きょういくがく', kanji: '教育学', meaning: 'giáo dục học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '64', hiragana: 'ぶんがく', kanji: '文学', meaning: 'văn học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '65', hiragana: 'げんごがく', kanji: '言語学', meaning: 'ngôn ngữ học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '66', hiragana: 'てつがく', kanji: '哲学', meaning: 'triết học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '67', hiragana: 'しゅうきょうがく', kanji: '宗教学', meaning: 'tôn giáo học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '68', hiragana: 'げいじゅつ', kanji: '芸術', meaning: 'nghệ thuật', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '69', hiragana: 'びじゅつ', kanji: '美術', meaning: 'mỹ thuật', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '70', hiragana: 'おんがく', kanji: '音楽', meaning: 'âm nhạc', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' },
  { id: '71', hiragana: 'たいいくがく', kanji: '体育学', meaning: 'thể dục học', difficulty: 'hard', category: 'Academic', lesson: 'Bài 31', section: 'reading' }
];
