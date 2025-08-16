import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/courses - Get all courses
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language');
    const level = searchParams.get('level');
    const published = searchParams.get('published');

    const where: any = {};
    
    if (language) where.language = language;
    if (level) where.level = level;
    if (published) where.isPublished = published === 'true';

    const courses = await prisma.course.findMany({
      where,
      include: {
        lessons: {
          select: {
            id: true,
            title: true,
            order: true,
            isPublished: true,
          },
          orderBy: { order: 'asc' },
        },
        categories: {
          select: {
            id: true,
            name: true,
            description: true,
          },
          orderBy: { order: 'asc' },
        },
        _count: {
          select: {
            lessons: true,
          },
        },
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: courses,
      count: courses.length,
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// POST /api/courses - Create a new course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { language, level, title, description, thumbnail, duration, isPublished } = body;

    // Validate required fields
    if (!language || !level || !title) {
      return NextResponse.json(
        { success: false, error: 'Language, level, and title are required' },
        { status: 400 }
      );
    }

    // Check if course already exists
    const existingCourse = await prisma.course.findUnique({
      where: { language_level: { language, level } },
    });

    if (existingCourse) {
      return NextResponse.json(
        { success: false, error: 'Course with this language and level already exists' },
        { status: 409 }
      );
    }

    // Create course
    const course = await prisma.course.create({
      data: {
        language,
        level,
        title,
        description,
        thumbnail,
        duration,
        isPublished: isPublished || false,
        order: 0, // Will be updated later
      },
      include: {
        lessons: true,
        categories: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: course,
      message: 'Course created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create course' },
      { status: 500 }
    );
  }
}
