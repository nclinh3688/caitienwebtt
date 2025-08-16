import { NextRequest, NextResponse } from 'next/server';

// GET /api/progress - Get user progress
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Mock data for testing
    const mockProgressData = {
      totalLessons: 25,
      completedLessons: 8,
      completionRate: 32,
      totalTimeSpent: 180, // minutes
      averageScore: 85,
      recentProgress: [
        {
          id: '1',
          lessonTitle: 'Bài 1: Chào hỏi cơ bản',
          courseTitle: 'Tiếng Nhật N5',
          completedAt: new Date().toISOString(),
          score: 90
        },
        {
          id: '2',
          lessonTitle: 'Bài 2: Số đếm',
          courseTitle: 'Tiếng Nhật N5',
          completedAt: new Date(Date.now() - 86400000).toISOString(),
          score: 85
        },
        {
          id: '3',
          lessonTitle: 'Bài 3: Thời gian',
          courseTitle: 'Tiếng Nhật N5',
          completedAt: new Date(Date.now() - 172800000).toISOString(),
          score: 80
        }
      ]
    };

    return NextResponse.json({
      success: true,
      data: mockProgressData
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }
}

// POST /api/progress - Create or update user progress
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, lessonId, isCompleted, timeSpent, score } = body;

    if (!userId || !lessonId) {
      return NextResponse.json({ error: 'User ID and Lesson ID are required' }, { status: 400 });
    }

    // Mock response for testing
    return NextResponse.json({
      success: true,
      message: 'Progress updated successfully',
      data: {
        id: 'mock-progress-id',
        userId,
        lessonId,
        isCompleted: isCompleted || false,
        timeSpent: timeSpent || 0,
        score: score || 0,
        completedAt: isCompleted ? new Date().toISOString() : null
      }
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}

// PUT /api/progress - Update specific progress fields
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { progressId, updates } = body;

    if (!progressId || !updates) {
      return NextResponse.json({ error: 'Progress ID and updates are required' }, { status: 400 });
    }

    // Mock response for testing
    return NextResponse.json({
      success: true,
      message: 'Progress updated successfully',
      data: {
        id: progressId,
        ...updates,
        updatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
