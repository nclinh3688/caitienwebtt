export default function DictionaryWordPage({ params }: { params: { word: string } }) {
  return (
    <div>
      <h1>Kết quả tra cứu: {params.word}</h1>
      <p>Hiển thị nghĩa, kanji, ví dụ, phát âm cho từ này ở đây.</p>
    </div>
  );
} 