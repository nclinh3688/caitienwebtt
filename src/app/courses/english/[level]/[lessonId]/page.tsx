export default function Page({ params }: { params: { level: string; lessonId: string } }) {
  return (
    <div>
      <h1>Bài học tiếng Anh - {params.level.toUpperCase()} - Bài {params.lessonId}</h1>
      <p>Nội dung chi tiết bài học sẽ hiển thị ở đây (từ vựng, ngữ pháp, luyện nghe, luyện nói, hội thoại, bài tập, video, audio, AI hỗ trợ...)</p>
    </div>
  );
} 