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

export const lesson50Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'まいります I', kanji: '参ります', meaning: 'đi, đến (khiêm nhường ngữ của いきます, きます)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 50', section: 'main' },
  { id: '2', hiragana: 'いただきます I', kanji: 'いただきます', meaning: 'ăn, uống, nhận (khiêm nhường ngữ của たべます, のみます, もらいます)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 50', section: 'main' },
  { id: '3', hiragana: 'もうします I', kanji: '申します', meaning: 'nói, tên là ~ (khiêm nhường ngữ của いいます)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 50', section: 'main' },
  { id: '4', hiragana: 'いたします I', kanji: 'いたします', meaning: 'làm (khiêm nhường ngữ của します)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 50', section: 'main' },
  { id: '5', hiragana: 'はいけんします III', kanji: '拝見します', meaning: 'xem (khiêm nhường ngữ của みます)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 50', section: 'main' },
  { id: '6', hiragana: 'ぞんじます I', kanji: '存じます', meaning: 'biết (khiêm nhường ngữ của しります)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 50', section: 'main' },
  { id: '7', hiragana: 'うかがいます I', kanji: '伺います', meaning: 'hỏi, đến thăm (khiêm nhường ngữ của ききます, いきます)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 50', section: 'main' },
  { id: '8', hiragana: 'おめにかかります I', kanji: 'お目にかかります', meaning: 'gặp (khiêm nhường ngữ của あいます)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 50', section: 'main' },
  { id: '9', hiragana: 'いれます II', kanji: 'いれます', meaning: 'pha [cà phê]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 50', section: 'main' },
  { id: '10', hiragana: 'よういします III', kanji: '用意します', meaning: 'chuẩn bị sẵn', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 50', section: 'main' },
  { id: '11', hiragana: 'わたくし', kanji: '私', meaning: 'tôi (khiêm nhường ngữ của わたし)', difficulty: 'hard', category: 'Pronouns', lesson: 'Bài 50', section: 'main' },
  { id: '12', hiragana: 'ガイド', kanji: '', meaning: 'hướng dẫn viên du lịch', difficulty: 'medium', category: 'Professions', lesson: 'Bài 50', section: 'main' },
  { id: '13', hiragana: 'メールアドレス', kanji: '', meaning: 'địa chỉ email', difficulty: 'medium', category: 'Technology', lesson: 'Bài 50', section: 'main' },
  { id: '14', hiragana: 'スケジュール', kanji: '', meaning: 'lịch làm việc', difficulty: 'medium', category: 'Schedule', lesson: 'Bài 50', section: 'main' },
  { id: '15', hiragana: 'さらいしゅう', kanji: 'さ来週', meaning: 'tuần sau nữa', difficulty: 'medium', category: 'Time', lesson: 'Bài 50', section: 'main' },
  { id: '16', hiragana: 'さらいげつ', kanji: 'さ来月', meaning: 'tháng sau nữa', difficulty: 'medium', category: 'Time', lesson: 'Bài 50', section: 'main' },
  { id: '17', hiragana: 'さらいねん', kanji: 'さ来年', meaning: 'năm sau nữa', difficulty: 'medium', category: 'Time', lesson: 'Bài 50', section: 'main' },
  { id: '18', hiragana: 'はじめに', kanji: '初めに', meaning: 'trước hết, đầu tiên', difficulty: 'medium', category: 'Order', lesson: 'Bài 50', section: 'main' },
  { id: '19', hiragana: '※えどとうきょうはくぶつかん', kanji: '※江戸東京博物館', meaning: 'Bảo tàng Edo Tokyo', difficulty: 'hard', category: 'Museums', lesson: 'Bài 50', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '20', hiragana: 'きんちょうします III', kanji: '緊張します', meaning: 'hồi hộp', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 50', section: 'conversation' },
  { id: '21', hiragana: 'きん', kanji: '金', meaning: 'tiền thưởng', difficulty: 'medium', category: 'Money', lesson: 'Bài 50', section: 'conversation' },
  { id: '22', hiragana: 'きゅうきん', kanji: '旧金', meaning: 'tiền thưởng', difficulty: 'hard', category: 'Money', lesson: 'Bài 50', section: 'conversation' },
  { id: '23', hiragana: 'きりん', kanji: '', meaning: 'hươu cao cổ', difficulty: 'medium', category: 'Animals', lesson: 'Bài 50', section: 'conversation' },
  { id: '24', hiragana: 'ころ', kanji: '頃', meaning: 'lúc, thời', difficulty: 'medium', category: 'Time', lesson: 'Bài 50', section: 'conversation' },
  { id: '25', hiragana: 'かないます I', kanji: 'かないます', meaning: 'thành hiện thực [mơ ước ~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 50', section: 'conversation' },
  { id: '26', hiragana: 'おうえんします III', kanji: '応援します', meaning: 'động viên', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 50', section: 'conversation' },
  { id: '27', hiragana: 'こころから', kanji: '心から', meaning: 'từ đáy lòng', difficulty: 'medium', category: 'Feelings', lesson: 'Bài 50', section: 'conversation' },
  { id: '28', hiragana: 'かんしゃします III', kanji: '感謝します', meaning: 'cảm ơn', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 50', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '29', hiragana: 'おれい', kanji: 'お礼', meaning: 'cảm ơn', difficulty: 'medium', category: 'Thanks', lesson: 'Bài 50', section: 'reading' },
  { id: '30', hiragana: 'おげんきでいらっしゃいますか', kanji: 'お元気でいらっしゃいますか', meaning: 'Anh/Chị có khỏe không ạ? (kính ngữ của お元気ですか)', difficulty: 'hard', category: 'Questions', lesson: 'Bài 50', section: 'reading' },
  { id: '31', hiragana: 'めいわくをかけます I', kanji: '迷惑をかけます', meaning: 'làm phiền', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 50', section: 'reading' },
  { id: '32', hiragana: 'かつようします III', kanji: '活用します', meaning: 'phát huy', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 50', section: 'reading' },
  { id: '33', hiragana: '※ミュンヘン', kanji: '', meaning: 'München (Đức)', difficulty: 'hard', category: 'Places', lesson: 'Bài 50', section: 'reading' }
];
