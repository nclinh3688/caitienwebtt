import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'jlpt-n4', 'B27.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lessonData = JSON.parse(fileContent);
    
    return NextResponse.json(lessonData);
  } catch (error) {
    console.error('Error reading lesson data for B27.json:', error);
    return NextResponse.json(
      { error: 'Failed to load lesson data' },
      { status: 500 }
    );
  }
}