import fs from 'fs';
import path from 'path';
import GrammarLessonListClient from '@/components/learning/GrammarLessonListClient';

import { LessonOverview } from '@/types/lesson';

async function getLessonsOverview(): Promise<LessonOverview[]> {
  const lessonsDirectory = path.join(process.cwd(), 'src', 'data', 'jlpt-n5');
  const fileNames = fs.readdirSync(lessonsDirectory);

  const lessons = fileNames
    .filter(fileName => fileName.endsWith('.json') && fileName.startsWith('B'))
    .map(fileName => {
      const filePath = path.join(lessonsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContents);
      // Extract lessonNumber
      const lessonNumber = data.lessonNumber || parseInt(fileName.replace('B', '').replace('.json', ''));

      // Extract titles
      const japaneseTitle = data.japaneseTitle || data.title || '';
      const vietnameseTitle = data.vietnameseTitle || data.description || '';

      // Extract summary
      let summaryContent = '';
      if (data.summary) {
        summaryContent = typeof data.summary === 'string' ? data.summary : data.summary.content;
      } else if (data.description) {
        summaryContent = data.description;
      }

      // Extract estimatedTime
      const estimatedTime = data.estimatedTime || data.estimated_study_time || '';

      // Extract difficulty
      const difficulty = data.difficulty || ''; // Assuming difficulty is directly available or empty

      return {
        lessonNumber: lessonNumber,
        japaneseTitle: japaneseTitle,
        vietnameseTitle: vietnameseTitle,
        summary: summaryContent,
        estimatedTime: estimatedTime,
        difficulty: difficulty,
      };
    })
    .sort((a, b) => a.lessonNumber - b.lessonNumber); // Sort by lesson number

  return lessons;
}

export default async function N5GrammarLessonsPage() {
  const lessons = await getLessonsOverview();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          📚 Ngữ pháp N5
        </h1>
        <GrammarLessonListClient lessons={lessons} />
      </div>
    </div>
  );
}
