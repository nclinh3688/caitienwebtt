import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Load lessons list
    const lessonsListPath = path.join(process.cwd(), 'src/data/jlpt-n5/lessons-n5.json');
    const lessonsList = JSON.parse(fs.readFileSync(lessonsListPath, 'utf8'));

    // Load individual lesson data for B01-B10
    const lessonIds = ['B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B09', 'B10'];
    const lessonsData = [];

    for (const lessonId of lessonIds) {
      const lessonPath = path.join(process.cwd(), 'src/data/jlpt-n5', `${lessonId}.json`);
      
      if (fs.existsSync(lessonPath)) {
        const lessonData = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));
        
        // Provide default values if metadata doesn't exist
        const metadata = lessonData.metadata || {};
        const title = metadata.title || `Bài ${lessonId}`;
        const theme = metadata.theme || 'Từ vựng cơ bản';
        const estimatedTime = metadata.estimatedTime || 30;
        const difficulty = metadata.difficulty || 'Beginner';
        
        lessonsData.push({
          id: lessonId,
          title: title,
          description: theme,
          status: 'available',
          path: `/courses/japanese/n5/${lessonId}`,
          estimatedTime: estimatedTime,
          difficulty: difficulty,
          vocabularyCount: lessonData.vocabulary?.length || 0,
          grammarCount: lessonData.grammar?.length || 0,
          kanjiCount: lessonData.kanji?.length || 0
        });
      }
    }

    return NextResponse.json({
      success: true,
      course: {
        id: 'japanese-n5',
        title: 'Khóa học N5',
        description: 'Cơ bản tiếng Nhật - Trình độ sơ cấp',
        level: 'N5',
        totalLessons: lessonsData.length,
        estimatedTime: lessonsData.reduce((total, lesson) => total + lesson.estimatedTime, 0),
        difficulty: 'Beginner'
      },
      lessons: lessonsData
    });

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error loading N5 course data:', error);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 