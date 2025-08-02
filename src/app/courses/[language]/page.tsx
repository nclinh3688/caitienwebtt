import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import getPrismaClient from '@/lib/prisma';

type PageProps = {
  params: {
    language: string;
  };
};

export default async function LanguageLevelsPage({ params }: PageProps) {
  const { language } = params;
  const prisma = getPrismaClient();

  // Get distinct levels for the selected language
  const levels = await prisma.course.findMany({
    where: {
      language: language,
    },
    distinct: ['level'],
    select: {
      level: true,
    },
    orderBy: {
      level: 'asc', // Order levels alphabetically or by a custom order if available
    },
  });

  if (levels.length === 0) {
    notFound(); // If no levels found for this language, show 404
  }

  // Map level IDs to display names (you might want a more robust mapping later)
  const levelDisplayNames: { [key: string]: string } = {
    n5: 'N5 (Sơ cấp)',
    n4: 'N4 (Sơ cấp)',
    n3: 'N3 (Trung cấp)',
    a1: 'A1 (Cơ bản)',
    a2: 'A2 (Cơ bản)',
    b1: 'B1 (Trung cấp)',
    hsk1: 'HSK 1 (Sơ cấp)',
    hsk2: 'HSK 2 (Sơ cấp)',
    topik1: 'TOPIK I (Sơ cấp)',
    topik2: 'TOPIK II (Trung cấp)',
    cb: 'Cơ bản',
    nc: 'Nâng cao',
  };

  // Capitalize the first letter of the language for display
  const displayLanguage = language.charAt(0).toUpperCase() + language.slice(1);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          Chọn Cấp Độ cho {displayLanguage}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Khám phá các cấp độ học tập của {displayLanguage}.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {levels.map((lvl: any) => (
          <Link key={lvl.level} href={`/courses/${language}/${lvl.level}`} passHref>
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer h-full flex flex-col items-center justify-center p-6">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground">{levelDisplayNames[lvl.level] || lvl.level.toUpperCase()}</CardTitle>
                <CardDescription className="mt-2 text-base text-muted-foreground">Bắt đầu học cấp độ này.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}