'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award,
  BarChart3,
  PieChart,
  LineChart,
  BookOpen,
  Clock
} from 'lucide-react';

interface ProgressData {
  date: string;
  lessons: number;
  time: number;
  score: number;
}

interface LanguageProgress {
  language: string;
  progress: number;
  lessons: number;
  time: number;
  color: string;
}

export default function ProgressTracker() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [progressData] = useState<ProgressData[]>([
    { date: 'T2', lessons: 5, time: 120, score: 85 },
    { date: 'T3', lessons: 7, time: 150, score: 92 },
    { date: 'T4', lessons: 4, time: 90, score: 78 },
    { date: 'T5', lessons: 8, time: 180, score: 95 },
    { date: 'T6', lessons: 6, time: 140, score: 88 },
    { date: 'T7', lessons: 9, time: 200, score: 96 },
    { date: 'CN', lessons: 3, time: 60, score: 82 }
  ]);

  const [languageProgress] = useState<LanguageProgress[]>([
    { language: 'Tiếng Nhật', progress: 75, lessons: 90, time: 1200, color: '#3b82f6' },
    { language: 'Tiếng Trung', progress: 45, lessons: 36, time: 800, color: '#ef4444' },
    { language: 'Tiếng Anh', progress: 30, lessons: 30, time: 600, color: '#10b981' },
    { language: 'Tiếng Hàn', progress: 20, lessons: 15, time: 300, color: '#8b5cf6' }
  ]);

  const [totalStats] = useState({
    totalLessons: 171,
    totalTime: 2900,
    averageScore: 87.5,
    streakDays: 15
  });

  const periods = [
    { key: 'week', label: 'Tuần này', icon: Calendar },
    { key: 'month', label: 'Tháng này', icon: BarChart3 },
    { key: 'year', label: 'Năm nay', icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-600" />
          Theo dõi tiến độ
        </h2>
        <div className="flex bg-gray-100 rounded-lg p-1 ml-auto">
          {periods.map((period) => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedPeriod === period.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <period.icon className="w-4 h-4" />
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Total Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng bài học</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.totalLessons}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng thời gian</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(totalStats.totalTime / 60)}h</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Điểm trung bình</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.averageScore}%</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ngày liên tục</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.streakDays}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Tiến độ tuần này
          </h3>
          
          <div className="space-y-4">
            {progressData.map((day, index) => (
              <div key={day.date} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-gray-600">
                  {day.date}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{day.lessons} bài học</span>
                    <span>{day.time} phút</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(day.lessons / 10) * 100}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                    />
                  </div>
                </div>
                <div className="w-16 text-right">
                  <span className={`text-sm font-medium ${
                    day.score >= 90 ? 'text-green-600' :
                    day.score >= 80 ? 'text-blue-600' :
                    day.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {day.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Language Progress Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-green-600" />
            Tiến độ ngôn ngữ
          </h3>
          
          <div className="space-y-4">
            {languageProgress.map((lang, index) => (
              <div key={lang.language} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="font-medium text-gray-900">{lang.language}</span>
                  </div>
                  <span className="text-sm text-gray-600">{lang.progress}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lang.progress}%` }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 1 }}
                    className="h-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{lang.lessons} bài học</span>
                  <span>{Math.round(lang.time / 60)}h</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Study Streak Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white"
      >
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">🔥 Chuỗi học tập</h3>
          <div className="text-4xl font-bold mb-2">{totalStats.streakDays} ngày</div>
          <p className="text-purple-100 mb-6">Bạn đang duy trì chuỗi học tập tuyệt vời!</p>
          
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  i < 5 ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-purple-100">Tuần này</p>
        </div>
      </motion.div>
    </div>
  );
}
