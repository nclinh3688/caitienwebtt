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

export const lesson18Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'できます II', kanji: 'できます II', meaning: 'có thể', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 18', section: 'main' },
  { id: '2', hiragana: 'あらいます I', kanji: '洗います I', meaning: 'rửa', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 18', section: 'main' },
  { id: '3', hiragana: 'ひきます I', kanji: '弾きます I', meaning: 'chơi (nhạc cụ, piano, v.v.)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 18', section: 'main' },
  { id: '4', hiragana: 'うたいます I', kanji: '歌います I', meaning: 'hát', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 18', section: 'main' },
  { id: '5', hiragana: 'あつめます II', kanji: '集めます II', meaning: 'sưu tầm, thu thập, tập hợp', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 18', section: 'main' },
  { id: '6', hiragana: 'すてます II', kanji: '捨てます II', meaning: 'vứt, bỏ, bỏ đi', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 18', section: 'main' },
  { id: '7', hiragana: 'かえます II', kanji: '換えます II', meaning: 'đổi, trao đổi', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 18', section: 'main' },
  { id: '8', hiragana: 'うんてんします III', kanji: '運転します III', meaning: 'lái', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 18', section: 'main' },
  { id: '9', hiragana: 'よやくします III', kanji: '予約します III', meaning: 'đặt chỗ, đặt trước', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 18', section: 'main' },
  { id: '10', hiragana: 'ピアノ', kanji: '', meaning: 'đàn piano', difficulty: 'easy', category: 'Music', lesson: 'Bài 18', section: 'main' },
  { id: '11', hiragana: 'メートル', kanji: '', meaning: 'mét', difficulty: 'easy', category: 'Measurement', lesson: 'Bài 18', section: 'main' },
  { id: '12', hiragana: 'げんきん', kanji: '現金', meaning: 'tiền mặt', difficulty: 'easy', category: 'Money', lesson: 'Bài 18', section: 'main' },
  { id: '13', hiragana: 'しゅみ', kanji: '趣味', meaning: 'sở thích, thú vui', difficulty: 'easy', category: 'Hobbies', lesson: 'Bài 18', section: 'main' },
  { id: '14', hiragana: 'にっき', kanji: '日記', meaning: 'nhật ký', difficulty: 'easy', category: 'Objects', lesson: 'Bài 18', section: 'main' },
  { id: '15', hiragana: 'おいのり', kanji: 'お祈り', meaning: 'việc cầu nguyện', difficulty: 'easy', category: 'Religion', lesson: 'Bài 18', section: 'main' },
  { id: '16', hiragana: 'かちょう', kanji: '課長', meaning: 'tổ trưởng', difficulty: 'easy', category: 'Positions', lesson: 'Bài 18', section: 'main' },
  { id: '17', hiragana: 'ぶちょう', kanji: '部長', meaning: 'trưởng phòng', difficulty: 'easy', category: 'Positions', lesson: 'Bài 18', section: 'main' },
  { id: '18', hiragana: 'しゃちょう', kanji: '社長', meaning: 'giám đốc', difficulty: 'easy', category: 'Positions', lesson: 'Bài 18', section: 'main' },
  { id: '19', hiragana: 'どうぶつ', kanji: '動物', meaning: 'động vật', difficulty: 'easy', category: 'Animals', lesson: 'Bài 18', section: 'main' },
  { id: '20', hiragana: 'うま', kanji: '馬', meaning: 'ngựa', difficulty: 'easy', category: 'Animals', lesson: 'Bài 18', section: 'main' },
  { id: '21', hiragana: 'インターネット', kanji: '', meaning: 'in-tơ-nét, Internet', difficulty: 'easy', category: 'Technology', lesson: 'Bài 18', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '22', hiragana: 'とくに', kanji: '特に', meaning: 'đặc biệt là', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 18', section: 'conversation' },
  { id: '23', hiragana: 'へえ', kanji: '', meaning: 'Thế à!', difficulty: 'easy', category: 'Interjections', lesson: 'Bài 18', section: 'conversation' },
  { id: '24', hiragana: 'それはおもしろいですね', kanji: 'それは面白いですね', meaning: 'Điều đấy hay thật nhỉ', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 18', section: 'conversation' },
  { id: '25', hiragana: 'なかなか', kanji: '', meaning: 'khó mà, mãi mà', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 18', section: 'conversation' },
  { id: '26', hiragana: 'ほんとうですか', kanji: '本当ですか', meaning: 'Thật không ạ?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 18', section: 'conversation' },
  { id: '27', hiragana: 'ぜひ', kanji: '', meaning: 'nhất định', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 18', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '28', hiragana: 'とびます', kanji: '飛びます', meaning: 'bay', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '29', hiragana: 'とびます', kanji: '跳びます', meaning: 'nhảy', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '30', hiragana: 'のぼります', kanji: '登ります', meaning: 'leo', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '31', hiragana: 'はしります', kanji: '走ります', meaning: 'chạy', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '32', hiragana: 'およぎます', kanji: '泳ぎます', meaning: 'bơi', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '33', hiragana: 'もぐります', kanji: '潜ります', meaning: 'lặn', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '34', hiragana: 'とびこみます', kanji: '飛び込みます', meaning: 'nhảy xuống', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '35', hiragana: 'さかだちます', kanji: '逆立ちます', meaning: 'lộn ngược, trồng cây chuối', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '36', hiragana: 'はう', kanji: '這う', meaning: 'bò', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '37', hiragana: 'ける', kanji: '蹴る', meaning: 'đá', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '38', hiragana: 'ふる', kanji: '振る', meaning: 'vẫy', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '39', hiragana: 'もちあげます', kanji: '持ち上げます', meaning: 'nâng, nhấc', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '40', hiragana: 'なげます', kanji: '投げる', meaning: 'ném', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '41', hiragana: 'たたく', kanji: '叩く', meaning: 'đấm, đập, vỗ', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '42', hiragana: 'ひく', kanji: '引く', meaning: 'kéo', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '43', hiragana: 'おす', kanji: '押す', meaning: 'đẩy', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '44', hiragana: 'まげる', kanji: '曲げる', meaning: 'uốn, gập, bẻ cong', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '45', hiragana: 'のばす', kanji: '伸ばす', meaning: 'duỗi thẳng, kéo dài ra', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '46', hiragana: 'ころぶ', kanji: '転ぶ', meaning: 'ngã', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' },
  { id: '47', hiragana: 'ふりかえる', kanji: '振り返る', meaning: 'ngoảnh lại', difficulty: 'easy', category: 'Actions', lesson: 'Bài 18', section: 'reading' }
];
