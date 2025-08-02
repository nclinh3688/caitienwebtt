'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaTrophy, 
  FaFire, 
  FaStar, 
  FaMedal, 
  FaCrown,
  FaGift,
  FaChartLine,
  FaBullseye,
  FaCheckCircle,
  FaPlay,
  FaBookOpen,
  FaHeadphones,
  FaPen,
  FaMicrophone,
  FaUsers,
  FaAward,
  FaRocket,
  FaGem,
  FaHeart,
  FaLightbulb,
  FaGraduationCap,
  FaClock,
  FaCalendar
} from 'react-icons/fa';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'mastery' | 'social' | 'special';
  requirement: number;
  current: number;
  completed: boolean;
  reward: number;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface UserStats {
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
  vocabularyLearned: number;
  grammarMastered: number;
  kanjiLearned: number;
  listeningTime: number;
  speakingPractice: number;
  quizzesTaken: number;
  quizzesPassed: number;
  level: number;
  experience: number;
  experienceToNext: number;
  totalStudyTime: number;
  daysActive: number;
  achievementsUnlocked: number;
  totalAchievements: number;
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  level: number;
  points: number;
  streak: number;
  isCurrentUser: boolean;
}

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'vocabulary' | 'grammar' | 'listening' | 'speaking' | 'kanji';
  reward: number;
  completed: boolean;
  progress: number;
  deadline: Date;
}

interface GamificationDashboardProps {
  userId?: string;
  onAchievementUnlocked?: (achievement: Achievement) => void;
  onLevelUp?: (newLevel: number) => void;
  onChallengeCompleted?: (challenge: DailyChallenge) => void;
}

