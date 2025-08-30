export interface GrammarPattern {
  id: string;
  pattern: string;
  meaning: string;
  explanation: string;
  examples: GrammarExample[];
  notes: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export interface GrammarExample {
  japanese: string;
  romaji: string;
  vietnamese: string;
  english: string;
  kanji?: string;
  audio?: string;
}

export interface GrammarLesson {
  id: string;
  lessonNumber: number;
  japaneseTitle: string;
  vietnameseTitle: string;
  englishTitle: string;
  patterns: GrammarPattern[];
  vocabulary: string[];
  summary: string;
  difficulty: string;
  estimatedTime: string;
}

export const N5Lesson1Grammar: GrammarLesson = {
  id: 'n5-grammar-lesson-1',
  lessonNumber: 1,
  japaneseTitle: '第1課 - はじめまして',
  vietnameseTitle: 'Bài 1 - Rất vui được gặp bạn',
  englishTitle: 'Lesson 1 - Nice to meet you',
  difficulty: 'Beginner',
  estimatedTime: '45 phút',
  
  summary: 'Bài học đầu tiên giới thiệu cách chào hỏi, giới thiệu bản thân và sử dụng trợ từ は (wa) để đánh dấu chủ ngữ trong câu.',
  
  vocabulary: [
    'はじめまして (hajimemashite) - Rất vui được gặp bạn',
    'どうぞよろしく (douzo yoroshiku) - Rất mong được giúp đỡ',
    'わたし (watashi) - Tôi',
    'あなた (anata) - Bạn',
    'あのひと (ano hito) - Người đó',
    'せんせい (sensei) - Giáo viên',
    'がくせい (gakusei) - Học sinh',
    'かいしゃいん (kaishain) - Nhân viên công ty',
    'だいがく (daigaku) - Đại học',
    'びょういん (byouin) - Bệnh viện'
  ],

  patterns: [
    {
      id: 'n5-l1-p1',
      pattern: 'A は B です',
      meaning: 'A là B',
      explanation: 'Đây là mẫu câu khẳng định cơ bản nhất trong tiếng Nhật, dùng để giới thiệu, định nghĩa hoặc xác nhận thông tin. "A" là chủ đề của câu, được đánh dấu bằng trợ từ "は" (đọc là "wa", không phải "ha"). "B" là vị ngữ, thường là danh từ hoặc cụm danh từ, và "です" (desu) là dạng lịch sự của động từ "to be" trong tiếng Nhật. Mẫu câu này thường được dùng để giới thiệu tên, nghề nghiệp, quốc tịch, hoặc để mô tả một sự vật, sự việc.',
      difficulty: 'beginner',
      category: 'basic-sentence-pattern',
      examples: [
        {
          japanese: 'わたしは がくせい です。',
          romaji: 'Watashi wa gakusei desu.',
          vietnamese: 'Tôi là học sinh.',
          english: 'I am a student.'
        },
        {
          japanese: 'あのひとは せんせい です。',
          romaji: 'Ano hito wa sensei desu.',
          vietnamese: 'Người đó là giáo viên.',
          english: 'That person is a teacher.'
        },
        {
          japanese: 'わたしは かいしゃいん です。',
          romaji: 'Watashi wa kaishain desu.',
          vietnamese: 'Tôi là nhân viên công ty.',
          english: 'I am a company employee.'
        }
      ],
      notes: [
        'Trợ từ は được đọc là "wa" mặc dù viết là "ha"',
        'です luôn đứng ở cuối câu khẳng định lịch sự',
        'Có thể bỏ わたしは khi ngữ cảnh đã rõ ràng',
        'Mẫu câu này dùng để giới thiệu nghề nghiệp, quốc tịch, tên'
      ]
    },

    {
      id: 'n5-l1-p2',
      pattern: 'A は B ではありません',
      meaning: 'A không phải là B',
      explanation: 'Mẫu câu này là dạng phủ định của "A は B です", dùng để diễn tả rằng "A không phải là B". "ではありません" (dewa arimasen) là cách nói phủ định lịch sự của "です". Nó được sử dụng trong các tình huống trang trọng hoặc khi muốn thể hiện sự tôn trọng. Trong văn nói thân mật hơn, có thể dùng "じゃありません" (ja arimasen).',
      difficulty: 'beginner',
      category: 'negative-sentence-pattern',
      examples: [
        {
          japanese: 'わたしは せんせい ではありません。',
          romaji: 'Watashi wa sensei dewa arimasen.',
          vietnamese: 'Tôi không phải là giáo viên.',
          english: 'I am not a teacher.'
        },
        {
          japanese: 'あのひとは がくせい ではありません。',
          romaji: 'Ano hito wa gakusei dewa arimasen.',
          vietnamese: 'Người đó không phải là học sinh.',
          english: 'That person is not a student.'
        }
      ],
      notes: [
        'ではありません là dạng phủ định lịch sự',
        'Có thể viết tắt thành じゃありません trong văn nói thân mật',
        'Trợ từ は vẫn được giữ nguyên ở vị trí chủ ngữ',
        'Dạng phủ định này dùng trong tình huống trang trọng'
      ]
    },

    {
      id: 'n5-l1-p3',
      pattern: 'A は B ですか',
      meaning: 'A có phải là B không?',
      explanation: 'Mẫu câu này dùng để đặt câu hỏi xác nhận, có nghĩa là "A có phải là B không?". Để tạo câu hỏi, chỉ cần thêm trợ từ "か" (ka) vào cuối câu khẳng định "A は B です". Trợ từ "か" biến câu thành câu hỏi và thường được phát âm với ngữ điệu lên ở cuối câu. Câu trả lời thường là "はい" (hai - vâng, đúng vậy) hoặc "いいえ" (iie - không, không phải).',
      difficulty: 'beginner',
      category: 'question-pattern',
      examples: [
        {
          japanese: 'あなたは がくせい ですか。',
          romaji: 'Anata wa gakusei desu ka?',
          vietnamese: 'Bạn có phải là học sinh không?',
          english: 'Are you a student?'
        },
        {
          japanese: 'あのひとは せんせい ですか。',
          romaji: 'Ano hito wa sensei desu ka?',
          vietnamese: 'Người đó có phải là giáo viên không?',
          english: 'Is that person a teacher?'
        },
        {
          japanese: 'あなたは かいしゃいん ですか。',
          romaji: 'Anata wa kaishain desu ka?',
          vietnamese: 'Bạn có phải là nhân viên công ty không?',
          english: 'Are you a company employee?'
        }
      ],
      notes: [
        'か luôn đứng ở cuối câu để tạo thành câu hỏi',
        'Không cần thay đổi trật tự từ trong câu',
        'Ngữ điệu câu hỏi thường cao hơn ở cuối',
        'Có thể trả lời bằng はい (hai) hoặc いいえ (iie)'
      ]
    },

    {
      id: 'n5-l1-p4',
      pattern: 'A も B です',
      meaning: 'A cũng là B',
      explanation: 'Trợ từ "も" (mo) được dùng để biểu thị sự tương đồng hoặc bổ sung, có nghĩa là "cũng", "cũng vậy". Khi "も" thay thế cho trợ từ "は" (chủ đề), nó nhấn mạnh rằng chủ thể "A" cũng có cùng tính chất hoặc trạng thái với một chủ thể khác đã được đề cập trước đó. Mẫu câu này thường được sử dụng để thể hiện sự đồng tình hoặc khi muốn thêm thông tin tương tự.',
      difficulty: 'beginner',
      category: 'particle-mo-pattern',
      examples: [
        {
          japanese: 'わたしも がくせい です。',
          romaji: 'Watashi mo gakusei desu.',
          vietnamese: 'Tôi cũng là học sinh.',
          english: 'I am also a student.'
        },
        {
          japanese: 'あのひとも せんせい です。',
          romaji: 'Ano hito mo sensei desu.',
          vietnamese: 'Người đó cũng là giáo viên.',
          english: 'That person is also a teacher.'
        }
      ],
      notes: [
        'も thay thế は khi muốn diễn tả "cũng"',
        'も có thể dùng với cả câu khẳng định và phủ định',
        'Khi dùng も, người nghe hiểu rằng có người khác cũng như vậy',
        'も thường dùng để thể hiện sự đồng tình hoặc tương đồng'
      ]
    },

    {
      id: 'n5-l1-p5',
      pattern: 'A の B',
      meaning: 'B của A / B thuộc về A',
      explanation: 'Trợ từ "の" (no) là một trong những trợ từ quan trọng và đa năng nhất trong tiếng Nhật, dùng để nối hai danh từ với nhau. Chức năng chính của nó là biểu thị mối quan hệ sở hữu ("B của A"), nhưng nó còn có thể chỉ định nguồn gốc, chất liệu, nội dung, hoặc một danh từ bổ nghĩa cho danh từ khác. Cấu trúc "A の B" có nghĩa là "B thuộc về A" hoặc "B mà A mô tả".',
      difficulty: 'beginner',
      category: 'particle-no-pattern',
      examples: [
        {
          japanese: 'わたしの ほん',
          romaji: 'Watashi no hon',
          vietnamese: 'Sách của tôi',
          english: 'My book'
        },
        {
          japanese: 'だいがくの せんせい',
          romaji: 'Daigaku no sensei',
          vietnamese: 'Giáo viên của trường đại học',
          english: 'University teacher'
        },
        {
          japanese: 'かいしゃの かいしゃいん',
          romaji: 'Kaisha no kaishain',
          vietnamese: 'Nhân viên của công ty',
          english: 'Company employee'
        }
      ],
      notes: [
        'の biểu thị mối quan hệ sở hữu hoặc thuộc về',
        'Có thể dùng để chỉ nơi chốn, thời gian, chất liệu',
        'の có thể nối nhiều danh từ với nhau',
        'Trong tiếng Việt, の thường được dịch là "của" hoặc bỏ qua'
      ]
    },

    {
      id: 'n5-l1-p6',
      pattern: 'A は B の C です',
      meaning: 'A là C của B',
      explanation: 'Mẫu câu này kết hợp trợ từ "は" và "の" để diễn tả một mối quan hệ phức tạp hơn, thường là để xác định chủ ngữ "A" thuộc về một nhóm hoặc tổ chức "B" nào đó, và "C" là vai trò hoặc vị trí của "A" trong nhóm "B". Cấu trúc "B の C" tạo thành một cụm danh từ, bổ nghĩa cho chủ ngữ "A". Mẫu câu này thường được dùng để giới thiệu chi tiết hơn về thân phận, nghề nghiệp, hoặc mối quan hệ của một người.',
      difficulty: 'beginner',
      category: 'combined-pattern',
      examples: [
        {
          japanese: 'わたしは だいがくの がくせい です。',
          romaji: 'Watashi wa daigaku no gakusei desu.',
          vietnamese: 'Tôi là học sinh của trường đại học.',
          english: 'I am a university student.'
        },
        {
          japanese: 'あのひとは かいしゃの せんせい です。',
          romaji: 'Ano hito wa kaisha no sensei desu.',
          vietnamese: 'Người đó là giáo viên của công ty.',
          english: 'That person is a company teacher.'
        }
      ],
      notes: [
        'Mẫu câu này kết hợp cả は và の',
        'B の C tạo thành một cụm danh từ',
        'Có thể mở rộng thành nhiều の nối tiếp nhau',
        'Thứ tự: Chủ ngữ + は + Sở hữu + の + Đối tượng + です'
      ]
    }
  ]
};

// Vocabulary for Lesson 1
export const N5Lesson1Vocabulary = [
  {
    japanese: 'はじめまして',
    romaji: 'hajimemashite',
    vietnamese: 'Rất vui được gặp bạn',
    english: 'Nice to meet you',
    category: 'greeting',
    difficulty: 'beginner'
  },
  {
    japanese: 'どうぞよろしく',
    romaji: 'douzo yoroshiku',
    vietnamese: 'Rất mong được giúp đỡ',
    english: 'Please treat me well / Nice to meet you',
    category: 'greeting',
    difficulty: 'beginner'
  },
  {
    japanese: 'わたし',
    romaji: 'watashi',
    vietnamese: 'Tôi',
    english: 'I / me',
    category: 'pronoun',
    difficulty: 'beginner'
  },
  {
    japanese: 'あなた',
    romaji: 'anata',
    vietnamese: 'Bạn',
    english: 'You',
    category: 'pronoun',
    difficulty: 'beginner'
  },
  {
    japanese: 'あのひと',
    romaji: 'ano hito',
    vietnamese: 'Người đó',
    english: 'That person',
    category: 'pronoun',
    difficulty: 'beginner'
  },
  {
    japanese: 'せんせい',
    romaji: 'sensei',
    vietnamese: 'Giáo viên',
    english: 'Teacher',
    category: 'occupation',
    difficulty: 'beginner'
  },
  {
    japanese: 'がくせい',
    romaji: 'gakusei',
    vietnamese: 'Học sinh',
    english: 'Student',
    category: 'occupation',
    difficulty: 'beginner'
  },
  {
    japanese: 'かいしゃいん',
    romaji: 'kaishain',
    vietnamese: 'Nhân viên công ty',
    english: 'Company employee',
    category: 'occupation',
    difficulty: 'beginner'
  },
  {
    japanese: 'だいがく',
    romaji: 'daigaku',
    vietnamese: 'Đại học',
    english: 'University',
    category: 'place',
    difficulty: 'beginner'
  },
  {
    japanese: 'びょういん',
    romaji: 'byouin',
    vietnamese: 'Bệnh viện',
    english: 'Hospital',
    category: 'place',
    difficulty: 'beginner'
  },
  {
    japanese: 'ほん',
    romaji: 'hon',
    vietnamese: 'Sách',
    english: 'Book',
    category: 'object',
    difficulty: 'beginner'
  },
  {
    japanese: 'かいしゃ',
    romaji: 'kaisha',
    vietnamese: 'Công ty',
    english: 'Company',
    category: 'place',
    difficulty: 'beginner'
  }
];

// Practice exercises for Lesson 1
export const N5Lesson1Exercises = [
  {
    id: 'ex1',
    type: 'fill-blank',
    question: 'Complete the sentence: わたし___ がくせい です。',
    options: ['は', 'も', 'の', 'か'],
    correctAnswer: 'は',
    explanation: 'Trợ từ は được dùng để đánh dấu chủ ngữ trong câu.'
  },
  {
    id: 'ex2',
    type: 'translation',
    question: 'Translate to Japanese: "I am a student."',
    correctAnswer: 'わたしは がくせい です。',
    explanation: 'Sử dụng mẫu câu cơ bản: A は B です'
  },
  {
    id: 'ex3',
    type: 'multiple-choice',
    question: 'What does の mean in "わたしの ほん"?',
    options: ['I', 'book', 'of/from', 'is'],
    correctAnswer: 'of/from',
    explanation: 'の biểu thị mối quan hệ sở hữu, có nghĩa là "của".'
  },
  {
    id: 'ex4',
    type: 'sentence-formation',
    question: 'Form a question: "Are you a teacher?"',
    correctAnswer: 'あなたは せんせい ですか。',
    explanation: 'Thêm か vào cuối câu để tạo thành câu hỏi.'
  },
  {
    id: 'ex5',
    type: 'fill-blank',
    question: 'Complete: あのひとも ___ です。',
    options: ['がくせい', 'がくせいは', 'がくせいの', 'がくせいか'],
    correctAnswer: 'がくせい',
    explanation: 'も thay thế は, không cần thêm trợ từ khác.'
  }
];

// Cultural notes for Lesson 1
export const N5Lesson1CulturalNotes = [
  {
    title: 'Cách chào hỏi trong tiếng Nhật',
    content: 'はじめまして (hajimemashite) được dùng khi gặp ai đó lần đầu tiên. Sau đó thường nói どうぞよろしく (douzo yoroshiku) để thể hiện sự tôn trọng và mong muốn được giúp đỡ lẫn nhau.',
    importance: 'high'
  },
  {
    title: 'Sử dụng です',
    content: 'です là dạng lịch sự của động từ "to be". Trong tiếng Nhật, việc sử dụng ngôn ngữ lịch sự rất quan trọng, đặc biệt khi gặp người lạ hoặc người lớn tuổi.',
    importance: 'high'
  },
  {
    title: 'Trợ từ は và も',
    content: 'は đánh dấu chủ ngữ, も có nghĩa là "cũng". Việc hiểu và sử dụng đúng các trợ từ này là nền tảng quan trọng để xây dựng câu tiếng Nhật.',
    importance: 'high'
  },
  {
    title: 'Trợ từ の',
    content: 'の biểu thị mối quan hệ sở hữu hoặc thuộc về. Đây là một trong những trợ từ cơ bản nhất và được sử dụng rất thường xuyên trong tiếng Nhật.',
    importance: 'medium'
  }
];

export default N5Lesson1Grammar;
