import { GrammarLesson } from './lesson1';

export const N5Lesson8Grammar: GrammarLesson = {
  id: 'n5-grammar-lesson-8',
  lessonNumber: 8,
  japaneseTitle: '第８課',
  vietnameseTitle: 'Bài 8',
  englishTitle: 'Lesson 8',
  difficulty: 'Beginner',
  estimatedTime: '60 phút',
  
  summary: 'Bài học này giới thiệu về các loại tính từ trong tiếng Nhật, cách sử dụng chúng trong câu khẳng định, phủ định và cách dùng để bổ nghĩa cho danh từ.',
  
  vocabulary: [
    '小さい (chiisai) - Nhỏ',
    '大きい (ookii) - To',
    '熱い (atsui) - Nóng',
    '寒い (samui) - Lạnh',
    '高い (takai) - Cao, đắt',
    'ハンサム (hansamu) - Đẹp trai',
    'しんせつ (shinsetsu) - Tốt bụng',
    'しずか (shizuka) - Yên tĩnh',
    'べんり (benri) - Thuận tiện',
    'どう (dou) - Thế nào',
    'あまり (amari) - Không ~ lắm',
    'どんな (donna) - Như thế nào',
    'が (ga) - Nhưng',
    'そして (soshite) - Và'
  ],

  patterns: [
    {
      id: 'n5-l8-p1',
      pattern: 'Tính từ đuôi い và な',
      meaning: 'Phân loại tính từ trong tiếng Nhật',
      explanation: 'Trong tiếng Nhật, tính từ được chia thành hai loại chính: Tính từ đuôi "い" (i-adjectives) và Tính từ đuôi "な" (na-adjectives). Tính từ đuôi "い" luôn kết thúc bằng âm "い" (trừ một số trường hợp ngoại lệ như "いい"). Tính từ đuôi "な" thường không kết thúc bằng "な" khi đứng một mình, mà "な" chỉ xuất hiện khi nó bổ nghĩa trực tiếp cho danh từ. Việc phân biệt hai loại tính từ này rất quan trọng vì cách chia và cách sử dụng của chúng trong câu là khác nhau.',
      difficulty: 'beginner',
      category: 'adjective-type',
      examples: [
        {
          japanese: '富士山は 高いです。',
          kanji: '富士山は 高いです。',
          vietnamese: 'Núi Phú Sĩ cao.',
          romaji: 'Fujisan wa takai desu.',
          english: 'Mt. Fuji is high.'
        },
        {
          japanese: '田中先生は しんせつです。',
          kanji: '田中先生は 親切です。',
          vietnamese: 'Thầy Tanaka tốt bụng.',
          romaji: 'Tanaka-sensei wa shinsetsu desu.',
          english: 'Mr. Tanaka is kind.'
        },
        {
          japanese: 'この映画は おもしろくないです。',
          kanji: 'この映画は 面白くないです。',
          vietnamese: 'Bộ phim này không hay.',
          romaji: 'Kono eiga wa omoshirokunai desu.',
          english: 'This movie is not interesting.'
        }
      ],
      notes: [
        'Một số từ dễ nhầm với tình từ đuôi い: きれい（な）(đẹp, sạch)、有名な (nổi tiếng)、きらい（な）(ghét, không thích).'
      ]
    },
    {
      id: 'n5-l8-p2',
      pattern: 'Câu khẳng định và phủ định với tính từ',
      meaning: 'Cách chia tính từ ở thể khẳng định và phủ định',
      explanation: 'Để tạo câu khẳng định và phủ định với tính từ trong tiếng Nhật, có sự khác biệt giữa tính từ đuôi "い" và tính từ đuôi "な". Đối với tính từ đuôi "な": Khẳng định: N + です (ví dụ: きれい です - đẹp) Phủ định: N + ではありません (ví dụ: きれい ではありません - không đẹp) Đối với tính từ đuôi "い": Khẳng định: い-Adj + です (ví dụ: おいしい です - ngon) Phủ định: い-Adj (bỏ い) + くないです (ví dụ: おいしくないです - không ngon) Lưu ý: Tính từ "いい" (tốt) là trường hợp đặc biệt, dạng phủ định là "よくないです".',
      difficulty: 'beginner',
      category: 'adjective-conjugation',
      examples: [
        {
          japanese: 'ハノイは 静かではありません。',
          kanji: 'ハノイは 静かではありません。',
          vietnamese: 'Hà Nội không yên tĩnh.',
          romaji: 'Hanoi wa shizuka dewa arimasen.',
          english: 'Hanoi is not quiet.'
        },
        {
          japanese: 'この食べ物は あまり おいしくないです。',
          kanji: 'この食べ物は あまり 美味しくないです。',
          vietnamese: 'Đồ ăn này không ngon lắm.',
          romaji: 'Kono tabemono wa amari oishikunai desu.',
          english: 'This food is not very delicious.'
        },
        {
          japanese: 'いいです -> よくないです',
          kanji: 'いいです -> よくないです',
          vietnamese: 'Tốt -> Không tốt',
          romaji: 'ii desu -> yokunai desu',
          english: 'Good -> Not good'
        }
      ],
      notes: [
        'Trường hợp đặc biệt tính từ いい sẽ đổi いいです thành よくないです.'
      ]
    },
    {
      id: 'n5-l8-p3',
      pattern: 'N は どうですか。',
      meaning: 'Hỏi tính chất, cảm tưởng về N',
      explanation: 'Mẫu câu này dùng để hỏi về tính chất, trạng thái, hoặc cảm tưởng của người nói về một vật, sự vật, hoặc người. "N" là danh từ chỉ đối tượng được hỏi. "どうですか" (dou desu ka) là cụm từ hỏi "thế nào", "ra sao". Câu này thường được dùng để thăm dò ý kiến, cảm nhận của người khác về một vấn đề nào đó.',
      difficulty: 'beginner',
      category: 'question-word',
      examples: [
        {
          japanese: '日本の生活は どうですか。',
          kanji: '日本の生活は どうですか。',
          vietnamese: 'Cuộc sống ở Nhật thế nào?',
          romaji: 'Nihon no seikatsu wa dou desu ka.',
          english: 'How is life in Japan?'
        },
        {
          japanese: 'この本はどうですか。',
          kanji: 'この本はどうですか。',
          vietnamese: 'Quyển sách này thế nào?',
          romaji: 'Kono hon wa dou desu ka.',
          english: 'How is this book?'
        },
        {
          japanese: 'お天気はどうですか。',
          kanji: 'お天気はどうですか。',
          vietnamese: 'Thời tiết thế nào?',
          romaji: 'Otenki wa dou desu ka.',
          english: 'How is the weather?'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l8-p4',
      pattern: 'な-Adj な N / い-Adj（～い）N',
      meaning: 'Tính từ bổ nghĩa cho danh từ',
      explanation: 'Trong tiếng Nhật, tính từ thường được đặt trước danh từ để bổ nghĩa cho danh từ đó, tương tự như trong tiếng Việt. Tuy nhiên, có sự khác biệt về hình thức giữa tính từ đuôi "い" và tính từ đuôi "な" khi chúng bổ nghĩa cho danh từ: Đối với tính từ đuôi "な": Tính từ đuôi "な" giữ nguyên "な" khi đứng trước danh từ (ví dụ: ハンサムな人 - người đẹp trai). Đối với tính từ đuôi "い": Tính từ đuôi "い" giữ nguyên "い" khi đứng trước danh từ (ví dụ: 暑い日 - ngày nóng).',
      difficulty: 'beginner',
      category: 'adjective-noun',
      examples: [
        {
          japanese: 'ジョンさんは ハンサムな人です。',
          kanji: 'ジョンさんは ハンサムな人です。',
          vietnamese: 'Anh John là người đẹp trai.',
          romaji: 'Jon-san wa hansamu na hito desu.',
          english: 'John is a handsome person.'
        },
        {
          japanese: '今日は 暑い日です。',
          kanji: '今日は 暑い日です。',
          vietnamese: 'Hôm nay là một ngày nóng.',
          romaji: 'Kyou wa atsui hi desu.',
          english: 'Today is a hot day.'
        },
        {
          japanese: '富士山は たかい山です。',
          kanji: '富士山は 高い山です。',
          vietnamese: 'Núi Phú Sĩ là ngọn núi cao.',
          romaji: 'Fujisan wa takai yama desu.',
          english: 'Mt. Fuji is a high mountain.'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l8-p5',
      pattern: 'あまり + phủ định của tính từ',
      meaning: 'Không ~ lắm / Không ~ mấy',
      explanation: 'Trạng từ "あまり" (amari) được dùng với dạng phủ định của tính từ hoặc động từ để diễn tả sự phủ định ở mức độ không cao, có nghĩa là "không... lắm" hoặc "không... mấy". Nó biểu thị một sự phủ định một phần, không hoàn toàn. "あまり" luôn đi kèm với thể phủ định của từ theo sau.',
      difficulty: 'beginner',
      category: 'adverb',
      examples: [
        {
          japanese: 'この辞書は あまり 便利ではありません。',
          kanji: 'この辞書は あまり 便利ではありません。',
          vietnamese: 'Quyển từ điển này không tiện lợi lắm.',
          romaji: 'Kono jisho wa amari benri dewa arimasen.',
          english: 'This dictionary is not very convenient.'
        },
        {
          japanese: '日本語は 難しいですか。いいえ、あまり 難しくないです。',
          kanji: '日本語は 難しいですか。いいえ、あまり 難しくないです。',
          vietnamese: 'Tiếng Nhật khó phải không? Không, không khó lắm.',
          romaji: 'Nihongo wa muzukashii desu ka. Iie, amari muzukashikunai desu.',
          english: 'Is Japanese difficult? No, it is not very difficult.'
        },
        {
          japanese: '今日のテストはあまりよくなかったです。',
          kanji: '今日のテストはあまりよくなかったです。',
          vietnamese: 'Bài kiểm tra hôm nay không tốt lắm.',
          romaji: 'Kyou no tesuto wa amari yokunakatta desu.',
          english: 'Today\'s test was not very good.'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l8-p6',
      pattern: 'N1 は どんな N2 ですか。',
      meaning: 'N1 là N2 như thế nào?',
      explanation: 'Mẫu câu này dùng để hỏi về tính chất, đặc điểm, hoặc loại hình của một danh từ. "N1" là danh từ chỉ đối tượng được hỏi. "どんな" (donna) là từ để hỏi "như thế nào", "loại nào", và luôn đi kèm với một danh từ "N2" theo sau. Câu này thường được dùng khi muốn biết thêm thông tin chi tiết về một người, vật, hoặc địa điểm.',
      difficulty: 'beginner',
      category: 'question-word',
      examples: [
        {
          japanese: 'Hue は どんな町ですか。',
          kanji: 'Hue は どんな町ですか。',
          vietnamese: 'Huế là thành phố như thế nào?',
          romaji: 'Hue wa donna machi desu ka.',
          english: 'What kind of city is Hue?'
        },
        {
          japanese: '鈴木さんは どんな 人ですか。',
          kanji: '鈴木さんは どんな 人ですか。',
          vietnamese: 'Suzuki là người thế nào?',
          romaji: 'Suzuki-san wa donna hito desu ka.',
          english: 'What kind of person is Suzuki?'
        },
        {
          japanese: 'これはどんなカメラですか。',
          kanji: 'これはどんなカメラですか。',
          vietnamese: 'Đây là loại máy ảnh nào?',
          romaji: 'Kore wa donna kamera desu ka.',
          english: 'What kind of camera is this?'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l8-p7',
      pattern: 'Sentence1 が、Sentence2',
      meaning: 'S1 nhưng mà S2',
      explanation: 'Trợ từ "が" (ga) được dùng để nối hai mệnh đề hoặc hai câu có nội dung tương phản hoặc đối lập nhau, có nghĩa là "nhưng" hoặc "tuy nhiên". Mệnh đề trước "が" thường đưa ra một thông tin, và mệnh đề sau "が" đưa ra một thông tin khác có phần trái ngược hoặc bổ sung. "が" cũng có thể dùng để giới thiệu chủ đề một cách nhẹ nhàng.',
      difficulty: 'beginner',
      category: 'conjunction',
      examples: [
        {
          japanese: '日本の食べ物は おいしいですが、高いです。',
          kanji: '日本の食べ物は 美味しいですが、高いです。',
          vietnamese: 'Đồ ăn Nhật ngon nhưng đắt.',
          romaji: 'Nihon no tabemono wa oishii desu ga, takai desu.',
          english: 'Japanese food is delicious, but expensive.'
        },
        {
          japanese: 'このへやはきれいですが、しずかではありません。',
          kanji: 'この部屋はきれいですが、静かではありません。',
          vietnamese: 'Căn phòng này đẹp nhưng không yên tĩnh.',
          romaji: 'Kono heya wa kirei desu ga, shizuka dewa arimasen.',
          english: 'This room is beautiful, but it is not quiet.'
        },
        {
          japanese: 'スポーツは好きですが、上手ではありません。',
          kanji: 'スポーツは好きですが、上手ではありません。',
          vietnamese: 'Tôi thích thể thao nhưng không giỏi.',
          romaji: 'Supootsu wa suki desu ga, jouzu dewa arimasen.',
          english: 'I like sports, but I am not good at them.'
        }
      ],
      notes: []
    },
    {
      id: 'n5-l8-p8',
      pattern: 'Sentence1。そして Sentence2',
      meaning: 'S1. Và S2.',
      explanation: 'Liên từ "そして" (soshite) có nghĩa là "và", "sau đó", dùng để nối hai câu hoặc hai mệnh đề có nội dung tương đồng, bổ sung cho nhau, hoặc diễn tả một chuỗi hành động theo trình tự thời gian. Nó thường được dùng để thêm thông tin, mở rộng ý, hoặc kể lại một sự việc tiếp nối. Khác với trợ từ "と" chỉ dùng để nối danh từ, "そして" dùng để nối các câu.',
      difficulty: 'beginner',
      category: 'conjunction',
      examples: [
        {
          japanese: 'ベトナムの食べ物は おいしいです。そして、安いです。',
          kanji: 'ベトナムの食べ物は 美味しいです。そして、安いです。',
          vietnamese: 'Đồ ăn Việt Nam ngon. Và rẻ nữa.',
          romaji: 'Betonamu no tabemono wa oishii desu. Soshite, yasui desu.',
          english: 'Vietnamese food is delicious. And it is cheap.'
        },
        {
          japanese: 'かれはハンサムです。そしてしんせつです。',
          kanji: '彼はハンサムです。そして親切です。',
          vietnamese: 'Anh ấy đẹp trai. Và tốt bụng nữa.',
          romaji: 'Kare wa hansamu desu. Soshite shinsetsu desu.',
          english: 'He is handsome. And he is kind.'
        },
        {
          japanese: 'このコンピューターはあたらしいです。そしてべんりです。',
          kanji: 'このコンピューターは新しいです。そして便利です。',
          vietnamese: 'Cái máy tính này mới. Và tiện lợi nữa.',
          romaji: 'Kono conpyuutaa wa atarashii desu. Soshite benri desu.',
          english: 'This computer is new. And it is convenient.'
        }
      ],
      notes: [
        'Cách dùng 「そして」khác với 「と」 (「と」dùng để nối 2 danh từ).'
      ]
    },
    {
      id: 'n5-l8-p9',
      pattern: 'N はどれですか',
      meaning: 'N là cái nào?',
      explanation: '"どれ" (dore) là từ để hỏi có nghĩa là "cái nào", dùng để hỏi khi có ba vật trở lên và người nói muốn người nghe chọn một trong số đó. Nó thường được dùng trong câu hỏi "N はどれですか" (N là cái nào?) để xác định một vật cụ thể trong một nhóm các vật tương tự.',
      difficulty: 'beginner',
      category: 'question-word',
      examples: [
        {
          japanese: 'あなたのペンはどれですか。',
          kanji: 'あなたのペンはどれですか。',
          vietnamese: 'Bút của bạn là cái nào?',
          romaji: 'Anata no pen wa dore desu ka.',
          english: 'Which one is your pen?'
        },
        {
          japanese: 'さとうさんの傘はどれですか。',
          kanji: '佐藤さんの傘はどれですか。',
          vietnamese: 'Cái ô của anh Sato là cái nào?',
          romaji: 'Satou-san no kasa wa dore desu ka.',
          english: 'Which one is Mr. Sato\'s umbrella?'
        },
        {
          japanese: 'あれはだれのかばんですか。',
          kanji: 'あれは誰のかばんですか。',
          vietnamese: 'Kia là cái cặp của ai?',
          romaji: 'Are wa dare no kaban desu ka.',
          english: 'Whose bag is that?'
        }
      ],
      notes: []
    }
  ]
};

export default N5Lesson8Grammar;
