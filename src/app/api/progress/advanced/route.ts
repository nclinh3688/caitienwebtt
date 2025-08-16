import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.email;
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || 'week';

    const user = await prisma.user.findUnique({
      where: { email: userId },
      include: {
        progress: {
          include: {
            lesson: {
              include: {
                course: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const progress = user.progress;
    const metrics = await calculateAdvancedProgress(progress, timeframe);
    const learningProgress = generateLearningProgress(
      getTimeframeStart(new Date(), timeframe),
      new Date(),
      progress
    );
    const skillBreakdown = generateSkillBreakdown(progress);
    const learningPaths = generateLearningPaths(progress);

    return NextResponse.json({
      success: true,
      data: {
        metrics,
        learningProgress,
        skillBreakdown,
        learningPaths
      }
    });

  } catch (error) {
    console.error('Advanced progress error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function calculateAdvancedProgress(progress: any[], timeframe: string) {
  const now = new Date();
  const start = getTimeframeStart(now, timeframe);
  const previousStart = getTimeframeStart(start, timeframe);

  const currentProgress = progress.filter(p => {
    const completedAt = new Date(p.completedAt);
    return completedAt >= start && completedAt <= now;
  });

  const previousProgress = progress.filter(p => {
    const completedAt = new Date(p.completedAt);
    return completedAt >= previousStart && completedAt < start;
  });

  const currentCount = currentProgress.length;
  const previousCount = previousProgress.length;
  const change = calculateChange(currentCount, previousCount);

  return {
    current: currentCount,
    previous: previousCount,
    change,
    timeframe
  };
}

function getTimeframeStart(now: Date, timeframe: string): Date {
  const start = new Date(now);
  
  switch (timeframe) {
    case 'day':
      start.setHours(0, 0, 0, 0);
      break;
    case 'week':
      start.setDate(start.getDate() - start.getDay());
      start.setHours(0, 0, 0, 0);
      break;
    case 'month':
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      break;
    case 'year':
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      break;
    default:
      start.setDate(start.getDate() - 7);
      start.setHours(0, 0, 0, 0);
  }
  
  return start;
}

function calculateChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function generateLearningProgress(start: Date, end: Date, progress: any[]): any[] {
  const days = [];
  const current = new Date(start);
  
  while (current <= end) {
    const dayProgress = progress.filter(p => {
      const completedAt = new Date(p.completedAt);
      return completedAt.toDateString() === current.toDateString();
    }).length;
    
    days.push({
      date: current.toISOString().split('T')[0],
      count: dayProgress
    });
    
    current.setDate(current.getDate() + 1);
  }
  
  return days;
}

function generateSkillBreakdown(progress: any[]): any {
  const skills: { [key: string]: number } = {
    vocabulary: 0,
    grammar: 0,
    listening: 0,
    speaking: 0,
    reading: 0,
    writing: 0
  };
  
  progress.forEach(p => {
    if (p.lesson?.type) {
      const type = p.lesson.type.toLowerCase();
      if (skills[type] !== undefined) {
        skills[type]++;
      }
    }
  });
  
  return skills;
}

function generateLearningPaths(progress: unknown[]): unknown[] {
  // Mock learning paths based on progress
  return [
    {
      id: 'path1',
      title: 'Grammar Foundation',
      description: 'Build strong grammar fundamentals',
      progress: 75,
      lessons: 12,
      completed: 9
    },
    {
      id: 'path2',
      title: 'Conversation Skills',
      description: 'Improve speaking and listening',
      progress: 45,
      lessons: 8,
      completed: 4
    }
  ];
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { lessonId, completed } = body;

    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID required' }, { status: 400 });
    }

    const userId = session.user.email;

    // Update or create progress
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      },
      update: {
        isCompleted: completed,
        completedAt: completed ? new Date() : null
      },
      create: {
        userId,
        lessonId,
        isCompleted: completed,
        completedAt: completed ? new Date() : null
      }
    });

    return NextResponse.json({
      success: true,
      data: progress
    });

  } catch (error) {
    console.error('Progress update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
