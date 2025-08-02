'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FaPlay, 
  FaPause, 
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

interface Vocabulary {
  content: string;
  kanji?: string;
  reading?: string;
  meaning: string;
}

interface LessonPlayerProps {
  lessonId: string;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
}

export default function SimpleLessonPlayer({ lessonId, onComplete, onProgress }: LessonPlayerProps) {
  const [lessonData, setLessonData] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadLessonData();
  }, [lessonId]);

  useEffect(() => {
    if (lessonData?.vocabulary) {
      const progressPercentage = ((currentIndex + 1) / lessonData.vocabulary.length) * 100;
      setProgress(progressPercentage);
      onProgress?.(progressPercentage);
    }
  }, [currentIndex, lessonData, onProgress]);

  const loadLessonData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/lesson/${lessonId}`);
      if (response.ok) {
        const data = await response.json();
        setLessonData(data);
      }
    } catch (error) {
      console.error('Error loading lesson data:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextItem = () => {
    if (lessonData?.vocabulary && currentIndex < lessonData.vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      onComplete?.();
    }
  };

  const previousItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const handleAnswerSubmit = (answer: string) => {
    const currentItem = lessonData?.vocabulary?.[currentIndex];
    const isCorrect = answer.toLowerCase() === currentItem?.meaning.toLowerCase();
    setShowAnswer(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy bài học</h2>
        <p className="text-gray-600">Vui lòng thử lại sau</p>
      </div>
    );
  }

  const currentItem = lessonData.vocabulary?.[currentIndex];
  const totalItems = lessonData.vocabulary?.length || 0;

  if (!currentItem) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Không có dữ liệu bài học</h2>
        <p className="text-gray-600">Bài học này chưa có nội dung</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Học từ vựng</h2>
          <Badge variant="secondary">
            {currentIndex + 1} / {totalItems}
          </Badge>
        </div>
        
        <Progress value={progress} className="h-2" />
      </div>

      {/* Main Content */}
      <Card className="w-full max-w-2xl mx-auto mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-4">{currentItem.content}</CardTitle>
          {currentItem.kanji && (
            <div className="text-2xl text-gray-600 mb-2">{currentItem.kanji}</div>
          )}
          {currentItem.reading && (
            <div className="text-lg text-gray-500 mb-4">({currentItem.reading})</div>
          )}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
              {showAnswer ? 'Ẩn nghĩa' : 'Xem nghĩa'}
            </Button>
            <Button variant="outline">
              <FaVolumeUp className="mr-2" />
              Nghe phát âm
            </Button>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          {showAnswer && (
            <div className="text-2xl font-semibold text-green-600 mb-4">
              {currentItem.meaning}
            </div>
          )}
          {!showAnswer && (
            <div className="space-y-3">
              <p className="text-gray-600">Bạn có biết nghĩa của từ này không?</p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => handleAnswerSubmit(currentItem.meaning)}
                  className="px-6"
                >
                  <FaCheck className="mr-2" />
                  Biết
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAnswer(true)}
                  className="px-6"
                >
                  <FaTimes className="mr-2" />
                  Không biết
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={previousItem}
          disabled={currentIndex === 0}
        >
          <FaStepBackward className="mr-2" />
          Trước
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Tiến trình: {progress.toFixed(1)}%
          </p>
        </div>

        <Button
          onClick={nextItem}
          disabled={currentIndex === totalItems - 1}
        >
          Tiếp
          <FaStepForward className="ml-2" />
        </Button>
      </div>
    </div>
  );
} 