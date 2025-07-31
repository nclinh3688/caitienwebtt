import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

// Language display names mapping
const languageDisplayNames: { [key: string]: string } = {
  japanese: 'Tiếng Nhật',
  chinese: 'Tiếng Trung', 
  english: 'Tiếng Anh',
  korean: 'Tiếng Hàn',
  vietnamese: 'Tiếng Việt',
};

export default async function CourseLevelPage({ 
  params 
}: { 
  params: { language: string; level: string } 
}) {
  const { language, level } = params;
  
  // Validate language parameter
  if (!languageDisplayNames[language]) {
    notFound();
  }

  // Get course and lessons from database
  const course = await prisma.course.findFirst({
    where: {
      language: language,
      level: level,
    },
    include: {
      lessons: {
        orderBy: {
          order: 'asc', // Order lessons by their sequence
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  // Get level difficulty indicator
  const getLevelDifficulty = (language: string, level: string) => {
    const difficulties: { [key: string]: { [key: string]: { color: string; label: string } } } = {
      japanese: {
        n5: { color: 'bg-green-500', label: 'Sơ cấp' },
        n4: { color: 'bg-green-600', label: 'Sơ cấp' },
        n3: { color: 'bg-yellow-500', label: 'Trung cấp' },
        n2: { color: 'bg-orange-500', label: 'Trung cấp cao' },
        n1: { color: 'bg-red-500', label: 'Nâng cao' },
      },
      english: {
        a1: { color: 'bg-green-400', label: 'Sơ cấp' },
        a2: { color: 'bg-green-500', label: 'Sơ cấp' },
        b1: { color: 'bg-yellow-500', label: 'Trung cấp' },
        b2: { color: 'bg-orange-500', label: 'Trung cấp cao' },
        c1: { color: 'bg-red-500', label: 'Nâng cao' },
        c2: { color: 'bg-red-600', label: 'Thành thạo' },
      },
      chinese: {
        hsk1: { color: 'bg-green-400', label: 'Sơ cấp' },
        hsk2: { color: 'bg-green-500', label: 'Sơ cấp' },
        hsk3: { color: 'bg-yellow-500', label: 'Trung cấp' },
        hsk4: { color: 'bg-orange-500', label: 'Trung cấp cao' },
        hsk5: { color: 'bg-red-500', label: 'Nâng cao' },
        hsk6: { color: 'bg-red-600', label: 'Thành thạo' },
      },
      korean: {
        level1: { color: 'bg-green-400', label: 'Sơ cấp' },
        level2: { color: 'bg-green-500', label: 'Sơ cấp' },
        level3: { color: 'bg-yellow-500', label: 'Trung cấp' },
        level4: { color: 'bg-orange-500', label: 'Trung cấp cao' },
        level5: { color: 'bg-red-500', label: 'Nâng cao' },
        level6: { color: 'bg-red-600', label: 'Thành thạo' },
      },
      vietnamese: {
        a1: { color: 'bg-green-400', label: 'Sơ cấp' },
        a2: { color: 'bg-green-500', label: 'Sơ cấp' },
        b1: { color: 'bg-yellow-500', label: 'Trung cấp' },
        b2: { color: 'bg-orange-500', label: 'Trung cấp cao' },
        c1: { color: 'bg-red-500', label: 'Nâng cao' },
        c2: { color: 'bg-red-600', label: 'Thành thạo' },
      },
    };
    
    return difficulties[language]?.[level] || { color: 'bg-gray-500', label: 'Không xác định' };
  };

  const difficulty = getLevelDifficulty(language, level);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Course Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
            {languageDisplayNames[language]} - {level.toUpperCase()}
          </h1>
          <Badge className={`${difficulty.color} text-white text-sm px-3 py-1`}>
            {difficulty.label}
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground mb-2">
          {course.description}
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            📚 {course.lessons.length} bài học
          </span>
          <span className="flex items-center gap-2">
            ⏱️ Thời gian ước tính: {Math.ceil(course.lessons.length * 1.5)} giờ
          </span>
        </div>
      </div>

      {/* Course Progress */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-xl">Tiến độ khóa học</CardTitle>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">0 / {course.lessons.length} bài học đã hoàn thành</p>
          </CardHeader>
        </Card>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">Danh sách bài học</h2>
        
        {course.lessons.map((lesson, index) => (
          <Link key={lesson.id} href={`/courses/${language}/${level}/lessons/${lesson.id}`} passHref>
            <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-xs">
                        Bài {lesson.order}
                      </Badge>
                      <h3 className="text-lg font-semibold">{lesson.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {lesson.description || 'Chưa có mô tả'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 ml-4">
                    <div className="text-right">
                      <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                      </div>
                    </div>
                    <div className="text-blue-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-12">
        <Link href={`/courses/${language}`} className="text-primary hover:underline font-semibold">
          ← Quay lại chọn cấp độ
        </Link>
        
        {course.lessons.length > 0 && (
          <Link 
            href={`/courses/${language}/${level}/lessons/${course.lessons[0].id}`}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Bắt đầu học bài đầu tiên →
          </Link>
        )}
      </div>
    </div>
  );
}