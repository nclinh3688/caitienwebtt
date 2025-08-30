import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { lessonId: string } }
) {
  try {
    const { lessonId } = params;
    
    // Extract level from URL path
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const levelIndex = pathParts.findIndex(part => part === 'n5' || part === 'n4');
    const level = levelIndex !== -1 ? pathParts[levelIndex] : 'n5'; // Default to n5
    
    // Map lessonId to correct file format
    let fileName = lessonId;
    
    // If lessonId is in format "lesson-1", "lesson-2", etc.
    if (lessonId.startsWith('lesson-')) {
      const lessonNumber = lessonId.replace('lesson-', '');
      fileName = `B${lessonNumber.padStart(2, '0')}`;
    }
    
    // Try to load lesson data from the appropriate level directory
    let lessonPath = path.join(process.cwd(), 'src/data/jlpt-n5', `${fileName}.json`);
    
    // If N4 level is requested, try N4 directory first
    if (level === 'n4') {
      const n4Path = path.join(process.cwd(), 'src/data/jlpt-n4', `${fileName}.json`);
      if (fs.existsSync(n4Path)) {
        lessonPath = n4Path;
      }
    }
    
    if (!fs.existsSync(lessonPath)) {
      console.error(`Lesson file not found: ${lessonPath}`);
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    const lessonData = JSON.parse(fs.readFileSync(lessonPath, 'utf8'));

    // Transform data for the lesson player based on actual structure
    const transformedData = {
      id: lessonId,
      title: `Bài ${lessonId.replace('lesson-', '')}`,
      content: '', // Will be generated from vocabulary, grammar, kanji
      vocabulary: lessonData.vocabulary || [],
      grammar: lessonData.grammar || [],
      kanji: lessonData.kanji || [],
      listening: lessonData.listening || null,
      supplementaryMaterials: lessonData.supplementaryMaterials || null,
      metadata: {
        title: `Bài ${lessonId.replace('lesson-', '')}`,
        theme: 'Từ vựng cơ bản',
        estimatedTime: 30,
        difficulty: 'Beginner'
      }
    };

    // Generate content from vocabulary
    if (lessonData.vocabulary && lessonData.vocabulary.length > 0) {
      const vocabContent = lessonData.vocabulary
        .filter((item: any) => item.content && item.meaning)
        .map((item: any) => `${item.content} (${item.kanji || ''}) - ${item.meaning}`)
        .join('<br>');
      
      transformedData.content = `
        <h2>Từ vựng</h2>
        <p>${vocabContent}</p>
        ${lessonData.grammar ? '<h2>Ngữ pháp</h2><p>Nội dung ngữ pháp sẽ được hiển thị ở đây</p>' : ''}
        ${lessonData.kanji ? '<h2>Chữ Hán</h2><p>Nội dung chữ Hán sẽ được hiển thị ở đây</p>' : ''}
      `;
    }

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error loading lesson data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}