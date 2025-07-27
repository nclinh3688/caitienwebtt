import Link from "next/link";
const hskLevels = ["HSK1", "HSK2", "HSK3", "HSK4", "HSK5", "HSK6"];
export default function ChineseCoursesPage() {
  return (
    <div>
      <h1>Khóa học tiếng Trung (HSK)</h1>
      <ul>
        {hskLevels.map(level => (
          <li key={level}>
            <Link href={`/courses/chinese/${level.toLowerCase()}`}>{level}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 