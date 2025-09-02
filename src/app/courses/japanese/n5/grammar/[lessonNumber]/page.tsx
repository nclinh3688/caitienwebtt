import fs from 'fs';
import path from 'path';
import GrammarLessonClient from '@/components/learning/GrammarLessonClient';

interface Example {
  japanese: string;
  kanji: string;
  vietnamese: string;
  english: string;
}

interface GrammarPattern {
  id: number;
  pattern: string;
  meaning: string;
  explanation: string;
  examples: Example[];
  notes?: string[];
}

interface LessonData {
  lessonNumber: number;
  japaneseTitle: string;
  vietnameseTitle: string;
  englishTitle: string;
  summary: {
    title: string;
    content: string;
    keyPoints: string[];
  };
  grammarPatterns: GrammarPattern[];
  estimatedTime?: string;
  difficulty?: string;
}

async function getGrammarLessonData(lessonNumber: string): Promise<LessonData | null> {
  const lessonsDirectory = path.join(process.cwd(), 'src', 'data', 'jlpt-n5');
  const fileName = `B${lessonNumber.padStart(2, '0')}.json`;
  const filePath = path.join(lessonsDirectory, fileName);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    let grammarPatterns: GrammarPattern[] = [];

    if (data.grammarPatterns) {
      grammarPatterns = data.grammarPatterns;
    } else if (data.grammar) {
      // Transform data.grammar into GrammarPattern[]
      grammarPatterns = data.grammar.map((item: any, index: number) => ({
        id: index + 1, // Assign a unique ID
        pattern: item.content,
        meaning: item.meaning,
        explanation: item.additional_notes || '', // Use additional_notes as explanation
        examples: [], // No examples in this structure, so provide an empty array
        notes: [], // No notes in this structure, so provide an empty array
      }));
    }

    const lessonData: LessonData = {
      lessonNumber: data.lessonNumber,
      japaneseTitle: data.japaneseTitle,
      vietnameseTitle: data.vietnameseTitle,
      englishTitle: data.englishTitle,
      summary: data.summary ? (typeof data.summary === 'string' ? data.summary : data.summary.content) : '',
      grammarPatterns: grammarPatterns, // Use the transformed grammarPatterns
      estimatedTime: data.estimatedTime,
      difficulty: data.difficulty,
    };
    return lessonData;
  } catch (error) {
    console.error(`Failed to load grammar lesson data for B${lessonNumber}:`, error);
    return null;
  }
}

export default async function GrammarLessonDetailPage({ params }: { params: { lessonNumber: string } }) {
  const lessonNumber = params.lessonNumber;
  const lessonData = await getGrammarLessonData(lessonNumber);

  if (!lessonData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy dữ liệu ngữ pháp</h1>
          <p className="text-gray-600">Có vẻ như bài học số {lessonNumber} không tồn tại.</p>
        </div>
      </div>
    );
  }

  return <GrammarLessonClient initialLessonData={lessonData} />;
}
