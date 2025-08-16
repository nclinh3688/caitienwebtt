import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/courses/[id]/lessons - Get all lessons for a course
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    const where: any = { courseId: id };
    if (published) where.isPublished = published === 'true';

    const lessons = await prisma.lesson.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
        vocabulary: {
          select: {
            id: true,
            word: true,
            reading: true,
            meaning: true,
            order: true,
          },
          orderBy: { order: 'asc' },
        },
        grammar: {
          select: {
            id: true,
            pattern: true,
            explanation: true,
            order: true,
          },
          orderBy: { order: 'asc' },
        },
        audio: {
          select: {
            id: true,
            title: true,
            type: true,
            duration: true,
            order: true,
          },
          orderBy: { order: 'asc' },
        },
        quizzes: {
          select: {
            id: true,
            title: true,
            type: true,
            difficulty: true,
            order: true,
          },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: lessons,
      count: lessons.length,
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lessons' },
      { status: 500 }
    );
  }
}

// POST /api/courses/[id]/lessons - Create a new lesson
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description, content, categoryId, order, duration, difficulty, isPublished } = body;

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    // Get the next order if not provided
    let lessonOrder = order;
    if (!lessonOrder) {
      const lastLesson = await prisma.lesson.findFirst({
        where: { courseId: id },
        orderBy: { order: 'desc' },
      });
      lessonOrder = lastLesson ? lastLesson.order + 1 : 0;
    }

    // Create lesson
    const lesson = await prisma.lesson.create({
      data: {
        courseId: id,
        title,
        description,
        content,
        categoryId,
        order: lessonOrder,
        duration,
        difficulty: difficulty || 'beginner',
        isPublished: isPublished || false,
      },
      include: {
        category: true,
        vocabulary: true,
        grammar: true,
        audio: true,
        quizzes: true,
      },
    });

    // Update course lesson count
    await prisma.course.update({
      where: { id },
      data: {
        lessonCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: lesson,
      message: 'Lesson created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating lesson:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create lesson' },
      { status: 500 }
    );
  }
}
