'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Book, List, ArrowLeft } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  order: number;
  description: string;
}

interface Course {
    id: string;
    lessons: Lesson[];
}

export default function VocabularyLessonListPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        // First, find the N4 Japanese course to get its ID
        const courseResponse = await fetch('/api/courses?language=japanese&level=n4');
        const courseData = await courseResponse.json();
        
        if (courseData.success && courseData.data.length > 0) {
          const n4Course: Course = courseData.data[0];
          // Now fetch the lessons for that specific course
          // NOTE: The API might return all lessons for the course, we might need to filter for vocabulary later
          setLessons(n4Course.lessons.sort((a, b) => a.order - b.order));
        } else {
          console.error('Could not find the N4 Japanese course.');
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        <Link href="/courses" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại trang khóa học
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-blue-100 text-blue-600 p-4 rounded-full mb-4">
            <Book size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Từ vựng JLPT N4</h1>
          <p className="text-lg text-gray-600 mt-2">Chọn một bài học để bắt đầu học từ vựng.</p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <ul className="space-y-4">
            {lessons.map((lesson, index) => (
              <motion.li 
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/courses/japanese/n4/vocabulary/${lesson.order}`}>
                  <div className="block p-6 border rounded-lg hover:bg-blue-50 transition-colors duration-200 group">
                    <div className="flex items-center justify-between">
                      <div>
                                                <div className="flex items-center">
                          <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">{`第${lesson.order}課`}</span>
                          <span className="mx-4 text-gray-300 font-light">|</span>
                          <span className="text-lg font-medium text-gray-500 tracking-wider">{`BÀI ${lesson.order}`}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}