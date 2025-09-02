'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Example {
  japanese: string;
  kanji: string;
  vietnamese: string;
  english: string;
}

interface GrammarPattern {
  id: number;
  pattern: string;
  meaning: string;
  explanation: string;
  examples: Example[];
  notes?: string[];
}

interface LessonData {
  lessonNumber: number;
  japaneseTitle: string;
  vietnameseTitle: string;
  englishTitle: string;
  summary: {
    title: string;
    content: string;
    keyPoints: string[];
  };
  grammarPatterns: GrammarPattern[];
  estimatedTime?: string; // Add estimatedTime
  difficulty?: string; // Add difficulty
}

interface GrammarLessonClientProps {
  initialLessonData: LessonData | null;
}

export default function GrammarLessonClient({ initialLessonData }: GrammarLessonClientProps) {
  const params = useParams();
  const lessonNumber = params?.lessonNumber as string;

  const [lessonData, setLessonData] = useState<LessonData | null>(initialLessonData);
  const [loading, setLoading] = useState(false); // Data is already loaded
  const [expandedExamples, setExpandedExamples] = useState<Record<string, boolean>>({});

  const toggleExample = (grammarId: number, exampleIndex: number) => {
    const key = `${grammarId}-${exampleIndex}`;
    setExpandedExamples(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy dữ liệu ngữ pháp</h1>
          <p className="text-gray-600">Có vẻ như bài học số {lessonNumber} không tồn tại.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-extrabold text-gray-900 mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          📚 Ngữ pháp N5 - Bài {lessonData.lessonNumber}
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {lessonData.vietnameseTitle} ({lessonData.japaneseTitle})
        </motion.p>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Tóm tắt bài học</h2>
          <p className="text-gray-800 text-lg leading-relaxed">{lessonData.summary?.content}</p>
          {lessonData.estimatedTime && lessonData.difficulty && (
            <p className="text-gray-600 text-sm mt-2">Thời gian ước tính: {lessonData.estimatedTime} | Độ khó: {lessonData.difficulty}</p>
          )}
        </div>

        <div className="space-y-10">
          {lessonData.grammarPatterns.map(grammar => (
            <motion.div
              key={grammar.id}
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + grammar.id * 0.1 }}
            >
              <h3 className="text-3xl font-bold text-purple-700 mb-4">{grammar.pattern}</h3>
              <p className="text-xl font-semibold text-green-700 mb-4">{grammar.meaning}</p>
              <p className="text-gray-800 text-lg leading-relaxed mb-4">{grammar.explanation}</p>

              {grammar.notes && Array.isArray(grammar.notes) && grammar.notes.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Lưu ý:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {grammar.notes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {grammar.examples && grammar.examples.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Ví dụ:</h4>
                  <div className="space-y-3">
                    {grammar.examples.map((example, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <button
                          onClick={() => toggleExample(grammar.id, idx)}
                          className="w-full text-left flex justify-between items-center text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          <span>{example.japanese}</span>
                          {expandedExamples[`${grammar.id}-${idx}`] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                        <AnimatePresence>
                          {expandedExamples[`${grammar.id}-${idx}`] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-2 pt-2 border-t border-gray-200"
                            >
                              <p className="text-gray-700 text-base mb-1">
                                <span className="font-semibold">Kanji:</span> {example.kanji}
                              </p>
                              <p className="text-gray-700 text-base">
                                <span className="font-semibold">Nghĩa:</span> {example.vietnamese}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
