'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Trophy, 
  BookOpen, 
  Target, 
  Calendar,
  Star,
  Award,
  Clock,
  CheckCircle,
  Play,
  BarChart3,
  Users,
  Zap
} from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface CourseProgress {
  id: string;
  name: string;
  language: string;
  level: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
}

interface QuickStat {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

export default function DashboardPage() {
  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      name: 'Người mới bắt đầu',
      description: 'Hoàn thành bài học đầu tiên',
      icon: '🌟',
      unlocked: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: '2',
      name: 'Học viên chăm chỉ',
      description: 'Học liên tục 7 ngày',
      icon: '🔥',
      unlocked: false,
      progress: 5,
      maxProgress: 7
    },
    {
      id: '3',
      name: 'Từ vựng xuất sắc',
      description: 'Học 100 từ vựng mới',
      icon: '📚',
      unlocked: false,
      progress: 67,
      maxProgress: 100
    },
    {
      id: '4',
      name: 'Ngữ pháp vững vàng',
      description: 'Hoàn thành 50 bài ngữ pháp',
      icon: '📖',
      unlocked: false,
      progress: 23,
      maxProgress: 50
    }
  ]);

  const [courseProgress] = useState<CourseProgress[]>([
    {
      id: '1',
      name: 'Tiếng Nhật N5',
      language: '🇯🇵',
      level: 'N5 - Cơ bản',
      progress: 75,
      totalLessons: 120,
      completedLessons: 90,
      nextLesson: 'Bài 91: Ngữ pháp cơ bản'
    },
    {
      id: '2',
      name: 'Tiếng Trung HSK 1',
      language: '🇨🇳',
      level: 'HSK 1',
      progress: 45,
      totalLessons: 80,
      completedLessons: 36,
      nextLesson: 'Bài 37: Từ vựng gia đình'
    },
    {
      id: '3',
      name: 'Tiếng Anh A1',
      language: '🇺🇸',
      level: 'A1 - Beginner',
      progress: 30,
      totalLessons: 100,
      completedLessons: 30,
      nextLesson: 'Bài 31: Present Simple'
    }
  ]);

  const [quickStats] = useState<QuickStat[]>([
    {
      label: 'Tổng thời gian học',
      value: '24h 30m',
      change: '+2h 15m',
      icon: <Clock className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Bài học hoàn thành',
      value: '156',
      change: '+12',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Điểm số trung bình',
      value: '8.7/10',
      change: '+0.3',
      icon: <Star className="w-5 h-5" />,
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      label: 'Ngày học liên tục',
      value: '15',
      change: '+1',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600'
    }
  ]);

  const [recentActivities] = useState([
    { id: '1', action: 'Hoàn thành bài học', course: 'Tiếng Nhật N5 - Bài 90', time: '2 giờ trước', icon: '✅' },
    { id: '2', action: 'Đạt điểm cao', course: 'Kiểm tra từ vựng N5', time: '4 giờ trước', icon: '🏆' },
    { id: '3', action: 'Mở khóa thành tích', course: 'Người mới bắt đầu', time: '1 ngày trước', icon: '🌟' },
    { id: '4', action: 'Tham gia nhóm học', course: 'Cộng đồng N5', time: '2 ngày trước', icon: '👥' }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Chào mừng trở lại! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Hôm nay bạn muốn học gì?
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Progress */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  Tiến độ khóa học
                </h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Xem tất cả
                </button>
              </div>
              
              <div className="space-y-4">
                {courseProgress.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{course.language}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{course.name}</h3>
                          <p className="text-sm text-gray-600">{course.level}</p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-blue-600">
                        {course.progress}%
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{course.completedLessons}/{course.totalLessons} bài học</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Bài tiếp theo: {course.nextLesson}
                      </p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Tiếp tục
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-green-600" />
                Hoạt động gần đây
              </h2>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.course}</p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Achievements & Quick Actions */}
          <div className="space-y-8">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-600" />
                Thành tích
              </h2>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      achievement.unlocked 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          achievement.unlocked ? 'text-green-800' : 'text-gray-700'
                        }`}>
                          {achievement.name}
                        </h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <Award className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                        <span>{Math.round((achievement.progress / achievement.maxProgress) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            achievement.unlocked 
                              ? 'bg-gradient-to-r from-green-500 to-green-600' 
                              : 'bg-gradient-to-r from-blue-500 to-blue-600'
                          }`}
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-orange-600" />
                Hành động nhanh
              </h2>
              
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg">
                  <Play className="w-5 h-5" />
                  Bắt đầu học ngay
                </button>
                
                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg">
                  <Target className="w-5 h-5" />
                  Luyện thi
                </button>
                
                <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white p-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg">
                  <Users className="w-5 h-5" />
                  Tham gia cộng đồng
                </button>
                
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg">
                  <BarChart3 className="w-5 h-5" />
                  Xem báo cáo chi tiết
                </button>
              </div>
            </motion.div>

            {/* Study Streak */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">🔥 15</div>
                <div className="text-lg mb-1">Ngày học liên tục</div>
                <div className="text-sm opacity-90">Chuỗi dài nhất: 23 ngày</div>
                <div className="mt-4 text-sm">
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < 5 ? 'bg-white' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-2 text-xs opacity-80">Tuần này</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
