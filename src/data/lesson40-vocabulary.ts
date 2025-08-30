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

export const lesson40Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'かぞえます II', kanji: '数えます', meaning: 'đếm', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'main' },
  { id: '2', hiragana: 'はかります I', kanji: '測ります', meaning: 'đo, cân', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'main' },
  { id: '3', hiragana: 'たしかめます II', kanji: '確かめます', meaning: 'xác nhận', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'main' },
  { id: '4', hiragana: 'あいます I', kanji: '合います', meaning: 'vừa [cỡ ~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'main' },
  { id: '5', hiragana: 'しゅっぱつします III', kanji: '出発します', meaning: 'xuất phát', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'main' },
  { id: '6', hiragana: 'とうちゃくします III', kanji: '到着します', meaning: 'đến', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'main' },
  { id: '7', hiragana: 'よいます I', kanji: '酔います', meaning: 'say rượu', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'main' },
  { id: '8', hiragana: 'でます II', kanji: '出ます', meaning: 'say', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'main' },
  { id: '9', hiragana: '[ごみを～]', kanji: '', meaning: 'có [nội dung câu hỏi thì]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'main' },
  { id: '10', hiragana: 'そうだんします III', kanji: '相談します', meaning: 'nói chuyện, thảo luận', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'main' },
  { id: '11', hiragana: 'ひつよう', kanji: '必要', meaning: 'cần thiết', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 40', section: 'main' },
  { id: '12', hiragana: 'てんきよほう', kanji: '天気予報', meaning: 'dự báo thời tiết', difficulty: 'hard', category: 'Weather', lesson: 'Bài 40', section: 'main' },
  { id: '13', hiragana: 'ぼうねんかい', kanji: '忘年会', meaning: 'tiệc cuối năm, tiệc tất niên', difficulty: 'hard', category: 'Events', lesson: 'Bài 40', section: 'main' },
  { id: '14', hiragana: 'しんねんかい', kanji: '新年会', meaning: 'tiệc đầu năm', difficulty: 'hard', category: 'Events', lesson: 'Bài 40', section: 'main' },
  { id: '15', hiragana: 'にじかい', kanji: '二次会', meaning: 'tăng hai, hiệp hai', difficulty: 'hard', category: 'Events', lesson: 'Bài 40', section: 'main' },
  { id: '16', hiragana: 'はっぴょうかい', kanji: '発表会', meaning: 'buổi phát biểu', difficulty: 'hard', category: 'Events', lesson: 'Bài 40', section: 'main' },
  { id: '17', hiragana: 'たいかい', kanji: '大会', meaning: 'cuộc thi', difficulty: 'medium', category: 'Events', lesson: 'Bài 40', section: 'main' },
  { id: '18', hiragana: 'マラソン', kanji: '', meaning: 'ma-ra-tông', difficulty: 'medium', category: 'Sports', lesson: 'Bài 40', section: 'main' },
  { id: '19', hiragana: 'コンテスト', kanji: '', meaning: 'cuộc thi', difficulty: 'medium', category: 'Events', lesson: 'Bài 40', section: 'main' },
  { id: '20', hiragana: 'おもて', kanji: '表', meaning: 'mặt phải', difficulty: 'medium', category: 'Directions', lesson: 'Bài 40', section: 'main' },
  { id: '21', hiragana: 'うら', kanji: '裏', meaning: 'mặt trái', difficulty: 'medium', category: 'Directions', lesson: 'Bài 40', section: 'main' },
  { id: '22', hiragana: 'まちがい', kanji: '間違い', meaning: 'vết thương, vết trầy, vết xước', difficulty: 'medium', category: 'Mistakes', lesson: 'Bài 40', section: 'main' },
  { id: '23', hiragana: 'きず', kanji: '傷', meaning: 'vết thương, vết trầy, vết xước', difficulty: 'medium', category: 'Injuries', lesson: 'Bài 40', section: 'main' },
  { id: '24', hiragana: 'ズボン', kanji: '', meaning: 'quần', difficulty: 'medium', category: 'Clothing', lesson: 'Bài 40', section: 'main' },
  { id: '25', hiragana: 'おとしより', kanji: 'お年寄り', meaning: 'người già, người cao tuổi', difficulty: 'hard', category: 'People', lesson: 'Bài 40', section: 'main' },
  { id: '26', hiragana: 'ながさ', kanji: '長さ', meaning: 'chiều dài', difficulty: 'medium', category: 'Measurements', lesson: 'Bài 40', section: 'main' },
  { id: '27', hiragana: 'おもさ', kanji: '重さ', meaning: 'trọng lượng', difficulty: 'medium', category: 'Measurements', lesson: 'Bài 40', section: 'main' },
  { id: '28', hiragana: 'たかさ', kanji: '高さ', meaning: 'chiều cao', difficulty: 'medium', category: 'Measurements', lesson: 'Bài 40', section: 'main' },
  { id: '29', hiragana: 'おおきさ', kanji: '大きさ', meaning: 'kích thước, độ lớn', difficulty: 'medium', category: 'Measurements', lesson: 'Bài 40', section: 'main' },
  { id: '30', hiragana: '～びん', kanji: '', meaning: '~ chuyến', difficulty: 'medium', category: 'Counters', lesson: 'Bài 40', section: 'main' },
  { id: '31', hiragana: '～こ', kanji: '～個', meaning: '~ cái (trợ số từ dùng để đếm vật nhỏ)', difficulty: 'medium', category: 'Counters', lesson: 'Bài 40', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '32', hiragana: 'どうですか', kanji: '', meaning: 'Như thế nào? (từ lịch sử của どうですか)', difficulty: 'medium', category: 'Questions', lesson: 'Bài 40', section: 'conversation' },
  { id: '33', hiragana: 'テスト', kanji: '', meaning: 'bài kiểm tra', difficulty: 'medium', category: 'Education', lesson: 'Bài 40', section: 'conversation' },
  { id: '34', hiragana: 'せいせき', kanji: '成績', meaning: 'thành tích', difficulty: 'medium', category: 'Education', lesson: 'Bài 40', section: 'conversation' },
  { id: '35', hiragana: 'とどきます II', kanji: '届きます', meaning: 'nhận tiền', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'conversation' },
  { id: '36', hiragana: 'いらっしゃいます', kanji: '', meaning: 'đến (kính ngữ của きます)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 40', section: 'conversation' },
  { id: '37', hiragana: 'じゅんび', kanji: '準備', meaning: 'bộ dạng, tình hình', difficulty: 'medium', category: 'Preparation', lesson: 'Bài 40', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '38', hiragana: 'じけん', kanji: '事件', meaning: 'vụ án', difficulty: 'medium', category: 'Crime', lesson: 'Bài 40', section: 'reading' },
  { id: '39', hiragana: 'オートバイ', kanji: '', meaning: 'mô-tô phân khối lớn', difficulty: 'medium', category: 'Transport', lesson: 'Bài 40', section: 'reading' },
  { id: '40', hiragana: 'ばくだん', kanji: '爆弾', meaning: 'bom', difficulty: 'hard', category: 'Weapons', lesson: 'Bài 40', section: 'reading' },
  { id: '41', hiragana: 'よびます I', kanji: '呼びます', meaning: 'chất lên', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'reading' },
  { id: '42', hiragana: 'たのみます I', kanji: '頼みます', meaning: 'nhờ', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'reading' },
  { id: '43', hiragana: 'わすれます II', kanji: '忘れます', meaning: 'quên', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'reading' },
  { id: '44', hiragana: 'どうします III', kanji: 'どうします', meaning: 'di chuyển', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'reading' },
  { id: '45', hiragana: 'いのち', kanji: '命', meaning: 'chăm chỉ, gắng hết sức', difficulty: 'hard', category: 'Life', lesson: 'Bài 40', section: 'reading' },
  { id: '46', hiragana: 'しぬ', kanji: '死ぬ', meaning: 'chết', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 40', section: 'reading' },
  { id: '47', hiragana: 'はんにん', kanji: '犯人', meaning: 'tội phạm', difficulty: 'hard', category: 'Crime', lesson: 'Bài 40', section: 'reading' },
  { id: '48', hiragana: 'ゆうき', kanji: '勇気', meaning: 'người đàn ông', difficulty: 'hard', category: 'Courage', lesson: 'Bài 40', section: 'reading' },
  { id: '49', hiragana: 'てにいれます II', kanji: '手に入れます', meaning: 'có được, mua được', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 40', section: 'reading' },
  { id: '50', hiragana: 'いままでも', kanji: '今までも', meaning: 'ngay cả bây giờ cũng', difficulty: 'hard', category: 'Time', lesson: 'Bài 40', section: 'reading' },
  { id: '51', hiragana: 'たんい', kanji: '単位', meaning: 'đơn vị', difficulty: 'hard', category: 'Units', lesson: 'Bài 40', section: 'reading' },
  { id: '52', hiragana: 'めんせき', kanji: '面積', meaning: 'diện tích', difficulty: 'hard', category: 'Mathematics', lesson: 'Bài 40', section: 'reading' },
  { id: '53', hiragana: 'センチメートル', kanji: '', meaning: 'xăng-ti-mét vuông', difficulty: 'hard', category: 'Units', lesson: 'Bài 40', section: 'reading' },
  { id: '54', hiragana: 'へいほう', kanji: '平方', meaning: 'mét vuông', difficulty: 'hard', category: 'Mathematics', lesson: 'Bài 40', section: 'reading' },
  { id: '55', hiragana: 'リットル', kanji: '', meaning: 'lít', difficulty: 'medium', category: 'Units', lesson: 'Bài 40', section: 'reading' },
  { id: '56', hiragana: 'かさ', kanji: '体積', meaning: 'thể tích, dung tích', difficulty: 'hard', category: 'Mathematics', lesson: 'Bài 40', section: 'reading' },
  { id: '57', hiragana: 'キロリットル', kanji: '', meaning: 'ki-lô-lít', difficulty: 'hard', category: 'Units', lesson: 'Bài 40', section: 'reading' },
  { id: '58', hiragana: 'グラム', kanji: '', meaning: 'gam', difficulty: 'medium', category: 'Units', lesson: 'Bài 40', section: 'reading' },
  { id: '59', hiragana: 'キログラム', kanji: '', meaning: 'ki-lô-gam', difficulty: 'hard', category: 'Units', lesson: 'Bài 40', section: 'reading' },
  { id: '60', hiragana: 'ミリグラム', kanji: '', meaning: 'mi-li-gam', difficulty: 'hard', category: 'Units', lesson: 'Bài 40', section: 'reading' },
  { id: '61', hiragana: 'トン', kanji: '', meaning: 'tấn', difficulty: 'medium', category: 'Units', lesson: 'Bài 40', section: 'reading' },
  { id: '62', hiragana: 'けいさん', kanji: '計算', meaning: 'tính toán', difficulty: 'hard', category: 'Mathematics', lesson: 'Bài 40', section: 'reading' },
  { id: '63', hiragana: 'たす', kanji: '足す', meaning: 'cộng', difficulty: 'medium', category: 'Mathematics', lesson: 'Bài 40', section: 'reading' },
  { id: '64', hiragana: 'ひく', kanji: '引く', meaning: 'trừ', difficulty: 'medium', category: 'Mathematics', lesson: 'Bài 40', section: 'reading' },
  { id: '65', hiragana: 'かける', kanji: '掛ける', meaning: 'nhân', difficulty: 'medium', category: 'Mathematics', lesson: 'Bài 40', section: 'reading' },
  { id: '66', hiragana: 'わる', kanji: '割る', meaning: 'chia', difficulty: 'medium', category: 'Mathematics', lesson: 'Bài 40', section: 'reading' },
  { id: '67', hiragana: 'イコール', kanji: '', meaning: 'bằng', difficulty: 'medium', category: 'Mathematics', lesson: 'Bài 40', section: 'reading' },
  { id: '68', hiragana: 'せん', kanji: '線', meaning: 'đường', difficulty: 'medium', category: 'Shapes', lesson: 'Bài 40', section: 'reading' },
  { id: '69', hiragana: 'ちょくせん', kanji: '直線', meaning: 'đường thẳng', difficulty: 'hard', category: 'Shapes', lesson: 'Bài 40', section: 'reading' },
  { id: '70', hiragana: 'きょくせん', kanji: '曲線', meaning: 'đường cong', difficulty: 'hard', category: 'Shapes', lesson: 'Bài 40', section: 'reading' },
  { id: '71', hiragana: 'てんせん', kanji: '点線', meaning: 'đường chấm', difficulty: 'hard', category: 'Shapes', lesson: 'Bài 40', section: 'reading' },
  { id: '72', hiragana: 'かたち', kanji: '形', meaning: 'hình', difficulty: 'medium', category: 'Shapes', lesson: 'Bài 40', section: 'reading' },
  { id: '73', hiragana: 'まる', kanji: '丸', meaning: 'hình tròn', difficulty: 'medium', category: 'Shapes', lesson: 'Bài 40', section: 'reading' },
  { id: '74', hiragana: 'さんかく', kanji: '三角', meaning: 'hình tam giác', difficulty: 'hard', category: 'Shapes', lesson: 'Bài 40', section: 'reading' },
  { id: '75', hiragana: 'しかく', kanji: '四角', meaning: 'hình tứ giác', difficulty: 'hard', category: 'Shapes', lesson: 'Bài 40', section: 'reading' },
  { id: '76', hiragana: 'もよう', kanji: '模様', meaning: 'hoa văn', difficulty: 'hard', category: 'Patterns', lesson: 'Bài 40', section: 'reading' },
  { id: '77', hiragana: 'よこじま', kanji: '横縞', meaning: 'kẻ sọc', difficulty: 'hard', category: 'Patterns', lesson: 'Bài 40', section: 'reading' },
  { id: '78', hiragana: 'たてじま', kanji: '縦縞', meaning: 'kẻ ngang', difficulty: 'hard', category: 'Patterns', lesson: 'Bài 40', section: 'reading' },
  { id: '79', hiragana: 'チェック', kanji: '', meaning: 'ca-rô', difficulty: 'medium', category: 'Patterns', lesson: 'Bài 40', section: 'reading' }
];
