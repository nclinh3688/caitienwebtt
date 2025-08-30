import { NextResponse } from 'next/server';
import { N5Lesson9Grammar } from '@/data/grammar/n5/lesson9';

export async function GET() {
  try {
    return NextResponse.json(N5Lesson9Grammar);
  } catch (error) {
    console.error('Error serving lesson data:', error);
    return NextResponse.json(
      { error: 'Failed to load lesson data' },
      { status: 500 }
    );
  }
}
