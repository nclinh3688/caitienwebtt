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

export const lesson13Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'あそびます', kanji: '遊びます', meaning: 'chơi', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 13', section: 'main' },
  { id: '2', hiragana: 'およぎます', kanji: '泳ぎます', meaning: 'bơi', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 13', section: 'main' },
  { id: '3', hiragana: 'むかえいます', kanji: '迎えいます', meaning: 'đón', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 13', section: 'main' },
  { id: '4', hiragana: 'つかれます', kanji: '疲れます', meaning: 'mệt', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 13', section: 'main' },
  { id: '5', hiragana: 'けっこんします', kanji: '結婚します', meaning: 'kết hôn, lập gia đình, cưới', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 13', section: 'main' },
  { id: '6', hiragana: 'かいものします', kanji: '買い物します', meaning: 'mua sắm, mua hàng', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 13', section: 'main' },
  { id: '7', hiragana: 'しょくじします', kanji: '食事します', meaning: 'ăn cơm, dùng bữa', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 13', section: 'main' },
  { id: '8', hiragana: 'さんぽします', kanji: '散歩します', meaning: 'đi dạo [ở công viên]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 13', section: 'main' },
  { id: '9', hiragana: 'たいへん', kanji: '大変', meaning: 'vất vả, khó khăn, khó', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 13', section: 'main' },
  { id: '10', hiragana: 'ほしい', kanji: '', meaning: 'muốn có', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 13', section: 'main' },
  { id: '11', hiragana: 'ひろい', kanji: '広い', meaning: 'rộng', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 13', section: 'main' },
  { id: '12', hiragana: 'せまい', kanji: '狭い', meaning: 'chật, hẹp', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 13', section: 'main' },
  { id: '13', hiragana: 'プール', kanji: '', meaning: 'bể bơi', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'main' },
  { id: '14', hiragana: 'かわ', kanji: '川', meaning: 'sông', difficulty: 'easy', category: 'Nature', lesson: 'Bài 13', section: 'main' },
  { id: '15', hiragana: 'びじゅつ', kanji: '美術', meaning: 'mỹ thuật', difficulty: 'easy', category: 'Art', lesson: 'Bài 13', section: 'main' },
  { id: '16', hiragana: 'つり', kanji: '釣り', meaning: 'việc câu cá', difficulty: 'easy', category: 'Activities', lesson: 'Bài 13', section: 'main' },
  { id: '17', hiragana: 'スキー', kanji: '', meaning: 'việc trượt tuyết', difficulty: 'easy', category: 'Activities', lesson: 'Bài 13', section: 'main' },
  { id: '18', hiragana: 'しゅうまつ', kanji: '週末', meaning: 'cuối tuần', difficulty: 'easy', category: 'Time', lesson: 'Bài 13', section: 'main' },
  { id: '19', hiragana: 'しょうがつ', kanji: '正月', meaning: 'Tết', difficulty: 'easy', category: 'Events', lesson: 'Bài 13', section: 'main' },
  { id: '20', hiragana: 'ごろ', kanji: '', meaning: 'khoảng (dùng cho thời gian)', difficulty: 'easy', category: 'Particles', lesson: 'Bài 13', section: 'main' },
  { id: '21', hiragana: 'なにか', kanji: '何か', meaning: 'cái gì đó', difficulty: 'easy', category: 'Pronouns', lesson: 'Bài 13', section: 'main' },
  { id: '22', hiragana: 'どこか', kanji: '', meaning: 'chỗ nào đó', difficulty: 'easy', category: 'Pronouns', lesson: 'Bài 13', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '23', hiragana: 'のどがかわきます', kanji: 'のどが渇きます', meaning: 'khát', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 13', section: 'conversation' },
  { id: '24', hiragana: 'おなかがすきます', kanji: 'おなかが空きます', meaning: 'đói', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 13', section: 'conversation' },
  { id: '25', hiragana: 'そうしましょう', kanji: '', meaning: 'Nhất trí./Hãy làm vậy đi', difficulty: 'easy', category: 'Responses', lesson: 'Bài 13', section: 'conversation' },
  { id: '26', hiragana: 'ごちゅうもんは', kanji: 'ご注文は', meaning: 'Anh/Chị dùng món gì ạ?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 13', section: 'conversation' },
  { id: '27', hiragana: 'ていしょく', kanji: '定食', meaning: 'cơm suất, cơm phần', difficulty: 'easy', category: 'Food', lesson: 'Bài 13', section: 'conversation' },
  { id: '28', hiragana: 'ぎゅうどん', kanji: '牛どん', meaning: 'món cơm với thịt bò ở trên', difficulty: 'easy', category: 'Food', lesson: 'Bài 13', section: 'conversation' },
  { id: '29', hiragana: 'おまちください', kanji: 'お待ちください', meaning: 'Xin anh/chị vui lòng đợi', difficulty: 'easy', category: 'Requests', lesson: 'Bài 13', section: 'conversation' },
  { id: '30', hiragana: 'でございます', kanji: '', meaning: 'cách nói lịch sự của です', difficulty: 'easy', category: 'Politeness', lesson: 'Bài 13', section: 'conversation' },
  { id: '31', hiragana: 'べつべつに', kanji: '別々に', meaning: 'riêng, riêng ra', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 13', section: 'conversation' },
  { id: '32', hiragana: 'アキックス', kanji: '', meaning: 'tên công ty gia đình', difficulty: 'easy', category: 'Companies', lesson: 'Bài 13', section: 'conversation' },
  { id: '33', hiragana: 'おはようテレビ', kanji: '', meaning: 'tên chương trình truyền hình gia đình', difficulty: 'easy', category: 'Media', lesson: 'Bài 13', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '34', hiragana: 'はくぶつかん', kanji: '博物館', meaning: 'bảo tàng', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '35', hiragana: 'びじゅつかん', kanji: '美術館', meaning: 'bảo tàng mỹ thuật', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '36', hiragana: 'としょかん', kanji: '図書館', meaning: 'thư viện', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '37', hiragana: 'えいがかん', kanji: '映画館', meaning: 'rạp chiếu phim', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '38', hiragana: 'どうぶつえん', kanji: '動物園', meaning: 'vườn bách thú', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '39', hiragana: 'しょくぶつえん', kanji: '植物園', meaning: 'vườn bách thảo', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '40', hiragana: 'ゆうえんち', kanji: '遊園地', meaning: 'công viên giải trí', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '41', hiragana: 'しやくしょ', kanji: '市役所', meaning: 'văn phòng hành chính quận/thành phố, tòa thị chính', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '42', hiragana: 'けいさつしょ', kanji: '警察署', meaning: 'đồn cảnh sát', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '43', hiragana: 'こうばん', kanji: '交番', meaning: 'bốt cảnh sát', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '44', hiragana: 'しょうぼうしょ', kanji: '消防署', meaning: 'trạm cứu hỏa', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '45', hiragana: 'ちゅうしゃじょう', kanji: '駐車場', meaning: 'bãi đỗ xe', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '46', hiragana: 'おてら', kanji: 'お寺', meaning: 'chùa', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '47', hiragana: 'じんじゃ', kanji: '神社', meaning: 'đền thờ đạo Thần', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '48', hiragana: 'きょうかい', kanji: '教会', meaning: 'nhà thờ', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '49', hiragana: 'モスク', kanji: '', meaning: 'đền thờ đạo Hồi', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '50', hiragana: 'だいがく', kanji: '大学', meaning: 'trường đại học', difficulty: 'easy', category: 'Education', lesson: 'Bài 13', section: 'reading' },
  { id: '51', hiragana: 'こうこう', kanji: '高校', meaning: 'trường trung học phổ thông', difficulty: 'easy', category: 'Education', lesson: 'Bài 13', section: 'reading' },
  { id: '52', hiragana: 'ちゅうがっこう', kanji: '中学校', meaning: 'trường trung học cơ sở', difficulty: 'easy', category: 'Education', lesson: 'Bài 13', section: 'reading' },
  { id: '53', hiragana: 'しょうがっこう', kanji: '小学校', meaning: 'trường tiểu học', difficulty: 'easy', category: 'Education', lesson: 'Bài 13', section: 'reading' },
  { id: '54', hiragana: 'ようちえん', kanji: '幼稚園', meaning: 'trường mẫu giáo', difficulty: 'easy', category: 'Education', lesson: 'Bài 13', section: 'reading' },
  { id: '55', hiragana: 'たいいくかん', kanji: '体育館', meaning: 'nhà tập thể dục thể thao', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '56', hiragana: 'こうえん', kanji: '公園', meaning: 'công viên', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '57', hiragana: 'たいしかん', kanji: '大使館', meaning: 'đại sứ quán', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '58', hiragana: 'にゅうこくかんりきょく', kanji: '入国管理局', meaning: 'cục xuất nhập cảnh', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '59', hiragana: 'にくや', kanji: '肉屋', meaning: 'cửa hàng thịt', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '60', hiragana: 'パンや', kanji: 'パン屋', meaning: 'cửa hàng bánh mì', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '61', hiragana: 'さかなや', kanji: '魚屋', meaning: 'cửa hàng cá', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '62', hiragana: 'さかや', kanji: '酒屋', meaning: 'cửa hàng rượu', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '63', hiragana: 'やおや', kanji: '八百屋', meaning: 'cửa hàng rau', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '64', hiragana: 'きっさてん', kanji: '喫茶店', meaning: 'quán giải khát', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '65', hiragana: 'コンビニ', kanji: '', meaning: 'cửa hàng tiện lợi', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '66', hiragana: 'スーパー', kanji: '', meaning: 'siêu thị', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' },
  { id: '67', hiragana: 'デパート', kanji: '', meaning: 'cửa hàng bách hóa', difficulty: 'easy', category: 'Places', lesson: 'Bài 13', section: 'reading' }
];
