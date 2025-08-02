const fs = require('fs');
const path = require('path');

// N5 Vocabulary themes for lessons B06-B10
const vocabularyThemes = {
  B06: {
    theme: 'Food & Dining',
    words: [
      { japanese: 'ごはん', reading: 'gohan', meaning: 'rice/meal', example: 'ごはんを食べます (I eat rice)' },
      { japanese: 'パン', reading: 'pan', meaning: 'bread', example: 'パンを買います (I buy bread)' },
      { japanese: 'みず', reading: 'mizu', meaning: 'water', example: 'みずを飲みます (I drink water)' },
      { japanese: 'おちゃ', reading: 'ocha', meaning: 'tea', example: 'おちゃを飲みます (I drink tea)' },
      { japanese: 'コーヒー', reading: 'kōhī', meaning: 'coffee', example: 'コーヒーが好きです (I like coffee)' },
      { japanese: 'りんご', reading: 'ringo', meaning: 'apple', example: 'りんごを食べます (I eat an apple)' },
      { japanese: 'バナナ', reading: 'banana', meaning: 'banana', example: 'バナナが好きです (I like bananas)' },
      { japanese: 'レストラン', reading: 'resutoran', meaning: 'restaurant', example: 'レストランで食べます (I eat at a restaurant)' },
      { japanese: 'メニュー', reading: 'menyū', meaning: 'menu', example: 'メニューを見ます (I look at the menu)' },
      { japanese: 'たべもの', reading: 'tabemono', meaning: 'food', example: 'たべものが好きです (I like food)' }
    ]
  },
  B07: {
    theme: 'Shopping & Money',
    words: [
      { japanese: 'おかね', reading: 'okane', meaning: 'money', example: 'おかねがあります (I have money)' },
      { japanese: 'かいもの', reading: 'kaimono', meaning: 'shopping', example: 'かいものをします (I go shopping)' },
      { japanese: 'みせ', reading: 'mise', meaning: 'shop/store', example: 'みせに入ります (I enter the shop)' },
      { japanese: 'スーパー', reading: 'sūpā', meaning: 'supermarket', example: 'スーパーで買います (I buy at the supermarket)' },
      { japanese: 'デパート', reading: 'depāto', meaning: 'department store', example: 'デパートに行きます (I go to the department store)' },
      { japanese: 'やすい', reading: 'yasui', meaning: 'cheap', example: 'やすいです (It is cheap)' },
      { japanese: 'たかい', reading: 'takai', meaning: 'expensive', example: 'たかいです (It is expensive)' },
      { japanese: 'いくら', reading: 'ikura', meaning: 'how much', example: 'いくらですか (How much is it?)' },
      { japanese: 'えん', reading: 'en', meaning: 'yen', example: '1000えんです (It is 1000 yen)' },
      { japanese: 'レシート', reading: 'reshīto', meaning: 'receipt', example: 'レシートをもらいます (I receive a receipt)' }
    ]
  },
  B08: {
    theme: 'Transportation & Travel',
    words: [
      { japanese: 'でんしゃ', reading: 'densha', meaning: 'train', example: 'でんしゃに乗ります (I ride the train)' },
      { japanese: 'バス', reading: 'basu', meaning: 'bus', example: 'バスで行きます (I go by bus)' },
      { japanese: 'くるま', reading: 'kuruma', meaning: 'car', example: 'くるまを運転します (I drive a car)' },
      { japanese: 'ひこうき', reading: 'hikōki', meaning: 'airplane', example: 'ひこうきで旅行します (I travel by plane)' },
      { japanese: 'えき', reading: 'eki', meaning: 'station', example: 'えきで待ちます (I wait at the station)' },
      { japanese: 'ちかてつ', reading: 'chikatetsu', meaning: 'subway', example: 'ちかてつを使います (I use the subway)' },
      { japanese: 'りょこう', reading: 'ryokō', meaning: 'travel', example: 'りょこうに行きます (I go on a trip)' },
      { japanese: 'ホテル', reading: 'hoteru', meaning: 'hotel', example: 'ホテルに泊まります (I stay at a hotel)' },
      { japanese: 'きっぷ', reading: 'kippu', meaning: 'ticket', example: 'きっぷを買います (I buy a ticket)' },
      { japanese: 'じかん', reading: 'jikan', meaning: 'time', example: 'じかんがあります (I have time)' }
    ]
  },
  B09: {
    theme: 'Family & Relationships',
    words: [
      { japanese: 'かぞく', reading: 'kazoku', meaning: 'family', example: 'かぞくがいます (I have a family)' },
      { japanese: 'おとうさん', reading: 'otōsan', meaning: 'father', example: 'おとうさんは会社員です (My father is a company employee)' },
      { japanese: 'おかあさん', reading: 'okāsan', meaning: 'mother', example: 'おかあさんは主婦です (My mother is a housewife)' },
      { japanese: 'おにいさん', reading: 'onīsan', meaning: 'older brother', example: 'おにいさんは大学生です (My older brother is a university student)' },
      { japanese: 'おねえさん', reading: 'onēsan', meaning: 'older sister', example: 'おねえさんは看護師です (My older sister is a nurse)' },
      { japanese: 'いもうと', reading: 'imōto', meaning: 'younger sister', example: 'いもうとは高校生です (My younger sister is a high school student)' },
      { japanese: 'おとうと', reading: 'otōto', meaning: 'younger brother', example: 'おとうとは中学生です (My younger brother is a junior high school student)' },
      { japanese: 'ともだち', reading: 'tomodachi', meaning: 'friend', example: 'ともだちがいます (I have friends)' },
      { japanese: 'せんせい', reading: 'sensei', meaning: 'teacher', example: 'せんせいは親切です (The teacher is kind)' },
      { japanese: 'がくせい', reading: 'gakusei', meaning: 'student', example: 'がくせいです (I am a student)' }
    ]
  },
  B10: {
    theme: 'Hobbies & Activities',
    words: [
      { japanese: 'しゅみ', reading: 'shumi', meaning: 'hobby', example: 'しゅみは読書です (My hobby is reading)' },
      { japanese: 'スポーツ', reading: 'supōtsu', meaning: 'sports', example: 'スポーツが好きです (I like sports)' },
      { japanese: 'サッカー', reading: 'sakkā', meaning: 'soccer', example: 'サッカーをします (I play soccer)' },
      { japanese: 'テニス', reading: 'tenisu', meaning: 'tennis', example: 'テニスが上手です (I am good at tennis)' },
      { japanese: 'えいが', reading: 'eiga', meaning: 'movie', example: 'えいがを見ます (I watch movies)' },
      { japanese: 'おんがく', reading: 'ongaku', meaning: 'music', example: 'おんがくを聞きます (I listen to music)' },
      { japanese: 'りょこう', reading: 'ryokō', meaning: 'travel', example: 'りょこうが好きです (I like traveling)' },
      { japanese: 'カメラ', reading: 'kamera', meaning: 'camera', example: 'カメラで写真を撮ります (I take photos with a camera)' },
      { japanese: 'ゲーム', reading: 'gēmu', meaning: 'game', example: 'ゲームをします (I play games)' },
      { japanese: 'インターネット', reading: 'intānetto', meaning: 'internet', example: 'インターネットを使います (I use the internet)' }
    ]
  }
};

