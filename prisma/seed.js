const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    console.log('📊 Checking database connection...');
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Seed courses
    const coursesToSeed = [
      {
        language: 'japanese',
        level: 'n5',
        title: 'JLPT N5 - Sơ cấp',
        description: 'Khóa học sơ cấp tiếng Nhật JLPT N5, bao gồm ngữ pháp, từ vựng và kaiwa cho người mới bắt đầu.',
        isPublished: true,
        order: 1,
        jsonPath: 'jlpt-n5/lessons-n5.json'
      },
      {
        language: 'japanese',
        level: 'n4',
        title: 'JLPT N4 - Sơ trung cấp',
        description: 'Khóa học tiếng Nhật JLPT N4, xây dựng nền tảng vững chắc cho giao tiếp và đọc hiểu.',
        isPublished: true,
        order: 2,
        jsonPath: 'jlpt-n4/lessons-n4.json'
      }
    ];

    for (const courseData of coursesToSeed) {
      console.log(`📚 Checking for course: ${courseData.title}`);
      let course = await prisma.course.findUnique({
        where: { language_level: { language: courseData.language, level: courseData.level } },
      });

      if (!course) {
        console.log(`➕ Creating course: ${courseData.title}`);
        course = await prisma.course.create({
          data: {
            language: courseData.language,
            level: courseData.level,
            title: courseData.title,
            description: courseData.description,
            isPublished: courseData.isPublished,
            order: courseData.order,
          },
        });
        console.log(`✅ Created course: ${course.title}`);
      } else {
        console.log(`🔄 Course ${courseData.title} already exists. Skipping creation.`);
      }

      // Seed lessons for the course
      const lessonsPath = path.join(__dirname, '..', 'src', 'data', courseData.jsonPath);
      if (fs.existsSync(lessonsPath)) {
        console.log(`📄 Found lessons file for ${courseData.title} at ${lessonsPath}`);
        const lessons = JSON.parse(fs.readFileSync(lessonsPath, 'utf-8'));
        let lessonCount = 0;

        for (const lessonData of lessons) {
          const lessonOrder = parseInt(lessonData.id.split('-B')[1]);
          console.log(`  - Checking for lesson: ${lessonData.title}`);
          const existingLesson = await prisma.lesson.findFirst({
            where: {
              courseId: course.id,
              title: lessonData.title,
            },
          });

          if (!existingLesson) {
            console.log(`    ➕ Creating lesson: ${lessonData.title}`);
            await prisma.lesson.create({
              data: {
                courseId: course.id,
                title: lessonData.title,
                description: lessonData.description,
                isPublished: lessonData.status === 'published',
                order: lessonOrder,
                duration: lessonData.estimatedTime || 30,
                difficulty: lessonData.difficulty || 'Beginner',
              },
            });
            lessonCount++;
          } else {
            console.log(`    🔄 Lesson "${lessonData.title}" already exists. Skipping.`);
          }
        }
        
        if (lessonCount > 0) {
            console.log(`✅ Added ${lessonCount} new lessons for ${course.title}.`);
            // Update lesson count on the course
            const totalLessons = await prisma.lesson.count({ where: { courseId: course.id } });
            await prisma.course.update({
                where: { id: course.id },
                data: { lessonCount: totalLessons }
            });
            console.log(`  - Updated lesson count for ${course.title} to ${totalLessons}.`);
        }

      } else {
        console.log(`⚠️ Could not find lessons file for ${courseData.title} at ${lessonsPath}`);
      }
    }

    console.log('🎉 Seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed');
  }
}

main().catch((e) => {
  console.error('❌ Fatal error:', e);
  process.exit(1);
});