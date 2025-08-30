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

export const lesson23Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'とじます I', kanji: '閉じます I', meaning: 'đóng (cửa, cửa sổ)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '2', hiragana: 'あけます II', kanji: '開けます II', meaning: 'mở', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '3', hiragana: 'しめます II', kanji: '閉めます II', meaning: 'đóng (cửa, cửa sổ)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '4', hiragana: 'つけます II', kanji: 'つけます II', meaning: 'bật', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '5', hiragana: 'けします II', kanji: '消します II', meaning: 'tắt', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '6', hiragana: 'いそぎます I', kanji: '急ぎます I', meaning: 'vội, gấp', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '7', hiragana: 'まちます I', kanji: '待ちます I', meaning: 'đợi, chờ', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '8', hiragana: 'もちます I', kanji: '持ちます I', meaning: 'mang, cầm', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '9', hiragana: 'とります I', kanji: '取ります I', meaning: 'lấy, chuyền', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '10', hiragana: 'てつだいます I', kanji: '手伝います I', meaning: 'giúp (làm việc gì)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '11', hiragana: 'よびます I', kanji: '呼びます I', meaning: 'gọi', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '12', hiragana: 'はなします I', kanji: '話します I', meaning: 'nói, nói chuyện', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '13', hiragana: 'つかいます I', kanji: '使います I', meaning: 'dùng, sử dụng', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '14', hiragana: 'とめます II', kanji: '止めます II', meaning: 'dừng, đỗ', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '15', hiragana: 'みせます II', kanji: '見せます II', meaning: 'cho xem, trình', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '16', hiragana: 'おしえます II', kanji: '教えます II', meaning: 'nói, cho biết [địa chỉ]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '17', hiragana: 'すわります I', kanji: '座ります I', meaning: 'ngồi', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '18', hiragana: 'たちます I', kanji: '立ちます I', meaning: 'đứng', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '19', hiragana: 'はいります I', kanji: '入ります I', meaning: 'vào [quán giải khát]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '20', hiragana: 'でます II', kanji: '出ます II', meaning: 'ra, khỏi [quán giải khát]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '21', hiragana: 'ふります I', kanji: '降ります I', meaning: 'mưa', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '22', hiragana: 'まがります I', kanji: '曲がります I', meaning: 'rẽ, quẹo [phải]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 23', section: 'main' },
  { id: '23', hiragana: 'さびしい', kanji: '寂しい', meaning: 'buồn, cô đơn', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 23', section: 'main' },
  { id: '24', hiragana: 'おゆ', kanji: 'お湯', meaning: 'nước nóng', difficulty: 'easy', category: 'Objects', lesson: 'Bài 23', section: 'main' },
  { id: '25', hiragana: 'おと', kanji: '音', meaning: 'âm thanh', difficulty: 'easy', category: 'Objects', lesson: 'Bài 23', section: 'main' },
  { id: '26', hiragana: 'サイズ', kanji: '', meaning: 'cỡ, kích cỡ', difficulty: 'easy', category: 'Objects', lesson: 'Bài 23', section: 'main' },
  { id: '27', hiragana: 'こしょう', kanji: '故障', meaning: 'hỏng hóc', difficulty: 'easy', category: 'Status', lesson: 'Bài 23', section: 'main' },
  { id: '28', hiragana: 'みち', kanji: '道', meaning: 'đường, đường sá', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'main' },
  { id: '29', hiragana: 'こうさてん', kanji: '交差点', meaning: 'ngã tư', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'main' },
  { id: '30', hiragana: 'しんごう', kanji: '信号', meaning: 'đèn tín hiệu', difficulty: 'easy', category: 'Objects', lesson: 'Bài 23', section: 'main' },
  { id: '31', hiragana: 'かど', kanji: '角', meaning: 'góc', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'main' },
  { id: '32', hiragana: 'はし', kanji: '橋', meaning: 'cầu', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'main' },
  { id: '33', hiragana: 'ちゅうしゃじょう', kanji: '駐車場', meaning: 'bãi đỗ xe', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'main' },
  { id: '34', hiragana: 'たてもの', kanji: '建物', meaning: 'toà nhà', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'main' },
  { id: '35', hiragana: 'なんかい', kanji: '何回', meaning: 'mấy lần', difficulty: 'easy', category: 'Questions', lesson: 'Bài 23', section: 'main' },
  { id: '36', hiragana: 'め', kanji: '目', meaning: 'thứ ~ , số ~', difficulty: 'easy', category: 'Suffixes', lesson: 'Bài 23', section: 'main' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '37', hiragana: 'ほどう', kanji: '歩道', meaning: 'đường cho người đi bộ', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'reading' },
  { id: '38', hiragana: 'しゃどう', kanji: '車道', meaning: 'đường cho xe ô-tô', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'reading' },
  { id: '39', hiragana: 'こうそくどうろ', kanji: '高速道路', meaning: 'đường cao tốc', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'reading' },
  { id: '40', hiragana: 'とおり', kanji: '通り', meaning: 'đường, phố', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'reading' },
  { id: '41', hiragana: 'こうさてん', kanji: '交差点', meaning: 'ngã tư', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'reading' },
  { id: '42', hiragana: 'おうだんほどう', kanji: '横断歩道', meaning: 'phần đường cho người đi bộ qua đường', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'reading' },
  { id: '43', hiragana: 'ほどうきょう', kanji: '歩道橋', meaning: 'cầu vượt cho người đi bộ', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'reading' },
  { id: '44', hiragana: 'かど', kanji: '角', meaning: 'góc', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'reading' },
  { id: '45', hiragana: 'しんごう', kanji: '信号', meaning: 'đèn tín hiệu', difficulty: 'easy', category: 'Objects', lesson: 'Bài 23', section: 'reading' },
  { id: '46', hiragana: 'さか', kanji: '坂', meaning: 'dốc', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'reading' },
  { id: '47', hiragana: 'ふみきり', kanji: '踏切', meaning: 'chắn tàu', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'reading' },
  { id: '48', hiragana: 'ガソリンスタンド', kanji: '', meaning: 'trạm xăng, cây xăng', difficulty: 'easy', category: 'Places', lesson: 'Bài 23', section: 'reading' },
  { id: '49', hiragana: 'とまれ', kanji: '止まれ', meaning: 'dừng lại', difficulty: 'easy', category: 'Signs', lesson: 'Bài 23', section: 'reading' },
  { id: '50', hiragana: 'しんにゅうきんし', kanji: '進入禁止', meaning: 'cấm đi vào', difficulty: 'easy', category: 'Signs', lesson: 'Bài 23', section: 'reading' },
  { id: '51', hiragana: 'いっぽうつうこう', kanji: '一方通行', meaning: 'đường một chiều', difficulty: 'easy', category: 'Signs', lesson: 'Bài 23', section: 'reading' },
  { id: '52', hiragana: 'ちゅうしゃきんし', kanji: '駐車禁止', meaning: 'cấm đỗ xe', difficulty: 'easy', category: 'Signs', lesson: 'Bài 23', section: 'reading' },
  { id: '53', hiragana: 'うせつきんし', kanji: '右折禁止', meaning: 'cấm rẽ phải', difficulty: 'easy', category: 'Signs', lesson: 'Bài 23', section: 'reading' }
];
