const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting clean database seeding...')

  try {
    console.log('📊 Checking database connection...')
    await prisma.$connect()
    console.log('✅ Database connected successfully')

    // Create a user
    console.log('👤 Creating user...')
    const user = await prisma.user.create({
      data: {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        password: 'test123',
        role: 'student',
      }
    })
    console.log('✅ Created user:', user.name)

    // Create a Japanese course
    console.log('📚 Creating Japanese course...')
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

    // Create a lesson
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

    // Create vocabulary (Japanese)
    console.log('📝 Creating vocabulary...')
    const vocab1 = await prisma.vocabulary.create({
      data: {
        word: 'こんにちは',
        meaning: 'Xin chào',
        reading: 'konnichiwa',
        example: 'こんにちは、お元気ですか？',
        lessonId: lesson.id,
      }
    })
    
    const vocab2 = await prisma.vocabulary.create({
      data: {
        word: 'ありがとう',
        meaning: 'Cảm ơn',
        reading: 'arigatou',
        example: 'ありがとうございます',
        lessonId: lesson.id,
      }
    })
    
    const vocab3 = await prisma.vocabulary.create({
      data: {
        word: 'さようなら',
        meaning: 'Tạm biệt',
        reading: 'sayounara',
        example: 'さようなら、また明日',
        lessonId: lesson.id,
      }
    })
    console.log('✅ Created vocabulary:', vocab1.word, vocab2.word, vocab3.word)

    // Create grammar (Japanese)
    console.log('📚 Creating grammar...')
    const grammar = await prisma.grammar.create({
      data: {
        pattern: 'AはBです',
        explanation: 'Cấu trúc cơ bản để giới thiệu: A là B',
        examples: '私は学生です、これは本です',
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
        description: 'Học viên học tốt nhất vào buổi sáng',
        strength: 0.85,
        weakness: 0.15,
        recommendation: 'Hãy học vào buổi sáng từ 8-10h để đạt hiệu quả cao nhất',
        estimatedImprovement: 0.25,
        isActive: true
      }
    })
    console.log('✅ Created learning pattern:', learningPattern.name)

    // Create AI Predictions
    console.log('🔮 Creating AI predictions...')
    const aiPrediction = await prisma.aIPrediction.create({
      data: {
        userId: user.id,
        metric: 'vocabulary_mastery',
        currentValue: 0.3,
        predictedValue: 0.8,
        timeframe: '3 weeks',
        confidence: 0.78,
        factors: 'Học đều đặn, làm bài tập đầy đủ',
        isAchieved: false
      }
    })
    console.log('✅ Created AI prediction for metric:', aiPrediction.metric)

    // Create Achievements
    console.log('🏆 Creating achievements...')
    const achievement = await prisma.achievement.create({
      data: {
        userId: user.id,
        title: 'Người mới bắt đầu',
        description: 'Hoàn thành bài học đầu tiên',
        category: 'learning',
        rarity: 'common',
        icon: '🎯',
        unlocked: true,
        progress: 1.0,
        maxProgress: 1.0,
        rewardType: 'xp',
        rewardValue: '100',
        unlockedAt: new Date(),
        requirements: '{"lessons_completed": 1}'
      }
    })
    console.log('✅ Created achievement:', achievement.title)

    // Create Study Sessions
    console.log('⏰ Creating study sessions...')
    const studySession = await prisma.studySession.create({
      data: {
        userId: user.id,
        title: 'Học bài 1: Chào hỏi cơ bản',
        type: 'lesson',
        duration: 60,
        startTime: '08:00',
        endTime: '09:00',
        status: 'completed',
        priority: 'high',
        difficulty: 'easy',
        subject: 'Japanese',
        description: 'Học từ vựng và ngữ pháp cơ bản',
        aiRecommendation: 'Hãy tập trung vào cách phát âm',
        scheduledDate: new Date(),
        completedAt: new Date()
      }
    })
    console.log('✅ Created study session with duration:', studySession.duration)

    // Create Weekly Goals
    console.log('🎯 Creating weekly goals...')
    const weeklyGoal = await prisma.weeklyGoal.create({
      data: {
        userId: user.id,
        title: 'Học 5 từ vựng mới',
        target: 5,
        current: 3,
        unit: 'words',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        progress: 0.6,
        status: 'on_track',
        isCompleted: false
      }
    })
    console.log('✅ Created weekly goal:', weeklyGoal.title)

    // Create User Stats
    console.log('📊 Creating user stats...')
    const userStats = await prisma.userStats.create({
      data: {
        userId: user.id,
        totalXP: 300,
        currentLevel: 1,
        currentStreak: 3,
        longestStreak: 3,
        totalCoins: 50,
        rank: 'Beginner',
        nextLevelXP: 500,
        totalStudyTime: 1800,
        totalAchievements: 1,
        unlockedAchievements: 1,
        lastStudyDate: new Date()
      }
    })
    console.log('✅ Created user stats with XP:', userStats.totalXP)

    // Create Leaderboard Entry
    console.log('🏅 Creating leaderboard entry...')
    const leaderboardEntry = await prisma.leaderboardEntry.create({
      data: {
        userId: user.id,
        username: user.name,
        level: 2,
        xp: 300,
        achievements: 1,
        rank: 1,
        streak: 3,
        week: 1,
        year: 2025
      }
    })
    console.log('✅ Created leaderboard entry with rank:', leaderboardEntry.rank)

    console.log('🎉 Clean seeding completed successfully!')
    console.log(`📊 Summary:`)
    console.log(`   - User: ${user.name}`)
    console.log(`   - Course: ${course.title} (${course.language.toUpperCase()})`)
    console.log(`   - Lesson: ${lesson.title}`)
    console.log(`   - Vocabulary: ${vocab1.word}, ${vocab2.word}, ${vocab3.word}`)
    console.log(`   - Grammar: ${grammar.pattern}`)
    console.log(`   - Progress: ${progress.score}%`)
    console.log(`   - AI Insight: ${aiInsight.title}`)
    console.log(`   - Learning Pattern: ${learningPattern.name}`)
    console.log(`   - AI Prediction: ${aiPrediction.metric}`)
    console.log(`   - Achievement: ${achievement.title}`)
    console.log(`   - Study Session: ${studySession.duration}s`)
    console.log(`   - Weekly Goal: ${weeklyGoal.title}`)
    console.log(`   - User Stats: ${userStats.totalXP} XP`)
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
