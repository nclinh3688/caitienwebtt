import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'jlpt-n5', 'B15.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lessonData = JSON.parse(fileContent);
    
    return NextResponse.json(lessonData);
  } catch (error) {
    console.error('Error reading lesson data for B15.json:', error);
    return NextResponse.json(
      { error: 'Failed to load lesson data' },
      { status: 500 }
    );
  }
}
