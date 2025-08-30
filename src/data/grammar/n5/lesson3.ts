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
    'そこ (soko) - Đó, ở đó',
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
      explanation: 'Mẫu câu này dùng để chỉ định vị trí của một địa điểm hoặc vật thể. "ここ" (koko) dùng để chỉ nơi gần người nói. "そこ" (soko) dùng để chỉ nơi gần người nghe hoặc nơi xa người nói nhưng gần người nghe. "あそこ" (asoko) dùng để chỉ nơi xa cả người nói và người nghe. "N (địa điểm)" là danh từ chỉ địa điểm, và "です" (desu) là dạng lịch sự của động từ "to be".',
      difficulty: 'beginner',
      category: 'location-pattern',
      examples: [
        {
          japanese: 'ここは きょうしつです。',
          kanji: 'ここは 教室です。',
          vietnamese: 'Đây là phòng học.',
          romaji: 'Koko wa kyoushitsu desu.',
          english: 'This is the classroom.'
        },
        {
          japanese: 'そこは おてあらいです。',
          kanji: 'そこは お手洗いです。',
          vietnamese: 'Đó là nhà vệ sinh.',
          romaji: 'Soko wa otearai desu.',
          english: 'That is the restroom.'
        },
        {
          japanese: 'あそこは しょくどうです。',
          kanji: 'あそこは 食堂です。',
          vietnamese: 'Kia là nhà ăn tập thể.',
          romaji: 'Asoko wa shokudou desu.',
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
      explanation: 'Mẫu câu này dùng để hỏi vị trí của một địa điểm, người, hoặc vật. "N (địa điểm)" là danh từ chỉ đối tượng muốn hỏi vị trí, theo sau là trợ từ "は" để đánh dấu chủ đề. "どこ" (doko) là từ để hỏi "ở đâu". Câu trả lời thường sử dụng "ここ", "そこ", hoặc "あそこ" kèm theo "です" để chỉ định vị trí.',
      difficulty: 'beginner',
      category: 'question-pattern',
      examples: [
        {
          japanese: 'ロビーは ここです。',
          kanji: 'ロビーは ここです。',
          vietnamese: 'Hành lang ở đây.',
          romaji: 'Robii wa koko desu.',
          english: 'The lobby is here.'
        },
        {
          japanese: 'エレベーターは あそこです。',
          kanji: 'エレベーターは あそこです。',
          vietnamese: 'Cầu thang máy ở chỗ kia.',
          romaji: 'Erebeetaa wa asoko desu.',
          english: 'The elevator is over there.'
        },
        {
          japanese: 'マリアさんは どこですか。',
          kanji: 'マリアさんは どこですか。',
          vietnamese: 'Bạn Maria ở đâu?',
          romaji: 'Maria-san wa doko desu ka.',
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
      explanation: 'Đây là các đại từ chỉ thị lịch sự, tương đương với "ここ・そこ・あそこ・どこ" nhưng mang sắc thái trang trọng và tôn kính hơn. "こちら" (kochira) là dạng lịch sự của "ここ" (đây, phía này). "そちら" (sochira) là dạng lịch sự của "そこ" (đó, phía đó). "あちら" (achira) là dạng lịch sự của "あそこ" (kia, phía kia). "どちら" (dochira) là dạng lịch sự của "どこ" (đâu, phía nào). Chúng thường được dùng trong các tình huống giao tiếp trang trọng, trong kinh doanh, hoặc khi nói chuyện với người lớn tuổi, cấp trên.',
      difficulty: 'beginner',
      category: 'polite-location',
      examples: [
        {
          japanese: 'でんわは どちらですか。',
          kanji: '電話は どちらですか。',
          vietnamese: 'Điện thoại ở đâu nhỉ?',
          romaji: 'Denwa wa dochira desu ka.',
          english: 'Where is the telephone?'
        },
        {
          japanese: '（お）くには どちらですか。',
          kanji: '（お）国は どちらですか。',
          vietnamese: 'Đất nước của bạn là ở đâu?',
          romaji: '(O)kuni wa dochira desu ka.',
          english: 'Where is your country from?'
        },
        {
          japanese: 'うけつけは こちらです。',
          kanji: '受付は こちらです。',
          vietnamese: 'Quầy lễ tân ở phía này ạ.',
          romaji: 'Uketsuke wa kochira desu.',
          english: 'The reception is this way.'
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
      explanation: 'Mẫu câu này dùng để hỏi về xuất xứ, nguồn gốc của một vật thể. "これ" (kore), "それ" (sore), "あれ" (are) là các đại từ chỉ định vật thể (cái này, cái đó, cái kia). "どこ" (doko) ở đây không hỏi về địa điểm mà hỏi về "nước nào", "công ty nào", "hãng nào". "N" là danh từ chỉ vật thể. Câu này thường được dùng khi muốn biết sản phẩm đó được sản xuất ở đâu hoặc thuộc về thương hiệu nào.',
      difficulty: 'beginner',
      category: 'origin-question-pattern',
      examples: [
        {
          japanese: 'これは どこの じどうしゃですか。',
          kanji: 'これは どこの 自動車ですか。',
          vietnamese: 'Đây là ôtô của nước nào/của công ty nào?',
          romaji: 'Kore wa doko no jidousha desu ka.',
          english: 'Which country/company is this car from?'
        },
        {
          japanese: 'それは にほんの くるまです。',
          kanji: 'それは 日本の 車です。',
          vietnamese: 'Đó là xe hơi của Nhật.',
          romaji: 'Sore wa nihon no kuruma desu.',
          english: 'That is a Japanese car.'
        },
        {
          japanese: 'あれは アメリカの パソコンです。',
          kanji: 'あれは アメリカの パソコンです。',
          vietnamese: 'Kia là máy tính của Mỹ.',
          romaji: 'Are wa amerika no pasokon desu.',
          english: 'That is an American computer.'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l3-p5',
      pattern: 'これ／それ／あれ は なんの N ですか。',
      meaning: 'Đây/Đó/Kia là N thuộc loại hình/thể loại gì?',
      explanation: 'Mẫu câu này dùng để hỏi về loại hình, thể loại, hoặc lĩnh vực mà một vật thể thuộc về. "これ" (kore), "それ" (sore), "あれ" (are) là các đại từ chỉ định vật thể. "なんの" (nan no) là cụm từ hỏi "loại gì", "về cái gì". "N" là danh từ chỉ vật thể. Câu này thường được dùng khi muốn phân loại hoặc tìm hiểu về chức năng, nội dung của một vật.',
      difficulty: 'beginner',
      category: 'category-question-pattern',
      examples: [
        {
          japanese: 'これは なんの ざっしですか。',
          kanji: 'これは 何の 雑誌ですか。',
          vietnamese: 'Đây là tạp chí gì?',
          romaji: 'Kore wa nan no zasshi desu ka.',
          english: 'What kind of magazine is this?'
        },
        {
          japanese: 'それは コンピューターの ざっしです。',
          kanji: 'それは コンピューターの 雑誌です。',
          vietnamese: 'Đó là tạp chí về máy tính.',
          romaji: 'Sore wa konpyuutaa no zasshi desu.',
          english: 'It is a computer magazine.'
        },
        {
          japanese: 'あれは にほんごの ほんです。',
          kanji: 'あれは 日本語の 本です。',
          vietnamese: 'Kia là sách tiếng Nhật.',
          romaji: 'Are wa nihongo no hon desu.',
          english: 'That is a Japanese book.'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l3-p6',
      pattern: 'N は いくらですか。',
      meaning: 'N bao nhiêu tiền?',
      explanation: 'Mẫu câu này dùng để hỏi giá tiền của một món đồ. "N" là danh từ chỉ món đồ muốn hỏi giá. "いくら" (ikura) là từ để hỏi "bao nhiêu tiền". Câu này thường được sử dụng khi mua sắm hoặc muốn biết giá cả của một sản phẩm.',
      difficulty: 'beginner',
      category: 'price-question-pattern',
      examples: [
        {
          japanese: 'このざっし は いくらですか。',
          kanji: 'この雑誌 は いくらですか。',
          vietnamese: 'Cái tạp chí này bao nhiêu tiền?',
          romaji: 'Kono zasshi wa ikura desu ka.',
          english: 'How much is this magazine?'
        },
        {
          japanese: 'そのとけい は いくらですか。',
          kanji: 'その時計 は いくらですか。',
          vietnamese: 'Cái đồng hồ đó bao nhiêu tiền?',
          romaji: 'Sono tokei wa ikura desu ka.',
          english: 'How much is that watch?'
        },
        {
          japanese: 'あれは 3000えんです。',
          kanji: 'あれは 3000円です。',
          vietnamese: 'Cái kia giá 3000 yên.',
          romaji: 'Are wa 3000 en desu.',
          english: 'That one is 3000 yen.'
        }
      ],
      notes: []
    }
  ]
};

export default N5Lesson3Grammar;