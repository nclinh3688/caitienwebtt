export default function KoreanLevelPage({ params }: { params: { level: string } }) {
  return (
    <div>
      <h1>Danh sách bài học TOPIK {params.level.toUpperCase()}</h1>
      <p>Danh sách các bài học cho cấp độ này sẽ hiển thị ở đây.</p>
    </div>
  );
} 