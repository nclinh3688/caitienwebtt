import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SkillTestPage() {
  const skills = [
    { id: 'listening', name: 'Nghe', description: 'Kiểm tra kỹ năng nghe của bạn.' },
    { id: 'reading', name: 'Đọc', description: 'Kiểm tra kỹ năng đọc hiểu của bạn.' },
    { id: 'grammar', name: 'Ngữ pháp', description: 'Kiểm tra kiến thức ngữ pháp của bạn.' },
    { id: 'vocabulary', name: 'Từ vựng', description: 'Kiểm tra vốn từ vựng của bạn.' },
    // Add more skills as needed
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          Chọn Kỹ Năng Bạn Muốn Kiểm Tra
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tập trung vào các kỹ năng cụ thể để cải thiện.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill) => (
          <Link key={skill.id} href={`/test/skill/${skill.id}`} passHref>
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer h-full flex flex-col items-center justify-center p-6">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-foreground">{skill.name}</CardTitle>
                <CardDescription className="mt-2 text-base text-muted-foreground">{skill.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
