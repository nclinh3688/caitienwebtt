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

export const lesson15Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'おきます', kanji: '置きます', meaning: 'đặt, để', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 15', section: 'main' },
  { id: '2', hiragana: 'つくります', kanji: '作ります', meaning: 'làm chế tạo, sản xuất', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 15', section: 'main' },
  { id: '3', hiragana: 'うります', kanji: '売ります', meaning: 'bán', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 15', section: 'main' },
  { id: '4', hiragana: 'しります', kanji: '知ります', meaning: 'biết', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 15', section: 'main' },
  { id: '5', hiragana: 'すみます', kanji: '住みます', meaning: 'sống, ở', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 15', section: 'main' },
  { id: '6', hiragana: 'けんきゅうします', kanji: '研究します', meaning: 'nghiên cứu', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 15', section: 'main' },
  { id: '7', hiragana: 'しりょう', kanji: '資料', meaning: 'tài liệu, tư liệu', difficulty: 'easy', category: 'Objects', lesson: 'Bài 15', section: 'main' },
  { id: '8', hiragana: 'カタログ', kanji: '', meaning: 'ca-ta-lô', difficulty: 'easy', category: 'Objects', lesson: 'Bài 15', section: 'main' },
  { id: '9', hiragana: 'じこくひょう', kanji: '時刻表', meaning: 'bảng giờ chạy tàu', difficulty: 'easy', category: 'Objects', lesson: 'Bài 15', section: 'main' },
  { id: '10', hiragana: 'ふく', kanji: '服', meaning: 'quần áo', difficulty: 'easy', category: 'Objects', lesson: 'Bài 15', section: 'main' },
  { id: '11', hiragana: 'せいひん', kanji: '製品', meaning: 'sản phẩm', difficulty: 'easy', category: 'Objects', lesson: 'Bài 15', section: 'main' },
  { id: '12', hiragana: 'ソフト', kanji: '', meaning: 'phần mềm', difficulty: 'easy', category: 'Technology', lesson: 'Bài 15', section: 'main' },
  { id: '13', hiragana: 'でんしじしょ', kanji: '電子辞書', meaning: 'kim từ điển', difficulty: 'easy', category: 'Technology', lesson: 'Bài 15', section: 'main' },
  { id: '14', hiragana: 'けいざい', kanji: '経済', meaning: 'kinh tế', difficulty: 'easy', category: 'Subjects', lesson: 'Bài 15', section: 'main' },
  { id: '15', hiragana: 'しやくしょ', kanji: '市役所', meaning: 'tòa thị chính', difficulty: 'easy', category: 'Places', lesson: 'Bài 15', section: 'main' },
  { id: '16', hiragana: 'こうこう', kanji: '高校', meaning: 'trường trung học phổ thông, trường cấp 3', difficulty: 'easy', category: 'Education', lesson: 'Bài 15', section: 'main' },
  { id: '17', hiragana: 'はいしゃ', kanji: '歯医者', meaning: 'nha sĩ', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'main' },
  { id: '18', hiragana: 'どくしん', kanji: '独身', meaning: 'độc thân', difficulty: 'easy', category: 'Status', lesson: 'Bài 15', section: 'main' },
  { id: '19', hiragana: 'すみません', kanji: '', meaning: 'xin lỗi', difficulty: 'easy', category: 'Politeness', lesson: 'Bài 15', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '20', hiragana: 'みなさん', kanji: '皆さん', meaning: 'các anh chị, các ông bà, các bạn, quý vị', difficulty: 'easy', category: 'Address', lesson: 'Bài 15', section: 'conversation' },
  { id: '21', hiragana: 'おもいだします', kanji: '思い出します', meaning: 'nhớ lại, hồi tưởng lại', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 15', section: 'conversation' },
  { id: '22', hiragana: 'いらっしゃいます', kanji: '', meaning: 'kính ngữ của います', difficulty: 'easy', category: 'Politeness', lesson: 'Bài 15', section: 'conversation' },
  { id: '23', hiragana: 'にほんばし', kanji: '日本橋', meaning: 'tên khu phố mua sắm ở Osaka', difficulty: 'easy', category: 'Places', lesson: 'Bài 15', section: 'conversation' },
  { id: '24', hiragana: 'みんなのインタビュー', kanji: '', meaning: 'tên chương trình truyền hình gia đình', difficulty: 'easy', category: 'Media', lesson: 'Bài 15', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '25', hiragana: 'かいしゃいん', kanji: '会社員', meaning: 'nhân viên công ty', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '26', hiragana: 'こうむいん', kanji: '公務員', meaning: 'công chức', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '27', hiragana: 'えきいん', kanji: '駅員', meaning: 'nhân viên nhà ga', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '28', hiragana: 'ぎんこういん', kanji: '銀行員', meaning: 'nhân viên ngân hàng', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '29', hiragana: 'ゆうびんきょくいん', kanji: '郵便局員', meaning: 'nhân viên bưu điện', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '30', hiragana: 'てんいん', kanji: '店員', meaning: 'nhân viên cửa hàng, nhân viên nhà hàng', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '31', hiragana: 'ちょうりし', kanji: '調理師', meaning: 'đầu bếp', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '32', hiragana: 'りようし', kanji: '理容師', meaning: 'thợ cắt tóc', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '33', hiragana: 'びようし', kanji: '美容師', meaning: 'mỹ viện gia', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '34', hiragana: 'きょうし', kanji: '教師', meaning: 'giáo viên', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '35', hiragana: 'べんごし', kanji: '弁護士', meaning: 'luật sư', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '36', hiragana: 'けんきゅうしゃ', kanji: '研究者', meaning: 'nhà nghiên cứu', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '37', hiragana: 'いしゃ', kanji: '医者', meaning: 'bác sĩ', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '38', hiragana: 'かんごし', kanji: '看護師', meaning: 'y tá', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '39', hiragana: 'うんてんしゅ', kanji: '運転手', meaning: 'tài xế', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '40', hiragana: 'けいさつかん', kanji: '警察官', meaning: 'cảnh sát', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '41', hiragana: 'がいこうかん', kanji: '外交官', meaning: 'nhà ngoại giao', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '42', hiragana: 'せいじか', kanji: '政治家', meaning: 'chính khách, nhà chính trị', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '43', hiragana: 'がか', kanji: '画家', meaning: 'họa sĩ', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '44', hiragana: 'さっか', kanji: '作家', meaning: 'nhà văn', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '45', hiragana: 'えんげきか', kanji: '演劇家', meaning: 'nhà văn', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '46', hiragana: 'けんちくか', kanji: '建築家', meaning: 'kiến trúc sư', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '47', hiragana: 'エンジニア', kanji: '', meaning: 'kỹ sư', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '48', hiragana: 'デザイナー', kanji: '', meaning: 'nhà thiết kế', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '49', hiragana: 'ジャーナリスト', kanji: '', meaning: 'nhà báo', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '50', hiragana: 'かしゅ', kanji: '歌手', meaning: 'ca sĩ', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '51', hiragana: 'はいゆう', kanji: '俳優', meaning: 'diễn viên', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' },
  { id: '52', hiragana: 'スポーツせんしゅ', kanji: 'スポーツ選手', meaning: 'vận động viên', difficulty: 'easy', category: 'Professions', lesson: 'Bài 15', section: 'reading' }
];
