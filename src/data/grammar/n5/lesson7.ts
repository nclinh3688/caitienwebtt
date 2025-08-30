import { GrammarLesson } from './lesson1';

export const N5Lesson7Grammar: GrammarLesson = {
  id: 'n5-grammar-lesson-7',
  lessonNumber: 7,
  japaneseTitle: '第７課',
  vietnameseTitle: 'Bài 7',
  englishTitle: 'Lesson 7',
  difficulty: 'Beginner',
  estimatedTime: '55 phút',
  
  summary: 'Bài học này tập trung vào cách nói làm gì bằng công cụ gì, cách hỏi một từ trong tiếng nước khác, và các động từ cho/nhận.',
  
  vocabulary: [
    '切ります (kirimasu) - Cắt',
    '書きます (kakimasu) - Viết',
    'あげます (agemasu) - Cho, tặng',
    'もらいます (moraimasu) - Nhận',
    '貸します (kashimasu) - Cho mượn',
    '借ります (karimasu) - Mượn',
    '教えます (oshiemasu) - Dạy',
    '習います (naraimasu) - Học',
    '電話をかけます (denwa o kakemasu) - Gọi điện thoại',
    '手 (te) - Tay',
    'はし (hashi) - Đũa',
    'ナイフ (naifu) - Dao',
    'もう (mou) - Đã...rồi',
    'まだ (mada) - Vẫn chưa'
  ],

  patterns: [
    {
      id: 'n5-l7-p1',
      pattern: 'N で V ます',
      meaning: 'Làm ~ bằng N (công cụ, phương tiện).',
      explanation: 'Mẫu câu này dùng để chỉ rõ công cụ, phương tiện hoặc cách thức mà một hành động được thực hiện. "N" là danh từ chỉ công cụ (ví dụ: はし - đũa, コンピューター - máy tính) hoặc phương tiện (ví dụ: えんぴつ - bút chì). Trợ từ "で" (de) được đặt sau danh từ "N" để biểu thị rằng hành động "V ます" được thực hiện bằng cách sử dụng "N".',
      difficulty: 'beginner',
      category: 'instrumental-particle',
      examples: [
        {
          japanese: 'はしで ごはんを たべます。',
          kanji: '箸で ご飯を 食べます。',
          vietnamese: 'Tôi ăn cơm bằng đũa.',
          romaji: 'Hashi de gohan o tabemasu.',
          english: 'I eat rice with chopsticks.'
        },
        {
          japanese: 'コンピューターで レポートを かきます。',
          kanji: 'コンピューターで レポートを 書きます。',
          vietnamese: 'Tôi viết báo cáo bằng máy tính.',
          romaji: 'Conpyuutaa de repooto o kakimasu.',
          english: 'I write a report with a computer.'
        },
        {
          japanese: '日本語で でんわを かけます。',
          kanji: '日本語で 電話を かけます。',
          vietnamese: 'Tôi nói chuyện điện thoại bằng tiếng Nhật.',
          romaji: 'Nihongo de denwa o kakemasu.',
          english: 'I make a phone call in Japanese.'
        }
      ],
      notes: [
        'Câu hỏi: なんで V ますか。 (Làm ~ bằng gì?).',
        'Trợ từ 「で」cũng chỉ cả phương tiện ngôn ngữ.'
      ]
    },
    {
      id: 'n5-l7-p2',
      pattern: '「Từ/Câu」は ～語で 何ですか',
      meaning: '“Từ/Câu” trong tiếng~ là gì?.',
      explanation: 'Mẫu câu này dùng để hỏi cách nói một từ hoặc một câu bằng một ngôn ngữ khác. "「Từ/Câu」" là từ hoặc câu muốn hỏi. "～語" (go) là hậu tố chỉ ngôn ngữ (ví dụ: 英語 - tiếng Anh, 日本語 - tiếng Nhật). "で" (de) ở đây chỉ phương tiện ngôn ngữ. "何ですか" (nan desu ka) là câu hỏi "là gì".',
      difficulty: 'beginner',
      category: 'language-question',
      examples: [
        {
          japanese: '「ありがとう」は 英語で 何ですか。',
          kanji: '「ありがとう」は 英語で 何ですか。',
          vietnamese: '“ありがとう” trong tiếng Anh là gì thế?',
          romaji: 'Arigatou wa eigo de nan desu ka.',
          english: 'What is “arigatou” in English?'
        },
        {
          japanese: '「Tết」は 日本語で 何ですか。',
          kanji: '「Tết」は 日本語で 何ですか。',
          vietnamese: '“Tết” tiếng Nhật là gì?',
          romaji: 'Teto wa nihongo de nan desu ka.',
          english: 'What is “Tết” in Japanese?'
        },
        {
          japanese: '「こんにちは」はベトナムごでなんですか。',
          kanji: '「こんにちは」はベトナム語で何ですか。',
          vietnamese: '“Konnichiwa” trong tiếng Việt là gì?',
          romaji: 'Konnichiwa wa betonamugo de nan desu ka.',
          english: 'What is “Konnichiwa” in Vietnamese?'
        }
      ],
      notes: [
        'Khi viết, từ/câu được hỏi thường để trong dấu 「 」.'
      ]
    },
    {
      id: 'n5-l7-p3',
      pattern: 'N1(người) に N2 を あげます／かします／おしえます…',
      meaning: 'Làm ~ cho N1.',
      explanation: 'Mẫu câu này dùng để diễn tả hành động cho, tặng, cho mượn, hoặc dạy cho một người nào đó. "N1 (người)" là danh từ chỉ người nhận hành động, được đánh dấu bằng trợ từ "に" (ni). "N2" là danh từ chỉ vật hoặc thông tin được cho/tặng/mượn/dạy, được đánh dấu bằng trợ từ "を" (o). Các động từ như "あげます" (cho, tặng), "かします" (cho mượn), "おしえます" (dạy) là những động từ thường dùng trong mẫu câu này.',
      difficulty: 'beginner',
      category: 'giving-verb',
      examples: [
        {
          japanese: 'ともだちに てがみを かきます。',
          kanji: '友達に 手紙を 書きます。',
          vietnamese: 'Tôi sẽ viết thư cho bạn.',
          romaji: 'Tomodachi ni tegami o kakimasu.',
          english: 'I will write a letter to my friend.'
        },
        {
          japanese: '母に プレゼントをあげます',
          kanji: '母に プレゼントをあげます',
          vietnamese: 'Tôi sẽ tặng quà cho mẹ.',
          romaji: 'Haha ni purezento o agemasu.',
          english: 'I will give a present to my mother.'
        },
        {
          japanese: 'だれに 日本語を おしえますか。',
          kanji: '誰に 日本語を 教えますか。',
          vietnamese: 'Bạn dạy tiếng Nhật cho ai?',
          romaji: 'Dare ni nihongo o oshiemasu ka.',
          english: 'Who do you teach Japanese to?'
        }
      ],
      notes: [
        'Câu hỏi: だれに V ますか。 (Làm ~ cho ai?).',
        'Với động từ 「あげます」, N1 không được dùng là 「わたし」.'
      ]
    },
    {
      id: 'n5-l7-p4',
      pattern: 'N1(người) に N2 を もらいます／かります／ならいます',
      meaning: '(Nhận được) ~ từ N1.',
      explanation: 'Mẫu câu này dùng để diễn tả hành động nhận, mượn, hoặc học từ một người nào đó. "N1 (người)" là danh từ chỉ người hoặc nguồn gốc của vật/thông tin được nhận/mượn/học, được đánh dấu bằng trợ từ "に" (ni) hoặc "から" (kara). "N2" là danh từ chỉ vật hoặc thông tin được nhận/mượn/học, được đánh dấu bằng trợ từ "を" (o). Các động từ như "もらいます" (nhận), "かります" (mượn), "ならいます" (học) là những động từ thường dùng trong mẫu câu này.',
      difficulty: 'beginner',
      category: 'receiving-verb',
      examples: [
        {
          japanese: '木村さんは山田さんに花をもらいました。',
          kanji: '木村さんは山田さんに花をもらいました。',
          vietnamese: 'Chị Kimura đã nhận được hoa từ Yamada.',
          romaji: 'Kimura-san wa Yamada-san ni hana o moraimashita.',
          english: 'Ms. Kimura received flowers from Mr. Yamada.'
        },
        {
          japanese: '鈴木先生に日本語を習いました。',
          kanji: '鈴木先生に日本語を習いました。',
          vietnamese: 'Tôi đã học tiếng Nhật từ cô Suzuki.',
          romaji: 'Suzuki-sensei ni nihongo o naraimashita.',
          english: 'I learned Japanese from Ms. Suzuki.'
        },
        {
          japanese: '銀行から お金を借ります。',
          kanji: '銀行から お金を借ります。',
          vietnamese: 'Tôi sẽ vay tiền từ ngân hàng.',
          romaji: 'Ginkou kara okane o karimasu.',
          english: 'I will borrow money from the bank.'
        }
      ],
      notes: [
        'Khi N1 không phải là người mà là một cơ quan/tổ chức nào đó, sẽ dùng trợ từ 「から」thay cho 「に」.',
        'Câu hỏi: だれ に（から）V ますか。 (～ từ ai?).'
      ]
    },
    {
      id: 'n5-l7-p5',
      pattern: 'もう＋V ました ／ まだ',
      meaning: 'đã …rồi / vẫn/chưa',
      explanation: '"もう" (mou) và "まだ" (mada) là các trạng từ chỉ thời gian, dùng để diễn tả trạng thái hoàn thành hoặc chưa hoàn thành của một hành động. "もう + V ました" có nghĩa là "đã làm V rồi", biểu thị hành động đã hoàn tất. "まだ" có nghĩa là "vẫn chưa" hoặc "chưa", biểu thị hành động hoặc trạng thái chưa xảy ra, chưa hoàn thành tại thời điểm nói. Khi trả lời câu hỏi với "もう", nếu chưa hoàn thành, thường dùng "いいえ、まだです" (Không, vẫn chưa).',
      difficulty: 'beginner',
      category: 'tense',
      examples: [
        {
          japanese: 'もう ごはんを たべましたか。',
          kanji: 'もう ご飯を 食べましたか。',
          vietnamese: 'Bạn đã ăn cơm rồi à?',
          romaji: 'Mou gohan o tabemashita ka.',
          english: 'Have you eaten rice already?'
        },
        {
          japanese: 'はい、もう たべました。',
          kanji: 'はい、もう 食べました。',
          vietnamese: 'Vâng, tôi ăn rồi.',
          romaji: 'Hai, mou tabemashita.',
          english: 'Yes, I have already eaten.'
        },
        {
          japanese: 'いいえ、まだです。',
          kanji: 'いいえ、まだです。',
          vietnamese: 'Không, tôi vẫn chưa ăn.',
          romaji: 'Iie, mada desu.',
          english: 'No, not yet.'
        }
      ],
      notes: [
        'Với câu hỏi 「もう V ましたか？」, câu trả lời khẳng định là 「はい、もう V ました。」, câu trả lời phủ định là 「いいえ、まだです。」.'
      ]
    }
  ]
};

export default N5Lesson7Grammar;
