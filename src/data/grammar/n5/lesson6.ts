import { GrammarLesson } from './lesson1';

export const N5Lesson6Grammar: GrammarLesson = {
  id: 'n5-grammar-lesson-6',
  lessonNumber: 6,
  japaneseTitle: '第６課',
  vietnameseTitle: 'Bài 6',
  englishTitle: 'Lesson 6',
  difficulty: 'Beginner',
  estimatedTime: '50 phút',
  
  summary: 'Bài học này tập trung vào cách sử dụng trợ từ を, cách nói phủ định hoàn toàn, và cách mời rủ ai đó cùng làm gì.',
  
  vocabulary: [
    '食べます (tabemasu) - Ăn',
    '飲みます (nomimasu) - Uống',
    '読みます (yomimasu) - Đọc',
    '買います (kaimasu) - Mua',
    '撮ります (torimasu) - Chụp',
    'します (shimasu) - Làm',
    '休みます (yasumimasu) - Nghỉ',
    '何 (nani/nan) - Cái gì',
    'で (de) - Ở, tại (trợ từ chỉ địa điểm)',
    'を (o) - (trợ từ chỉ đối tượng)',
    'と (to) - Và, với',
    'ませんか (masenka) - Cùng làm...nhé? (mời rủ)',
    'ましょう (mashou) - Cùng làm...nhé! (hô hào)'
  ],

  patterns: [
    {
      id: 'n5-l6-p1',
      pattern: 'N を V ます',
      meaning: 'Làm V với đối tượng N',
      explanation: 'Mẫu câu này dùng để chỉ rõ đối tượng trực tiếp của một hành động. "N" là danh từ chỉ đối tượng mà hành động "V" tác động lên. "V ます" là tha động từ (ngoại động từ), tức là động từ cần một tân ngữ trực tiếp. Trợ từ "を" (đọc là "o", không phải "wo") được đặt sau danh từ "N" để đánh dấu nó là tân ngữ trực tiếp của động từ. Mẫu câu này rất phổ biến và cơ bản trong tiếng Nhật.',
      difficulty: 'beginner',
      category: 'particle-o',
      examples: [
        {
          japanese: 'ごはんを たべます。',
          kanji: 'ご飯を 食べます。',
          vietnamese: 'Tôi ăn cơm.',
          romaji: 'Gohan o tabemasu.',
          english: 'I eat rice.'
        },
        {
          japanese: '本を よみました。',
          kanji: '本を 読みました。',
          vietnamese: 'Tôi đã đọc sách.',
          romaji: 'Hon o yomimashita.',
          english: 'I read a book.'
        },
        {
          japanese: '私は さかなと たまごを たべます。',
          kanji: '私は 魚と 卵を 食べます。',
          vietnamese: 'Tôi ăn cá và trứng.',
          romaji: 'Watashi wa sakana to tamago o tabemasu.',
          english: 'I eat fish and eggs.'
        }
      ],
      notes: [
        'Câu hỏi: なにを V ますか。 (Làm cái gì (ăn gì, uống gì, đọc gì…)?)',
        '「も」được thay cho 「を」khi cùng chung một hành động với 2 đối tượng khác nhau (cùng V nhưng khác N).',
        '「と」đươc dùng để nối 2 danh từ cùng làm đối tượng của hành động trong câu.'
      ]
    },
    {
      id: 'n5-l6-p2',
      pattern: 'なにも V ません',
      meaning: 'Không làm gì cả',
      explanation: 'Mẫu câu này dùng để diễn tả sự phủ định hoàn toàn, có nghĩa là "không làm gì cả" hoặc "không có gì cả". Khi trợ từ "も" (mo) được đặt sau từ để hỏi "なに" (nani - cái gì) và đi kèm với động từ ở thể phủ định (ví dụ: V ません - không làm V), nó nhấn mạnh rằng không có bất kỳ hành động nào được thực hiện hoặc không có bất kỳ đối tượng nào liên quan.',
      difficulty: 'beginner',
      category: 'negative-sentence',
      examples: [
        {
          japanese: 'けさ 何も たべませんでした。',
          kanji: '今朝 何も 食べませんでした。',
          vietnamese: 'Sáng nay tôi đã không ăn gì cả.',
          romaji: 'Kesa nani mo tabemasen deshita.',
          english: 'I ate nothing this morning.'
        },
        {
          japanese: 'あした 何も しません。',
          kanji: '明日 何も しません。',
          vietnamese: 'Ngày mai tôi sẽ không làm gì cả.',
          romaji: 'Ashita nani mo shimasen.',
          english: 'I will do nothing tomorrow.'
        },
        {
          japanese: 'きのうはなにもかいませんでした。',
          kanji: '昨日は何も買いませんでした。',
          vietnamese: 'Hôm qua tôi đã không mua gì cả.',
          romaji: 'Kinou wa nani mo kaimasen deshita.',
          english: 'I didn\'t buy anything yesterday.'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l6-p3',
      pattern: 'N1 で N2 を V ます',
      meaning: 'Làm ~ ở/tại N1',
      explanation: 'Mẫu câu này dùng để chỉ rõ địa điểm mà một hành động diễn ra. "N1" là danh từ chỉ địa điểm (ví dụ: レストラン - nhà hàng, としょかん - thư viện). Trợ từ "で" (de) được đặt sau "N1" để chỉ nơi chốn diễn ra hành động. "N2" là danh từ chỉ đối tượng của hành động, và "を V ます" là động từ tác động lên "N2".',
      difficulty: 'beginner',
      category: 'location-particle',
      examples: [
        {
          japanese: 'レストランで ごはんを たべす。',
          kanji: 'レストランで ご飯を 食べます。',
          vietnamese: 'Tôi ăn cơm ở nhà hàng.',
          romaji: 'Resutoran de gohan o tabemasu.',
          english: 'I eat rice at a restaurant.'
        },
        {
          japanese: 'としょかんで 本を よみました。',
          kanji: '図書館で 本を 読みました。',
          vietnamese: 'Tôi đã đọc sách ở thư viện.',
          romaji: 'Toshokan de hon o yomimashita.',
          english: 'I read a book in the library.'
        },
        {
          japanese: 'どこで このしゃしんを とりましたか。',
          kanji: 'どこで この写真を 撮りましたか。',
          vietnamese: 'Bạn đã chụp bức ảnh này ở đâu?',
          romaji: 'Doko de kono shashin o torimashita ka.',
          english: 'Where did you take this picture?'
        }
      ],
      notes: [
        'Câu hỏi: どこで V ますか。 (Ai đó đã/sẽ làm gì ở đâu?).'
      ]
    },
    {
      id: 'n5-l6-p4',
      pattern: 'いっしょに V ませんか',
      meaning: 'Cùng làm ~ nhé! (Mời, rủ)',
      explanation: 'Mẫu câu này là một lời mời hoặc rủ rê ai đó cùng làm một việc gì đó. Mặc dù có dạng phủ định ("ませんか"), nhưng nó không mang ý nghĩa phủ định mà là một cách nói lịch sự để đề xuất hoặc mời gọi. "いっしょに" (issho ni) có nghĩa là "cùng nhau". Khi sử dụng mẫu câu này, người nói mong muốn người nghe sẽ đồng ý tham gia hành động được đề xuất.',
      difficulty: 'beginner',
      category: 'invitation',
      examples: [
        {
          japanese: 'いっしょに ビールを のみませんか。',
          kanji: '一緒に ビールを 飲みませんか。',
          vietnamese: 'Cùng uống bia nhé!',
          romaji: 'Issho ni biiru o nomimasen ka.',
          english: 'Won\'t you drink beer together?'
        },
        {
          japanese: 'いっしょにえいがをみませんか。',
          kanji: '一緒に映画を見ませんか。',
          vietnamese: 'Cùng đi xem phim nhé!',
          romaji: 'Issho ni eiga o mimasen ka.',
          english: 'Won\'t you watch a movie together?'
        },
        {
          japanese: 'すみません。ちょっと…',
          kanji: 'すみません。ちょっと…',
          vietnamese: 'Xin lỗi. Nhưng mà… (cách từ chối khéo)',
          romaji: 'Sumimasen. Chotto…',
          english: 'I\'m sorry. A little... (a polite way to refuse)'
        }
      ],
      notes: [
        'Khi muốn từ chối lời đề nghị thì dùng 「… すみません。ちょっと…」.'
      ]
    },
    {
      id: 'n5-l6-p5',
      pattern: 'V ましょう',
      meaning: 'Cùng làm ~ nhé! (Thỏa thuận, hô hào)',
      explanation: 'Mẫu câu "V ましょう" (V mashou) là một lời đề nghị hoặc gợi ý cùng làm một việc gì đó, mang tính chất hô hào, rủ rê tập thể, hoặc thể hiện sự đồng thuận. Nó thường được dùng khi người nói tin rằng người nghe sẽ đồng ý hoặc khi muốn đưa ra một quyết định chung. Khác với "V ませんか" (V masenka) mang tính chất mời gọi lịch sự và thăm dò ý kiến, "V ましょう" thể hiện sự chắc chắn hơn về việc hành động sẽ được thực hiện.',
      difficulty: 'beginner',
      category: 'suggestion',
      examples: [
        {
          japanese: 'ロビーで 休みましょう。',
          kanji: 'ロビーで 休みましょう。',
          vietnamese: 'Chúng ta hãy nghỉ ở hành lang nhé!',
          romaji: 'Robii de yasumimashou.',
          english: 'Let\'s take a break in the lobby.'
        },
        {
          japanese: 'はじめましょう。',
          kanji: '始めましょう。',
          vietnamese: 'Nào, chúng ta bắt đầu nào!',
          romaji: 'Hajimemashou.',
          english: 'Let\'s start!'
        },
        {
          japanese: 'いっしょにひるごはんをたべましょう。',
          kanji: '一緒に昼ご飯を食べましょう。',
          vietnamese: 'Cùng ăn trưa nào.',
          romaji: 'Issho ni hirugohan o tabemashou.',
          english: 'Let\'s have lunch together.'
        }
      ],
      notes: [
        'Khác với 「V ませんか」: dùng khi chưa biết người kia có đồng ý hay không.'
      ]
    },
    {
      id: 'n5-l6-p6',
      pattern: 'なん／なに',
      meaning: 'Phân biệt cách dùng なん và なに',
      explanation: '"なん" (nan) và "なに" (nani) đều có nghĩa là "cái gì" và được viết bằng cùng một chữ Hán là "何". Tuy nhiên, cách đọc và sử dụng của chúng khác nhau tùy thuộc vào âm tiết theo sau hoặc ngữ cảnh. "なん" thường được dùng khi theo sau là âm "d", "n", "t" hoặc khi hỏi về số lượng, thứ tự. "なに" được dùng trong các trường hợp còn lại, đặc biệt khi đứng trước trợ từ "を" hoặc khi đứng một mình.',
      difficulty: 'beginner',
      category: 'interrogative',
      examples: [
        {
          japanese: '何ですか。',
          kanji: '何ですか。',
          vietnamese: 'Cái gì vậy?',
          romaji: 'Nan desu ka.',
          english: 'What is it?'
        },
        {
          japanese: '何の会社ですか。',
          kanji: '何の会社ですか。',
          vietnamese: 'Công ty gì vậy?',
          romaji: 'Nan no kaisha desu ka.',
          english: 'What kind of company is it?'
        },
        {
          japanese: '何を たべますか。',
          kanji: '何を 食べますか。',
          vietnamese: 'Bạn ăn gì?',
          romaji: 'Nani o tabemasu ka.',
          english: 'What do you eat?'
        }
      ],
      notes: [
        'Đọc là なん khi 何 đứng trước một từ bắt đầu bằng “d, n hay t” hoặc khi đứng sau 何 là các từ chỉ cách đếm.',
        'Các trường hợp khác thì 何 đọc là 「なに」.'
      ]
    }
  ]
};

export default N5Lesson6Grammar;
