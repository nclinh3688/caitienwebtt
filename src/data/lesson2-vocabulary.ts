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

export const lesson2Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'これ', kanji: '', meaning: 'cái này, đây', difficulty: 'easy', category: 'Pronouns', lesson: 'Bài 2', section: 'main' },
  { id: '2', hiragana: 'それ', kanji: '', meaning: 'cái đó, đó', difficulty: 'easy', category: 'Pronouns', lesson: 'Bài 2', section: 'main' },
  { id: '3', hiragana: 'あれ', kanji: '', meaning: 'cái kia, kia', difficulty: 'easy', category: 'Pronouns', lesson: 'Bài 2', section: 'main' },
  { id: '4', hiragana: 'この', kanji: '', meaning: 'cái ~ này', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 2', section: 'main' },
  { id: '5', hiragana: 'その', kanji: '', meaning: 'cái ~ đó', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 2', section: 'main' },
  { id: '6', hiragana: 'あの', kanji: '', meaning: 'cái ~ kia', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 2', section: 'main' },
  { id: '7', hiragana: 'ここ', kanji: '', meaning: 'chỗ này, đây', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'main' },
  { id: '8', hiragana: 'そこ', kanji: '', meaning: 'chỗ đó, đó', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'main' },
  { id: '9', hiragana: 'あそこ', kanji: '', meaning: 'chỗ kia, kia', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'main' },
  { id: '10', hiragana: 'どこ', kanji: '', meaning: 'chỗ nào, đâu', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'main' },
  { id: '11', hiragana: 'こちら', kanji: '', meaning: 'phía này, đây (lịch sự)', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'main' },
  { id: '12', hiragana: 'そちら', kanji: '', meaning: 'phía đó, đó (lịch sự)', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'main' },
  { id: '13', hiragana: 'あちら', kanji: '', meaning: 'phía kia, kia (lịch sự)', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'main' },
  { id: '14', hiragana: 'どちら', kanji: '', meaning: 'phía nào, đâu (lịch sự)', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'main' },
  { id: '15', hiragana: 'だれ', kanji: '誰', meaning: 'ai', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'main' },
  { id: '16', hiragana: 'どなた', kanji: 'どなた', meaning: 'ai (lịch sự)', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'main' },
  { id: '17', hiragana: 'なん', kanji: '何', meaning: 'cái gì', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'main' },
  { id: '18', hiragana: 'いくら', kanji: 'いくら', meaning: 'bao nhiêu (tiền)', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'main' },
  { id: '19', hiragana: 'いつ', kanji: '', meaning: 'bao giờ, khi nào', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'main' },
  { id: '20', hiragana: 'どう', kanji: '', meaning: 'như thế nào', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'main' },
  { id: '21', hiragana: 'どうですか', kanji: '', meaning: 'như thế nào?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'main' },
  { id: '22', hiragana: 'そうですね', kanji: '', meaning: 'Đúng vậy nhỉ', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },
  { id: '23', hiragana: 'そうですか', kanji: '', meaning: 'Vậy à?', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },
  { id: '24', hiragana: 'ええ', kanji: '', meaning: 'vâng, ừ', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },
  { id: '25', hiragana: 'いいえ', kanji: '', meaning: 'không', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },
  { id: '26', hiragana: 'わかりました', kanji: '分かりました', meaning: 'Tôi hiểu rồi', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },
  { id: '27', hiragana: 'わかりません', kanji: '分かりません', meaning: 'Tôi không hiểu', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },
  { id: '28', hiragana: 'しりません', kanji: '知りません', meaning: 'Tôi không biết', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },
  { id: '29', hiragana: 'ちがいます', kanji: '違います', meaning: 'Không đúng', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },
  { id: '30', hiragana: 'そうです', kanji: '', meaning: 'Đúng rồi', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },
  { id: '31', hiragana: 'あのう', kanji: '', meaning: 'À, ừm (dùng khi bắt đầu nói)', difficulty: 'easy', category: 'Interjections', lesson: 'Bài 2', section: 'main' },
  { id: '32', hiragana: 'ええと', kanji: '', meaning: 'À, ừm (dùng khi suy nghĩ)', difficulty: 'easy', category: 'Interjections', lesson: 'Bài 2', section: 'main' },
  { id: '33', hiragana: 'そうですね', kanji: '', meaning: 'Đúng vậy nhỉ', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },
  { id: '34', hiragana: 'そうですか', kanji: '', meaning: 'Vậy à?', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },
  { id: '35', hiragana: 'ええ', kanji: '', meaning: 'vâng, ừ', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },
  { id: '36', hiragana: 'いいえ', kanji: '', meaning: 'không', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },
  { id: '37', hiragana: 'わかりました', kanji: '分かりました', meaning: 'Tôi hiểu rồi', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '38', hiragana: 'これは なんですか', kanji: 'これは 何ですか', meaning: 'Đây là cái gì?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'conversation' },
  { id: '39', hiragana: 'それは なんですか', kanji: 'それは 何ですか', meaning: 'Đó là cái gì?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'conversation' },
  { id: '40', hiragana: 'あれは なんですか', kanji: 'あれは 何ですか', meaning: 'Kia là cái gì?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'conversation' },
  { id: '41', hiragana: 'これは いくらですか', kanji: 'これは いくらですか', meaning: 'Cái này bao nhiêu tiền?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'conversation' },
  { id: '42', hiragana: 'それは いくらですか', kanji: 'それは いくらですか', meaning: 'Cái đó bao nhiêu tiền?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'conversation' },
  { id: '43', hiragana: 'あれは いくらですか', kanji: 'あれは いくらですか', meaning: 'Cái kia bao nhiêu tiền?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'conversation' },
  { id: '44', hiragana: 'これは だれの ですか', kanji: 'これは 誰の ですか', meaning: 'Cái này của ai?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'conversation' },
  { id: '45', hiragana: 'それは だれの ですか', kanji: 'それは 誰の ですか', meaning: 'Cái đó của ai?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'conversation' },
  { id: '46', hiragana: 'あれは だれの ですか', kanji: 'あれは 誰の ですか', meaning: 'Cái kia của ai?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '47', hiragana: 'この', kanji: '', meaning: 'cái ~ này', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 2', section: 'reading' },
  { id: '48', hiragana: 'その', kanji: '', meaning: 'cái ~ đó', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 2', section: 'reading' },
  { id: '49', hiragana: 'あの', kanji: '', meaning: 'cái ~ kia', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 2', section: 'reading' },
  { id: '50', hiragana: 'どの', kanji: '', meaning: 'cái ~ nào', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 2', section: 'reading' },
  { id: '51', hiragana: 'ここ', kanji: '', meaning: 'chỗ này, đây', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'reading' },
  { id: '52', hiragana: 'そこ', kanji: '', meaning: 'chỗ đó, đó', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'reading' },
  { id: '53', hiragana: 'あそこ', kanji: '', meaning: 'chỗ kia, kia', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'reading' },
  { id: '54', hiragana: 'どこ', kanji: '', meaning: 'chỗ nào, đâu', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'reading' },
  { id: '55', hiragana: 'こちら', kanji: '', meaning: 'phía này, đây (lịch sự)', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'reading' },
  { id: '56', hiragana: 'そちら', kanji: '', meaning: 'phía đó, đó (lịch sự)', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'reading' },
  { id: '57', hiragana: 'あちら', kanji: '', meaning: 'phía kia, kia (lịch sự)', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'reading' },
  { id: '58', hiragana: 'どちら', kanji: '', meaning: 'phía nào, đâu (lịch sự)', difficulty: 'easy', category: 'Location', lesson: 'Bài 2', section: 'reading' },
  { id: '59', hiragana: 'だれ', kanji: '誰', meaning: 'ai', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'reading' },
  { id: '60', hiragana: 'どなた', kanji: 'どなた', meaning: 'ai (lịch sự)', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'reading' },
  { id: '61', hiragana: 'なん', kanji: '何', meaning: 'cái gì', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'reading' },
  { id: '62', hiragana: 'いくら', kanji: 'いくら', meaning: 'bao nhiêu (tiền)', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'reading' },
  { id: '63', hiragana: 'いつ', kanji: '', meaning: 'bao giờ, khi nào', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'reading' },
  { id: '64', hiragana: 'どう', kanji: '', meaning: 'như thế nào', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'reading' },
  { id: '65', hiragana: 'どうですか', kanji: '', meaning: 'như thế nào?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'reading' }
];
