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

export const lesson16Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'のります', kanji: '乗ります', meaning: 'đi, lên (tàu)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 16', section: 'main' },
  { id: '2', hiragana: 'おります', kanji: '降ります', meaning: 'xuống (tàu)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 16', section: 'main' },
  { id: '3', hiragana: 'のりかえます', kanji: '乗り換えます', meaning: 'chuyển đổi, đổi (tàu)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 16', section: 'main' },
  { id: '4', hiragana: 'あびます', kanji: '浴びます', meaning: 'tắm (vòi hoa sen)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 16', section: 'main' },
  { id: '5', hiragana: 'いれます', kanji: '入れます', meaning: 'cho vào, bỏ vào', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 16', section: 'main' },
  { id: '6', hiragana: 'だします', kanji: '出します', meaning: 'lấy ra, đưa ra, gửi', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 16', section: 'main' },
  { id: '7', hiragana: 'おろします', kanji: '下ろします', meaning: 'rút (tiền)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 16', section: 'main' },
  { id: '8', hiragana: 'はいります', kanji: '入ります', meaning: 'vào [đại học]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 16', section: 'main' },
  { id: '9', hiragana: 'でます', kanji: '出ます', meaning: 'ra, tốt nghiệp [đại học]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 16', section: 'main' },
  { id: '10', hiragana: 'おします', kanji: '押します', meaning: 'bấm, ấn', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 16', section: 'main' },
  { id: '11', hiragana: 'のみます', kanji: '飲みます', meaning: 'uống (bia, rượu)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 16', section: 'main' },
  { id: '12', hiragana: 'はじめます', kanji: '始めます', meaning: 'bắt đầu', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 16', section: 'main' },
  { id: '13', hiragana: 'けんがくします', kanji: '見学します', meaning: 'tham quan kiến tập', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 16', section: 'main' },
  { id: '14', hiragana: 'でんわします', kanji: '電話します', meaning: 'gọi điện thoại', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 16', section: 'main' },
  { id: '15', hiragana: 'わかい', kanji: '若い', meaning: 'trẻ', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 16', section: 'main' },
  { id: '16', hiragana: 'ながい', kanji: '長い', meaning: 'dài', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 16', section: 'main' },
  { id: '17', hiragana: 'みじかい', kanji: '短い', meaning: 'ngắn', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 16', section: 'main' },
  { id: '18', hiragana: 'あかるい', kanji: '明るい', meaning: 'sáng', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 16', section: 'main' },
  { id: '19', hiragana: 'くらい', kanji: '暗い', meaning: 'tối', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 16', section: 'main' },
  { id: '20', hiragana: 'からだ', kanji: '体', meaning: 'người, cơ thể', difficulty: 'easy', category: 'Body', lesson: 'Bài 16', section: 'main' },
  { id: '21', hiragana: 'あたま', kanji: '頭', meaning: 'đầu', difficulty: 'easy', category: 'Body', lesson: 'Bài 16', section: 'main' },
  { id: '22', hiragana: 'かみ', kanji: '髪', meaning: 'tóc', difficulty: 'easy', category: 'Body', lesson: 'Bài 16', section: 'main' },
  { id: '23', hiragana: 'かお', kanji: '顔', meaning: 'mặt', difficulty: 'easy', category: 'Body', lesson: 'Bài 16', section: 'main' },
  { id: '24', hiragana: 'め', kanji: '目', meaning: 'mắt', difficulty: 'easy', category: 'Body', lesson: 'Bài 16', section: 'main' },
  { id: '25', hiragana: 'みみ', kanji: '耳', meaning: 'tai', difficulty: 'easy', category: 'Body', lesson: 'Bài 16', section: 'main' },
  { id: '26', hiragana: 'はな', kanji: '鼻', meaning: 'mũi', difficulty: 'easy', category: 'Body', lesson: 'Bài 16', section: 'main' },
  { id: '27', hiragana: 'くち', kanji: '口', meaning: 'miệng', difficulty: 'easy', category: 'Body', lesson: 'Bài 16', section: 'main' },
  { id: '28', hiragana: 'は', kanji: '歯', meaning: 'răng', difficulty: 'easy', category: 'Body', lesson: 'Bài 16', section: 'main' },
  { id: '29', hiragana: 'おなか', kanji: 'お腹', meaning: 'bụng', difficulty: 'easy', category: 'Body', lesson: 'Bài 16', section: 'main' },
  { id: '30', hiragana: 'あし', kanji: '足', meaning: 'chân', difficulty: 'easy', category: 'Body', lesson: 'Bài 16', section: 'main' },
  { id: '31', hiragana: 'せ', kanji: '背', meaning: 'chiều cao (cơ thể)', difficulty: 'easy', category: 'Body', lesson: 'Bài 16', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '32', hiragana: 'おひきだしですか', kanji: 'お引き出しですか', meaning: 'Anh/Chị rút tiền ạ?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 16', section: 'conversation' },
  { id: '33', hiragana: 'まず', kanji: '', meaning: 'trước hết, đầu tiên', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 16', section: 'conversation' },
  { id: '34', hiragana: 'つぎ', kanji: '次', meaning: 'tiếp theo, sau đó', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 16', section: 'conversation' },
  { id: '35', hiragana: 'キャッシュカード', kanji: '', meaning: 'thẻ rút tiền mặt, thẻ ATM', difficulty: 'easy', category: 'Objects', lesson: 'Bài 16', section: 'conversation' },
  { id: '36', hiragana: 'あんしょうばんごう', kanji: '暗証番号', meaning: 'mã số bí mật (mật khẩu)', difficulty: 'easy', category: 'Objects', lesson: 'Bài 16', section: 'conversation' },
  { id: '37', hiragana: 'きんがく', kanji: '金額', meaning: 'số tiền, khoản tiền', difficulty: 'easy', category: 'Money', lesson: 'Bài 16', section: 'conversation' },
  { id: '38', hiragana: 'かくにん', kanji: '確認', meaning: 'sự xác nhận, sự kiểm tra lại', difficulty: 'easy', category: 'Actions', lesson: 'Bài 16', section: 'conversation' },
  { id: '39', hiragana: 'ボタン', kanji: '', meaning: 'nút', difficulty: 'easy', category: 'Objects', lesson: 'Bài 16', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '40', hiragana: 'おあずけいれ', kanji: 'お預け入れ', meaning: 'gửi tiền vào tài khoản', difficulty: 'easy', category: 'Banking', lesson: 'Bài 16', section: 'reading' },
  { id: '41', hiragana: 'おふりこみ', kanji: 'お振り込み', meaning: 'chuyển tiền vào tài khoản người khác', difficulty: 'easy', category: 'Banking', lesson: 'Bài 16', section: 'reading' },
  { id: '42', hiragana: 'おふりかえ', kanji: 'お振り替え', meaning: 'chuyển khoản', difficulty: 'easy', category: 'Banking', lesson: 'Bài 16', section: 'reading' },
  { id: '43', hiragana: 'おひきだし', kanji: 'お引き出し', meaning: 'rút tiền', difficulty: 'easy', category: 'Banking', lesson: 'Bài 16', section: 'reading' },
  { id: '44', hiragana: 'つうちょうきにゅう', kanji: '通帳記入', meaning: 'ghi sổ vào sổ', difficulty: 'easy', category: 'Banking', lesson: 'Bài 16', section: 'reading' },
  { id: '45', hiragana: 'ざんだかしょうかい', kanji: '残高照会', meaning: 'kiểm tra số tiền hiện có', difficulty: 'easy', category: 'Banking', lesson: 'Bài 16', section: 'reading' },
  { id: '46', hiragana: 'あんしょうばんごう', kanji: '暗証番号', meaning: 'mã số bí mật (mật khẩu)', difficulty: 'easy', category: 'Banking', lesson: 'Bài 16', section: 'reading' },
  { id: '47', hiragana: 'えん', kanji: '円', meaning: 'yen', difficulty: 'easy', category: 'Money', lesson: 'Bài 16', section: 'reading' },
  { id: '48', hiragana: 'かくにん', kanji: '確認', meaning: 'xác nhận', difficulty: 'easy', category: 'Actions', lesson: 'Bài 16', section: 'reading' }
];
