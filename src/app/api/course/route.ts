import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        language: true,
        level: true
       },
       orderBy: { title: 'asc' }
    });
    return NextResponse.json(courses);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      if (process.env.NODE_ENV === 'development') console.error('Error fetching courses:', error);
    }
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
