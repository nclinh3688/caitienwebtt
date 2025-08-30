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

export const lesson42Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'つつみます I', kanji: '包みます', meaning: 'gói', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 42', section: 'main' },
  { id: '2', hiragana: 'わかします I', kanji: '沸かします', meaning: 'đun sôi', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 42', section: 'main' },
  { id: '3', hiragana: 'まぜます II', kanji: '混ぜます', meaning: 'trộn', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 42', section: 'main' },
  { id: '4', hiragana: 'けいさんします III', kanji: '計算します', meaning: 'tính, tính toán', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 42', section: 'main' },
  { id: '5', hiragana: 'ならびます I', kanji: '並びます', meaning: 'xếp hàng', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 42', section: 'main' },
  { id: '6', hiragana: 'じょうぶ[な]', kanji: '丈夫[な]', meaning: 'chắc chắn', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 42', section: 'main' },
  { id: '7', hiragana: 'アパート', kanji: '', meaning: 'phòng trọ', difficulty: 'medium', category: 'Housing', lesson: 'Bài 42', section: 'main' },
  { id: '8', hiragana: 'べんごし', kanji: '弁護士', meaning: 'luật sư', difficulty: 'hard', category: 'Professions', lesson: 'Bài 42', section: 'main' },
  { id: '9', hiragana: 'おんがくか', kanji: '音楽家', meaning: 'nhạc sĩ, người hoạt động trong lĩnh vực âm nhạc', difficulty: 'hard', category: 'Professions', lesson: 'Bài 42', section: 'main' },
  { id: '10', hiragana: 'しぜん', kanji: '自然', meaning: 'tự nhiên', difficulty: 'medium', category: 'Nature', lesson: 'Bài 42', section: 'main' },
  { id: '11', hiragana: 'きょういく', kanji: '教育', meaning: 'giáo dục', difficulty: 'medium', category: 'Education', lesson: 'Bài 42', section: 'main' },
  { id: '12', hiragana: 'ぶんか', kanji: '文化', meaning: 'văn hóa', difficulty: 'medium', category: 'Culture', lesson: 'Bài 42', section: 'main' },
  { id: '13', hiragana: 'しゃかい', kanji: '社会', meaning: 'xã hội', difficulty: 'medium', category: 'Society', lesson: 'Bài 42', section: 'main' },
  { id: '14', hiragana: 'せいじ', kanji: '政治', meaning: 'chính trị', difficulty: 'medium', category: 'Politics', lesson: 'Bài 42', section: 'main' },
  { id: '15', hiragana: 'ほうりつ', kanji: '法律', meaning: 'pháp luật', difficulty: 'medium', category: 'Law', lesson: 'Bài 42', section: 'main' },
  { id: '16', hiragana: 'せんそう', kanji: '戦争', meaning: 'chiến tranh', difficulty: 'medium', category: 'War', lesson: 'Bài 42', section: 'main' },
  { id: '17', hiragana: 'へいわ', kanji: '平和', meaning: 'hòa bình', difficulty: 'medium', category: 'Peace', lesson: 'Bài 42', section: 'main' },
  { id: '18', hiragana: 'もくてき', kanji: '目的', meaning: 'mục đích', difficulty: 'medium', category: 'Purpose', lesson: 'Bài 42', section: 'main' },
  { id: '19', hiragana: 'ろんぶん', kanji: '論文', meaning: 'luận văn', difficulty: 'hard', category: 'Academic', lesson: 'Bài 42', section: 'main' },
  { id: '20', hiragana: 'たのしみ', kanji: '楽しみ', meaning: 'niềm vui', difficulty: 'medium', category: 'Enjoyment', lesson: 'Bài 42', section: 'main' },
  { id: '21', hiragana: 'ミキサー', kanji: '', meaning: 'máy xay', difficulty: 'medium', category: 'Appliances', lesson: 'Bài 42', section: 'main' },
  { id: '22', hiragana: 'やかん', kanji: 'やかん', meaning: 'ấm đun nước', difficulty: 'medium', category: 'Objects', lesson: 'Bài 42', section: 'main' },
  { id: '23', hiragana: 'せんぬき', kanji: '栓抜き', meaning: 'cái bật nắp chai', difficulty: 'hard', category: 'Tools', lesson: 'Bài 42', section: 'main' },
  { id: '24', hiragana: 'かんきり', kanji: '缶切り', meaning: 'cái mở nắp hộp', difficulty: 'hard', category: 'Tools', lesson: 'Bài 42', section: 'main' },
  { id: '25', hiragana: 'ふろしき', kanji: '風呂敷', meaning: 'khăn vuông để gói đồ kiểu Nhật', difficulty: 'hard', category: 'Objects', lesson: 'Bài 42', section: 'main' },
  { id: '26', hiragana: 'しゅほう', kanji: '手法', meaning: 'phong bì dùng để bỏ tiền mừng', difficulty: 'hard', category: 'Objects', lesson: 'Bài 42', section: 'main' },
  { id: '27', hiragana: 'おろしがね', kanji: '下ろし金', meaning: 'bản tính', difficulty: 'hard', category: 'Tools', lesson: 'Bài 42', section: 'main' },
  { id: '28', hiragana: 'ばんち', kanji: '番地', meaning: 'nhiệt kế', difficulty: 'hard', category: 'Address', lesson: 'Bài 42', section: 'main' },
  { id: '29', hiragana: 'たいおんけい', kanji: '体温計', meaning: 'nhiệt kế', difficulty: 'hard', category: 'Medical', lesson: 'Bài 42', section: 'main' },
  { id: '30', hiragana: 'ざいりょう', kanji: '材料', meaning: 'nguyên liệu', difficulty: 'medium', category: 'Materials', lesson: 'Bài 42', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '31', hiragana: 'いっしょうけんめい', kanji: '一生懸命', meaning: 'chăm chỉ, gắng hết sức', difficulty: 'hard', category: 'Effort', lesson: 'Bài 42', section: 'conversation' },
  { id: '32', hiragana: 'なぜ', kanji: 'なぜ', meaning: 'tại sao', difficulty: 'medium', category: 'Questions', lesson: 'Bài 42', section: 'conversation' },
  { id: '33', hiragana: 'どのくらい', kanji: 'どのくらい', meaning: 'bao nhiêu', difficulty: 'medium', category: 'Questions', lesson: 'Bài 42', section: 'conversation' },
  { id: '34', hiragana: 'エリ-ゼのために', kanji: 'エリ-ゼのために', meaning: 'Dành cho Elise (tên bản nhạc)', difficulty: 'hard', category: 'Music', lesson: 'Bài 42', section: 'conversation' },
  { id: '35', hiragana: 'ベ-ト-ベン', kanji: 'ベ-ト-ベン', meaning: 'Beethoven, nhà soạn nhạc người Đức (1770 - 1827)', difficulty: 'hard', category: 'Names', lesson: 'Bài 42', section: 'conversation' },
  { id: '36', hiragana: 'こどもニュース', kanji: 'こどもニュース', meaning: 'Bản tin thiếu nhi (chương trình tin tức giả định)', difficulty: 'hard', category: 'Media', lesson: 'Bài 42', section: 'conversation' },
  { id: '37', hiragana: 'でます II', kanji: '出ます', meaning: 'có [thưởng]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 42', section: 'conversation' },
  { id: '38', hiragana: '～ばい', kanji: '～倍', meaning: 'một nửa', difficulty: 'medium', category: 'Suffixes', lesson: 'Bài 42', section: 'conversation' },
  { id: '39', hiragana: 'ローン', kanji: '', meaning: 'khoản vay ngân hàng', difficulty: 'medium', category: 'Finance', lesson: 'Bài 42', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '40', hiragana: 'カップめん', kanji: 'カップめん', meaning: 'mì ly (mì ăn liền để ở trong ly dùng một lần)', difficulty: 'hard', category: 'Food', lesson: 'Bài 42', section: 'reading' },
  { id: '41', hiragana: 'せかいはつ', kanji: '世界初', meaning: 'đầu tiên trên thế giới', difficulty: 'hard', category: 'Achievements', lesson: 'Bài 42', section: 'reading' },
  { id: '42', hiragana: '～によって', kanji: '～によって', meaning: 'bởi', difficulty: 'medium', category: 'Particles', lesson: 'Bài 42', section: 'reading' },
  { id: '43', hiragana: 'どんぶり', kanji: 'どんぶり', meaning: 'bát tô lớn', difficulty: 'medium', category: 'Objects', lesson: 'Bài 42', section: 'reading' },
  { id: '44', hiragana: 'めん', kanji: 'めん', meaning: 'mì sợi', difficulty: 'medium', category: 'Food', lesson: 'Bài 42', section: 'reading' },
  { id: '45', hiragana: 'ひろがります II', kanji: '広がります', meaning: 'phổ cập, nhân rộng, mở rộng', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 42', section: 'reading' },
  { id: '46', hiragana: 'しじょうちょうさ', kanji: '市場調査', meaning: 'điều tra thị trường', difficulty: 'hard', category: 'Business', lesson: 'Bài 42', section: 'reading' },
  { id: '47', hiragana: 'わります I', kanji: '割ります', meaning: 'bẻ ra, chia nhỏ ra', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 42', section: 'reading' },
  { id: '48', hiragana: 'そそぎます I', kanji: '注ぎます', meaning: 'đổ vào', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 42', section: 'reading' },
  { id: '49', hiragana: 'チキンラーメン', kanji: '', meaning: 'tên của một loại mì ăn liền', difficulty: 'hard', category: 'Food', lesson: 'Bài 42', section: 'reading' },
  { id: '50', hiragana: 'あんどう百福', kanji: '安藤百福', meaning: 'nhà kinh doanh, nhà phát minh người Nhật (1910 - 2007)', difficulty: 'hard', category: 'Names', lesson: 'Bài 42', section: 'reading' }
];
