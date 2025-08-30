import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the B01.json file
    const filePath = path.join(process.cwd(), 'src', 'data', 'jlpt-n5', 'B01.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lessonData = JSON.parse(fileContent);
    
    return NextResponse.json(lessonData);
  } catch (error) {
    console.error('Error reading lesson data:', error);
    return NextResponse.json(
      { error: 'Failed to load lesson data' },
      { status: 500 }
    );
  }
}
