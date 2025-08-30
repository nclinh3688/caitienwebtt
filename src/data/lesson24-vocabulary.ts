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

export const lesson24Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'くれます II', kanji: 'くれます II', meaning: 'cho, tặng (tôi)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 24', section: 'main' },
  { id: '2', hiragana: 'なおします I', kanji: '直します I', meaning: 'chữa', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 24', section: 'main' },
  { id: '3', hiragana: 'つれていきます I', kanji: '連れて行きます I', meaning: 'dẫn (một ai đó) đi', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 24', section: 'main' },
  { id: '4', hiragana: 'つれてきます II', kanji: '連れて来ます II', meaning: 'dẫn (một ai đó) đến', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 24', section: 'main' },
  { id: '5', hiragana: 'おくりむかえます I', kanji: '送り迎えます I', meaning: 'tiễn (một ai đó)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 24', section: 'main' },
  { id: '6', hiragana: '人を', kanji: '人を', meaning: 'giới thiệu', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 24', section: 'main' },
  { id: '7', hiragana: 'しょうかいします III', kanji: '紹介します III', meaning: 'hướng dẫn, giới thiệu, dẫn đường', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 24', section: 'main' },
  { id: '8', hiragana: 'あんないします III', kanji: '案内します III', meaning: 'giải thích, trình bày', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 24', section: 'main' },
  { id: '9', hiragana: 'せつめいします III', kanji: '説明します III', meaning: 'giải thích', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 24', section: 'main' },
  { id: '10', hiragana: 'おじいさん', kanji: 'おじいさん', meaning: 'ông nội, ông ngoại, ông (cụ/lão)', difficulty: 'easy', category: 'Family', lesson: 'Bài 24', section: 'main' },
  { id: '11', hiragana: 'おばあさん', kanji: 'おばあさん', meaning: 'bà nội, bà ngoại, bà (cụ/lão)', difficulty: 'easy', category: 'Family', lesson: 'Bài 24', section: 'main' },
  { id: '12', hiragana: 'じゅんび', kanji: '準備', meaning: 'sự chuẩn bị', difficulty: 'easy', category: 'Actions', lesson: 'Bài 24', section: 'main' },
  { id: '13', hiragana: 'ひっこし', kanji: '引っ越し', meaning: 'sự chuyển nhà', difficulty: 'easy', category: 'Actions', lesson: 'Bài 24', section: 'main' },
  { id: '14', hiragana: 'おかし', kanji: 'お菓子', meaning: 'bánh kẹo', difficulty: 'easy', category: 'Food', lesson: 'Bài 24', section: 'main' },
  { id: '15', hiragana: 'ホームステイ', kanji: '', meaning: 'homestay', difficulty: 'easy', category: 'Activities', lesson: 'Bài 24', section: 'main' },
  { id: '16', hiragana: 'ぜんぶ', kanji: '全部', meaning: 'toàn bộ, tất cả', difficulty: 'easy', category: 'Quantity', lesson: 'Bài 24', section: 'main' },
  { id: '17', hiragana: 'じぶん', kanji: '自分', meaning: 'tự (mình)', difficulty: 'easy', category: 'Pronouns', lesson: 'Bài 24', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '18', hiragana: 'ほかに', kanji: '', meaning: 'ngoài ra, bên cạnh đó', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 24', section: 'conversation' },
  { id: '19', hiragana: 'ははのひ', kanji: '母の日', meaning: 'Ngày của Mẹ', difficulty: 'easy', category: 'Events', lesson: 'Bài 24', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '20', hiragana: 'おとしだま', kanji: 'お年玉', meaning: 'tiền mừng tuổi, tiền bố mẹ hoặc họ hàng tặng cho trẻ con trong ngày Tết', difficulty: 'easy', category: 'Money', lesson: 'Bài 24', section: 'reading' },
  { id: '21', hiragana: 'にゅうがくいわい', kanji: '入学祝い', meaning: 'tặng cho người vào học cấp mới, thường là tiền, văn phòng phẩm hoặc sách', difficulty: 'easy', category: 'Gifts', lesson: 'Bài 24', section: 'reading' },
  { id: '22', hiragana: 'そつぎょういわい', kanji: '卒業祝い', meaning: 'tặng cho người tốt nghiệp, thường là tiền, văn phòng phẩm hoặc sách', difficulty: 'easy', category: 'Gifts', lesson: 'Bài 24', section: 'reading' },
  { id: '23', hiragana: 'けっこんいわい', kanji: '結婚祝い', meaning: 'tặng cho người lập gia đình, thường là tiền hoặc đồ vật dùng trong nhà', difficulty: 'easy', category: 'Gifts', lesson: 'Bài 24', section: 'reading' },
  { id: '24', hiragana: 'しゅっさんいわい', kanji: '出産祝い', meaning: 'tặng cho người mới sinh con, thường là quần áo trẻ con, đồ chơi', difficulty: 'easy', category: 'Gifts', lesson: 'Bài 24', section: 'reading' },
  { id: '25', hiragana: 'おちゅうげん', kanji: 'お中元', meaning: 'tặng cho những người hàng ngày đã giúp đỡ mình như bác sĩ, thầy cô giáo, cấp trên, thường là đồ ăn', difficulty: 'easy', category: 'Gifts', lesson: 'Bài 24', section: 'reading' },
  { id: '26', hiragana: 'おせいぼ', kanji: 'お歳暮', meaning: 'tặng cho những người hàng ngày đã giúp đỡ mình như bác sĩ, thầy cô giáo, cấp trên, thường là đồ ăn', difficulty: 'easy', category: 'Gifts', lesson: 'Bài 24', section: 'reading' },
  { id: '27', hiragana: 'おこうでん', kanji: 'お香典', meaning: 'tiền cúng điếu cho gia đình có người qua đời', difficulty: 'easy', category: 'Money', lesson: 'Bài 24', section: 'reading' },
  { id: '28', hiragana: 'おみまい', kanji: 'お見舞い', meaning: 'tặng cho người bị bệnh, thường là hoa hoặc hoa quả', difficulty: 'easy', category: 'Gifts', lesson: 'Bài 24', section: 'reading' },
  { id: '29', hiragana: 'のしぶくろ', kanji: 'のし袋', meaning: 'một kiểu phong bì đặc biệt để đựng tiền khi tặng cho người khác', difficulty: 'easy', category: 'Objects', lesson: 'Bài 24', section: 'reading' }
];
