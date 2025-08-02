'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  BookOpen, 
  Clock,
  TrendingUp,
  Award,
  Flame,
  Crown,
  Medal,
  Gift,
  CheckCircle
} from 'lucide-react';
import { AchievementCard } from './AchievementCard';

interface GamificationData {
  level: number;
  experience: number;
  experienceToNext: number;
  totalPoints: number;
  streak: number;
  achievements: Achievement[];
  recentActivity: Activity[];
  leaderboard: LeaderboardEntry[];
  dailyGoals: DailyGoal[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'target' | 'zap' | 'book' | 'clock' | 'check' | 'lock';
  category: 'learning' | 'streak' | 'milestone' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isUnlocked: boolean;
  progress: number;
  maxProgress: number;
  unlockedAt?: Date;
  points: number;
}

interface Activity {
  id: string;
  type: 'lesson_completed' | 'achievement_unlocked' | 'streak_milestone' | 'level_up';
  title: string;
  description: string;
  points: number;
  timestamp: Date;
  icon: string;
}

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  level: number;
  totalPoints: number;
  streak: number;
}

interface DailyGoal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  reward: number;
  isCompleted: boolean;
  type: 'lessons' | 'minutes' | 'streak' | 'achievements';
}

export function GamificationSystem() {
  const [gamificationData, setGamificationData] = useState<GamificationData>({
    level: 1,
    experience: 0,
    experienceToNext: 100,
    totalPoints: 0,
    streak: 0,
    achievements: [],
    recentActivity: [],
    leaderboard: [],
    dailyGoals: []
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'leaderboard' | 'goals'>('overview');
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const mockData: GamificationData = {
      level: 5,
      experience: 750,
      experienceToNext: 1000,
      totalPoints: 2840,
      streak: 7,
      achievements: [
        {
          id: '1',
          title: 'Người mới bắt đầu',
          description: 'Hoàn thành bài học đầu tiên',
          icon: 'book',
          category: 'learning',
          rarity: 'common',
          isUnlocked: true,
          progress: 1,
          maxProgress: 1,
          unlockedAt: new Date('2024-01-15'),
          points: 50
        },
        {
          id: '2',
          title: 'Chuỗi học tập',
          description: 'Học liên tiếp 7 ngày',
          icon: 'clock',
          category: 'streak',
          rarity: 'rare',
          isUnlocked: true,
          progress: 7,
          maxProgress: 7,
          unlockedAt: new Date('2024-01-20'),
          points: 100
        },
        {
          id: '3',
          title: 'Thành tích xuất sắc',
          description: 'Đạt điểm tối đa trong 10 bài kiểm tra',
          icon: 'trophy',
          category: 'milestone',
          rarity: 'epic',
          isUnlocked: false,
          progress: 7,
          maxProgress: 10,
          points: 200
        }
      ],
      recentActivity: [
        {
          id: '1',
          type: 'lesson_completed',
          title: 'Hoàn thành bài học',
          description: 'Bài 15: Ngữ pháp N5',
          points: 25,
          timestamp: new Date(),
          icon: '📚'
        },
        {
          id: '2',
          type: 'achievement_unlocked',
          title: 'Mở khóa thành tích',
          description: 'Chuỗi học tập - 7 ngày',
          points: 100,
          timestamp: new Date(Date.now() - 86400000),
          icon: '🏆'
        }
      ],
      leaderboard: [
        { rank: 1, userId: '1', username: 'NguyenVanA', avatar: '/avatars/1.jpg', level: 8, totalPoints: 4500, streak: 15 },
        { rank: 2, userId: '2', username: 'TranThiB', avatar: '/avatars/2.jpg', level: 7, totalPoints: 4200, streak: 12 },
        { rank: 3, userId: '3', username: 'LeVanC', avatar: '/avatars/3.jpg', level: 6, totalPoints: 3800, streak: 10 }
      ],
      dailyGoals: [
        {
          id: '1',
          title: 'Hoàn thành 3 bài học',
          description: 'Học 3 bài học mới hôm nay',
          target: 3,
          current: 2,
          reward: 50,
          isCompleted: false,
          type: 'lessons'
        },
        {
          id: '2',
          title: 'Học 30 phút',
          description: 'Dành 30 phút học tập',
          target: 30,
          current: 25,
          reward: 30,
          isCompleted: false,
          type: 'minutes'
        }
      ]
    };

    setGamificationData(mockData);
  }, []);

  const experiencePercentage = (gamificationData.experience / gamificationData.experienceToNext) * 100;

  const getLevelTitle = (level: number) => {
    if (level >= 20) return 'Bậc thầy';
    if (level >= 15) return 'Chuyên gia';
    if (level >= 10) return 'Nâng cao';
    if (level >= 5) return 'Trung cấp';
    return 'Sơ cấp';
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return '🔥🔥🔥';
    if (streak >= 15) return '🔥🔥';
    if (streak >= 7) return '🔥';
    return '💪';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hệ thống thành tích</h1>
          <p className="text-muted-foreground">Theo dõi tiến độ và thành tích học tập</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-sm">
            <Star className="h-4 w-4 mr-1" />
            {gamificationData.totalPoints} điểm
          </Badge>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Tổng quan', icon: TrendingUp },
          { id: 'achievements', label: 'Thành tích', icon: Trophy },
          { id: 'leaderboard', label: 'Bảng xếp hạng', icon: Crown },
          { id: 'goals', label: 'Mục tiêu', icon: Target }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center space-x-2"
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Level Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span>Cấp độ {gamificationData.level}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Kinh nghiệm</span>
                    <span>{gamificationData.experience} / {gamificationData.experienceToNext}</span>
                  </div>
                  <Progress value={experiencePercentage} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {getLevelTitle(gamificationData.level)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Streak Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span>Chuỗi học tập</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  {getStreakEmoji(gamificationData.streak)}
                </div>
                <p className="text-2xl font-bold">{gamificationData.streak} ngày</p>
                <p className="text-sm text-muted-foreground">
                  {gamificationData.streak >= 7 ? 'Tuyệt vời! Hãy duy trì!' : 'Tiếp tục học tập!'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>Hoạt động gần đây</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {gamificationData.recentActivity.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      +{activity.points}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gamificationData.achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                {...achievement}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <span>Bảng xếp hạng</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gamificationData.leaderboard.map((entry, index) => (
                <div key={entry.userId} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                    {entry.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{entry.username}</p>
                    <p className="text-sm text-muted-foreground">
                      Cấp {entry.level} • {entry.totalPoints} điểm
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      <Flame className="h-3 w-3 mr-1" />
                      {entry.streak}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'goals' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gamificationData.dailyGoals.map((goal) => (
              <Card key={goal.id} className={goal.isCompleted ? 'border-green-200' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{goal.title}</span>
                    {goal.isCompleted && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tiến độ</span>
                      <span>{goal.current} / {goal.target}</span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">
                        <Gift className="h-3 w-3 mr-1" />
                        {goal.reward} điểm
                      </Badge>
                      {goal.isCompleted && (
                        <Badge variant="default" className="bg-green-500">
                          Hoàn thành!
                        </Badge>
                      )}
                    </div>
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

export default GamificationSystem; 