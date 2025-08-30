'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Target, 
  Users, 
  BarChart3, 
  BookOpen,
  Headphones,
  MessageSquare,
  Settings,
  Zap,
  Clock,
  Star,
  TrendingUp
} from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
  shortcut?: string;
  badge?: string;
}

interface RecentLesson {
  id: string;
  title: string;
  course: string;
  progress: number;
  timeLeft: number;
  icon: string;
}

export default function QuickActions() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [quickActions] = useState<QuickAction[]>([
    {
      id: '1',
      title: 'Tiếp tục học',
      description: 'Bắt đầu bài học tiếp theo',
      icon: <Play className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      href: '/courses/continue',
      shortcut: '⌘ + L',
      badge: 'Hot'
    },
    {
      id: '2',
      title: 'Luyện thi',
      description: 'Làm bài test và kiểm tra',
      icon: <Target className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      href: '/practice',
      shortcut: '⌘ + T'
    },
    {
      id: '3',
      title: 'Cộng đồng',
      description: 'Tham gia thảo luận',
      icon: <Users className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      href: '/community',
      shortcut: '⌘ + C'
    },
    {
      id: '4',
      title: 'Báo cáo',
      description: 'Xem thống kê chi tiết',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      href: '/analytics',
      shortcut: '⌘ + R'
    },
    {
      id: '5',
      title: 'Từ vựng',
      description: 'Ôn tập từ vựng',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      href: '/vocabulary',
      shortcut: '⌘ + V'
    },
    {
      id: '6',
      title: 'Luyện nghe',
      description: 'Cải thiện kỹ năng nghe',
      icon: <Headphones className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
      href: '/listening',
      shortcut: '⌘ + H'
    },
    {
      id: '7',
      title: 'Hỗ trợ',
      description: 'Liên hệ hỗ trợ',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      href: '/support',
      shortcut: '⌘ + S'
    },
    {
      id: '8',
      title: 'Cài đặt',
      description: 'Tùy chỉnh tài khoản',
      icon: <Settings className="w-6 h-6" />,
      color: 'from-gray-500 to-gray-600',
      href: '/settings',
      shortcut: '⌘ + ,'
    }
  ]);

  const [recentLessons] = useState<RecentLesson[]>([
    {
      id: '1',
      title: 'Bài 91: Ngữ pháp cơ bản',
      course: 'Tiếng Nhật N5',
      progress: 75,
      timeLeft: 15,
      icon: '🇯🇵'
    },
    {
      id: '2',
      title: 'Bài 37: Từ vựng gia đình',
      course: 'Tiếng Trung HSK 1',
      progress: 45,
      timeLeft: 25,
      icon: '🇨🇳'
    },
    {
      id: '3',
      title: 'Bài 31: Present Simple',
      course: 'Tiếng Anh A1',
      progress: 30,
      timeLeft: 30,
      icon: '🇺🇸'
    }
  ]);

  const categories = [
    { key: 'all', label: 'Tất cả', icon: <Zap className="w-4 h-4" /> },
    { key: 'study', label: 'Học tập', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'practice', label: 'Luyện tập', icon: <Target className="w-4 h-4" /> },
    { key: 'social', label: 'Cộng đồng', icon: <Users className="w-4 h-4" /> }
  ];

  const filteredActions = quickActions.filter(action => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'study' && ['1', '5', '6'].includes(action.id)) return true;
    if (selectedCategory === 'practice' && ['2', '4'].includes(action.id)) return true;
    if (selectedCategory === 'social' && ['3', '7'].includes(action.id)) return true;
    return false;
  });

  const handleActionClick = (action: QuickAction) => {
    // In a real app, this would navigate to the href
    console.log(`Navigating to: ${action.href}`);
    // For now, just show an alert
    alert(`Bạn đã chọn: ${action.title}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-600" />
          Hành động nhanh
        </h2>
        <div className="text-sm text-gray-500">
          Sử dụng phím tắt để truy cập nhanh
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex bg-gray-100 rounded-lg p-1">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {category.icon}
            {category.label}
          </button>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredActions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="relative group"
          >
            <button
              onClick={() => handleActionClick(action)}
              className="w-full bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {/* Badge */}
              {action.badge && (
                <div className="absolute top-2 right-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {action.badge}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                {action.icon}
              </div>

              {/* Content */}
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {action.description}
                </p>

                {/* Shortcut */}
                {action.shortcut && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Phím tắt</span>
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                      {action.shortcut}
                    </kbd>
                  </div>
                )}
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Recent Lessons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          Bài học gần đây
        </h3>
        
        <div className="space-y-4">
          {recentLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              <span className="text-2xl">{lesson.icon}</span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                <p className="text-sm text-gray-600">{lesson.course}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-blue-600 mb-1">
                  {lesson.progress}%
                </div>
                <div className="text-xs text-gray-500">
                  {lesson.timeLeft} phút
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200">
                <Play className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            Xem tất cả bài học
          </button>
        </div>
      </motion.div>

      {/* Study Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white"
      >
        <div className="text-center">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-xl font-semibold mb-2">Mẹo học tập</h3>
          <p className="text-green-100 mb-4">
            Học ít nhất 30 phút mỗi ngày để duy trì tiến độ tốt nhất!
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Học đều đặn</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Tiến bộ nhanh</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Tiết kiệm thời gian</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
