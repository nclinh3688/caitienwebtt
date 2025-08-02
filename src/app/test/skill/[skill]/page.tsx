import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Test {
  id: string;
  title: string;
  description?: string;
  skill?: string;
}

export default async function SkillTestsPage({ params }: { params: { skill: string } }) {
  const { skill } = params;
  let tests: Test[] = [];
  let error: string | null = null;

  const skillDisplayNames: { [key: string]: string } = {
    listening: 'Nghe',
    reading: 'Đọc',
    grammar: 'Ngữ pháp',
    vocabulary: 'Từ vựng',
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/test/skill/${skill}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch tests');
    }
    tests = await response.json();
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          Bài kiểm tra kỹ năng {skillDisplayNames[skill] || skill}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Chọn bài kiểm tra bạn muốn làm.
        </p>
      </div>
      {error && <p className="text-red-500 text-center">Lỗi: {error}</p>}
      {!error && tests.length === 0 && <p className="text-center text-muted-foreground">Không tìm thấy bài kiểm tra nào cho kỹ năng này.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tests.map((test) => (
          <Link key={test.id} href={`/test/skill/${skill}/${test.id}`} passHref>
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer h-full flex flex-col items-center justify-center p-6">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground">{test.title}</CardTitle>
                <CardDescription className="mt-2 text-base text-muted-foreground">{test.description || ''}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
