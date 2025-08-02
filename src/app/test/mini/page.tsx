import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function MiniTestPage() {
  // In a real application, you might fetch a list of mini-tests here
  // or guide the user to mini-tests related to their current lesson progress.
  const miniTests = [
    { id: 'lesson-1-quiz', title: 'Mini Test Bài 1', description: 'Kiểm tra nhanh kiến thức Bài 1.', lessonId: 'N5-B01' },
    { id: 'lesson-2-quiz', title: 'Mini Test Bài 2', description: 'Kiểm tra nhanh kiến thức Bài 2.', lessonId: 'N5-B02' },
    // Add more mini tests as needed
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          Mini Test
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Các bài kiểm tra ngắn giúp củng cố kiến thức sau mỗi bài học.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {miniTests.map((test) => (
          <Link key={test.id} href={`/lessons/${test.lessonId ? 'n5' : ''}/${test.lessonId}/test`} passHref> {/* Assuming N5 for now, adjust as needed */}
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer h-full flex flex-col items-center justify-center p-6">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground">{test.title}</CardTitle>
                <CardDescription className="mt-2 text-base text-muted-foreground">{test.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
