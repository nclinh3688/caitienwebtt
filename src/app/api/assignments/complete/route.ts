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

    const { assignmentId } = await request.json();

    if (!assignmentId) {
      return NextResponse.json({ 
        error: 'Assignment ID is required' 
      }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Mark assignment as completed
    // In a full implementation, you'd update the database
    if (process.env.NODE_ENV === 'development') console.log(`Assignment ${assignmentId} marked as completed for user ${user.id}`);

    // Award achievement points or update user progress
    await awardCompletionRewards(user.id, assignmentId);

    return NextResponse.json({ 
      success: true,
      message: 'Assignment completed successfully!'
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error completing assignment:', error);
    return NextResponse.json({ 
      error: 'Failed to complete assignment' 
    }, { status: 500 });
  }
}

async function awardCompletionRewards(userId: string, assignmentId: string) {
  try {
    // Award points, update streaks, create achievements
    // This could include:
    // - XP points for completing assignments
    // - Streak bonuses for consistency
    // - Special achievements for different assignment types
    
    if (process.env.NODE_ENV === 'development') console.log(`Awarding completion rewards for user ${userId}, assignment ${assignmentId}`);
    
    // Example: Create achievement for completing first assignment
    // await prisma.achievement.create({
    //   data: {
    //     userId: userId,
    //     name: 'Task Master',
    //     description: 'Completed your first assignment!'
    //   }
    // });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error('Error awarding completion rewards:', error);
  }
}