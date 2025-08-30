import { NextResponse } from 'next/server';
import { N5Lesson7Grammar } from '@/data/grammar/n5/lesson7';

export async function GET() {
  try {
    return NextResponse.json(N5Lesson7Grammar);
  } catch (error) {
    console.error('Error serving lesson data:', error);
    return NextResponse.json(
      { error: 'Failed to load lesson data' },
      { status: 500 }
    );
  }
}
