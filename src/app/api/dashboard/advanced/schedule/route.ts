import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const days = parseInt(searchParams.get('days') || '7');

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        studySessions: {
          where: {
            scheduledDate: {
              gte: date ? new Date(date) : new Date(),
              lte: date ? new Date(new Date(date).getTime() + days * 24 * 60 * 60 * 1000) : new Date(Date.now() + days * 24 * 60 * 60 * 1000)
            }
          },
          orderBy: { scheduledDate: 'asc' }
        },
        weeklyGoals: {
          where: {
            deadline: {
              gte: new Date()
            }
          },
          orderBy: { deadline: 'asc' }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Group sessions by date
    const sessionsByDate = user.studySessions.reduce((acc: Record<string, typeof user.studySessions>, session: any) => {
      const dateKey = session.scheduledDate.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(session);
      return acc;
    }, {} as Record<string, typeof user.studySessions>);

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
      weeklyGoals: user.weeklyGoals
    });

  } catch (error) {
    console.error('Error fetching study schedule:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

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

    const body = await request.json();
    const { title, type, duration, startTime, endTime, priority, difficulty, subject, description, scheduledDate } = body;

    // Create new study session
    const sessionData = await prisma.studySession.create({
      data: {
        userId: user.id,
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

    return NextResponse.json({ session: sessionData });

  } catch (error) {
    console.error('Error creating study session:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { sessionId, status, completedAt } = body;

    // Update study session status
    const updatedSession = await prisma.studySession.update({
      where: { id: sessionId },
      data: {
        status,
        completedAt: status === 'completed' ? new Date() : null,
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ session: updatedSession });

  } catch (error) {
    console.error('Error updating study session:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
