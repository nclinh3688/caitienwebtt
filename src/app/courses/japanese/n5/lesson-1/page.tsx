'use client';

import { useEffect, useState } from 'react';

export default function Lesson1Page() {
  const [lesson, setLesson] = useState<any>(null);
  const [tab, setTab] = useState('vocabulary');

  useEffect(() => {
    fetch('/src/data/jlpt-n5/lesson-1.json')
      .then(res => res.json())
      .then(setLesson);
  }, []);

  if (!lesson) return <div className="p-8 text-center text-gray-500">Đang tải dữ liệu bài học...</div>;

  const sectionTabs = lesson.sections.map((section: any) => ({
    key: section.type,
    label: section.title
  }));

  const renderSection = (type: string) => {
    const section = lesson.sections.find((s: any) => s.type === type);
    if (!section) return null;
    switch (type) {
      case 'vocabulary':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg bg-white">
              <thead>
                <tr className="bg-green-100">
                  <th className="p-2 border">Kana</th>
                  <th className="p-2 border">Kanji</th>
                  <th className="p-2 border">Nghĩa</th>
                  <th className="p-2 border">Ví dụ</th>
                  <th className="p-2 border">Dịch</th>
                </tr>
              </thead>
              <tbody>
                {section.items.map((item: any, i: number) => (
                  <tr key={i} className="even:bg-green-50">
                    <td className="p-2 border font-bold text-lg">{item.kana}</td>
                    <td className="p-2 border text-green-700">{item.kanji}</td>
                    <td className="p-2 border">{item.meaning}</td>
                    <td className="p-2 border">{item.example || '-'}</td>
                    <td className="p-2 border">{item.translation || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'grammar':
        return (
          <div className="space-y-6">
            {section.points.map((point: any, i: number) => (
              <div key={i} className="bg-green-50 rounded-lg p-4">
                <div className="font-bold text-green-800 mb-2">{point.structure}</div>
                <div className="mb-2 text-gray-700">{point.explanation}</div>
                <ul className="list-disc ml-6">
                  {point.examples.map((ex: any, j: number) => (
                    <li key={j} className="mb-1">
                      <span className="font-medium">{ex.jp}</span> <span className="text-gray-500">({ex.vi})</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      case 'kanji':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg bg-white">
              <thead>
                <tr className="bg-green-100">
                  <th className="p-2 border">Kanji</th>
                  <th className="p-2 border">Onyomi</th>
                  <th className="p-2 border">Kunyomi</th>
                  <th className="p-2 border">Nghĩa</th>
                  <th className="p-2 border">Ví dụ</th>
                </tr>
              </thead>
              <tbody>
                {section.items.map((item: any, i: number) => (
                  <tr key={i} className="even:bg-green-50">
                    <td className="p-2 border font-bold text-lg text-green-700">{item.kanji}</td>
                    <td className="p-2 border">{item.onyomi}</td>
                    <td className="p-2 border">{item.kunyomi}</td>
                    <td className="p-2 border">{item.meaning}</td>
                    <td className="p-2 border">{item.examples?.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'conversation':
        return (
          <div className="space-y-4">
            <audio controls src={section.audio} className="mb-4 w-full max-w-md mx-auto" />
            <div className="bg-green-50 rounded-lg p-4">
              {section.dialogues.map((d: any, i: number) => (
                <div key={i} className="mb-2 flex gap-2">
                  <span className="font-bold text-green-700">{d.speaker}:</span>
                  <span>{d.jp}</span>
                  <span className="text-gray-500">({d.vi})</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'listening':
        return (
          <div className="space-y-4">
            <audio controls src={section.audio} className="mb-4 w-full max-w-md mx-auto" />
            <div className="bg-green-50 rounded-lg p-4">
              {section.questions.map((q: any, i: number) => (
                <div key={i} className="mb-4">
                  <div className="font-semibold mb-2">Câu hỏi {i + 1}: {q.question}</div>
                  <ul className="list-disc ml-6">
                    {q.choices.map((c: string, j: number) => (
                      <li key={j} className={j === q.answer ? 'text-green-700 font-bold' : ''}>{c}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      case 'exercise':
        return (
          <div className="space-y-4">
            {section.questions.map((q: any, i: number) => (
              <div key={i} className="bg-green-50 rounded-lg p-4">
                <div className="font-semibold mb-2">{q.question}</div>
                <ul className="list-disc ml-6 mb-2">
                  {q.choices.map((c: string, j: number) => (
                    <li key={j} className={j === q.answer ? 'text-green-700 font-bold' : ''}>{c}</li>
                  ))}
                </ul>
                {q.explanation && <div className="text-gray-500 text-sm">Giải thích: {q.explanation}</div>}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center">
        {lesson.title}
      </h1>
      <div className="text-center text-gray-600 mb-8">{lesson.description}</div>
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {sectionTabs.map((tabItem: any) => (
          <button
            key={tabItem.key}
            onClick={() => setTab(tabItem.key)}
            className={`px-4 py-2 rounded-lg font-medium border transition-colors ${tab === tabItem.key ? 'bg-green-600 text-white border-green-700' : 'bg-white text-green-700 border-green-300 hover:bg-green-50'}`}
          >
            {tabItem.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-4 md:p-8">
        {renderSection(tab)}
      </div>
    </div>
  );
} 