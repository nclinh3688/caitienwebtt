import { NextResponse } from 'next/server';
import { N5Lesson10Grammar } from '@/data/grammar/n5/lesson10';

export async function GET() {
  try {
    return NextResponse.json(N5Lesson10Grammar);
  } catch (error) {
    console.error('Error serving lesson data:', error);
    return NextResponse.json(
      { error: 'Failed to load lesson data' },
      { status: 500 }
    );
  }
}
