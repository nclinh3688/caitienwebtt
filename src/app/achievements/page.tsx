'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Star,
  Award,
  Target,
  Crown,
  CheckCircle,
  TrendingUp,
  Share2,
  Filter,
  Search,
  Sparkles
} from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'master' | 'special';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward: string;
  points: number;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  difficulty: number;
  tags: string[];
}

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
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
      unlockedAt: '2024-01-15',
      rarity: 'common',
      difficulty: 1,
      tags: ['first-step', 'beginner']
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
      points: 25,
      rarity: 'common',
      difficulty: 2,
      tags: ['streak', 'consistency']
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
      points: 50,
      rarity: 'rare',
      difficulty: 3,
      tags: ['vocabulary', 'learning']
    }
  ]);

  const categories = [
    { key: 'all', label: 'Tất cả', icon: <Trophy className="w-5 h-5" />, color: 'from-gray-500 to-gray-600' },
    { key: 'beginner', label: 'Người mới', icon: <Star className="w-5 h-5" />, color: 'from-green-500 to-green-600' },
    { key: 'intermediate', label: 'Trung cấp', icon: <Target className="w-5 h-5" />, color: 'from-blue-500 to-blue-600' },
    { key: 'advanced', label: 'Nâng cao', icon: <Award className="w-5 h-5" />, color: 'from-purple-500 to-purple-600' },
    { key: 'master', label: 'Bậc thầy', icon: <Crown className="w-5 h-5" />, color: 'from-yellow-500 to-yellow-600' }
  ];

  const rarities = [
    { key: 'all', label: 'Tất cả', color: 'from-gray-500 to-gray-600' },
    { key: 'common', label: 'Thường', color: 'from-gray-400 to-gray-500' },
    { key: 'rare', label: 'Hiếm', color: 'from-blue-400 to-blue-500' },
    { key: 'epic', label: 'Epic', color: 'from-purple-400 to-purple-500' },
    { key: 'legendary', label: 'Huyền thoại', color: 'from-yellow-400 to-yellow-500' }
  ];

  const filteredAchievements = achievements.filter(achievement => {
    if (selectedCategory !== 'all' && achievement.category !== selectedCategory) return false;
    if (selectedRarity !== 'all' && achievement.rarity !== selectedRarity) return false;
    if (showUnlockedOnly && !achievement.unlocked) return false;
    if (searchQuery && !achievement.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
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
                Hệ thống thành tích 🏆
              </h1>
              <p className="text-lg text-gray-600">
                Khám phá và mở khóa các thành tích học tập tuyệt vời
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Chia sẻ</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Bảng xếp hạng</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng điểm</p>
                <p className="text-2xl font-bold text-yellow-600">{totalPoints} XP</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Thành tích</p>
                <p className="text-2xl font-bold text-blue-600">{unlockedCount}/{totalCount}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tỷ lệ hoàn thành</p>
                <p className="text-2xl font-bold text-green-600">{Math.round((unlockedCount / totalCount) * 100)}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Xếp hạng</p>
                <p className="text-2xl font-bold text-purple-600">#3</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm thành tích..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {/* Category Filter */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.key
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.label}</span>
                  </button>
                ))}
              </div>

              {/* Rarity Filter */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {rarities.map((rarity) => (
                  <button
                    key={rarity.key}
                    onClick={() => setSelectedRarity(rarity.key)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      selectedRarity === rarity.key
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {rarity.label}
                  </button>
                ))}
              </div>
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
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
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
              <div className="p-6 pt-16">
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
                  <div className="text-sm text-gray-600 mb-2">
                    {achievement.reward}
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
        </motion.div>
      </div>
    </div>
  );
}
