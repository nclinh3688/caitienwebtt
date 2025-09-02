import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { lessonId: string } }) {
  try {
    const lessonId = params.lessonId;

    if (!lessonId) {
      return NextResponse.json(
        { success: false, error: 'Lesson ID is required' },
        { status: 400 }
      );
    }

    // The lessonId from the URL is the lesson *order*. We need to find the actual lesson record.
    // This assumes that the combination of course level and lesson order is unique enough.
    // A more robust solution might need to also know the course (e.g., n5 or n4).
    const lesson = await prisma.lesson.findFirst({
        where: {
            order: parseInt(lessonId, 10),
            // We might need to add a course level filter here if order is not globally unique
            // For now, we assume it is for the sake of the example.
            course: {
                level: 'n5' // Hardcoding to N5 for now as per the user's context
            }
        }
    });

    if (!lesson) {
        return NextResponse.json(
            { success: false, error: 'Lesson not found' },
            { status: 404 }
          );
    }

    const vocabulary = await prisma.vocabulary.findMany({
      where: {
        lessonId: lesson.id,
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json({ success: true, data: vocabulary });

  } catch (error) {
    console.error('Error fetching vocabulary:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vocabulary' },
      { status: 500 }
    );
  }
}
