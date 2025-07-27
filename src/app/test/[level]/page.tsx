export default function TestLevelPage({ params }: { params: { level: string } }) {
  return (
    <div>
      <h1>Đề thi thử JLPT {params.level.toUpperCase()}</h1>
      <p>Danh sách đề thi thử cho cấp độ này sẽ hiển thị ở đây.</p>
    </div>
  );
} 