// N5 Grammar patterns for lessons B06-B10
const grammarPatterns = {
  B06: [
    {
      pattern: '〜を〜ます',
      meaning: 'Object + Verb (polite form)',
      explanation: 'Used to express doing something with an object',
      examples: [
        'ごはんを食べます (I eat rice)',
        'みずを飲みます (I drink water)',
        '本を読みます (I read a book)'
      ]
    },
    {
      pattern: '〜が好きです',
      meaning: 'I like ~',
      explanation: 'Used to express liking something',
      examples: [
        'コーヒーが好きです (I like coffee)',
        'えいがが好きです (I like movies)',
        'スポーツが好きです (I like sports)'
      ]
    }
  ],
  B07: [
    {
      pattern: '〜は〜です',
      meaning: '~ is ~',
      explanation: 'Basic copula sentence pattern',
      examples: [
        'これは1000えんです (This is 1000 yen)',
        'あれはデパートです (That is a department store)',
        'これはやすいです (This is cheap)'
      ]
    },
    {
      pattern: '〜で〜ます',
      meaning: 'At/In ~ do ~',
      explanation: 'Used to express where an action takes place',
      examples: [
        'スーパーで買います (I buy at the supermarket)',
        'レストランで食べます (I eat at the restaurant)',
        'えきで待ちます (I wait at the station)'
      ]
    }
  ],
  B08: [
    {
      pattern: '〜に〜ます',
      meaning: 'To ~ do ~',
      explanation: 'Used to express destination or target',
      examples: [
        'でんしゃに乗ります (I ride the train)',
        'ホテルに泊まります (I stay at the hotel)',
        'えきに行きます (I go to the station)'
      ]
    },
    {
      pattern: '〜で〜ます',
      meaning: 'By ~ do ~',
      explanation: 'Used to express means of transportation',
      examples: [
        'バスで行きます (I go by bus)',
        'ひこうきで旅行します (I travel by plane)',
        'くるまで来ます (I come by car)'
      ]
    }
  ],
  B09: [
    {
      pattern: '〜は〜です',
      meaning: '~ is ~ (occupation)',
      explanation: 'Used to express occupation or status',
      examples: [
        'おとうさんは会社員です (My father is a company employee)',
        'おかあさんは主婦です (My mother is a housewife)',
        'おにいさんは大学生です (My older brother is a university student)'
      ]
    },
    {
      pattern: '〜がいます',
      meaning: 'I have ~ (people)',
      explanation: 'Used to express having people in your life',
      examples: [
        'かぞくがいます (I have a family)',
        'ともだちがいます (I have friends)',
        'おとうとがいます (I have a younger brother)'
      ]
    }
  ],
  B10: [
    {
      pattern: '〜が上手です',
      meaning: 'I am good at ~',
      explanation: 'Used to express being good at something',
      examples: [
        'テニスが上手です (I am good at tennis)',
        'えいごが上手です (I am good at English)',
        '料理が上手です (I am good at cooking)'
      ]
    },
    {
      pattern: '〜をします',
      meaning: 'I do ~ (activities)',
      explanation: 'Used to express doing activities or hobbies',
      examples: [
        'サッカーをします (I play soccer)',
        'ゲームをします (I play games)',
        'かいものをします (I go shopping)'
      ]
    }
  ]
};

