import { GrammarLesson } from './lesson1';

export const N5Lesson9Grammar: GrammarLesson = {
  id: 'n5-grammar-lesson-9',
  lessonNumber: 9,
  japaneseTitle: '第９課',
  vietnameseTitle: 'Bài 9',
  englishTitle: 'Lesson 9',
  difficulty: 'Beginner',
  estimatedTime: '55 phút',
  
  summary: 'Bài học này tập trung vào cách sử dụng trợ từ が với các động từ và tính từ chỉ năng lực, sở thích, và các phó từ chỉ mức độ.',
  
  vocabulary: [
    'あります (arimasu) - Có (đồ vật)',
    'わかります (wakarimasu) - Hiểu',
    '好き (suki) - Thích',
    '嫌い (kirai) - Ghét',
    '上手 (jouzu) - Giỏi',
    '下手 (heta) - Kém',
    '料理 (ryouri) - Món ăn',
    'スポーツ (supootsu) - Thể thao',
    'よく (yoku) - Rõ, hay',
    'だいたい (daitai) - Đại khái',
    'たくさん (takusan) - Nhiều',
    '少し (sukoshi) - Ít',
    'あまり (amari) - Không ~ lắm',
    '全然 (zenzen) - Hoàn toàn không',
    'から (kara) - Vì',
    'どうして (doushite) - Tại sao'
  ],

  patterns: [
    {
      id: 'n5-l9-p1',
      pattern: 'N が あります／わかります／好きです／嫌いです／上手です／下手です',
      meaning: 'Có/hiểu/thích/ghét/giỏi/kém N',
      explanation: 'Mẫu câu này dùng để diễn tả sự tồn tại, khả năng hiểu biết, sở thích, hoặc năng lực. Trợ từ "が" (ga) được sử dụng để đánh dấu chủ thể của các động từ như "あります" (có, tồn tại - dùng cho vật), "わかります" (hiểu), và các tính từ chỉ sở thích/năng lực như "好きです" (thích), "嫌いです" (ghét), "上手です" (giỏi), "下手です" (kém). "が" ở đây nhấn mạnh đối tượng mà hành động hoặc trạng thái đó hướng tới.',
      difficulty: 'beginner',
      category: 'particle-ga',
      examples: [
        {
          japanese: 'わたしは イタリア料理が 好きです。',
          kanji: '私は イタリア料理が 好きです。',
          vietnamese: 'Tôi thích món ăn Ý.',
          romaji: 'Watashi wa Itaria ryouri ga suki desu.',
          english: 'I like Italian food.'
        },
        {
          japanese: '私の恋人は 英語が わかります。',
          kanji: '私の恋人は 英語が わかります。',
          vietnamese: 'Người yêu tôi hiểu được tiếng Anh.',
          romaji: 'Watashi no koibito wa eigo ga wakarimasu.',
          english: 'My lover understands English.'
        },
        {
          japanese: '田中さんは バイクが あります。',
          kanji: '田中さんは バイクが あります。',
          vietnamese: 'Anh Tanaka có xe máy.',
          romaji: 'Tanaka-san wa baiku ga arimasu.',
          english: 'Mr. Tanaka has a motorbike.'
        }
      ],
      notes: [
        'Động từ 「あります」chỉ sự sở hữu chỉ dùng với đồ vật, không dùng cho người và động vật.'
      ]
    },
    {
      id: 'n5-l9-p2',
      pattern: 'どんな N',
      meaning: 'N như thế nào?',
      explanation: '"どんな" (donna) là từ để hỏi "loại nào", "như thế nào", dùng để yêu cầu người nghe lựa chọn hoặc mô tả một vật, người, hoặc sự việc cụ thể trong một nhóm hoặc thể loại. Nó luôn đi kèm với một danh từ "N" theo sau. Câu này thường được dùng khi muốn biết chi tiết hơn về tính chất, đặc điểm, hoặc loại hình của đối tượng được hỏi.',
      difficulty: 'beginner',
      category: 'question-word',
      examples: [
        {
          japanese: 'どんな 食べ物が 好きですか。',
          kanji: 'どんな 食べ物が 好きですか。',
          vietnamese: 'Bạn thích đồ ăn thế nào?',
          romaji: 'Donna tabemono ga suki desu ka.',
          english: 'What kind of food do you like?'
        },
        {
          japanese: 'どんなスポーツが 上手ですか。',
          kanji: 'どんなスポーツが 上手ですか。',
          vietnamese: 'Bạn giỏi môn thể thao nào?',
          romaji: 'Donna supootsu ga jouzu desu ka.',
          english: 'What kind of sports are you good at?'
        },
        {
          japanese: 'どんなおんがくがきらいですか。',
          kanji: 'どんな音楽が嫌いですか。',
          vietnamese: 'Bạn ghét loại nhạc nào?',
          romaji: 'Donna ongaku ga kirai desu ka.',
          english: 'What kind of music do you dislike?'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l9-p3',
      pattern: 'よく／だいたい／たくさん／少し／あまり／全然',
      meaning: 'Các phó từ chỉ mức độ',
      explanation: 'Đây là các phó từ chỉ mức độ, được đặt trước động từ hoặc tính từ để bổ nghĩa cho chúng, diễn tả mức độ của hành động hoặc tính chất. Mỗi phó từ có sắc thái và cách dùng riêng: - "よく" (yoku): tốt, giỏi, thường xuyên, rõ ràng. - "だいたい" (daitai): đại khái, khoảng chừng. - "たくさん" (takusan): nhiều. - "少し" (sukoshi): một chút, ít. - "あまり" (amari): không... lắm (luôn đi với phủ định). - "全然" (zenzen): hoàn toàn không (luôn đi với phủ định, mang tính nhấn mạnh). Lưu ý: "あまり" và "全然" luôn đi kèm với dạng phủ định của động từ hoặc tính từ.',
      difficulty: 'beginner',
      category: 'adverb',
      examples: [
        {
          japanese: '日本語が よくわかります。',
          kanji: '日本語が よくわかります。',
          vietnamese: 'Tôi rất giỏi tiếng Nhật.',
          romaji: 'Nihongo ga yoku wakarimasu.',
          english: 'I understand Japanese well.'
        },
        {
          japanese: '英語が だいたい わかります。',
          kanji: '英語が だいたい わかります。',
          vietnamese: 'Tôi biết tiếng Anh cũng đại khái thôi.',
          romaji: 'Eigo ga daitai wakarimasu.',
          english: 'I roughly understand English.'
        },
        {
          japanese: 'フランス語が あまり わかりません。',
          kanji: 'フランス語が あまり わかりません。',
          vietnamese: 'Tôi không biết tiếng Pháp nhiều lắm.',
          romaji: 'Furansugo ga amari wakarimasen.',
          english: 'I don\'t understand French very well.'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l9-p4',
      pattern: 'S1 から、S2',
      meaning: 'Vì S1 nên S2',
      explanation: 'Cấu trúc "S1 から、S2" dùng để diễn tả mối quan hệ nguyên nhân - kết quả, có nghĩa là "Vì S1 nên S2". "S1" là mệnh đề chỉ nguyên nhân hoặc lý do, và "から" (kara) được đặt sau mệnh đề này. "S2" là mệnh đề chỉ kết quả hoặc hành động được thực hiện dựa trên nguyên nhân ở S1. "から" có thể được dùng với cả câu khẳng định và phủ định, và thường được dùng trong văn nói.',
      difficulty: 'beginner',
      category: 'conjunction',
      examples: [
        {
          japanese: '時間が ありませんから、テレビを 見ません。',
          kanji: '時間が ありませんから、テレビを 見ません。',
          vietnamese: 'Vì không có thời gian nên tôi không xem ti vi.',
          romaji: 'Jikan ga arimasen kara, terebi o mimasen.',
          english: 'Because I don\'t have time, I don\'t watch TV.'
        },
        {
          japanese: 'スポーツが 好きですから、毎日 します。',
          kanji: 'スポーツが 好きですから、毎日 します。',
          vietnamese: 'Vì thích thể thao, nên ngày nào tôi cũng chơi.',
          romaji: 'Supootsu ga suki desu kara, mainichi shimasu.',
          english: 'Because I like sports, I play every day.'
        },
        {
          japanese: 'こんばん、べんきょうしません。あしたテストがありませんから。',
          kanji: '今晩、勉強しません。明日テストがありませんから。',
          vietnamese: 'Tối nay tôi không học. Vì mai không có bài kiểm tra.',
          romaji: 'Konban, benkyoushimasen. Ashita tesuto ga arimasen kara.',
          english: 'I won\'t study tonight. Because there is no test tomorrow.'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l9-p5',
      pattern: 'どうして＋Sentence か。',
      meaning: 'Tại sao ~.',
      explanation: '"どうして" (doushite) là từ để hỏi lý do hoặc nguyên nhân, có nghĩa là "tại sao". Nó được đặt ở đầu câu hỏi. Khi trả lời câu hỏi "どうして", người nói thường dùng cấu trúc "Sentence + から" để giải thích lý do. "から" ở đây có chức năng tương tự như "vì" trong tiếng Việt, nối câu trả lời với lý do.',
      difficulty: 'beginner',
      category: 'question-word',
      examples: [
        {
          japanese: 'どうして しゅくだいをしませんか。',
          kanji: 'どうして 宿題をしませんか。',
          vietnamese: 'Vì sao bạn không làm bài tập?',
          romaji: 'Doushite shukudai o shimasen ka.',
          english: 'Why don\'t you do your homework?'
        },
        {
          japanese: '時間が ありませんから。',
          kanji: '時間が ありませんから。',
          vietnamese: 'Vì tôi không có thời gian.',
          romaji: 'Jikan ga arimasen kara.',
          english: 'Because I don\'t have time.'
        },
        {
          japanese: 'あしたは 会社を 休みます。どうしてですか。',
          kanji: '明日は 会社を 休みます。どうしてですか。',
          vietnamese: 'Ngày mai tôi sẽ nghỉ làm. Tại sao thế?',
          romaji: 'Ashita wa kaisha o yasumimasu. Doushite desu ka.',
          english: 'I will be absent from the company tomorrow. Why?'
        }
      ],
      notes: [
        'Câu hỏi 「どうしてですか。」Là câu hỏi lý do chung nghĩa là “Tại sao lại thế?”.'
      ]
    }
  ]
};

export default N5Lesson9Grammar;
