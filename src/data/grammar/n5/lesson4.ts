import { GrammarLesson } from './lesson1';

export const N5Lesson4Grammar: GrammarLesson = {
  id: 'n5-grammar-lesson-4',
  lessonNumber: 4,
  japaneseTitle: '第４課',
  vietnameseTitle: 'Bài 4',
  englishTitle: 'Lesson 4',
  difficulty: 'Beginner',
  estimatedTime: '55 phút',
  
  summary: 'Bài học này tập trung vào cách nói giờ giấc, ngày tháng, và các dạng cơ bản của động từ.',
  
  vocabulary: [
    '今 (ima) - Bây giờ',
    '時 (ji) - Giờ',
    '分 (fun/pun) - Phút',
    '半 (han) - Rưỡi',
    '曜日 (youbi) - Thứ',
    '働きます (hatarakimasu) - Làm việc',
    '勉強します (benkyoushimasu) - Học bài',
    '起きます (okimasu) - Dậy',
    '寝ます (nemasu) - Ngủ',
    'から (kara) - Từ',
    'まで (made) - Đến',
    'と (to) - Và, với, cùng',
    'ね (ne) - Nhỉ (trợ từ cuối câu)'
  ],

  patterns: [
    {
      id: 'n5-l4-p1',
      pattern: '今 ～ 時 ～ 分 です',
      meaning: 'Bây giờ là ~ giờ ~ phút.',
      explanation: 'Mẫu câu này dùng để diễn tả thời gian hiện tại, có nghĩa là "Bây giờ là ~ giờ ~ phút". "今" (ima) là "bây giờ". "～時" (ji) được thêm vào sau số đếm để chỉ giờ. "～分" (fun/pun) được thêm vào sau số đếm để chỉ phút. "です" (desu) là dạng lịch sự của động từ "to be".',
      difficulty: 'beginner',
      category: 'time-expression',
      examples: [
        {
          japanese: '今 ８じです。',
          kanji: '今 ８時です。',
          vietnamese: 'Bây giờ là 8 giờ.',
          romaji: 'Ima hachi-ji desu.',
          english: 'It is 8 o\'clock now.'
        },
        {
          japanese: 'とうきょうは 今 ９時３０分です。',
          kanji: '東京は 今 ９時３０分です。',
          vietnamese: 'Tokyo bây giờ là 9 giờ 30 phút.',
          romaji: 'Toukyou wa ima ku-ji sanjuppun desu.',
          english: 'It is 9:30 in Tokyo now.'
        },
        {
          japanese: 'いま９時半です。',
          kanji: 'いま９時半です。',
          vietnamese: 'Bây giờ là 9 rưỡi.',
          romaji: 'Ima ku-ji han desu.',
          english: 'It is 9:30 now.'
        }
      ],
      notes: [
        'Câu hỏi: 今 なんじ（なんぷん）ですか。 (Dùng để hỏi giờ giấc).',
        '「～じはん」：Sử dụng khi nói giờ rưỡi.'
      ]
    },
    {
      id: 'n5-l4-p2',
      pattern: 'N (danh từ chỉ ngày) は ～曜日 です。',
      meaning: 'N là thứ ~.',
      explanation: 'Mẫu câu này dùng để diễn tả thứ trong tuần của một ngày cụ thể. "N (danh từ chỉ ngày)" là danh từ chỉ ngày (ví dụ: 今日 - hôm nay, 明日 - ngày mai). "～曜日" (youbi) là hậu tố để chỉ thứ trong tuần (ví dụ: 月曜日 - thứ Hai, 火曜日 - thứ Ba). "です" (desu) là dạng lịch sự của động từ "to be".',
      difficulty: 'beginner',
      category: 'date-expression',
      examples: [
        {
          japanese: '今日は 火曜日です。',
          kanji: '今日は 火曜日です。',
          vietnamese: 'Hôm nay là thứ ba.',
          romaji: 'Kyou wa kayoubi desu.',
          english: 'Today is Tuesday.'
        },
        {
          japanese: '明日は水曜日です',
          kanji: '明日は水曜日です',
          vietnamese: 'Ngày mai là thứ tư.',
          romaji: 'Ashita wa suiyoubi desu.',
          english: 'Tomorrow is Wednesday.'
        },
        {
          japanese: 'あさっては木曜日です。',
          kanji: 'あさっては木曜日です。',
          vietnamese: 'Ngày kia là thứ năm.',
          romaji: 'Asatte wa mokuyoubi desu.',
          english: 'The day after tomorrow is Thursday.'
        }
      ],
      notes: [
        'Câu hỏi: N (danh từ chỉ ngày) は 何曜日ですか。 (N là thứ mấy?).'
      ]
    },
    {
      id: 'n5-l4-p3',
      pattern: 'V ます',
      meaning: 'Động từ dạng ます',
      explanation: 'Dạng "～ます" (masu) là dạng động từ lịch sự trong tiếng Nhật, biểu thị hành động ở thì hiện tại hoặc tương lai. Nó được sử dụng để thể hiện sự tôn trọng đối với người nghe. Đây là dạng cơ bản nhất của động từ mà người học tiếng Nhật sẽ gặp. Khi chia động từ sang dạng này, động từ sẽ kết thúc bằng "ます".',
      difficulty: 'beginner',
      category: 'verb-form',
      examples: [
        {
          japanese: 'あしたはたらきます。',
          kanji: '明日働きます。',
          vietnamese: 'Ngày mai tôi sẽ làm việc.',
          romaji: 'Ashita hatarakimasu.',
          english: 'I will work tomorrow.'
        },
        {
          japanese: 'まいばんべんきょうします。',
          kanji: '毎晩勉強します。',
          vietnamese: 'Hàng tối tôi đều học bài.',
          romaji: 'Maiban benkyoushimasu.',
          english: 'I study every evening.'
        },
        {
          japanese: 'まいにち６時に起きます。',
          kanji: '毎日６時に起きます。',
          vietnamese: 'Hàng ngày tôi thức dậy lúc 6 giờ.',
          romaji: 'Mainichi roku-ji ni okimasu.',
          english: 'I wake up at 6 o\'clock every day.'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l4-p4',
      pattern: 'Cách chia thời của động từ',
      meaning: 'Khẳng định, phủ định, quá khứ, hiện tại/tương lai',
      explanation: 'Trong tiếng Nhật, động từ dạng "～ます" có thể được chia thành các thì khác nhau để biểu thị thời gian của hành động (hiện tại, tương lai, quá khứ) và thể (khẳng định, phủ định). 1. Hiện tại/Tương lai khẳng định: V-ます (V-masu) 2. Hiện tại/Tương lai phủ định: V-ません (V-masen) 3. Quá khứ khẳng định: V-ました (V-mashita) 4. Quá khứ phủ định: V-ませんでした (V-masen deshita) Việc nắm vững cách chia này là rất quan trọng để diễn đạt đúng thời điểm và ý nghĩa của hành động.',
      difficulty: 'beginner',
      category: 'verb-conjugation',
      examples: [
        {
          japanese: 'まいあさべんきょうします。',
          kanji: '毎朝勉強します。',
          vietnamese: 'Hàng sáng tôi đều học bài.',
          romaji: 'Maiasa benkyoushimasu.',
          english: 'I study every morning.'
        },
        {
          japanese: 'あしたべんきょうしません。',
          kanji: '明日勉強しません。',
          vietnamese: 'Ngày mai tôi sẽ không học bài.',
          romaji: 'Ashita benkyoushimasen.',
          english: 'I will not study tomorrow.'
        },
        {
          japanese: 'きのうべんきょうしました。',
          kanji: '昨日勉強しました。',
          vietnamese: 'Hôm qua tôi đã học bài.',
          romaji: 'Kinou benkyoushimashita.',
          english: 'I studied yesterday.'
        }
      ],
      notes: [
        'Hiện tại/Tương lai Khẳng định: ます',
        'Hiện tại/Tương lai Phủ định: ません',
        'Quá khứ Khẳng định: ました',
        'Quá khứ Phủ định: ませんでした'
      ]
    },
    {
      id: 'n5-l4-p5',
      pattern: 'N (chỉ thời gian) に V ます',
      meaning: 'Làm gì vào lúc nào',
      explanation: 'Mẫu câu này dùng để chỉ rõ thời điểm cụ thể mà một hành động diễn ra. Trợ từ "に" (ni) được đặt sau danh từ chỉ thời gian (ví dụ: 6時 - 6 giờ, 日曜日 - Chủ Nhật) để xác định thời điểm. Tuy nhiên, "に" không được dùng sau các danh từ chỉ thời gian không cụ thể như "hôm nay", "ngày mai", "mỗi ngày".',
      difficulty: 'beginner',
      category: 'time-particle',
      examples: [
        {
          japanese: 'わたしはまいあさ 6 時におきます。',
          kanji: '私は毎朝 6 時に起きます。',
          vietnamese: 'Hàng sáng tôi dậy lúc 6 giờ.',
          romaji: 'Watashi wa maiasa roku-ji ni okimasu.',
          english: 'I wake up at 6 o\'clock every morning.'
        },
        {
          japanese: 'きのうの 7 時 に ねました。',
          kanji: '昨日の 7 時 に 寝ました。',
          vietnamese: 'Hôm qua tôi ngủ lúc 7 giờ.',
          romaji: 'Kinou no shichi-ji ni nemashita.',
          english: 'I went to bed at 7 o\'clock yesterday.'
        },
        {
          japanese: '日曜日（に）べんきょうしません。',
          kanji: '日曜日（に）勉強しません。',
          vietnamese: 'Chủ nhật tôi thường không học bài.',
          romaji: 'Nichiyoubi (ni) benkyoushimasen.',
          english: 'I don\'t usually study on Sundays.'
        }
      ],
      notes: [
        'Nếu thời gian không biểu hiện bằng những con số thì không thêm 「に」.',
        'Tuy nhiên, sau danh từ là các thứ trong tuần ta có thể có 「に」hay không đều được.'
      ]
    },
    {
      id: 'n5-l4-p6',
      pattern: '～から～まで',
      meaning: 'Từ ~ đến ~.',
      explanation: 'Cấu trúc "～から～まで" dùng để chỉ khoảng thời gian hoặc không gian, có nghĩa là "từ ~ đến ~". "から" (kara) biểu thị điểm bắt đầu, và "まで" (made) biểu thị điểm kết thúc. Cả hai trợ từ này có thể được sử dụng độc lập hoặc kết hợp với nhau. Chúng có thể áp dụng cho cả thời gian (ví dụ: từ 9 giờ đến 5 giờ) và địa điểm (ví dụ: từ nhà ga đến trường học).',
      difficulty: 'beginner',
      category: 'duration-particle',
      examples: [
        {
          japanese: '８時半から 5 時半まではたらきます。',
          kanji: '８時半から 5 時半まで働きます。',
          vietnamese: 'Tôi làm việc từ 8 rưỡi đến 5 rưỡi.',
          romaji: 'Hachi-ji han kara go-ji han made hatarakimasu.',
          english: 'I work from 8:30 to 5:30.'
        },
        {
          japanese: '９時から べんきょうします。',
          kanji: '９時から 勉強します。',
          vietnamese: 'Tôi học từ 9 giờ.',
          romaji: 'Ku-ji kara benkyoushimasu.',
          english: 'I study from 9 o\'clock.'
        },
        {
          japanese: 'こうぎは ８時半から１１時半までです。',
          kanji: '講義は ８時半から１１時半までです。',
          vietnamese: 'Bài giảng sẽ từ 8 rưỡi đến 11 rưỡi.',
          romaji: 'Kougi wa hachi-ji han kara juuichi-ji han made desu.',
          english: 'The lecture is from 8:30 to 11:30.'
        }
      ],
      notes: [
        '「から」và 「まで」không nhất thiết phải sử dụng cùng nhau.',
        'Không giống như 「に」phải có động từ đi sau, ta có thể sử dụng 「です」ngay sau 「～から」、「～まで」hay 「～から～まで」.'
      ]
    },
    {
      id: 'n5-l4-p7',
      pattern: 'N1 と N2',
      meaning: 'N1 và, với, cùng với N2.',
      explanation: 'Trợ từ "と" (to) được dùng để nối hai hoặc nhiều danh từ, biểu thị sự liệt kê đầy đủ và toàn diện. Nó có nghĩa là "và", "cùng với". Khi sử dụng "と", người nói ngụ ý rằng tất cả các mục được liệt kê đều được bao gồm. Ngoài ra, "と" cũng có thể dùng để chỉ người hoặc vật mà hành động được thực hiện cùng.',
      difficulty: 'beginner',
      category: 'particle-to',
      examples: [
        {
          japanese: 'ぎんこうの休みは 土曜日と日曜日です。',
          kanji: '銀行の休みは 土曜日と日曜日です。',
          vietnamese: 'Buổi nghỉ của ngân hàng là thứ 7 và CN.',
          romaji: 'Ginkou no yasumi wa doyoubi to nichiyoubi desu.',
          english: 'The bank is closed on Saturdays and Sundays.'
        },
        {
          japanese: 'かれはともだちとがっこうにいきます。',
          kanji: '彼は友達と学校に行きます。',
          vietnamese: 'Anh ấy đi đến trường cùng với bạn bè.',
          romaji: 'Kare wa tomodachi to gakkou ni ikimasu.',
          english: 'He goes to school with his friends.'
        },
        {
          japanese: 'わたしはかれとえいがをみます。',
          kanji: '私は彼と映画を見ます。',
          vietnamese: 'Tôi xem phim cùng với anh ấy.',
          romaji: 'Watashi wa kare to eiga o mimasu.',
          english: 'I watch a movie with him.'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l4-p8',
      pattern: '～ね',
      meaning: 'Nhỉ (trợ từ cuối câu)',
      explanation: 'Trợ từ cuối câu "ね" (ne) được đặt ở cuối câu để thể hiện sự đồng tình, xác nhận thông tin, hoặc tìm kiếm sự đồng ý từ người nghe. Nó mang sắc thái thân mật, gần gũi, và thường được dùng để tạo không khí trò chuyện thoải mái. Khi dùng "ね", người nói thường mong đợi người nghe sẽ đồng ý hoặc xác nhận lại điều mình vừa nói.',
      difficulty: 'beginner',
      category: 'particle-ne',
      examples: [
        {
          japanese: 'A: 何時から何時まで はたらきますか。B: ７じはんから５じはんまでです。A: たいへんですね。',
          kanji: 'A: 何時から何時まで 働きますか。B: ７時半から５時半までです。A: 大変ですね。',
          vietnamese: 'A: Bạn làm việc từ mấy giờ đến mấy giờ? B: Từ 7 rưỡi đến 5 rưỡi. A: Bạn vất vả nhỉ!',
          romaji: 'A: Nan-ji kara nan-ji made hatarakimasu ka. B: Shichi-ji han kara go-ji han made desu. A: Taihen desu ne.',
          english: 'A: From what time to what time do you work? B: From 7:30 to 5:30. A: That\'s tough, isn\'t it?'
        },
        {
          japanese: 'きょうはいいてんきですね。',
          kanji: '今日はいい天気ですね。',
          vietnamese: 'Hôm nay thời tiết đẹp nhỉ.',
          romaji: 'Kyou wa ii tenki desu ne.',
          english: 'The weather is nice today, isn\'t it?'
        },
        {
          japanese: 'このりょうりはとてもおいしいですね。',
          kanji: 'この料理はとても美味しいですね。',
          vietnamese: 'Món ăn này rất ngon nhỉ.',
          romaji: 'Kono ryouri wa totemo oishii desu ne.',
          english: 'This dish is very delicious, isn\'t it?'
        }
      ],
      notes: [
        '「ね」sẽ được phát âm dài và giọng xuống thấp.'
      ]
    }
  ]
};

export default N5Lesson4Grammar;
