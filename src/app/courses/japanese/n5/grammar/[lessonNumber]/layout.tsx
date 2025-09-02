import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
  const lessonsDirectory = path.join(process.cwd(), 'src', 'data', 'jlpt-n5');
  const fileNames = fs.readdirSync(lessonsDirectory);

  return fileNames
    .filter(fileName => fileName.endsWith('.json') && fileName.startsWith('B'))
    .map(fileName => ({
      lessonNumber: fileName.replace('B', '').replace('.json', '').padStart(2, '0'),
    }));
}

export default function GrammarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
