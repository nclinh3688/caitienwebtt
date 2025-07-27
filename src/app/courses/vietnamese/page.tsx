import Link from "next/link";
const vnLevels = ["Sơ cấp", "Trung cấp", "Cao cấp", "Giao tiếp"];
export default function VietnameseCoursesPage() {
  return (
    <div>
      <h1>Khóa học tiếng Việt cho người nước ngoài</h1>
      <ul>
        {vnLevels.map(level => (
          <li key={level}>
            <Link href={`/courses/vietnamese/${level.toLowerCase().replace(/ /g, "-")}`}>{level}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 