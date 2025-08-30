'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function N5GrammarLesson2Page() {
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
    localStorage.setItem('n5-grammar-lesson2-notes', notes);
    setShowNotesModal(false);
  };

  const loadNotes = () => {
    const savedNotes = localStorage.getItem('n5-grammar-lesson2-notes');
    if (savedNotes) {
      setNotes(savedNotes);
    }
    
    const savedGrammarNotes = localStorage.getItem('n5-grammar-lesson2-grammar-notes');
    if (savedGrammarNotes) {
      setGrammarNotes(JSON.parse(savedGrammarNotes));
    }
  };

  const saveGrammarNote = (patternId: string, content: string) => {
    const newGrammarNotes = { ...grammarNotes, [patternId]: content };
    setGrammarNotes(newGrammarNotes);
    localStorage.setItem('n5-grammar-lesson2-grammar-notes', JSON.stringify(newGrammarNotes));
  };

  const deleteGrammarNote = (patternId: string) => {
    const newGrammarNotes = { ...grammarNotes };
    delete newGrammarNotes[patternId];
    setGrammarNotes(newGrammarNotes);
    localStorage.setItem('n5-grammar-lesson2-grammar-notes', JSON.stringify(newGrammarNotes));
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
    loadNotes();
    
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
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Bài 2: Đồ vật, địa điểm</h1>
              <p className="text-lg text-gray-600 mt-1">第2課 - もの、ばしょ</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Thời gian: 4-6 giờ</div>
              <div className="text-lg font-semibold text-blue-600">⭐☆☆☆☆</div>
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
              
              {/* Grammar Pattern 1 */}
              <div className="mb-8">
                <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">1. これ／それ／あれ は N です</h3>
                  <p className="text-lg font-medium text-blue-800 mb-2">Đại từ chỉ định</p>
                  <p className="text-base text-gray-700">Cái này/cái đó/cái kia là N</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    Mẫu câu "これ／それ／あれ は N です" dùng để chỉ định vật thể. "これ" (kore) dùng để chỉ vật ở gần người nói. "それ" (sore) dùng để chỉ vật ở gần người nghe. "あれ" (are) dùng để chỉ vật ở xa cả người nói và người nghe. "N" là danh từ chỉ vật thể. Mẫu câu này thường được dùng để giới thiệu hoặc xác định một vật.
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Ví dụ:</h4>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 1:</span>
                        <button
                          onClick={() => toggleExamples(`pattern-1-example-0`)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            showExamples[`pattern-1-example-0`]
                              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {showExamples[`pattern-1-example-0`]
                            ? 'Ẩn ví dụ'
                            : 'Hiện ví dụ'
                          }
                        </button>
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        showExamples[`pattern-1-example-0`]
                          ? 'max-h-96 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}>
                        <div className="p-4 bg-gray-50">
                          <div className="text-lg font-medium text-gray-900 mb-1">これは 本ですか。</div>
                          <div className="text-base text-gray-700 mb-1">これは ほんですか。</div>
                          <div className="text-sm text-gray-600">Đây là quyển sách à?</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 2:</span>
                        <button
                          onClick={() => toggleExamples(`pattern-1-example-1`)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            showExamples[`pattern-1-example-1`]
                              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {showExamples[`pattern-1-example-1`]
                            ? 'Ẩn ví dụ'
                            : 'Hiện ví dụ'
                          }
                        </button>
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        showExamples[`pattern-1-example-1`]
                          ? 'max-h-96 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}>
                        <div className="p-4 bg-gray-50">
                          <div className="text-lg font-medium text-gray-900 mb-1">…いいえ、それはノートです。</div>
                          <div className="text-base text-gray-700 mb-1">…いいえ、それはのーとです。</div>
                          <div className="text-sm text-gray-600">…Không, đó là quyển vở.</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 3:</span>
                        <button
                          onClick={() => toggleExamples(`pattern-1-example-2`)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            showExamples[`pattern-1-example-2`]
                              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {showExamples[`pattern-1-example-2`]
                            ? 'Ẩn ví dụ'
                            : 'Hiện ví dụ'
                          }
                        </button>
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        showExamples[`pattern-1-example-2`]
                          ? 'max-h-96 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}>
                        <div className="p-4 bg-gray-50">
                          <div className="text-lg font-medium text-gray-900 mb-1">あれは じどうしゃです。</div>
                          <div className="text-base text-gray-700 mb-1">あれは じどうしゃです。</div>
                          <div className="text-sm text-gray-600">Kia là cái ô tô.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Grammar Notes */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Ghi chú của bạn:</h4>
                  <textarea
                    placeholder="Ghi chú riêng cho ngữ pháp này..."
                    className="w-full h-20 p-3 border border-blue-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>

              {/* Grammar Pattern 2 */}
              <div className="mb-8">
                <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">2. この N／その N／あの N</h3>
                  <p className="text-lg font-medium text-blue-800 mb-2">Tính từ chỉ định</p>
                  <p className="text-base text-gray-700">Cái N này/đó/kia</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    "この N" (kono N), "その N" (sono N), "あの N" (ano N) là các cụm từ chỉ định, dùng để bổ nghĩa trực tiếp cho danh từ "N". "この" dùng cho vật ở gần người nói. "その" dùng cho vật ở gần người nghe. "あの" dùng cho vật ở xa cả người nói và người nghe. Các từ này luôn phải đi kèm với một danh từ ngay sau nó.
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Ví dụ:</h4>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 1:</span>
                        <button
                          onClick={() => toggleExamples(`pattern-2-example-0`)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            showExamples[`pattern-2-example-0`]
                              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {showExamples[`pattern-2-example-0`]
                            ? 'Ẩn ví dụ'
                            : 'Hiện ví dụ'
                          }
                        </button>
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        showExamples[`pattern-2-example-0`]
                          ? 'max-h-96 opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}>
                        <div className="p-4 bg-gray-50">
                          <div className="text-lg font-medium text-gray-900 mb-1">あの人は 山田さんです。</div>
                          <div className="text-base text-gray-700 mb-1">あのひとは やまださんです。</div>
                          <div className="text-sm text-gray-600">Người kia là anh Yamada.</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 2:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">この本は にほんごの本です。</div>
                        <div className="text-sm text-gray-600">Cuốn sách này là sách tiếng Nhật.</div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 3:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">その車は 高いです。</div>
                        <div className="text-sm text-gray-600">Chiếc xe đó đắt.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Grammar Notes */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Ghi chú của bạn:</h4>
                  <textarea
                    placeholder="Ghi chú riêng cho ngữ pháp này..."
                    className="w-full h-20 p-3 border border-blue-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>

              {/* Grammar Pattern 3 */}
              <div className="mb-8">
                <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">3. ～は なんですか</h3>
                  <p className="text-lg font-medium text-blue-800 mb-2">Câu hỏi "Cái gì?"</p>
                  <p className="text-base text-gray-700">N là cái gì?</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    Mẫu câu "～は なんですか" dùng để hỏi về bản chất hoặc tên của một vật thể, có nghĩa là "N là cái gì?". "なん" (nan) là từ để hỏi "cái gì", dùng cho vật. Khi hỏi về người, ta dùng "だれ" (dare - ai) thay cho "なん".
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Ví dụ:</h4>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 1:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">これは なんですか。</div>
                        <div className="text-sm text-gray-600">Đây là cái gì?</div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 2:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">…それは いすです。</div>
                        <div className="text-sm text-gray-600">…Đó là cái ghế.</div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 3:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">このひとは だれですか。</div>
                        <div className="text-sm text-gray-600">Người này là ai?</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Grammar Notes */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Ghi chú của bạn:</h4>
                  <textarea
                    placeholder="Ghi chú riêng cho ngữ pháp này..."
                    className="w-full h-20 p-3 border border-blue-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>

              {/* Grammar Pattern 4 */}
              <div className="mb-8">
                <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">4. そうです／そうではありません</h3>
                  <p className="text-lg font-medium text-blue-800 mb-2">Trả lời khẳng định/phủ định</p>
                  <p className="text-base text-gray-700">Đúng vậy/Không phải thế</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    "そうです" (sou desu) và "そうではありません" (sou dewa arimasen) là các cách trả lời khẳng định và phủ định cho câu hỏi nghi vấn mà câu hỏi đó kết thúc bằng danh từ hoặc tính từ. "そうです" có nghĩa là "Đúng vậy" hoặc "Phải thế". "そうではありません" có nghĩa là "Không phải thế" hoặc "Không đúng vậy".
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Ví dụ:</h4>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 1:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">これは えんぴつですか。</div>
                        <div className="text-sm text-gray-600">Đây là cái bút chì phải không?</div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 2:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">…はい、そうです。</div>
                        <div className="text-sm text-gray-600">…Vâng, đúng vậy.</div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 3:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">それは テレホンカードですか。</div>
                        <div className="text-sm text-gray-600">Đó là cái thẻ điện thoại phải không?</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Grammar Notes */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Ghi chú của bạn:</h4>
                  <textarea
                    placeholder="Ghi chú riêng cho ngữ pháp này..."
                    className="w-full h-20 p-3 border border-blue-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>

              {/* Grammar Pattern 5 */}
              <div className="mb-8">
                <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">5. N1 ですか、N2 ですか</h3>
                  <p className="text-lg font-medium text-blue-800 mb-2">Câu hỏi lựa chọn</p>
                  <p className="text-base text-gray-700">N1 hay là N2?</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    Mẫu câu "N1 ですか、N2 ですか" là một dạng câu hỏi lựa chọn, dùng để hỏi khi người nói muốn xác nhận một trong hai hoặc nhiều lựa chọn. "N1" và "N2" là các danh từ hoặc cụm danh từ. Câu hỏi này thường được dùng khi người nói không chắc chắn về đối tượng hoặc muốn người nghe đưa ra sự lựa chọn. Câu trả lời thường là một trong các lựa chọn được đưa ra.
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Ví dụ:</h4>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 1:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">それは ボールペンですか、シャープペンシルですか。</div>
                        <div className="text-sm text-gray-600">Đó là cái bút bi hay là bút chì kim?</div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 2:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">…ボールペンです。</div>
                        <div className="text-sm text-gray-600">…Là cái bút bi.</div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 3:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">これは りんごですか、みかんですか。</div>
                        <div className="text-sm text-gray-600">Đây là táo hay là cam?</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Grammar Notes */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Ghi chú của bạn:</h4>
                  <textarea
                    placeholder="Ghi chú riêng cho ngữ pháp này..."
                    className="w-full h-20 p-3 border border-blue-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>

              {/* Grammar Pattern 6 */}
              <div className="mb-8">
                <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">6. N1 の N2</h3>
                  <p className="text-lg font-medium text-blue-800 mb-2">Chỉ sự sở hữu</p>
                  <p className="text-base text-gray-700">N2 của N1</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    Mẫu câu "N1 の N2" dùng để diễn tả mối quan hệ sở hữu, trong đó "N2" thuộc về "N1". Trợ từ "の" (no) được đặt giữa hai danh từ để chỉ rõ mối quan hệ này. "N1" là chủ sở hữu, và "N2" là vật bị sở hữu. Mẫu câu này rất cơ bản và được sử dụng rộng rãi để chỉ sự thuộc về, nguồn gốc, hoặc mối quan hệ giữa các danh từ.
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Ví dụ:</h4>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 1:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">これは わたしの ほんです。</div>
                        <div className="text-sm text-gray-600">Đây là quyển sách của tôi.</div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 2:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">あれは だれのかばんですか。</div>
                        <div className="text-sm text-gray-600">Kia là cái cặp của ai?</div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 3:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">…わたしのです。</div>
                        <div className="text-sm text-gray-600">…Là của tôi.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Grammar Notes */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Ghi chú của bạn:</h4>
                  <textarea
                    placeholder="Ghi chú riêng cho ngữ pháp này..."
                    className="w-full h-20 p-3 border border-blue-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>

              {/* Grammar Pattern 7 */}
              <div className="mb-8">
                <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">7. そうですか</h3>
                  <p className="text-lg font-medium text-blue-800 mb-2">Thể hiện sự hiểu biết</p>
                  <p className="text-base text-gray-700">Ra vậy</p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    "そうですか" (sou desu ka) là một cụm từ thường dùng để thể hiện sự hiểu biết, xác nhận thông tin, hoặc bày tỏ sự ngạc nhiên nhẹ nhàng khi người nói nhận được một thông tin mới. Nó có nghĩa là "Ra vậy", "Thế à", hoặc "Tôi hiểu rồi". Đây là một cách nói lịch sự và tự nhiên trong giao tiếp tiếng Nhật.
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Ví dụ:</h4>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 1:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">A: このかさは あなたのですか。</div>
                        <div className="text-sm text-gray-600">A: Cái ô này là của bạn à?</div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 2:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">B: いいえ、タンさんのです。</div>
                        <div className="text-sm text-gray-600">B: …Không, của anh Tân.</div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <span className="font-medium text-gray-700">Ví dụ 3:</span>
                        <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">
                          Hiện ví dụ
                        </button>
                      </div>
                      <div className="p-4 bg-gray-50">
                        <div className="text-lg font-medium text-gray-900 mb-1">A: そうですか。</div>
                        <div className="text-sm text-gray-600">A: À, ra vậy.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Grammar Notes */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Ghi chú của bạn:</h4>
                  <textarea
                    placeholder="Ghi chú riêng cho ngữ pháp này..."
                    className="w-full h-20 p-3 border border-blue-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Other tabs */}
          {activeTab === 'exercises' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài tập ôn luyện</h2>
              <p className="text-gray-600 mb-4">Chức năng bài tập sẽ được phát triển trong phiên bản tiếp theo.</p>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Kiểm tra kiến thức</h2>
              <p className="text-gray-600 mb-4">Chức năng kiểm tra sẽ được phát triển trong phiên bản tiếp theo.</p>
            </div>
          )}

          {activeTab === 'summary' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tóm tắt bài học</h2>
              <p className="text-gray-600 mb-4">Đang phát triển nội dung tóm tắt...</p>
            </div>
          )}

          {activeTab === 'culture' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ghi chú văn hóa</h2>
              <p className="text-gray-600 mb-4">Đang phát triển nội dung văn hóa...</p>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/courses/japanese/n5/grammar/lesson/1"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            ← Bài trước
          </Link>
          <Link
            href="/courses/japanese/n5/grammar/lesson/3"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Bài tiếp theo →
          </Link>
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
