import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/courses/[id] - Get a specific course
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        lessons: {
          select: {
            id: true,
            title: true,
            description: true,
            order: true,
            duration: true,
            difficulty: true,
            isPublished: true,
            createdAt: true,
          },
          orderBy: { order: 'asc' },
        },
        categories: {
          select: {
            id: true,
            name: true,
            description: true,
            order: true,
          },
          orderBy: { order: 'asc' },
        },
        // Removed _count as lessons is a relation, not a count field
      },
    });

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch course' },
      { status: 500 }
    );
  }
}

// PUT /api/courses/[id] - Update a course
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, description, thumbnail, duration, isPublished, order } = body;

    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    // Update course
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
        thumbnail,
        duration,
        isPublished,
        order,
        updatedAt: new Date(),
      },
      include: {
        lessons: true,
        categories: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedCourse,
      message: 'Course updated successfully',
    });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

// DELETE /api/courses/[id] - Delete a course
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    // Delete course (this will cascade delete lessons, categories, etc.)
    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}
