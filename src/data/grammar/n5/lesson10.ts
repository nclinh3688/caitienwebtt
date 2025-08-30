import { GrammarLesson } from './lesson1';

export const N5Lesson10Grammar: GrammarLesson = {
  id: 'n5-grammar-lesson-10',
  lessonNumber: 10,
  japaneseTitle: '第１０課',
  vietnameseTitle: 'Bài 10',
  englishTitle: 'Lesson 10',
  difficulty: 'Beginner',
  estimatedTime: '55 phút',
  
  summary: 'Bài học này tập trung vào cách thể hiện sự sở hữu và tồn tại của người và đồ vật, cũng như cách nói về vị trí tương đối.',
  
  vocabulary: [
    'あります (arimasu) - Có (đồ vật)',
    'います (imasu) - Có (người, động vật)',
    'に (ni) - Ở (trợ từ chỉ vị trí)',
    'は (wa) - Thì, là, ở (trợ từ chủ đề)',
    'の (no) - Của (trợ từ sở hữu)',
    'や (ya) - Và (liệt kê không đầy đủ)',
    'など (nado) - Vân vân'
  ],

  patterns: [
    {
      id: 'n5-l10-p1',
      pattern: 'N が あります／います',
      meaning: 'Có N',
      explanation: 'Mẫu câu này dùng để diễn tả sự sở hữu. Động từ 「あります」 được sử dụng cho đồ vật, cây cối, những thứ không thể tự di chuyển. Ngược lại, 「います」 được sử dụng cho người và động vật, những thực thể có thể tự di chuyển. Trợ từ 「が」 được dùng để chỉ chủ thể của sự sở hữu đó.',
      difficulty: 'beginner',
      category: 'existence',
      examples: [
        {
          japanese: 'コンピューターが あります。',
          kanji: 'コンピューターが あります。',
          vietnamese: 'Tôi có máy vi tính.',
          romaji: 'Conpyuutaa ga arimasu.',
          english: 'I have a computer.'
        },
        {
          japanese: '兄が います。',
          kanji: '兄が います。',
          vietnamese: 'Tôi có anh trai.',
          romaji: 'Ani ga imasu.',
          english: 'I have an older brother.'
        },
        {
          japanese: 'かわいいねこがいます。',
          kanji: 'かわいい猫がいます。',
          vietnamese: 'Tôi có một con mèo dễ thương.',
          romaji: 'Kawaii neko ga imasu.',
          english: 'I have a cute cat.'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l10-p2',
      pattern: 'N1(địa điểm)に N2 が あります／います',
      meaning: 'Có N2 ở N1 / Ở N1 có N2',
      explanation: 'Mẫu câu này dùng để miêu tả sự tồn tại của người hoặc vật tại một địa điểm cụ thể. N1 là danh từ chỉ địa điểm, theo sau là trợ từ 「に」 để xác định vị trí. N2 là người hoặc vật tồn tại ở đó, và được đánh dấu bằng trợ từ 「が」. Tương tự như mẫu câu trên, 「あります」 dùng cho vật và 「います」 dùng cho người/động vật.',
      difficulty: 'beginner',
      category: 'existence-location',
      examples: [
        {
          japanese: '私の部屋に 電話があります。',
          kanji: '私の部屋に 電話があります。',
          vietnamese: 'Trong phòng tôi có cái điện thoại.',
          romaji: 'Watashi no heya ni denwa ga arimasu.',
          english: 'There is a telephone in my room.'
        },
        {
          japanese: '教室に 田中さんがいます。',
          kanji: '教室に 田中さんがいます。',
          vietnamese: 'Trong phòng học có bạn Tanaka.',
          romaji: 'Kyoushitsu ni Tanaka-san ga imasu.',
          english: 'Mr. Tanaka is in the classroom.'
        },
        {
          japanese: 'かばんに 何が ありますか。',
          kanji: 'かばんに 何が ありますか。',
          vietnamese: 'Trong cặp có gì thế?',
          romaji: 'Kaban ni nani ga arimasu ka.',
          english: 'What is in the bag?'
        }
      ],
      notes: [
        'Câu hỏi: N に なにが ありますか。(Ở N có cái gì?), N に だれが いますか。(Ở N có ai?)'
      ]
    },
    {
      id: 'n5-l10-p3',
      pattern: 'N1 は N2 (địa điểm) に あります／います',
      meaning: 'N1 ở N2',
      explanation: 'Mẫu câu này cũng dùng để chỉ nơi tồn tại của người hoặc vật, nhưng khác với mẫu câu trên, N1 (người/vật) được đưa lên làm chủ đề của câu bằng trợ từ 「は」 để nhấn mạnh. N2 là địa điểm nơi N1 tồn tại, theo sau là trợ từ 「に」.',
      difficulty: 'beginner',
      category: 'location-topic',
      examples: [
        {
          japanese: 'ランさんの電話は うけつけにあります。',
          kanji: 'ランさんの電話は 受付にあります。',
          vietnamese: 'Điện thoại của Lan ở quầy tiếp tân.',
          romaji: 'Ran-san no denwa wa uketsuke ni arimasu.',
          english: 'Ms. Lan\'s phone is at the reception.'
        },
        {
          japanese: '犬は にわに います。',
          kanji: '犬は 庭に います。',
          vietnamese: 'Con chó ở ngoài sân.',
          romaji: 'Inu wa niwa ni imasu.',
          english: 'The dog is in the yard.'
        },
        {
          japanese: 'Dam Sen は どこに ありますか。',
          kanji: 'Dam Sen は どこに ありますか。',
          vietnamese: 'Đầm Sen ở đâu?',
          romaji: 'Dam Sen wa doko ni arimasu ka.',
          english: 'Where is Dam Sen?'
        }
      ],
      notes: [
        '「です」thỉnh thoảng được sử dụng thay thế cho động từ chỉ vị trí 「あります・います」khi những động từ đó đã được nói đến hoặc đã xác định.'
      ]
    },
    {
      id: 'n5-l10-p4',
      pattern: 'N1 (vật, người, địa điểm) の N2 (danh từ chỉ vị trí)',
      meaning: 'Tương quan vị trí (trên, dưới, trước, sau...)' ,
      explanation: 'Mẫu câu này dùng để chỉ rõ hơn vị trí của một vật/người. N1 là mốc, và N2 là các danh từ chỉ vị trí như 上 (trên), 下 (dưới), 前 (trước), 後ろ (sau), 中 (trong), 外 (ngoài), 隣 (bên cạnh), 近く (gần). Cả cụm “N1 の N2” được coi như một danh từ chỉ địa điểm.',
      difficulty: 'beginner',
      category: 'relative-position',
      examples: [
        {
          japanese: 'つくえの 上に 本があります。',
          kanji: '机の 上に 本があります。',
          vietnamese: 'Ở trên bàn có quyển sách.',
          romaji: 'Tsukue no ue ni hon ga arimasu.',
          english: 'There is a book on the desk.'
        },
        {
          japanese: 'としょかんの 前に こうえんがあります。',
          kanji: '図書館の 前に 公園があります。',
          vietnamese: 'Ở trước thư viện có công viên.',
          romaji: 'Toshokan no mae ni kouen ga arimasu.',
          english: 'There is a park in front of the library.'
        },
        {
          japanese: '駅の近くで ともだちと会います。',
          kanji: '駅の近くで 友達と会います。',
          vietnamese: 'Tôi gặp bạn ở gần nhà ga.',
          romaji: 'Eki no chikaku de tomodachi to aimasu.',
          english: 'I will meet a friend near the station.'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l10-p5',
      pattern: 'N1 や N2',
      meaning: 'N1 và N2 (liệt kê không đầy đủ)',
      explanation: 'Trợ từ「や」dùng để nối các danh từ khi muốn liệt kê một cách không đầy đủ, chỉ mang tính chất đại diện. Nó ngụ ý rằng còn có những thứ khác nữa ngoài N1 và N2. Khác với 「と」dùng để liệt kê toàn bộ.',
      difficulty: 'beginner',
      category: 'particle-ya',
      examples: [
        {
          japanese: '教室の中に つくえや いすが あります。',
          kanji: '教室の中に 机や 椅子が あります。',
          vietnamese: 'Trong phòng học có bàn, ghế...',
          romaji: 'Kyoushitsu no naka ni tsukue ya isu ga arimasu.',
          english: 'There are desks, chairs, etc. in the classroom.'
        },
        {
          japanese: 'かばんの中に ペンや 本が あります。',
          kanji: 'かばんの中に ペンや 本が あります。',
          vietnamese: 'Trong cặp có bút, sách...',
          romaji: 'Kaban no naka ni pen ya hon ga arimasu.',
          english: 'There are pens, books, etc. in the bag.'
        },
        {
          japanese: '教室の中に つくえや いすなどが あります。',
          kanji: '教室の中に 机や 椅子などが あります。',
          vietnamese: 'Trong phòng học có bàn, ghế...',
          romaji: 'Kyoushitsu no naka ni tsukue ya isu nado ga arimasu.',
          english: 'There are desks, chairs, and so on in the classroom.'
        }
      ],
      notes: [
        'Đôi khi 「など」được đặt sau danh từ cuối cùng để nhấn mạnh thêm là vẫn còn những vật khác nữa.'
      ]
    }
  ]
};

export default N5Lesson10Grammar;