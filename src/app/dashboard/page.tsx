'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Star, 
  Trophy,
  Flame,
  Award,
  Crown,
  CheckCircle,
  Play,
  BarChart3
} from 'lucide-react';
import { GamificationSystem } from '@/components/gamification/GamificationSystem';

interface DashboardData {
  totalLessons: number;
  completedLessons: number;
  totalTime: number;
  currentStreak: number;
  level: number;
  experience: number;
  experienceToNext: number;
  totalPoints: number;
  recentAchievements: any[];
  dailyGoals: any[];
  leaderboardPosition: number;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalLessons: 0,
    completedLessons: 0,
    totalTime: 0,
    currentStreak: 0,
    level: 1,
    experience: 0,
    experienceToNext: 100,
    totalPoints: 0,
    recentAchievements: [],
    dailyGoals: [],
    leaderboardPosition: 0
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'gamification' | 'progress' | 'goals'>('overview');

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockData: DashboardData = {
      totalLessons: 150,
      completedLessons: 87,
      totalTime: 2840, // minutes
      currentStreak: 7,
      level: 5,
      experience: 750,
      experienceToNext: 1000,
      totalPoints: 2840,
      recentAchievements: [
        { id: '1', title: 'Chuỗi học tập', description: '7 ngày liên tiếp', points: 100, icon: '🔥' },
        { id: '2', title: 'Hoàn thành N5', description: 'Tất cả bài học N5', points: 500, icon: '🏆' }
      ],
      dailyGoals: [
        { id: '1', title: '3 bài học', current: 2, target: 3, completed: false },
        { id: '2', title: '30 phút học', current: 25, target: 30, completed: false }
      ],
      leaderboardPosition: 15
    };

    setDashboardData(mockData);
  }, []);

  const progressPercentage = (dashboardData.completedLessons / dashboardData.totalLessons) * 100;
  const experiencePercentage = (dashboardData.experience / dashboardData.experienceToNext) * 100;

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getLevelTitle = (level: number) => {
    if (level >= 20) return 'Bậc thầy';
    if (level >= 15) return 'Chuyên gia';
    if (level >= 10) return 'Nâng cao';
    if (level >= 5) return 'Trung cấp';
    return 'Sơ cấp';
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Chào mừng trở lại! Hãy tiếp tục hành trình học tập</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Star className="h-5 w-5 mr-2" />
            {dashboardData.totalPoints} điểm
          </Badge>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Tổng quan', icon: BarChart3 },
          { id: 'gamification', label: 'Thành tích', icon: Trophy },
          { id: 'progress', label: 'Tiến độ', icon: TrendingUp },
          { id: 'goals', label: 'Mục tiêu', icon: Target }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="lg"
              onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center space-x-2"
            >
              <Icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Progress Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-blue-500" />
                <span>Tiến độ học tập</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Bài học hoàn thành</span>
                    <span>{dashboardData.completedLessons} / {dashboardData.totalLessons}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-1">
                    {Math.round(progressPercentage)}% hoàn thành
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="font-bold text-lg">{formatTime(dashboardData.totalTime)}</p>
                    <p className="text-sm text-muted-foreground">Tổng thời gian</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <p className="font-bold text-lg">{dashboardData.currentStreak}</p>
                    <p className="text-sm text-muted-foreground">Ngày liên tiếp</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Level Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-yellow-500" />
                <span>Cấp độ {dashboardData.level}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="text-3xl font-bold text-yellow-500">
                  {dashboardData.level}
                </div>
                <p className="text-sm text-muted-foreground">
                  {getLevelTitle(dashboardData.level)}
                </p>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>XP</span>
                    <span>{dashboardData.experience} / {dashboardData.experienceToNext}</span>
                  </div>
                  <Progress value={experiencePercentage} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard Position */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="h-6 w-6 text-purple-500" />
                <span>Bảng xếp hạng</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="text-3xl font-bold text-purple-500">
                  #{dashboardData.leaderboardPosition}
                </div>
                <p className="text-sm text-muted-foreground">
                  Vị trí hiện tại
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Xem chi tiết
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-green-500" />
                <span>Thành tích gần đây</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dashboardData.recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <Badge variant="secondary">
                      +{achievement.points}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Hành động nhanh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button className="h-16 flex flex-col space-y-1">
                  <Play className="h-5 w-5" />
                  <span className="text-sm">Tiếp tục học</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col space-y-1">
                  <Target className="h-5 w-5" />
                  <span className="text-sm">Mục tiêu</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col space-y-1">
                  <BarChart3 className="h-5 w-5" />
                  <span className="text-sm">Thống kê</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col space-y-1">
                  <Trophy className="h-5 w-5" />
                  <span className="text-sm">Thành tích</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'gamification' && (
        <GamificationSystem />
      )}

      {activeTab === 'progress' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Chi tiết tiến độ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-500 mb-2">
                    {dashboardData.completedLessons}
                  </div>
                  <p className="text-muted-foreground">Bài học hoàn thành</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-500 mb-2">
                    {formatTime(dashboardData.totalTime)}
                  </div>
                  <p className="text-muted-foreground">Tổng thời gian học</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">
                    {dashboardData.currentStreak}
                  </div>
                  <p className="text-muted-foreground">Ngày học liên tiếp</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboardData.dailyGoals.map((goal) => (
              <Card key={goal.id} className={goal.completed ? 'border-green-200' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{goal.title}</span>
                    {goal.completed && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Tiến độ</span>
                      <span>{goal.current} / {goal.target}</span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                    {goal.completed && (
                      <Badge className="bg-green-500">
                        Hoàn thành!
                      </Badge>
                    )}
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
