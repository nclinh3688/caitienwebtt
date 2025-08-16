import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create or update user stats
    const userStats = await prisma.userStats.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        totalXP: 1250,
        currentLevel: 8,
        currentStreak: 5,
        longestStreak: 12,
        totalCoins: 250,
        rank: 'Bronze',
        nextLevelXP: 2000,
        totalStudyTime: 2700, // 45 hours
        totalLessonsCompleted: 24,
        totalAchievements: 5,
        unlockedAchievements: 1
      }
    });

    // Create sample AI insights
    const insights = await Promise.all([
      prisma.aIInsight.create({
        data: {
          userId: user.id,
          type: 'recommendation',
          title: 'Tăng cường luyện tập Kanji',
          description: 'Dựa trên phân tích, bạn cần tập trung vào việc học Kanji N5. Độ chính xác hiện tại chỉ đạt 65%, thấp hơn mức trung bình 15%.',
          confidence: 0.92,
          impact: 'high',
          category: 'Kanji Learning',
          actionRequired: true,
          estimatedTime: 30,
          priority: 1
        }
      }),
      prisma.aIInsight.create({
        data: {
          userId: user.id,
          type: 'warning',
          title: 'Giảm thời gian học liên tục',
          description: 'Thời gian học liên tục trung bình 2.5 giờ có thể gây mệt mỏi. Khuyến nghị chia nhỏ thành các phiên 45 phút với nghỉ ngơi 15 phút.',
          confidence: 0.87,
          impact: 'medium',
          category: 'Study Habits',
          actionRequired: true,
          estimatedTime: 15,
          priority: 2
        }
      }),
      prisma.aIInsight.create({
        data: {
          userId: user.id,
          type: 'achievement',
          title: 'Xuất sắc trong Listening!',
          description: 'Kỹ năng nghe của bạn đã cải thiện đáng kể! Độ chính xác tăng từ 72% lên 89% trong 2 tuần qua.',
          confidence: 0.95,
          impact: 'high',
          category: 'Listening Skills',
          actionRequired: false,
          priority: 3
        }
      })
    ]);

    // Create sample learning patterns
    const patterns = await Promise.all([
      prisma.learningPattern.create({
        data: {
          userId: user.id,
          name: 'Học buổi sáng hiệu quả hơn',
          description: 'Bạn học hiệu quả nhất vào buổi sáng (7-9h) với độ tập trung cao và khả năng ghi nhớ tốt.',
          strength: 0.85,
          weakness: 0.15,
          recommendation: 'Tập trung học các bài khó vào buổi sáng, ôn tập vào buổi tối.',
          estimatedImprovement: 0.25
        }
      }),
      prisma.learningPattern.create({
        data: {
          userId: user.id,
          name: 'Cần cải thiện Grammar',
          description: 'Ngữ pháp là điểm yếu nhất, đặc biệt là particles và verb conjugations.',
          strength: 0.35,
          weakness: 0.65,
          recommendation: 'Làm thêm bài tập ngữ pháp 20 phút/ngày, sử dụng flashcards.',
          estimatedImprovement: 0.40
        }
      })
    ]);

    // Create sample study sessions for the next 7 days
    const studySessions = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      studySessions.push(
        prisma.studySession.create({
          data: {
            userId: user.id,
            title: 'Bài học N5 - Grammar',
            type: 'lesson',
            duration: 45,
            startTime: '08:00',
            endTime: '08:45',
            status: 'scheduled',
            priority: 'high',
            difficulty: 'medium',
            subject: 'Grammar',
            description: 'Học về particles và verb conjugations',
            aiRecommendation: i === 0 ? 'Thời gian tốt nhất để học ngữ pháp' : null,
            scheduledDate: date
          }
        })
      );
      
      studySessions.push(
        prisma.studySession.create({
          data: {
            userId: user.id,
            title: 'Luyện tập Kanji',
            type: 'practice',
            duration: 30,
            startTime: '09:00',
            endTime: '09:30',
            status: 'scheduled',
            priority: 'medium',
            difficulty: 'hard',
            subject: 'Kanji',
            description: 'Ôn tập 20 kanji N5 cơ bản',
            scheduledDate: date
          }
        })
      );
    }

    const createdSessions = await Promise.all(studySessions);

    // Create sample weekly goals
    const goals = await Promise.all([
      prisma.weeklyGoal.create({
        data: {
          userId: user.id,
          title: 'Hoàn thành 5 bài học N5',
          target: 5,
          current: 3,
          unit: 'lessons',
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          progress: 0.6,
          status: 'on_track'
        }
      }),
      prisma.weeklyGoal.create({
        data: {
          userId: user.id,
          title: 'Luyện tập 200 từ vựng',
          target: 200,
          current: 150,
          unit: 'words',
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          progress: 0.75,
          status: 'ahead'
        }
      })
    ]);

    // Create sample achievements
    const achievements = await Promise.all([
      prisma.achievement.create({
        data: {
          userId: user.id,
          title: 'First Steps',
          description: 'Hoàn thành bài học đầu tiên',
          category: 'learning',
          rarity: 'common',
          icon: '🎯',
          unlocked: true,
          progress: 1,
          maxProgress: 1,
          rewardType: 'xp',
          rewardValue: '100',
          requirements: JSON.stringify(['Complete first lesson']),
          bonusDescription: '+10% XP bonus for 1 day',
          bonusValue: 0.1,
          unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }),
      prisma.achievement.create({
        data: {
          userId: user.id,
          title: 'Grammar Master',
          description: 'Hoàn thành 50 bài tập ngữ pháp',
          category: 'learning',
          rarity: 'rare',
          icon: '📚',
          unlocked: false,
          progress: 35,
          maxProgress: 50,
          rewardType: 'badge',
          rewardValue: 'Grammar Expert',
          requirements: JSON.stringify(['Complete 50 grammar exercises']),
          bonusDescription: '+15% accuracy in grammar tests',
          bonusValue: 0.15
        }
      }),
      prisma.achievement.create({
        data: {
          userId: user.id,
          title: 'Streak Master',
          description: 'Duy trì streak học tập 7 ngày liên tiếp',
          category: 'streak',
          rarity: 'epic',
          icon: '🔥',
          unlocked: false,
          progress: 5,
          maxProgress: 7,
          rewardType: 'coins',
          rewardValue: '500',
          requirements: JSON.stringify(['Maintain 7-day study streak']),
          bonusDescription: '+20% daily bonus for 1 week',
          bonusValue: 0.20
        }
      })
    ]);

    return NextResponse.json({
      message: 'Advanced Dashboard data seeded successfully',
      data: {
        userStats,
        insights: insights.length,
        patterns: patterns.length,
        studySessions: createdSessions.length,
        goals: goals.length,
        achievements: achievements.length
      }
    });

  } catch (error) {
    console.error('Error seeding advanced dashboard data:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
