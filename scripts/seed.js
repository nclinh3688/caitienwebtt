const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Read courses data
const coursesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/courses.json'), 'utf8')
);

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.userProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();

  // Create courses and lessons
  for (const language of coursesData) {
    console.log(`📚 Creating courses for ${language.name}...`);
    
    for (const level of language.levels) {
      const course = await prisma.course.create({
        data: {
          language: language.id,
          level: level.id,
          title: `${language.name} - ${level.name}`,
          description: level.description || `Khóa học ${language.name} cấp độ ${level.name}`,
        },
      });

      console.log(`✅ Created course: ${course.title}`);

      // Create sample lessons for each course
      const lessonCount = getOptimalLessonCount(level.id);
      const lessons = generateLessonsForLevel(language.id, level.id, lessonCount);

      for (let i = 0; i < lessons.length; i++) {
        await prisma.lesson.create({
          data: {
            courseId: course.id,
            title: lessons[i].title,
            description: lessons[i].description,
            content: lessons[i].content,
            order: i + 1,
          },
        });
      }

      console.log(`📖 Created ${lessons.length} lessons for ${course.title}`);
    }
  }

  console.log('🎉 Database seeding completed successfully!');
}

function getOptimalLessonCount(levelId) {
  // Return appropriate lesson count based on level complexity
  const lessonCounts = {
    // Japanese
    'n5': 15, 'n4': 18, 'n3': 20, 'n2': 22, 'n1': 25,
    // English  
    'a1': 12, 'a2': 15, 'b1': 18, 'b2': 20, 'c1': 22, 'c2': 25,
    // Chinese
    'hsk1': 10, 'hsk2': 12, 'hsk3': 15, 'hsk4': 18, 'hsk5': 20, 'hsk6': 22,
    // Korean
    'level1': 12, 'level2': 15, 'level3': 18, 'level4': 20, 'level5': 22, 'level6': 25,
  };
  return lessonCounts[levelId] || 15;
}

function generateLessonsForLevel(languageId, levelId, count) {
  const lessons = [];
  
  switch (languageId) {
    case 'japanese':
      lessons.push(...generateJapaneseLessons(levelId, count));
      break;
    case 'english':
      lessons.push(...generateEnglishLessons(levelId, count));
      break;
    case 'chinese':
      lessons.push(...generateChineseLessons(levelId, count));
      break;
    case 'korean':
      lessons.push(...generateKoreanLessons(levelId, count));
      break;
    case 'vietnamese':
      lessons.push(...generateVietnameseLessons(levelId, count));
      break;
    default:
      lessons.push(...generateGenericLessons(levelId, count));
  }
  
  return lessons;
}

function generateJapaneseLessons(levelId, count) {
  const lessonTemplates = {
    'n5': [
      { title: 'Hiragana cơ bản (あ-お)', description: 'Học 5 ký tự hiragana đầu tiên', content: 'Hiragana là bảng chữ cái cơ bản nhất trong tiếng Nhật...' },
      { title: 'Hiragana (か-こ)', description: 'Học nhóm ký tự ka-ko', content: 'Tiếp tục với nhóm ký tự か き く け こ...' },
      { title: 'Chào hỏi cơ bản', description: 'はじめまして、よろしくお願いします', content: 'Các cách chào hỏi trong tiếng Nhật...' },
      { title: 'Số đếm 1-10', description: 'いち、に、さん...', content: 'Học cách đếm số từ 1 đến 10...' },
      { title: 'Giới thiệu bản thân', description: 'わたしは...です', content: 'Cách giới thiệu tên và quốc tịch...' },
    ],
    'n4': [
      { title: 'Thì quá khứ', description: 'ました形、でした', content: 'Cách chia động từ thì quá khứ...' },
      { title: 'Tính từ i và na', description: 'Phân biệt và sử dụng tính từ', content: 'Hai loại tính từ trong tiếng Nhật...' },
      { title: 'Gia đình và người thân', description: 'かぞく、りょうしん', content: 'Từ vựng về gia đình...' },
    ],
    'n3': [
      { title: 'Thể khả năng', description: 'できる、られる', content: 'Cách diễn đạt khả năng làm gì đó...' },
      { title: 'Thể bị động', description: 'られる、される', content: 'Cấu trúc câu bị động...' },
      { title: 'Keigo cơ bản', description: 'Tôn kính ngữ căn bản', content: 'Cách nói lịch sự trong công việc...' },
    ]
  };
  
  const templates = lessonTemplates[levelId] || lessonTemplates['n5'];
  const lessons = [];
  
  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    lessons.push({
      title: `Bài ${i + 1}: ${template.title}`,
      description: template.description,
      content: template.content
    });
  }
  
  return lessons;
}

