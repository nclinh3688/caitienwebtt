'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Award, 
  Target, 
  Zap,
  Crown,
  Medal,
  Gift,
  Sparkles,
  CheckCircle
} from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'master';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward: string;
  points: number;
  unlockedAt?: string;
}

interface AchievementCategory {
  key: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export default function AchievementSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  const [achievements] = useState<Achievement[]>([
    // Beginner Achievements
    {
      id: '1',
      name: 'Người mới bắt đầu',
      description: 'Hoàn thành bài học đầu tiên',
      icon: '🌟',
      category: 'beginner',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      reward: '10 XP + Huy hiệu mới',
      points: 10,
      unlockedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Học viên chăm chỉ',
      description: 'Học liên tục 7 ngày',
      icon: '🔥',
      category: 'beginner',
      unlocked: false,
      progress: 5,
      maxProgress: 7,
      reward: '25 XP + Huy hiệu lửa',
      points: 25
    },
    {
      id: '3',
      name: 'Từ vựng xuất sắc',
      description: 'Học 100 từ vựng mới',
      icon: '📚',
      category: 'beginner',
      unlocked: false,
      progress: 67,
      maxProgress: 100,
      reward: '50 XP + Huy hiệu sách',
      points: 50
    },
    {
      id: '4',
      name: 'Ngữ pháp vững vàng',
      description: 'Hoàn thành 50 bài ngữ pháp',
      icon: '📖',
      category: 'beginner',
      unlocked: false,
      progress: 23,
      maxProgress: 50,
      reward: '75 XP + Huy hiệu ngữ pháp',
      points: 75
    },

    // Intermediate Achievements
    {
      id: '5',
      name: 'Luyện thi thành công',
      description: 'Đạt điểm cao trong 10 bài test',
      icon: '🎯',
      category: 'intermediate',
      unlocked: true,
      progress: 10,
      maxProgress: 10,
      reward: '100 XP + Huy hiệu mục tiêu',
      points: 100,
      unlockedAt: '2024-01-20'
    },
    {
      id: '6',
      name: 'Cộng đồng tích cực',
      description: 'Tham gia 20 cuộc thảo luận',
      icon: '👥',
      category: 'intermediate',
      unlocked: false,
      progress: 12,
      maxProgress: 20,
      reward: '150 XP + Huy hiệu cộng đồng',
      points: 150
    },
    {
      id: '7',
      name: 'Đa ngôn ngữ',
      description: 'Học 3 ngôn ngữ khác nhau',
      icon: '🌍',
      category: 'intermediate',
      unlocked: false,
      progress: 2,
      maxProgress: 3,
      reward: '200 XP + Huy hiệu thế giới',
      points: 200
    },

    // Advanced Achievements
    {
      id: '8',
      name: 'Thành thạo N3',
      description: 'Hoàn thành trình độ N3 tiếng Nhật',
      icon: '🏆',
      category: 'advanced',
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      reward: '500 XP + Huy hiệu vàng',
      points: 500
    },
    {
      id: '9',
      name: 'Giáo viên tình nguyện',
      description: 'Giúp đỡ 50 học viên khác',
      icon: '👨‍🏫',
      category: 'advanced',
      unlocked: false,
      progress: 8,
      maxProgress: 50,
      reward: '750 XP + Huy hiệu giáo viên',
      points: 750
    },

    // Master Achievements
    {
      id: '10',
      name: 'Bậc thầy ngôn ngữ',
      description: 'Đạt trình độ cao nhất trong 2 ngôn ngữ',
      icon: '👑',
      category: 'master',
      unlocked: false,
      progress: 0,
      maxProgress: 2,
      reward: '1000 XP + Huy hiệu vương miện',
      points: 1000
    },
    {
      id: '11',
      name: 'Sáng tạo nội dung',
      description: 'Tạo 100 bài học chất lượng',
      icon: '✨',
      category: 'master',
      unlocked: false,
      progress: 0,
      maxProgress: 100,
      reward: '1500 XP + Huy hiệu sáng tạo',
      points: 1500
    }
  ]);