// N5 Kanji for lessons B06-B10
const kanjiSets = {
  B06: [
    { character: '食', reading: 'しょく', meaning: 'food/eat', strokeCount: 9, examples: ['食事', '食堂', '食べる'] },
    { character: '飲', reading: 'いん', meaning: 'drink', strokeCount: 12, examples: ['飲み物', '飲む', '飲料'] },
    { character: '飯', reading: 'はん', meaning: 'meal/rice', strokeCount: 12, examples: ['ご飯', '朝飯', '夕飯'] },
    { character: '茶', reading: 'ちゃ', meaning: 'tea', strokeCount: 9, examples: ['お茶', '紅茶', '緑茶'] },
    { character: '水', reading: 'すい', meaning: 'water', strokeCount: 4, examples: ['水', '水道', '水泳'] }
  ],
  B07: [
    { character: '金', reading: 'きん', meaning: 'money/gold', strokeCount: 8, examples: ['お金', '金曜日', '金庫'] },
    { character: '買', reading: 'かい', meaning: 'buy', strokeCount: 12, examples: ['買う', '買い物', '購買'] },
    { character: '店', reading: 'てん', meaning: 'shop/store', strokeCount: 8, examples: ['店', '店員', '商店'] },
    { character: '安', reading: 'あん', meaning: 'cheap/safe', strokeCount: 6, examples: ['安い', '安全', '安心'] },
    { character: '高', reading: 'たか', meaning: 'expensive/high', strokeCount: 10, examples: ['高い', '高校', '高級'] }
  ],
  B08: [
    { character: '車', reading: 'しゃ', meaning: 'car', strokeCount: 7, examples: ['車', '電車', '自動車'] },
    { character: '駅', reading: 'えき', meaning: 'station', strokeCount: 14, examples: ['駅', '駅前', '新駅'] },
    { character: '旅', reading: 'りょ', meaning: 'travel', strokeCount: 10, examples: ['旅行', '旅館', '旅人'] },
    { character: '空', reading: 'くう', meaning: 'sky/empty', strokeCount: 8, examples: ['空', '空港', '空気'] },
    { character: '道', reading: 'どう', meaning: 'road/way', strokeCount: 12, examples: ['道', '道路', '歩道'] }
  ],
  B09: [
    { character: '家', reading: 'か', meaning: 'house/family', strokeCount: 10, examples: ['家', '家族', '家庭'] },
    { character: '父', reading: 'ちち', meaning: 'father', strokeCount: 4, examples: ['父', '父親', '父母'] },
    { character: '母', reading: 'はは', meaning: 'mother', strokeCount: 5, examples: ['母', '母親', '父母'] },
    { character: '兄', reading: 'あに', meaning: 'older brother', strokeCount: 5, examples: ['兄', '兄弟', '兄さん'] },
    { character: '姉', reading: 'あね', meaning: 'older sister', strokeCount: 8, examples: ['姉', '姉妹', '姉さん'] }
  ],
  B10: [
    { character: '好', reading: 'す', meaning: 'like', strokeCount: 6, examples: ['好き', '好む', '好意'] },
    { character: '楽', reading: 'らく', meaning: 'fun/easy', strokeCount: 13, examples: ['楽しい', '音楽', '楽器'] },
    { character: '映', reading: 'えい', meaning: 'reflect', strokeCount: 9, examples: ['映画', '映す', '上映'] },
    { character: '音', reading: 'おん', meaning: 'sound', strokeCount: 9, examples: ['音楽', '音', '音読'] },
    { character: '写', reading: 'しゃ', meaning: 'copy/photograph', strokeCount: 5, examples: ['写真', '写す', '描写'] }
  ]
};

