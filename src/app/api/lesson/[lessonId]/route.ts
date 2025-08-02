import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { lessonId: string } }
) {
  try {
    const { lessonId } = params;
    
    // Load lesson data from JSON file
    const lessonPath = path.join(process.cwd(), 'src/data/jlpt-n5', `${lessonId}.json`);
    
    if (!fs.existsSync(lessonPath)) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    const lessonData = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));

    // Transform data for the lesson player
    const transformedData = {
      id: lessonId,
      vocabulary: lessonData.vocabulary || [],
      grammar: lessonData.grammar || [],
      kanji: lessonData.kanji || [],
      audio: lessonData.audio || null,
      metadata: {
        title: lessonData.metadata?.title || `Bài ${lessonId}`,
        theme: lessonData.metadata?.theme || 'Từ vựng cơ bản',
        estimatedTime: lessonData.metadata?.estimatedTime || 30,
        difficulty: lessonData.metadata?.difficulty || 'Beginner'
      }
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error loading lesson data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}