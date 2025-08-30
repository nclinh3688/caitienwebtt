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

export const lesson9Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'わかります', kanji: '', meaning: 'hiểu, nắm được', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 9', section: 'main' },
  { id: '2', hiragana: 'あります', kanji: '', meaning: 'có (sở hữu)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 9', section: 'main' },
  { id: '3', hiragana: 'すき', kanji: '好き', meaning: 'thích', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 9', section: 'main' },
  { id: '4', hiragana: 'きらい', kanji: '嫌い', meaning: 'ghét, không thích', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 9', section: 'main' },
  { id: '5', hiragana: 'じょうず', kanji: '上手', meaning: 'giỏi, khéo', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 9', section: 'main' },
  { id: '6', hiragana: 'へた', kanji: '下手', meaning: 'kém', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 9', section: 'main' },
  { id: '7', hiragana: 'のみもの', kanji: '飲み物', meaning: 'đồ uống', difficulty: 'easy', category: 'Food', lesson: 'Bài 9', section: 'main' },
  { id: '8', hiragana: 'りょうり', kanji: '料理', meaning: 'món ăn, việc nấu ăn', difficulty: 'easy', category: 'Food', lesson: 'Bài 9', section: 'main' },
  { id: '9', hiragana: 'スポーツ', kanji: '', meaning: 'thể thao', difficulty: 'easy', category: 'Sports', lesson: 'Bài 9', section: 'main' },
  { id: '10', hiragana: 'やきゅう', kanji: '野球', meaning: 'bóng chày', difficulty: 'easy', category: 'Sports', lesson: 'Bài 9', section: 'main' },
  { id: '11', hiragana: 'ダンス', kanji: '', meaning: 'nhảy, khiêu vũ', difficulty: 'easy', category: 'Activities', lesson: 'Bài 9', section: 'main' },
  { id: '12', hiragana: 'りょこう', kanji: '旅行', meaning: 'du lịch, chuyến du lịch', difficulty: 'easy', category: 'Activities', lesson: 'Bài 9', section: 'main' },
  { id: '13', hiragana: 'おんがく', kanji: '音楽', meaning: 'âm nhạc', difficulty: 'easy', category: 'Culture', lesson: 'Bài 9', section: 'main' },
  { id: '14', hiragana: 'うた', kanji: '歌', meaning: 'bài hát', difficulty: 'easy', category: 'Culture', lesson: 'Bài 9', section: 'main' },
  { id: '15', hiragana: 'クラシック', kanji: '', meaning: 'nhạc cổ điển', difficulty: 'easy', category: 'Music', lesson: 'Bài 9', section: 'main' },
  { id: '16', hiragana: 'ジャズ', kanji: '', meaning: 'nhạc jazz', difficulty: 'easy', category: 'Music', lesson: 'Bài 9', section: 'main' },
  { id: '17', hiragana: 'コンサート', kanji: '', meaning: 'buổi hòa nhạc', difficulty: 'easy', category: 'Events', lesson: 'Bài 9', section: 'main' },
  { id: '18', hiragana: 'カラオケ', kanji: '', meaning: 'karaoke', difficulty: 'easy', category: 'Activities', lesson: 'Bài 9', section: 'main' },
  { id: '19', hiragana: 'かぶき', kanji: '歌舞伎', meaning: 'Kabuki', difficulty: 'easy', category: 'Culture', lesson: 'Bài 9', section: 'main' },
  { id: '20', hiragana: 'え', kanji: '絵', meaning: 'tranh, hội họa', difficulty: 'easy', category: 'Art', lesson: 'Bài 9', section: 'main' },
  { id: '21', hiragana: 'じ', kanji: '字', meaning: 'chữ', difficulty: 'easy', category: 'Language', lesson: 'Bài 9', section: 'main' },
  { id: '22', hiragana: 'かんじ', kanji: '漢字', meaning: 'chữ Hán', difficulty: 'easy', category: 'Language', lesson: 'Bài 9', section: 'main' },
  { id: '23', hiragana: 'ひらがな', kanji: '', meaning: 'chữ Hiragana', difficulty: 'easy', category: 'Language', lesson: 'Bài 9', section: 'main' },
  { id: '24', hiragana: 'かたかな', kanji: 'カタカナ', meaning: 'chữ Katakana', difficulty: 'easy', category: 'Language', lesson: 'Bài 9', section: 'main' },
  { id: '25', hiragana: 'ローマじ', kanji: 'ローマ字', meaning: 'chữ La Mã', difficulty: 'easy', category: 'Language', lesson: 'Bài 9', section: 'main' },
  { id: '26', hiragana: 'こまかいおかね', kanji: '細かいお金', meaning: 'tiền lẻ', difficulty: 'easy', category: 'Money', lesson: 'Bài 9', section: 'main' },
  { id: '27', hiragana: 'チケット', kanji: '', meaning: 'vé', difficulty: 'easy', category: 'Objects', lesson: 'Bài 9', section: 'main' },
  { id: '28', hiragana: 'じかん', kanji: '時間', meaning: 'thời gian', difficulty: 'easy', category: 'Time', lesson: 'Bài 9', section: 'main' },
  { id: '29', hiragana: 'ようじ', kanji: '用事', meaning: 'việc bận, công chuyện', difficulty: 'easy', category: 'Work', lesson: 'Bài 9', section: 'main' },
  { id: '30', hiragana: 'やくそく', kanji: '約束', meaning: 'cuộc hẹn, lời hứa', difficulty: 'easy', category: 'Social', lesson: 'Bài 9', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '31', hiragana: 'かしてください', kanji: '貸してください', meaning: 'Hãy cho tôi mượn', difficulty: 'easy', category: 'Requests', lesson: 'Bài 9', section: 'conversation' },
  { id: '32', hiragana: 'いいですよ', kanji: '', meaning: 'Được chứ./Được ạ.', difficulty: 'easy', category: 'Responses', lesson: 'Bài 9', section: 'conversation' },
  { id: '33', hiragana: 'ざんねんですが', kanji: '', meaning: 'Tôi xin lỗi, nhưng...', difficulty: 'easy', category: 'Apologies', lesson: 'Bài 9', section: 'conversation' },
  { id: '34', hiragana: 'ああ', kanji: '', meaning: 'Anh/Ôi', difficulty: 'easy', category: 'Interjections', lesson: 'Bài 9', section: 'conversation' },
  { id: '35', hiragana: 'いっしょにいかがですか', kanji: 'いっしょに如何ですか', meaning: 'Anh/Chị cùng ~ với tôi không?', difficulty: 'easy', category: 'Invitations', lesson: 'Bài 9', section: 'conversation' },
  { id: '36', hiragana: 'ちょっと', kanji: '', meaning: 'có lẽ không được rồi', difficulty: 'easy', category: 'Responses', lesson: 'Bài 9', section: 'conversation' },
  { id: '37', hiragana: 'だめですか', kanji: '', meaning: 'Không được à?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 9', section: 'conversation' },
  { id: '38', hiragana: 'またこんどおねがいします', kanji: 'また今度お願いします', meaning: 'Hẹn anh/chị lần sau vậy', difficulty: 'easy', category: 'Responses', lesson: 'Bài 9', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '39', hiragana: 'ポップス', kanji: '', meaning: 'nhạc pop', difficulty: 'easy', category: 'Music', lesson: 'Bài 9', section: 'reading' },
  { id: '40', hiragana: 'ロック', kanji: '', meaning: 'nhạc rốc', difficulty: 'easy', category: 'Music', lesson: 'Bài 9', section: 'reading' },
  { id: '41', hiragana: 'ラテン', kanji: '', meaning: 'nhạc châu Mỹ Latin', difficulty: 'easy', category: 'Music', lesson: 'Bài 9', section: 'reading' },
  { id: '42', hiragana: 'みんよう', kanji: '民謡', meaning: 'dân ca', difficulty: 'easy', category: 'Music', lesson: 'Bài 9', section: 'reading' },
  { id: '43', hiragana: 'えんか', kanji: '演歌', meaning: 'enka', difficulty: 'easy', category: 'Music', lesson: 'Bài 9', section: 'reading' },
  { id: '44', hiragana: 'ミュージカル', kanji: '', meaning: 'Ca kịch', difficulty: 'easy', category: 'Theater', lesson: 'Bài 9', section: 'reading' },
  { id: '45', hiragana: 'オペラ', kanji: '', meaning: 'Ô-pê-ra', difficulty: 'easy', category: 'Theater', lesson: 'Bài 9', section: 'reading' },
  { id: '46', hiragana: 'えいが', kanji: '映画', meaning: 'Điện ảnh', difficulty: 'easy', category: 'Entertainment', lesson: 'Bài 9', section: 'reading' },
  { id: '47', hiragana: 'SF', kanji: '', meaning: 'phim khoa học viễn tưởng', difficulty: 'easy', category: 'Movies', lesson: 'Bài 9', section: 'reading' },
  { id: '48', hiragana: 'ホラー', kanji: '', meaning: 'phim kinh dị', difficulty: 'easy', category: 'Movies', lesson: 'Bài 9', section: 'reading' },
  { id: '49', hiragana: 'アニメ', kanji: '', meaning: 'phim hoạt hình', difficulty: 'easy', category: 'Movies', lesson: 'Bài 9', section: 'reading' },
  { id: '50', hiragana: 'ドキュメンタリー', kanji: '', meaning: 'phim tài liệu', difficulty: 'easy', category: 'Movies', lesson: 'Bài 9', section: 'reading' },
  { id: '51', hiragana: 'れんあい', kanji: '恋愛', meaning: 'phim tình yêu', difficulty: 'easy', category: 'Movies', lesson: 'Bài 9', section: 'reading' },
  { id: '52', hiragana: 'ミステリー', kanji: '', meaning: 'phim ly kỳ, bí ẩn', difficulty: 'easy', category: 'Movies', lesson: 'Bài 9', section: 'reading' },
  { id: '53', hiragana: 'ぶんがく', kanji: '文学', meaning: 'phim văn nghệ', difficulty: 'easy', category: 'Movies', lesson: 'Bài 9', section: 'reading' },
  { id: '54', hiragana: 'せんそう', kanji: '戦争', meaning: 'phim chiến tranh', difficulty: 'easy', category: 'Movies', lesson: 'Bài 9', section: 'reading' },
  { id: '55', hiragana: 'アクション', kanji: '', meaning: 'phim hành động', difficulty: 'easy', category: 'Movies', lesson: 'Bài 9', section: 'reading' },
  { id: '56', hiragana: 'きげき', kanji: '喜劇', meaning: 'phim hài', difficulty: 'easy', category: 'Movies', lesson: 'Bài 9', section: 'reading' },
  { id: '57', hiragana: 'ソフトボール', kanji: '', meaning: 'soft-ball', difficulty: 'easy', category: 'Sports', lesson: 'Bài 9', section: 'reading' },
  { id: '58', hiragana: 'サッカー', kanji: '', meaning: 'bóng đá', difficulty: 'easy', category: 'Sports', lesson: 'Bài 9', section: 'reading' },
  { id: '59', hiragana: 'ラグビー', kanji: '', meaning: 'bóng bầu dục', difficulty: 'easy', category: 'Sports', lesson: 'Bài 9', section: 'reading' },
  { id: '60', hiragana: 'バレーボール', kanji: '', meaning: 'bóng chuyền', difficulty: 'easy', category: 'Sports', lesson: 'Bài 9', section: 'reading' }
];