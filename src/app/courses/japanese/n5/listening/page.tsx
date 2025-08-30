'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaHeadphones, 
  FaPlay,
  FaCheckCircle,
  FaArrowRight,
  FaVolumeUp,
  FaStar,
  FaClock,
  FaChartLine,
  FaArrowLeft,
  FaPause,
  FaRedo,
  FaEye
} from 'react-icons/fa';

interface ListeningExercise {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number; // in seconds
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  transcript: {
    japanese: string;
    romaji: string;
    vietnamese: string;
  };
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  tags: string[];
}

interface ListeningCategory {
  id: string;
  name: string;
  description: string;
  exerciseCount: number;
  progress: number;
  exercises: ListeningExercise[];
}

export default function N5ListeningPage() {
  const [categories, setCategories] = useState<ListeningCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<ListeningExercise | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // TODO: Load listening data from API
    // This will be replaced with actual data loading
    const loadListeningData = async () => {
      try {
        // Demo data structure - easy to replace with real data
        const demoCategories: ListeningCategory[] = [
          {
            id: 'basic-conversations',
            name: 'Hội thoại cơ bản',
            description: 'Các đoạn hội thoại đơn giản hàng ngày',
            exerciseCount: 8,
            progress: 0,
            exercises: [
              {
                id: 'l001',
                title: 'Chào hỏi buổi sáng',
                description: 'Học cách chào hỏi vào buổi sáng',
                audioUrl: '/audio/n5/greeting-morning.mp3',
                duration: 45,
                difficulty: 'easy',
                category: 'basic-conversations',
                transcript: {
                  japanese: 'おはようございます。田中です。よろしくお願いします。',
                  romaji: 'Ohayou gozaimasu. Tanaka desu. Yoroshiku onegaishimasu.',
                  vietnamese: 'Chào buổi sáng. Tôi là Tanaka. Rất vui được gặp bạn.'
                },
                questions: [
                  {
                    id: 'q1',
                    question: 'Người nói tên gì?',
                    options: ['Tanaka', 'Suzuki', 'Yamada', 'Sato'],
                    correctAnswer: 0,
                    explanation: 'Trong đoạn audio có nói "田中です" (Tanaka desu)'
                  }
                ],
                tags: ['chào hỏi', 'giới thiệu', 'buổi sáng']
              }
            ]
          },
          {
            id: 'numbers-time',
            name: 'Số đếm và thời gian',
            description: 'Nghe và hiểu số đếm, thời gian',
            exerciseCount: 6,
            progress: 0,
            exercises: []
          },
          {
            id: 'daily-activities',
            name: 'Hoạt động hàng ngày',
            description: 'Các hoạt động thường ngày',
            exerciseCount: 10,
            progress: 0,
            exercises: []
          },
          {
            id: 'shopping',
            name: 'Mua sắm',
            description: 'Hội thoại khi mua sắm',
            exerciseCount: 7,
            progress: 0,
            exercises: []
          }
        ];

        setCategories(demoCategories);
      } catch (error) {
        console.error('Error loading listening data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadListeningData();
  }, []);

  const calculateOverallProgress = () => {
    if (categories.length === 0) return 0;
    const totalProgress = categories.reduce((sum, category) => sum + category.progress, 0);
    return Math.round(totalProgress / categories.length);
  };

  const getSelectedCategoryData = () => {
    return categories.find(cat => cat.id === selectedCategory);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải bài luyện nghe N5...</p>
        </div>
      </div>
    );
  }

  const overallProgress = calculateOverallProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/courses/japanese/n5" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <FaArrowLeft size={16} />
              <span>Quay lại N5</span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Luyện nghe N5</h1>
              <p className="text-gray-600">Audio chất lượng cao với phát âm bản xứ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Tổng tiến độ</h2>
            <Badge variant="outline" className="text-lg font-semibold">
              {overallProgress}%
            </Badge>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
            <span>0 / {categories.reduce((sum, cat) => sum + cat.exerciseCount, 0)} bài đã hoàn thành</span>
            <span>4 chủ đề</span>
          </div>
        </div>

        {/* Categories Grid */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={category.id} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center gap-2">
                      <FaHeadphones className="text-purple-500" />
                      {category.name}
                    </div>
                    <Badge variant={category.progress >= 100 ? "default" : "outline"}>
                      {category.progress}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-sm">{category.description}</p>
                  
                  <Progress value={category.progress} className="h-2" />
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaClock />
                      <span>{category.exerciseCount} bài</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar />
                      <span>N5</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant={category.progress >= 100 ? "outline" : "default"}
                    className="w-full"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.progress >= 100 ? 'Ôn tập' : 'Bắt đầu học'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Exercise List */}
        {selectedCategory && !selectedExercise && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2"
                >
                  <FaArrowLeft size={14} />
                  Quay lại chủ đề
                </Button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {getSelectedCategoryData()?.name}
                  </h2>
                  <p className="text-gray-600">{getSelectedCategoryData()?.description}</p>
                </div>
              </div>
              <Badge variant="outline">
                {getSelectedCategoryData()?.exerciseCount} bài
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getSelectedCategoryData()?.exercises.map((exercise, index) => (
                <Card 
                  key={exercise.id} 
                  className="group hover:shadow-md transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedExercise(exercise)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-lg">
                      <div className="flex items-center gap-2">
                        <FaHeadphones className="text-purple-500" />
                        {exercise.title}
                      </div>
                      <Badge variant={exercise.difficulty === 'easy' ? 'default' : exercise.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                        {exercise.difficulty === 'easy' ? 'Dễ' : exercise.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-600 text-sm">{exercise.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaClock />
                        <span>{formatTime(exercise.duration)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaStar />
                        <span>{exercise.questions.length} câu hỏi</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {exercise.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center gap-2"
                      onClick={() => setSelectedExercise(exercise)}
                    >
                      <FaPlay size={12} />
                      Bắt đầu nghe
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty state for categories without exercises */}
            {getSelectedCategoryData()?.exercises.length === 0 && (
              <div className="text-center py-12">
                <FaHeadphones className="text-gray-400 text-6xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Chưa có bài luyện nghe
                </h3>
                <p className="text-gray-600 mb-4">
                  Dữ liệu luyện nghe sẽ được thêm vào đây
                </p>
                <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                  Quay lại chủ đề
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Exercise Detail */}
        {selectedExercise && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedExercise(null)}
                  className="flex items-center gap-2"
                >
                  <FaArrowLeft size={14} />
                  Quay lại danh sách
                </Button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedExercise.title}
                  </h2>
                  <p className="text-gray-600">{selectedExercise.description}</p>
                </div>
              </div>
              <Badge variant="outline">
                {formatTime(selectedExercise.duration)}
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Audio Player */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FaHeadphones className="text-purple-500" />
                      Audio Player
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                      <div className="text-6xl mb-4">🎧</div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Thời gian</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {formatTime(currentTime)} / {formatTime(selectedExercise.duration)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-4">
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="flex items-center gap-2"
                      >
                        <FaRedo size={16} />
                        Lặp lại
                      </Button>
                      <Button 
                        variant="default" 
                        size="lg"
                        className="flex items-center gap-2"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                        {isPlaying ? 'Tạm dừng' : 'Phát'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="flex items-center gap-2"
                      >
                        <FaEye size={16} />
                        Xem script
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FaEye className="text-blue-500" />
                      Script
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="font-semibold text-gray-700 mb-2">Tiếng Nhật:</div>
                        <div className="text-gray-900 p-3 bg-gray-50 rounded-lg">
                          {selectedExercise.transcript.japanese}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-700 mb-2">Romaji:</div>
                        <div className="text-gray-600 p-3 bg-gray-50 rounded-lg">
                          {selectedExercise.transcript.romaji}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-700 mb-2">Tiếng Việt:</div>
                        <div className="text-gray-600 p-3 bg-gray-50 rounded-lg">
                          {selectedExercise.transcript.vietnamese}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Questions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FaStar className="text-yellow-500" />
                      Câu hỏi ({selectedExercise.questions.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {selectedExercise.questions.map((question, idx) => (
                        <div key={question.id} className="border-b pb-4 last:border-b-0">
                          <div className="font-semibold text-gray-900 mb-3">
                            Câu {idx + 1}: {question.question}
                          </div>
                          <div className="space-y-2">
                            {question.options.map((option, optionIdx) => (
                              <div 
                                key={optionIdx}
                                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                              >
                                <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                                <span className="text-gray-700">{option}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t">
                      <Button className="w-full flex items-center gap-2">
                        <FaCheckCircle size={16} />
                        Kiểm tra đáp án
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
