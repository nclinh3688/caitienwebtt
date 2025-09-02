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
  { id: '1', hiragana: 'わたし', kanji: '私', meaning: 'tôi', example: 'わたしはがくせいです。', exampleMeaning: 'Tôi là học sinh.', difficulty: 'easy', category: 'Pronouns', lesson: 'Bài 1', section: 'main' },
  { id: '2', hiragana: 'あなた', kanji: '', meaning: 'bạn, anh, chị, ông, bà', example: 'あなたはかいしゃいんですか。', exampleMeaning: 'Bạn có phải là nhân viên công ty không?', difficulty: 'easy', category: 'Pronouns', lesson: 'Bài 1', section: 'main' },
  { id: '3', hiragana: 'あのひと', kanji: 'あの人', meaning: 'người kia, người đó', example: 'あのひとはだれですか。', exampleMeaning: 'Người kia là ai?', difficulty: 'easy', category: 'People', lesson: 'Bài 1', section: 'main' },
  { id: '4', hiragana: 'あのかた', kanji: 'あの方', meaning: 'vị kia (lịch sự)', example: 'あのかたはどなたですか。', exampleMeaning: 'Vị kia là ai?', difficulty: 'easy', category: 'People', lesson: 'Bài 1', section: 'main' },
  { id: '5', hiragana: '～さん', kanji: '', meaning: 'anh, chị, ông, bà (hậu tố lịch sự)', example: 'やまださん', exampleMeaning: 'Anh/chị Yamada', difficulty: 'easy', category: 'Honorifics', lesson: 'Bài 1', section: 'main' },
  { id: '6', hiragana: '～ちゃん', kanji: '', meaning: 'bé (hậu tố thân mật cho trẻ em)', example: 'さくらちゃん', exampleMeaning: 'Bé Sakura', difficulty: 'easy', category: 'Honorifics', lesson: 'Bài 1', section: 'main' },
  { id: '7', hiragana: '～じん', kanji: '～人', meaning: 'người (chỉ quốc tịch)', example: 'わたしはベトナムじんです。', exampleMeaning: 'Tôi là người Việt Nam.', difficulty: 'easy', category: 'Nationality', lesson: 'Bài 1', section: 'main' },
  { id: '8', hiragana: 'せんせい', kanji: '先生', meaning: 'thầy, cô, giáo viên (khi gọi)', example: 'せんせい、おはようございます。', exampleMeaning: 'Chào buổi sáng thưa thầy/cô.', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '9', hiragana: 'きょうし', kanji: '教師', meaning: 'giáo viên (nghề nghiệp)', example: 'わたしはきょうしです。', exampleMeaning: 'Tôi là giáo viên.', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '10', hiragana: 'がくせい', kanji: '学生', meaning: 'học sinh, sinh viên', example: '彼はがくせいです。', exampleMeaning: 'Anh ấy là sinh viên.', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '11', hiragana: 'かいしゃいん', kanji: '会社員', meaning: 'nhân viên công ty', example: 'ちちはかいしゃいんです。', exampleMeaning: 'Bố tôi là nhân viên công ty.', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '12', hiragana: 'しゃいん', kanji: '社員', meaning: 'nhân viên của công ty ~', example: 'IMCのしゃいんです。', exampleMeaning: 'Tôi là nhân viên công ty IMC.', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '13', hiragana: 'ぎんこういん', kanji: '銀行員', meaning: 'nhân viên ngân hàng', example: 'あねはぎんこういんです。', exampleMeaning: 'Chị tôi là nhân viên ngân hàng.', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '14', hiragana: 'いしゃ', kanji: '医者', meaning: 'bác sĩ', example: 'かれはいしゃです。', exampleMeaning: 'Anh ấy là bác sĩ.', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '15', hiragana: 'けんきゅうしゃ', kanji: '研究者', meaning: 'nhà nghiên cứu', example: 'かのじょはけんきゅうしゃです。', exampleMeaning: 'Cô ấy là nhà nghiên cứu.', difficulty: 'easy', category: 'Professions', lesson: 'Bài 1', section: 'main' },
  { id: '16', hiragana: 'だいがく', kanji: '大学', meaning: 'trường đại học', example: 'さくらだいがく', exampleMeaning: 'Đại học Sakura', difficulty: 'easy', category: 'Places', lesson: 'Bài 1', section: 'main' },
  { id: '17', hiragana: 'びょういん', kanji: '病院', meaning: 'bệnh viện', example: 'こうべびょういん', exampleMeaning: 'Bệnh viện Kobe', difficulty: 'easy', category: 'Places', lesson: 'Bài 1', section: 'main' },
  { id: '18', hiragana: 'だれ', kanji: '誰', meaning: 'ai', example: 'あのひとはだれですか。', exampleMeaning: 'Người kia là ai?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 1', section: 'main' },
  { id: '18-polite', hiragana: 'どなた', kanji: '', meaning: 'vị nào (lịch sự của だれ)', example: 'あのかたはどなたですか。', exampleMeaning: 'Vị kia là ai?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 1', section: 'main' },
  { id: '19', hiragana: '～さい', kanji: '～歳', meaning: '～ tuổi', example: 'わたしは25さいです。', exampleMeaning: 'Tôi 25 tuổi.', difficulty: 'easy', category: 'Age', lesson: 'Bài 1', section: 'main' },
  { id: '20', hiragana: 'なんさい', kanji: '何歳', meaning: 'mấy tuổi, bao nhiêu tuổi', example: 'おこさんはなんさいですか。', exampleMeaning: 'Con bạn mấy tuổi?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 1', section: 'main' },
  { id: '20-polite', hiragana: 'おいくつ', kanji: '', meaning: 'bao nhiêu tuổi (lịch sự)', example: 'やまださんはおいくつですか。', exampleMeaning: 'Anh Yamada bao nhiêu tuổi?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 1', section: 'main' },
  { id: '21', hiragana: 'はい', kanji: '', meaning: 'vâng, dạ, đúng vậy', difficulty: 'easy', category: 'Responses', lesson: 'Bài 1', section: 'main' },
  { id: '22', hiragana: 'いいえ', kanji: '', meaning: 'không, sai rồi', difficulty: 'easy', category: 'Responses', lesson: 'Bài 1', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '23', hiragana: 'はじめまして。', kanji: '', meaning: 'Rất hân hạnh được gặp (lần đầu)', difficulty: 'easy', category: 'Greetings', lesson: 'Bài 1', section: 'conversation' },
  { id: '24', hiragana: '～からきました。', kanji: '～から来ました', meaning: 'Tôi đến từ ～', example: 'ベトナムからきました。', exampleMeaning: 'Tôi đến từ Việt Nam.', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 1', section: 'conversation' },
  { id: '25', hiragana: 'どうぞよろしくおねがいします。', kanji: 'どうぞ宜しくお願いします', meaning: 'Rất mong được sự giúp đỡ của bạn', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 1', section: 'conversation' },
  { id: '26', hiragana: 'しつれいですが', kanji: '失礼ですが', meaning: 'Xin lỗi, cho tôi hỏi...', example: 'しつれいですが、おなまえは？', exampleMeaning: 'Xin lỗi, tên bạn là gì?', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 1', section: 'conversation' },
  { id: '27', hiragana: 'おなまえは？', kanji: 'お名前は？', meaning: 'Tên bạn là gì?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 1', section: 'conversation' },
  { id: '28', hiragana: 'こちらは～さんです。', kanji: '', meaning: 'Đây là anh/chị/ông/bà ～', example: 'こちらはやまださんです。', exampleMeaning: 'Đây là anh Yamada.', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 1', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '29', hiragana: 'アメリカ', kanji: '', meaning: 'Mỹ (USA)', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '30', hiragana: 'イギリス', kanji: '', meaning: 'Anh (UK)', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '31', hiragana: 'インド', kanji: '', meaning: 'Ấn Độ', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '32', hiragana: 'インドネシア', kanji: '', meaning: 'Indonesia', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '33', hiragana: 'かんこく', kanji: '韓国', meaning: 'Hàn Quốc', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '34', hiragana: 'タイ', kanji: '', meaning: 'Thái Lan', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '35', hiragana: 'ちゅうごく', kanji: '中国', meaning: 'Trung Quốc', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '36', hiragana: 'ドイツ', kanji: '', meaning: 'Đức', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '37', hiragana: 'にほん', kanji: '日本', meaning: 'Nhật Bản', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '38', hiragana: 'ブラジル', kanji: '', meaning: 'Brazil', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
  { id: '53', hiragana: 'ベトナム', kanji: '', meaning: 'Việt Nam', difficulty: 'easy', category: 'Countries', lesson: 'Bài 1', section: 'reading' },
];
