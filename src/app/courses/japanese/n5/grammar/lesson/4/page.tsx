'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GrammarContent } from './grammar-content';

export default function N5GrammarLesson4Page() {
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
    localStorage.setItem('n5-grammar-lesson4-notes', notes);
    setShowNotesModal(false);
  };

  const loadNotes = () => {
    const savedNotes = localStorage.getItem('n5-grammar-lesson4-notes');
    if (savedNotes) {
      setNotes(savedNotes);
    }
    
    const savedGrammarNotes = localStorage.getItem('n5-grammar-lesson4-grammar-notes');
    if (savedGrammarNotes) {
      setGrammarNotes(JSON.parse(savedGrammarNotes));
    }
  };

  const saveGrammarNote = (patternId: string, content: string) => {
    const newGrammarNotes = { ...grammarNotes, [patternId]: content };
    setGrammarNotes(newGrammarNotes);
    localStorage.setItem('n5-grammar-lesson4-grammar-notes', JSON.stringify(newGrammarNotes));
  };

  const deleteGrammarNote = (patternId: string) => {
    const newGrammarNotes = { ...grammarNotes };
    delete newGrammarNotes[patternId];
    setGrammarNotes(newGrammarNotes);
    localStorage.setItem('n5-grammar-lesson4-grammar-notes', JSON.stringify(newGrammarNotes));
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
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Bài 4: Thời gian và ngày tháng</h1>
              <p className="text-lg text-gray-600 mt-1">第4課 - じかんとにちげつ</p>
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
            <GrammarContent />
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
              href="/courses/japanese/n5/grammar/lesson/3"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              ← Bài trước
            </Link>
                      <Link
              href="/courses/japanese/n5/grammar/lesson/5"
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
