'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  MessageSquare,
  Target,
  TrendingUp,
  BookOpen,
  Clock,
  Star,
  BarChart3,
  Play,
  Settings
} from 'lucide-react';

export default function AICoachPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'insights' | 'plans'>('overview');

  const tabs = [
    { key: 'overview', label: 'Tổng quan', icon: <BarChart3 className="w-5 h-5" /> },
    { key: 'sessions', label: 'Bài học', icon: <BookOpen className="w-5 h-5" /> },
    { key: 'insights', label: 'Phân tích AI', icon: <Brain className="w-5 h-5" /> },
    { key: 'plans', label: 'Lộ trình', icon: <Target className="w-5 h-5" /> }
  ];

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
                AI Coach 🤖
              </h1>
              <p className="text-lg text-gray-600">
                Huấn luyện viên AI cá nhân giúp bạn học tập hiệu quả hơn
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Cài đặt AI</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Chat với AI</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* AI Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Bài học AI</p>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Brain className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Điểm AI</p>
                      <p className="text-2xl font-bold text-green-600">85</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Star className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Thời gian học</p>
                      <p className="text-2xl font-bold text-purple-600">2.5h</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Lộ trình</p>
                      <p className="text-2xl font-bold text-orange-600">3</p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Target className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-8 h-8" />
                  <h3 className="text-xl font-semibold">Khuyến nghị AI hôm nay</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  Dựa trên phân tích học tập của bạn, tôi khuyên nên tập trung vào ngữ pháp cơ bản N5. 
                  Bạn có thể hoàn thành 2 bài học trong 45 phút tới.
                </p>
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200">
                  Bắt đầu ngay
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tạo lộ trình mới</h3>
                  <p className="text-sm text-gray-600">AI sẽ tạo lộ trình học tập tùy chỉnh</p>
                </button>

                <button className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 text-center">
                  <div className="text-4xl mb-3">📊</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Phân tích chi tiết</h3>
                  <p className="text-sm text-gray-600">Xem báo cáo AI chi tiết về tiến độ</p>
                </button>

                <button className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 text-center">
                  <div className="text-4xl mb-3">💬</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Chat với AI</h3>
                  <p className="text-sm text-gray-600">Hỏi đáp trực tiếp với AI Coach</p>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Bài học AI</h3>
              <p className="text-gray-500">Tính năng đang phát triển...</p>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Phân tích AI</h3>
              <p className="text-gray-500">Tính năng đang phát triển...</p>
            </div>
          )}

          {activeTab === 'plans' && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Lộ trình học tập</h3>
              <p className="text-gray-500">Tính năng đang phát triển...</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
