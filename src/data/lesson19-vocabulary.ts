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

export const lesson19Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'のぼります I', kanji: '登ります I', meaning: 'leo (núi), lên', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 19', section: 'main' },
  { id: '2', hiragana: 'とまります I', kanji: '泊まります I', meaning: 'trọ [ở khách sạn]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 19', section: 'main' },
  { id: '3', hiragana: 'そうじします III', kanji: '掃除します III', meaning: 'dọn vệ sinh (căn phòng)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 19', section: 'main' },
  { id: '4', hiragana: 'せんたくします III', kanji: '洗濯します III', meaning: 'giặt (áo quần)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 19', section: 'main' },
  { id: '5', hiragana: 'なります II', kanji: 'なります II', meaning: 'trở thành, trở nên', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 19', section: 'main' },
  { id: '6', hiragana: 'ねむい', kanji: '眠い', meaning: 'buồn ngủ', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 19', section: 'main' },
  { id: '7', hiragana: 'つよい', kanji: '強い', meaning: 'mạnh', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 19', section: 'main' },
  { id: '8', hiragana: 'よわい', kanji: '弱い', meaning: 'yếu', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 19', section: 'main' },
  { id: '9', hiragana: 'れんしゅう', kanji: '練習', meaning: 'sự luyện tập', difficulty: 'easy', category: 'Activities', lesson: 'Bài 19', section: 'main' },
  { id: '10', hiragana: 'ゴルフ', kanji: '', meaning: 'gôn', difficulty: 'easy', category: 'Sports', lesson: 'Bài 19', section: 'main' },
  { id: '11', hiragana: 'すもう', kanji: '相撲', meaning: 'môn vật Sumo', difficulty: 'easy', category: 'Sports', lesson: 'Bài 19', section: 'main' },
  { id: '12', hiragana: 'おちゃ', kanji: 'お茶', meaning: 'trà đạo', difficulty: 'easy', category: 'Culture', lesson: 'Bài 19', section: 'main' },
  { id: '13', hiragana: 'ひ', kanji: '日', meaning: 'ngày', difficulty: 'easy', category: 'Time', lesson: 'Bài 19', section: 'main' },
  { id: '14', hiragana: 'ちょうし', kanji: '調子', meaning: 'tình trạng, trạng thái', difficulty: 'easy', category: 'Status', lesson: 'Bài 19', section: 'main' },
  { id: '15', hiragana: 'いちど', kanji: '一度', meaning: 'một lần', difficulty: 'easy', category: 'Time', lesson: 'Bài 19', section: 'main' },
  { id: '16', hiragana: 'いちども', kanji: '一度も', meaning: 'chưa lần nào, chưa bao giờ', difficulty: 'easy', category: 'Time', lesson: 'Bài 19', section: 'main' },
  { id: '17', hiragana: 'だんだん', kanji: '', meaning: 'dần dần', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 19', section: 'main' },
  { id: '18', hiragana: 'もうすぐ', kanji: '', meaning: 'sắp, sắp sửa', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 19', section: 'main' },
  { id: '19', hiragana: 'おかげさまで', kanji: '', meaning: 'Cám ơn anh/chị, nhờ anh/chị mà ~', difficulty: 'easy', category: 'Politeness', lesson: 'Bài 19', section: 'main' },
  { id: '20', hiragana: 'でも', kanji: '', meaning: 'nhưng', difficulty: 'easy', category: 'Conjunctions', lesson: 'Bài 19', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '21', hiragana: 'かんぱい', kanji: '乾杯', meaning: 'Cạn chén!/Nâng cốc!', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 19', section: 'conversation' },
  { id: '22', hiragana: 'ダイエット', kanji: '', meaning: 'việc ăn kiêng, chế độ giảm cân', difficulty: 'easy', category: 'Health', lesson: 'Bài 19', section: 'conversation' },
  { id: '23', hiragana: 'むりな', kanji: '無理な', meaning: 'không thể, quá sức', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 19', section: 'conversation' },
  { id: '24', hiragana: 'からだにいい', kanji: '体にいい', meaning: 'tốt cho sức khỏe', difficulty: 'easy', category: 'Health', lesson: 'Bài 19', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '25', hiragana: 'さどう', kanji: '茶道', meaning: 'Trà đạo', difficulty: 'easy', category: 'Culture', lesson: 'Bài 19', section: 'reading' },
  { id: '26', hiragana: 'かどう', kanji: '華道', meaning: 'nghệ thuật Cắm hoa', difficulty: 'easy', category: 'Culture', lesson: 'Bài 19', section: 'reading' },
  { id: '27', hiragana: 'しょどう', kanji: '書道', meaning: 'Thư pháp', difficulty: 'easy', category: 'Culture', lesson: 'Bài 19', section: 'reading' },
  { id: '28', hiragana: 'かぶき', kanji: '歌舞伎', meaning: 'kịch Kabuki', difficulty: 'easy', category: 'Culture', lesson: 'Bài 19', section: 'reading' },
  { id: '29', hiragana: 'のう', kanji: '能', meaning: 'kịch Nō', difficulty: 'easy', category: 'Culture', lesson: 'Bài 19', section: 'reading' },
  { id: '30', hiragana: 'ぶんらく', kanji: '文楽', meaning: 'nghệ thuật Bunraku', difficulty: 'easy', category: 'Culture', lesson: 'Bài 19', section: 'reading' },
  { id: '31', hiragana: 'すもう', kanji: '相撲', meaning: 'vật Sumo', difficulty: 'easy', category: 'Sports', lesson: 'Bài 19', section: 'reading' },
  { id: '32', hiragana: 'じゅうどう', kanji: '柔道', meaning: 'Judo', difficulty: 'easy', category: 'Sports', lesson: 'Bài 19', section: 'reading' },
  { id: '33', hiragana: 'けんどう', kanji: '剣道', meaning: 'Kiếm đạo', difficulty: 'easy', category: 'Sports', lesson: 'Bài 19', section: 'reading' },
  { id: '34', hiragana: 'からて', kanji: '空手', meaning: 'Karate', difficulty: 'easy', category: 'Sports', lesson: 'Bài 19', section: 'reading' },
  { id: '35', hiragana: 'え・らくご', kanji: '絵・落語', meaning: 'hài - nghệ thuật kể chuyện', difficulty: 'easy', category: 'Culture', lesson: 'Bài 19', section: 'reading' },
  { id: '36', hiragana: 'いご・しょうぎ', kanji: '囲碁・将棋', meaning: 'cờ vây - cờ tướng', difficulty: 'easy', category: 'Games', lesson: 'Bài 19', section: 'reading' },
  { id: '37', hiragana: 'パチンコ', kanji: '', meaning: 'trò chơi Pachinko', difficulty: 'easy', category: 'Games', lesson: 'Bài 19', section: 'reading' },
  { id: '38', hiragana: 'カラオケ', kanji: '', meaning: 'Karaoke', difficulty: 'easy', category: 'Entertainment', lesson: 'Bài 19', section: 'reading' },
  { id: '39', hiragana: 'ぼんおどり', kanji: '盆踊り', meaning: 'múa Bon', difficulty: 'easy', category: 'Culture', lesson: 'Bài 19', section: 'reading' }
];
