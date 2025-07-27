// scripts/generate-lesson-data.js
// Script tạo dữ liệu bài học mẫu cho các ngôn ngữ
import fs from 'fs';
import path from 'path';

const sampleLesson = {
  title: "Bài 1",
  vocabGrammar: {
    vocab: [
      { word: "こんにちは", meaning: "Xin chào" },
      { word: "ありがとう", meaning: "Cảm ơn" }
    ],
    grammar: [
      { point: "です", explanation: "Dùng để kết thúc câu khẳng định." }
    ]
  },
  kanji: [
    { character: "日", onyomi: "ニチ", kunyomi: "ひ", meaning: "ngày, mặt trời" }
  ],
  conversation: [
    { speaker: "A", text: "こんにちは！" },
    { speaker: "B", text: "こんにちは。お元気ですか？" }
  ],
  practice: [
    { question: "Từ 'ありがとう' nghĩa là gì?", options: ["Xin chào", "Cảm ơn", "Tạm biệt"], answer: 1 }
  ],
  review: {
    summary: "Ôn tập lại từ vựng, ngữ pháp và kanji đã học trong bài 1."
  },
  video: "https://www.youtube.com/embed/C35DrtPlUbc",
  audio: "/audio/jlpt-n5-lesson-1-conversation.mp3"
};

function generateLessonFile(lang, level, lessonId) {
  const dir = path.join(__dirname, `../src/data/${lang}/${level}`);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `lesson-${lessonId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(sampleLesson, null, 2), 'utf8');
  console.log(`Generated: ${filePath}`);
}

// Ví dụ: sinh dữ liệu cho tiếng Nhật JLPT N5 bài 1
generateLessonFile('jlpt-n5', '', 1);

// Có thể mở rộng cho nhiều ngôn ngữ, cấp độ, bài học
// generateLessonFile('english', 'ielts', 1);
// generateLessonFile('korean', 'topik1', 1);