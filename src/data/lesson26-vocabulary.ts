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

export const lesson26Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'みえます II', kanji: '見えます', meaning: 'nhìn thấy, trông thấy', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 26', section: 'main' },
  { id: '2', hiragana: 'さがします I', kanji: '探します、捜します', meaning: 'tìm, tìm kiếm', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 26', section: 'main' },
  { id: '3', hiragana: 'おくれます II', kanji: '[時間]に遅れます', meaning: 'chậm, muộn [giờ]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 26', section: 'main' },
  { id: '4', hiragana: 'まにあいます I', kanji: '[時間]に間に合います', meaning: 'kịp [giờ]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 26', section: 'main' },
  { id: '5', hiragana: 'やります I', kanji: '', meaning: 'làm', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 26', section: 'main' },
  { id: '6', hiragana: 'ひろいます I', kanji: '拾います', meaning: 'nhặt, lượm', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 26', section: 'main' },
  { id: '7', hiragana: 'れんらくします III', kanji: '連絡します', meaning: 'liên lạc', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 26', section: 'main' },
  { id: '8', hiragana: 'きぶんがいい', kanji: '気分がいい', meaning: 'cảm thấy thoải mái, cảm thấy khỏe', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 26', section: 'main' },
  { id: '9', hiragana: 'きぶんがわるい', kanji: '気分が悪い', meaning: 'cảm thấy không thoải mái, cảm thấy mệt', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 26', section: 'main' },
  { id: '10', hiragana: 'うんどうかい', kanji: '運動会', meaning: 'hội thể thao', difficulty: 'medium', category: 'Events', lesson: 'Bài 26', section: 'main' },
  { id: '11', hiragana: 'ぼんおどり', kanji: '盆踊り', meaning: 'múa Bon', difficulty: 'medium', category: 'Events', lesson: 'Bài 26', section: 'main' },
  { id: '12', hiragana: 'フリーマーケット', kanji: '', meaning: 'chợ đồ cũ, chợ trời', difficulty: 'medium', category: 'Places', lesson: 'Bài 26', section: 'main' },
  { id: '13', hiragana: 'ばしょ', kanji: '場所', meaning: 'địa điểm, nơi', difficulty: 'medium', category: 'Places', lesson: 'Bài 26', section: 'main' },
  { id: '14', hiragana: 'ボランティア', kanji: '', meaning: 'tình nguyện viên', difficulty: 'medium', category: 'People', lesson: 'Bài 26', section: 'main' },
  { id: '15', hiragana: 'さいふ', kanji: '財布', meaning: 'ví', difficulty: 'medium', category: 'Objects', lesson: 'Bài 26', section: 'main' },
  { id: '16', hiragana: 'ごみ', kanji: '', meaning: 'rác', difficulty: 'medium', category: 'Objects', lesson: 'Bài 26', section: 'main' },
  { id: '17', hiragana: 'こっかいぎじどう', kanji: '国会議事堂', meaning: 'tòa nhà quốc hội', difficulty: 'hard', category: 'Places', lesson: 'Bài 26', section: 'main' },
  { id: '18', hiragana: 'へいじつ', kanji: '平日', meaning: 'ngày thường', difficulty: 'medium', category: 'Time', lesson: 'Bài 26', section: 'main' },
  { id: '19', hiragana: '～べん', kanji: '～弁', meaning: 'phương ngữ ~, tiếng ~, giọng ~', difficulty: 'medium', category: 'Language', lesson: 'Bài 26', section: 'main' },
  { id: '20', hiragana: 'こんど', kanji: '', meaning: 'lần tới', difficulty: 'medium', category: 'Time', lesson: 'Bài 26', section: 'main' },
  { id: '21', hiragana: 'ずいぶん', kanji: '', meaning: 'khá, tương đối', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 26', section: 'main' },
  { id: '22', hiragana: 'ちょくせつ', kanji: '直接', meaning: 'trực tiếp', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 26', section: 'main' },
  { id: '23', hiragana: 'いつもどこでも', kanji: '', meaning: 'lúc nào cũng ở đâu cũng', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 26', section: 'main' },
  { id: '24', hiragana: 'だれでも', kanji: '', meaning: 'ai cũng', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 26', section: 'main' },
  { id: '25', hiragana: 'なんでも', kanji: '何でも', meaning: 'cái gì cũng', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 26', section: 'main' },
  { id: '26', hiragana: 'こんな～', kanji: '', meaning: 'như thế này', difficulty: 'medium', category: 'Demonstratives', lesson: 'Bài 26', section: 'main' },
  { id: '27', hiragana: 'そんな～', kanji: '', meaning: 'như thế đó (gần người nghe)', difficulty: 'medium', category: 'Demonstratives', lesson: 'Bài 26', section: 'main' },
  { id: '28', hiragana: 'あんな～', kanji: '', meaning: 'như thế kia (xa cả người nói và người nghe)', difficulty: 'medium', category: 'Demonstratives', lesson: 'Bài 26', section: 'main' },
  { id: '29', hiragana: 'エドストア', kanji: '', meaning: 'tên một cửa hàng gia đình', difficulty: 'medium', category: 'Places', lesson: 'Bài 26', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '30', hiragana: 'かたづけます I', kanji: '片づけます', meaning: 'được dọn dẹp ngăn nắp, gọn gàng [đồ đạc ~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 26', section: 'conversation' },
  { id: '31', hiragana: 'だします I', kanji: '出します', meaning: 'đổ, để [rác]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 26', section: 'conversation' },
  { id: '32', hiragana: 'もえるごみ', kanji: '燃えるごみ', meaning: 'rác cháy được', difficulty: 'medium', category: 'Objects', lesson: 'Bài 26', section: 'conversation' },
  { id: '33', hiragana: 'おきば', kanji: '置き場', meaning: 'nơi để', difficulty: 'medium', category: 'Places', lesson: 'Bài 26', section: 'conversation' },
  { id: '34', hiragana: 'よこ', kanji: '横', meaning: 'bên cạnh', difficulty: 'medium', category: 'Location', lesson: 'Bài 26', section: 'conversation' },
  { id: '35', hiragana: 'びん', kanji: '瓶', meaning: 'chai', difficulty: 'medium', category: 'Objects', lesson: 'Bài 26', section: 'conversation' },
  { id: '36', hiragana: 'かん', kanji: '缶', meaning: 'lon', difficulty: 'medium', category: 'Objects', lesson: 'Bài 26', section: 'conversation' },
  { id: '37', hiragana: 'ガス', kanji: '', meaning: 'ga', difficulty: 'medium', category: 'Objects', lesson: 'Bài 26', section: 'conversation' },
  { id: '38', hiragana: '～かいしゃ', kanji: '～会社', meaning: 'công ty ~', difficulty: 'medium', category: 'Companies', lesson: 'Bài 26', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '39', hiragana: 'うちゅう', kanji: '宇宙', meaning: 'vũ trụ', difficulty: 'hard', category: 'Space', lesson: 'Bài 26', section: 'reading' },
  { id: '40', hiragana: 'さま', kanji: '様', meaning: 'ông/bà/ngài ~ (kính ngữ của ~ さん)', difficulty: 'hard', category: 'Honorifics', lesson: 'Bài 26', section: 'reading' },
  { id: '41', hiragana: 'うちゅうせん', kanji: '宇宙船', meaning: 'tàu vũ trụ', difficulty: 'hard', category: 'Space', lesson: 'Bài 26', section: 'reading' },
  { id: '42', hiragana: 'こわい', kanji: '怖い', meaning: 'sợ', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 26', section: 'reading' },
  { id: '43', hiragana: 'うちゅうステーション', kanji: '宇宙ステーション', meaning: 'trạm vũ trụ', difficulty: 'hard', category: 'Space', lesson: 'Bài 26', section: 'reading' },
  { id: '44', hiragana: 'ちがいます I', kanji: '違います', meaning: 'khác', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 26', section: 'reading' },
  { id: '45', hiragana: 'うちゅうひこうし', kanji: '宇宙飛行士', meaning: 'nhà du hành vũ trụ', difficulty: 'hard', category: 'Professions', lesson: 'Bài 26', section: 'reading' },
  { id: '46', hiragana: 'ほしであきひこ', kanji: '星出彰彦', meaning: 'nhà du hành vũ trụ người Nhật Bản (1968-)', difficulty: 'hard', category: 'Names', lesson: 'Bài 26', section: 'reading' }
];
