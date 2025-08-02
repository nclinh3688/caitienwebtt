'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaCheck, 
  FaTimes, 
  FaStar, 
  FaTrophy, 
  FaFire,
  FaRedo,
  FaArrowRight,
  FaGift,
  FaChartLine,
  FaBullseye,
  FaCheckCircle,
  FaPlay,
  FaBookOpen,
  FaHeadphones,
  FaPen,
  FaMicrophone,
  FaMedal,
  FaCrown
} from 'react-icons/fa';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'mastery' | 'social';
  requirement: number;
  current: number;
  completed: boolean;
  reward: number;
  unlockedAt?: Date;
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
}

interface GamificationSystemProps {
  userId?: string;
  onAchievementUnlocked?: (achievement: Achievement) => void;
  onLevelUp?: (newLevel: number) => void;
}

export default function GamificationSystem({ 
  userId, 
  onAchievementUnlocked, 
  onLevelUp 
}: GamificationSystemProps) {
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
    experienceToNext: 100
  });
  const [showAchievements, setShowAchievements] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    initializeAchievements();
    loadUserStats();
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
        reward: 50
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
        reward: 200
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
        reward: 300
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
        reward: 400
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
        reward: 500
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
        reward: 100
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
        reward: 250
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
        reward: 1000
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
        reward: 75
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
        reward: 600
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
        reward: 350
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
        reward: 150
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
          current = Math.floor(stats.listeningTime / 60); // Convert to minutes
          break;
        case 'speaking-practice':
          current = stats.speakingPractice;
          break;
      }
      
      const completed = current >= achievement.requirement;
      const wasCompleted = achievement.completed;
      
      // Check if newly completed
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
    // Add points
    setUserStats(prev => {
      const newStats = {
        ...prev,
        totalPoints: prev.totalPoints + achievement.reward,
        experience: prev.experience + achievement.reward
      };
      
      // Check for level up
      const newLevel = Math.floor(newStats.experience / 100) + 1;
      if (newLevel > prev.level) {
        onLevelUp?.(newLevel);
      }
      
      newStats.level = newLevel;
      newStats.experienceToNext = 100 - (newStats.experience % 100);
      
      // Save to localStorage
      localStorage.setItem('user-stats', JSON.stringify(newStats));
      
      return newStats;
    });
    
    // Notify parent component
    onAchievementUnlocked?.(achievement);
    
    // Show notification
    showAchievementNotification(achievement);
  };

  const showAchievementNotification = (achievement: Achievement) => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-yellow-500 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce';
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="text-2xl">🏆</div>
        <div>
          <div class="font-bold">${achievement.title}</div>
          <div class="text-sm">+${achievement.reward} điểm</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      FaTrophy, FaFire, FaStar, FaMedal, FaCrown, FaGift, FaChartLine, 
      FaBullseye, FaCheckCircle, FaPlay, FaBookOpen, FaHeadphones, FaPen, FaMicrophone
    };
    return iconMap[iconName] || FaStar;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'learning': return 'bg-blue-500';
      case 'streak': return 'bg-orange-500';
      case 'mastery': return 'bg-purple-500';
      case 'social': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
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
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userStats.totalPoints}</div>
              <div className="text-sm text-gray-600">Điểm tổng</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{userStats.currentStreak}</div>
              <div className="text-sm text-gray-600">Streak hiện tại</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userStats.level}</div>
              <div className="text-sm text-gray-600">Cấp độ</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{userStats.lessonsCompleted}</div>
              <div className="text-sm text-gray-600">Bài học hoàn thành</div>
            </div>
          </div>
          
          {/* Level Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Cấp {userStats.level}</span>
              <span>{userStats.experience}/{userStats.experience + userStats.experienceToNext} XP</span>
            </div>
            <Progress value={(userStats.experience % 100)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaTrophy className="text-yellow-600" />
            Thành tích ({achievements.filter(a => a.completed).length}/{achievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map(achievement => {
              const Icon = getIconComponent(achievement.icon);
              const progress = Math.min((achievement.current / achievement.requirement) * 100, 100);
              
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.completed 
                      ? 'border-yellow-500 bg-yellow-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${
                      achievement.completed ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      <Icon className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        achievement.completed ? 'text-yellow-800' : 'text-gray-800'
                      }`}>
                        {achievement.title}
                      </h4>
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

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button
          onClick={() => setShowStats(!showStats)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <FaChartLine />
          Chi tiết thống kê
        </Button>
        <Button
          onClick={() => setShowAchievements(!showAchievements)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <FaTrophy />
          Xem thành tích
        </Button>
      </div>
    </div>
  );
} 