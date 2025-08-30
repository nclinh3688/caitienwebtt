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

export const lesson49Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'りようします III', kanji: '利用します', meaning: 'sử dụng', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 49', section: 'main' },
  { id: '2', hiragana: 'つとめます II', kanji: '勤めます', meaning: 'làm việc [ở công ty]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 49', section: 'main' },
  { id: '3', hiragana: 'かけます II', kanji: '掛けます', meaning: 'ngồi xuống [ghế]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 49', section: 'main' },
  { id: '4', hiragana: 'すごします I', kanji: '過ごします', meaning: 'trải qua', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 49', section: 'main' },
  { id: '5', hiragana: 'いらっしゃいます I', kanji: 'いらっしゃいます', meaning: 'ở, đến (kính ngữ của います, きます, います)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 49', section: 'main' },
  { id: '6', hiragana: 'めしあがります I', kanji: '召し上がります', meaning: 'ăn, uống (kính ngữ của たべます, のみます)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 49', section: 'main' },
  { id: '7', hiragana: 'おっしゃいます I', kanji: 'おっしゃいます', meaning: 'nói, tên là ~ (kính ngữ của いいます)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 49', section: 'main' },
  { id: '8', hiragana: 'ごらんになります I', kanji: 'ご覧になります', meaning: 'xem (kính ngữ của みます)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 49', section: 'main' },
  { id: '9', hiragana: 'ごぞんじです', kanji: 'ご存じです', meaning: 'biết (kính ngữ của しっています)', difficulty: 'hard', category: 'Knowledge', lesson: 'Bài 49', section: 'main' },
  { id: '10', hiragana: 'あいさつ', kanji: 'あいさつ', meaning: 'chào hỏi (~を します: chào), lời chào mừng', difficulty: 'medium', category: 'Greetings', lesson: 'Bài 49', section: 'main' },
  { id: '11', hiragana: 'りょかん', kanji: '旅館', meaning: 'nhà khách kiểu Nhật truyền thống', difficulty: 'hard', category: 'Accommodation', lesson: 'Bài 49', section: 'main' },
  { id: '12', hiragana: 'バスてい', kanji: 'バス停', meaning: 'bến xe buýt', difficulty: 'medium', category: 'Transportation', lesson: 'Bài 49', section: 'main' },
  { id: '13', hiragana: 'おくさま', kanji: '奥様', meaning: 'vợ của người khác (kính ngữ của おくさん)', difficulty: 'hard', category: 'Family', lesson: 'Bài 49', section: 'main' },
  { id: '14', hiragana: '〜さま', kanji: '〜様', meaning: '~ (kính ngữ của ~さん)', difficulty: 'medium', category: 'Suffixes', lesson: 'Bài 49', section: 'main' },
  { id: '15', hiragana: 'たまに', kanji: 'たまに', meaning: 'thỉnh thoảng', difficulty: 'medium', category: 'Frequency', lesson: 'Bài 49', section: 'main' },
  { id: '16', hiragana: 'どなたでも', kanji: 'どなたでも', meaning: 'vị nào cũng (kính ngữ của だれでも)', difficulty: 'hard', category: 'Pronouns', lesson: 'Bài 49', section: 'main' },
  { id: '17', hiragana: '〜といいいます', kanji: '〜と言います', meaning: 'tên là ~', difficulty: 'medium', category: 'Names', lesson: 'Bài 49', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '18', hiragana: 'ごねんまえ', kanji: '五年前', meaning: 'tố năm thứ ~', difficulty: 'hard', category: 'Time', lesson: 'Bài 49', section: 'conversation' },
  { id: '19', hiragana: 'しゅっせきします III', kanji: '出席します', meaning: 'bị sốt', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 49', section: 'conversation' },
  { id: '20', hiragana: 'よろしくおつたえください', kanji: 'よろしくお伝えください', meaning: 'Xin phép thầy tôi cúp máy ạ. (kính ngữ của しつれいします)', difficulty: 'hard', category: 'Requests', lesson: 'Bài 49', section: 'conversation' },
  { id: '21', hiragana: 'しつれいします III', kanji: '失礼します', meaning: 'Xin lỗi thầy tôi.', difficulty: 'hard', category: 'Apologies', lesson: 'Bài 49', section: 'conversation' },
  { id: '22', hiragana: '※ひまわりしょうがっこう', kanji: '※ひまわり小学校', meaning: 'trường tiểu học gia đình', difficulty: 'hard', category: 'Schools', lesson: 'Bài 49', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '23', hiragana: 'りれき', kanji: '履歴', meaning: 'lí lịch', difficulty: 'medium', category: 'Resume', lesson: 'Bài 49', section: 'reading' },
  { id: '24', hiragana: 'せんぱい', kanji: '先輩', meaning: 'khoa y', difficulty: 'medium', category: 'Seniors', lesson: 'Bài 49', section: 'reading' },
  { id: '25', hiragana: 'いがくぶ', kanji: '医学部', meaning: 'hướng dẫn, muốn trở thành', difficulty: 'hard', category: 'Departments', lesson: 'Bài 49', section: 'reading' },
  { id: '26', hiragana: 'めざします I', kanji: '目指します', meaning: 'học lên', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 49', section: 'reading' },
  { id: '27', hiragana: 'しんがく', kanji: '進学', meaning: 'tế bào IPS', difficulty: 'hard', category: 'Education', lesson: 'Bài 49', section: 'reading' },
  { id: '28', hiragana: 'ipsさいぼう', kanji: 'IPS細胞', meaning: 'phát triển', difficulty: 'hard', category: 'Science', lesson: 'Bài 49', section: 'reading' },
  { id: '29', hiragana: 'かいはつします III', kanji: '開発します', meaning: 'chuột', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 49', section: 'reading' },
  { id: '30', hiragana: 'マウス', kanji: '', meaning: 'người', difficulty: 'medium', category: 'Animals', lesson: 'Bài 49', section: 'reading' },
  { id: '31', hiragana: 'ノーベルしょう', kanji: 'ノーベル賞', meaning: 'nhận giải thưởng', difficulty: 'hard', category: 'Awards', lesson: 'Bài 49', section: 'reading' },
  { id: '32', hiragana: 'こうえんかい', kanji: '講演会', meaning: 'buổi nói chuyện', difficulty: 'hard', category: 'Events', lesson: 'Bài 49', section: 'reading' },
  { id: '33', hiragana: '※やまなかさん', kanji: '※山中さん', meaning: 'nhà nghiên cứu y học người Nhật (1962 - )', difficulty: 'hard', category: 'Names', lesson: 'Bài 49', section: 'reading' },
  { id: '34', hiragana: '※ノーベルしょう', kanji: '※ノーベル賞', meaning: 'giải Nobel', difficulty: 'hard', category: 'Awards', lesson: 'Bài 49', section: 'reading' }
];
