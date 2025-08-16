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

    const { lessonId, targetText, userSpeech, score } = await request.json();

    if (!lessonId || !targetText || !userSpeech || score === undefined) {
      return NextResponse.json({ 
        error: 'Missing required fields: lessonId, targetText, userSpeech, score' 
      }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Save pronunciation attempt to database
    // For now, we'll store this as a simple record. In a full implementation,
    // you might want a dedicated PronunciationAttempt model
    const pronunciationResult = {
      userId: user.id,
      lessonId: lessonId,
      targetText: targetText,
      userSpeech: userSpeech,
      score: score,
      attemptedAt: new Date(),
    };

    // You could extend the UserProgress model or create a new PronunciationProgress model
    // For now, let's just return success and log the attempt
    if (process.env.NODE_ENV === 'development') console.log('Pronunciation attempt:', pronunciationResult);

    // Update user progress for this lesson if pronunciation score is good (>= 60)
    if (score >= 60) {
      await prisma.userProgress.upsert({
        where: {
          userId_lessonId: {
            userId: user.id,
            lessonId: lessonId
          }
        },
        update: {
          // Update completion if not already completed and pronunciation is good
        },
        create: {
          userId: user.id,
          lessonId: lessonId,
          isCompleted: score >= 80, // Mark as completed if excellent pronunciation
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Pronunciation score saved successfully',
      score: score
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error saving pronunciation score:', error);
    return NextResponse.json({ 
      error: 'Failed to save pronunciation score' 
    }, { status: 500 });
  }
}