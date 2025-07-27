import Link from "next/link";
const topikLevels = ["TOPIK1", "TOPIK2", "TOPIK3", "TOPIK4", "TOPIK5", "TOPIK6"];
export default function KoreanCoursesPage() {
  return (
    <div>
      <h1>Khóa học tiếng Hàn (TOPIK)</h1>
      <ul>
        {topikLevels.map(level => (
          <li key={level}>
            <Link href={`/courses/korean/${level.toLowerCase()}`}>{level}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 