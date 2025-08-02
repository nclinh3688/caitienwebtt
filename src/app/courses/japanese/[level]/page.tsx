import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import getPrismaClient from '@/lib/prisma';

type PageProps = {
  params: {
    level: string;
  };
};

const LevelPage = async ({ params }: PageProps) => {
  const { level } = params;

  // Use static data for now to avoid Prisma issues during build
  const course = {
    title: `Japanese ${level.toUpperCase()}`,
    description: `Learn Japanese at ${level.toUpperCase()} level`,
    lessons: [
      { id: 'lesson-1', title: 'Lesson 1', description: 'Basic introduction' },
      { id: 'lesson-2', title: 'Lesson 2', description: 'Grammar basics' },
      { id: 'lesson-3', title: 'Lesson 3', description: 'Vocabulary building' }
    ]
  };

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          {course.title} Lessons
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {course.description}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {course.lessons.map((lesson: any) => (
          <Link key={lesson.id} href={`/courses/japanese/${level}/${lesson.id}`} passHref>
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">{lesson.title}</CardTitle>
                <CardDescription className="mt-2 text-base text-muted-foreground flex-grow">{lesson.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LevelPage;