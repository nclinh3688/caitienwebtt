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

export const lesson1Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'わたし', kanji: '私', meaning: 'tôi', difficulty: 'easy', category: 'Pronouns', lesson: 'Bài 1', section: 'main' },
  { id: '2', hiragana: 'あなた', kanji: '', meaning: 'anh/chị, ông/bà, bạn (ngôi thứ II số ít)', difficulty: 'easy', category: 'Pronouns', lesson: 'Bài 1', section: 'main' },
  { id: '3', hiragana: 'あのひと', kanji: 'あの人', meaning: 'người kia, người đó, anh kia, chị kia', difficulty: 'easy', category: 'People', lesson: 'Bài 1', section: 'main' },
  { id: '4', hiragana: 'あのかた', kanji: 'あの(方)', meaning: '(あのかた : vị kia - là cách nói lịch sự của あのひと)', difficulty: 'easy', category: 'People', lesson: 'Bài 1', section: 'main' },
  { id: '5', hiragana: '～さん', kanji: '', meaning: 'anh, chị, ông, bà (hậu tố thêm vào phía sau tên người khác khi gọi thể hiện tính lịch sự)', difficulty: 'easy', category: 'Honorifics', lesson: 'Bài 1', section: 'main' },
  { id: '6', hiragana: '～ちゃん', kanji: '', meaning: '(hậu tố thêm vào phía sau tên của trẻ em thay cho ～さん)', difficulty: 'easy', category: 'Honorifics', lesson: 'Bài 1', section: 'main' },
  { id: '7', hiragana: '～じん', kanji: '～人', meaning: '(hậu tố mang nghĩa "người ～"; ví dụ アメリカじん : người Mỹ)', difficulty: 'easy', category: 'Nationality', lesson: 'Bài 1', section: 'main' },
  { id: '8', hiragana: 'せんせい', kanji: '先生', meaning: 'thầy/cô (không dùng khi giới thiệu về nghề giáo viên của chính mình)', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '9', hiragana: 'きょうし', kanji: '教師', meaning: 'giáo viên', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '10', hiragana: 'がくせい', kanji: '学生', meaning: 'học sinh, sinh viên', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '11', hiragana: 'かいしゃいん', kanji: '会社員', meaning: 'nhân viên công ty', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '12', hiragana: 'しゃいん', kanji: '社員', meaning: 'nhân viên Công ty ～ (dùng kèm theo tên công ty; ví dụ IMC の しゃいん)', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '13', hiragana: 'ぎんこういん', kanji: '銀行員', meaning: 'nhân viên ngân hàng', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '14', hiragana: 'いしゃ', kanji: '医者', meaning: 'bác sĩ', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '15', hiragana: 'けんきゅうしゃ', kanji: '研究者', meaning: 'nhà nghiên cứu', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '16', hiragana: 'だいがく', kanji: '大学', meaning: 'đại học, trường đại học', difficulty: 'easy', category: 'Places', lesson: 'Bài 1', section: 'main' },
  { id: '17', hiragana: 'びょういん', kanji: '病院', meaning: 'bệnh viện', difficulty: 'easy', category: 'Places', lesson: 'Bài 1', section: 'main' },
  { id: '18', hiragana: 'だれ', kanji: 'どなた', meaning: 'ai ( どなた là cách nói lịch sự của だれ, vị nào)', difficulty: 'easy', category: 'Questions', lesson: 'Bài 1', section: 'main' },
  { id: '19', hiragana: '～さい', kanji: '～歳', meaning: '～ tuổi', difficulty: 'easy', category: 'Age', lesson: 'Bài 1', section: 'main' },
  { id: '20', hiragana: 'なんさい', kanji: '何歳', meaning: 'mấy tuổi, bao nhiêu tuổi (おいくつ là cách nói lịch sự của なんさい)', difficulty: 'easy', category: 'Questions', lesson: 'Bài 1', section: 'main' },
  { id: '21', hiragana: 'はい', kanji: '', meaning: 'vâng, dạ', difficulty: 'easy', category: 'Responses', lesson: 'Bài 1', section: 'main' },
  { id: '22', hiragana: 'いいえ', kanji: '', meaning: 'không', difficulty: 'easy', category: 'Responses', lesson: 'Bài 1', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '23', hiragana: 'はじめまして。', kanji: '', meaning: 'Rất hân hạnh được gặp anh/chị. (Đây là lời chào với người lần đầu tiên gặp, là câu nói đầu tiên khi giới thiệu về mình.)', difficulty: 'easy', category: 'Greetings', lesson: 'Bài 1', section: 'conversation' },
  { id: '24', hiragana: '～から きました。', kanji: '来ました', meaning: 'Tôi đến từ ～.', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 1', section: 'conversation' },
  { id: '25', hiragana: '[どうぞ]よろしく [おねがいします]。', kanji: 'お願いします', meaning: 'Rất vui được làm quen với anh/chị. (Rất mong được sự giúp đỡ của anh/chị. Luôn được dùng làm câu kết thúc sau khi giới thiệu về mình.)', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 1', section: 'conversation' },
  { id: '26', hiragana: 'しつれいですが', kanji: '失礼ですが', meaning: 'Xin lỗi… (dùng khi hỏi ai đó về thông tin cá nhân như là tên hoặc địa chỉ của họ)', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 1', section: 'conversation' },
  { id: '27', hiragana: 'おなまえは？', kanji: 'お名前は？', meaning: 'Tên anh/chị là gì?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 1', section: 'conversation' },
  { id: '28', hiragana: 'こちらは ～さんです。', kanji: '', meaning: 'Đây là anh/chị/ông/bà ～.', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 1', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  // Quốc gia
  { id: '29', hiragana: 'アメリカ', kanji: '', meaning: 'Mỹ', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '30', hiragana: 'イギリス', kanji: '', meaning: 'Anh', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '31', hiragana: 'インド', kanji: '', meaning: 'Ấn Độ', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '32', hiragana: 'インドネシア', kanji: '', meaning: 'In-đô-nê-xi-a', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '33', hiragana: 'かんこく', kanji: '韓国', meaning: 'Hàn Quốc', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '34', hiragana: 'タイ', kanji: '', meaning: 'Thái Lan', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '35', hiragana: 'ちゅうごく', kanji: '中国', meaning: 'Trung Quốc', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '36', hiragana: 'ドイツ', kanji: '', meaning: 'Đức', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '37', hiragana: 'にほん', kanji: '日本', meaning: 'Nhật Bản', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '38', hiragana: 'ブラジル', kanji: '', meaning: 'Braxin', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },

  // Tên công ty, tổ chức giả định
  { id: '39', hiragana: 'IMC / パワーでんき / ブラジルエアー', kanji: 'パワー電気', meaning: 'tên công ty giả định', difficulty: 'easy', category: 'Companies', lesson: 'Bài 1', section: 'reading' },
  { id: '40', hiragana: 'AKC', kanji: '', meaning: 'tên tổ chức giả định', difficulty: 'easy', category: 'Organizations', lesson: 'Bài 1', section: 'reading' },
  { id: '41', hiragana: 'こうべびょういん', kanji: '神戸病院', meaning: 'tên bệnh viện giả định', difficulty: 'easy', category: 'Places', lesson: 'Bài 1', section: 'reading' },
  { id: '42', hiragana: 'さくらだいがく / ふじだいがく', kanji: '富士大学', meaning: 'tên đại học giả định', difficulty: 'easy', category: 'Places', lesson: 'Bài 1', section: 'reading' },

  // Ngôn ngữ
  { id: '43', hiragana: 'えいご', kanji: '英語', meaning: 'tiếng Anh', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' },
  { id: '44', hiragana: 'にほんご', kanji: '日本語', meaning: 'tiếng Nhật', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' },
  { id: '45', hiragana: 'イタリアご', kanji: 'イタリア語', meaning: 'tiếng Ý', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' },
  { id: '46', hiragana: 'ペルシアご', kanji: 'ペルシア語', meaning: 'tiếng Ba Tư', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' },
  { id: '47', hiragana: 'ヒンディーご', kanji: 'ヒンディー語', meaning: 'tiếng Hin-đi', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' },
  { id: '48', hiragana: 'インドネシアご', kanji: 'インドネシア語', meaning: 'tiếng In-đô-nê-xi-a', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' },
  { id: '49', hiragana: 'アラビアご', kanji: 'アラビア語', meaning: 'tiếng A-rập', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' },
  { id: '50', hiragana: 'フランスご', kanji: 'フランス語', meaning: 'tiếng Pháp', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' },
  { id: '51', hiragana: 'かんこくご', kanji: '韓国語', meaning: 'tiếng Hàn Quốc', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' },
  { id: '52', hiragana: 'ドイツご', kanji: 'ドイツ語', meaning: 'tiếng Đức', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' },
  { id: '53', hiragana: 'ベトナムご', kanji: 'ベトナム語', meaning: 'tiếng Việt', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' },
  { id: '54', hiragana: 'マレーシアご', kanji: 'マレーシア語', meaning: 'tiếng Mã Lai', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' },
  { id: '55', hiragana: 'スペインご', kanji: 'スペイン語', meaning: 'tiếng Tây Ban Nha', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' },
  { id: '56', hiragana: 'ポルトガルご', kanji: 'ポルトガル語', meaning: 'tiếng Bồ Đào Nha', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' },
  { id: '57', hiragana: 'ロシアご', kanji: 'ロシア語', meaning: 'tiếng Nga', difficulty: 'easy', category: 'Languages', lesson: 'Bài 1', section: 'reading' }
];
