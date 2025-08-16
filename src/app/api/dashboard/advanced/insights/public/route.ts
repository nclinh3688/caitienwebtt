import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get all insights for testing (no authentication required)
    const insights = await prisma.aIInsight.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' }
    });

    const patterns = await prisma.learningPattern.findMany({
      where: { isActive: true },
      take: 5,
      orderBy: { updatedAt: 'desc' }
    });

    const predictions = await prisma.aIPrediction.findMany({
      where: { isAchieved: false },
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      insights: insights || [],
      patterns: patterns || [],
      predictions: predictions || [],
      message: 'Public API - No authentication required'
    });

  } catch (error) {
    console.error('Error fetching public insights:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        insights: [],
        patterns: [],
        predictions: []
      }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, description, confidence, impact, category, actionRequired, estimatedTime, priority } = body;

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

    const insight = await prisma.aIInsight.create({
      data: {
        userId: testUser.id,
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

    return NextResponse.json({ 
      insight,
      message: 'Test insight created successfully',
      userId: testUser.id
    });

  } catch (error) {
    console.error('Error creating test insight:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') }, 
      { status: 500 }
    );
  }
}
