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

export const lesson3Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'おきます', kanji: '起きます', meaning: 'thức dậy', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 3', section: 'main' },
  { id: '2', hiragana: 'ねます', kanji: '寝ます', meaning: 'ngủ', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 3', section: 'main' },
  { id: '3', hiragana: 'はたらきます', kanji: '働きます', meaning: 'làm việc', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 3', section: 'main' },
  { id: '4', hiragana: 'やすみます', kanji: '休みます', meaning: 'nghỉ ngơi', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 3', section: 'main' },
  { id: '5', hiragana: 'べんきょうします', kanji: '勉強します', meaning: 'học', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 3', section: 'main' },
  { id: '6', hiragana: 'おわります', kanji: '終わります', meaning: 'kết thúc, xong', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 3', section: 'main' },
  { id: '7', hiragana: 'デパート', kanji: '', meaning: 'cửa hàng bách hóa', difficulty: 'easy', category: 'Places', lesson: 'Bài 3', section: 'main' },
  { id: '8', hiragana: 'ぎんこう', kanji: '銀行', meaning: 'ngân hàng', difficulty: 'easy', category: 'Places', lesson: 'Bài 3', section: 'main' },
  { id: '9', hiragana: 'ゆうびんきょく', kanji: '郵便局', meaning: 'bưu điện', difficulty: 'easy', category: 'Places', lesson: 'Bài 3', section: 'main' },
  { id: '10', hiragana: 'としょかん', kanji: '図書館', meaning: 'thư viện', difficulty: 'easy', category: 'Places', lesson: 'Bài 3', section: 'main' },
  { id: '11', hiragana: 'びじゅつかん', kanji: '美術館', meaning: 'bảo tàng mỹ thuật', difficulty: 'easy', category: 'Places', lesson: 'Bài 3', section: 'main' },
  { id: '12', hiragana: 'びょういん', kanji: '病院', meaning: 'bệnh viện', difficulty: 'easy', category: 'Places', lesson: 'Bài 3', section: 'main' },
  { id: '13', hiragana: 'こうえん', kanji: '公園', meaning: 'công viên', difficulty: 'easy', category: 'Places', lesson: 'Bài 3', section: 'main' },
  { id: '14', hiragana: 'えき', kanji: '駅', meaning: 'ga (xe lửa)', difficulty: 'easy', category: 'Places', lesson: 'Bài 3', section: 'main' },
  { id: '15', hiragana: 'みち', kanji: '道', meaning: 'đường, con đường', difficulty: 'easy', category: 'Places', lesson: 'Bài 3', section: 'main' },
  { id: '16', hiragana: 'ひだり', kanji: '左', meaning: 'trái, bên trái', difficulty: 'easy', category: 'Direction', lesson: 'Bài 3', section: 'main' },
  { id: '17', hiragana: 'みぎ', kanji: '右', meaning: 'phải, bên phải', difficulty: 'easy', category: 'Direction', lesson: 'Bài 3', section: 'main' },
  { id: '18', hiragana: 'まえ', kanji: '前', meaning: 'trước, phía trước', difficulty: 'easy', category: 'Direction', lesson: 'Bài 3', section: 'main' },
  { id: '19', hiragana: 'うしろ', kanji: '後ろ', meaning: 'sau, phía sau', difficulty: 'easy', category: 'Direction', lesson: 'Bài 3', section: 'main' },
  { id: '20', hiragana: 'なか', kanji: '中', meaning: 'trong, bên trong', difficulty: 'easy', category: 'Direction', lesson: 'Bài 3', section: 'main' },
  { id: '21', hiragana: 'そと', kanji: '外', meaning: 'ngoài, bên ngoài', difficulty: 'easy', category: 'Direction', lesson: 'Bài 3', section: 'main' },
  { id: '22', hiragana: 'となり', kanji: '隣', meaning: 'bên cạnh, kế bên', difficulty: 'easy', category: 'Direction', lesson: 'Bài 3', section: 'main' },
  { id: '23', hiragana: 'ちかく', kanji: '近く', meaning: 'gần, gần đây', difficulty: 'easy', category: 'Direction', lesson: 'Bài 3', section: 'main' },
  { id: '24', hiragana: 'とおく', kanji: '遠く', meaning: 'xa, xa xôi', difficulty: 'easy', category: 'Direction', lesson: 'Bài 3', section: 'main' },
  { id: '25', hiragana: 'ここ', kanji: '', meaning: 'chỗ này, đây', difficulty: 'easy', category: 'Location', lesson: 'Bài 3', section: 'main' },
  { id: '26', hiragana: 'そこ', kanji: '', meaning: 'chỗ đó, đó', difficulty: 'easy', category: 'Location', lesson: 'Bài 3', section: 'main' },
  { id: '27', hiragana: 'あそこ', kanji: '', meaning: 'chỗ kia, kia', difficulty: 'easy', category: 'Location', lesson: 'Bài 3', section: 'main' },
  { id: '28', hiragana: 'どこ', kanji: '', meaning: 'chỗ nào, đâu', difficulty: 'easy', category: 'Location', lesson: 'Bài 3', section: 'main' },
  { id: '29', hiragana: 'こちら', kanji: '', meaning: 'phía này, đây (lịch sự)', difficulty: 'easy', category: 'Location', lesson: 'Bài 3', section: 'main' },
  { id: '30', hiragana: 'そちら', kanji: '', meaning: 'phía đó, đó (lịch sự)', difficulty: 'easy', category: 'Location', lesson: 'Bài 3', section: 'main' },
  { id: '31', hiragana: 'あちら', kanji: '', meaning: 'phía kia, kia (lịch sự)', difficulty: 'easy', category: 'Location', lesson: 'Bài 3', section: 'main' },
  { id: '32', hiragana: 'どちら', kanji: '', meaning: 'phía nào, đâu (lịch sự)', difficulty: 'easy', category: 'Location', lesson: 'Bài 3', section: 'main' },
  { id: '33', hiragana: 'きのう', kanji: '昨日', meaning: 'hôm qua', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'main' },
  { id: '34', hiragana: 'きょう', kanji: '今日', meaning: 'hôm nay', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'main' },
  { id: '35', hiragana: 'あした', kanji: '明日', meaning: 'ngày mai', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'main' },
  { id: '36', hiragana: 'いま', kanji: '今', meaning: 'bây giờ, hiện tại', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '37', hiragana: 'あさ', kanji: '朝', meaning: 'buổi sáng', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'conversation' },
  { id: '38', hiragana: 'ひる', kanji: '昼', meaning: 'buổi trưa, ban ngày', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'conversation' },
  { id: '39', hiragana: 'ばん', kanji: '晩', meaning: 'buổi tối', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'conversation' },
  { id: '40', hiragana: 'よる', kanji: '夜', meaning: 'đêm, ban đêm', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'conversation' },
  { id: '41', hiragana: 'いま', kanji: '今', meaning: 'bây giờ, hiện tại', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'conversation' },
  { id: '42', hiragana: 'きのう', kanji: '昨日', meaning: 'hôm qua', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '43', hiragana: 'せんしゅう', kanji: '先週', meaning: 'tuần trước', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '44', hiragana: 'こんしゅう', kanji: '今週', meaning: 'tuần này', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '45', hiragana: 'らいしゅう', kanji: '来週', meaning: 'tuần sau', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '46', hiragana: 'せんげつ', kanji: '先月', meaning: 'tháng trước', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '47', hiragana: 'こんげつ', kanji: '今月', meaning: 'tháng này', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '48', hiragana: 'らいげつ', kanji: '来月', meaning: 'tháng sau', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '49', hiragana: 'きょねん', kanji: '去年', meaning: 'năm ngoái', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '50', hiragana: 'ことし', kanji: '今年', meaning: 'năm nay', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '51', hiragana: 'らいねん', kanji: '来年', meaning: 'năm sau', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '52', hiragana: 'せんしゅう', kanji: '先週', meaning: 'tuần trước', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '53', hiragana: 'こんしゅう', kanji: '今週', meaning: 'tuần này', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '54', hiragana: 'らいしゅう', kanji: '来週', meaning: 'tuần sau', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '55', hiragana: 'せんげつ', kanji: '先月', meaning: 'tháng trước', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '56', hiragana: 'こんげつ', kanji: '今月', meaning: 'tháng này', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '57', hiragana: 'らいげつ', kanji: '来月', meaning: 'tháng sau', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '58', hiragana: 'きょねん', kanji: '去年', meaning: 'năm ngoái', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '59', hiragana: 'ことし', kanji: '今年', meaning: 'năm nay', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' },
  { id: '60', hiragana: 'らいねん', kanji: '来年', meaning: 'năm sau', difficulty: 'easy', category: 'Time', lesson: 'Bài 3', section: 'reading' }
];
