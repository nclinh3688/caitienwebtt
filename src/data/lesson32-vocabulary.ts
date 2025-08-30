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

export const lesson32Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'うんどうします III', kanji: '運動します', meaning: 'vận động', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '2', hiragana: 'せいこうします III', kanji: '成功します', meaning: 'thành công', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '3', hiragana: 'しっぱいします III', kanji: '失敗します', meaning: 'thất bại, trượt [kỳ thi]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '4', hiragana: 'ごうかくします III', kanji: '合格します', meaning: 'đỗ [kỳ thi]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '5', hiragana: 'やみます II', kanji: 'やみます', meaning: 'tạnh [mưa]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '6', hiragana: 'はれます II', kanji: '晴れます', meaning: 'quang đãng', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '7', hiragana: 'くもります II', kanji: '曇ります', meaning: 'có mây', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '8', hiragana: 'つづきます II', kanji: '続きます', meaning: 'kéo dài [sốt~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '9', hiragana: 'ひきます II', kanji: 'ひきます', meaning: 'bị cảm', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '10', hiragana: 'ひやします I', kanji: '冷やします', meaning: 'làm mát, làm lạnh', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '11', hiragana: 'こみます II', kanji: '込みます', meaning: 'đông [đường~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '12', hiragana: 'すきます II', kanji: '空きます', meaning: 'vắng [đường~]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '13', hiragana: 'でます II', kanji: '出ます', meaning: 'tham gia [trận đấu]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '14', hiragana: '[パーティーに～]', kanji: '', meaning: 'dự [tiệc]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '15', hiragana: 'むりをします III', kanji: '無理をします', meaning: 'gắng sức', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'main' },
  { id: '16', hiragana: 'じゅうぶん', kanji: '十分', meaning: 'đủ', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 32', section: 'main' },
  { id: '17', hiragana: 'おかしい', kanji: '', meaning: '(kỳ) lạ, thú vị', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 32', section: 'main' },
  { id: '18', hiragana: 'うるさい', kanji: '', meaning: 'ồn ào', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 32', section: 'main' },
  { id: '19', hiragana: 'せんせい', kanji: '先生', meaning: 'bác sĩ', difficulty: 'medium', category: 'Professions', lesson: 'Bài 32', section: 'main' },
  { id: '20', hiragana: 'けが', kanji: '', meaning: 'bỏng [~: bị bỏng]', difficulty: 'medium', category: 'Health', lesson: 'Bài 32', section: 'main' },
  { id: '21', hiragana: 'はれ', kanji: '', meaning: 'nắng', difficulty: 'medium', category: 'Weather', lesson: 'Bài 32', section: 'main' },
  { id: '22', hiragana: 'かぜ', kanji: '風邪', meaning: 'cảm', difficulty: 'medium', category: 'Health', lesson: 'Bài 32', section: 'main' },
  { id: '23', hiragana: 'インフルエンザ', kanji: '', meaning: 'cúm', difficulty: 'medium', category: 'Health', lesson: 'Bài 32', section: 'main' },
  { id: '24', hiragana: 'そら', kanji: '空', meaning: 'bầu trời', difficulty: 'easy', category: 'Nature', lesson: 'Bài 32', section: 'main' },
  { id: '25', hiragana: 'たいよう', kanji: '太陽', meaning: 'mặt trời', difficulty: 'medium', category: 'Nature', lesson: 'Bài 32', section: 'main' },
  { id: '26', hiragana: 'ほし', kanji: '星', meaning: 'sao', difficulty: 'easy', category: 'Nature', lesson: 'Bài 32', section: 'main' },
  { id: '27', hiragana: 'かぜ', kanji: '風', meaning: 'gió', difficulty: 'easy', category: 'Nature', lesson: 'Bài 32', section: 'main' },
  { id: '28', hiragana: 'ひがし', kanji: '東', meaning: 'đông', difficulty: 'medium', category: 'Direction', lesson: 'Bài 32', section: 'main' },
  { id: '29', hiragana: 'にし', kanji: '西', meaning: 'tây', difficulty: 'medium', category: 'Direction', lesson: 'Bài 32', section: 'main' },
  { id: '30', hiragana: 'みなみ', kanji: '南', meaning: 'nam', difficulty: 'medium', category: 'Direction', lesson: 'Bài 32', section: 'main' },
  { id: '31', hiragana: 'きた', kanji: '北', meaning: 'bắc', difficulty: 'medium', category: 'Direction', lesson: 'Bài 32', section: 'main' },
  { id: '32', hiragana: 'こくさい', kanji: '国際', meaning: '~ quốc tế', difficulty: 'medium', category: 'International', lesson: 'Bài 32', section: 'main' },
  { id: '33', hiragana: 'すいどう', kanji: '水道', meaning: 'nước máy', difficulty: 'medium', category: 'Infrastructure', lesson: 'Bài 32', section: 'main' },
  { id: '34', hiragana: 'エンジン', kanji: '', meaning: 'động cơ', difficulty: 'medium', category: 'Technology', lesson: 'Bài 32', section: 'main' },
  { id: '35', hiragana: 'チーム', kanji: '', meaning: 'đội', difficulty: 'medium', category: 'Sports', lesson: 'Bài 32', section: 'main' },
  { id: '36', hiragana: 'こんや', kanji: '今夜', meaning: 'tối nay', difficulty: 'medium', category: 'Time', lesson: 'Bài 32', section: 'main' },
  { id: '37', hiragana: 'ゆうがた', kanji: '夕方', meaning: 'chiều tối', difficulty: 'medium', category: 'Time', lesson: 'Bài 32', section: 'main' },
  { id: '38', hiragana: 'まえ', kanji: '', meaning: 'trước', difficulty: 'medium', category: 'Time', lesson: 'Bài 32', section: 'main' },
  { id: '39', hiragana: 'おそく', kanji: '遅く', meaning: 'muộn', difficulty: 'medium', category: 'Time', lesson: 'Bài 32', section: 'main' },
  { id: '40', hiragana: 'こんなに', kanji: '', meaning: 'như thế này', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 32', section: 'main' },
  { id: '41', hiragana: 'そんなに', kanji: '', meaning: 'như thế đó, như thế đấy (về những vật/điều liên quan đến người nghe)', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 32', section: 'main' },
  { id: '42', hiragana: 'あんなに', kanji: '', meaning: 'như thế kia (về những vật/điều không liên quan đến cả người nói lẫn người nghe)', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 32', section: 'main' },
  { id: '43', hiragana: 'ヨーロッパ', kanji: '', meaning: 'châu Âu', difficulty: 'medium', category: 'Places', lesson: 'Bài 32', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '44', hiragana: 'げんき', kanji: '元気', meaning: 'khỏe', difficulty: 'medium', category: 'Health', lesson: 'Bài 32', section: 'conversation' },
  { id: '45', hiragana: 'い', kanji: '胃', meaning: 'dạ dày', difficulty: 'medium', category: 'Body', lesson: 'Bài 32', section: 'conversation' },
  { id: '46', hiragana: 'ストレス', kanji: '', meaning: 'căng thẳng', difficulty: 'medium', category: 'Health', lesson: 'Bài 32', section: 'conversation' },
  { id: '47', hiragana: 'それはいけませんね', kanji: '', meaning: 'Thế thì thật không tốt.', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 32', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '48', hiragana: 'ぼんさい', kanji: '盆栽', meaning: 'bonsai', difficulty: 'medium', category: 'Hobbies', lesson: 'Bài 32', section: 'reading' },
  { id: '49', hiragana: 'ふるい', kanji: '古い', meaning: 'cũ', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 32', section: 'reading' },
  { id: '50', hiragana: 'きむら', kanji: '木村', meaning: 'sao Kim Ngưu', difficulty: 'medium', category: 'Names', lesson: 'Bài 32', section: 'reading' },
  { id: '51', hiragana: 'はたらきすぎ', kanji: '働きすぎ', meaning: 'làm việc quá sức', difficulty: 'medium', category: 'Work', lesson: 'Bài 32', section: 'reading' },
  { id: '52', hiragana: 'こまります II', kanji: '困ります', meaning: 'khó khăn', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'reading' },
  { id: '53', hiragana: 'しょっちゅう', kanji: '', meaning: 'số vẻ, số số', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 32', section: 'reading' },
  { id: '54', hiragana: 'あたります I', kanji: '当たります', meaning: 'trúng [xổ số]', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 32', section: 'reading' },
  { id: '55', hiragana: 'すこし', kanji: '少し', meaning: 'sức khỏe', difficulty: 'medium', category: 'Adverbs', lesson: 'Bài 32', section: 'reading' },
  { id: '56', hiragana: 'たんてい', kanji: '探偵', meaning: 'tình yêu', difficulty: 'medium', category: 'Professions', lesson: 'Bài 32', section: 'reading' },
  { id: '57', hiragana: 'こいびと', kanji: '恋人', meaning: 'người yêu', difficulty: 'medium', category: 'Relationships', lesson: 'Bài 32', section: 'reading' },
  { id: '58', hiragana: 'ラッキーアイテム', kanji: '', meaning: 'thứ được cho là đem lại sự may mắn trong bói toán', difficulty: 'hard', category: 'Objects', lesson: 'Bài 32', section: 'reading' },
  { id: '59', hiragana: 'いし', kanji: '石', meaning: 'hòn đá, viên đá', difficulty: 'medium', category: 'Nature', lesson: 'Bài 32', section: 'reading' },

  // Dự báo thời tiết (天気予報)
  { id: '60', hiragana: 'はれ', kanji: '晴れ', meaning: 'nắng, quang đãng', difficulty: 'medium', category: 'Weather', lesson: 'Bài 32', section: 'reading' },
  { id: '61', hiragana: 'くもり', kanji: '曇り', meaning: 'có mây', difficulty: 'medium', category: 'Weather', lesson: 'Bài 32', section: 'reading' },
  { id: '62', hiragana: 'あめ', kanji: '雨', meaning: 'mưa', difficulty: 'easy', category: 'Weather', lesson: 'Bài 32', section: 'reading' },
  { id: '63', hiragana: 'ゆき', kanji: '雪', meaning: 'tuyết', difficulty: 'easy', category: 'Weather', lesson: 'Bài 32', section: 'reading' },
  { id: '64', hiragana: 'くもりときどきはれ', kanji: '曇り時々晴れ', meaning: 'có mây, thỉnh thoảng có mưa', difficulty: 'hard', category: 'Weather', lesson: 'Bài 32', section: 'reading' },
  { id: '65', hiragana: 'はれのちくもり', kanji: '晴れのち曇り', meaning: 'có mây, một vài nơi có mưa', difficulty: 'hard', category: 'Weather', lesson: 'Bài 32', section: 'reading' },
  { id: '66', hiragana: 'てんき', kanji: '天気', meaning: 'thời tiết', difficulty: 'easy', category: 'Weather', lesson: 'Bài 32', section: 'reading' },
  { id: '67', hiragana: 'きしょう', kanji: '気象', meaning: 'khí tượng', difficulty: 'hard', category: 'Weather', lesson: 'Bài 32', section: 'reading' },
  { id: '68', hiragana: 'かんそく', kanji: '観測', meaning: 'quan sát', difficulty: 'hard', category: 'Weather', lesson: 'Bài 32', section: 'reading' },
  { id: '69', hiragana: 'ちゅうごく', kanji: '中国', meaning: 'Trung Quốc', difficulty: 'medium', category: 'Countries', lesson: 'Bài 32', section: 'reading' },
  { id: '70', hiragana: 'ちゅうぶ', kanji: '中部', meaning: 'miền Trung', difficulty: 'medium', category: 'Regions', lesson: 'Bài 32', section: 'reading' },
  { id: '71', hiragana: 'かんとく', kanji: '監督', meaning: 'giám đốc', difficulty: 'hard', category: 'Professions', lesson: 'Bài 32', section: 'reading' },
  { id: '72', hiragana: 'きゅうしゅう', kanji: '九州', meaning: 'Kyushu', difficulty: 'hard', category: 'Regions', lesson: 'Bài 32', section: 'reading' },
  { id: '73', hiragana: 'しこく', kanji: '四国', meaning: 'Shikoku', difficulty: 'hard', category: 'Regions', lesson: 'Bài 32', section: 'reading' },
  { id: '74', hiragana: 'かんとう', kanji: '関東', meaning: 'Kanto', difficulty: 'hard', category: 'Regions', lesson: 'Bài 32', section: 'reading' },
  { id: '75', hiragana: 'ほっかいどう', kanji: '北海道', meaning: 'Hokkaido', difficulty: 'hard', category: 'Regions', lesson: 'Bài 32', section: 'reading' },
  { id: '76', hiragana: 'れい', kanji: '例', meaning: 'ví dụ', difficulty: 'medium', category: 'Examples', lesson: 'Bài 32', section: 'reading' },
  { id: '77', hiragana: 'とうほく', kanji: '東北', meaning: 'Tohoku', difficulty: 'hard', category: 'Regions', lesson: 'Bài 32', section: 'reading' },
  { id: '78', hiragana: 'りゅうきゅう', kanji: '琉球', meaning: 'Ryukyu', difficulty: 'hard', category: 'Regions', lesson: 'Bài 32', section: 'reading' },
  { id: '79', hiragana: 'おきなわ', kanji: '沖縄', meaning: 'Okinawa', difficulty: 'hard', category: 'Regions', lesson: 'Bài 32', section: 'reading' }
];
