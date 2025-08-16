'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaTrophy, 
  FaMedal, 
  FaCrown, 
  FaStar, 
  FaFire,
  FaRocket,
  FaLightbulb,
  FaCheckCircle,
  FaLock,
  FaUnlock,
  FaGift,
  FaHeart,
  FaGem,
  FaCoins,
  FaAward,
  FaCertificate,
  FaFlag,
  FaBullseye,
  FaChartLine,
  FaBookOpen,
  FaHeadphones,
  FaPen,
  FaMicrophone,
  FaGraduationCap,
  FaUsers,
  FaShare,
  FaDownload,
  FaEye,
  FaEyeSlash,
  FaCog,
  FaMagic,
  FaRobot,
  FaCalendar,
  FaClock,
  FaPlay,
  FaPause,
  FaStop,
  FaRedo,
  FaSync,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaUndo,
  FaSearch,
  FaFilter,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaThumbsUp,
  FaThumbsDown
} from 'react-icons/fa';
import { HiSparkles, HiLightningBolt, HiTrendingUp, HiTrendingDown } from 'react-icons/hi';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'streak' | 'milestone' | 'social' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward: {
    type: 'xp' | 'coins' | 'badge' | 'title' | 'special';
    value: number | string;
  };
  unlockedAt?: Date;
  requirements: string[];
  bonus: {
    description: string;
    value: number;
  };
}

interface UserStats {
  totalAchievements: number;
  unlockedAchievements: number;
  totalXP: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  totalCoins: number;
  rank: string;
  nextLevelXP: number;
}

interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  achievements: number;
  rank: number;
  streak: number;
}