  const categories: AchievementCategory[] = [
    { key: 'all', label: 'Tất cả', icon: <Trophy className="w-5 h-5" />, color: 'from-gray-500 to-gray-600' },
    { key: 'beginner', label: 'Người mới', icon: <Star className="w-5 h-5" />, color: 'from-green-500 to-green-600' },
    { key: 'intermediate', label: 'Trung cấp', icon: <Target className="w-5 h-5" />, color: 'from-blue-500 to-blue-600' },
    { key: 'advanced', label: 'Nâng cao', icon: <Award className="w-5 h-5" />, color: 'from-purple-500 to-purple-600' },
    { key: 'master', label: 'Bậc thầy', icon: <Crown className="w-5 h-5" />, color: 'from-yellow-500 to-yellow-600' }
  ];

  const filteredAchievements = achievements.filter(achievement => {
    if (selectedCategory !== 'all' && achievement.category !== selectedCategory) return false;
    if (showUnlockedOnly && !achievement.unlocked) return false;
    return true;
  });

  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.key === category);
    return cat ? cat.color : 'from-gray-500 to-gray-600';
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.key === category);
    return cat ? cat.icon : <Star className="w-5 h-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-600" />
          Hệ thống thành tích
        </h2>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Tổng điểm</p>
            <p className="text-2xl font-bold text-yellow-600">{totalPoints} XP</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Thành tích</p>
            <p className="text-2xl font-bold text-blue-600">{unlockedCount}/{totalCount}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
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

        {/* Toggle Filter */}
        <button
          onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            showUnlockedOnly
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          {showUnlockedOnly ? 'Đã mở khóa' : 'Tất cả'}
        </button>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                achievement.unlocked
                  ? 'border-green-200 bg-gradient-to-br from-green-50 to-green-100'
                  : 'border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100'
              }`}
            >
              {/* Category Badge */}
              <div className={`absolute top-3 right-3 p-2 rounded-full bg-gradient-to-r ${getCategoryColor(achievement.category)} text-white`}>
                {getCategoryIcon(achievement.category)}
              </div>

              {/* Achievement Content */}
              <div className="p-6">
                <div className="text-center mb-4">
                  <div className={`text-4xl mb-2 ${achievement.unlocked ? 'animate-bounce' : ''}`}>
                    {achievement.icon}
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${
                    achievement.unlocked ? 'text-green-800' : 'text-gray-700'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {achievement.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                    <span>{Math.round((achievement.progress / achievement.maxProgress) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                      className={`h-2 rounded-full ${
                        achievement.unlocked
                          ? 'bg-gradient-to-r from-green-500 to-green-600'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600'
                      }`}
                    />
                  </div>
                </div>

                {/* Reward Info */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-sm font-medium text-yellow-600">
                      {achievement.points} XP
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="text-sm text-gray-600">
                      {achievement.reward}
                    </span>
                  </div>

                  {achievement.unlocked && (
                    <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Đã mở khóa
                      {achievement.unlockedAt && (
                        <span className="text-gray-500">
                          {new Date(achievement.unlockedAt).toLocaleDateString('vi-VN')}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Unlocked Overlay */}
              {achievement.unlocked && (
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent pointer-events-none" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Không tìm thấy thành tích nào
          </h3>
          <p className="text-gray-500">
            Hãy thử thay đổi bộ lọc hoặc tiếp tục học để mở khóa thành tích mới!
          </p>
        </motion.div>
      )}

      {/* Progress Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white"
      >
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">🚀 Tiến độ tổng thể</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold mb-1">{unlockedCount}</div>
              <div className="text-blue-100">Thành tích đã mở</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">{totalPoints}</div>
              <div className="text-blue-100">Tổng điểm XP</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">{Math.round((unlockedCount / totalCount) * 100)}%</div>
              <div className="text-blue-100">Tỷ lệ hoàn thành</div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="w-full bg-white/20 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
                transition={{ delay: 1, duration: 1.5 }}
                className="h-3 rounded-full bg-white"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
