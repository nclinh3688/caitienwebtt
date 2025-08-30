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

export const lesson28Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'うれます II', kanji: '売れます', meaning: 'bán chạy [bánh mì ~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 28', section: 'main' },
  { id: '2', hiragana: 'おどります I', kanji: '踊ります', meaning: 'múa, nhảy', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 28', section: 'main' },
  { id: '3', hiragana: 'かみます I', kanji: '', meaning: 'nhai, cắn', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 28', section: 'main' },
  { id: '4', hiragana: 'えらびます I', kanji: '選びます', meaning: 'lựa, lựa chọn', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 28', section: 'main' },
  { id: '5', hiragana: 'かよいます I', kanji: '通います', meaning: 'đi học [đại học]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 28', section: 'main' },
  { id: '6', hiragana: 'めもします III', kanji: 'メモします', meaning: 'ghi lại, memo', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 28', section: 'main' },
  { id: '7', hiragana: 'まじめ [な]', kanji: '', meaning: 'nghiêm túc, ngoan', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 28', section: 'main' },
  { id: '8', hiragana: 'ねっしん [な]', kanji: '熱心 [な]', meaning: 'nhiệt tình', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 28', section: 'main' },
  { id: '9', hiragana: 'えらい', kanji: '偉い', meaning: 'siêu, giỏi', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 28', section: 'main' },
  { id: '10', hiragana: 'ちょうどいい', kanji: '', meaning: 'vừa vặn', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 28', section: 'main' },
  { id: '11', hiragana: 'けしき', kanji: '景色', meaning: 'phong cảnh', difficulty: 'medium', category: 'Nature', lesson: 'Bài 28', section: 'main' },
  { id: '12', hiragana: 'びよういん', kanji: '美容院', meaning: 'hiệu làm đẹp', difficulty: 'medium', category: 'Places', lesson: 'Bài 28', section: 'main' },
  { id: '13', hiragana: 'だいどころ', kanji: '台所', meaning: 'nhà bếp', difficulty: 'medium', category: 'Places', lesson: 'Bài 28', section: 'main' },
  { id: '14', hiragana: 'けいけん', kanji: '経験', meaning: 'kinh nghiệm (~があります:có ~, ~をします:làm ~)', difficulty: 'medium', category: 'Abstract', lesson: 'Bài 28', section: 'main' },
  { id: '15', hiragana: 'ちから', kanji: '力', meaning: 'sức mạnh', difficulty: 'medium', category: 'Abstract', lesson: 'Bài 28', section: 'main' },
  { id: '16', hiragana: 'にんき', kanji: '人気', meaning: 'được yêu thích (([が きかい～] : được [sinh viên] yêu thích))', difficulty: 'medium', category: 'Abstract', lesson: 'Bài 28', section: 'main' },
  { id: '17', hiragana: 'かたち', kanji: '形', meaning: 'hình dạng', difficulty: 'medium', category: 'Objects', lesson: 'Bài 28', section: 'main' },
  { id: '18', hiragana: 'いろ', kanji: '色', meaning: 'màu sắc', difficulty: 'medium', category: 'Objects', lesson: 'Bài 28', section: 'main' },
  { id: '19', hiragana: 'あじ', kanji: '味', meaning: 'vị', difficulty: 'medium', category: 'Objects', lesson: 'Bài 28', section: 'main' },
  { id: '20', hiragana: 'ガム', kanji: '', meaning: 'kẹo cao su', difficulty: 'medium', category: 'Food', lesson: 'Bài 28', section: 'main' },
  { id: '21', hiragana: 'しなもの', kanji: '品物', meaning: 'hàng hóa', difficulty: 'medium', category: 'Objects', lesson: 'Bài 28', section: 'main' },
  { id: '22', hiragana: 'ねだん', kanji: '値段', meaning: 'giá cả', difficulty: 'medium', category: 'Business', lesson: 'Bài 28', section: 'main' },
  { id: '23', hiragana: 'きゅうりょう', kanji: '給料', meaning: 'lương', difficulty: 'medium', category: 'Business', lesson: 'Bài 28', section: 'main' },
  { id: '24', hiragana: 'ボーナス', kanji: '', meaning: 'thưởng', difficulty: 'medium', category: 'Business', lesson: 'Bài 28', section: 'main' },
  { id: '25', hiragana: 'ゲーム', kanji: '', meaning: 'trò chơi, game', difficulty: 'medium', category: 'Entertainment', lesson: 'Bài 28', section: 'main' },
  { id: '26', hiragana: 'ばんぐみ', kanji: '番組', meaning: 'chương trình', difficulty: 'medium', category: 'Entertainment', lesson: 'Bài 28', section: 'main' },
  { id: '27', hiragana: 'ドラマ', kanji: '', meaning: 'phim truyền hình', difficulty: 'medium', category: 'Entertainment', lesson: 'Bài 28', section: 'main' },
  { id: '28', hiragana: 'かし', kanji: '歌', meaning: 'ca sĩ', difficulty: 'medium', category: 'Professions', lesson: 'Bài 28', section: 'main' },
  { id: '29', hiragana: 'しょうせつ', kanji: '小説', meaning: 'tiểu thuyết', difficulty: 'medium', category: 'Literature', lesson: 'Bài 28', section: 'main' },
  { id: '30', hiragana: 'しょうせつか', kanji: '小説家', meaning: 'nhà văn, tiểu thuyết gia', difficulty: 'medium', category: 'Professions', lesson: 'Bài 28', section: 'main' },
  { id: '31', hiragana: '～か', kanji: '～家', meaning: 'nhà ~', difficulty: 'medium', category: 'Suffixes', lesson: 'Bài 28', section: 'main' },
  { id: '32', hiragana: '～き', kanji: '～機', meaning: 'máy ~', difficulty: 'medium', category: 'Suffixes', lesson: 'Bài 28', section: 'main' },
  { id: '33', hiragana: 'むすこ', kanji: '息子', meaning: 'con trai (của mình)', difficulty: 'medium', category: 'Family', lesson: 'Bài 28', section: 'main' },
  { id: '34', hiragana: 'むすこさん', kanji: '息子さん', meaning: 'con trai (người khác)', difficulty: 'medium', category: 'Family', lesson: 'Bài 28', section: 'main' },
  { id: '35', hiragana: 'むすめ', kanji: '娘', meaning: 'con gái (của mình)', difficulty: 'medium', category: 'Family', lesson: 'Bài 28', section: 'main' },
  { id: '36', hiragana: 'むすめさん', kanji: '娘さん', meaning: 'con gái (người khác)', difficulty: 'medium', category: 'Family', lesson: 'Bài 28', section: 'main' },
  { id: '37', hiragana: 'じぶん', kanji: '自分', meaning: 'mình', difficulty: 'medium', category: 'Pronouns', lesson: 'Bài 28', section: 'main' },
  { id: '38', hiragana: 'しょうらい', kanji: '将来', meaning: 'tương lai', difficulty: 'medium', category: 'Time', lesson: 'Bài 28', section: 'main' },
  { id: '39', hiragana: 'しばらく', kanji: '', meaning: 'một lúc', difficulty: 'medium', category: 'Time', lesson: 'Bài 28', section: 'main' },
  { id: '40', hiragana: 'たいてい', kanji: '', meaning: 'thường thì', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 28', section: 'main' },
  { id: '41', hiragana: 'それに', kanji: '', meaning: 'hơn nữa', difficulty: 'medium', category: 'Conjunctions', lesson: 'Bài 28', section: 'main' },
  { id: '42', hiragana: 'それで', kanji: '', meaning: 'vì thế', difficulty: 'medium', category: 'Conjunctions', lesson: 'Bài 28', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '43', hiragana: '[ちょっと] おねがい が あるんですが。', kanji: '', meaning: 'Tôi có [chút] việc muốn nhờ.', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 28', section: 'conversation' },
  { id: '44', hiragana: 'じつは', kanji: '実は', meaning: 'thực ra', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 28', section: 'conversation' },
  { id: '45', hiragana: 'かいわ', kanji: '会話', meaning: 'hội thoại', difficulty: 'medium', category: 'Language', lesson: 'Bài 28', section: 'conversation' },
  { id: '46', hiragana: 'うーん', kanji: '', meaning: 'ừ', difficulty: 'medium', category: 'Responses', lesson: 'Bài 28', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '47', hiragana: 'おしらせ', kanji: 'お知らせ', meaning: 'thông báo', difficulty: 'medium', category: 'Communication', lesson: 'Bài 28', section: 'reading' },
  { id: '48', hiragana: 'さんかします III', kanji: '参加します', meaning: 'tham gia [lớp]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 28', section: 'reading' },
  { id: '49', hiragana: 'ひにち', kanji: '日時', meaning: 'thời gian (ngày)', difficulty: 'medium', category: 'Time', lesson: 'Bài 28', section: 'reading' },
  { id: '50', hiragana: 'たいかいいくかん', kanji: '体育館', meaning: 'nhà thi đấu thể thao', difficulty: 'medium', category: 'Places', lesson: 'Bài 28', section: 'reading' },
  { id: '51', hiragana: 'むりょう', kanji: '無料', meaning: 'miễn phí', difficulty: 'medium', category: 'Business', lesson: 'Bài 28', section: 'reading' },
  { id: '52', hiragana: 'さそいます I', kanji: '誘います', meaning: 'mời', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 28', section: 'reading' },
  { id: '53', hiragana: 'イベント', kanji: '', meaning: 'sự kiện', difficulty: 'medium', category: 'Events', lesson: 'Bài 28', section: 'reading' }
];
