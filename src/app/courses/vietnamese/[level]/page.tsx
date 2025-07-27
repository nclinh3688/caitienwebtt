export default function VietnameseLevelPage({ params }: { params: { level: string } }) {
  return (
    <div>
      <h1>Danh sách bài học tiếng Việt - {params.level.toUpperCase()}</h1>
      <p>Danh sách các bài học cho trình độ này sẽ hiển thị ở đây.</p>
    </div>
  );
} 