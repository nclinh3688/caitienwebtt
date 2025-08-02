import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
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

    // Calculate progress statistics
    const totalLessons = user.progress.length;
    const completedLessons = user.progress.filter(p => p.isCompleted).length;
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    // Group by course
    const courseProgress = user.progress.reduce((acc, progress) => {
      const courseId = progress.lesson.course.id;
      if (!acc[courseId]) {
        acc[courseId] = {
          courseId,
          courseName: progress.lesson.course.title,
          language: progress.lesson.course.language,
          level: progress.lesson.course.level,
          totalLessons: 0,
          completedLessons: 0,
          progress: 0
        };
      }
      acc[courseId].totalLessons++;
      if (progress.isCompleted) {
        acc[courseId].completedLessons++;
      }
      return acc;
    }, {} as Record<string, any>);

    // Calculate progress for each course
    Object.values(courseProgress).forEach((course: any) => {
      course.progress = course.totalLessons > 0 ? (course.completedLessons / course.totalLessons) * 100 : 0;
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      progress: {
        totalLessons,
        completedLessons,
        progressPercentage,
        courseProgress: Object.values(courseProgress)
      }
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { lessonId, isCompleted } = body;

    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update or create progress
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lessonId
        }
      },
      update: {
        isCompleted: isCompleted,
        completedAt: isCompleted ? new Date() : null
      },
      create: {
        userId: user.id,
        lessonId: lessonId,
        isCompleted: isCompleted,
        completedAt: isCompleted ? new Date() : null
      }
    });

    return NextResponse.json({ 
      message: 'Progress updated successfully', 
      progress 
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
