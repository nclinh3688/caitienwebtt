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

export const lesson2Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  // Chỉ từ, đại từ
  { id: 'l2-1', hiragana: 'これ', kanji: '', meaning: 'cái này, đây (vật ở gần người nói)', example: 'これはほんです。', exampleMeaning: 'Đây là quyển sách.', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-2', hiragana: 'それ', kanji: '', meaning: 'cái đó, đó (vật ở gần người nghe)', example: 'それはかさですか。', exampleMeaning: 'Đó là cái ô phải không?', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-3', hiragana: 'あれ', kanji: '', meaning: 'cái kia, kia (vật ở xa cả hai)', example: 'あれはテレビです。', exampleMeaning: 'Kia là cái TV.', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-4', hiragana: 'この', kanji: '', meaning: 'này (đi ngay sau là danh từ)', example: 'このほんはわたしのです。', exampleMeaning: 'Quyển sách này là của tôi.', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-5', hiragana: 'その', kanji: '', meaning: 'đó (đi ngay sau là danh từ)', example: 'そのかばんはあなたのですか。', exampleMeaning: 'Cái cặp đó là của bạn phải không?', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-6', hiragana: 'あの', kanji: '', meaning: 'kia (đi ngay sau là danh từ)', example: 'あのかたはどなたですか。', exampleMeaning: 'Vị kia là ai?', difficulty: 'easy', category: 'Demonstratives', lesson: 'Bài 2', section: 'main' },

  // Danh từ - Đồ vật
  { id: 'l2-7', hiragana: 'ほん', kanji: '本', meaning: 'sách, quyển sách', example: 'これはにほんごのほんです。', exampleMeaning: 'Đây là sách tiếng Nhật.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-8', hiragana: 'じしょ', kanji: '辞書', meaning: 'từ điển', example: 'それはじしょです。', exampleMeaning: 'Đó là từ điển.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-9', hiragana: 'ざっし', kanji: '雑誌', meaning: 'tạp chí', example: 'あれはざっしです。', exampleMeaning: 'Kia là tạp chí.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-10', hiragana: 'しんぶん', kanji: '新聞', meaning: 'báo, tờ báo', example: 'これをください。', exampleMeaning: 'Làm ơn cho tôi xem tờ báo này.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-11', hiragana: 'ノート', kanji: '', meaning: 'quyển vở, sổ tay', example: 'これはだれのノートですか。', exampleMeaning: 'Đây là vở của ai?', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-12', hiragana: 'てちょう', kanji: '手帳', meaning: 'sổ tay', example: 'これはてちょうです。', exampleMeaning: 'Đây là sổ tay.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-13', hiragana: 'めいし', kanji: '名刺', meaning: 'danh thiếp', example: 'これはわたしのめいしです。', exampleMeaning: 'Đây là danh thiếp của tôi.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-14', hiragana: 'カード', kanji: '', meaning: 'thẻ, cạc', example: 'それはテレホンカードですか。', exampleMeaning: 'Đó là thẻ điện thoại phải không?', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-15', hiragana: 'えんぴつ', kanji: '鉛筆', meaning: 'bút chì', example: 'これはえんぴつです。', exampleMeaning: 'Đây là bút chì.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-16', hiragana: 'ボールペン', kanji: '', meaning: 'bút bi', example: 'それはボールペンです。', exampleMeaning: 'Đó là bút bi.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-17', hiragana: 'シャープペンシル', kanji: '', meaning: 'bút chì kim', example: 'あれはシャープペンシルです。', exampleMeaning: 'Kia là bút chì kim.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-18', hiragana: 'かぎ', kanji: '', meaning: 'chìa khóa', example: 'これはくるまのかぎです。', exampleMeaning: 'Đây là chìa khóa xe ô tô.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-19', hiragana: 'とけい', kanji: '時計', meaning: 'đồng hồ', example: 'このとけいはわたしのです。', exampleMeaning: 'Cái đồng hồ này là của tôi.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-20', hiragana: 'かさ', kanji: '傘', meaning: 'ô, dù', example: 'このかさはだれのですか。', exampleMeaning: 'Cái ô này của ai?', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-21', hiragana: 'かばん', kanji: '', meaning: 'cặp sách, túi xách', example: 'そのかばんはあなたのです。', exampleMeaning: 'Cái cặp đó là của bạn.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-22', hiragana: 'テレビ', kanji: '', meaning: 'tivi', example: 'これはにほんのテレビです。', exampleMeaning: 'Đây là tivi của Nhật.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-23', hiragana: 'ラジオ', kanji: '', meaning: 'radio, đài', example: 'それはラジオです。', exampleMeaning: 'Đó là cái đài.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-24', hiragana: 'カメラ', kanji: '', meaning: 'máy ảnh', example: 'これはどこのカメラですか。', exampleMeaning: 'Đây là máy ảnh của nước nào?', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-25', hiragana: 'コンピューター', kanji: '', meaning: 'máy vi tính', example: 'あれはコンピューターです。', exampleMeaning: 'Kia là máy vi tính.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-26', hiragana: 'くるま', kanji: '車', meaning: 'ô tô, xe hơi', example: 'これはにほんのくるまです。', exampleMeaning: 'Đây là ô tô của Nhật.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-27', hiragana: 'つくえ', kanji: '机', meaning: 'cái bàn', example: 'それはわたしのつくえです。', exampleMeaning: 'Đó là bàn của tôi.', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-28', hiragana: 'いす', kanji: '椅子', meaning: 'cái ghế', example: 'このいすはだれのですか。', exampleMeaning: 'Cái ghế này là của ai?', difficulty: 'easy', category: 'Things', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-29', hiragana: 'チョコレート', kanji: '', meaning: 'sô-cô-la', example: 'これはチョコレートです。', exampleMeaning: 'Đây là sô-cô-la.', difficulty: 'easy', category: 'Food', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-30', hiragana: 'コーヒー', kanji: '', meaning: 'cà phê', example: 'それはコーヒーですか。', exampleMeaning: 'Đó là cà phê phải không?', difficulty: 'easy', category: 'Food', lesson: 'Bài 2', section: 'main' },

  // Ngôn ngữ & Quốc gia
  { id: 'l2-31', hiragana: 'えいご', kanji: '英語', meaning: 'tiếng Anh', example: 'これはえいごのほんです。', exampleMeaning: 'Đây là sách tiếng Anh.', difficulty: 'easy', category: 'Language', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-32', hiragana: 'にほんご', kanji: '日本語', meaning: 'tiếng Nhật', example: 'それはにほんごのじしょです。', exampleMeaning: 'Đó là từ điển tiếng Nhật.', difficulty: 'easy', category: 'Language', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-33', hiragana: '～ご', kanji: '～語', meaning: 'tiếng ～', example: 'ベトナムご', exampleMeaning: 'Tiếng Việt', difficulty: 'easy', category: 'Language', lesson: 'Bài 2', section: 'main' },

  // Câu hỏi
  { id: 'l2-34', hiragana: 'なん', kanji: '何', meaning: 'cái gì, gì', example: 'これはなんですか。', exampleMeaning: 'Đây là cái gì?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 2', section: 'main' },
  { id: 'l2-35', hiragana: 'そう', kanji: '', meaning: 'đúng, phải', example: 'はい、そうです。', exampleMeaning: 'Vâng, đúng vậy.', difficulty: 'easy', category: 'Responses', lesson: 'Bài 2', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: 'l2-36', hiragana: 'そうですか。', kanji: '', meaning: 'Thế à? / Vậy à?', example: 'A: このかさはあなたのですか。B: いいえ、ちがいます。A:そうですか。', exampleMeaning: 'A: Cái ô này là của bạn à? B: Không, không phải. A: Vậy à?', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 2', section: 'conversation' },
  { id: 'l2-37', hiragana: 'あのう', kanji: '', meaning: 'à, ờ... (từ mào đầu, tỏ ý ngần ngại)', example: 'あのう、これはだれのかさですか。', exampleMeaning: 'À, cho hỏi đây là cái ô của ai ạ?', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 2', section: 'conversation' },
  { id: 'l2-38', hiragana: 'ほんのきもちです。', kanji: '本の気持ちです。', meaning: 'Đây là chút lòng thành của tôi.', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 2', section: 'conversation' },
  { id: 'l2-39', hiragana: 'どうぞ。', kanji: '', meaning: 'Xin mời.', example: 'A: どうぞ。B: どうも。', exampleMeaning: 'A: Xin mời. B: Cảm ơn.', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 2', section: 'conversation' },
  { id: 'l2-40', hiragana: 'どうも。', kanji: '', meaning: 'Cảm ơn.', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 2', section: 'conversation' },
  { id: 'l2-41', hiragana: '[どうも]ありがとう[ございます]。', kanji: '', meaning: 'Xin chân thành cảm ơn.', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 2', section: 'conversation' },
  { id: 'l2-42', hiragana: 'これからおせわになります。', kanji: 'これからお世話になります。', meaning: 'Từ nay mong được anh/chị giúp đỡ.', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 2', section: 'conversation' },
  { id: 'l2-43', hiragana: 'こちらこそよろしく。', kanji: '', meaning: 'Chính tôi mới là người mong được anh/chị giúp đỡ.', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 2', section: 'conversation' }
];