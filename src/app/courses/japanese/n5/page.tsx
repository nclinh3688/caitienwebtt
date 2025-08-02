'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FeatureCard, StatsCard } from '@/components/ui/AnimatedCard';
import { CTAButton, ModernButton } from '@/components/ui/ModernButton';
import { 
  FaBook, 
  FaGraduationCap, 
  FaPen, 
  FaHeadphones, 
  FaPlay,
  FaStar,
  FaTrophy,
  FaChartLine,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaRocket,
  FaLightbulb,
  FaUsers
} from 'react-icons/fa';

interface Lesson {
  id: string;
  title: string;
  description: string;
  status: string;
  path: string;
}

interface N5DashboardProps {}

export default function N5Dashboard({}: N5DashboardProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<any>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load lessons data
        const lessonsResponse = await fetch('/api/course/japanese/n5');
        if (lessonsResponse.ok) {
          const lessonsData = await lessonsResponse.json();
          setLessons(lessonsData.lessons || []);
        }

        // Load user progress from localStorage
        const savedProgress = localStorage.getItem('n5-progress');
        if (savedProgress) {
          try {
            setUserProgress(JSON.parse(savedProgress));
          } catch (error) {
            console.warn('Invalid progress data, resetting...');
            localStorage.removeItem('n5-progress');
            setUserProgress({});
          }
        } else {
          // Demo progress data for testing
          const demoProgress = {
            'B01': { overallProgress: 100, timeSpent: 45, completedAt: new Date().toISOString() },
            'B02': { overallProgress: 75, timeSpent: 30, completedAt: null },
            'B03': { overallProgress: 50, timeSpent: 20, completedAt: null },
            'B04': { overallProgress: 25, timeSpent: 10, completedAt: null },
            'B05': { overallProgress: 0, timeSpent: 0, completedAt: null }
          };
          setUserProgress(demoProgress);
          localStorage.setItem('n5-lessons-progress', JSON.stringify(demoProgress));
        }
      } catch (error) {
        console.error('Error loading N5 data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const calculateOverallProgress = () => {
    if (!userProgress || Object.keys(userProgress).length === 0) return 0;
    
    const totalProgress = Object.values(userProgress).reduce((sum: number, lesson: any) => {
      return sum + (lesson.overallProgress || 0);
    }, 0);
    
    return Math.round(totalProgress / Object.keys(userProgress).length);
  };

  const getLessonProgress = (lessonId: string) => {
    return userProgress[lessonId]?.overallProgress || 0;
  };

  const getLessonStatus = (lessonId: string) => {
    const progress = getLessonProgress(lessonId);
    if (progress >= 100) return 'completed';
    if (progress > 0) return 'in-progress';
    return 'not-started';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <FaCheckCircle className="text-green-500" />;
      case 'in-progress': return <FaPlay className="text-blue-500" />;
      default: return <FaBook className="text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải khóa học N5...</p>
        </div>
      </div>
    );
  }

  const overallProgress = calculateOverallProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl font-bold mb-4">Khóa học N5</h1>
              <p className="text-xl mb-8 opacity-90">Cơ bản tiếng Nhật - Trình độ sơ cấp</p>
              
              <div className="flex items-center justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">{lessons.length}</div>
                  <div className="text-sm opacity-90">Bài học</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{overallProgress}%</div>
                  <div className="text-sm opacity-90">Tiến độ</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">45m</div>
                  <div className="text-sm opacity-90">Thời gian/bài</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="animate-fade-in-up delay-200">
          <StatsCard
            value={`${overallProgress}%`}
            label="Tổng tiến độ"
            icon={<FaChartLine />}
            className="mb-8"
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={<FaBook />}
            title="Từ vựng"
            description="Học 200+ từ vựng cơ bản N5 với phát âm chuẩn"
            className="delay-300"
          />
          <FeatureCard
            icon={<FaGraduationCap />}
            title="Ngữ pháp"
            description="25+ mẫu câu cơ bản với ví dụ thực tế"
            className="delay-400"
          />
          <FeatureCard
            icon={<FaHeadphones />}
            title="Luyện nghe"
            description="Audio chất lượng cao với phát âm bản xứ"
            className="delay-500"
          />
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => {
            const status = getLessonStatus(lesson.id);
            const progress = getLessonProgress(lesson.id);
            
            return (
              <Card 
                key={lesson.id} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status)}
                      {lesson.title}
                    </div>
                    <Badge variant={status === 'completed' ? "default" : "outline"}>
                      {progress}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-sm">{lesson.description}</p>
                  
                  <Progress value={progress} className="h-2" />
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaClock />
                      <span>45 phút</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar />
                      <span>Beginner</span>
                    </div>
                  </div>
                  
                  <Link href={lesson.path}>
                    <ModernButton
                      variant={status === 'completed' ? 'outline' : 'primary'}
                      size="md"
                      icon={<FaArrowRight />}
                      iconPosition="right"
                      className="w-full"
                    >
                      {status === 'completed' ? 'Ôn tập' : status === 'in-progress' ? 'Tiếp tục' : 'Bắt đầu'}
                    </ModernButton>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Achievement Section */}
        {overallProgress >= 50 && (
          <div className="mt-12 animate-fade-in-up delay-700">
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <FaTrophy className="text-yellow-600" />
                  Thành tích
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {overallProgress >= 100 && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <FaTrophy className="text-green-500" />
                      <div>
                        <div className="font-semibold text-green-800">N5 Master</div>
                        <div className="text-sm text-green-600">Hoàn thành tất cả bài học N5</div>
                      </div>
                    </div>
                  )}
                  {overallProgress >= 50 && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <FaStar className="text-blue-500" />
                      <div>
                        <div className="font-semibold text-blue-800">Halfway There</div>
                        <div className="text-sm text-blue-600">Hoàn thành 50% khóa học</div>
                      </div>
                    </div>
                  )}
                  {Object.keys(userProgress).length >= 3 && (
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <FaUsers className="text-purple-500" />
                      <div>
                        <div className="font-semibold text-purple-800">Consistent Learner</div>
                        <div className="text-sm text-purple-600">Học 3+ bài học</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 text-center animate-fade-in-up delay-800">
          <CTAButton onClick={() => window.location.href = '/courses/japanese/n5/B01'}>
            Bắt đầu học ngay
          </CTAButton>
        </div>
      </div>
    </div>
  );
} 