import Link from 'next/link';
import prisma from '@/lib/prisma';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default async function CoursesPage() {
  // Get unique languages from the database
  const languages = await prisma.course.findMany({
    distinct: ['language'],
    select: {
      language: true,
    },
  });

  // Map language IDs to display names (you might want a more robust mapping later)
  const languageDisplayNames: { [key: string]: string } = {
    japanese: 'Tiếng Nhật',
    chinese: 'Tiếng Trung',
    english: 'Tiếng Anh',
    korean: 'Tiếng Hàn',
    vietnamese: 'Tiếng Việt',
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          Chọn Ngôn Ngữ Bạn Muốn Học
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Khám phá các khóa học đa dạng của chúng tôi.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {languages.map((lang: any) => (
          <Link key={lang.language} href={`/courses/${lang.language}`} passHref>
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer h-full flex flex-col items-center justify-center p-6">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground">{languageDisplayNames[lang.language] || lang.language}</CardTitle>
                <CardDescription className="mt-2 text-base text-muted-foreground">Bắt đầu học {languageDisplayNames[lang.language] || lang.language} ngay hôm nay!</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
