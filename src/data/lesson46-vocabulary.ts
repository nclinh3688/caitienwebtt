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

export const lesson46Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'わたします I', kanji: '渡します', meaning: 'đưa, trao', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 46', section: 'main' },
  { id: '2', hiragana: 'かえってきます I', kanji: '帰って来ます', meaning: 'trở về', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 46', section: 'main' },
  { id: '3', hiragana: 'でます II', kanji: '出ます', meaning: 'xuất phát, rời bến [xe buýt~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 46', section: 'main' },
  { id: '4', hiragana: 'とどけます II', kanji: '届けます', meaning: 'đến [hành lý~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 46', section: 'main' },
  { id: '5', hiragana: 'にゅうがくします III', kanji: '入学します', meaning: 'nhập học [đại học]', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 46', section: 'main' },
  { id: '6', hiragana: 'そつぎょうします III', kanji: '卒業します', meaning: 'tốt nghiệp [đại học]', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 46', section: 'main' },
  { id: '7', hiragana: 'やきます I', kanji: '焼きます', meaning: 'nướng', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 46', section: 'main' },
  { id: '8', hiragana: 'やけます II', kanji: '焼けます', meaning: 'nướng chín [bánh mì~], nướng chín [thịt~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 46', section: 'main' },
  { id: '9', hiragana: 'のこります I', kanji: '残ります', meaning: 'còn, ở lại', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 46', section: 'main' },
  { id: '10', hiragana: 'たくはいびん', kanji: '宅配便', meaning: 'hàng được chuyển phát tận nhà, dịch vụ chuyển phát tận nhà', difficulty: 'hard', category: 'Delivery', lesson: 'Bài 46', section: 'main' },
  { id: '11', hiragana: 'げんいん', kanji: '原因', meaning: 'nguyên nhân', difficulty: 'medium', category: 'Causes', lesson: 'Bài 46', section: 'main' },
  { id: '12', hiragana: 'こちら', kanji: 'こちら', meaning: 'bên này, chỗ này, đây', difficulty: 'medium', category: 'Directions', lesson: 'Bài 46', section: 'main' },
  { id: '13', hiragana: '〜のところ', kanji: '〜の所', meaning: 'chỗ ~', difficulty: 'medium', category: 'Locations', lesson: 'Bài 46', section: 'main' },
  { id: '14', hiragana: 'はんとし', kanji: '半年', meaning: 'nửa năm', difficulty: 'medium', category: 'Time', lesson: 'Bài 46', section: 'main' },
  { id: '15', hiragana: 'ちょうど', kanji: 'ちょうど', meaning: 'vừa đúng, đúng', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 46', section: 'main' },
  { id: '16', hiragana: 'たったいま', kanji: 'たった今', meaning: 'vừa mới (dùng với thể quá khứ, biểu thị sự hoàn thành)', difficulty: 'hard', category: 'Time', lesson: 'Bài 46', section: 'main' },
  { id: '17', hiragana: 'いまいいですか', kanji: '今いいですか', meaning: 'Bây giờ có nói chuyện được không?', difficulty: 'hard', category: 'Questions', lesson: 'Bài 46', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '18', hiragana: 'ガスサービスセンター', kanji: '', meaning: 'trung tâm dịch vụ cung ứng ga', difficulty: 'hard', category: 'Services', lesson: 'Bài 46', section: 'conversation' },
  { id: '19', hiragana: 'ガスレンジ', kanji: '', meaning: 'bếp ga', difficulty: 'medium', category: 'Appliances', lesson: 'Bài 46', section: 'conversation' },
  { id: '20', hiragana: 'ぐあい', kanji: '具合', meaning: 'tình trạng, trạng thái', difficulty: 'medium', category: 'Condition', lesson: 'Bài 46', section: 'conversation' },
  { id: '21', hiragana: 'もうしわけありません', kanji: '申し訳ありません', meaning: 'Xin lỗi.', difficulty: 'hard', category: 'Apologies', lesson: 'Bài 46', section: 'conversation' },
  { id: '22', hiragana: 'どちらさまでしょうか', kanji: 'どちら様でしょうか', meaning: 'Ai đấy ạ?', difficulty: 'hard', category: 'Questions', lesson: 'Bài 46', section: 'conversation' },
  { id: '23', hiragana: 'おまたせしました', kanji: 'お待たせしました', meaning: 'Xin lỗi đã bắt anh/chị chờ lâu.', difficulty: 'hard', category: 'Apologies', lesson: 'Bài 46', section: 'conversation' },
  { id: '24', hiragana: 'むかいます I', kanji: '向かいます', meaning: 'đi đến đấy', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 46', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '25', hiragana: 'ゆめ', kanji: '夢', meaning: 'may', difficulty: 'medium', category: 'Dreams', lesson: 'Bài 46', section: 'reading' },
  { id: '26', hiragana: 'ゆめみます II', kanji: '夢を見ます', meaning: 'mơ', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 46', section: 'reading' },
  { id: '27', hiragana: 'ゆか', kanji: '床', meaning: 'sàn', difficulty: 'medium', category: 'Furniture', lesson: 'Bài 46', section: 'reading' },
  { id: '28', hiragana: 'なる', kanji: '鳴る', meaning: 'ngã', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 46', section: 'reading' },
  { id: '29', hiragana: 'ベル', kanji: '', meaning: 'chuông cửa', difficulty: 'medium', category: 'Objects', lesson: 'Bài 46', section: 'reading' },
  { id: '30', hiragana: 'なります I', kanji: '鳴ります', meaning: 'reng, kêu', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 46', section: 'reading' },
  { id: '31', hiragana: 'いそいで', kanji: '急いで', meaning: 'vội vàng', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 46', section: 'reading' },
  { id: '32', hiragana: 'つづけて', kanji: '続けて', meaning: 'theo thứ tự', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 46', section: 'reading' },
  { id: '33', hiragana: 'しごと', kanji: '仕事', meaning: 'sự việc', difficulty: 'medium', category: 'Work', lesson: 'Bài 46', section: 'reading' }
];
