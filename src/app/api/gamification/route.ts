import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock gamification data - in production, fetch from database
    const gamificationData = {
      level: 5,
      experience: 750,
      experienceToNext: 1000,
      totalPoints: 2840,
      streak: 7,
      achievements: [
        {
          id: '1',
          title: 'Người mới bắt đầu',
          description: 'Hoàn thành bài học đầu tiên',
          icon: 'book',
          category: 'learning',
          rarity: 'common',
          isUnlocked: true,
          progress: 1,
          maxProgress: 1,
          unlockedAt: new Date('2024-01-15'),
          points: 50
        },
        {
          id: '2',
          title: 'Chuỗi học tập',
          description: 'Học liên tiếp 7 ngày',
          icon: 'clock',
          category: 'streak',
          rarity: 'rare',
          isUnlocked: true,
          progress: 7,
          maxProgress: 7,
          unlockedAt: new Date('2024-01-20'),
          points: 100
        },
        {
          id: '3',
          title: 'Thành tích xuất sắc',
          description: 'Đạt điểm tối đa trong 10 bài kiểm tra',
          icon: 'trophy',
          category: 'milestone',
          rarity: 'epic',
          isUnlocked: false,
          progress: 7,
          maxProgress: 10,
          points: 200
        }
      ],
      recentActivity: [
        {
          id: '1',
          type: 'lesson_completed',
          title: 'Hoàn thành bài học',
          description: 'Bài 15: Ngữ pháp N5',
          points: 25,
          timestamp: new Date(),
          icon: '📚'
        },
        {
          id: '2',
          type: 'achievement_unlocked',
          title: 'Mở khóa thành tích',
          description: 'Chuỗi học tập - 7 ngày',
          points: 100,
          timestamp: new Date(Date.now() - 86400000),
          icon: '🏆'
        }
      ],
      dailyGoals: [
        {
          id: '1',
          title: 'Hoàn thành 3 bài học',
          description: 'Học 3 bài học mới hôm nay',
          target: 3,
          current: 2,
          reward: 50,
          isCompleted: false,
          type: 'lessons'
        },
        {
          id: '2',
          title: 'Học 30 phút',
          description: 'Dành 30 phút học tập',
          target: 30,
          current: 25,
          reward: 30,
          isCompleted: false,
          type: 'minutes'
        }
      ]
    };

    return NextResponse.json(gamificationData);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error fetching gamification data:', error);
    return NextResponse.json({ error: 'Failed to fetch gamification data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, data } = await request.json();

    switch (action) {
      case 'complete_lesson':
        return handleLessonCompletion(session.user.email, data);
      
      case 'unlock_achievement':
        return handleAchievementUnlock(session.user.email, data);
      
      case 'update_streak':
        return handleStreakUpdate(session.user.email, data);
      
      case 'complete_goal':
        return handleGoalCompletion(session.user.email, data);
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error processing gamification action:', error);
    return NextResponse.json({ error: 'Failed to process action' }, { status: 500 });
  }
}

async function handleLessonCompletion(userEmail: string, data: any) {
  // Mock implementation - in production, update database
  const experienceGained = 25;
  const pointsGained = 25;
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📚 Lesson completed by ${userEmail}:`, {
      lessonId: data.lessonId,
      experienceGained,
      pointsGained
    });
  }

  return NextResponse.json({
    success: true,
    experienceGained,
    pointsGained,
    message: 'Bài học hoàn thành! +25 điểm kinh nghiệm'
  });
}

async function handleAchievementUnlock(userEmail: string, data: any) {
  // Mock implementation - in production, update database
  const pointsGained = data.points || 100;
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`🏆 Achievement unlocked by ${userEmail}:`, {
      achievementId: data.achievementId,
      pointsGained
    });
  }

  return NextResponse.json({
    success: true,
    pointsGained,
    message: `Thành tích mở khóa! +${pointsGained} điểm`
  });
}

async function handleStreakUpdate(userEmail: string, data: any) {
  // Mock implementation - in production, update database
  const newStreak = data.streak || 1;
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔥 Streak updated for ${userEmail}:`, {
      newStreak,
      previousStreak: data.previousStreak
    });
  }

  return NextResponse.json({
    success: true,
    streak: newStreak,
    message: `Chuỗi học tập: ${newStreak} ngày!`
  });
}

async function handleGoalCompletion(userEmail: string, data: any) {
  // Mock implementation - in production, update database
  const pointsGained = data.reward || 50;
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`🎯 Goal completed by ${userEmail}:`, {
      goalId: data.goalId,
      pointsGained
    });
  }

  return NextResponse.json({
    success: true,
    pointsGained,
    message: `Mục tiêu hoàn thành! +${pointsGained} điểm`
  });
} 