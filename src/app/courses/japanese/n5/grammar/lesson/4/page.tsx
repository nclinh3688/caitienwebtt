'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GrammarContent from './grammar-content';

export default function N5GrammarLesson4Page() {
  const [lessonData, setLessonData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('grammar');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/grammar/n5/lesson4');
        if (response.ok) {
          const data = await response.json();
          setLessonData(data);
        } else {
          console.error('Failed to fetch lesson data');
        }
      } catch (error) {
        console.error('Error fetching lesson data:', error);
      }
    };

    fetchData();
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
          {activeTab === 'grammar' && <GrammarContent lessonData={lessonData} />}
          {/* Other tabs content can be added here */}
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
    </div>
  );
}