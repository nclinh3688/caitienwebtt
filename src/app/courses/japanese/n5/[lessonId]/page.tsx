'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaArrowLeft, 
  FaPlay, 
  FaBookOpen, 
  FaTrophy,
  FaCheckCircle,
  FaStar,
  FaClock,
  FaHeadphones,
  FaPen,
  FaFire
} from 'react-icons/fa';
import AdvancedLessonPlayer from '@/components/AdvancedLessonPlayer';
import MobileLessonPlayer from '@/components/MobileLessonPlayer';
import QuizSystem from '@/components/QuizSystem';
import AudioIntegration from '@/components/AudioIntegration';

interface LessonMetadata {
  title: string;
  theme: string;
  estimatedTime: number;
  difficulty: string;
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [lessonData, setLessonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentMode, setCurrentMode] = useState<'overview' | 'learning' | 'quiz' | 'completed'>('overview');
  const [progress, setProgress] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);

  const lessonId = params?.lessonId as string;

  useEffect(() => {
    loadLessonData();
  }, [lessonId]);

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

  const handleStartLearning = () => {
    setCurrentMode('learning');
  };

  const handleStartQuiz = () => {
    setCurrentMode('quiz');
  };

  const handleLessonComplete = async () => {
    // Save progress to database
    if (session?.user) {
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lessonId: lessonId,
            isCompleted: true
          }),
        });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  };

  const handleQuizComplete = (score: number, total: number) => {
    setQuizScore(score);
    setQuizTotal(total);
    setCurrentMode('completed');
  };

  const handleProgressUpdate = (lessonId: string, newProgress: number) => {
    setProgress(newProgress);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải bài học...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy bài học</h2>
          <p className="text-gray-600 mb-6">Bài học này không tồn tại hoặc đã bị xóa</p>
          <Button onClick={() => router.push('/courses/japanese/n5')}>
            <FaArrowLeft className="mr-2" />
            Quay lại danh sách bài học
          </Button>
        </div>
      </div>
    );
  }

  // Learning Mode
  if (currentMode === 'learning') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setCurrentMode('overview')}
            className="mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Quay lại
          </Button>
        </div>

        <AdvancedLessonPlayer
          lessonId={lessonId}
          onComplete={handleLessonComplete}
          onProgress={handleProgressUpdate}
        />
      </div>
    );
  }

  // Quiz Mode
  if (currentMode === 'quiz') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => setCurrentMode('overview')}
            className="mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Quay lại
          </Button>
        </div>

        <QuizSystem
          lessonData={lessonData}
          onComplete={handleQuizComplete}
        />
      </div>
    );
  }

  // Completed Mode
  if (currentMode === 'completed') {
    const totalScore = quizScore;
    const totalQuestions = quizTotal;
    const percentage = totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTrophy className="text-4xl text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-4">
              Chúc mừng!
            </h1>
            <p className="text-xl text-gray-700 mb-2">
              Bạn đã hoàn thành bài học
            </p>
            <p className="text-gray-600">
              {lessonData.metadata?.title || `Bài ${lessonId}`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {lessonData.vocabulary?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Từ vựng</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {lessonData.grammar?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Ngữ pháp</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {lessonData.kanji?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Kanji</div>
              </CardContent>
            </Card>
          </div>

          {totalQuestions > 0 && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Kết quả bài kiểm tra</h3>
                <div className="flex items-center justify-between mb-2">
                  <span>Điểm số:</span>
                  <span className="font-bold">{totalScore}/{totalQuestions}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span>Tỷ lệ đúng:</span>
                  <span className="font-bold">{percentage.toFixed(1)}%</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <Button 
              onClick={() => router.push('/courses/japanese/n5')}
              className="w-full md:w-auto"
            >
              <FaArrowLeft className="mr-2" />
              Quay lại danh sách bài học
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setCurrentMode('overview');
                setQuizScore(0);
                setQuizTotal(0);
              }}
              className="w-full md:w-auto"
            >
              <FaPlay className="mr-2" />
              Học lại
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Overview Mode (Default)
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          onClick={() => router.push('/courses/japanese/n5')}
          className="mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Quay lại
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">
          {lessonData.metadata?.title || `Bài ${lessonId}`}
        </h1>
        <p className="text-gray-600 mb-6">
          {lessonData.metadata?.theme || 'Từ vựng cơ bản'}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary">
            <FaClock className="mr-1" />
            {lessonData.metadata?.estimatedTime || 30} phút
          </Badge>
          <Badge variant="outline">
            <FaStar className="mr-1" />
            {lessonData.metadata?.difficulty || 'Beginner'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="transform transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaBookOpen className="text-blue-600" />
                Nội dung bài học
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FaBookOpen className="text-blue-600" />
                    <span>Từ vựng</span>
                  </div>
                  <Badge>{lessonData.vocabulary?.length || 0}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FaPen className="text-green-600" />
                    <span>Ngữ pháp</span>
                  </div>
                  <Badge>{lessonData.grammar?.length || 0}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FaStar className="text-purple-600" />
                    <span>Kanji</span>
                  </div>
                  <Badge>{lessonData.kanji?.length || 0}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FaHeadphones className="text-green-600" />
                Hướng dẫn học
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                    1
                  </div>
                  <p>Đọc và hiểu từ vựng mới</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xs">
                    2
                  </div>
                  <p>Học ngữ pháp và cách sử dụng</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs">
                    3
                  </div>
                  <p>Luyện viết và nhớ kanji</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-xs">
                    4
                  </div>
                  <p>Làm bài tập để củng cố kiến thức</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            size="lg" 
            onClick={handleStartLearning}
            className="h-20 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <FaPlay className="text-2xl" />
            <span className="text-lg">Bắt đầu học</span>
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={handleStartQuiz}
            className="h-20 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <FaCheckCircle className="text-2xl" />
            <span className="text-lg">Làm bài kiểm tra</span>
          </Button>
        </div>
      </div>
    </div>
  );
}