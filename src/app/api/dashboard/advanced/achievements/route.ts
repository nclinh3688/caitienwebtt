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
        achievements: {
          orderBy: { createdAt: 'desc' }
        },
        userStats: true,
        leaderboardEntries: {
          where: {
            week: Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)),
            year: new Date().getFullYear()
          },
          orderBy: { rank: 'asc' },
          take: 10
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get global leaderboard for current week
    const globalLeaderboard = await prisma.leaderboardEntry.findMany({
      where: {
        week: Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)),
        year: new Date().getFullYear()
      },
      orderBy: { rank: 'asc' },
      take: 20,
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    });

    return NextResponse.json({
      achievements: user.achievements,
      userStats: user.userStats,
      userLeaderboard: user.leaderboardEntries,
      globalLeaderboard
    });

  } catch (error) {
    console.error('Error fetching achievements:', error);
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
    const { title, description, category, rarity, icon, maxProgress, rewardType, rewardValue, requirements, bonusDescription, bonusValue } = body;

    // Create new achievement
    const achievement = await prisma.achievement.create({
      data: {
        userId: user.id,
        title,
        description,
        category,
        rarity,
        icon,
        maxProgress: parseFloat(maxProgress),
        rewardType,
        rewardValue,
        requirements: JSON.stringify(requirements),
        bonusDescription,
        bonusValue: bonusValue ? parseFloat(bonusValue) : null
      }
    });

    return NextResponse.json({ achievement });

  } catch (error) {
    console.error('Error creating achievement:', error);
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
    const { achievementId, progress, unlocked } = body;

    // Update achievement progress
    const updatedAchievement = await prisma.achievement.update({
      where: { id: achievementId },
      data: {
        progress: parseFloat(progress),
        unlocked: unlocked || false,
        unlockedAt: unlocked ? new Date() : null
      }
    });

    // If achievement is unlocked, update user stats
    if (unlocked) {
      await prisma.userStats.upsert({
        where: { userId: updatedAchievement.userId },
        update: {
          unlockedAchievements: {
            increment: 1
          },
          totalCoins: {
            increment: updatedAchievement.rewardType === 'coins' ? parseInt(updatedAchievement.rewardValue) : 0
          },
          totalXP: {
            increment: updatedAchievement.rewardType === 'xp' ? parseInt(updatedAchievement.rewardValue) : 0
          }
        },
        create: {
          userId: updatedAchievement.userId,
          unlockedAchievements: 1,
          totalCoins: updatedAchievement.rewardType === 'coins' ? parseInt(updatedAchievement.rewardValue) : 0,
          totalXP: updatedAchievement.rewardType === 'xp' ? parseInt(updatedAchievement.rewardValue) : 0
        }
      });
    }

    return NextResponse.json({ achievement: updatedAchievement });

  } catch (error) {
    console.error('Error updating achievement:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
