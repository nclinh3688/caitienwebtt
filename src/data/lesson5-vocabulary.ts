export interface VocabularyWord {
  section?: 'main' | 'conversation' | 'reading'; // Thêm trường section
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

export const lesson5Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'いきます', kanji: '行きます', meaning: 'đi', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 5', section: 'main' },
  { id: '2', hiragana: 'きます', kanji: '来ます', meaning: 'đến', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 5', section: 'main' },
  { id: '3', hiragana: 'かえります', kanji: '帰ります', meaning: 'về', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 5', section: 'main' },
  { id: '4', hiragana: 'がっこう', kanji: '学校', meaning: 'trường học', difficulty: 'easy', category: 'Places', lesson: 'Bài 5', section: 'main' },
  { id: '5', hiragana: 'スーパー', kanji: '', meaning: 'siêu thị', difficulty: 'easy', category: 'Places', lesson: 'Bài 5', section: 'main' },
  { id: '6', hiragana: 'えき', kanji: '駅', meaning: 'ga (xe lửa)', difficulty: 'easy', category: 'Places', lesson: 'Bài 5', section: 'main' },
  { id: '7', hiragana: 'ひこうき', kanji: '飛行機', meaning: 'máy bay', difficulty: 'easy', category: 'Transport', lesson: 'Bài 5', section: 'main' },
  { id: '8', hiragana: 'ふね', kanji: '船', meaning: 'tàu thủy', difficulty: 'easy', category: 'Transport', lesson: 'Bài 5', section: 'main' },
  { id: '9', hiragana: 'でんしゃ', kanji: '電車', meaning: 'tàu điện', difficulty: 'easy', category: 'Transport', lesson: 'Bài 5', section: 'main' },
  { id: '10', hiragana: 'ちかてつ', kanji: '地下鉄', meaning: 'tàu điện ngầm', difficulty: 'easy', category: 'Transport', lesson: 'Bài 5', section: 'main' },
  { id: '11', hiragana: 'しんかんせん', kanji: '新幹線', meaning: 'tàu cao tốc Shinkansen', difficulty: 'easy', category: 'Transport', lesson: 'Bài 5', section: 'main' },
  { id: '12', hiragana: 'バス', kanji: '', meaning: 'xe buýt', difficulty: 'easy', category: 'Transport', lesson: 'Bài 5', section: 'main' },
  { id: '13', hiragana: 'タクシー', kanji: '', meaning: 'taxi', difficulty: 'easy', category: 'Transport', lesson: 'Bài 5', section: 'main' },
  { id: '14', hiragana: 'じてんしゃ', kanji: '自転車', meaning: 'xe đạp', difficulty: 'easy', category: 'Transport', lesson: 'Bài 5', section: 'main' },
  { id: '15', hiragana: 'あるいて', kanji: '歩いて', meaning: 'đi bộ', difficulty: 'easy', category: 'Transport', lesson: 'Bài 5', section: 'main' },
  { id: '16', hiragana: 'ひと', kanji: '人', meaning: 'người', difficulty: 'easy', category: 'People', lesson: 'Bài 5', section: 'main' },
  { id: '17', hiragana: 'ともだち', kanji: '友達', meaning: 'bạn bè', difficulty: 'easy', category: 'People', lesson: 'Bài 5', section: 'main' },
  { id: '18', hiragana: 'かれ', kanji: '彼', meaning: 'anh ấy, cậu ấy', difficulty: 'easy', category: 'People', lesson: 'Bài 5', section: 'main' },
  { id: '19', hiragana: 'かのじょ', kanji: '彼女', meaning: 'cô ấy, chị ấy', difficulty: 'easy', category: 'People', lesson: 'Bài 5', section: 'main' },
  { id: '20', hiragana: 'かぞく', kanji: '家族', meaning: 'gia đình', difficulty: 'easy', category: 'People', lesson: 'Bài 5', section: 'main' },
  { id: '21', hiragana: 'せんせい', kanji: '先生', meaning: 'giáo viên, thầy cô', difficulty: 'easy', category: 'People', lesson: 'Bài 5', section: 'main' },
  { id: '22', hiragana: 'がくせい', kanji: '学生', meaning: 'học sinh, sinh viên', difficulty: 'easy', category: 'People', lesson: 'Bài 5', section: 'main' },
  { id: '23', hiragana: 'かいしゃいん', kanji: '会社員', meaning: 'nhân viên công ty', difficulty: 'easy', category: 'People', lesson: 'Bài 5', section: 'main' },
  { id: '24', hiragana: 'だいがく', kanji: '大学', meaning: 'đại học', difficulty: 'easy', category: 'Places', lesson: 'Bài 5', section: 'main' },
  { id: '25', hiragana: 'びょういん', kanji: '病院', meaning: 'bệnh viện', difficulty: 'easy', category: 'Places', lesson: 'Bài 5', section: 'main' },
  { id: '26', hiragana: 'ぎんこう', kanji: '銀行', meaning: 'ngân hàng', difficulty: 'easy', category: 'Places', lesson: 'Bài 5', section: 'main' },
  { id: '27', hiragana: 'ゆうびんきょく', kanji: '郵便局', meaning: 'bưu điện', difficulty: 'easy', category: 'Places', lesson: 'Bài 5', section: 'main' },
  { id: '28', hiragana: 'としょかん', kanji: '図書館', meaning: 'thư viện', difficulty: 'easy', category: 'Places', lesson: 'Bài 5', section: 'main' },
  { id: '29', hiragana: 'びじゅつかん', kanji: '美術館', meaning: 'bảo tàng mỹ thuật', difficulty: 'easy', category: 'Places', lesson: 'Bài 5', section: 'main' },
  { id: '30', hiragana: 'こうえん', kanji: '公園', meaning: 'công viên', difficulty: 'easy', category: 'Places', lesson: 'Bài 5', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '31', hiragana: 'いつ', kanji: '', meaning: 'bao giờ, khi nào', difficulty: 'easy', category: 'Questions', lesson: 'Bài 5', section: 'conversation' },
  { id: '32', hiragana: 'どこ', kanji: '', meaning: 'ở đâu, chỗ nào', difficulty: 'easy', category: 'Questions', lesson: 'Bài 5', section: 'conversation' },
  { id: '33', hiragana: 'だれ', kanji: '誰', meaning: 'ai', difficulty: 'easy', category: 'Questions', lesson: 'Bài 5', section: 'conversation' },
  { id: '34', hiragana: 'なに', kanji: '何', meaning: 'cái gì', difficulty: 'easy', category: 'Questions', lesson: 'Bài 5', section: 'conversation' },
  { id: '35', hiragana: 'どう', kanji: '', meaning: 'như thế nào', difficulty: 'easy', category: 'Questions', lesson: 'Bài 5', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '36', hiragana: 'あさ', kanji: '朝', meaning: 'buổi sáng', difficulty: 'easy', category: 'Time', lesson: 'Bài 5', section: 'reading' },
  { id: '37', hiragana: 'ひる', kanji: '昼', meaning: 'buổi trưa', difficulty: 'easy', category: 'Time', lesson: 'Bài 5', section: 'reading' },
  { id: '38', hiragana: 'ばん', kanji: '晩', meaning: 'buổi tối', difficulty: 'easy', category: 'Time', lesson: 'Bài 5', section: 'reading' },
  { id: '39', hiragana: 'よる', kanji: '夜', meaning: 'đêm', difficulty: 'easy', category: 'Time', lesson: 'Bài 5', section: 'reading' },
  { id: '40', hiragana: 'きのう', kanji: '昨日', meaning: 'hôm qua', difficulty: 'easy', category: 'Time', lesson: 'Bài 5', section: 'reading' },
  { id: '41', hiragana: 'きょう', kanji: '今日', meaning: 'hôm nay', difficulty: 'easy', category: 'Time', lesson: 'Bài 5', section: 'reading' },
  { id: '42', hiragana: 'あした', kanji: '明日', meaning: 'ngày mai', difficulty: 'easy', category: 'Time', lesson: 'Bài 5', section: 'reading' },
  { id: '43', hiragana: 'せんしゅう', kanji: '先週', meaning: 'tuần trước', difficulty: 'easy', category: 'Time', lesson: 'Bài 5', section: 'reading' },
  { id: '44', hiragana: 'こんしゅう', kanji: '今週', meaning: 'tuần này', difficulty: 'easy', category: 'Time', lesson: 'Bài 5', section: 'reading' },
  { id: '45', hiragana: 'らいしゅう', kanji: '来週', meaning: 'tuần sau', difficulty: 'easy', category: 'Time', lesson: 'Bài 5', section: 'reading' }
];
