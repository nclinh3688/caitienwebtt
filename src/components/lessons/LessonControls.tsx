'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  BookOpen, 
  CheckCircle,
  Clock,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface LessonControlsProps {
  currentLesson: number;
  totalLessons: number;
  lessonTitle: string;
  isCompleted: boolean;
  timeSpent: number;
  onPrevious: () => void;
  onNext: () => void;
  onHome: () => void;
  onRestart: () => void;
  onTogglePlay?: () => void;
  isPlaying?: boolean;
  showProgress?: boolean;
  className?: string;
}

export function LessonControls({
  currentLesson,
  totalLessons,
  lessonTitle,
  isCompleted,
  timeSpent,
  onPrevious,
  onNext,
  onHome,
  onRestart,
  onTogglePlay,
  isPlaying = false,
  showProgress = true,
  className = ''
}: LessonControlsProps) {
  const progressPercentage = (currentLesson / totalLessons) * 100;
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        {/* Lesson Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium text-lg">{lessonTitle}</h3>
              <p className="text-sm text-muted-foreground">
                Bài {currentLesson} / {totalLessons}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isCompleted && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeSpent)}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Tiến độ</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onHome}
              className="flex items-center space-x-1"
            >
              <Home className="h-4 w-4" />
              <span>Trang chủ</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onRestart}
              className="flex items-center space-x-1"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Làm lại</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPrevious}
              disabled={currentLesson <= 1}
              className="flex items-center space-x-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Trước</span>
            </Button>

            {onTogglePlay && (
              <Button
                variant="outline"
                size="sm"
                onClick={onTogglePlay}
                className="flex items-center space-x-1"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Tạm dừng</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Tiếp tục</span>
                  </>
                )}
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={onNext}
              disabled={currentLesson >= totalLessons}
              className="flex items-center space-x-1"
            >
              <span>Tiếp</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Completion Status */}
        {isCompleted && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-700 dark:text-green-300 font-medium">
                Hoàn thành bài học!
              </span>
            </div>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              Bạn đã hoàn thành bài học này. Hãy tiếp tục với bài tiếp theo!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default LessonControls; 