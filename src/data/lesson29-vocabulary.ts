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

export const lesson29Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'あけます I', kanji: '開けます', meaning: 'mở [cửa]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '2', hiragana: 'しめます I', kanji: '閉めます', meaning: 'đóng [cửa]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '3', hiragana: 'つきます I', kanji: '点きます', meaning: 'sáng [điện]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '4', hiragana: 'きえます II', kanji: '消えます', meaning: 'tắt [điện]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '5', hiragana: 'こわれます II', kanji: '壊れます', meaning: 'hỏng [ghế]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '6', hiragana: 'われます II', kanji: '割れます', meaning: 'vỡ [cốc]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '7', hiragana: 'おれます II', kanji: '折れます', meaning: 'gãy [cây]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '8', hiragana: 'やぶれます II', kanji: '破れます', meaning: 'rách [giấy]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '9', hiragana: 'よごれます II', kanji: '汚れます', meaning: 'bẩn [áo quần]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '10', hiragana: 'つきます II', kanji: '付きます', meaning: 'có [túi]/dính [giấy]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '11', hiragana: 'はずれます II', kanji: '外れます', meaning: 'bung, rời [nút]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '12', hiragana: 'とまります II', kanji: '止まります', meaning: 'dừng, đỗ [xe]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '13', hiragana: 'まちがえます I', kanji: '間違えます', meaning: 'nhầm', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '14', hiragana: 'おとします I', kanji: '落とします', meaning: 'làm xuống, đánh rơi', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '15', hiragana: 'かかります I', kanji: '掛かります', meaning: 'đóng [khóa]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '16', hiragana: 'ふきます I', kanji: '拭きます', meaning: 'lau, chùi', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '17', hiragana: 'とりかえます I', kanji: '取り替えます', meaning: 'thay', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '18', hiragana: 'かたづけます I', kanji: '片づけます', meaning: 'dọn dẹp', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'main' },
  { id: '19', hiragana: 'さら', kanji: '[お]皿', meaning: 'đĩa', difficulty: 'medium', category: 'Objects', lesson: 'Bài 29', section: 'main' },
  { id: '20', hiragana: 'おちゃわん', kanji: '[お]茶わん', meaning: 'bát, chén', difficulty: 'medium', category: 'Objects', lesson: 'Bài 29', section: 'main' },
  { id: '21', hiragana: 'コップ', kanji: '', meaning: 'cốc', difficulty: 'medium', category: 'Objects', lesson: 'Bài 29', section: 'main' },
  { id: '22', hiragana: 'ガラス', kanji: '', meaning: 'ly', difficulty: 'medium', category: 'Objects', lesson: 'Bài 29', section: 'main' },
  { id: '23', hiragana: 'ふくろ', kanji: '袋', meaning: 'túi', difficulty: 'medium', category: 'Objects', lesson: 'Bài 29', section: 'main' },
  { id: '24', hiragana: 'しるし', kanji: '印', meaning: 'dấu', difficulty: 'medium', category: 'Objects', lesson: 'Bài 29', section: 'main' },
  { id: '25', hiragana: 'えだ', kanji: '枝', meaning: 'cành cây', difficulty: 'medium', category: 'Nature', lesson: 'Bài 29', section: 'main' },
  { id: '26', hiragana: 'えきいん', kanji: '駅員', meaning: 'nhân viên nhà ga', difficulty: 'medium', category: 'Professions', lesson: 'Bài 29', section: 'main' },
  { id: '27', hiragana: 'こうばん', kanji: '交番', meaning: 'đồn cảnh sát, bốt cảnh sát', difficulty: 'medium', category: 'Places', lesson: 'Bài 29', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '28', hiragana: 'スピーチ', kanji: '', meaning: 'diễn văn', difficulty: 'medium', category: 'Language', lesson: 'Bài 29', section: 'conversation' },
  { id: '29', hiragana: 'へんじ', kanji: '返事', meaning: 'trả lời', difficulty: 'medium', category: 'Language', lesson: 'Bài 29', section: 'conversation' },
  { id: '30', hiragana: 'おさきにどうぞ', kanji: 'お先にどうぞ', meaning: 'Mời anh/chị về trước.', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 29', section: 'conversation' },
  { id: '31', hiragana: 'げんじものがたり', kanji: '源氏物語', meaning: 'tiểu thuyết được viết bởi Murasaki Shikibu vào thời Heian (Truyện Genji)', difficulty: 'hard', category: 'Literature', lesson: 'Bài 29', section: 'conversation' },
  { id: '32', hiragana: 'わすれもの', kanji: '忘れ物', meaning: 'đồ bỏ quên', difficulty: 'medium', category: 'Objects', lesson: 'Bài 29', section: 'conversation' },
  { id: '33', hiragana: 'このくらい', kanji: '', meaning: 'cỡ tầm này, khoảng chừng này', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 29', section: 'conversation' },
  { id: '34', hiragana: '～がわ', kanji: '～側', meaning: 'phía ~', difficulty: 'medium', category: 'Location', lesson: 'Bài 29', section: 'conversation' },
  { id: '35', hiragana: 'ポケット', kanji: '', meaning: 'túi', difficulty: 'medium', category: 'Objects', lesson: 'Bài 29', section: 'conversation' },
  { id: '36', hiragana: '～へん', kanji: '～辺', meaning: 'chỗ ~', difficulty: 'medium', category: 'Location', lesson: 'Bài 29', section: 'conversation' },
  { id: '37', hiragana: 'おぼえていません', kanji: '覚えていません', meaning: 'Tôi không nhớ.', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 29', section: 'conversation' },
  { id: '38', hiragana: 'たしか', kanji: '確か', meaning: 'chắc chắn là', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 29', section: 'conversation' },
  { id: '39', hiragana: 'よかった', kanji: '', meaning: '[Ối,] tốt quá. (dùng khi biểu thị sự an tâm)', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 29', section: 'conversation' },
  { id: '40', hiragana: 'しんじゅく', kanji: '新宿', meaning: 'tên một địa điểm/nhà ga ở Tokyo', difficulty: 'medium', category: 'Places', lesson: 'Bài 29', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '41', hiragana: 'そら', kanji: '空', meaning: 'bầu trời', difficulty: 'easy', category: 'Nature', lesson: 'Bài 29', section: 'reading' },
  { id: '42', hiragana: 'ち', kanji: '地', meaning: 'đất', difficulty: 'medium', category: 'Nature', lesson: 'Bài 29', section: 'reading' },
  { id: '43', hiragana: '～じょう', kanji: '～畳', meaning: 'đơn vị đo diện tích chiếu Nhật Bản', difficulty: 'hard', category: 'Measurement', lesson: 'Bài 29', section: 'reading' },
  { id: '44', hiragana: 'おきます I', kanji: '置きます', meaning: 'đặt', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'reading' },
  { id: '45', hiragana: 'えきまえ', kanji: '駅前', meaning: 'trước ga', difficulty: 'medium', category: 'Places', lesson: 'Bài 29', section: 'reading' },
  { id: '46', hiragana: 'たおれます II', kanji: '倒れます', meaning: 'ngã', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'reading' },
  { id: '47', hiragana: '～のほう', kanji: '～の方', meaning: 'phía ~', difficulty: 'medium', category: 'Location', lesson: 'Bài 29', section: 'reading' },
  { id: '48', hiragana: 'もえます II', kanji: '燃えます', meaning: 'cháy', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 29', section: 'reading' },
  { id: '49', hiragana: 'レポーター', kanji: '', meaning: 'phóng viên', difficulty: 'medium', category: 'Professions', lesson: 'Bài 29', section: 'reading' },

  // Trạng thái & Vẻ ngoài (状態と外見)
  { id: '50', hiragana: 'ふとっている', kanji: '太っている', meaning: 'béo', difficulty: 'medium', category: 'Appearance', lesson: 'Bài 29', section: 'reading' },
  { id: '51', hiragana: 'やせている', kanji: '', meaning: 'gầy', difficulty: 'medium', category: 'Appearance', lesson: 'Bài 29', section: 'reading' },
  { id: '52', hiragana: 'ふくらんでいる', kanji: '', meaning: 'phồng', difficulty: 'medium', category: 'Appearance', lesson: 'Bài 29', section: 'reading' },
  { id: '53', hiragana: 'あながあいている', kanji: '穴が開いている', meaning: 'thủng lỗ', difficulty: 'medium', category: 'Appearance', lesson: 'Bài 29', section: 'reading' },
  { id: '54', hiragana: 'まがっている', kanji: '曲がっている', meaning: 'cong', difficulty: 'medium', category: 'Appearance', lesson: 'Bài 29', section: 'reading' },
  { id: '55', hiragana: 'ゆがんでいる', kanji: '', meaning: 'méo', difficulty: 'medium', category: 'Appearance', lesson: 'Bài 29', section: 'reading' },
  { id: '56', hiragana: 'ねじれている', kanji: '', meaning: 'xoắn', difficulty: 'medium', category: 'Appearance', lesson: 'Bài 29', section: 'reading' },
  { id: '57', hiragana: 'かけている', kanji: '欠けている', meaning: 'sứt', difficulty: 'medium', category: 'Appearance', lesson: 'Bài 29', section: 'reading' },
  { id: '58', hiragana: 'ひびがはいっている', kanji: 'ひびが入っている', meaning: 'nứt', difficulty: 'medium', category: 'Appearance', lesson: 'Bài 29', section: 'reading' },
  { id: '59', hiragana: 'くさっている', kanji: '腐っている', meaning: 'thiu', difficulty: 'medium', category: 'Appearance', lesson: 'Bài 29', section: 'reading' },
  { id: '60', hiragana: 'かわいている', kanji: '乾いている', meaning: 'khô', difficulty: 'medium', category: 'Appearance', lesson: 'Bài 29', section: 'reading' },
  { id: '61', hiragana: 'ぬれている', kanji: '', meaning: 'ướt', difficulty: 'medium', category: 'Appearance', lesson: 'Bài 29', section: 'reading' },
  { id: '62', hiragana: 'こおっている', kanji: '凍っている', meaning: 'đóng băng', difficulty: 'medium', category: 'Appearance', lesson: 'Bài 29', section: 'reading' }
];
