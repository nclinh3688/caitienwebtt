'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function N5GrammarLesson1Page() {
  const [lessonData, setLessonData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('grammar');
  const [showAnswers, setShowAnswers] = useState<{ [key: string]: boolean }>({});
  const [showExamples, setShowExamples] = useState<{ [key: string]: boolean }>({});
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notes, setNotes] = useState('');
  const [grammarNotes, setGrammarNotes] = useState<{ [key: string]: string }>({});
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 }); // Default values for SSR
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [modalSize, setModalSize] = useState({ width: 672, height: 200 }); // max-w-2xl = 672px
  const [isModalDragging, setIsModalDragging] = useState(false);
  const [isModalResizing, setIsModalResizing] = useState(false);
  const [modalDragOffset, setModalDragOffset] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState('');

  const toggleAnswer = (questionId: string) => {
    setShowAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

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
      
      // Giới hạn trong viewport
      const maxX = window.innerWidth - 120; // Chiều rộng nút
      const maxY = window.innerHeight - 60; // Chiều cao nút
      
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
    // Lưu ghi chú vào localStorage
    localStorage.setItem('n5-grammar-lesson1-notes', notes);
    setShowNotesModal(false);
  };

  const loadNotes = () => {
    // Tải ghi chú từ localStorage
    const savedNotes = localStorage.getItem('n5-grammar-lesson1-notes');
    if (savedNotes) {
      setNotes(savedNotes);
    }
    
    // Tải ghi chú cho từng ngữ pháp
    const savedGrammarNotes = localStorage.getItem('n5-grammar-lesson1-grammar-notes');
    if (savedGrammarNotes) {
      setGrammarNotes(JSON.parse(savedGrammarNotes));
    }
  };

  const saveGrammarNote = (patternId: string, content: string) => {
    const newGrammarNotes = { ...grammarNotes, [patternId]: content };
    setGrammarNotes(newGrammarNotes);
    localStorage.setItem('n5-grammar-lesson1-grammar-notes', JSON.stringify(newGrammarNotes));
  };

  const deleteGrammarNote = (patternId: string) => {
    const newGrammarNotes = { ...grammarNotes };
    delete newGrammarNotes[patternId];
    setGrammarNotes(newGrammarNotes);
    localStorage.setItem('n5-grammar-lesson1-grammar-notes', JSON.stringify(newGrammarNotes));
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
      setModalDragOffset({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleModalMouseMove = (e: MouseEvent) => {
    if (isModalDragging) {
      const newX = e.clientX - modalDragOffset.x;
      const newY = e.clientY - modalDragOffset.y;
      
      // Giới hạn trong viewport
      const maxX = window.innerWidth - modalSize.width;
      const maxY = window.innerHeight - modalSize.height;
      
      setModalPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    } else if (isModalResizing) {
      const deltaX = e.clientX - modalDragOffset.x;
      const deltaY = e.clientY - modalDragOffset.y;
      
      // Tính kích thước mới
      const newWidth = modalSize.width + deltaX;
      const newHeight = modalSize.height + deltaY;
      
      // Giới hạn kích thước
      const minWidth = 400;
      const minHeight = 200;
      const maxWidth = window.innerWidth - 100;
      const maxHeight = window.innerHeight - 100;
      
      setModalSize({
        width: Math.max(minWidth, Math.min(newWidth, maxWidth)),
        height: Math.max(minHeight, Math.min(newHeight, maxHeight))
      });
      
      // Cập nhật offset để resize mượt mà
      setModalDragOffset({
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleModalMouseUp = () => {
    setIsModalDragging(false);
    setIsModalResizing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/grammar/n5/lesson15');
        if (response.ok) {
          const data = await response.json();
          setLessonData(data);
        } else {
          // Fallback to static data
          const staticData = await import('../../../../../../../data/jlpt-n5/B01.json');
          setLessonData(staticData.default);
        }
      } catch (error) {
        // Load static data directly
        const staticData = await import('../../../../../../../data/jlpt-n5/B01.json');
        setLessonData(staticData.default);
      }
    };

    fetchData();
    loadNotes(); // Tải ghi chú đã lưu
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  useEffect(() => {
    if (isModalDragging || isModalResizing) {
      document.addEventListener('mousemove', handleModalMouseMove);
      document.addEventListener('mouseup', handleModalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleModalMouseMove);
        document.removeEventListener('mouseup', handleModalMouseUp);
      };
    }
  }, [isModalDragging, isModalResizing, modalDragOffset, modalSize, modalPosition]);

  // Set modal position when opening
  useEffect(() => {
    if (showNotesModal) {
      setModalPosition({
        x: (window.innerWidth - modalSize.width) / 2,
        y: (window.innerHeight - modalSize.height) / 2
      });
    }
  }, [showNotesModal, modalSize.width, modalSize.height]);

  // Set button position on client side
  useEffect(() => {
    setButtonPosition({
      x: window.innerWidth - 140,
      y: window.innerHeight - 80
    });
  }, []);

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu bài học...</p>
        </div>
      </div>
    );
  }

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
              <div className="space-y-8">
                {lessonData.grammarPatterns?.map((pattern: any) => (
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
                        {pattern.pattern}
                      </p>
                    </div>
                    
                    {/* Explanation */}
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                      <p className="text-gray-700 leading-relaxed">
                        {pattern.explanation}
                      </p>
                    </div>

                    {/* Examples */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-3">Ví dụ:</h4>
                      <div className="space-y-3">
                        {pattern.examples?.map((example: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg">
                            {/* Header với nút ẩn/hiện bên cạnh */}
                            <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                              <span className="font-medium text-gray-700">
                                Ví dụ {index + 1}:
                              </span>
                              <button
                                onClick={() => toggleExamples(`pattern-${pattern.id}-example-${index}`)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                  showExamples[`pattern-${pattern.id}-example-${index}`]
                                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {showExamples[`pattern-${pattern.id}-example-${index}`]
                                  ? 'Ẩn ví dụ'
                                  : 'Hiện ví dụ'
                                }
                              </button>
                            </div>

                            {/* Nội dung ví dụ (ẩn/hiện) */}
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              showExamples[`pattern-${pattern.id}-example-${index}`]
                                ? 'max-h-96 opacity-100'
                                : 'max-h-0 opacity-0'
                            }`}>
                              <div className="p-4 bg-gray-50">
                                <div className="text-lg font-medium text-gray-900 mb-1">
                                  {example.japanese}
                                </div>
                                <div className="text-base text-gray-700 mb-1">
                                  {example.kanji}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {example.vietnamese} / {example.english}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Lưu ý quan trọng:</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {pattern.notes?.map((note: string, index: number) => (
                          <li key={index}>{note}</li>
                        ))}
                      </ul>
                    </div>

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
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      <textarea
                        value={grammarNotes[pattern.id] || ''}
                        onChange={(e) => saveGrammarNote(pattern.id, e.target.value)}
                        placeholder="Ghi chú riêng cho ngữ pháp này..."
                        className="w-full h-20 p-3 border border-blue-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      />
                      
                      {grammarNotes[pattern.id] && (
                        <div className="mt-2 text-xs text-blue-600">
                          Ghi chú đã được lưu tự động
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exercises Tab */}
          {activeTab === 'exercises' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài tập ôn luyện</h2>
              <div className="space-y-8">
                {lessonData.exercises?.map((exercise: any) => (
                  <div key={exercise.id} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{exercise.title}</h3>
                    <p className="text-gray-600 mb-4">{exercise.description}</p>
                    
                    <div className="space-y-4">
                      {exercise.questions?.map((question: any) => (
                        <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                          <p className="font-medium text-gray-900 mb-3">{question.question}</p>
                          
                          {/* Nút ẩn/hiện đáp án */}
                          <div className="mb-3">
                            <button
                              onClick={() => toggleAnswer(`exercise-${exercise.id}-${question.id}`)}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                showAnswers[`exercise-${exercise.id}-${question.id}`]
                                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {showAnswers[`exercise-${exercise.id}-${question.id}`] 
                                ? 'Ẩn đáp án' 
                                : 'Hiện đáp án'
                              }
                            </button>
                          </div>

                          {/* Đáp án (ẩn/hiện) */}
                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            showAnswers[`exercise-${exercise.id}-${question.id}`]
                              ? 'max-h-96 opacity-100'
                              : 'max-h-0 opacity-0'
                          }`}>
                            <div className="bg-white rounded-lg p-3 border border-gray-200 mt-2">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Đáp án:</span> {question.answer}
                              </p>
                              {question.kanji && (
                                <p className="text-sm text-gray-600 mt-1">
                                  <span className="font-medium">Kanji:</span> {question.kanji}
                                </p>
                              )}
                              <p className="text-sm text-gray-600 mt-2">
                                <span className="font-medium">Giải thích:</span> {question.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quiz Tab */}
          {activeTab === 'quiz' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kiểm tra kiến thức</h2>
              <p className="text-gray-600 mb-4">Chức năng kiểm tra sẽ được phát triển trong phiên bản tiếp theo.</p>
            </div>
          )}

          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{lessonData.summary?.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{lessonData.summary?.content}</p>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Điểm chính:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {lessonData.summary?.keyPoints?.map((point: string, index: number) => (
                    <li key={index} className="text-lg">{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Culture Tab */}
          {activeTab === 'culture' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ghi chú văn hóa</h2>
              <div className="space-y-6">
                {lessonData.culturalNotes?.map((note: any, index: number) => (
                  <div key={index} className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{note.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/courses/japanese/n5/grammar"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            ← Quay lại danh sách bài học
          </Link>
          <Link
            href="/courses/japanese/n5/grammar/lesson/2"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Bài tiếp theo →
          </Link>
        </div>
      </div>

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 z-50">
          <div 
            className="bg-white rounded-lg shadow-2xl border border-gray-200 absolute cursor-move"
            style={{
              left: `${modalPosition.x}px`,
              top: `${modalPosition.y}px`,
              width: `${modalSize.width}px`,
              height: `${modalSize.height}px`
            }}
            onMouseDown={(e) => handleModalMouseDown(e, 'drag')}
          >
            {/* Content */}
            <div className="p-4 flex flex-col" style={{ height: 'calc(100% - 2rem)' }}>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ghi chú của bạn về bài học này..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent overflow-y-auto mb-4"
                style={{
                  minHeight: '50px',
                  minWidth: '100px',
                  height: '50px'
                }}
              />
              
              <div className="flex justify-end space-x-3 mt-auto">
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

            {/* Resize Handle */}
            <div 
              className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize bg-blue-500 hover:bg-blue-600 rounded-tl-lg flex items-center justify-center transition-colors"
              onMouseDown={(e) => handleModalMouseDown(e, 'resize', 'se')}
              title="Kéo để thay đổi kích thước modal"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7l10 10" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
