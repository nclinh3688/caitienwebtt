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

export const lesson20Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'いります I', kanji: '要ります I', meaning: 'cần [thị thực/visa]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 20', section: 'main' },
  { id: '2', hiragana: 'しらべます II', kanji: '調べます II', meaning: 'tìm hiểu, kiểm tra, điều tra', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 20', section: 'main' },
  { id: '3', hiragana: 'しゅうりします III', kanji: '修理します III', meaning: 'sửa chữa, tu sửa', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 20', section: 'main' },
  { id: '4', hiragana: 'ぼく', kanji: '僕', meaning: 'tôi, tớ', difficulty: 'easy', category: 'Pronouns', lesson: 'Bài 20', section: 'main' },
  { id: '5', hiragana: 'きみ', kanji: '君', meaning: 'cậu, bạn', difficulty: 'easy', category: 'Pronouns', lesson: 'Bài 20', section: 'main' },
  { id: '6', hiragana: '～くん', kanji: '君', meaning: 'anh ~ , cậu ~', difficulty: 'easy', category: 'Suffixes', lesson: 'Bài 20', section: 'main' },
  { id: '7', hiragana: 'うん', kanji: '', meaning: 'ừ', difficulty: 'easy', category: 'Interjections', lesson: 'Bài 20', section: 'main' },
  { id: '8', hiragana: 'ううん', kanji: '', meaning: 'không', difficulty: 'easy', category: 'Interjections', lesson: 'Bài 20', section: 'main' },
  { id: '9', hiragana: 'ことば', kanji: '言葉', meaning: 'từ, tiếng', difficulty: 'easy', category: 'Language', lesson: 'Bài 20', section: 'main' },
  { id: '10', hiragana: 'きもの', kanji: '着物', meaning: 'kimono', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 20', section: 'main' },
  { id: '11', hiragana: 'ビザ', kanji: '', meaning: 'thị thực, visa', difficulty: 'easy', category: 'Documents', lesson: 'Bài 20', section: 'main' },
  { id: '12', hiragana: 'はじめ', kanji: '初め', meaning: 'ban đầu, đầu tiên', difficulty: 'easy', category: 'Time', lesson: 'Bài 20', section: 'main' },
  { id: '13', hiragana: 'おわり', kanji: '終わり', meaning: 'kết thúc, hết phim', difficulty: 'easy', category: 'Time', lesson: 'Bài 20', section: 'main' },
  { id: '14', hiragana: 'こっち', kanji: '', meaning: 'phía này, chỗ này (cách nói thân mật của こちら)', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 20', section: 'main' },
  { id: '15', hiragana: 'そっち', kanji: '', meaning: 'phía đó, chỗ đó (cách nói thân mật của そちら)', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 20', section: 'main' },
  { id: '16', hiragana: 'あっち', kanji: '', meaning: 'phía kia, chỗ kia (cách nói thân mật của あちら)', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 20', section: 'main' },
  { id: '17', hiragana: 'どっち', kanji: '', meaning: 'cái nào (giữa hai cái), phía nào, đâu (cách nói thân mật của どちら)', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 20', section: 'main' },
  { id: '18', hiragana: 'みんな で', kanji: '', meaning: 'mọi người cùng', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 20', section: 'main' },
  { id: '19', hiragana: '～けど', kanji: '', meaning: '～, nhưng (cách nói thân mật của が)', difficulty: 'easy', category: 'Conjunctions', lesson: 'Bài 20', section: 'main' },
  { id: '20', hiragana: 'おなかが いっぱい です', kanji: 'お腹が いっぱい です', meaning: '(Tôi) no rồi', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 20', section: 'main' },
  
  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '21', hiragana: 'よかったら', kanji: '', meaning: 'nếu anh/chị thích thì', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 20', section: 'conversation' },
  { id: '22', hiragana: 'いろいろ', kanji: '', meaning: 'nhiều thứ', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 20', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '23', hiragana: 'おにいちゃん', kanji: 'お兄ちゃん', meaning: 'anh trai', difficulty: 'easy', category: 'Family', lesson: 'Bài 20', section: 'reading' },
  { id: '24', hiragana: 'おねえちゃん', kanji: 'お姉ちゃん', meaning: 'chị gái', difficulty: 'easy', category: 'Family', lesson: 'Bài 20', section: 'reading' },
  { id: '25', hiragana: 'おとうさん', kanji: 'お父さん', meaning: 'papa', difficulty: 'easy', category: 'Family', lesson: 'Bài 20', section: 'reading' },
  { id: '26', hiragana: 'おかあさん', kanji: 'お母さん', meaning: 'mama', difficulty: 'easy', category: 'Family', lesson: 'Bài 20', section: 'reading' },
  { id: '27', hiragana: 'しゃちょう', kanji: '社長', meaning: 'giám đốc', difficulty: 'easy', category: 'Positions', lesson: 'Bài 20', section: 'reading' },
  { id: '28', hiragana: 'おきゃくさま', kanji: 'お客様', meaning: 'quý khách', difficulty: 'easy', category: 'Business', lesson: 'Bài 20', section: 'reading' },
  { id: '29', hiragana: 'せんせい', kanji: '先生', meaning: 'thầy', difficulty: 'easy', category: 'Positions', lesson: 'Bài 20', section: 'reading' },
  { id: '30', hiragana: 'おなか', kanji: 'お腹', meaning: 'bụng', difficulty: 'easy', category: 'Body', lesson: 'Bài 20', section: 'reading' }
];
