import Link from "next/link";

export default function Page({ params }: { params: { level: string } }) {
  // Tạm thời hardcode 10 bài học mẫu
  const lessons = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Bài học ${i + 1}`,
  }));

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee" }}>
      <h1 style={{ textAlign: "center", marginBottom: 32 }}>Danh sách bài học tiếng Anh - {params.level.toUpperCase()}</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {lessons.map(lesson => (
          <li key={lesson.id} style={{ margin: "16px 0" }}>
            <Link href={`/courses/english/${params.level}/${lesson.id}`} style={{ fontSize: 18, color: "#0070f3", textDecoration: "none" }}>
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 