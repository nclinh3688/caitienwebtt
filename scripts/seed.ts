import getPrismaClient from '@/lib/prisma';
import path from 'path';
import fs from 'fs/promises';

async function main() {
  console.log('Starting database seeding...');

  try {
    const prisma = getPrismaClient();
    // Clear existing data (optional, for development)
    await prisma.lesson.deleteMany({});
    await prisma.course.deleteMany({});
    console.log('Cleared existing Course and Lesson data.');

    // Read courses.json
    const coursesFilePath = path.join(process.cwd(), 'src', 'data', 'courses.json');
    const coursesJson = JSON.parse(await fs.readFile(coursesFilePath, 'utf8'));

    for (const langCourse of coursesJson) {
      for (const levelData of langCourse.levels) {
        const courseTitle = `${langCourse.name} ${levelData.name}`;
        const courseDescription = `Learn ${langCourse.name} at ${levelData.name} level.`;

        const createdCourse = await prisma.course.create({
          data: {
            language: langCourse.id, // e.g., 'japanese'
            level: levelData.id,    // e.g., 'n5'
            title: courseTitle,
            description: courseDescription,
          },
        });
        console.log(`Created course: ${createdCourse.title} (ID: ${createdCourse.id})`);

        // Read lessons for this specific course (e.g., lessons-n5.json)
        const lessonsFilePath = path.join(process.cwd(), 'src', 'data', `jlpt-${levelData.id}`, `lessons-${levelData.id}.json`);
        let lessonsData = [];
        try {
          const lessonsFile = await fs.readFile(lessonsFilePath, 'utf8');
          lessonsData = JSON.parse(lessonsFile);
        } catch (lessonsError: any) {
          console.warn(`Could not read lessons file for ${langCourse.id}-${levelData.id}: ${(lessonsError as Error).message}`);
          continue; // Skip to next level if lessons file is not found
        }

        for (const lesson of lessonsData) {
          // Read detailed lesson content (e.g., lesson-1.json)
          const lessonContentFilePath = path.join(process.cwd(), 'src', 'data', `jlpt-${levelData.id}`, `${lesson.id}.json`);
          let lessonContent = '';
          try {
            const contentFile = await fs.readFile(lessonContentFilePath, 'utf8');
            const parsedContent = JSON.parse(contentFile);
            lessonContent = parsedContent.content || '';
          } catch (contentError: any) {
            console.warn(`Could not read content for lesson ${lesson.id} (${langCourse.id}-${levelData.id}): ${(contentError as Error).message}`);
          }

          await prisma.lesson.create({
            data: {
              id: lesson.id,
              courseId: createdCourse.id,
              title: lesson.title,
              description: lesson.description || null,
              content: lessonContent,
              order: lesson.order || 0,
            },
          });
          console.log(`  Created lesson: ${lesson.title} (ID: ${lesson.id})`);
        }
      }
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    const prisma = getPrismaClient();
    await prisma.$disconnect();
  }
}

main();
