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

export const lesson14Vocabulary: VocabularyWord[] = [
  // 📚 I. TỪ VỰNG CHÍNH (語彙)
  { id: '1', hiragana: 'つけます', kanji: '', meaning: 'bật', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '2', hiragana: 'けします', kanji: '消します', meaning: 'tắt', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '3', hiragana: 'あけます', kanji: '開けます', meaning: 'mở', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '4', hiragana: 'しめます', kanji: '閉めます', meaning: 'đóng (cửa, cửa sổ)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '5', hiragana: 'いそぎます', kanji: '急ぎます', meaning: 'vội, gấp', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '6', hiragana: 'まちます', kanji: '待ちます', meaning: 'đợi, chờ', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '7', hiragana: 'もちます', kanji: '持ちます', meaning: 'mang, cầm', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '8', hiragana: 'とります', kanji: '取ります', meaning: 'lấy, chuyền', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '9', hiragana: 'てつだいます', kanji: '手伝います', meaning: 'giúp (làm việc gì)', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '10', hiragana: 'よびます', kanji: '呼びます', meaning: 'gọi', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '11', hiragana: 'はなします', kanji: '話します', meaning: 'nói, nói chuyện', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '12', hiragana: 'つかいます', kanji: '使います', meaning: 'dùng, sử dụng', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '13', hiragana: 'とめます', kanji: '止めます', meaning: 'dừng, đỗ', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '14', hiragana: 'みせます', kanji: '見せます', meaning: 'cho xem, trình', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '15', hiragana: 'おしえます', kanji: '教えます', meaning: 'nói, cho biết [địa chỉ]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '16', hiragana: 'すわります', kanji: '座ります', meaning: 'ngồi', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '17', hiragana: 'たちます', kanji: '立ちます', meaning: 'đứng', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '18', hiragana: 'はいります', kanji: '入ります', meaning: 'vào [quán giải khát]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '19', hiragana: 'でます', kanji: '出ます', meaning: 'ra, khỏi [quán giải khát]', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '20', hiragana: 'ふります', kanji: '降ります', meaning: 'mưa', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '21', hiragana: 'コピーします', kanji: '', meaning: 'copy, phô-tô', difficulty: 'easy', category: 'Verbs', lesson: 'Bài 14', section: 'main' },
  { id: '22', hiragana: 'でんき', kanji: '電気', meaning: 'điện, đèn điện', difficulty: 'easy', category: 'Objects', lesson: 'Bài 14', section: 'main' },
  { id: '23', hiragana: 'エアコン', kanji: '', meaning: 'máy điều hòa (nhiệt độ)', difficulty: 'easy', category: 'Appliances', lesson: 'Bài 14', section: 'main' },
  { id: '24', hiragana: 'パスポート', kanji: '', meaning: 'hộ chiếu', difficulty: 'easy', category: 'Objects', lesson: 'Bài 14', section: 'main' },
  { id: '25', hiragana: 'なまえ', kanji: '名前', meaning: 'tên', difficulty: 'easy', category: 'Personal', lesson: 'Bài 14', section: 'main' },
  { id: '26', hiragana: 'じゅうしょ', kanji: '住所', meaning: 'địa chỉ', difficulty: 'easy', category: 'Personal', lesson: 'Bài 14', section: 'main' },
  { id: '27', hiragana: 'ちず', kanji: '地図', meaning: 'bản đồ', difficulty: 'easy', category: 'Objects', lesson: 'Bài 14', section: 'main' },
  { id: '28', hiragana: 'しお', kanji: '塩', meaning: 'muối', difficulty: 'easy', category: 'Food', lesson: 'Bài 14', section: 'main' },
  { id: '29', hiragana: 'さとう', kanji: '砂糖', meaning: 'đường', difficulty: 'easy', category: 'Food', lesson: 'Bài 14', section: 'main' },

  // 🗣️ II. 会話 (HỘI THOẠI)
  { id: '30', hiragana: 'もんだい', kanji: '問題', meaning: 'câu hỏi, vấn đề', difficulty: 'easy', category: 'Objects', lesson: 'Bài 14', section: 'conversation' },
  { id: '31', hiragana: 'こたえ', kanji: '答え', meaning: 'câu trả lời', difficulty: 'easy', category: 'Objects', lesson: 'Bài 14', section: 'conversation' },
  { id: '32', hiragana: 'よみかた', kanji: '読み方', meaning: 'cách đọc', difficulty: 'easy', category: 'Language', lesson: 'Bài 14', section: 'conversation' },
  { id: '33', hiragana: 'かた', kanji: '方', meaning: 'cách', difficulty: 'easy', category: 'Language', lesson: 'Bài 14', section: 'conversation' },
  { id: '34', hiragana: 'まっすぐ', kanji: '', meaning: 'thẳng', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 14', section: 'conversation' },
  { id: '35', hiragana: 'ゆっくり', kanji: '', meaning: 'chậm, thong thả, thoải mái', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 14', section: 'conversation' },
  { id: '36', hiragana: 'すぐ', kanji: '', meaning: 'ngay, lập tức', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 14', section: 'conversation' },
  { id: '37', hiragana: 'また', kanji: '', meaning: 'lại', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 14', section: 'conversation' },
  { id: '38', hiragana: 'あとで', kanji: '', meaning: 'sau', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 14', section: 'conversation' },
  { id: '39', hiragana: 'もうすこし', kanji: '', meaning: 'thêm một chút nữa', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 14', section: 'conversation' },
  { id: '40', hiragana: 'もう', kanji: '', meaning: 'thêm', difficulty: 'easy', category: 'Adverbs', lesson: 'Bài 14', section: 'conversation' },
  { id: '41', hiragana: 'あれ', kanji: '', meaning: 'Ốt (câu cảm thán khi phát hiện hoặc thấy cái gì đó lạ)', difficulty: 'easy', category: 'Interjections', lesson: 'Bài 14', section: 'conversation' },
  { id: '42', hiragana: 'しんごうをみぎへまがってください', kanji: '信号を右へ曲がってください', meaning: 'Anh/Chị hãy rẽ phải ở chỗ đèn tín hiệu', difficulty: 'easy', category: 'Directions', lesson: 'Bài 14', section: 'conversation' },
  { id: '43', hiragana: 'これでおねがいします', kanji: 'これでお願いします', meaning: 'Gửi anh tiền này', difficulty: 'easy', category: 'Requests', lesson: 'Bài 14', section: 'conversation' },
  { id: '44', hiragana: 'おつり', kanji: 'おつり', meaning: 'tiền thừa, tiền thối lại', difficulty: 'easy', category: 'Money', lesson: 'Bài 14', section: 'conversation' },
  { id: '45', hiragana: 'みどりまち', kanji: 'みどり町', meaning: 'tên thành phố gia đình', difficulty: 'easy', category: 'Places', lesson: 'Bài 14', section: 'conversation' },

  // 📖 III. 読み物 (ĐỌC THÊM)
  { id: '46', hiragana: 'きっぷうりば', kanji: '切符売り場', meaning: 'chỗ bán vé', difficulty: 'easy', category: 'Places', lesson: 'Bài 14', section: 'reading' },
  { id: '47', hiragana: 'じどうはんばいき', kanji: '自動販売機', meaning: 'máy bán vé tự động', difficulty: 'easy', category: 'Machines', lesson: 'Bài 14', section: 'reading' },
  { id: '48', hiragana: 'せいさんき', kanji: '精算機', meaning: 'máy thanh toán tiền vé còn thiếu', difficulty: 'easy', category: 'Machines', lesson: 'Bài 14', section: 'reading' },
  { id: '49', hiragana: 'かいさつぐち', kanji: '改札口', meaning: 'cửa soát vé', difficulty: 'easy', category: 'Places', lesson: 'Bài 14', section: 'reading' },
  { id: '50', hiragana: 'でぐち', kanji: '出口', meaning: 'cửa ra', difficulty: 'easy', category: 'Places', lesson: 'Bài 14', section: 'reading' },
  { id: '51', hiragana: 'いりぐち', kanji: '入口', meaning: 'cửa vào', difficulty: 'easy', category: 'Places', lesson: 'Bài 14', section: 'reading' },
  { id: '52', hiragana: 'ひがしぐち', kanji: '東口', meaning: 'cửa Đông', difficulty: 'easy', category: 'Places', lesson: 'Bài 14', section: 'reading' },
  { id: '53', hiragana: 'にしぐち', kanji: '西口', meaning: 'cửa Tây', difficulty: 'easy', category: 'Places', lesson: 'Bài 14', section: 'reading' },
  { id: '54', hiragana: 'みなみぐち', kanji: '南口', meaning: 'cửa Nam', difficulty: 'easy', category: 'Places', lesson: 'Bài 14', section: 'reading' },
  { id: '55', hiragana: 'きたぐち', kanji: '北口', meaning: 'cửa Bắc', difficulty: 'easy', category: 'Places', lesson: 'Bài 14', section: 'reading' },
  { id: '56', hiragana: 'ちゅうおうぐち', kanji: '中央口', meaning: 'cửa Trung tâm', difficulty: 'easy', category: 'Places', lesson: 'Bài 14', section: 'reading' },
  { id: '57', hiragana: 'プラットホーム', kanji: '', meaning: 'sân ga', difficulty: 'easy', category: 'Places', lesson: 'Bài 14', section: 'reading' },
  { id: '58', hiragana: 'はっしゃ', kanji: '発車', meaning: 'quầy bán hàng, ki-ốt', difficulty: 'easy', category: 'Places', lesson: 'Bài 14', section: 'reading' },
  { id: '59', hiragana: 'コインロッカー', kanji: '', meaning: 'hòm đồ để cho thuê thao tác bằng tiền xu', difficulty: 'easy', category: 'Machines', lesson: 'Bài 14', section: 'reading' },
  { id: '60', hiragana: 'タクシーのりば', kanji: 'タクシー乗り場', meaning: 'điểm lên xe tắc-xi', difficulty: 'easy', category: 'Places', lesson: 'Bài 14', section: 'reading' },
  { id: '61', hiragana: 'バスてい', kanji: 'バス停', meaning: 'bến xe buýt', difficulty: 'easy', category: 'Places', lesson: 'Bài 14', section: 'reading' },
  { id: '62', hiragana: 'とっきゅう', kanji: '特急', meaning: 'tốc hành đặc biệt', difficulty: 'easy', category: 'Transport', lesson: 'Bài 14', section: 'reading' },
  { id: '63', hiragana: 'きゅうこう', kanji: '急行', meaning: 'tốc hành', difficulty: 'easy', category: 'Transport', lesson: 'Bài 14', section: 'reading' },
  { id: '64', hiragana: 'かいそく', kanji: '快速', meaning: 'nhanh', difficulty: 'easy', category: 'Transport', lesson: 'Bài 14', section: 'reading' },
  { id: '65', hiragana: 'ふつう', kanji: '普通', meaning: 'tàu thường, địa phương', difficulty: 'easy', category: 'Transport', lesson: 'Bài 14', section: 'reading' },
  { id: '66', hiragana: 'じこくひょう', kanji: '時刻表', meaning: 'bảng giờ chạy tàu', difficulty: 'easy', category: 'Objects', lesson: 'Bài 14', section: 'reading' },
  { id: '67', hiragana: 'はつ', kanji: '発', meaning: 'xuất phát từ', difficulty: 'easy', category: 'Transport', lesson: 'Bài 14', section: 'reading' },
  { id: '68', hiragana: 'ちゃく', kanji: '着', meaning: 'đến', difficulty: 'easy', category: 'Transport', lesson: 'Bài 14', section: 'reading' },
  { id: '69', hiragana: 'いき', kanji: '行き', meaning: 'đi', difficulty: 'easy', category: 'Transport', lesson: 'Bài 14', section: 'reading' },
  { id: '70', hiragana: 'ていきけん', kanji: '定期券', meaning: 'vé tháng', difficulty: 'easy', category: 'Objects', lesson: 'Bài 14', section: 'reading' },
  { id: '71', hiragana: 'かいすうけん', kanji: '回数券', meaning: 'vé giảm giá khi đi nhiều', difficulty: 'easy', category: 'Objects', lesson: 'Bài 14', section: 'reading' },
  { id: '72', hiragana: 'かたみち', kanji: '片道', meaning: 'một chiều', difficulty: 'easy', category: 'Transport', lesson: 'Bài 14', section: 'reading' },
  { id: '73', hiragana: 'おうふく', kanji: '往復', meaning: 'hai chiều, đi và về', difficulty: 'easy', category: 'Transport', lesson: 'Bài 14', section: 'reading' }
];