export default function GamificationDashboard({
  userId,
  onAchievementUnlocked,
  onLevelUp,
  onChallengeCompleted
}: GamificationDashboardProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalPoints: 0,
    currentStreak: 0,
    longestStreak: 0,
    lessonsCompleted: 0,
    vocabularyLearned: 0,
    grammarMastered: 0,
    kanjiLearned: 0,
    listeningTime: 0,
    speakingPractice: 0,
    quizzesTaken: 0,
    quizzesPassed: 0,
    level: 1,
    experience: 0,
    experienceToNext: 100,
    totalStudyTime: 0,
    daysActive: 0,
    achievementsUnlocked: 0,
    totalAchievements: 0
  });
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'leaderboard' | 'challenges'>('overview');
  const [showAchievementDetails, setShowAchievementDetails] = useState<string | null>(null);

  useEffect(() => {
    initializeAchievements();
    loadUserStats();
    loadLeaderboard();
    loadDailyChallenges();
  }, [userId]);

  const initializeAchievements = () => {
    const defaultAchievements: Achievement[] = [
      // Learning Achievements
      {
        id: 'first-lesson',
        title: 'Bước đầu học tập',
        description: 'Hoàn thành bài học đầu tiên',
        icon: 'FaPlay',
        category: 'learning',
        requirement: 1,
        current: 0,
        completed: false,
        reward: 50,
        rarity: 'common'
      },
      {
        id: 'lesson-master',
        title: 'Chuyên gia bài học',
        description: 'Hoàn thành 10 bài học',
        icon: 'FaBookOpen',
        category: 'learning',
        requirement: 10,
        current: 0,
        completed: false,
        reward: 200,
        rarity: 'rare'
      },
      {
        id: 'vocabulary-expert',
        title: 'Chuyên gia từ vựng',
        description: 'Học 100 từ vựng',
        icon: 'FaPen',
        category: 'mastery',
        requirement: 100,
        current: 0,
        completed: false,
        reward: 300,
        rarity: 'epic'
      },
      {
        id: 'grammar-master',
        title: 'Bậc thầy ngữ pháp',
        description: 'Thành thạo 50 mẫu ngữ pháp',
        icon: 'FaStar',
        category: 'mastery',
        requirement: 50,
        current: 0,
        completed: false,
        reward: 400,
        rarity: 'epic'
      },
      {
        id: 'kanji-scholar',
        title: 'Học giả Kanji',
        description: 'Học 50 ký tự Kanji',
        icon: 'FaMedal',
        category: 'mastery',
        requirement: 50,
        current: 0,
        completed: false,
        reward: 500,
        rarity: 'legendary'
      },
      // Streak Achievements
      {
        id: 'streak-3',
        title: 'Duy trì 3 ngày',
        description: 'Học liên tiếp 3 ngày',
        icon: 'FaFire',
        category: 'streak',
        requirement: 3,
        current: 0,
        completed: false,
        reward: 100,
        rarity: 'common'
      },
      {
        id: 'streak-7',
        title: 'Tuần học tập',
        description: 'Học liên tiếp 7 ngày',
        icon: 'FaFire',
        category: 'streak',
        requirement: 7,
        current: 0,
        completed: false,
        reward: 250,
        rarity: 'rare'
      },
      {
        id: 'streak-30',
        title: 'Tháng kiên trì',
        description: 'Học liên tiếp 30 ngày',
        icon: 'FaFire',
        category: 'streak',
        requirement: 30,
        current: 0,
        completed: false,
        reward: 1000,
        rarity: 'legendary'
      },
      // Social Achievements
      {
        id: 'first-quiz',
        title: 'Bài kiểm tra đầu tiên',
        description: 'Hoàn thành bài kiểm tra đầu tiên',
        icon: 'FaBullseye',
        category: 'social',
        requirement: 1,
        current: 0,
        completed: false,
        reward: 75,
        rarity: 'common'
      },
      {
        id: 'quiz-master',
        title: 'Bậc thầy kiểm tra',
        description: 'Vượt qua 20 bài kiểm tra',
        icon: 'FaCrown',
        category: 'social',
        requirement: 20,
        current: 0,
        completed: false,
        reward: 600,
        rarity: 'epic'
      },
      {
        id: 'listening-expert',
        title: 'Chuyên gia nghe',
        description: 'Luyện nghe 60 phút',
        icon: 'FaHeadphones',
        category: 'mastery',
        requirement: 60,
        current: 0,
        completed: false,
        reward: 350,
        rarity: 'rare'
      },
      {
        id: 'speaking-practice',
        title: 'Luyện nói',
        description: 'Thực hành phát âm 10 lần',
        icon: 'FaMicrophone',
        category: 'mastery',
        requirement: 10,
        current: 0,
        completed: false,
        reward: 150,
        rarity: 'common'
      },
      // Special Achievements
      {
        id: 'early-bird',
        title: 'Chim sớm',
        description: 'Học vào buổi sáng 7 ngày liên tiếp',
        icon: 'FaClock',
        category: 'special',
        requirement: 7,
        current: 0,
        completed: false,
        reward: 300,
        rarity: 'rare'
      },
      {
        id: 'night-owl',
        title: 'Cú đêm',
        description: 'Học vào buổi tối 7 ngày liên tiếp',
        icon: 'FaCalendar',
        category: 'special',
        requirement: 7,
        current: 0,
        completed: false,
        reward: 300,
        rarity: 'rare'
      },
      {
        id: 'speed-learner',
        title: 'Học nhanh',
        description: 'Hoàn thành 5 bài học trong 1 ngày',
        icon: 'FaRocket',
        category: 'special',
        requirement: 5,
        current: 0,
        completed: false,
        reward: 400,
        rarity: 'epic'
      }
    ];

    setAchievements(defaultAchievements);
  };

  const loadUserStats = () => {
    // Load from localStorage for demo
    const savedStats = localStorage.getItem('user-stats');
    if (savedStats) {
      try {
        const stats = JSON.parse(savedStats);
        setUserStats(stats);
        updateAchievements(stats);
      } catch (error) {
        console.warn('Invalid user stats, using defaults');
      }
    }
  };

  const loadLeaderboard = () => {
    const mockLeaderboard: LeaderboardEntry[] = [
      {
        rank: 1,
        username: 'Nguyễn Văn A',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        level: 15,
        points: 2500,
        streak: 25,
        isCurrentUser: false
      },
      {
        rank: 2,
        username: 'Trần Thị B',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
        level: 12,
        points: 2100,
        streak: 18,
        isCurrentUser: false
      },
      {
        rank: 3,
        username: 'Lê Văn C',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
        level: 10,
        points: 1800,
        streak: 12,
        isCurrentUser: true
      },
      {
        rank: 4,
        username: 'Phạm Thị D',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
        level: 8,
        points: 1500,
        streak: 8,
        isCurrentUser: false
      },
      {
        rank: 5,
        username: 'Hoàng Văn E',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
        level: 6,
        points: 1200,
        streak: 5,
        isCurrentUser: false
      }
    ];
    
    setLeaderboard(mockLeaderboard);
  };

  const loadDailyChallenges = () => {
    const mockChallenges: DailyChallenge[] = [
      {
        id: '1',
        title: 'Học 10 từ vựng mới',
        description: 'Mở rộng vốn từ vựng của bạn',
        type: 'vocabulary',
        reward: 100,
        completed: false,
        progress: 0,
        deadline: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Luyện nghe 15 phút',
        description: 'Cải thiện kỹ năng nghe',
        type: 'listening',
        reward: 80,
        completed: false,
        progress: 0,
        deadline: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        title: 'Hoàn thành 1 bài kiểm tra',
        description: 'Kiểm tra kiến thức của bạn',
        type: 'grammar',
        reward: 120,
        completed: false,
        progress: 0,
        deadline: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    ];
    
    setDailyChallenges(mockChallenges);
  };

  const updateAchievements = (stats: UserStats) => {
    setAchievements(prev => prev.map(achievement => {
      let current = 0;
      
      switch (achievement.id) {
        case 'first-lesson':
        case 'lesson-master':
          current = stats.lessonsCompleted;
          break;
        case 'vocabulary-expert':
          current = stats.vocabularyLearned;
          break;
        case 'grammar-master':
          current = stats.grammarMastered;
          break;
        case 'kanji-scholar':
          current = stats.kanjiLearned;
          break;
        case 'streak-3':
        case 'streak-7':
        case 'streak-30':
          current = stats.currentStreak;
          break;
        case 'first-quiz':
        case 'quiz-master':
          current = stats.quizzesTaken;
          break;
        case 'listening-expert':
          current = Math.floor(stats.listeningTime / 60);
          break;
        case 'speaking-practice':
          current = stats.speakingPractice;
          break;
      }
      
      const completed = current >= achievement.requirement;
      const wasCompleted = achievement.completed;
      
      if (completed && !wasCompleted) {
        achievementUnlocked(achievement);
      }
      
      return {
        ...achievement,
        current,
        completed,
        unlockedAt: completed && !wasCompleted ? new Date() : achievement.unlockedAt
      };
    }));
  };

  const achievementUnlocked = (achievement: Achievement) => {
    setUserStats(prev => {
      const newStats = {
        ...prev,
        totalPoints: prev.totalPoints + achievement.reward,
        experience: prev.experience + achievement.reward,
        achievementsUnlocked: prev.achievementsUnlocked + 1
      };
      
      const newLevel = Math.floor(newStats.experience / 100) + 1;
      if (newLevel > prev.level) {
        onLevelUp?.(newLevel);
      }
      
      newStats.level = newLevel;
      newStats.experienceToNext = 100 - (newStats.experience % 100);
      
      localStorage.setItem('user-stats', JSON.stringify(newStats));
      
      return newStats;
    });
    
    onAchievementUnlocked?.(achievement);
    showAchievementNotification(achievement);
  };

  const showAchievementNotification = (achievement: Achievement) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-lg shadow-lg z-50 animate-bounce max-w-sm';
    notification.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="text-3xl">🏆</div>
        <div>
          <div class="font-bold text-lg">${achievement.title}</div>
          <div class="text-sm opacity-90">${achievement.description}</div>
          <div class="text-sm font-semibold mt-1">+${achievement.reward} điểm</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 4000);
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      FaTrophy, FaFire, FaStar, FaMedal, FaCrown, FaGift, FaChartLine, 
      FaBullseye, FaCheckCircle, FaPlay, FaBookOpen, FaHeadphones, FaPen, FaMicrophone,
      FaUsers, FaAward, FaRocket, FaGem, FaHeart, FaLightbulb, FaGraduationCap, FaClock, FaCalendar
    };
    return iconMap[iconName] || FaStar;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return '⭐';
      case 'rare': return '⭐⭐';
      case 'epic': return '⭐⭐⭐';
      case 'legendary': return '⭐⭐⭐⭐';
      default: return '⭐';
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b">
        <Button
          variant={activeTab === 'overview' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-2"
        >
          <FaChartLine />
          Tổng quan
        </Button>
        <Button
          variant={activeTab === 'achievements' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('achievements')}
          className="flex items-center gap-2"
        >
          <FaTrophy />
          Thành tích
        </Button>
        <Button
          variant={activeTab === 'leaderboard' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('leaderboard')}
          className="flex items-center gap-2"
        >
          <FaCrown />
          Bảng xếp hạng
        </Button>
        <Button
          variant={activeTab === 'challenges' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('challenges')}
          className="flex items-center gap-2"
        >
          <FaBullseye />
          Thử thách
        </Button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* User Stats Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaChartLine className="text-blue-600" />
                Thống kê học tập
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{userStats.totalPoints}</div>
                  <div className="text-sm text-gray-600">Điểm tổng</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{userStats.currentStreak}</div>
                  <div className="text-sm text-gray-600">Streak hiện tại</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{userStats.level}</div>
                  <div className="text-sm text-gray-600">Cấp độ</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{userStats.lessonsCompleted}</div>
                  <div className="text-sm text-gray-600">Bài học hoàn thành</div>
                </div>
              </div>
              
              {/* Level Progress */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Cấp {userStats.level}</span>
                  <span>{userStats.experience}/{userStats.experience + userStats.experienceToNext} XP</span>
                </div>
                <Progress value={(userStats.experience % 100)} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Achievement Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaTrophy className="text-yellow-600" />
                Tiến độ thành tích ({userStats.achievementsUnlocked}/{userStats.totalAchievements})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.slice(0, 6).map(achievement => {
                  const Icon = getIconComponent(achievement.icon);
                  const progress = Math.min((achievement.current / achievement.requirement) * 100, 100);
                  
                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        achievement.completed 
                          ? 'border-yellow-500 bg-yellow-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setShowAchievementDetails(achievement.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          achievement.completed ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          <Icon className="text-lg" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-semibold ${
                              achievement.completed ? 'text-yellow-800' : 'text-gray-800'
                            }`}>
                              {achievement.title}
                            </h4>
                            <span className="text-xs">{getRarityIcon(achievement.rarity)}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {achievement.description}
                          </p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">
                              {achievement.current}/{achievement.requirement}
                            </span>
                            <Badge variant={achievement.completed ? "default" : "secondary"}>
                              +{achievement.reward}
                            </Badge>
                          </div>
                          <Progress value={progress} className="h-1 mt-2" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Tất cả thành tích</h2>
            <div className="flex gap-2">
              <Badge variant="outline">Tất cả</Badge>
              <Badge variant="outline">Đã hoàn thành</Badge>
              <Badge variant="outline">Đang thực hiện</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map(achievement => {
              const Icon = getIconComponent(achievement.icon);
              const progress = Math.min((achievement.current / achievement.requirement) * 100, 100);
              
              return (
                <Card
                  key={achievement.id}
                  className={`transition-all cursor-pointer ${
                    achievement.completed ? 'ring-2 ring-yellow-500' : ''
                  }`}
                  onClick={() => setShowAchievementDetails(achievement.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-full ${
                        achievement.completed ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        <Icon className="text-xl" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className={`font-semibold ${
                            achievement.completed ? 'text-yellow-800' : 'text-gray-800'
                          }`}>
                            {achievement.title}
                          </h4>
                          <span className="text-sm">{getRarityIcon(achievement.rarity)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-gray-500">
                            {achievement.current}/{achievement.requirement}
                          </span>
                          <Badge variant={achievement.completed ? "default" : "secondary"}>
                            +{achievement.reward}
                          </Badge>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Bảng xếp hạng</h2>
          
          <div className="space-y-2">
            {leaderboard.map((entry, index) => (
              <Card key={entry.rank} className={`transition-all ${
                entry.isCurrentUser ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-gray-400 w-8">
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                    </div>
                    <img
                      src={entry.avatar}
                      alt={entry.username}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{entry.username}</h4>
                        {entry.isCurrentUser && (
                          <Badge variant="outline" className="text-xs">Bạn</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Cấp {entry.level}</span>
                        <span>{entry.points} điểm</span>
                        <span className="flex items-center gap-1">
                          <FaFire className="text-orange-500" />
                          {entry.streak} ngày
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Thử thách hàng ngày</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dailyChallenges.map(challenge => (
              <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold">{challenge.title}</h4>
                    <Badge variant={challenge.completed ? "default" : "outline"}>
                      +{challenge.reward}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Tiến độ</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                  
                  <div className="mt-4">
                    <Button
                      className="w-full"
                      disabled={challenge.completed}
                      onClick={() => onChallengeCompleted?.(challenge)}
                    >
                      {challenge.completed ? 'Đã hoàn thành' : 'Bắt đầu'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 