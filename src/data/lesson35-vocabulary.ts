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

export const lesson35Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'さきます I', kanji: '咲きます', meaning: 'nở [hoa]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 35', section: 'main' },
  { id: '2', hiragana: 'かわります I', kanji: '変わります', meaning: 'đổi, thay đổi [màu ~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 35', section: 'main' },
  { id: '3', hiragana: 'こまります II', kanji: '困ります', meaning: 'khó khăn', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 35', section: 'main' },
  { id: '4', hiragana: 'つけます II', kanji: '付けます', meaning: 'gắn [dấu tròn]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 35', section: 'main' },
  { id: '5', hiragana: 'なおります II', kanji: '直ります', meaning: 'trị liệu, chữa khỏi', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 35', section: 'main' },
  { id: '6', hiragana: 'こわれます II', kanji: '壊れます', meaning: 'hỏng [bệnh]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 35', section: 'main' },
  { id: '7', hiragana: 'クリックします III', kanji: '', meaning: 'click chuột', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 35', section: 'main' },
  { id: '8', hiragana: 'にゅうりょくします III', kanji: '入力します', meaning: 'nhập vào', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 35', section: 'main' },
  { id: '9', hiragana: 'ただしい', kanji: '正しい', meaning: 'đúng', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 35', section: 'main' },
  { id: '10', hiragana: 'おこない', kanji: '行い', meaning: 'đang ấy, phía đối diện', difficulty: 'medium', category: 'Actions', lesson: 'Bài 35', section: 'main' },
  { id: '11', hiragana: 'しま', kanji: '島', meaning: 'đảo', difficulty: 'medium', category: 'Places', lesson: 'Bài 35', section: 'main' },
  { id: '12', hiragana: 'みなと', kanji: '港', meaning: 'cảng', difficulty: 'medium', category: 'Places', lesson: 'Bài 35', section: 'main' },
  { id: '13', hiragana: 'きんじょ', kanji: '近所', meaning: 'hàng xóm', difficulty: 'medium', category: 'Places', lesson: 'Bài 35', section: 'main' },
  { id: '14', hiragana: 'おくじょう', kanji: '屋上', meaning: 'tầng thượng', difficulty: 'medium', category: 'Places', lesson: 'Bài 35', section: 'main' },
  { id: '15', hiragana: 'かいがい', kanji: '海外', meaning: 'nước ngoài', difficulty: 'medium', category: 'Places', lesson: 'Bài 35', section: 'main' },
  { id: '16', hiragana: 'やまのぼり', kanji: '山登り', meaning: 'leo núi', difficulty: 'medium', category: 'Activities', lesson: 'Bài 35', section: 'main' },
  { id: '17', hiragana: 'れきし', kanji: '歴史', meaning: 'lịch sử', difficulty: 'medium', category: 'Subjects', lesson: 'Bài 35', section: 'main' },
  { id: '18', hiragana: 'きかい', kanji: '機会', meaning: 'cơ hội', difficulty: 'medium', category: 'Opportunities', lesson: 'Bài 35', section: 'main' },
  { id: '19', hiragana: 'きょか', kanji: '許可', meaning: 'sự cho phép', difficulty: 'medium', category: 'Permission', lesson: 'Bài 35', section: 'main' },
  { id: '20', hiragana: 'まる', kanji: '丸', meaning: 'dấu chấm', difficulty: 'medium', category: 'Objects', lesson: 'Bài 35', section: 'main' },
  { id: '21', hiragana: 'ふりがな', kanji: '', meaning: 'Furigana (chữ Kana biểu thị cách đọc của chữ Hán)', difficulty: 'hard', category: 'Language', lesson: 'Bài 35', section: 'main' },
  { id: '22', hiragana: 'せつび', kanji: '設備', meaning: 'thiết bị', difficulty: 'hard', category: 'Equipment', lesson: 'Bài 35', section: 'main' },
  { id: '23', hiragana: 'レバー', kanji: '', meaning: 'cần, cần gạt', difficulty: 'medium', category: 'Objects', lesson: 'Bài 35', section: 'main' },
  { id: '24', hiragana: 'キー', kanji: '', meaning: 'phím', difficulty: 'medium', category: 'Objects', lesson: 'Bài 35', section: 'main' },
  { id: '25', hiragana: 'ひも', kanji: '', meaning: 'sợi dây', difficulty: 'medium', category: 'Objects', lesson: 'Bài 35', section: 'main' },
  { id: '26', hiragana: 'すいはんき', kanji: '炊飯器', meaning: 'nồi cơm điện', difficulty: 'hard', category: 'Appliances', lesson: 'Bài 35', section: 'main' },
  { id: '27', hiragana: 'は', kanji: '葉', meaning: 'lá', difficulty: 'easy', category: 'Nature', lesson: 'Bài 35', section: 'main' },
  { id: '28', hiragana: 'むかし', kanji: '昔', meaning: 'ngày xưa', difficulty: 'medium', category: 'Time', lesson: 'Bài 35', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '29', hiragana: 'もっと', kanji: '', meaning: 'hơn nữa', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 35', section: 'conversation' },
  { id: '30', hiragana: 'これでおしまい', kanji: '', meaning: 'Đây là xong rồi.', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 35', section: 'conversation' },
  { id: '31', hiragana: 'はこね', kanji: '箱根', meaning: 'khu nghỉ dưỡng, tham quan ở tỉnh Kanagawa', difficulty: 'hard', category: 'Places', lesson: 'Bài 35', section: 'conversation' },
  { id: '32', hiragana: 'にっこう', kanji: '日光', meaning: 'địa điểm tham quan ở tỉnh Tochigi', difficulty: 'hard', category: 'Places', lesson: 'Bài 35', section: 'conversation' },
  { id: '33', hiragana: 'アフリカ', kanji: '', meaning: 'châu Phi', difficulty: 'medium', category: 'Places', lesson: 'Bài 35', section: 'conversation' },
  { id: '34', hiragana: 'マンガミュージアム', kanji: '', meaning: 'Bảo tàng truyện tranh quốc tế Kyoto', difficulty: 'hard', category: 'Places', lesson: 'Bài 35', section: 'conversation' },
  { id: '35', hiragana: 'みんなのこうこう', kanji: '', meaning: 'tên trường trung học Nhật Bản', difficulty: 'hard', category: 'Places', lesson: 'Bài 35', section: 'conversation' },
  { id: '36', hiragana: 'おおずし', kanji: '大寿司', meaning: 'tên quán sushi giá định', difficulty: 'hard', category: 'Places', lesson: 'Bài 35', section: 'conversation' },
  { id: '37', hiragana: 'とりのすけ', kanji: '', meaning: 'tên trường đào tạo chuyên môn nấu ăn', difficulty: 'hard', category: 'Places', lesson: 'Bài 35', section: 'conversation' },
  { id: '38', hiragana: 'いろり', kanji: '', meaning: 'tên của cuốn sách giá định', difficulty: 'hard', category: 'Books', lesson: 'Bài 35', section: 'conversation' },
  { id: '39', hiragana: 'おおいわ', kanji: '', meaning: 'tiệm làm đẹp giá định', difficulty: 'hard', category: 'Places', lesson: 'Bài 35', section: 'conversation' },
  { id: '40', hiragana: 'みよしかいがん', kanji: '', meaning: 'phòng nha giá định', difficulty: 'hard', category: 'Places', lesson: 'Bài 35', section: 'conversation' },
  { id: '41', hiragana: 'じょんそく', kanji: '乗速', meaning: 'trường dạy nấu ăn giá định', difficulty: 'hard', category: 'Places', lesson: 'Bài 35', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '42', hiragana: 'それなら', kanji: '', meaning: 'nếu thế thì, nếu vậy thì', difficulty: 'medium', category: 'Conjunctions', lesson: 'Bài 35', section: 'reading' },
  { id: '43', hiragana: 'よふかし', kanji: '夜更かし', meaning: 'xe buýt đêm', difficulty: 'hard', category: 'Transport', lesson: 'Bài 35', section: 'reading' },
  { id: '44', hiragana: 'さあ', kanji: '', meaning: 'ờ, à (dùng ở đầu câu nói khi không đầu tư công việc gì)', difficulty: 'medium', category: 'Interjections', lesson: 'Bài 35', section: 'reading' },
  { id: '45', hiragana: 'りょこうがいしゃ', kanji: '旅行会社', meaning: 'công ty du lịch', difficulty: 'hard', category: 'Business', lesson: 'Bài 35', section: 'reading' },
  { id: '46', hiragana: 'ひょうばん', kanji: '評判', meaning: 'uy tín', difficulty: 'hard', category: 'Reputation', lesson: 'Bài 35', section: 'reading' },
  { id: '47', hiragana: 'スキーじょう', kanji: '', meaning: 'khu trượt tuyết', difficulty: 'hard', category: 'Places', lesson: 'Bài 35', section: 'reading' },
  { id: '48', hiragana: 'ぐんま', kanji: '群馬', meaning: 'khu nghỉ dưỡng ở tỉnh Gunma', difficulty: 'hard', category: 'Places', lesson: 'Bài 35', section: 'reading' },
  { id: '49', hiragana: 'くさつ', kanji: '草津', meaning: 'cao nguyên nằm trong công viên quốc gia thuộc tỉnh Nagano', difficulty: 'hard', category: 'Places', lesson: 'Bài 35', section: 'reading' },

  // Tục ngữ (ことわざ)
  { id: '50', hiragana: 'すめばみやこ', kanji: '住めば都', meaning: 'Bất cứ chỗ nào cũng thế, cứ sống lâu và quen thì bạn cảm thấy nơi đó là nơi tốt nhất.', difficulty: 'hard', category: 'Proverbs', lesson: 'Bài 35', section: 'reading' },
  { id: '51', hiragana: 'さんにんよればもんじゅのちえ', kanji: '三人寄れば文殊の知恵', meaning: '"Ba ông đánh giấy là thầy Gia Cát Lượng." Tập trung trí tuệ của nhiều người bao giờ cũng tốt hơn.', difficulty: 'hard', category: 'Proverbs', lesson: 'Bài 35', section: 'reading' },
  { id: '52', hiragana: 'たてばしゃくやくすわればぼたんあるけばゆりの', kanji: '立てば芍薬座れば牡丹歩けば百合', meaning: 'Dùng để tả một cô gái đẹp. Dáng đứng như hoa shaku-yaku (một kiểu hoa mẫu đơn), kiểu ngồi như hoa mẫu đơn, điệu đi như hoa huệ.', difficulty: 'hard', category: 'Proverbs', lesson: 'Bài 35', section: 'reading' },
  { id: '53', hiragana: 'ちりもつもればやまとなる', kanji: '塵も積もれば山となる', meaning: 'Những cái tuy nhỏ nhưng tập hợp lại thì sẽ thành cái lớn.', difficulty: 'hard', category: 'Proverbs', lesson: 'Bài 35', section: 'reading' },
  { id: '54', hiragana: 'うわさすればかげ', kanji: '噂をすれば影', meaning: 'Khi đồn đại về ai đó, người đó thường hay xuất hiện.', difficulty: 'hard', category: 'Proverbs', lesson: 'Bài 35', section: 'reading' },
  { id: '55', hiragana: 'くるしいときもたのしいときも', kanji: '苦しいときも楽しいときも', meaning: 'Đời có lúc vui lúc buồn.', difficulty: 'hard', category: 'Proverbs', lesson: 'Bài 35', section: 'reading' },
  { id: '56', hiragana: 'いろいろあります', kanji: '', meaning: 'Cuộc đời có lúc này lúc khác, có lúc vui lúc buồn.', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 35', section: 'reading' }
];
