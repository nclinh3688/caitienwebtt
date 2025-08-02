'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FaTrophy, 
  FaStar, 
  FaBook, 
  FaGraduationCap, 
  FaPen, 
  FaHeadphones,
  FaChartLine,
  FaCalendar,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';

interface LessonProgress {
  lessonId: string;
  title: string;
  vocabularyProgress: number;
  grammarProgress: number;
  kanjiProgress: number;
  listeningProgress: number;
  overallProgress: number;
  completedAt?: Date;
  timeSpent: number; // in minutes
}

interface N5ProgressTrackerProps {
  onProgressUpdate?: (progress: LessonProgress[]) => void;
}

export function N5ProgressTracker({ onProgressUpdate }: N5ProgressTrackerProps) {
  const [lessonsProgress, setLessonsProgress] = useState<LessonProgress[]>([]);
  const [totalProgress, setTotalProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('n5-progress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setLessonsProgress(progress);
      } catch (error) {
        console.warn('Invalid progress data, resetting...');
        localStorage.removeItem('n5-progress');
        setLessonsProgress([]);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('n5-progress', JSON.stringify(lessonsProgress));
    onProgressUpdate?.(lessonsProgress);
  }, [lessonsProgress, onProgressUpdate]);

  const calculateOverallProgress = (progress: LessonProgress[]) => {
    if (progress.length === 0) {
      setTotalProgress(0);
      setTotalTimeSpent(0);
      return;
    }

    const total = progress.reduce((sum, lesson) => sum + lesson.overallProgress, 0);
    const average = Math.round(total / progress.length);
    setTotalProgress(average);

    const totalTime = progress.reduce((sum, lesson) => sum + lesson.timeSpent, 0);
    setTotalTimeSpent(totalTime);

    // Calculate streak
    const today = new Date().toDateString();
    const recentCompletions = progress.filter(lesson => 
      lesson.completedAt && 
      new Date(lesson.completedAt).toDateString() === today
    );
    setStreak(recentCompletions.length);
  };

  const updateLessonProgress = (lessonId: string, updates: Partial<LessonProgress>) => {
    setLessonsProgress(prev => {
      const updated = prev.map(lesson => 
        lesson.lessonId === lessonId 
          ? { ...lesson, ...updates }
          : lesson
      );
      calculateOverallProgress(updated);
      return updated;
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    if (progress >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getProgressVariant = (progress: number) => {
    if (progress >= 80) return 'default';
    if (progress >= 60) return 'secondary';
    return 'outline';
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const renderLessonCard = (lesson: LessonProgress) => (
    <Card key={lesson.lessonId} className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            {lesson.overallProgress >= 100 ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaBook className="text-blue-500" />
            )}
            {lesson.title}
          </div>
          <Badge variant={getProgressVariant(lesson.overallProgress)}>
            {lesson.overallProgress}%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <FaBook className="text-blue-500" />
            <span>Từ vựng: {lesson.vocabularyProgress}%</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-purple-500" />
            <span>Ngữ pháp: {lesson.grammarProgress}%</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPen className="text-red-500" />
            <span>Kanji: {lesson.kanjiProgress}%</span>
          </div>
          <div className="flex items-center gap-2">
            <FaHeadphones className="text-green-500" />
            <span>Nghe: {lesson.listeningProgress}%</span>
          </div>
        </div>
        
        <Progress value={lesson.overallProgress} className="h-2" />
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <FaClock />
            <span>{formatTime(lesson.timeSpent)}</span>
          </div>
          {lesson.completedAt && (
            <div className="flex items-center gap-1">
              <FaCalendar />
              <span>{new Date(lesson.completedAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{totalProgress}%</div>
          <div className="text-sm text-gray-600">Tổng tiến độ</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{lessonsProgress.length}</div>
          <div className="text-sm text-gray-600">Bài học đã học</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{streak}</div>
          <div className="text-sm text-gray-600">Bài học hôm nay</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{formatTime(totalTimeSpent)}</div>
          <div className="text-sm text-gray-600">Tổng thời gian</div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAchievements = () => {
    const achievements = [];
    
    if (totalProgress >= 100) {
      achievements.push({
        icon: <FaTrophy className="text-yellow-500" />,
        title: "N5 Master",
        description: "Hoàn thành tất cả bài học N5"
      });
    }
    
    if (streak >= 3) {
      achievements.push({
        icon: <FaStar className="text-orange-500" />,
        title: "Learning Streak",
        description: "Học liên tục 3 ngày"
      });
    }
    
    if (totalTimeSpent >= 300) { // 5 hours
      achievements.push({
        icon: <FaChartLine className="text-green-500" />,
        title: "Dedicated Learner",
        description: "Dành 5+ giờ học tập"
      });
    }

    if (achievements.length === 0) {
      return null;
    }

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaTrophy />
            Thành tích
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                {achievement.icon}
                <div>
                  <div className="font-semibold">{achievement.title}</div>
                  <div className="text-sm text-gray-600">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Tiến độ học N5</h1>
        <p className="text-gray-600">Theo dõi quá trình học tập của bạn</p>
      </div>

      {renderStats()}
      {renderAchievements()}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessonsProgress.map(renderLessonCard)}
      </div>

      {lessonsProgress.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FaBook className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Chưa có tiến độ học tập</h3>
            <p className="text-gray-600 mb-4">Bắt đầu học bài đầu tiên để theo dõi tiến độ</p>
            <Button>Bắt đầu học</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 