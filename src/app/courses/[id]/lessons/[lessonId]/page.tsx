'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProgressTracker from '@/components/progress/ProgressTracker';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
  duration: number;
  difficulty: string;
  isPublished: boolean;
  vocabulary: any[];
}

interface Course {
  id: string;
  title: string;
  language: string;
  level: string;
}

export default function LessonPlayerPage() {
  const params = useParams();
  const courseId = params?.id as string;
  const lessonId = params?.lessonId as string;
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('LessonPlayer mounted with:', { courseId, lessonId });
    
    if (courseId && lessonId) {
      fetchLessonData();
    }
  }, [courseId, lessonId]);

  const fetchLessonData = async () => {
    try {
      console.log('Fetching lesson data...');
      setLoading(true);
      
      // Fetch course info
      const courseResponse = await fetch(`/api/courses/${courseId}`);
      if (!courseResponse.ok) {
        throw new Error(`Course API failed: ${courseResponse.status}`);
      }
      
      const courseData = await courseResponse.json();
      console.log('Course data:', courseData);
      
      if (courseData.success) {
        setCourse(courseData.data);
      }

      // Fetch lesson info
      const lessonResponse = await fetch(`/api/courses/${courseId}/lessons`);
      if (!lessonResponse.ok) {
        throw new Error(`Lesson API failed: ${lessonResponse.status}`);
      }
      
      const lessonData = await lessonResponse.json();
      console.log('Lesson data:', lessonData);
      
      if (lessonData.success) {
        const currentLesson = lessonData.data.find((l: any) => l.id === lessonId);
        console.log('Current lesson found:', currentLesson);
        
        if (currentLesson) {
          setLesson(currentLesson);
        } else {
          setError('Lesson not found');
        }
      }
      
      setLoading(false);
      console.log('Lesson data fetch completed');
      
    } catch (error) {
      console.error('Error fetching lesson data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch lesson data');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Đang tải bài học...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !lesson || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-900 mb-4">Không thể tải bài học</h2>
            <p className="text-red-600 mb-4">{error || 'Bài học không tồn tại'}</p>
            <button
              onClick={() => window.history.back()}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span>← Quay lại</span>
            </button>

            {/* Lesson Info */}
            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-900">{lesson.title}</h1>
              <p className="text-sm text-gray-600">{course.title}</p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {lesson.vocabulary ? lesson.vocabulary.length : 0} từ vựng
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lesson Content */}
          <div className="lg:col-span-2">
            {/* Lesson Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
                  <p className="text-gray-600 mb-3">{lesson.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Thời gian: {lesson.duration} phút</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {lesson.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Content */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nội dung bài học</h3>
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
            </div>

            {/* Vocabulary Section */}
            {lesson.vocabulary && lesson.vocabulary.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Từ vựng bài học</h3>
                <div className="space-y-3">
                  {lesson.vocabulary.map((vocab: any, index: number) => (
                    <div
                      key={vocab.id || index}
                      className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900 text-lg">{vocab.word}</h4>
                            {vocab.reading && (
                              <span className="text-gray-500 text-sm">({vocab.reading})</span>
                            )}
                          </div>
                          <p className="text-gray-700 mb-2">{vocab.meaning}</p>
                          {vocab.example && (
                            <p className="text-sm text-gray-600 italic">"{vocab.example}"</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practice Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Luyện tập</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold">V</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Bài tập từ vựng</h4>
                  </div>
                  <p className="text-sm text-gray-600">Luyện tập ghi nhớ từ vựng</p>
                </button>

                <button className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold">A</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Luyện nghe</h4>
                  </div>
                  <p className="text-sm text-gray-600">Luyện kỹ năng nghe hiểu</p>
                </button>

                <button className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-bold">R</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Đọc hiểu</h4>
                  </div>
                  <p className="text-sm text-gray-600">Luyện kỹ năng đọc hiểu</p>
                </button>

                <button className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 font-bold">Q</span>
                    </div>
                    <h4 className="font-semibold text-gray-900">Kiểm tra</h4>
                  </div>
                  <p className="text-sm text-gray-600">Bài kiểm tra cuối bài</p>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Progress Tracker */}
            <ProgressTracker 
              userId="demo-user" 
              courseId={courseId}
            />

            {/* Lesson Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Điều hướng</h3>
              <div className="space-y-3">
                <button className="w-full p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left">
                  <span className="text-sm text-gray-700">← Bài trước</span>
                </button>

                <button className="w-full p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left">
                  <span className="text-sm text-gray-700">Bài tiếp theo →</span>
                </button>

                <button className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <span className="text-sm">Hoàn thành bài học</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
