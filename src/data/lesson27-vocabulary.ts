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

export const lesson27Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'かいます I', kanji: '飼います', meaning: 'nuôi [động vật]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 27', section: 'main' },
  { id: '2', hiragana: 'はしります I', kanji: '走ります', meaning: 'chạy [trên đường]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 27', section: 'main' },
  { id: '3', hiragana: 'みえます II', kanji: '[山]が見えます', meaning: 'nhìn thấy [núi]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 27', section: 'main' },
  { id: '4', hiragana: 'きこえます II', kanji: '[音]が聞こえます', meaning: 'nghe thấy [tiếng, âm thanh]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 27', section: 'main' },
  { id: '5', hiragana: 'できます II', kanji: '[道]ができます', meaning: 'được làm, được hoàn thành [con đường ~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 27', section: 'main' },
  { id: '6', hiragana: 'ひらきます I', kanji: '開きます', meaning: 'mở, tổ chức [lớp]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 27', section: 'main' },
  { id: '7', hiragana: 'しんぱい [な]', kanji: '心配 [な]', meaning: 'lo lắng', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 27', section: 'main' },
  { id: '8', hiragana: 'ペット', kanji: '', meaning: 'thú cưng, động vật nuôi', difficulty: 'easy', category: 'Animals', lesson: 'Bài 27', section: 'main' },
  { id: '9', hiragana: 'とり', kanji: '鳥', meaning: 'chim', difficulty: 'easy', category: 'Animals', lesson: 'Bài 27', section: 'main' },
  { id: '10', hiragana: 'こえ', kanji: '声', meaning: 'tiếng', difficulty: 'medium', category: 'Body', lesson: 'Bài 27', section: 'main' },
  { id: '11', hiragana: 'なみ', kanji: '波', meaning: 'sóng', difficulty: 'medium', category: 'Nature', lesson: 'Bài 27', section: 'main' },
  { id: '12', hiragana: 'はなび', kanji: '花火', meaning: 'pháo hoa', difficulty: 'medium', category: 'Events', lesson: 'Bài 27', section: 'main' },
  { id: '13', hiragana: 'どうぐ', kanji: '道具', meaning: 'dụng cụ', difficulty: 'medium', category: 'Objects', lesson: 'Bài 27', section: 'main' },
  { id: '14', hiragana: 'クリーニング', kanji: '', meaning: 'giặt là', difficulty: 'medium', category: 'Services', lesson: 'Bài 27', section: 'main' },
  { id: '15', hiragana: 'いえ', kanji: '家', meaning: 'nhà', difficulty: 'easy', category: 'Places', lesson: 'Bài 27', section: 'main' },
  { id: '16', hiragana: 'マンション', kanji: '', meaning: 'chung cư', difficulty: 'medium', category: 'Places', lesson: 'Bài 27', section: 'main' },
  { id: '17', hiragana: 'キッチン', kanji: '', meaning: 'bếp', difficulty: 'medium', category: 'Places', lesson: 'Bài 27', section: 'main' },
  { id: '18', hiragana: '～きょうしつ', kanji: '～教室', meaning: 'lớp học ~', difficulty: 'medium', category: 'Places', lesson: 'Bài 27', section: 'main' },
  { id: '19', hiragana: 'パーティールーム', kanji: '', meaning: 'phòng tổ chức tiệc', difficulty: 'medium', category: 'Places', lesson: 'Bài 27', section: 'main' },
  { id: '20', hiragana: 'かた', kanji: '方', meaning: 'vị, ngài (kính ngữ của ひと)', difficulty: 'hard', category: 'Honorifics', lesson: 'Bài 27', section: 'main' },
  { id: '21', hiragana: '～ご', kanji: '～後', meaning: '～ sau (về mặt thời gian)', difficulty: 'medium', category: 'Time', lesson: 'Bài 27', section: 'main' },
  { id: '22', hiragana: '～しか', kanji: '', meaning: 'chỉ ~ (được dùng với thể phủ định)', difficulty: 'hard', category: 'Particles', lesson: 'Bài 27', section: 'main' },
  { id: '23', hiragana: 'ほかの', kanji: '', meaning: 'khác', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 27', section: 'main' },
  { id: '24', hiragana: 'はっきり', kanji: '', meaning: 'rõ ràng', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 27', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '25', hiragana: 'かぐ', kanji: '家具', meaning: 'đồ gỗ trong nhà', difficulty: 'medium', category: 'Objects', lesson: 'Bài 27', section: 'conversation' },
  { id: '26', hiragana: 'いつか', kanji: '', meaning: 'một lúc nào', difficulty: 'medium', category: 'Time', lesson: 'Bài 27', section: 'conversation' },
  { id: '27', hiragana: 'たてます II', kanji: '建てます', meaning: 'xây', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 27', section: 'conversation' },
  { id: '28', hiragana: 'すばらしい', kanji: '', meaning: 'tuyệt vời', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 27', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '29', hiragana: 'こどもたち', kanji: '子供たち', meaning: 'bọn trẻ', difficulty: 'medium', category: 'People', lesson: 'Bài 27', section: 'reading' },
  { id: '30', hiragana: 'だいすき [な]', kanji: '大好き [な]', meaning: 'rất thích', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 27', section: 'reading' },
  { id: '31', hiragana: 'しゅじんこう', kanji: '主人公', meaning: 'nhân vật chính', difficulty: 'hard', category: 'Literature', lesson: 'Bài 27', section: 'reading' },
  { id: '32', hiragana: 'かたち', kanji: '形', meaning: 'hình dạng', difficulty: 'medium', category: 'Objects', lesson: 'Bài 27', section: 'reading' },
  { id: '33', hiragana: 'ふしぎ [な]', kanji: '不思議 [な]', meaning: 'lạ, kỳ lạ', difficulty: 'hard', category: 'Adjectives', lesson: 'Bài 27', section: 'reading' },
  { id: '34', hiragana: 'ポケット', kanji: '', meaning: 'chiếc túi', difficulty: 'medium', category: 'Objects', lesson: 'Bài 27', section: 'reading' },
  { id: '35', hiragana: 'たとえば', kanji: '', meaning: 'ví dụ', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 27', section: 'reading' },
  { id: '36', hiragana: 'つけます II', kanji: '付けます', meaning: 'gắn', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 27', section: 'reading' },
  { id: '37', hiragana: 'じゆうに', kanji: '自由に', meaning: 'một cách tự do, thoải mái', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 27', section: 'reading' },
  { id: '38', hiragana: 'そら', kanji: '空', meaning: 'bầu trời', difficulty: 'easy', category: 'Nature', lesson: 'Bài 27', section: 'reading' },
  { id: '39', hiragana: 'とびます I', kanji: '飛びます', meaning: 'bay', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 27', section: 'reading' },
  { id: '40', hiragana: 'むかし', kanji: '昔', meaning: 'ngày xưa', difficulty: 'medium', category: 'Time', lesson: 'Bài 27', section: 'reading' },
  { id: '41', hiragana: 'じぶん', kanji: '自分', meaning: 'tự mình', difficulty: 'medium', category: 'Pronouns', lesson: 'Bài 27', section: 'reading' },
  { id: '42', hiragana: 'しょうらい', kanji: '将来', meaning: 'tương lai', difficulty: 'medium', category: 'Time', lesson: 'Bài 27', section: 'reading' },
  { id: '43', hiragana: 'ドラえもん', kanji: '', meaning: 'tên nhân vật xuất hiện trong truyện tranh', difficulty: 'hard', category: 'Names', lesson: 'Bài 27', section: 'reading' }
];
