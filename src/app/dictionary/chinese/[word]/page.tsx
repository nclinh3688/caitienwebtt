export default function ChineseDictionaryWordPage({ params }: { params: { word: string } }) {
  return (
    <div>
      <h1>Kết quả tra cứu tiếng Trung: {params.word}</h1>
      <p>Hiển thị nghĩa, pinyin, ví dụ, phát âm, AI giải thích cho từ này ở đây.</p>
    </div>
  );
} 