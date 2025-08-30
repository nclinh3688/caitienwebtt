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

export const lesson41Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'いただきます I', kanji: '頂きます', meaning: 'cho (kính ngữ của くれま-す)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 41', section: 'main' },
  { id: '2', hiragana: 'くださいます I', kanji: '下さいます', meaning: 'cho (động từ của người lớn tuổi, người dưới)', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 41', section: 'main' },
  { id: '3', hiragana: 'やります I', kanji: 'やります', meaning: 'dưới, động vật, thực vật', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 41', section: 'main' },
  { id: '4', hiragana: 'あげます II', kanji: '上げます', meaning: 'tăng', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 41', section: 'main' },
  { id: '5', hiragana: 'さげます II', kanji: '下げます', meaning: 'giảm', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 41', section: 'main' },
  { id: '6', hiragana: 'しんせつにします III', kanji: '親切にします', meaning: 'thân thiện, thân thiết', difficulty: 'hard', category: 'Verbs', lesson: 'Bài 41', section: 'main' },
  { id: '7', hiragana: 'かわいい', kanji: '可愛い', meaning: 'dễ thương', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 41', section: 'main' },
  { id: '8', hiragana: 'めずらしい', kanji: '珍しい', meaning: 'hiếm', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 41', section: 'main' },
  { id: '9', hiragana: 'おいわい', kanji: 'お祝い', meaning: 'chúc mừng, quà mừng (～をします: chúc mừng)', difficulty: 'medium', category: 'Celebrations', lesson: 'Bài 41', section: 'main' },
  { id: '10', hiragana: 'おとしだま', kanji: 'お年玉', meaning: 'tiền mừng tuổi', difficulty: 'hard', category: 'Money', lesson: 'Bài 41', section: 'main' },
  { id: '11', hiragana: '[お]みまい', kanji: '[お]見舞い', meaning: 'thăm hỏi, quà thăm hỏi', difficulty: 'hard', category: 'Visits', lesson: 'Bài 41', section: 'main' },
  { id: '12', hiragana: 'きょうみ', kanji: '興味', meaning: 'hứng thú với, có quan tâm đến ([コンピュ-タ-に] ～ があります: có hứng thú với [máy tính])', difficulty: 'medium', category: 'Interest', lesson: 'Bài 41', section: 'main' },
  { id: '13', hiragana: 'じょうほう', kanji: '情報', meaning: 'thông tin', difficulty: 'medium', category: 'Information', lesson: 'Bài 41', section: 'main' },
  { id: '14', hiragana: 'ぶんぽう', kanji: '文法', meaning: 'ngữ pháp', difficulty: 'medium', category: 'Grammar', lesson: 'Bài 41', section: 'main' },
  { id: '15', hiragana: 'はつおん', kanji: '発音', meaning: 'phát âm', difficulty: 'medium', category: 'Pronunciation', lesson: 'Bài 41', section: 'main' },
  { id: '16', hiragana: 'さる', kanji: '猿', meaning: 'con khỉ', difficulty: 'medium', category: 'Animals', lesson: 'Bài 41', section: 'main' },
  { id: '17', hiragana: 'えさ', kanji: '餌', meaning: 'thức ăn', difficulty: 'medium', category: 'Food', lesson: 'Bài 41', section: 'main' },
  { id: '18', hiragana: 'おもちゃ', kanji: 'おもちゃ', meaning: 'đồ chơi', difficulty: 'medium', category: 'Toys', lesson: 'Bài 41', section: 'main' },
  { id: '19', hiragana: 'えほん', kanji: '絵本', meaning: 'sách tranh', difficulty: 'medium', category: 'Books', lesson: 'Bài 41', section: 'main' },
  { id: '20', hiragana: 'はがき', kanji: '葉書き', meaning: 'bưu thiếp, bưu thiếp ảnh', difficulty: 'medium', category: 'Mail', lesson: 'Bài 41', section: 'main' },
  { id: '21', hiragana: 'ドライバー', kanji: '', meaning: 'tua-nơ-vít', difficulty: 'medium', category: 'Tools', lesson: 'Bài 41', section: 'main' },
  { id: '22', hiragana: 'くつした', kanji: '靴下', meaning: 'tất, vớ', difficulty: 'medium', category: 'Clothing', lesson: 'Bài 41', section: 'main' },
  { id: '23', hiragana: 'てぶくろ', kanji: '手袋', meaning: 'găng tay', difficulty: 'medium', category: 'Clothing', lesson: 'Bài 41', section: 'main' },
  { id: '24', hiragana: 'ようちえん', kanji: '幼稚園', meaning: 'trường mầm non', difficulty: 'medium', category: 'Education', lesson: 'Bài 41', section: 'main' },
  { id: '25', hiragana: 'だんぼう', kanji: '暖房', meaning: 'máy điều hòa nóng, máy sưởi', difficulty: 'medium', category: 'Appliances', lesson: 'Bài 41', section: 'main' },
  { id: '26', hiragana: 'れいぼう', kanji: '冷房', meaning: 'máy điều hòa chiều lạnh, máy lạnh', difficulty: 'medium', category: 'Appliances', lesson: 'Bài 41', section: 'main' },
  { id: '27', hiragana: 'おんど', kanji: '温度', meaning: 'nhiệt độ', difficulty: 'medium', category: 'Temperature', lesson: 'Bài 41', section: 'main' },
  { id: '28', hiragana: 'そふ', kanji: '祖父', meaning: 'ông (của mình)', difficulty: 'medium', category: 'Family', lesson: 'Bài 41', section: 'main' },
  { id: '29', hiragana: 'そぼ', kanji: '祖母', meaning: 'bà (của mình)', difficulty: 'medium', category: 'Family', lesson: 'Bài 41', section: 'main' },
  { id: '30', hiragana: 'まご', kanji: '孫', meaning: 'cháu (của mình)', difficulty: 'medium', category: 'Family', lesson: 'Bài 41', section: 'main' },
  { id: '31', hiragana: 'おじ', kanji: '伯父', meaning: 'chú, bác (của người khác)', difficulty: 'medium', category: 'Family', lesson: 'Bài 41', section: 'main' },
  { id: '32', hiragana: 'おば', kanji: '伯母', meaning: 'cô, dì, bác (của người khác)', difficulty: 'medium', category: 'Family', lesson: 'Bài 41', section: 'main' },
  { id: '33', hiragana: 'おじさん', kanji: '伯父さん', meaning: 'chú, dì, bác (của mình)', difficulty: 'medium', category: 'Family', lesson: 'Bài 41', section: 'main' },
  { id: '34', hiragana: 'おばさん', kanji: '伯母さん', meaning: 'cô, dì, bác (của mình)', difficulty: 'medium', category: 'Family', lesson: 'Bài 41', section: 'main' },
  { id: '35', hiragana: 'かんりにん', kanji: '管理人', meaning: 'người quản lý', difficulty: 'medium', category: 'Professions', lesson: 'Bài 41', section: 'main' },
  { id: '36', hiragana: '～さん', kanji: '～さん', meaning: 'ông-bà-(tiếp vĩ ngữ dùng đằng sau tên)', difficulty: 'medium', category: 'Suffixes', lesson: 'Bài 41', section: 'main' },
  { id: '37', hiragana: 'このあいだ', kanji: 'この間', meaning: 'vừa rồi', difficulty: 'medium', category: 'Time', lesson: 'Bài 41', section: 'main' },

  // 📖 II. 読み物 (ĐỌC THÊM)
  { id: '38', hiragana: 'けっこん', kanji: '結婚', meaning: 'kết hôn', difficulty: 'medium', category: 'Marriage', lesson: 'Bài 41', section: 'reading' },
  { id: '39', hiragana: 'むかしばなし', kanji: '昔話', meaning: 'truyện cổ tích', difficulty: 'hard', category: 'Stories', lesson: 'Bài 41', section: 'reading' },
  { id: '40', hiragana: 'ある～', kanji: 'ある～', meaning: 'một ~ nọ', difficulty: 'medium', category: 'Expressions', lesson: 'Bài 41', section: 'reading' },
  { id: '41', hiragana: 'おとこ', kanji: '男', meaning: 'người con trai', difficulty: 'medium', category: 'People', lesson: 'Bài 41', section: 'reading' },
  { id: '42', hiragana: 'こどもたち', kanji: '子どもたち', meaning: 'những đứa trẻ, bọn trẻ', difficulty: 'medium', category: 'People', lesson: 'Bài 41', section: 'reading' },
  { id: '43', hiragana: 'いじめます II', kanji: 'いじめます', meaning: 'bắt nạt', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 41', section: 'reading' },
  { id: '44', hiragana: 'かめ', kanji: '亀', meaning: 'con rùa', difficulty: 'medium', category: 'Animals', lesson: 'Bài 41', section: 'reading' },
  { id: '45', hiragana: 'たすけます II', kanji: '助けます', meaning: 'giúp đỡ', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 41', section: 'reading' },
  { id: '46', hiragana: 'やさしい', kanji: '優しい', meaning: 'hiền lành', difficulty: 'medium', category: 'Adjectives', lesson: 'Bài 41', section: 'reading' },
  { id: '47', hiragana: 'おひめさま', kanji: 'お姫様', meaning: 'nàng công chúa', difficulty: 'hard', category: 'People', lesson: 'Bài 41', section: 'reading' },
  { id: '48', hiragana: 'くらし', kanji: '暮らし', meaning: 'sinh sống', difficulty: 'medium', category: 'Life', lesson: 'Bài 41', section: 'reading' },
  { id: '49', hiragana: 'りく', kanji: '陸', meaning: 'đất liền', difficulty: 'medium', category: 'Geography', lesson: 'Bài 41', section: 'reading' },
  { id: '50', hiragana: 'きがつきます II', kanji: '気がつきます', meaning: 'khi đó', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 41', section: 'reading' },
  { id: '51', hiragana: 'とどきます I', kanji: '届きます', meaning: 'tới', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 41', section: 'reading' },
  { id: '52', hiragana: 'のこります I', kanji: '残ります', meaning: 'sót', difficulty: 'medium', category: 'Verbs', lesson: 'Bài 41', section: 'reading' },
  { id: '53', hiragana: 'はこ', kanji: '箱', meaning: 'trắng toát', difficulty: 'medium', category: 'Objects', lesson: 'Bài 41', section: 'reading' },
  { id: '54', hiragana: 'なかみ', kanji: '中身', meaning: 'đồ ở trong, nội dung bên trong', difficulty: 'medium', category: 'Contents', lesson: 'Bài 41', section: 'reading' },
  { id: '55', hiragana: 'うらしま太郎', kanji: '浦島太郎', meaning: 'tên nhân vật chính trong truyện cổ tích', difficulty: 'hard', category: 'Names', lesson: 'Bài 41', section: 'reading' }
];
