import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Language display names mapping
const languageDisplayNames: { [key: string]: string } = {
  japanese: 'Tiếng Nhật',
  chinese: 'Tiếng Trung', 
  english: 'Tiếng Anh',
  korean: 'Tiếng Hàn',
  vietnamese: 'Tiếng Việt',
};

export default async function LessonPage({ 
  params 
}: { 
  params: { language: string; level: string; lessonId: string } 
}) {
  const { language, level, lessonId } = params;
  
  // Validate language parameter
  if (!languageDisplayNames[language]) {
    notFound();
  }

  // Get lesson from database with course info
  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
      course: {
        language: language,
        level: level,
      },
    },
    include: {
      course: {
        include: {
          lessons: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      },
    },
  });

  if (!lesson) {
    notFound();
  }

  // Find previous and next lessons
  const currentIndex = lesson.course.lessons.findIndex(l => l.id === lessonId);
  const previousLesson = currentIndex > 0 ? lesson.course.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lesson.course.lessons.length - 1 ? lesson.course.lessons[currentIndex + 1] : null;

  // Calculate progress
  const totalLessons = lesson.course.lessons.length;
  const progressPercentage = ((currentIndex + 1) / totalLessons) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with navigation */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Link 
            href={`/courses/${language}/${level}`}
            className="text-primary hover:underline font-semibold flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Quay lại khóa học
          </Link>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">
              {languageDisplayNames[language]} - {level.toUpperCase()}
            </Badge>
            <span>•</span>
            <span>Bài {lesson.order} / {totalLessons}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            <span className="text-sm text-muted-foreground">
              {Math.round(progressPercentage)}% hoàn thành
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Lesson content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Badge className="bg-blue-100 text-blue-800">
                  Bài {lesson.order}
                </Badge>
                {lesson.title}
              </CardTitle>
              {lesson.description && (
                <p className="text-muted-foreground">{lesson.description}</p>
              )}
            </CardHeader>
            
            <CardContent className="prose max-w-none">
              {lesson.content ? (
                <div className="whitespace-pre-wrap text-base leading-relaxed">
                  {lesson.content}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nội dung bài học đang được cập nhật...</p>
                  <p className="text-sm mt-2">Vui lòng quay lại sau hoặc chuyển sang bài học khác.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lesson Navigation */}
          <div className="flex justify-between items-center">
            {previousLesson ? (
              <Link href={`/courses/${language}/${level}/lessons/${previousLesson.id}`}>
                <Button variant="outline" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Bài trước
                </Button>
              </Link>
            ) : (
              <div></div>
            )}

            {nextLesson ? (
              <Link href={`/courses/${language}/${level}/lessons/${nextLesson.id}`}>
                <Button className="flex items-center gap-2">
                  Bài tiếp theo
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            ) : (
              <Button disabled className="flex items-center gap-2">
                Hoàn thành khóa học
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-lg">Danh sách bài học</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {lesson.course.lessons.map((courseLesson, index) => (
                <Link 
                  key={courseLesson.id} 
                  href={`/courses/${language}/${level}/lessons/${courseLesson.id}`}
                  className={`block p-3 rounded-lg border transition-colors ${
                    courseLesson.id === lessonId 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-grow">
                      <div className="text-sm font-medium truncate">
                        {courseLesson.title}
                      </div>
                      <div className="text-xs opacity-75">
                        Bài {courseLesson.order}
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      index < currentIndex 
                        ? 'bg-green-500' 
                        : index === currentIndex 
                          ? 'bg-blue-500' 
                          : 'bg-gray-300'
                    }`}></div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}