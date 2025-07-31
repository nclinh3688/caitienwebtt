'use client';

import { Quiz, QuizQuestion } from '@/components/ui/quiz';

// Sample N5 Quiz Questions
const n5Questions: QuizQuestion[] = [
  {
    id: 'n5-1',
    type: 'multiple-choice',
    level: 'N5',
    category: 'vocabulary',
    question: '"Watashi" có nghĩa là gì?',
    questionJapanese: '私',
    options: ['Bạn', 'Tôi', 'Anh ấy', 'Cô ấy'],
    correctAnswer: 1,
    explanation: '私 (watashi) có nghĩa là "tôi" - đại từ nhân xưng ngôi thứ nhất.',
    hint: 'Đây là từ đầu tiên mà học viên thường học trong tiếng Nhật',
    difficulty: 1,
    tags: ['đại từ', 'cơ bản']
  },
  {
    id: 'n5-2',
    type: 'kanji-reading',
    level: 'N5',
    category: 'kanji',
    question: 'Chọn cách đọc đúng của kanji này:',
    questionJapanese: '日本',
    options: ['にほん', 'にっぽん', 'ひほん', 'じっぽん'],
    correctAnswer: 0,
    explanation: '日本 đọc là "にほん" (Nihon) - có nghĩa là "Nhật Bản".',
    hint: 'Đây là tên nước mà bạn đang học ngôn ngữ',
    difficulty: 2,
    tags: ['kanji', 'địa danh']
  },
  {
    id: 'n5-3',
    type: 'multiple-choice',
    level: 'N5',
    category: 'grammar',
    question: 'Hoàn thành câu: "私は学生___"',
    options: ['が', 'を', 'です', 'に'],
    correctAnswer: 2,
    explanation: '"私は学生です" có nghĩa là "Tôi là học sinh". です là dạng lịch sự của だ.',
    hint: 'Từ này được dùng để kết thúc câu một cách lịch sự',
    difficulty: 2,
    tags: ['ngữ pháp', 'です/だ']
  },
  {
    id: 'n5-4',
    type: 'fill-blank',
    level: 'N5',
    category: 'vocabulary',
    question: 'Điền từ thích hợp: "おはよう___" (Chào buổi sáng)',
    correctAnswer: 'ございます',
    explanation: '"おはようございます" là cách chào buổi sáng lịch sự trong tiếng Nhật.',
    hint: 'Từ này thể hiện sự lịch sự và tôn trọng',
    difficulty: 2,
    tags: ['chào hỏi', 'lịch sự']
  },
  {
    id: 'n5-5',
    type: 'multiple-choice',
    level: 'N5',
    category: 'vocabulary',
    question: 'Từ nào có nghĩa là "ăn"?',
    options: ['のむ', 'たべる', 'みる', 'きく'],
    correctAnswer: 1,
    explanation: 'たべる (taberu) có nghĩa là "ăn". のむ là uống, みる là nhìn, きく là nghe.',
    hint: 'Đây là một trong những động từ cơ bản nhất',
    difficulty: 1,
    tags: ['động từ', 'cơ bản']
  },
  {
    id: 'n5-6',
    type: 'kanji-reading',
    level: 'N5',
    category: 'kanji',
    question: 'Chọn cách đọc đúng:',
    questionJapanese: '時間',
    options: ['じかん', 'じげん', 'しかん', 'しげん'],
    correctAnswer: 0,
    explanation: '時間 đọc là "じかん" (jikan) có nghĩa là "thời gian".',
    hint: 'Từ này bạn thường thấy khi nói về thời gian',
    difficulty: 3,
    tags: ['kanji', 'thời gian']
  },
  {
    id: 'n5-7',
    type: 'multiple-choice',
    level: 'N5',
    category: 'grammar',
    question: 'Chọn trợ từ đúng: "学校___行きます"',
    options: ['を', 'に', 'で', 'から'],
    correctAnswer: 1,
    explanation: '"学校に行きます" có nghĩa là "đi đến trường". に chỉ điểm đến.',
    hint: 'Trợ từ này chỉ hướng đến một địa điểm',
    difficulty: 2,
    tags: ['trợ từ', 'に']
  },
  {
    id: 'n5-8',
    type: 'multiple-choice',
    level: 'N5',
    category: 'vocabulary',
    question: '"Sumimasen" được dùng khi nào?',
    options: ['Cảm ơn', 'Xin lỗi', 'Chào tạm biệt', 'Chúc mừng'],
    correctAnswer: 1,
    explanation: '"すみません" (sumimasen) có nghĩa là "xin lỗi" hoặc "cho phép tôi".',
    hint: 'Từ này thể hiện sự xin lỗi hoặc làm phiền',
    difficulty: 1,
    tags: ['lịch sự', 'xin lỗi']
  },
  {
    id: 'n5-9',
    type: 'kanji-reading',
    level: 'N5',
    category: 'kanji',
    question: 'Đọc kanji sau:',
    questionJapanese: '水',
    options: ['みず', 'すい', 'みつ', 'しず'],
    correctAnswer: 0,
    explanation: '水 đọc là "みず" (mizu) có nghĩa là "nước".',
    hint: 'Chất lỏng trong suốt mà chúng ta uống hàng ngày',
    difficulty: 2,
    tags: ['kanji', 'đồ uống']
  },
  {
    id: 'n5-10',
    type: 'multiple-choice',
    level: 'N5',
    category: 'grammar',
    question: 'Dạng quá khứ của "です" là gì?',
    options: ['でした', 'だった', 'である', 'だろう'],
    correctAnswer: 0,
    explanation: 'Dạng quá khứ lịch sự của "です" là "でした".',
    hint: 'Dạng quá khứ lịch sự thường kết thúc bằng した',
    difficulty: 3,
    tags: ['ngữ pháp', 'quá khứ']
  }
];

export default function N5QuizPage() {
  const handleQuizComplete = (results: any) => {
    console.log('Quiz completed:', results);
    // In real app, save results to database
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz JLPT N5</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Kiểm tra kiến thức cơ bản về từ vựng, ngữ pháp và kanji cấp độ N5. 
          Thời gian làm bài: 15 phút.
        </p>
      </div>

      <Quiz
        questions={n5Questions}
        title="Quiz cấp độ N5 - Kiến thức cơ bản"
        timeLimit={15}
        showProgress={true}
        showHints={true}
        randomOrder={true}
        onComplete={handleQuizComplete}
      />

      <div className="mt-8 text-center">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 Mẹo làm bài:</h3>
          <ul className="text-left text-blue-700 space-y-2">
            <li>• Đọc kỹ đề bài trước khi chọn đáp án</li>
            <li>• Sử dụng gợi ý khi cần thiết</li>
            <li>• Lưu ý phân biệt hiragana, katakana và kanji</li>
            <li>• Chú ý ngữ cảnh của câu</li>
            <li>• Không nên vội vàng, hãy suy nghĩ kỹ</li>
          </ul>
        </div>
      </div>
    </div>
  );
}