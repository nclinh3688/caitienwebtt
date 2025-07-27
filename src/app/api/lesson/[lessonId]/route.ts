import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request, { params }: { params: { lessonId: string } }) {
  const { lessonId } = params;
  const session = await getServerSession(authOptions);

  if (!lessonId) {
    return new NextResponse('Missing lessonId', { status: 400 });
  }

  try {
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      include: {
        course: {
          select: {
            id: true,
            lessons: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      return new NextResponse('Lesson not found', { status: 404 });
    }

    let userProgress = null;
    if (session?.user?.id) {
      userProgress = await prisma.userProgress.findUnique({
        where: {
          userId_lessonId: {
            userId: session.user.id,
            lessonId: lesson.id,
          },
        },
      });
    }

    // Determine next and previous lessons
    const courseLessons = lesson.course?.lessons || [];
    const currentLessonIndex = courseLessons.findIndex(l => l.id === lesson.id);

    const prevLessonId = currentLessonIndex > 0 ? courseLessons[currentLessonIndex - 1].id : null;
    const nextLessonId = currentLessonIndex < courseLessons.length - 1 ? courseLessons[currentLessonIndex + 1].id : null;

    return NextResponse.json({
      lesson: {
        ...lesson,
        course: undefined, // Remove course object to avoid circular reference and send only necessary data
      },
      userProgress,
      prevLessonId,
      nextLessonId,
    });
  } catch (error) {
    console.error('Error fetching lesson details:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}