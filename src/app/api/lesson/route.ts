import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        courseId: true,
        order: true,
        content: true
       },
       orderBy: { order: 'asc' },
      take: 50 // Pagination - limit to 50 lessons per request
    });
    return NextResponse.json(lessons);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') if (process.env.NODE_ENV === 'development') console.error('Error fetching lessons:', error);
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  }
}
