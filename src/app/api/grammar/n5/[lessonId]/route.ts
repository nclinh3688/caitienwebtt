import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: { lessonId: string } }) {
  try {
    const { lessonId } = params;
    const filePath = path.join(process.cwd(), `src/data/jlpt-n5/${lessonId.toUpperCase()}.json`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Lesson data not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error loading grammar lesson data for ${params.lessonId}:`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
