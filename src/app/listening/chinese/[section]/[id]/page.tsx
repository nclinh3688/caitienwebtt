export default function ChineseListeningDetailPage({ params }: { params: { section: string; id: string } }) {
  return (
    <div>
      <h1>Luyện nghe tiếng Trung - {params.section} #{params.id}</h1>
      <p>Nội dung chi tiết bài luyện nghe sẽ hiển thị ở đây (audio, transcript, quiz, AI hỗ trợ...)</p>
    </div>
  );
} 