import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const prisma = new PrismaClient();

export default async function LevelLessonsPage({ params }: { params: { level: string } }) {
  const { level } = params;

  const lessons = await prisma.lesson.findMany({
    where: { course: { level: level } }, // Filter lessons by course level
    orderBy: { order: 'asc' }, // Order lessons by their defined order
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          Bài học cấp độ {level.toUpperCase()}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Chọn bài học bạn muốn bắt đầu.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {lessons.map((lesson: any) => (
          <Link key={lesson.id} href={`/lessons/${level}/${lesson.id}`} passHref>
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer h-full flex flex-col items-center justify-center p-6">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground">{lesson.title}</CardTitle>
                <CardDescription className="mt-2 text-base text-muted-foreground">{lesson.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
