'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award,
  BarChart3,
  PieChart,
  LineChart,
  Clock,
  BookOpen,
  Star,
  Download,
  Share2
} from 'lucide-react';

interface DailyProgress {
  date: string;
  lessons: number;
  time: number;
  score: number;
  streak: boolean;
}

interface WeeklyStats {
  week: string;
  totalLessons: number;
  totalTime: number;
  averageScore: number;
  streakDays: number;
}

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'daily' | 'weekly' | 'monthly';
  color: string;
}

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [selectedView, setSelectedView] = useState<'overview' | 'detailed' | 'goals'>('overview');


  // Sample data - in real app this would come from API
  const [dailyProgress] = useState<DailyProgress[]>([
    { date: '2024-01-15', lessons: 5, time: 120, score: 85, streak: true },
    { date: '2024-01-16', lessons: 7, time: 150, score: 92, streak: true },
    { date: '2024-01-17', lessons: 4, time: 90, score: 78, streak: false },
    { date: '2024-01-18', lessons: 8, time: 180, score: 95, streak: true },
    { date: '2024-01-19', lessons: 6, time: 140, score: 88, streak: true },
    { date: '2024-01-20', lessons: 9, time: 200, score: 96, streak: true },
    { date: '2024-01-21', lessons: 3, time: 60, score: 82, streak: false }
  ]);

  const [weeklyStats] = useState<WeeklyStats[]>([
    { week: 'Tuần 1', totalLessons: 35, totalTime: 840, averageScore: 87.5, streakDays: 5 },
    { week: 'Tuần 2', totalLessons: 42, totalTime: 1020, averageScore: 89.2, streakDays: 6 },
    { week: 'Tuần 3', totalLessons: 38, totalTime: 920, averageScore: 86.8, streakDays: 4 },
    { week: 'Tuần 4', totalLessons: 45, totalTime: 1080, averageScore: 91.0, streakDays: 7 }
  ]);

  const [goals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Học 100 từ vựng mới',
      target: 100,
      current: 67,
      unit: 'từ',
      deadline: '2024-02-15',
      category: 'monthly',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: '2',
      title: 'Hoàn thành 50 bài ngữ pháp',
      target: 50,
      current: 23,
      unit: 'bài',
      deadline: '2024-02-28',
      category: 'monthly',
      color: 'from-green-500 to-green-600'
    },
    {
      id: '3',
      title: 'Học liên tục 30 ngày',
      target: 30,
      current: 15,
      unit: 'ngày',
      deadline: '2024-02-14',
      category: 'daily',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: '4',
      title: 'Đạt điểm trung bình 90%',
      target: 90,
      current: 87.5,
      unit: '%',
      deadline: '2024-02-20',
      category: 'weekly',
      color: 'from-orange-500 to-orange-600'
    }
  ]);

  const periods = [
    { key: 'week', label: 'Tuần này', icon: Calendar },
    { key: 'month', label: 'Tháng này', icon: BarChart3 },
    { key: 'year', label: 'Năm nay', icon: TrendingUp }
  ];

  const views = [
    { key: 'overview', label: 'Tổng quan', icon: BarChart3 },
    { key: 'detailed', label: 'Chi tiết', icon: PieChart },
    { key: 'goals', label: 'Mục tiêu', icon: Target }
  ];

  const totalStats = {
    totalLessons: dailyProgress.reduce((sum, day) => sum + day.lessons, 0),
    totalTime: dailyProgress.reduce((sum, day) => sum + day.time, 0),
    averageScore: Math.round(dailyProgress.reduce((sum, day) => sum + day.score, 0) / dailyProgress.length),
    streakDays: dailyProgress.filter(day => day.streak).length
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Theo dõi tiến độ học tập 📊
              </h1>
              <p className="text-lg text-gray-600">
                Xem chi tiết tiến độ và đặt mục tiêu học tập
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Xuất báo cáo</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Chia sẻ</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex bg-gray-100 rounded-lg p-1">
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
                  <span className="hidden sm:inline">{period.label}</span>
                </button>
              ))}
            </div>

            {/* View Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {views.map((view) => (
                <button
                  key={view.key}
                  onClick={() => setSelectedView(view.key as any)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedView === view.key
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <view.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{view.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {selectedView === 'overview' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Điểm trung bình</p>
                        <p className="text-2xl font-bold text-gray-900">{totalStats.averageScore}%</p>
                      </div>
                      <div className="p-3 bg-yellow-100 rounded-lg">
                        <Star className="w-6 h-6 text-yellow-600" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
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
                  {/* Daily Progress Chart */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      Tiến độ hàng ngày
                    </h3>
                    
                    <div className="space-y-4">
                      {dailyProgress.map((day, index) => (
                        <div key={day.date} className="flex items-center gap-4">
                          <div className="w-16 text-sm font-medium text-gray-600">
                            {new Date(day.date).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' })}
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
                                transition={{ delay: 0.7 + index * 0.1, duration: 1 }}
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
                          <div className="w-8 text-center">
                            {day.streak && (
                              <span className="text-yellow-500">🔥</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Weekly Stats Chart */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <LineChart className="w-5 h-5 text-green-600" />
                      Thống kê tuần
                    </h3>
                    
                    <div className="space-y-4">
                      {weeklyStats.map((week, index) => (
                        <div key={week.week} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{week.week}</span>
                            <span className="text-sm text-gray-600">{week.streakDays} ngày</span>
                          </div>
                          
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(week.totalLessons / 50) * 100}%` }}
                              transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                              className="h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600"
                            />
                          </div>
                          
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{week.totalLessons} bài học</span>
                            <span>{Math.round(week.totalTime / 60)}h</span>
                            <span>{week.averageScore}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Study Streak */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">🔥 Chuỗi học tập hiện tại</h3>
                    <div className="text-4xl font-bold mb-2">{totalStats.streakDays} ngày</div>
                    <p className="text-purple-100 mb-6">Bạn đang duy trì chuỗi học tập tuyệt vời!</p>
                    
                    <div className="flex justify-center gap-2 mb-4">
                      {Array.from({ length: 7 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded-full transition-all duration-300 ${
                            i < totalStats.streakDays ? 'bg-white' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-purple-100">Tuần này</p>
                  </div>
                </motion.div>
              </div>
            )}

            {selectedView === 'detailed' && (
              <div className="space-y-6">
                {/* Detailed Analytics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân tích chi tiết</h3>
                  <p className="text-gray-600">Tính năng đang phát triển...</p>
                </motion.div>
              </div>
            )}

            {selectedView === 'goals' && (
              <div className="space-y-6">
                {/* Goals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {goals.map((goal, index) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Tiến độ: {goal.current}/{goal.target} {goal.unit}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            goal.category === 'daily' ? 'bg-blue-100 text-blue-800' :
                            goal.category === 'weekly' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {goal.category === 'daily' ? 'Hàng ngày' :
                             goal.category === 'weekly' ? 'Hàng tuần' : 'Hàng tháng'}
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(goal.current / goal.target) * 100}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                            className={`h-3 rounded-full bg-gradient-to-r ${goal.color}`}
                          />
                        </div>
                        
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                          <span>Hạn: {new Date(goal.deadline).toLocaleDateString('vi-VN')}</span>
                        </div>
                      </div>
                      
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-200">
                        Cập nhật tiến độ
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Add New Goal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Thêm mục tiêu mới</h3>
                    <p className="text-gray-600 mb-4">Đặt mục tiêu học tập để theo dõi tiến độ</p>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                      Tạo mục tiêu
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
