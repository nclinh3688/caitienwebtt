'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, BookOpen, Star, Play, CheckCircle, Clock, Award } from 'lucide-react';

export default function GrammarPage() {
  const [selectedLevel, setSelectedLevel] = useState('basic');

  const levels = [
    { 
      id: 'basic', 
      name: 'Ngữ pháp cơ bản', 
      color: 'bg-green-500', 
      lessons: 25, 
      progress: 80,
      description: 'Học các cấu trúc cơ bản nhất'
    },
    { 
      id: 'intermediate', 
      name: 'Ngữ pháp trung cấp', 
      color: 'bg-blue-500', 
      lessons: 40, 
      progress: 45,
      description: 'Nâng cao kỹ năng ngữ pháp'
    },
    { 
      id: 'advanced', 
      name: 'Ngữ pháp nâng cao', 
      color: 'bg-purple-500', 
      lessons: 60, 
      progress: 20,
      description: 'Thành thạo ngữ pháp phức tạp'
    }
  ];

  const jlptPatterns = [
    { name: 'JLPT N5', patterns: 50, color: 'from-green-500 to-green-600', icon: '🟢' },
    { name: 'JLPT N4', patterns: 80, color: 'from-yellow-500 to-yellow-600', icon: '🟡' },
    { name: 'JLPT N3', patterns: 120, color: 'from-orange-500 to-orange-600', icon: '🟠' },
    { name: 'JLPT N2', patterns: 200, color: 'from-red-500 to-red-600', icon: '🔴' },
    { name: 'JLPT N1', patterns: 300, color: 'from-purple-500 to-purple-600', icon: '⚫' }
  ];

  const recentLessons = [
    { 
      title: 'Thì hiện tại', 
      level: 'N5', 
      duration: '15 phút',
      completed: true,
      color: 'bg-green-100 text-green-800'
    },
    { 
      title: 'Thì quá khứ', 
      level: 'N5', 
      duration: '20 phút',
      completed: true,
      color: 'bg-green-100 text-green-800'
    },
    { 
      title: 'Thể て', 
      level: 'N4', 
      duration: '25 phút',
      completed: false,
      color: 'bg-yellow-100 text-yellow-800'
    },
    { 
      title: 'Thể た', 
      level: 'N4', 
      duration: '30 phút',
      completed: false,
      color: 'bg-yellow-100 text-yellow-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Target className="text-indigo-600" size={40} />
            Ngữ Pháp Tiếng Nhật
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Học ngữ pháp từ cơ bản đến nâng cao. Hiểu rõ cấu trúc câu, 
            cách sử dụng và luyện tập với bài tập tương tác.
          </p>
        </div>

        {/* Grammar Levels */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="text-indigo-600" />
            Cấp độ ngữ pháp
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {levels.map((level) => (
              <motion.div
                key={level.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 rounded-xl text-white cursor-pointer transition-all duration-300 ${
                  selectedLevel === level.id ? 'ring-4 ring-indigo-300' : ''
                }`}
                style={{
                  background: `linear-gradient(135deg, ${level.color.replace('bg-', '')} 0%, ${level.color.replace('bg-', '').replace('-500', '-600')} 100%)`
                }}
                onClick={() => setSelectedLevel(level.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-xl">{level.name}</h3>
                  <Star className="text-yellow-200" size={24} />
                </div>
                <p className="text-sm opacity-90 mb-4">{level.description}</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Bài học:</span>
                    <span className="font-bold">{level.lessons}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${level.progress}%` }}
                    />
                  </div>
                  <div className="text-sm opacity-90">
                    {level.progress}% hoàn thành
                  </div>
                </div>
                <Link 
                  href={`/grammar/${level.id}`}
                  className="absolute inset-0 rounded-xl"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* JLPT Patterns */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="text-yellow-600" />
            Mẫu câu JLPT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {jlptPatterns.map((pattern, index) => (
              <motion.div
                key={pattern.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{pattern.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{pattern.name}</h3>
                  <p className="text-gray-600 mb-4">{pattern.patterns} mẫu câu</p>
                  <Link
                    href={`/grammar/jlpt/${pattern.name.toLowerCase().replace(' ', '-')}`}
                    className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 bg-gradient-to-r ${pattern.color} hover:shadow-lg block text-center`}
                  >
                    Học ngay
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Lessons & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Lessons */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="text-blue-600" />
              Bài học gần đây
            </h2>
            <div className="space-y-4">
              {recentLessons.map((lesson, index) => (
                <motion.div
                  key={lesson.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${lesson.color}`}>
                      {lesson.level}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                      <p className="text-sm text-gray-600">{lesson.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {lesson.completed ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <Play size={20} className="text-blue-500" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Hành động nhanh</h2>
            <div className="space-y-4">
              <Link
                href="/grammar/practice"
                className="flex items-center gap-4 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <div className="p-3 rounded-lg bg-blue-500 text-white">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Luyện tập</h3>
                  <p className="text-sm text-gray-600">Bài tập ngữ pháp</p>
                </div>
              </Link>
              
              <Link
                href="/grammar/quiz"
                className="flex items-center gap-4 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors border border-green-200"
              >
                <div className="p-3 rounded-lg bg-green-500 text-white">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Kiểm tra</h3>
                  <p className="text-sm text-gray-600">Bài kiểm tra ngữ pháp</p>
                </div>
              </Link>
              
              <Link
                href="/grammar/reference"
                className="flex items-center gap-4 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-200"
              >
                <div className="p-3 rounded-lg bg-purple-500 text-white">
                  <Star size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Tài liệu tham khảo</h3>
                  <p className="text-sm text-gray-600">Bảng tóm tắt ngữ pháp</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
