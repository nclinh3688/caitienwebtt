import { PrismaClient, Course } from '@prisma/client';
import * as path from 'path';

const prisma = new PrismaClient();

// Interface to match the structure of your vocabulary files
interface VocabularyWord {
  hiragana: string;
  kanji: string;
  meaning: string;
  example?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  section?: 'main' | 'conversation' | 'reading';
}

async function main() {
  console.log(`🌱 Starting database seeding...`);

  // 1. Create or find the N5 and N4 courses
  console.log('📚 Ensuring N5 and N4 courses exist...');
  const n5Course = await prisma.course.upsert({
    where: { language_level: { language: 'japanese', level: 'n5' } },
    update: {},
    create: {
      language: 'japanese',
      level: 'n5',
      title: 'JLPT N5',
      description: 'Toàn bộ 25 bài học từ vựng cho trình độ N5.',
      isPublished: true,
      order: 1,
    },
  });

  const n4Course = await prisma.course.upsert({
    where: { language_level: { language: 'japanese', level: 'n4' } },
    update: {},
    create: {
      language: 'japanese',
      level: 'n4',
      title: 'JLPT N4',
      description: 'Toàn bộ 25 bài học từ vựng cho trình độ N4.',
      isPublished: true,
      order: 2,
    },
  });
  console.log('✅ Courses are ready.');

  // 2. Loop through all 50 lesson files
  for (let i = 1; i <= 50; i++) {
    const lessonNumber = i;
    const course: Course = lessonNumber <= 25 ? n5Course : n4Course;
    const lessonTitle = `Bài ${lessonNumber}`;
    console.log(`
Processing: ${course.title} - ${lessonTitle}`);

    // 3. Create or find the lesson
    const lesson = await prisma.lesson.upsert({
      where: { courseId_order: { courseId: course.id, order: lessonNumber } },
      update: {},
      create: {
        courseId: course.id,
        title: lessonTitle,
        description: `Từ vựng cho ${lessonTitle} trình độ ${course.level.toUpperCase()}`,
        order: lessonNumber,
        isPublished: true,
        difficulty: lessonNumber <= 25 ? 'Beginner' : 'Intermediate',
        duration: 20, // a default value
      },
    });

    // 4. Import vocabulary for the lesson
    try {
            const filePath = path.resolve(__dirname, `../src/data/lesson${i}-vocabulary.ts`);
      const module = await import(filePath);
      const vocabularyList: VocabularyWord[] = module[`lesson${i}Vocabulary`];

      if (!vocabularyList) {
        console.log(`⚠️ No vocabulary data found in lesson${i}-vocabulary.ts. Skipping.`);
        continue;
      }

      let newWordsCount = 0;
      for (const word of vocabularyList) {
        // Use upsert to avoid creating duplicate vocabulary words for the same lesson
        await prisma.vocabulary.upsert({
          where: {
            lessonId_word: {
              lessonId: lesson.id,
              word: word.kanji || word.hiragana,
            }
          },
          update: {
            reading: word.hiragana,
            meaning: word.meaning,
            example: word.example,
            difficulty: word.difficulty,
            section: word.section,
          },
          create: {
            lessonId: lesson.id,
            word: word.kanji || word.hiragana,
            reading: word.hiragana,
            meaning: word.meaning,
            example: word.example,
            difficulty: word.difficulty,
            section: word.section,
            order: newWordsCount, // Simple ordering
          },
        });
        newWordsCount++;
      }
      if (newWordsCount > 0) {
        console.log(`  ✅ Imported ${newWordsCount} vocabulary words for ${lessonTitle}.`);
      }

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`  ❌ Error processing lesson ${i}:`, error.message);
        if ('code' in error && error.code === 'MODULE_NOT_FOUND') {
            console.log(`  Could not find file: lesson${i}-vocabulary.ts`);
        }
      } else {
        console.log(`  ❌ An unknown error occurred processing lesson ${i}:`, error);
      }
    }
  }
  
  // 5. Update lesson counts on courses
  const n5LessonCount = await prisma.lesson.count({ where: { courseId: n5Course.id } });
  await prisma.course.update({ where: { id: n5Course.id }, data: { lessonCount: n5LessonCount } });
  console.log(`
📊 Updated N5 course with ${n5LessonCount} lessons.`);

  const n4LessonCount = await prisma.lesson.count({ where: { courseId: n4Course.id } });
  await prisma.course.update({ where: { id: n4Course.id }, data: { lessonCount: n4LessonCount } });
  console.log(`📊 Updated N4 course with ${n4LessonCount} lessons.`);

  console.log(`
🎉 Database seeding completed successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });