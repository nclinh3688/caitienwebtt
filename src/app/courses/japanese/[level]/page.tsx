import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import prisma from '@/lib/prisma';

type PageProps = {
  params: {
    level: string;
  };
};

const LevelPage = async ({ params }: PageProps) => {
  const { level } = params;

  const course = await prisma.course.findUnique({
    where: {
      language_level: { // Unique constraint defined in schema
        language: 'japanese',
        level: level,
      },
    },
    include: {
      lessons: { // Include lessons related to this course
        orderBy: {
          order: 'asc', // Order lessons by the 'order' field
        },
      },
    },
  });

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