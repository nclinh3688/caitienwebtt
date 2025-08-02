import { PrismaClient } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LessonAIExplanation from '@/components/LessonAIExplanation';

const prisma = new PrismaClient();

export default async function LessonDetailPage({ params }: { params: { level: string, lessonId: string } }) {
  const { level, lessonId } = params;

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
      course: { level: level }, // Ensure the lesson belongs to the correct level
    },
  });

  if (!lesson) {
    return <div className="container mx-auto px-4 py-12 text-center text-red-500">Bài học không tìm thấy.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-foreground">{lesson.title}</CardTitle>
          {lesson.description && <p className="mt-2 text-lg text-muted-foreground">{lesson.description}</p>}
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          {/* Render lesson content. Assuming content is plain text or markdown. */}
          <div dangerouslySetInnerHTML={{ __html: lesson.content || '' }} />

          <LessonAIExplanation />
        </CardContent>
      </Card>
    </div>
  );
}