function generateEnglishLessons(levelId, count) {
  const lessonTemplates = {
    'a1': [
      { title: 'Basic Greetings', description: 'Hello, Hi, Goodbye', content: 'Learn essential greetings...' },
      { title: 'Introducing Yourself', description: 'My name is... I am from...', content: 'How to introduce yourself...' },
      { title: 'Numbers 1-20', description: 'Counting and basic numbers', content: 'Learn to count from 1 to 20...' },
      { title: 'Family Members', description: 'Mother, father, sister, brother', content: 'Vocabulary about family...' },
    ],
    'b1': [
      { title: 'Past Simple Tense', description: 'Regular and irregular verbs', content: 'How to talk about past events...' },
      { title: 'Making Comparisons', description: 'Comparative and superlative', content: 'Comparing things and people...' },
    ],
    'c1': [
      { title: 'Advanced Grammar Structures', description: 'Complex sentence patterns', content: 'Sophisticated language use...' },
      { title: 'Academic Writing', description: 'Essay structure and style', content: 'Formal writing techniques...' },
    ]
  };
  
  const templates = lessonTemplates[levelId] || lessonTemplates['a1'];
  const lessons = [];
  
  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    lessons.push({
      title: `Lesson ${i + 1}: ${template.title}`,
      description: template.description,
      content: template.content
    });
  }
  
  return lessons;
}

function generateChineseLessons(levelId, count) {
  const lessonTemplates = {
    'hsk1': [
      { title: 'Pinyin cơ bản', description: 'Học phiên âm tiếng Trung', content: 'Hệ thống phiên âm pinyin...' },
      { title: '你好 - Xin chào', description: 'Lời chào cơ bản', content: 'Cách chào hỏi trong tiếng Trung...' },
      { title: 'Số đếm 1-10', description: '一二三四五...', content: 'Học đếm số bằng tiếng Trung...' },
    ],
    'hsk3': [
      { title: 'Cấu trúc câu phức', description: 'Câu có nhiều mệnh đề', content: 'Cách tạo câu phức tạp...' },
      { title: 'Từ vựng kinh doanh', description: 'Thuật ngữ trong công việc', content: 'Từ vựng cho môi trường làm việc...' },
    ]
  };
  
  const templates = lessonTemplates[levelId] || lessonTemplates['hsk1'];
  const lessons = [];
  
  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    lessons.push({
      title: `课程 ${i + 1}: ${template.title}`,
      description: template.description,
      content: template.content
    });
  }
  
  return lessons;
}

function generateKoreanLessons(levelId, count) {
  const lessonTemplates = {
    'level1': [
      { title: 'Hangul cơ bản', description: 'Bảng chữ cái Hàn Quốc', content: 'Học viết và đọc Hangul...' },
      { title: '안녕하세요 - Xin chào', description: 'Lời chào lịch sự', content: 'Cách chào hỏi trong tiếng Hàn...' },
      { title: 'Giới thiệu bản thân', description: '저는... 입니다', content: 'Cách nói về bản thân...' },
    ],
    'level3': [
      { title: 'Thể tôn kính', description: '존댓말 사용법', content: 'Cách sử dụng ngôn ngữ tôn kính...' },
      { title: 'Văn hóa Hàn Quốc', description: 'Hiểu về văn hóa và xã hội', content: 'Tìm hiểu văn hóa Hàn Quốc...' },
    ]
  };
  
  const templates = lessonTemplates[levelId] || lessonTemplates['level1'];
  const lessons = [];
  
  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    lessons.push({
      title: `수업 ${i + 1}: ${template.title}`,
      description: template.description,
      content: template.content
    });
  }
  
  return lessons;
}

function generateVietnameseLessons(levelId, count) {
  const lessonTemplates = {
    'a1': [
      { title: 'Vietnamese Pronunciation', description: 'Tones and sounds', content: 'Learn Vietnamese pronunciation...' },
      { title: 'Basic Greetings', description: 'Xin chào, Tạm biệt', content: 'Common Vietnamese greetings...' },
      { title: 'Numbers and Counting', description: 'một, hai, ba...', content: 'Learn to count in Vietnamese...' },
    ],
    'b1': [
      { title: 'Vietnamese Grammar', description: 'Sentence structure', content: 'Understanding Vietnamese grammar...' },
      { title: 'Cultural Context', description: 'Vietnamese customs', content: 'Learn about Vietnamese culture...' },
    ]
  };
  
  const templates = lessonTemplates[levelId] || lessonTemplates['a1'];
  const lessons = [];
  
  for (let i = 0; i < count; i++) {
    const template = templates[i % templates.length];
    lessons.push({
      title: `Bài học ${i + 1}: ${template.title}`,
      description: template.description,
      content: template.content
    });
  }
  
  return lessons;
}

function generateGenericLessons(levelId, count) {
  const lessons = [];
  for (let i = 0; i < count; i++) {
    lessons.push({
      title: `Bài học ${i + 1}`,
      description: `Mô tả bài học ${i + 1} cho cấp độ ${levelId}`,
      content: `Nội dung chi tiết cho bài học ${i + 1}...`
    });
  }
  return lessons;
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });