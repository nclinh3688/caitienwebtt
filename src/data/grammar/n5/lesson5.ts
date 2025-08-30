import { GrammarLesson } from './lesson1';

export const N5Lesson5Grammar: GrammarLesson = {
  id: 'n5-grammar-lesson-5',
  lessonNumber: 5,
  japaneseTitle: '第５課',
  vietnameseTitle: 'Bài 5',
  englishTitle: 'Lesson 5',
  difficulty: 'Beginner',
  estimatedTime: '50 phút',
  
  summary: 'Bài học này tập trung vào cách nói ngày tháng, và các động từ di chuyển cơ bản.',
  
  vocabulary: [
    '月 (gatsu) - Tháng',
    '日 (nichi) - Ngày',
    '誕生日 (tanjoubi) - Sinh nhật',
    'いつ (itsu) - Khi nào',
    '行きます (ikimasu) - Đi',
    '来ます (kimasu) - Đến',
    '帰ります (kaerimasu) - Về',
    'へ (e) - Đến (trợ từ chỉ phương hướng)',
    'どこ (doko) - Đâu',
    'で (de) - Bằng (trợ từ chỉ phương tiện)',
    'と (to) - Với, cùng',
    'よ (yo) - (trợ từ cuối câu nhấn mạnh)'
  ],

  patterns: [
    {
      id: 'n5-l5-p1',
      pattern: 'N は ～月(がつ) ～日(にち)です。',
      meaning: 'N là ngày ~ tháng ~.',
      explanation: 'Mẫu câu này dùng để diễn tả ngày tháng trong tiếng Nhật. "N" là sự kiện hoặc ngày cụ thể. Cấu trúc là "Năm (nếu có) + 月 (gatsu) + Ngày (nichi) + です". Lưu ý rằng thứ tự này ngược so với tiếng Việt (Tháng trước, Ngày sau). Ví dụ: 7月8日 (shichi-gatsu youka) là ngày 8 tháng 7. Có những ngày có cách đọc đặc biệt (ví dụ: 1日 - tsuitachi, 2日 - futsuka).',
      difficulty: 'beginner',
      category: 'date-expression',
      examples: [
        {
          japanese: 'きょうは 七月八日です。',
          kanji: '今日は七月八日です。',
          vietnamese: 'Hôm nay là ngày mùng 8 tháng 7.',
          romaji: 'Kyou wa shichi-gatsu youka desu.',
          english: 'Today is July 8th.'
        },
        {
          japanese: 'あしたは 12 日です。',
          kanji: '明日は 12 日です。',
          vietnamese: 'Mai là ngày 12.',
          romaji: 'Ashita wa juu-ni-nichi desu.',
          english: 'Tomorrow is the 12th.'
        },
        {
          japanese: 'たんじょうびは いつですか。',
          kanji: '誕生日は いつですか。',
          vietnamese: 'Sinh nhật bạn là bao giờ?',
          romaji: 'Tanjoubi wa itsu desu ka.',
          english: 'When is your birthday?'
        }
      ],
      notes: [
        'Câu hỏi: N は いつですか。 (N là bao giờ?), N は 何月ですか。 (N là tháng mấy?), N は 何日ですか。 (N là mùng mấy?).',
        '「いつ」có thể dùng thay thế cho các từ để hỏi có nghĩa tương tự như「なんじ」、「なんがつ」、「なんにち」.'
      ]
    },
    {
      id: 'n5-l5-p2',
      pattern: 'N (Danh từ chỉ địa điểm) へ いきます／きます／かえります',
      meaning: 'Đi/Đến/Về đâu đó (địa điểm N).',
      explanation: 'Mẫu câu này dùng để diễn tả hành động di chuyển đến một địa điểm cụ thể. "N (Danh từ chỉ địa điểm)" là nơi đến. Trợ từ "へ" (đọc là "e", không phải "he") được đặt sau danh từ chỉ địa điểm để chỉ phương hướng của sự di chuyển. "いきます" (ikimasu) nghĩa là "đi", "きます" (kimasu) nghĩa là "đến", và "かえります" (kaerimasu) nghĩa là "trở về".',
      difficulty: 'beginner',
      category: 'movement-verb',
      examples: [
        {
          japanese: 'わたしは だいがくへ いきます。',
          kanji: '私は 大学へ 行きます。',
          vietnamese: 'Tôi đi đến trường.',
          romaji: 'Watashi wa daigaku e ikimasu.',
          english: 'I go to university.'
        },
        {
          japanese: 'マイさんは ここへ きます。',
          kanji: 'マイさんは ここへ 来ます。',
          vietnamese: 'Bạn Mai đến đây.',
          romaji: 'Mai-san wa koko e kimasu.',
          english: 'Mai comes here.'
        },
        {
          japanese: 'わたしは うちへ かえります。',
          kanji: '私は うちへ 帰ります。',
          vietnamese: 'Tôi trở về nhà.',
          romaji: 'Watashi wa uchi e kaerimasu.',
          english: 'I return home.'
        }
      ],
      notes: [
        'Câu hỏi: ～は どこへ ～(Động từ) か。'
      ]
    },
    {
      id: 'n5-l5-p3',
      pattern: 'どこ（へ）も いきません。',
      meaning: 'Không đi đâu cả / Chỗ nào cũng không đi',
      explanation: 'Mẫu câu này dùng để diễn tả sự phủ định hoàn toàn đối với một hành động di chuyển, có nghĩa là "không đi đâu cả" hoặc "chỗ nào cũng không đi". Khi trợ từ "も" (mo) được đặt sau từ để hỏi "どこ" (doko - ở đâu) và đi kèm với động từ ở thể phủ định (ví dụ: いきません - không đi), nó nhấn mạnh rằng hành động không diễn ra ở bất kỳ địa điểm nào được đề cập hoặc ngụ ý.',
      difficulty: 'beginner',
      category: 'negative-sentence',
      examples: [
        {
          japanese: 'きょうのごご どこへ いきますか。… どこも いきません。',
          kanji: '今日の午後 どこへ 行きますか。… どこも 行きません。',
          vietnamese: 'Chiều hôm nay bạn sẽ đi đâu? … Tôi sẽ không đi đâu cả.',
          romaji: 'Kyou no gogo doko e ikimasu ka. ... Doko mo ikimasen.',
          english: 'Where are you going this afternoon? ... I am not going anywhere.'
        },
        {
          japanese: 'きのう どこへ いきましたか。… どこへも いきませんでした。',
          kanji: '昨日 どこへ 行きましたか。… どこへも 行きませんでした。',
          vietnamese: 'Hôm qua bạn đã đi đâu vậy? … Tôi (đã) không đi đâu cả.',
          romaji: 'Kinou doko e ikimashita ka. ... Doko e mo ikimasen deshita.',
          english: 'Where did you go yesterday? ... I did not go anywhere.'
        },
        {
          japanese: 'こんばん、どこかへいきますか。いいえ、どこへもいきません。',
          kanji: '今晩、どこかへ行きますか。いいえ、どこへも行きません。',
          vietnamese: 'Tối nay, bạn có đi đâu không? Không, tôi không đi đâu cả.',
          romaji: 'Konban, dokoka e ikimasu ka. Iie, doko e mo ikimasen.',
          english: 'Are you going somewhere tonight? No, I am not going anywhere.'
        }
      ],
      notes: [
        'Có thể dùng 「も」hoặc để cả 「へも」đều được, nhưng dùng 「へも」thì ý nghĩa phủ định sẽ mạnh hơn.'
      ]
    },
    {
      id: 'n5-l5-p4',
      pattern: 'N (phương tiện) で いきます／きます／かえります',
      meaning: 'Đi/đến/về bằng N (phương tiện).',
      explanation: 'Mẫu câu này dùng để chỉ phương tiện hoặc cách thức di chuyển. "N (phương tiện)" là danh từ chỉ phương tiện giao thông (ví dụ: バス - xe buýt, じどうしゃ - ô tô). Trợ từ "で" (de) được đặt sau danh từ chỉ phương tiện để biểu thị rằng hành động di chuyển được thực hiện bằng phương tiện đó. "いきます" (ikimasu), "きます" (kimasu), "かえります" (kaerimasu) là các động từ di chuyển.',
      difficulty: 'beginner',
      category: 'transportation',
      examples: [
        {
          japanese: 'わたしは じどうしゃで びょういんへ いきます。',
          kanji: '私は 自動車で 病院へ 行きます。',
          vietnamese: 'Tôi đi đến bệnh viện bằng ôtô.',
          romaji: 'Watashi wa jidousha de byouin e ikimasu.',
          english: 'I go to the hospital by car.'
        },
        {
          japanese: 'ラオさんは バスで わたしのうちへ きます。',
          kanji: 'ラオさんは バスで 私のうちへ 来ます。',
          vietnamese: 'Bạn Rao đến nhà tôi bằng xe buýt.',
          romaji: 'Rao-san wa basu de watashi no uchi e kimasu.',
          english: 'Rao comes to my house by bus.'
        },
        {
          japanese: 'まいにち あるいて がっこうへ いきます。',
          kanji: '毎日 歩いて 学校へ 行きます。',
          vietnamese: 'Hàng ngày tôi đi bộ đến trường.',
          romaji: 'Mainichi aruite gakkou e ikimasu.',
          english: 'I walk to school every day.'
        }
      ],
      notes: [
        'Trường hợp muốn nói là “đi bộ” thì sử dụng 「あるいて」và không dùng 「で」.',
        'Câu hỏi: 〔～へ〕 なんで ～ (động từ) か。 (Đi/đến đâu bằng phương tiện gì?)'
      ]
    },
    {
      id: 'n5-l5-p5',
      pattern: 'N (Danh từ chỉ người) と V ます',
      meaning: 'Làm gì cùng với N.',
      explanation: 'Mẫu câu này dùng để chỉ rõ người hoặc đối tượng cùng thực hiện hành động. "N (Danh từ chỉ người)" là danh từ chỉ người hoặc đối tượng cùng tham gia. Trợ từ "と" (to) được đặt sau danh từ này để biểu thị sự đồng hành. "V ます" là động từ ở dạng lịch sự. Mẫu câu này thường được dùng khi muốn nói "làm gì đó cùng với ai".',
      difficulty: 'beginner',
      category: 'particle-to',
      examples: [
        {
          japanese: 'ともだちと 大学へ きます。',
          kanji: '友達と 大学へ 来ます。',
          vietnamese: 'Tôi đến trường cùng với bạn.',
          romaji: 'Tomodachi to daigaku e kimasu.',
          english: 'I come to university with a friend.'
        },
        {
          japanese: '母と デパートへ 行きます。',
          kanji: '母と デパートへ 行きます。',
          vietnamese: 'Tôi đi đến bách hóa cùng với mẹ.',
          romaji: 'Haha to depaato e ikimasu.',
          english: 'I go to the department store with my mother.'
        },
        {
          japanese: 'ひとりで くにへ かえりました。',
          kanji: '一人で 国へ 帰りました。',
          vietnamese: 'Tôi đã về nước một mình.',
          romaji: 'Hitori de kuni e kaerimashita.',
          english: 'I returned to my country alone.'
        }
      ],
      notes: [
        'Trường hợp muốn nói làm gì đó “một mình” thì dùng từ 「ひとりで」và không có 「と」.',
        'Câu hỏi: だれと ～ (động từ) か。 (Làm gì với ai?)'
      ]
    },
    {
      id: 'n5-l5-p6',
      pattern: 'Sentence + よ',
      meaning: 'Nhấn mạnh',
      explanation: 'Trợ từ cuối câu "よ" (yo) được đặt ở cuối câu để nhấn mạnh thông tin, thu hút sự chú ý của người nghe, hoặc để bày tỏ sự chắc chắn về điều mình nói. Nó thường được dùng khi người nói muốn thông báo một điều gì đó mà người nghe có thể chưa biết, hoặc khi muốn đưa ra lời khuyên, cảnh báo một cách mạnh mẽ. "よ" mang sắc thái khẳng định và đôi khi có thể mang ý nghĩa khuyên bảo.',
      difficulty: 'beginner',
      category: 'particle-yo',
      examples: [
        {
          japanese: 'このバスは Giap Bat へ 行きますか。…いいえ、いきません。21 ばんせんですよ。',
          kanji: 'このバスは Giap Bat へ 行きますか。…いいえ、いきません。21 番線ですよ。',
          vietnamese: 'Xe buýt này đi đến Giáp Bát phải à? …Không. Đường số 21 cơ.',
          romaji: 'Kono basu wa Giap Bat e ikimasu ka. ... Iie, ikimasen. Nijuu-ichi-bansen desu yo.',
          english: 'Does this bus go to Giap Bat? ... No, it doesn\'t. It\'s line 21.'
        },
        {
          japanese: 'あしたはやすみですよ。',
          kanji: '明日は休みですよ。',
          vietnamese: 'Ngày mai là ngày nghỉ đấy.',
          romaji: 'Ashita wa yasumi desu yo.',
          english: 'Tomorrow is a holiday, you know.'
        },
        {
          japanese: 'このケーキはおいしいですよ。',
          kanji: 'このケーキは美味しいですよ。',
          vietnamese: 'Cái bánh này ngon lắm đấy.',
          romaji: 'Kono keeki wa oishii desu yo.',
          english: 'This cake is delicious, you know.'
        }
      ],
      notes: [
        'Không nên nói quá mạnh sẽ khiến người nghe có cảm giác bị ép buộc.'
      ]
    }
  ]
};

export default N5Lesson5Grammar;
