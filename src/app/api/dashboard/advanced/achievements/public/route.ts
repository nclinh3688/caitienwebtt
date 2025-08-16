import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const testUserId = 'test-user-123';

    const achievements = await prisma.achievement.findMany({
      where: { userId: testUserId },
      orderBy: { createdAt: 'desc' }
    });

    const userStats = await prisma.userStats.findUnique({
      where: { userId: testUserId }
    });

    const leaderboardEntries = await prisma.leaderboardEntry.findMany({
      where: {
        week: Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)),
        year: new Date().getFullYear()
      },
      orderBy: { rank: 'asc' },
      take: 10
    });

    // Get global leaderboard for current week
    const globalLeaderboard = await prisma.leaderboardEntry.findMany({
      where: {
        week: Math.ceil((new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)),
        year: new Date().getFullYear()
      },
      orderBy: { rank: 'asc' },
      take: 20
    });

    return NextResponse.json({
      achievements: achievements || [],
      userStats: userStats || null,
      userLeaderboard: leaderboardEntries || [],
      globalLeaderboard: globalLeaderboard || [],
      message: 'Public API - No authentication required'
    });

  } catch (error) {
    console.error('Error fetching public achievements:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        achievements: [],
        userStats: null,
        userLeaderboard: [],
        globalLeaderboard: []
      }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, rarity, icon, maxProgress, rewardType, rewardValue, requirements, bonusDescription, bonusValue } = body;

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

    // Create new achievement
    const achievement = await prisma.achievement.create({
      data: {
        userId: testUser.id,
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

    return NextResponse.json({ 
      achievement,
      message: 'Test achievement created successfully'
    });

  } catch (error) {
    console.error('Error creating test achievement:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
