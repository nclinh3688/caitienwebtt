import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7');

    // Get test data (no authentication required)
    const testUserId = 'test-user-123';
    
    const studySessions = await prisma.studySession.findMany({
      where: {
        userId: testUserId,
        scheduledDate: {
          gte: new Date(),
          lte: new Date(Date.now() + days * 24 * 60 * 60 * 1000)
        }
      },
      orderBy: { scheduledDate: 'asc' }
    });

    const weeklyGoals = await prisma.weeklyGoal.findMany({
      where: {
        userId: testUserId,
        deadline: {
          gte: new Date()
        }
      },
      orderBy: { deadline: 'asc' }
    });

    // Group sessions by date
    const sessionsByDate = studySessions.reduce((acc: Record<string, typeof studySessions>, session: any) => {
      const dateKey = session.scheduledDate.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(session);
      return acc;
    }, {} as Record<string, typeof studySessions>);

    // Calculate daily stats
    const dailyStats = Object.entries(sessionsByDate).map(([date, sessions]: [string, any]) => {
      const totalStudyTime = sessions
        .filter((s: any) => s.type !== 'break')
        .reduce((sum: number, s: any) => sum + s.duration, 0);
      
      const completedSessions = sessions.filter((s: any) => s.status === 'completed').length;
      const totalSessions = sessions.length;

      return {
        date,
        sessions,
        totalStudyTime,
        completedSessions,
        totalSessions,
        productivity: totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0
      };
    });

    return NextResponse.json({
      dailyStats,
      weeklyGoals,
      message: 'Public API - No authentication required'
    });

  } catch (error) {
    console.error('Error fetching public schedule:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        dailyStats: [],
        weeklyGoals: []
      }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, type, duration, startTime, endTime, priority, difficulty, subject, description, scheduledDate } = body;

    // Create or get test user
    let testUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' }
    });

    if (!testUser) {
      testUser = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
          password: 'hashedpassword123'
        }
      });
    }

    // Create new study session
    const sessionData = await prisma.studySession.create({
      data: {
        userId: testUser.id,
        title,
        type,
        duration: parseInt(duration),
        startTime,
        endTime,
        priority,
        difficulty,
        subject,
        description,
        scheduledDate: new Date(scheduledDate),
        status: 'scheduled'
      }
    });

    return NextResponse.json({ 
      session: sessionData,
      message: 'Test session created successfully'
    });

  } catch (error) {
    console.error('Error creating test session:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
