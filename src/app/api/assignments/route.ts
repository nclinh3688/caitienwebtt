import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = await request.json();

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate smart assignments based on user progress
    const assignments = await generateSmartAssignments(user);
    const reminders = await getActiveReminders(user);

    return NextResponse.json({
      assignments,
      reminders
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error fetching assignments:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch assignments' 
    }, { status: 500 });
  }
}

async function generateSmartAssignments(user: any) {
  // In a real implementation, this would analyze user progress and create relevant assignments
  // For now, we'll return mock assignments with realistic data
  
  const baseAssignments = [
    {
      id: '1',
      title: 'Hoàn thành bài 5: N5 Vocabulary',
      description: 'Học thuộc 30 từ vựng mới về gia đình và nghề nghiệp',
      type: 'lesson',
      priority: 'high',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
      estimatedTime: 45,
      progress: 60,
      isCompleted: false,
      lessonId: 'N5-B05',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Luyện phát âm với AI',
      description: 'Đạt điểm >=80 trong pronunciation trainer cho bài 1-3',
      type: 'practice',
      priority: 'medium',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      estimatedTime: 30,
      progress: 25,
      isCompleted: false,
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Ôn tập Kanji đã học',
      description: 'Review tất cả Kanji từ bài 1-4 để tăng khả năng nhận diện',
      type: 'review',
      priority: 'medium',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
      estimatedTime: 60,
      progress: 0,
      isCompleted: false,
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'Mini test N5 Grammar',
      description: 'Kiểm tra ngữ pháp cơ bản N5: です/だ, particles は/が/を',
      type: 'test',
      priority: 'high',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      estimatedTime: 20,
      progress: 0,
      isCompleted: false,
      createdAt: new Date()
    },
    {
      id: '5',
      title: 'Listening Practice',
      description: 'Nghe và hiểu 5 bài hội thoại N5 với độ chính xác >=70%',
      type: 'practice',
      priority: 'medium',
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
      estimatedTime: 40,
      progress: 15,
      isCompleted: false,
      createdAt: new Date()
    }
  ];

  return baseAssignments;
}

async function getActiveReminders(user: any) {
  // Return active study reminders for the user
  return [
    {
      id: '1',
      title: 'Học từ vựng hàng ngày',
      message: 'Đã đến giờ học 15 từ vựng mới! Hãy duy trì thói quen học mỗi ngày.',
      scheduledFor: new Date(),
      type: 'daily',
      isActive: true
    },
    {
      id: '2',
      title: 'Ôn tập cuối tuần',
      message: 'Thời gian ôn tập những gì đã học trong tuần. Review vocabulary và grammar!',
      scheduledFor: new Date(),
      type: 'weekly',
      isActive: true
    },
    {
      id: '3',
      title: 'Luyện phát âm',
      message: 'Dành 10 phút luyện phát âm với AI trainer để cải thiện khả năng nói.',
      scheduledFor: new Date(),
      type: 'daily',
      isActive: true
    }
  ];
}

// Create new assignment
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, type, priority, dueDate, estimatedTime, lessonId } = await request.json();

    // Validation
    if (!title || !description || !type || !priority || !dueDate) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // For now, we'll just return success
    // In a full implementation, you'd save to database
    const newAssignment = {
      id: Date.now().toString(),
      title,
      description,
      type,
      priority,
      dueDate: new Date(dueDate),
      estimatedTime: estimatedTime || 30,
      progress: 0,
      isCompleted: false,
      lessonId,
      createdAt: new Date()
    };

    return NextResponse.json({ 
      success: true, 
      assignment: newAssignment 
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error creating assignment:', error);
    return NextResponse.json({ 
      error: 'Failed to create assignment' 
    }, { status: 500 });
  }
}