export default function AdvancedAchievementsSystem() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [activeTab, setActiveTab] = useState('achievements');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('progress');

  useEffect(() => {
    initializeAchievements();
  }, []);

  const initializeAchievements = async () => {
    try {
      const response = await fetch('/api/dashboard/advanced/achievements/public');
      if (response.ok) {
        const data = await response.json();
        setAchievements(data.achievements || []);
        setUserStats(data.userStats || null);
        setLeaderboard(data.globalLeaderboard || []);
      } else {
        console.error('Failed to fetch achievements');
        // Fallback to mock data if API fails
        initializeMockData();
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
      // Fallback to mock data if API fails
      initializeMockData();
    }
  };

  const initializeMockData = () => {
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'First Steps',
        description: 'Hoàn thành bài học đầu tiên',
        category: 'learning',
        rarity: 'common',
        icon: '🎯',
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        reward: { type: 'xp', value: 100 },
        unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        requirements: ['Complete first lesson'],
        bonus: { description: '+10% XP bonus for 1 day', value: 10 }
      },
      {
        id: '2',
        title: 'Grammar Master',
        description: 'Hoàn thành 50 bài tập ngữ pháp',
        category: 'learning',
        rarity: 'rare',
        icon: '📚',
        unlocked: false,
        progress: 35,
        maxProgress: 50,
        reward: { type: 'badge', value: 'Grammar Expert' },
        requirements: ['Complete 50 grammar exercises'],
        bonus: { description: '+15% accuracy in grammar tests', value: 15 }
      }
    ];

    const mockUserStats: UserStats = {
      totalAchievements: 5,
      unlockedAchievements: 1,
      totalXP: 1250,
      currentLevel: 8,
      currentStreak: 5,
      longestStreak: 12,
      totalCoins: 250,
      rank: 'Bronze',
      nextLevelXP: 2000
    };

    const mockLeaderboard: LeaderboardEntry[] = [
      {
        id: '1',
        username: 'NguyenBaloc',
        avatar: '👨‍💻',
        level: 15,
        xp: 8500,
        achievements: 12,
        rank: 1,
        streak: 25
      }
    ];

    setAchievements(mockAchievements);
    setUserStats(mockUserStats);
    setLeaderboard(mockLeaderboard);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning': return <FaBookOpen className="text-blue-500" />;
      case 'streak': return <FaFire className="text-orange-500" />;
      case 'milestone': return <FaFlag className="text-green-500" />;
      case 'social': return <FaUsers className="text-purple-500" />;
      case 'special': return <FaStar className="text-yellow-500" />;
      default: return <FaTrophy className="text-gray-500" />;
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'xp': return <FaStar className="text-yellow-500" />;
      case 'coins': return <FaCoins className="text-yellow-600" />;
      case 'badge': return <FaMedal className="text-blue-500" />;
      case 'title': return <FaCrown className="text-purple-500" />;
      case 'special': return <FaGift className="text-red-500" />;
      default: return <FaAward className="text-gray-500" />;
    }
  };

  const filteredAchievements = achievements.filter(achievement => 
    filterCategory === 'all' || achievement.category === filterCategory
  );

  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    if (sortBy === 'progress') {
      return (b.progress / b.maxProgress) - (a.progress / a.maxProgress);
    } else if (sortBy === 'rarity') {
      const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4 };
      return rarityOrder[b.rarity as keyof typeof rarityOrder] - rarityOrder[a.rarity as keyof typeof rarityOrder];
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header with User Stats */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FaTrophy className="text-2xl text-yellow-500" />
            <div>
              <span className="text-2xl">Achievement System</span>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                  <HiSparkles className="mr-1" />
                  Gamified Learning
                </Badge>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  <FaMagic className="mr-1" />
                  Rewards & Bonuses
                </Badge>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userStats.currentLevel}</div>
                <div className="text-sm text-gray-500">Level</div>
                <Progress value={(userStats.totalXP / userStats.nextLevelXP) * 100} className="w-full mt-1" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{userStats.currentStreak}</div>
                <div className="text-sm text-gray-500">Current Streak</div>
                <div className="text-xs text-gray-400">Best: {userStats.longestStreak}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{userStats.totalCoins}</div>
                <div className="text-sm text-gray-500">Coins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userStats.unlockedAchievements}/{userStats.totalAchievements}</div>
                <div className="text-sm text-gray-500">Achievements</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('achievements')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'achievements'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FaTrophy className="inline mr-2" />
          Achievements
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'leaderboard'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FaCrown className="inline mr-2" />
          Leaderboard
        </button>
        <button
          onClick={() => setActiveTab('rewards')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'rewards'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FaGift className="inline mr-2" />
          Rewards
        </button>
      </div>

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="space-y-4">
          {/* Filters and Sorting */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                <option value="learning">Learning</option>
                <option value="streak">Streak</option>
                <option value="milestone">Milestone</option>
                <option value="social">Social</option>
                <option value="special">Special</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="progress">Progress</option>
                <option value="rarity">Rarity</option>
              </select>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedAchievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  achievement.unlocked ? 'ring-2 ring-green-200' : 'ring-2 ring-gray-200'
                } ${achievement.unlocked ? 'bg-green-50' : 'bg-white'}`}
                onClick={() => setSelectedAchievement(achievement)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl">{achievement.icon}</span>
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(achievement.category)}
                    <span className="text-sm text-gray-500 capitalize">{achievement.category}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="w-full" />
                  </div>

                  <div className="flex items-center gap-2">
                    {getRewardIcon(achievement.reward.type)}
                    <span className="text-sm font-medium">
                      {achievement.reward.type.toUpperCase()}: {achievement.reward.value}
                    </span>
                  </div>

                  {achievement.unlocked && (
                    <div className="bg-green-100 p-2 rounded text-center">
                      <FaCheckCircle className="text-green-600 mx-auto mb-1" />
                      <span className="text-sm text-green-700 font-medium">Unlocked!</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaCrown className="text-yellow-500" />
                Top Learners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <div key={entry.id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="text-2xl font-bold text-gray-400 w-8">#{entry.rank}</div>
                    <div className="text-2xl">{entry.avatar}</div>
                    <div className="flex-1">
                      <div className="font-semibold">{entry.username}</div>
                      <div className="text-sm text-gray-500">Level {entry.level}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-blue-600">{entry.xp} XP</div>
                      <div className="text-sm text-gray-500">{entry.achievements} achievements</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-orange-600">🔥 {entry.streak}</div>
                      <div className="text-xs text-gray-500">days</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaGift className="text-red-500" />
                Available Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold mb-2">Daily Bonus</h4>
                  <p className="text-sm text-gray-600 mb-3">Complete daily goals to earn bonus XP</p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Claim Bonus
                  </Button>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl mb-2">🔥</div>
                  <h4 className="font-semibold mb-2">Streak Bonus</h4>
                  <p className="text-sm text-gray-600 mb-3">Maintain streak for extra rewards</p>
                  <Button size="sm" variant="outline" disabled>
                    Streak: 5 days
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Selected Achievement Details */}
      {selectedAchievement && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>🏆 Achievement Details</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAchievement(null)}
              >
                ✕
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedAchievement.icon}</span>
                <div>
                  <h3 className="text-xl font-bold">{selectedAchievement.title}</h3>
                  <p className="text-gray-600">{selectedAchievement.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold">Category:</span> {selectedAchievement.category}
                </div>
                <div>
                  <span className="font-semibold">Rarity:</span> {selectedAchievement.rarity}
                </div>
                <div>
                  <span className="font-semibold">Progress:</span> {selectedAchievement.progress}/{selectedAchievement.maxProgress}
                </div>
                <div>
                  <span className="font-semibold">Status:</span> {selectedAchievement.unlocked ? 'Unlocked' : 'Locked'}
                </div>
              </div>

              <div>
                <span className="font-semibold">Requirements:</span>
                <ul className="list-disc list-inside mt-1 text-sm text-gray-600">
                  {selectedAchievement.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-semibold">Reward:</span>
                <div className="flex items-center gap-2 mt-1">
                  {getRewardIcon(selectedAchievement.reward.type)}
                  <span>{selectedAchievement.reward.type.toUpperCase()}: {selectedAchievement.reward.value}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold">Bonus:</span>
                <div className="mt-1 text-sm text-gray-600">
                  {selectedAchievement.bonus.description} (+{selectedAchievement.bonus.value}%)
                </div>
              </div>

              {selectedAchievement.unlocked && selectedAchievement.unlockedAt && (
                <div>
                  <span className="font-semibold">Unlocked at:</span>
                  <div className="mt-1 text-sm text-gray-600">
                    {selectedAchievement.unlockedAt.toLocaleString('vi-VN')}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
