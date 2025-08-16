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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        aiInsights: {
          orderBy: { createdAt: 'desc' },
          take: 20
        },
        learningPatterns: {
          where: { isActive: true },
          orderBy: { updatedAt: 'desc' }
        },
        aiPredictions: {
          where: { isAchieved: false },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      insights: user.aiInsights,
      patterns: user.learningPatterns,
      predictions: user.aiPredictions
    });

  } catch (error) {
    console.error('Error fetching advanced insights:', error);
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
    const { type, title, description, confidence, impact, category, actionRequired, estimatedTime, priority } = body;

    // Create new AI insight
    const insight = await prisma.aIInsight.create({
      data: {
        userId: user.id,
        type,
        title,
        description,
        confidence: parseFloat(confidence),
        impact,
        category,
        actionRequired: actionRequired || false,
        estimatedTime: estimatedTime ? parseInt(estimatedTime) : null,
        priority: priority || 1
      }
    });

    return NextResponse.json({ insight });

  } catch (error) {
    console.error('Error creating AI insight:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
