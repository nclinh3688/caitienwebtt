const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function clearDatabase() {
  console.log('🧹 Starting database cleanup...')

  try {
    console.log('📊 Checking database connection...')
    await prisma.$connect()
    console.log('✅ Database connected successfully')

    // Clear data in correct order (child tables first)
    console.log('🗑️ Clearing quiz results...')
    await prisma.quizResult.deleteMany()
    
    console.log('🗑️ Clearing quiz questions...')
    await prisma.quizQuestion.deleteMany()
    
    console.log('🗑️ Clearing quizzes...')
    await prisma.quiz.deleteMany()
    
    console.log('🗑️ Clearing audio progress...')
    await prisma.audioProgress.deleteMany()
    
    console.log('🗑️ Clearing grammar progress...')
    await prisma.grammarProgress.deleteMany()
    
    console.log('🗑️ Clearing vocabulary progress...')
    await prisma.vocabularyProgress.deleteMany()
    
    console.log('🗑️ Clearing user progress...')
    await prisma.userProgress.deleteMany()
    
    console.log('🗑️ Clearing leaderboard entries...')
    await prisma.leaderboardEntry.deleteMany()
    
    console.log('🗑️ Clearing user stats...')
    await prisma.userStats.deleteMany()
    
    console.log('🗑️ Clearing achievements...')
    await prisma.achievement.deleteMany()
    
    console.log('🗑️ Clearing weekly goals...')
    await prisma.weeklyGoal.deleteMany()
    
    console.log('🗑️ Clearing study sessions...')
    await prisma.studySession.deleteMany()
    
    console.log('🗑️ Clearing AI predictions...')
    await prisma.aIPrediction.deleteMany()
    
    console.log('🗑️ Clearing learning patterns...')
    await prisma.learningPattern.deleteMany()
    
    console.log('🗑️ Clearing AI insights...')
    await prisma.aIInsight.deleteMany()
    
    console.log('🗑️ Clearing audio...')
    await prisma.audio.deleteMany()
    
    console.log('🗑️ Clearing grammar...')
    await prisma.grammar.deleteMany()
    
    console.log('🗑️ Clearing vocabulary...')
    await prisma.vocabulary.deleteMany()
    
    console.log('🗑️ Clearing lessons...')
    await prisma.lesson.deleteMany()
    
    console.log('🗑️ Clearing course categories...')
    await prisma.courseCategory.deleteMany()
    
    console.log('🗑️ Clearing courses...')
    await prisma.course.deleteMany()
    
    console.log('🗑️ Clearing sessions...')
    await prisma.session.deleteMany()
    
    console.log('🗑️ Clearing accounts...')
    await prisma.account.deleteMany()
    
    console.log('🗑️ Clearing users...')
    await prisma.user.deleteMany()

    console.log('✅ Database cleanup completed successfully!')
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error)
    throw error
  }
}

clearDatabase()
  .catch((e) => {
    console.error('❌ Fatal error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('🔌 Database connection closed')
  })
