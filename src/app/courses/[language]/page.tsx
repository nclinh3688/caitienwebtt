import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { notFound } from 'next/navigation';

// Language display names mapping
const languageDisplayNames: { [key: string]: string } = {
  japanese: 'Tiếng Nhật',
  chinese: 'Tiếng Trung', 
  english: 'Tiếng Anh',
  korean: 'Tiếng Hàn',
  vietnamese: 'Tiếng Việt',
};

// Level ordering for proper progression (low to high)
const levelOrder: { [key: string]: string[] } = {
  japanese: ['n5', 'n4', 'n3', 'n2', 'n1'],
  english: ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'],
  chinese: ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6'],
  korean: ['level1', 'level2', 'level3', 'level4', 'level5', 'level6'],
  vietnamese: ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'],
};

export default async function LanguageCoursesPage({ params }: { params: { language: string } }) {
  const { language } = params;
  
  // Validate language parameter
  if (!languageDisplayNames[language]) {
    notFound();
  }

  // Get courses for this language from database
  const courses = await prisma.course.findMany({
    where: {
      language: language,
    },
    include: {
      _count: {
        select: {
          lessons: true,
        },
      },
    },
  });

  if (courses.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">{languageDisplayNames[language]}</h1>
        <p className="text-muted-foreground">Chưa có khóa học nào cho ngôn ngữ này.</p>
        <Link href="/courses" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Quay lại chọn ngôn ngữ
        </Link>
      </div>
    );
  }

  // Sort courses by level order (low to high)
  const orderedLevels = levelOrder[language] || [];
  const sortedCourses = courses.sort((a, b) => {
    const aIndex = orderedLevels.indexOf(a.level);
    const bIndex = orderedLevels.indexOf(b.level);
    return aIndex - bIndex;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground mb-4">
          Khóa học {languageDisplayNames[language]}
        </h1>
        <p className="text-lg text-muted-foreground">
          Chọn cấp độ phù hợp với trình độ của bạn để bắt đầu học.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Các cấp độ được sắp xếp từ thấp đến cao: <strong>Sơ cấp → Trung cấp → Nâng cao → Thành thạo</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedCourses.map((course, index) => (
          <Link key={course.id} href={`/courses/${language}/${course.level}`} passHref>
            <Card className="h-full flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer relative overflow-hidden">
              {/* Progress indicator */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" 
                   style={{ width: `${((index + 1) / sortedCourses.length) * 100}%` }}></div>
              
              <CardHeader className="flex-grow">
                <CardTitle className="text-2xl font-bold text-center mb-2">
                  {course.level.toUpperCase()}
                </CardTitle>
                <CardDescription className="text-center text-base mb-4">
                  {course.description}
                </CardDescription>
                
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{course._count.lessons} bài học</span>
                  <span className="px-2 py-1 bg-primary/10 rounded-full text-primary">
                    Cấp độ {index + 1}
                  </span>
                </div>
              </CardHeader>
              
              <div className="p-6 pt-0">
                <div className="w-full bg-primary text-primary-foreground text-center py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Bắt đầu học
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/courses" className="text-primary hover:underline font-semibold">
          ← Quay lại chọn ngôn ngữ
        </Link>
      </div>
    </div>
  );
}