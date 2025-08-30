const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting JavaScript database seeding...')

  try {
    console.log('📊 Checking database connection...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connected successfully')

    // Create a simple user first
    console.log('👤 Creating user...')
    const user = await prisma.user.create({
      data: {
        name: 'Test User 15',
        email: 'test17@example.com',
        password: 'test123',
        role: 'student',
      }
    })
    console.log('✅ Created user:', user.name)

    // Create a simple course
    console.log('📚 Creating course...')
    const course = await prisma.course.create({
      data: {
        language: 'spanish',
        level: 'a1',
        title: 'Español - A1 Principiante',
        description: 'Khóa học tiếng Tây Ban Nha cơ bản A1 cho người mới bắt đầu',
        isPublished: true,
        order: 10,
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
        examples: '私は学生です, これは本です',
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
        isCompleted: true,
        score: 85,
        timeSpent: 1800,
        completedAt: new Date(),
      }
    })
    console.log('✅ Created user progress with score:', progress.score)

    // Create AI Insights
    console.log('🤖 Creating AI insights...')
    const aiInsight = await prisma.aIInsight.create({
      data: {
        userId: user.id,
        type: 'learning_pattern',
        title: 'Thời gian học tốt nhất',
        description: 'Bạn học hiệu quả nhất vào buổi sáng từ 8-10h',
        confidence: 0.85,
        impact: 'high',
        category: 'study_optimization',
        actionRequired: true,
        estimatedTime: 30,
        priority: 1
      }
    })
    console.log('✅ Created AI insight:', aiInsight.title)

    // Create Learning Patterns
    console.log('📈 Creating learning patterns...')
    const learningPattern = await prisma.learningPattern.create({
      data: {
        userId: user.id,
        name: 'Morning Learner Pattern',
        pattern: 'morning_learner',
        description: 'Học viên học tốt nhất vào buổi sáng',
        confidence: 0.9,
        strength: 0.85,
        weakness: 0.15,
        recommendation: 'Hãy học vào buổi sáng từ 8-10h để đạt hiệu quả cao nhất',
        estimatedImprovement: 0.25,
        isActive: true
      }
    })
    console.log('✅ Created learning pattern:', learningPattern.pattern)

    // Create AI Predictions
    console.log('🔮 Creating AI predictions...')
    const aiPrediction = await prisma.aIPrediction.create({
      data: {
        userId: user.id,
        type: 'completion_time',
        title: 'Dự đoán thời gian hoàn thành khóa học',
        description: 'Bạn sẽ hoàn thành khóa học trong 3 tuần',
        confidence: 0.78,
        isAchieved: false,
        targetDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000) // 21 days from now
      }
    })
    console.log('✅ Created AI prediction:', aiPrediction.title)

    // Create Achievements
    console.log('🏆 Creating achievements...')
    const achievement = await prisma.achievement.create({
      data: {
        userId: user.id,
        title: 'Người mới bắt đầu',
        description: 'Hoàn thành bài học đầu tiên',
        icon: '🎯',
        points: 100,
        unlockedAt: new Date()
      }
    })
    console.log('✅ Created achievement:', achievement.title)

    // Create Study Sessions
    console.log('⏰ Creating study sessions...')
    const studySession = await prisma.studySession.create({
      data: {
        userId: user.id,
        lessonId: lesson.id,
        startTime: new Date(Date.now() - 3600000), // 1 hour ago
        endTime: new Date(),
        duration: 3600,
        focusScore: 85
      }
    })
    console.log('✅ Created study session with duration:', studySession.duration)

    // Create Weekly Goals
    console.log('🎯 Creating weekly goals...')
    const weeklyGoal = await prisma.weeklyGoal.create({
      data: {
        userId: user.id,
        title: 'Học 5 từ vựng mới',
        description: 'Mục tiêu tuần này: học 5 từ vựng mới',
        targetValue: 5,
        currentValue: 2,
        unit: 'words',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        isCompleted: false
      }
    })
    console.log('✅ Created weekly goal:', weeklyGoal.title)

    // Create User Stats
    console.log('📊 Creating user stats...')
    const userStats = await prisma.userStats.create({
      data: {
        userId: user.id,
        totalLessonsCompleted: 1,
        totalTimeSpent: 1800,
        averageScore: 85,
        streakDays: 3,
        totalPoints: 300,
        lastActive: new Date()
      }
    })
    console.log('✅ Created user stats with points:', userStats.totalPoints)

    // Create Leaderboard Entry
    console.log('🏅 Creating leaderboard entry...')
    const leaderboardEntry = await prisma.leaderboardEntry.create({
      data: {
        userId: user.id,
        score: 300,
        rank: 1,
        period: 'weekly',
        createdAt: new Date()
      }
    })
    console.log('✅ Created leaderboard entry with rank:', leaderboardEntry.rank)

    console.log('🎉 JavaScript seeding completed successfully!')
    console.log(`📊 Summary:`)
    console.log(`   - User: ${user.name}`)
    console.log(`   - Course: ${course.title}`)
    console.log(`   - Lesson: ${lesson.title}`)
    console.log(`   - Vocabulary: ${vocab.word}`)
    console.log(`   - Grammar: ${grammar.pattern}`)
    console.log(`   - Progress: ${progress.score}%`)
    console.log(`   - AI Insight: ${aiInsight.title}`)
    console.log(`   - Learning Pattern: ${learningPattern.pattern}`)
    console.log(`   - AI Prediction: ${aiPrediction.title}`)
    console.log(`   - Achievement: ${achievement.title}`)
    console.log(`   - Study Session: ${studySession.duration}s`)
    console.log(`   - Weekly Goal: ${weeklyGoal.title}`)
    console.log(`   - User Stats: ${userStats.totalPoints} points`)
    console.log(`   - Leaderboard: Rank ${leaderboardEntry.rank}`)
    
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
