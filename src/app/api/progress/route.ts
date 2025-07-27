import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const userId = session.user.id; // Assuming user.id is available in session
  const { lessonId } = await request.json();

  if (!lessonId) {
    return new NextResponse('Missing lessonId', { status: 400 });
  }

  try {
    const userProgress = await prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId: userId,
          lessonId: lessonId,
        },
      },
      update: {
        isCompleted: true,
        completedAt: new Date(),
      },
      create: {
        userId: userId,
        lessonId: lessonId,
        isCompleted: true,
        completedAt: new Date(),
      },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.error('Error updating user progress:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
