import Link from "next/link";
const englishGoals = ["TOEIC", "IELTS", "Giao tiếp", "Thiếu nhi"];
export default function EnglishCoursesPage() {
  return (
    <div>
      <h1>Khóa học tiếng Anh</h1>
      <ul>
        {englishGoals.map(goal => (
          <li key={goal}>
            <Link href={`/courses/english/${goal.toLowerCase().replace(/ /g, "-")}`}>{goal}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 