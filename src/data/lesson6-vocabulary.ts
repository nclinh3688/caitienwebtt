export interface VocabularyWord {
  section?: 'main' | 'conversation' | 'reading'; // Thêm trường section
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

export const lesson6Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'たべます', kanji: '食べます', meaning: 'ăn', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 6', section: 'main' },
  { id: '2', hiragana: 'のみます', kanji: '飲みます', meaning: 'uống', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 6', section: 'main' },
  { id: '3', hiragana: 'すいます', kanji: '吸います', meaning: 'hút, hít', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 6', section: 'main' },
  { id: '4', hiragana: 'みます', kanji: '見ます', meaning: 'xem, nhìn', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 6', section: 'main' },
  { id: '5', hiragana: 'ききます', kanji: '聞きます', meaning: 'nghe', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 6', section: 'main' },
  { id: '6', hiragana: 'よみます', kanji: '読みます', meaning: 'đọc', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 6', section: 'main' },
  { id: '7', hiragana: 'かきます', kanji: '書きます', meaning: 'viết', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 6', section: 'main' },
  { id: '8', hiragana: 'かいます', kanji: '買います', meaning: 'mua', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 6', section: 'main' },
  { id: '9', hiragana: 'とります', kanji: '取ります', meaning: 'lấy, cầm', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 6', section: 'main' },
  { id: '10', hiragana: 'つくります', kanji: '作ります', meaning: 'làm, tạo ra', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 6', section: 'main' },
  { id: '11', hiragana: 'あいます', kanji: '会います', meaning: 'gặp', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 6', section: 'main' },
  { id: '12', hiragana: 'ごはん', kanji: 'ご飯', meaning: 'cơm, bữa ăn', difficulty: 'easy', category: 'Food', lesson: 'Bài 6', section: 'main' },
  { id: '13', hiragana: 'あさごはん', kanji: '朝ご飯', meaning: 'bữa sáng', difficulty: 'easy', category: 'Food', lesson: 'Bài 6', section: 'main' },
  { id: '14', hiragana: 'ひるごはん', kanji: '昼ご飯', meaning: 'bữa trưa', difficulty: 'easy', category: 'Food', lesson: 'Bài 6', section: 'main' },
  { id: '15', hiragana: 'ばんごはん', kanji: '晩ご飯', meaning: 'bữa tối', difficulty: 'easy', category: 'Food', lesson: 'Bài 6', section: 'main' },
  { id: '16', hiragana: 'パン', kanji: '', meaning: 'bánh mì', difficulty: 'easy', category: 'Food', lesson: 'Bài 6', section: 'main' },
  { id: '17', hiragana: 'たまご', kanji: '卵', meaning: 'trứng', difficulty: 'easy', category: 'Food', lesson: 'Bài 6', section: 'main' },
  { id: '18', hiragana: 'にく', kanji: '肉', meaning: 'thịt', difficulty: 'easy', category: 'Food', lesson: 'Bài 6', section: 'main' },
  { id: '19', hiragana: 'さかな', kanji: '魚', meaning: 'cá', difficulty: 'easy', category: 'Food', lesson: 'Bài 6', section: 'main' },
  { id: '20', hiragana: 'やさい', kanji: '野菜', meaning: 'rau', difficulty: 'easy', category: 'Food', lesson: 'Bài 6', section: 'main' },
  { id: '21', hiragana: 'くだもの', kanji: '果物', meaning: 'trái cây', difficulty: 'easy', category: 'Food', lesson: 'Bài 6', section: 'main' },
  { id: '22', hiragana: 'みず', kanji: '水', meaning: 'nước', difficulty: 'easy', category: 'Drinks', lesson: 'Bài 6', section: 'main' },
  { id: '23', hiragana: 'おちゃ', kanji: 'お茶', meaning: 'trà', difficulty: 'easy', category: 'Drinks', lesson: 'Bài 6', section: 'main' },
  { id: '24', hiragana: 'ぎゅうにゅう', kanji: '牛乳', meaning: 'sữa bò', difficulty: 'easy', category: 'Drinks', lesson: 'Bài 6', section: 'main' },
  { id: '25', hiragana: 'ジュース', kanji: '', meaning: 'nước trái cây', difficulty: 'easy', category: 'Drinks', lesson: 'Bài 6', section: 'main' },
  { id: '26', hiragana: 'ビール', kanji: '', meaning: 'bia', difficulty: 'easy', category: 'Drinks', lesson: 'Bài 6', section: 'main' },
  { id: '27', hiragana: 'おさけ', kanji: 'お酒', meaning: 'rượu', difficulty: 'easy', category: 'Drinks', lesson: 'Bài 6', section: 'main' },
  { id: '28', hiragana: 'たばこ', kanji: '煙草', meaning: 'thuốc lá', difficulty: 'easy', category: 'Objects', lesson: 'Bài 6', section: 'main' },
  { id: '29', hiragana: 'てがみ', kanji: '手紙', meaning: 'thư', difficulty: 'easy', category: 'Objects', lesson: 'Bài 6', section: 'main' },
  { id: '30', hiragana: 'レポート', kanji: '', meaning: 'báo cáo', difficulty: 'easy', category: 'Objects', lesson: 'Bài 6', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '31', hiragana: 'おいしい', kanji: '', meaning: 'ngon', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 6', section: 'conversation' },
  { id: '32', hiragana: 'まずい', kanji: '', meaning: 'dở, không ngon', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 6', section: 'conversation' },
  { id: '33', hiragana: 'あめ', kanji: '雨', meaning: 'mưa', difficulty: 'easy', category: 'Weather', lesson: 'Bài 6', section: 'conversation' },
  { id: '34', hiragana: 'ゆき', kanji: '雪', meaning: 'tuyết', difficulty: 'easy', category: 'Weather', lesson: 'Bài 6', section: 'conversation' },
  { id: '35', hiragana: 'かぜ', kanji: '風', meaning: 'gió', difficulty: 'easy', category: 'Weather', lesson: 'Bài 6', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '36', hiragana: 'はれ', kanji: '晴れ', meaning: 'nắng, quang đãng', difficulty: 'easy', category: 'Weather', lesson: 'Bài 6', section: 'reading' },
  { id: '37', hiragana: 'くもり', kanji: '曇り', meaning: 'có mây', difficulty: 'easy', category: 'Weather', lesson: 'Bài 6', section: 'reading' },
  { id: '38', hiragana: 'あつい', kanji: '暑い', meaning: 'nóng', difficulty: 'easy', category: 'Weather', lesson: 'Bài 6', section: 'reading' },
  { id: '39', hiragana: 'さむい', kanji: '寒い', meaning: 'lạnh', difficulty: 'easy', category: 'Weather', lesson: 'Bài 6', section: 'reading' },
  { id: '40', hiragana: 'あたたかい', kanji: '暖かい', meaning: 'ấm áp', difficulty: 'easy', category: 'Weather', lesson: 'Bài 6', section: 'reading' }
];
