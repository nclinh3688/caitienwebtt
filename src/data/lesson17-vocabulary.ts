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

export const lesson17Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'おぼえます II', kanji: '覚えます II', meaning: 'nhớ', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 17', section: 'main' },
  { id: '2', hiragana: 'わすれます II', kanji: '忘れます II', meaning: 'quên', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 17', section: 'main' },
  { id: '3', hiragana: 'なくします I', kanji: 'なくします I', meaning: 'làm mất, đánh mất', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 17', section: 'main' },
  { id: '4', hiragana: 'はらいます I', kanji: '払います I', meaning: 'trả tiền', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 17', section: 'main' },
  { id: '5', hiragana: 'かえします I', kanji: '返します I', meaning: 'trả lại', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 17', section: 'main' },
  { id: '6', hiragana: 'でかけます II', kanji: '出かけます II', meaning: 'ra ngoài', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 17', section: 'main' },
  { id: '7', hiragana: 'ぬぎます I', kanji: '脱ぎます I', meaning: 'cởi (quần áo, giày, v.v.)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 17', section: 'main' },
  { id: '8', hiragana: 'もっていきます I', kanji: '持って行きます I', meaning: 'mang đi, mang theo', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 17', section: 'main' },
  { id: '9', hiragana: 'もってきます III', kanji: '持って来ます III', meaning: 'mang đến', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 17', section: 'main' },
  { id: '10', hiragana: 'しんぱいします III', kanji: '心配します III', meaning: 'lo lắng', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 17', section: 'main' },
  { id: '11', hiragana: 'ざんぎょうします III', kanji: '残業します III', meaning: 'làm thêm giờ', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 17', section: 'main' },
  { id: '12', hiragana: 'しゅっちょうします III', kanji: '出張します III', meaning: 'đi công tác', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 17', section: 'main' },
  { id: '13', hiragana: 'のみます I', kanji: '飲みます I', meaning: 'uống [thuốc]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 17', section: 'main' },
  { id: '14', hiragana: 'くすりを', kanji: '薬を', meaning: 'uống [thuốc]', difficulty: 'easy', category: 'Medicine', lesson: 'Bài 17', section: 'main' },
  { id: '15', hiragana: 'はいります I', kanji: '入ります I', meaning: 'tắm bồn', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 17', section: 'main' },
  { id: '16', hiragana: 'おふろに', kanji: 'お風呂に', meaning: 'tắm bồn', difficulty: 'easy', category: 'Bathing', lesson: 'Bài 17', section: 'main' },
  { id: '17', hiragana: 'たいせつな', kanji: '大切な', meaning: 'quan trọng, quý giá', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 17', section: 'main' },
  { id: '18', hiragana: 'だいじょうぶな', kanji: '大丈夫な', meaning: 'không sao, không có vấn đề gì', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 17', section: 'main' },
  { id: '19', hiragana: 'あぶない', kanji: '危ない', meaning: 'nguy hiểm', difficulty: 'easy', category: 'Adjectives', lesson: 'Bài 17', section: 'main' },
  { id: '20', hiragana: 'きんえん', kanji: '禁煙', meaning: 'cấm hút thuốc', difficulty: 'easy', category: 'Rules', lesson: 'Bài 17', section: 'main' },
  { id: '21', hiragana: 'けんこうほけんしょう', kanji: '健康保険証', meaning: 'thẻ bảo hiểm [y tế]', difficulty: 'easy', category: 'Documents', lesson: 'Bài 17', section: 'main' },
  { id: '22', hiragana: 'ねつ', kanji: '熱', meaning: 'sốt', difficulty: 'easy', category: 'Health', lesson: 'Bài 17', section: 'main' },
  { id: '23', hiragana: 'びょうき', kanji: '病気', meaning: 'ốm, bệnh', difficulty: 'easy', category: 'Health', lesson: 'Bài 17', section: 'main' },
  { id: '24', hiragana: 'くすり', kanji: '薬', meaning: 'thuốc', difficulty: 'easy', category: 'Medicine', lesson: 'Bài 17', section: 'main' },
  { id: '25', hiragana: 'おふろ', kanji: 'お風呂', meaning: 'bồn tắm', difficulty: 'easy', category: 'Objects', lesson: 'Bài 17', section: 'main' },
  { id: '26', hiragana: 'うわぎ', kanji: '上着', meaning: 'áo khoác', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 17', section: 'main' },
  { id: '27', hiragana: 'したぎ', kanji: '下着', meaning: 'quần áo lót', difficulty: 'easy', category: 'Clothing', lesson: 'Bài 17', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '28', hiragana: 'どうしましたか', kanji: 'どうしましたか', meaning: 'Có vấn đề gì?/ Anh/Chị bị làm sao?', difficulty: 'easy', category: 'Questions', lesson: 'Bài 17', section: 'conversation' },
  { id: '29', hiragana: 'のど', kanji: '喉', meaning: 'họng', difficulty: 'easy', category: 'Body', lesson: 'Bài 17', section: 'conversation' },
  { id: '30', hiragana: 'がいたいです', kanji: 'が痛いです', meaning: 'Tôi bị đau [~]', difficulty: 'easy', category: 'Expressions', lesson: 'Bài 17', section: 'conversation' },
  { id: '31', hiragana: 'かぜ', kanji: '風邪', meaning: 'cảm, cúm', difficulty: 'easy', category: 'Health', lesson: 'Bài 17', section: 'conversation' },
  { id: '32', hiragana: 'それから', kanji: '', meaning: 'và, sau đó', difficulty: 'easy', category: 'Conjunctions', lesson: 'Bài 17', section: 'conversation' },
  { id: '33', hiragana: 'おだいじに', kanji: 'お大事に', meaning: 'Anh/Chị giữ gìn sức khỏe', difficulty: 'easy', category: 'Wishes', lesson: 'Bài 17', section: 'conversation' }
];
