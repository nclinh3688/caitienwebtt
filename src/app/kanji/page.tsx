'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users2, BookOpen, Star, Play, CheckCircle, Clock, Award, PenTool } from 'lucide-react';

export default function KanjiPage() {
  const [selectedLevel, setSelectedLevel] = useState('n5');

  const levels = [
    { id: 'n5', name: 'Kanji N5', color: 'bg-green-500', kanji: 80, progress: 85 },
    { id: 'n4', name: 'Kanji N4', color: 'bg-yellow-500', kanji: 160, progress: 60 },
    { id: 'n3', name: 'Kanji N3', color: 'bg-orange-500', kanji: 300, progress: 30 },
    { id: 'n2', name: 'Kanji N2', color: 'bg-red-500', kanji: 600, progress: 15 },
    { id: 'n1', name: 'Kanji N1', color: 'bg-purple-500', kanji: 1000, progress: 5 }
  ];

  const radicals = [
    { name: 'Bộ nhân (人)', meaning: 'Người', examples: 50, icon: '👤' },
    { name: 'Bộ thủy (水)', meaning: 'Nước', examples: 45, icon: '💧' },
    { name: 'Bộ hỏa (火)', meaning: 'Lửa', examples: 40, icon: '🔥' },
    { name: 'Bộ mộc (木)', meaning: 'Cây', examples: 55, icon: '🌳' },
    { name: 'Bộ kim (金)', meaning: 'Kim loại', examples: 35, icon: '⚡' },
    { name: 'Bộ thổ (土)', meaning: 'Đất', examples: 30, icon: '🏔️' }
  ];

  const strokeOrder = [
    { name: 'Nét ngang', examples: 20, color: 'from-blue-500 to-blue-600' },
    { name: 'Nét dọc', examples: 18, color: 'from-green-500 to-green-600' },
    { name: 'Nét phẩy', examples: 15, color: 'from-orange-500 to-orange-600' },
    { name: 'Nét mác', examples: 12, color: 'from-purple-500 to-purple-600' },
    { name: 'Nét cong', examples: 10, color: 'from-pink-500 to-pink-600' }
  ];

  const recentKanji = [
    { 
      kanji: '人', 
      reading: 'じん/ひと', 
      meaning: 'Người',
      level: 'N5',
      mastered: true,
      color: 'bg-green-100 text-green-800'
    },
    { 
      kanji: '水', 
      reading: 'すい/みず', 
      meaning: 'Nước',
      level: 'N5',
      mastered: true,
      color: 'bg-green-100 text-green-800'
    },
    { 
      kanji: '火', 
      reading: 'か/ひ', 
      meaning: 'Lửa',
      level: 'N5',
      mastered: false,
      color: 'bg-yellow-100 text-yellow-800'
    },
    { 
      kanji: '木', 
      reading: 'もく/き', 
      meaning: 'Cây',
      level: 'N5',
      mastered: false,
      color: 'bg-yellow-100 text-yellow-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Users2 className="text-red-600" size={40} />
            Kanji Tiếng Nhật
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Học kanji theo cấp độ JLPT. Hiểu ý nghĩa, cách đọc, thứ tự nét 
            và luyện tập viết kanji.
          </p>
        </div>

        {/* JLPT Levels */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="text-red-600" />
            Cấp độ JLPT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {levels.map((level) => (
              <motion.div
                key={level.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-6 rounded-xl text-white cursor-pointer transition-all duration-300 ${
                  selectedLevel === level.id ? 'ring-4 ring-red-300' : ''
                }`}
                style={{
                  background: `linear-gradient(135deg, ${level.color.replace('bg-', '')} 0%, ${level.color.replace('bg-', '').replace('-500', '-600')} 100%)`
                }}
                onClick={() => setSelectedLevel(level.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">{level.name}</h3>
                  <Star className="text-yellow-200" size={20} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Kanji:</span>
                    <span className="font-bold">{level.kanji}</span>
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
                  href={`/kanji/${level.id}`}
                  className="absolute inset-0 rounded-xl"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Radicals */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="text-blue-600" />
            Bộ thủ (Radicals)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {radicals.map((radical, index) => (
              <motion.div
                key={radical.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{radical.icon}</div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Ví dụ</div>
                    <div className="font-bold text-lg text-gray-900">{radical.examples}</div>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{radical.name}</h3>
                <p className="text-gray-600 mb-4">Ý nghĩa: {radical.meaning}</p>
                <Link
                  href={`/kanji/radicals/${radical.name.toLowerCase().replace(' ', '-').replace('(', '').replace(')', '')}`}
                  className="px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg inline-block"
                >
                  Học ngay
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stroke Order */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <PenTool className="text-green-600" />
            Thứ tự nét
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {strokeOrder.map((stroke, index) => (
              <motion.div
                key={stroke.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
              >
                <div className="text-3xl mb-3">✍️</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{stroke.name}</h3>
                <p className="text-gray-600 mb-4">{stroke.examples} ví dụ</p>
                <Link
                  href={`/kanji/stroke-order/${stroke.name.toLowerCase().replace(' ', '-')}`}
                  className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 bg-gradient-to-r ${stroke.color} hover:shadow-lg inline-block`}
                >
                  Luyện tập
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Kanji & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Kanji */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Clock className="text-red-600" />
              Kanji gần đây
            </h2>
            <div className="space-y-4">
              {recentKanji.map((kanji, index) => (
                <motion.div
                  key={kanji.kanji}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-gray-900">{kanji.kanji}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${kanji.color}`}>
                          {kanji.level}
                        </div>
                        {kanji.mastered && <CheckCircle size={16} className="text-green-500" />}
                      </div>
                      <div className="text-sm text-gray-600">{kanji.reading}</div>
                      <div className="text-sm text-gray-800 font-medium">{kanji.meaning}</div>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                    <Play size={16} className="text-gray-600" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Hành động nhanh</h2>
            <div className="space-y-4">
              <Link
                href="/kanji/practice"
                className="flex items-center gap-4 p-4 rounded-lg bg-red-50 hover:bg-red-100 transition-colors border border-red-200"
              >
                <div className="p-3 rounded-lg bg-red-500 text-white">
                  <PenTool size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Luyện viết</h3>
                  <p className="text-sm text-gray-600">Thực hành viết kanji</p>
                </div>
              </Link>
              
              <Link
                href="/kanji/quiz"
                className="flex items-center gap-4 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <div className="p-3 rounded-lg bg-blue-500 text-white">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Kiểm tra</h3>
                  <p className="text-sm text-gray-600">Bài kiểm tra kanji</p>
                </div>
              </Link>
              
              <Link
                href="/kanji/dictionary"
                className="flex items-center gap-4 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors border border-green-200"
              >
                <div className="p-3 rounded-lg bg-green-500 text-white">
                  <Star size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Từ điển kanji</h3>
                  <p className="text-sm text-gray-600">Tra cứu kanji</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
