'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Example {
  japanese: string;
  kanji?: string;
  vietnamese: string;
  english: string;
}

interface GrammarPattern {
  id: number;
  pattern: string;
  meaning: string;
  explanation: string;
  examples: Example[];
  notes: string[];
}

interface LessonSummary {
  title: string;
  content: string;
  keyPoints?: string[];
}

interface LessonData {
  lessonNumber: number;
  japaneseTitle: string;
  vietnameseTitle: string;
  englishTitle: string;
  summary: LessonSummary;
  estimatedTime: string;
  difficulty: string;
  grammarPatterns: GrammarPattern[];
  exercises: any[]; // You might want to define a more specific interface for exercises
  quiz: any;
  fillBlankQuiz: any;
  writingExercise: any;
  culturalNotes: any[];
  // Add other fields as per your Bxx.json structure
}

export default function N5GrammarLessonPage() {
  const params = useParams();
  if (!params || typeof params.lessonNumber !== 'string') {
    return <div>Error: Lesson number not found.</div>;
  }
  const lessonNumber = params.lessonNumber as string; // Get lesson number from URL
  const lessonId = `B${lessonNumber.padStart(2, '0')}`; // Convert to B01, B02 format

  const [activeTab, setActiveTab] = useState('grammar');
  const [showExamples, setShowExamples] = useState<{ [key: string]: boolean }>({});
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notes, setNotes] = useState('');
  const [grammarNotes, setGrammarNotes] = useState<{ [key: string]: string }>({});
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [modalSize, setModalSize] = useState({ width: 672, height: 200 });
  const [isModalDragging, setIsModalDragging] = useState(false);
  const [isModalResizing, setIsModalResizing] = useState(false);
  const [modalDragOffset, setModalDragOffset] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState('');

  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/grammar/n5/${lessonId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: LessonData = await response.json();
        setLessonData(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
    loadNotes(); // Load user notes
  }, [lessonId]);

  const toggleExamples = (patternId: string) => {
    setShowExamples(prev => ({
      ...prev,
      [patternId]: !prev[patternId]
    }));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      const maxX = window.innerWidth - 120;
      const maxY = window.innerHeight - 60;
      
      setButtonPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const saveNotes = () => {
    localStorage.setItem(`n5-grammar-lesson${lessonNumber}-notes`, notes);
    setShowNotesModal(false);
  };

  const loadNotes = () => {
    const savedNotes = localStorage.getItem(`n5-grammar-lesson${lessonNumber}-notes`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
    
    const savedGrammarNotes = localStorage.getItem(`n5-grammar-lesson${lessonNumber}-grammar-notes`);
    if (savedGrammarNotes) {
      setGrammarNotes(JSON.parse(savedGrammarNotes));
    }
  };

  const saveGrammarNote = (patternId: string, content: string) => {
    const newGrammarNotes = { ...grammarNotes, [patternId]: content };
    setGrammarNotes(newGrammarNotes);
    localStorage.setItem(`n5-grammar-lesson${lessonNumber}-grammar-notes`, JSON.stringify(newGrammarNotes));
  };

  const deleteGrammarNote = (patternId: string) => {
    const newGrammarNotes = { ...grammarNotes };
    delete newGrammarNotes[patternId];
    setGrammarNotes(newGrammarNotes);
    localStorage.setItem(`n5-grammar-lesson${lessonNumber}-grammar-notes`, JSON.stringify(newGrammarNotes));
  };

  const handleModalMouseDown = (e: React.MouseEvent, type: 'drag' | 'resize', direction?: string) => {
    if (type === 'drag') {
      setIsModalDragging(true);
      const rect = e.currentTarget.getBoundingClientRect();
      setModalDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    } else if (type === 'resize') {
      setIsModalResizing(true);
      setResizeDirection(direction || '');
    }
  };

  const handleModalMouseMove = (e: MouseEvent) => {
    if (isModalDragging) {
      const newX = e.clientX - modalDragOffset.x;
      const newY = e.clientY - modalDragOffset.y;
      
      const maxX = window.innerWidth - modalSize.width;
      const maxY = window.innerHeight - modalSize.height;
      
      setModalPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    } else if (isModalResizing) {
      let newWidth = modalSize.width;
      let newHeight = modalSize.height;
      
      if (resizeDirection.includes('right')) {
        newWidth = e.clientX - modalPosition.x;
      }
      if (resizeDirection.includes('bottom')) {
        newHeight = e.clientY - modalPosition.y;
      }
      
      newWidth = Math.max(400, Math.min(newWidth, 800));
      newHeight = Math.max(200, Math.min(newHeight, 600));
      
      setModalSize({ width: newWidth, height: newHeight });
    }
  };

  const handleModalMouseUp = () => {
    setIsModalDragging(false);
    setIsModalResizing(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleModalMouseMove);
      document.addEventListener('mouseup', handleModalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleModalMouseMove);
        document.removeEventListener('mouseup', handleModalMouseUp);
      };
    }
  }, [isModalDragging, isModalResizing, modalDragOffset, modalSize, modalPosition]);

  useEffect(() => {
    if (showNotesModal) {
      setModalPosition({
        x: (window.innerWidth - modalSize.width) / 2,
        y: (window.innerHeight - modalSize.height) / 2
      });
    }
  }, [showNotesModal, modalSize.width, modalSize.height]);

  useEffect(() => {
    setButtonPosition({
      x: window.innerWidth - 140,
      y: window.innerHeight - 80
    });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">Lỗi: {error}</div>;
  }

  if (!lessonData) {
    return <div className="min-h-screen flex items-center justify-center">Không tìm thấy dữ liệu bài học.</div>;
  }

  const prevLessonNumber = parseInt(lessonNumber) - 1;
  const nextLessonNumber = parseInt(lessonNumber) + 1;
  const totalLessons = 25; // Assuming there are 25 lessons

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link 
                href="/courses/japanese/n5/grammar"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Quay lại danh sách bài học
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{lessonData.vietnameseTitle}</h1>
              <p className="text-lg text-gray-600 mt-1">{lessonData.japaneseTitle}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Thời gian: {lessonData.estimatedTime}</div>
              <div className="text-lg font-semibold text-blue-600">{lessonData.difficulty}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Floating Notes Button - Always Visible */}
        <div 
          className="fixed z-50 cursor-move select-none"
          style={{ 
            left: `${buttonPosition.x}px`, 
            top: `${buttonPosition.y}px` 
          }}
        >
          <button 
            className={`bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center ${isDragging ? 'opacity-80 scale-105' : ''}`}
            onMouseDown={handleMouseDown}
            onClick={() => setShowNotesModal(true)}
            title="Ghi chú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'grammar', label: 'Ngữ pháp', icon: '📚' },
                { id: 'exercises', label: 'Bài tập', icon: '✏️' },
                { id: 'quiz', label: 'Kiểm tra', icon: '🧪' },
                { id: 'summary', label: 'Tóm tắt', icon: '📋' },
                { id: 'culture', label: 'Văn hóa', icon: '🇯🇵' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Grammar Tab */}
          {activeTab === 'grammar' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ngữ pháp chính</h2>
              
              {lessonData.grammarPatterns && lessonData.grammarPatterns.map((pattern) => (
                <div key={pattern.id} className="mb-8">
                  <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{pattern.id}. {pattern.pattern}</h3>
                    <p className="text-lg font-medium text-blue-800 mb-2">{pattern.meaning}</p>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {pattern.explanation}
                    </p>
                  </div>

                  {pattern.examples && pattern.examples.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Ví dụ:</h4>
                      <div className="space-y-3">
                        {pattern.examples.map((example, idx) => (
                          <div key={idx} className="border border-gray-200 rounded-lg">
                            <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                              <span className="font-medium text-gray-700">Ví dụ {idx + 1}:</span>
                              <button
                                onClick={() => toggleExamples(`pattern-${pattern.id}-example-${idx}`)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                  showExamples[`pattern-${pattern.id}-example-${idx}`]
                                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {showExamples[`pattern-${pattern.id}-example-${idx}`]
                                  ? 'Ẩn ví dụ'
                                  : 'Hiện ví dụ'
                                }
                              </button>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              showExamples[`pattern-${pattern.id}-example-${idx}`]
                                ? 'max-h-96 opacity-100'
                                : 'max-h-0 opacity-0'
                            }`}>
                              <div className="p-4 bg-gray-50">
                                <div className="text-lg font-medium text-gray-900 mb-1">{example.japanese}</div>
                                {example.kanji && <div className="text-base text-gray-700 mb-1">{example.kanji}</div>}
                                <div className="text-sm text-gray-600">{example.vietnamese}</div>
                                <div className="text-sm text-gray-600">{example.english}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {pattern.notes && pattern.notes.length > 0 && (
                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-3">Ghi chú:</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {pattern.notes.map((note, idx) => (
                          <li key={idx}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Individual Grammar Notes */}
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">Ghi chú của bạn:</h4>
                    <textarea
                      placeholder="Ghi chú riêng cho ngữ pháp này..."
                      className="w-full h-20 p-3 border border-blue-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      value={grammarNotes[`pattern-${pattern.id}`] || ''}
                      onChange={(e) => saveGrammarNote(`pattern-${pattern.id}`, e.target.value)}
                    />
                    {grammarNotes[`pattern-${pattern.id}`] && (
                      <button
                        onClick={() => deleteGrammarNote(`pattern-${pattern.id}`)}
                        className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                      >
                        Xóa ghi chú
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Exercises Tab */}
          {activeTab === 'exercises' && lessonData.exercises && lessonData.exercises.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài tập ôn luyện</h2>
              {/* Render exercises dynamically */}
              {lessonData.exercises.map((exercise: any, index: number) => (
                <div key={index} className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-xl font-semibold mb-2">{exercise.title}</h3>
                  <p className="text-gray-700 mb-4">{exercise.description}</p>
                  {/* Render questions based on exercise type */}
                  {exercise.questions && exercise.questions.map((q: any, qIndex: number) => (
                    <div key={qIndex} className="mb-2">
                      <p className="font-medium">{qIndex + 1}. {q.question}</p>
                      {/* Add input fields or display answers based on exercise type */}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {activeTab === 'exercises' && (!lessonData.exercises || lessonData.exercises.length === 0) && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài tập ôn luyện</h2>
              <p className="text-gray-600 mb-4">Chức năng bài tập sẽ được phát triển trong phiên bản tiếp theo hoặc không có bài tập cho bài này.</p>
            </div>
          )}

          {/* Quiz Tab */}
          {activeTab === 'quiz' && lessonData.quiz && lessonData.quiz.questions && lessonData.quiz.questions.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{lessonData.quiz.title}</h2>
              <p className="text-gray-600 mb-4">{lessonData.quiz.description}</p>
              {/* Render quiz questions dynamically */}
              {lessonData.quiz.questions.map((q: any, index: number) => (
                <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                  <p className="font-medium mb-2">{index + 1}. {q.question}</p>
                  {q.options && (
                    <ul className="list-disc list-inside ml-4">
                      {q.options.map((option: string, optIndex: number) => (
                        <li key={optIndex}>{option}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
          {activeTab === 'quiz' && (!lessonData.quiz || !lessonData.quiz.questions || lessonData.quiz.questions.length === 0) && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kiểm tra kiến thức</h2>
              <p className="text-gray-600 mb-4">Chức năng kiểm tra sẽ được phát triển trong phiên bản tiếp theo hoặc không có bài kiểm tra cho bài này.</p>
            </div>
          )}

          {/* Summary Tab */}
          {activeTab === 'summary' && lessonData.summary && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{lessonData.summary.title}</h2>
              <p className="text-gray-600 mb-4">{lessonData.summary.content}</p>
              {lessonData.summary.keyPoints && lessonData.summary.keyPoints.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Điểm chính:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {lessonData.summary.keyPoints.map((point: string, index: number) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {activeTab === 'summary' && !lessonData.summary && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tóm tắt bài học</h2>
              <p className="text-gray-600 mb-4">Đang phát triển nội dung tóm tắt...</p>
            </div>
          )}

          {/* Culture Tab */}
          {activeTab === 'culture' && lessonData.culturalNotes && lessonData.culturalNotes.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ghi chú văn hóa</h2>
              {lessonData.culturalNotes.map((note: any, index: number) => (
                <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                  <p className="text-gray-700">{note.content}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'culture' && (!lessonData.culturalNotes || lessonData.culturalNotes.length === 0) && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ghi chú văn hóa</h2>
              <p className="text-gray-600 mb-4">Đang phát triển nội dung văn hóa...</p>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          {prevLessonNumber >= 1 ? (
            <Link
              href={`/courses/japanese/n5/grammar/lesson/${prevLessonNumber}`}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              ← Bài trước
            </Link>
          ) : (
            <span className="px-6 py-3 bg-gray-300 text-gray-600 rounded-lg font-medium cursor-not-allowed">
              ← Bài trước
            </span>
          )}
          {nextLessonNumber <= totalLessons ? (
            <Link
              href={`/courses/japanese/n5/grammar/lesson/${nextLessonNumber}`}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Bài tiếp theo →
            </Link>
          ) : (
            <span className="px-6 py-3 bg-gray-300 text-gray-600 rounded-lg font-medium cursor-not-allowed">
              Bài tiếp theo →
            </span>
          )}
        </div>
      </div>

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden"
            style={{
              position: 'absolute',
              left: `${modalPosition.x}px`,
              top: `${modalPosition.y}px`,
              width: `${modalSize.width}px`,
              height: `${modalSize.height}px`
            }}
          >
            {/* Resize Handle */}
            <div 
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-300 hover:bg-gray-400 transition-colors"
              onMouseDown={(e) => handleModalMouseDown(e, 'resize', 'bottom-right')}
            />
            
            {/* Modal Content */}
            <div className="p-4 h-full flex flex-col">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ghi chú của bạn về bài học này..."
                className="flex-1 w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent overflow-y-auto"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button 
                  onClick={() => setShowNotesModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Hủy
                </button>
                <button 
                  onClick={saveNotes}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  Lưu ghi chú
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}