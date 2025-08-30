import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting simple database seeding...')

  try {
    // Create a simple user
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123',
        role: 'student',
      }
    })
    console.log('✅ Created user:', user.name)

    // Create a simple course
    const course = await prisma.course.create({
      data: {
        language: 'japanese',
        level: 'n5',
        title: 'JLPT N5 - Cơ bản',
        description: 'Khóa học tiếng Nhật cơ bản',
        isPublished: true,
        order: 1,
      }
    })
    console.log('✅ Created course:', course.title)

    // Create a simple lesson
    const lesson = await prisma.lesson.create({
      data: {
        title: 'Bài 1: Chào hỏi',
        description: 'Học cách chào hỏi cơ bản',
        content: 'Nội dung bài học...',
        order: 1,
        duration: 30,
        courseId: course.id,
        isPublished: true,
      }
    })
    console.log('✅ Created lesson:', lesson.title)

    // Create vocabulary
    const vocab = await prisma.vocabulary.create({
      data: {
        word: 'こんにちは',
        meaning: 'Xin chào',
        reading: 'konnichiwa',
        example: 'こんにちは、お元気ですか？',
        lessonId: lesson.id,
      }
    })
    console.log('✅ Created vocabulary:', vocab.word)

    console.log('🎉 Simple seeding completed successfully!')
    
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