// Generate lesson content for B06-B10
function generateLessonContent(lessonId) {
  const theme = vocabularyThemes[lessonId];
  const grammar = grammarPatterns[lessonId];
  const kanji = kanjiSets[lessonId];

  return {
    metadata: {
      id: lessonId,
      title: `Bài ${lessonId.replace('B', '')}: ${theme.theme}`,
      level: 'N5',
      theme: theme.theme,
      estimatedTime: 45,
      difficulty: 'Beginner',
      lastUpdated: new Date().toISOString()
    },
    vocabulary: theme.words,
    grammar: grammar,
    kanji: kanji,
    listening: {
      audioFile: `/audio/n5/${lessonId}.mp3`,
      transcript: `Bài nghe ${lessonId}: ${theme.theme}`,
      exercises: [
        {
          question: 'Bạn nghe được từ nào?',
          options: ['A', 'B', 'C', 'D'],
          correctAnswer: 'A'
        }
      ]
    },
    exercises: [
      {
        type: 'vocabulary',
        question: 'Chọn từ đúng nghĩa',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 'A'
      },
      {
        type: 'grammar',
        question: 'Chọn câu đúng ngữ pháp',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 'B'
      }
    ]
  };
}

// Generate all lessons B06-B10
const lessonsToGenerate = ['B06', 'B07', 'B08', 'B09', 'B10'];

lessonsToGenerate.forEach(lessonId => {
  const content = generateLessonContent(lessonId);
  const filePath = path.join(__dirname, '..', 'src', 'data', 'jlpt-n5', `${lessonId}.json`);
  
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  console.log(`✅ Generated ${lessonId}.json`);
});

// Update lessons-n5.json to include new lessons
const lessonsListPath = path.join(__dirname, '..', 'src', 'data', 'jlpt-n5', 'lessons-n5.json');
const existingLessons = JSON.parse(fs.readFileSync(lessonsListPath, 'utf8'));

const newLessons = lessonsToGenerate.map(lessonId => ({
  id: `N5-${lessonId}`,
  title: `Bài ${lessonId.replace('B', '')}: ${vocabularyThemes[lessonId].theme}`,
  description: `Học từ vựng và ngữ pháp về ${vocabularyThemes[lessonId].theme}`,
  status: 'published',
  path: `/courses/japanese/n5/${lessonId}`,
  estimatedTime: 45,
  difficulty: 'Beginner'
}));

// Add new lessons to existing array
const updatedLessons = [...existingLessons, ...newLessons];

fs.writeFileSync(lessonsListPath, JSON.stringify(updatedLessons, null, 2));
console.log('✅ Updated lessons-n5.json');

console.log('\n🎉 Successfully generated N5 lessons B06-B10!');
console.log('📚 Total lessons available: B01-B10');
console.log('🎯 Ready for content integration!'); 