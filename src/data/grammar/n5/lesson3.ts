import { GrammarLesson } from './lesson1';

export const N5Lesson3Grammar: GrammarLesson = {
  id: 'n5-grammar-lesson-3',
  lessonNumber: 3,
  japaneseTitle: '第3課',
  vietnameseTitle: 'Bài 3',
  englishTitle: 'Lesson 3',
  difficulty: 'Beginner',
  estimatedTime: '50 phút',
  
  summary: 'Bài học này tập trung vào cách chỉ định địa điểm, hỏi về nơi chốn, xuất xứ của đồ vật và giá cả.',
  
  vocabulary: [
    'ここ (koko) - Đây, ở đây',
    ' そこ (soko) - Đó, ở đó',
    'あそこ (asoko) - Kia, ở kia',
    'どこ (doko) - Đâu, ở đâu',
    'こちら (kochira) - Phía này, đây (lịch sự)',
    'そちら (sochira) - Phía đó, đó (lịch sự)',
    'あちら (achira) - Phía kia, kia (lịch sự)',
    'どちら (dochira) - Phía nào, đâu (lịch sự)',
    'きょうしつ (kyoushitsu) - Lớp học',
    'しょくどう (shokudou) - Nhà ăn',
    'じむしょ (jimusho) - Văn phòng',
    'うけつけ (uketsuke) - Quầy lễ tân',
    'ロビー (robii) - Hành lang',
    'トイレ (toire) - Nhà vệ sinh',
    'うち (uchi) - Nhà',
    'かいしゃ (kaisha) - Công ty',
    'くに (kuni) - Đất nước',
    'うりば (uriba) - Quầy bán hàng',
    'ちか (chika) - Tầng hầm',
    '～かい (～gai) - Tầng ~',
    'いくら (ikura) - Bao nhiêu tiền',
    'えん (en) - Yên (đơn vị tiền tệ Nhật)'
  ],

  patterns: [
    {
      id: 'n5-l3-p1',
      pattern: 'ここ／そこ／あそこ は N (địa điểm) です',
      meaning: 'Chỗ này/đó/kia là N',
      explanation: '「ここ」、「そこ」、「あそこ」là các đại danh từ chỉ nơi chốn. 「ここ」 chỉ chỗ của người nói. 「そこ」 là chỗ của người nghe. 「あそこ」 chỉ nơi xa cả hai người.',
      difficulty: 'beginner',
      category: 'location-pattern',
      examples: [
        {
          japanese: 'ここは きょうしつです。',
          romaji: 'Koko wa kyoushitsu desu.',
          vietnamese: 'Đây là phòng học.',
          english: 'This is the classroom.'
        },
        {
          japanese: 'そこは おてあらいです。',
          romaji: 'Soko wa otearai desu.',
          vietnamese: 'Đó là nhà vệ sinh.',
          english: 'That is the restroom.'
        },
        {
          japanese: 'あそこは しょくどうです。',
          romaji: 'Asoko wa shokudou desu.',
          vietnamese: 'Kia là nhà ăn tập thể.',
          english: 'Over there is the cafeteria.'
        }
      ],
      notes: [
        'Khi người nói và người nghe ở cùng một địa điểm thì cả hai người đều sử dụng 「ここ」.'
      ]
    },
    {
      id: 'n5-l3-p2',
      pattern: 'N (địa điểm) は どこ ですか。',
      meaning: 'N ở đâu?',
      explanation: 'Dùng để hỏi vị trí của một địa điểm, người, hoặc vật. Câu trả lời có thể là ここ／そこ／あそこ です.',
      difficulty: 'beginner',
      category: 'question-pattern',
      examples: [
        {
          japanese: 'ロビーは ここです。',
          romaji: 'Robii wa koko desu.',
          vietnamese: 'Hành lang ở đây.',
          english: 'The lobby is here.'
        },
        {
          japanese: 'エレベーターは あそこです。',
          romaji: 'Erebeetaa wa asoko desu.',
          vietnamese: 'Cầu thang máy ở chỗ kia.',
          english: 'The elevator is over there.'
        },
        {
          japanese: 'マリアさんは どこですか。',
          romaji: 'Maria-san wa doko desu ka.',
          vietnamese: 'Bạn Maria ở đâu?',
          english: 'Where is Maria?'
        }
      ],
      notes: [
        'Có thể mở rộng trường hợp này cho địa điểm tồn tại của người và vật: N１(người hoặc vật) は N２(địa điểm) です。 (N1 ở N2).'
      ]
    },
    {
      id: 'n5-l3-p3',
      pattern: 'こちら／そちら／あちら／どちら',
      meaning: 'Đây/Đó/Kia/Ở đâu (lịch sự)',
      explanation: 'Nghĩa tương đương với 「ここ・そこ・あそこ・どこ」nhưng trang trọng, lịch sự hơn. Nghĩa gốc của chúng là các đại danh từ chỉ phương hướng.',
      difficulty: 'beginner',
      category: 'polite-location',
      examples: [
        {
          japanese: 'でんわは どちらですか。',
          romaji: 'Denwa wa dochira desu ka.',
          vietnamese: 'Điện thoại ở đâu nhỉ?',
          english: 'Where is the telephone?'
        },
        {
          japanese: '（お）くには どちらですか。',
          romaji: '(O)kuni wa dochira desu ka.',
          vietnamese: 'Đất nước của bạn là ở đâu?',
          english: 'Where is your country from?'
        }
      ],
      notes: [
        'Với câu hỏi 「あなたのかいしゃは どちらですか。」 (Công ty của bạn là công ty nào?), câu trả lời thường là tên công ty, không phải địa điểm.'
      ]
    },
    {
      id: 'n5-l3-p4',
      pattern: 'これ／それ／あれ は どこの N ですか。',
      meaning: 'Đây/Đó/Kia là N của nước nào/hãng nào?',
      explanation: 'Dùng để hỏi xuất xứ của đồ vật, muốn biết đồ vật đó có nguồn gốc từ đâu, do nước nào, công ty nào sản xuất.',
      difficulty: 'beginner',
      category: 'origin-question-pattern',
      examples: [
        {
          japanese: 'これは どこの じどうしゃですか。',
          romaji: 'Kore wa doko no jidousha desu ka.',
          vietnamese: 'Đây là ôtô của nước nào/của công ty nào?',
          english: 'Which country/company is this car from?'
        },
        {
          japanese: '…日本 の じどうしゃです。',
          romaji: 'Nihon no jidousha desu.',
          vietnamese: 'Ôtô của Nhật.',
          english: 'It\'s a Japanese car.'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l3-p5',
      pattern: 'これ／それ／あれ は なんの N ですか。',
      meaning: 'Đây/Đó/Kia là N thuộc loại hình/thể loại gì?',
      explanation: 'Dùng khi muốn hỏi 1 vật nào đó thuộc lĩnh vực gì, về chuyên ngành nào, viết bằng tiếng nước nào….',
      difficulty: 'beginner',
      category: 'category-question-pattern',
      examples: [
        {
          japanese: 'これは なんの ざっしですか。',
          romaji: 'Kore wa nan no zasshi desu ka.',
          vietnamese: 'Đây là tạp chí gì?',
          english: 'What kind of magazine is this?'
        },
        {
          japanese: '…それは コンピューターのです。',
          romaji: 'Sore wa konpyuutaa no desu.',
          vietnamese: 'Đó là tạp chí (về) máy tính.',
          english: 'It\'s a computer magazine.'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l3-p6',
      pattern: 'N は いくらですか。',
      meaning: 'N bao nhiêu tiền?',
      explanation: 'Dùng để hỏi giá của một món đồ.',
      difficulty: 'beginner',
      category: 'price-question-pattern',
      examples: [
        {
          japanese: 'このざっし は いくらですか。',
          romaji: 'Kono zasshi wa ikura desu ka.',
          vietnamese: 'Cái tạp chí này bao nhiêu tiền?',
          english: 'How much is this magazine?'
        },
        {
          japanese: '…１００円です。',
          romaji: 'Hyaku en desu.',
          vietnamese: '…100 Yên.',
          english: '...It is 100 yen.'
        }
      ],
      notes: []
    }
  ]
};

export default N5Lesson3Grammar;