'use client';

import { useState } from 'react';

export default function GrammarContent({ lessonData }: { lessonData: any }) {
  const [showExamples, setShowExamples] = useState<{ [key: string]: boolean }>({});
  const [grammarNotes, setGrammarNotes] = useState<{ [key: string]: string }>({});

  const toggleExamples = (patternId: string) => {
    setShowExamples(prev => ({
      ...prev,
      [patternId]: !prev[patternId]
    }));
  };

  const saveGrammarNote = (patternId: string, content: string) => {
    const newGrammarNotes = { ...grammarNotes, [patternId]: content };
    setGrammarNotes(newGrammarNotes);
    localStorage.setItem('n5-grammar-lesson7-grammar-notes', JSON.stringify(newGrammarNotes));
  };

  const deleteGrammarNote = (patternId: string) => {
    const newGrammarNotes = { ...grammarNotes };
    delete newGrammarNotes[patternId];
    setGrammarNotes(newGrammarNotes);
    localStorage.setItem('n5-grammar-lesson7-grammar-notes', JSON.stringify(newGrammarNotes));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ngữ pháp chính</h2>
      <div className="space-y-8">
        {lessonData.patterns?.map((pattern: any) => (
          <div key={pattern.id} className="mb-8">
            {/* Grammar Pattern */}
            <div className="bg-yellow-100 p-4 rounded-lg mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {pattern.pattern}
              </h3>
              <p className="text-lg font-medium text-blue-800 mb-2">
                {pattern.meaning}
              </p>
              <p className="text-base text-gray-700">
                {pattern.explanation}
              </p>
            </div>

            {/* Examples */}
            <div className="mb-4">
              <button
                onClick={() => toggleExamples(pattern.id)}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors text-left ${
                  showExamples[pattern.id]
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {showExamples[pattern.id] ? 'Ẩn ví dụ' : 'Hiện 3 ví dụ'}
              </button>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                showExamples[pattern.id] ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}>
                <div className="space-y-3 border border-gray-200 rounded-lg p-4">
                  {pattern.examples?.map((example: any, index: number) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-medium text-gray-900 mb-1">{example.japanese}</p>
                      {example.kanji && <p className="text-base text-gray-700 mb-1">{example.kanji}</p>}
                      <p className="text-sm text-gray-600">{example.vietnamese}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            {pattern.notes && pattern.notes.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Lưu ý quan trọng:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 bg-orange-50 p-4 rounded-lg">
                  {pattern.notes.map((note: string, index: number) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Individual Grammar Notes */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-blue-800">Ghi chú của bạn:</h4>
                {grammarNotes[pattern.id] && (
                  <button
                    onClick={() => deleteGrammarNote(pattern.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                    title="Xóa ghi chú"
                  >
                    Xóa
                  </button>
                )}
              </div>
              
              <textarea
                value={grammarNotes[pattern.id] || ''}
                onChange={(e) => saveGrammarNote(pattern.id, e.target.value)}
                placeholder="Ghi chú riêng cho ngữ pháp này..."
                className="w-full h-20 p-3 border border-blue-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
