import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/seed - Seed database with sample data
export async function POST(request: NextRequest) {
  try {
    // Clear existing data
    await prisma.quizResult.deleteMany();
    await prisma.quizQuestion.deleteMany();
    await prisma.quiz.deleteMany();
    await prisma.audioProgress.deleteMany();
    await prisma.audio.deleteMany();
    await prisma.grammarProgress.deleteMany();
    await prisma.grammar.deleteMany();
    await prisma.vocabularyProgress.deleteMany();
    await prisma.vocabulary.deleteMany();
    await prisma.userProgress.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.courseCategory.deleteMany();
    await prisma.course.deleteMany();

    // Create sample courses
    const courses = [
      {
        language: 'japanese',
        level: 'n5',
        title: 'JLPT N5 - Cơ Bản',
        description: 'Khóa học tiếng Nhật cơ bản cho người mới bắt đầu, chuẩn bị cho kỳ thi JLPT N5',
        thumbnail: '/images/courses/japanese-n5.jpg',
        duration: 1200, // 20 hours
        lessonCount: 0,
        isPublished: true,
        order: 1,
      },
      {
        language: 'japanese',
        level: 'n4',
        title: 'JLPT N4 - Sơ Trung Cấp',
        description: 'Khóa học tiếng Nhật sơ trung cấp, nâng cao từ N5 lên N4',
        thumbnail: '/images/courses/japanese-n4.jpg',
        duration: 1500, // 25 hours
        lessonCount: 0,
        isPublished: true,
        order: 2,
      },
      {
        language: 'chinese',
        level: 'hsk1',
        title: 'HSK 1 - Tiếng Trung Cơ Bản',
        description: 'Khóa học tiếng Trung cơ bản, chuẩn bị cho kỳ thi HSK 1',
        thumbnail: '/images/courses/chinese-hsk1.jpg',
        duration: 1000, // 16.7 hours
        lessonCount: 0,
        isPublished: true,
        order: 3,
      },
      {
        language: 'english',
        level: 'beginner',
        title: 'Tiếng Anh Cơ Bản',
        description: 'Khóa học tiếng Anh cơ bản cho người mới bắt đầu',
        thumbnail: '/images/courses/english-beginner.jpg',
        duration: 900, // 15 hours
        lessonCount: 0,
        isPublished: true,
        order: 4,
      },
      {
        language: 'korean',
        level: 'beginner',
        title: 'Tiếng Hàn Cơ Bản',
        description: 'Khóa học tiếng Hàn cơ bản cho người mới bắt đầu',
        thumbnail: '/images/courses/korean-beginner.jpg',
        duration: 800, // 13.3 hours
        lessonCount: 0,
        isPublished: true,
        order: 5,
      },
    ];

    const createdCourses = [];
    for (const courseData of courses) {
      const course = await prisma.course.create({
        data: courseData,
      });
      createdCourses.push(course);
    }

    // Create sample categories for Japanese N5 course
    const japaneseN5Course = createdCourses[0];
    const categories = [
      {
        courseId: japaneseN5Course.id,
        name: 'Từ Vựng',
        description: 'Học từ vựng cơ bản tiếng Nhật',
        order: 1,
      },
      {
        courseId: japaneseN5Course.id,
        name: 'Ngữ Pháp',
        description: 'Học ngữ pháp cơ bản tiếng Nhật',
        order: 2,
      },
      {
        courseId: japaneseN5Course.id,
        name: 'Luyện Nghe',
        description: 'Luyện kỹ năng nghe hiểu',
        order: 3,
      },
      {
        courseId: japaneseN5Course.id,
        name: 'Luyện Đọc',
        description: 'Luyện kỹ năng đọc hiểu',
        order: 4,
      },
    ];

    const createdCategories = [];
    for (const categoryData of categories) {
      const category = await prisma.courseCategory.create({
        data: categoryData,
      });
      createdCategories.push(category);
    }

    // Create sample lessons for Japanese N5 course
    const lessons = [
      {
        courseId: japaneseN5Course.id,
        categoryId: createdCategories[0].id, // Từ Vựng
        title: 'Bài 1: Chào hỏi cơ bản',
        description: 'Học các cách chào hỏi cơ bản trong tiếng Nhật',
        content: `
          <h2>Chào hỏi cơ bản</h2>
          <p>Trong bài học này, bạn sẽ học các cách chào hỏi cơ bản trong tiếng Nhật:</p>
          <ul>
            <li>おはようございます (Ohayou gozaimasu) - Chào buổi sáng</li>
            <li>こんにちは (Konnichiwa) - Chào buổi trưa</li>
            <li>こんばんは (Konbanwa) - Chào buổi tối</li>
            <li>さようなら (Sayounara) - Tạm biệt</li>
          </ul>
        `,
        order: 1,
        duration: 30,
        difficulty: 'beginner',
        isPublished: true,
      },
      {
        courseId: japaneseN5Course.id,
        categoryId: createdCategories[1].id, // Ngữ Pháp
        title: 'Bài 2: Đại từ nhân xưng',
        description: 'Học các đại từ nhân xưng cơ bản trong tiếng Nhật',
        content: `
          <h2>Đại từ nhân xưng</h2>
          <p>Trong bài học này, bạn sẽ học các đại từ nhân xưng cơ bản:</p>
          <ul>
            <li>私 (Watashi) - Tôi</li>
            <li>あなた (Anata) - Bạn</li>
            <li>彼 (Kare) - Anh ấy</li>
            <li>彼女 (Kanojo) - Cô ấy</li>
          </ul>
        `,
        order: 2,
        duration: 25,
        difficulty: 'beginner',
        isPublished: true,
      },
    ];

    const createdLessons = [];
    for (const lessonData of lessons) {
      const lesson = await prisma.lesson.create({
        data: lessonData,
      });
      createdLessons.push(lesson);
    }

    // Create sample vocabulary for first lesson
    const vocabulary = [
      {
        lessonId: createdLessons[0].id,
        word: 'おはようございます',
        reading: 'Ohayou gozaimasu',
        meaning: 'Chào buổi sáng',
        example: 'おはようございます。お元気ですか？',
        difficulty: 'beginner',
        order: 1,
      },
      {
        lessonId: createdLessons[0].id,
        word: 'こんにちは',
        reading: 'Konnichiwa',
        meaning: 'Chào buổi trưa',
        example: 'こんにちは。今日はいい天気ですね。',
        difficulty: 'beginner',
        order: 2,
      },
      {
        lessonId: createdLessons[0].id,
        word: 'こんばんは',
        reading: 'Konbanwa',
        meaning: 'Chào buổi tối',
        example: 'こんばんは。お疲れ様でした。',
        difficulty: 'beginner',
        order: 3,
      },
    ];

    for (const vocabData of vocabulary) {
      await prisma.vocabulary.create({
        data: vocabData,
      });
    }

    // Update course lesson count
    await prisma.course.update({
      where: { id: japaneseN5Course.id },
      data: { lessonCount: createdLessons.length },
    });

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        courses: createdCourses.length,
        categories: createdCategories.length,
        lessons: createdLessons.length,
        vocabulary: vocabulary.length,
      },
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
