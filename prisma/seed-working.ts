import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting working database seeding...')

  try {
    console.log('📊 Checking database connection...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')

    // Create a simple user first
    console.log('👤 Creating user...')
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
    console.log('📚 Creating course...')
    const course = await prisma.course.create({
      data: {
        language: 'japanese',
        level: 'n5',
        title: 'JLPT N5 - Cơ bản',
        description: 'Khóa học tiếng Nhật cơ bản cho người mới bắt đầu',
        isPublished: true,
        order: 1,
      }
    })
    console.log('✅ Created course:', course.title)

    // Create a simple lesson
    console.log('📖 Creating lesson...')
    const lesson = await prisma.lesson.create({
      data: {
        title: 'Bài 1: Chào hỏi cơ bản',
        description: 'Học cách chào hỏi cơ bản trong tiếng Nhật',
        content: 'Nội dung bài học về chào hỏi...',
        order: 1,
        duration: 30,
        courseId: course.id,
        isPublished: true,
      }
    })
    console.log('✅ Created lesson:', lesson.title)

    // Create vocabulary
    console.log('📝 Creating vocabulary...')
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

    // Create grammar
    console.log('📚 Creating grammar...')
    const grammar = await prisma.grammar.create({
      data: {
        pattern: 'AはBです',
        explanation: 'Cấu trúc cơ bản để giới thiệu: A là B',
        examples: '私は学生です。これは本です。',
        lessonId: lesson.id,
      }
    })
    console.log('✅ Created grammar pattern:', grammar.pattern)

    // Create user progress
    console.log('📊 Creating user progress...')
    const progress = await prisma.userProgress.create({
      data: {
        userId: user.id,
        lessonId: lesson.id,
        score: 85,
        timeSpent: 1800,
        completedAt: new Date(),
      }
    })
    console.log('✅ Created user progress with score:', progress.score)

    console.log('🎉 Working seeding completed successfully!')
    console.log(`📊 Summary:`)
    console.log(`   - User: ${user.name}`)
    console.log(`   - Course: ${course.title}`)
    console.log(`   - Lesson: ${lesson.title}`)
    console.log(`   - Vocabulary: ${vocab.word}`)
    console.log(`   - Grammar: ${grammar.pattern}`)
    console.log(`   - Progress: ${progress.score}%`)
    
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
    console.log('🔌 Database connection closed')
  })
