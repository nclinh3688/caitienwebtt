'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { AnimatedProgress } from '@/components/ui/AnimatedCard';
import { 
  FaPlay, 
  FaPause, 
  FaCheck, 
  FaTimes, 
  FaLightbulb,
  FaClock,
  FaStar,
  FaRedo,
  FaHome,
  FaVolumeUp,
  FaBrain
} from 'react-icons/fa';

interface Question {
  id: string;
  type: 'multiple_choice' | 'fill_blank' | 'audio' | 'speaking' | 'matching' | 'translation';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  hints: string[];
  audioUrl?: string;
  difficulty: number;
  points: number;
}

interface PracticeSession {
  contentId: string;
  currentQuestionIndex: number;
  answers: { [questionId: string]: string };
  score: number;
  timeSpent: number;
  hintsUsed: number;
  isCompleted: boolean;
}

export default function AIPracticePage() {
  const params = useParams();
  const contentId = params?.contentId as string;
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [session, setSession] = useState<PracticeSession>({
    contentId,
    currentQuestionIndex: 0,
    answers: {},
    score: 0,
    timeSpent: 0,
    hintsUsed: 0,
    isCompleted: false
  });
  const [startTime] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPracticeContent();
  }, [contentId]);

  useEffect(() => {
    // Update time spent every second
    const timer = setInterval(() => {
      setSession(prev => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - startTime) / 1000)
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const loadPracticeContent = async () => {
    try {
      // Load from localStorage (generated content) or API
      const saved = localStorage.getItem(`ai-content-${contentId}`);
      if (saved) {
        const content = JSON.parse(saved);
        setQuestions(content.content.questions);
      } else {
        // Generate demo questions
        setQuestions(generateDemoQuestions());
      }
    } catch (error) {
      console.error('Error loading practice content:', error);
      setQuestions(generateDemoQuestions());
    } finally {
      setIsLoading(false);
    }
  };

  const generateDemoQuestions = (): Question[] => {
    return [
      {
        id: 'demo-1',
        type: 'multiple_choice',
        question: 'Chọn cách chào hỏi phù hợp vào buổi sáng:',
        options: ['おはよう', 'こんにちは', 'こんばんは', 'おやすみ'],
        correctAnswer: 'おはよう',
        explanation: 'おはよう (ohayou) được sử dụng để chào buổi sáng với người thân thiết.',
        hints: ['Suy nghĩ về thời gian trong ngày', 'Cách chào informal'],
        difficulty: 2,
        points: 10
      },
      {
        id: 'demo-2',
        type: 'fill_blank',
        question: 'Điền từ thích hợp: 私は学生___です。',
        correctAnswer: 'です',
        explanation: 'です (desu) là động từ "to be" lịch sự trong tiếng Nhật.',
        hints: ['Cần động từ "to be"', 'Dạng lịch sự'],
        difficulty: 3,
        points: 15
      },
      {
        id: 'demo-3',
        type: 'translation',
        question: 'Dịch sang tiếng Nhật: "Xin chào"',
        correctAnswer: 'こんにちは',
        explanation: 'こんにちは (konnichiwa) là cách chào phổ biến nhất trong tiếng Nhật.',
        hints: ['Cách chào universal', 'Dùng được cả ngày'],
        difficulty: 1,
        points: 8
      }
    ];
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleAnswer = (answer: string) => {
    setUserAnswer(answer);
    
    // Update session
    const isCorrect = answer === currentQuestion.correctAnswer;
    const newAnswers = { ...session.answers, [currentQuestion.id]: answer };
    const newScore = isCorrect ? session.score + currentQuestion.points : session.score;
    
    setSession(prev => ({
      ...prev,
      answers: newAnswers,
      score: newScore,
      currentQuestionIndex: currentQuestionIndex
    }));

    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer('');
      setShowExplanation(false);
      setShowHint(false);
    } else {
      // Complete session
      setSession(prev => ({ ...prev, isCompleted: true }));
    }
  };

  const useHint = () => {
    setShowHint(true);
    setSession(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }));
  };

  const playAudio = () => {
    if (currentQuestion.audioUrl) {
      const audio = new Audio(currentQuestion.audioUrl);
      audio.play();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <LoadingSpinner size="lg" variant="primary" text="Đang tải bài tập..." />
        </div>
      </div>
    );
  }

  if (session.isCompleted) {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const scorePercentage = Math.round((session.score / totalPoints) * 100);
    
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <FaStar className="text-yellow-500" />
                🎉 Hoàn thành bài tập!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score Display */}
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(scorePercentage)} mb-2`}>
                  {scorePercentage}%
                </div>
                <p className="text-gray-600">Điểm số của bạn</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-blue-600">{session.score}</div>
                  <div className="text-sm text-gray-600">Điểm đạt được</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-green-600">{formatTime(session.timeSpent)}</div>
                  <div className="text-sm text-gray-600">Thời gian</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-purple-600">
                    {Object.keys(session.answers).filter(qId => {
                      const question = questions.find(q => q.id === qId);
                      return question && session.answers[qId] === question.correctAnswer;
                    }).length}
                  </div>
                  <div className="text-sm text-gray-600">Đúng</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-orange-600">{session.hintsUsed}</div>
                  <div className="text-sm text-gray-600">Gợi ý đã dùng</div>
                </div>
              </div>

              {/* AI Feedback */}
              <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                <h4 className="font-semibold flex items-center gap-2 mb-2">
                  <FaBrain className="text-blue-600" />
                  💡 AI Feedback
                </h4>
                <p className="text-blue-800">
                  {scorePercentage >= 90 
                    ? 'Xuất sắc! Bạn đã nắm vững kiến thức rất tốt. Hãy thử nội dung khó hơn!' 
                    : scorePercentage >= 80 
                    ? 'Tốt lắm! Một số điểm nhỏ cần cải thiện. Tiếp tục luyện tập!'
                    : scorePercentage >= 70
                    ? 'Khá tốt! Hãy xem lại những câu sai để hiểu rõ hơn.'
                    : 'Đừng nản lòng! Hãy ôn tập lại và thử lần nữa. Practice makes perfect!'
                  }
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <FaRedo className="mr-2" />
                  Làm lại
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  <FaHome className="mr-2" />
                  Về Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Không tìm thấy câu hỏi. Vui lòng thử lại.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <span className="font-semibold">
                  Câu {currentQuestionIndex + 1}/{questions.length}
                </span>
                <Badge variant="outline">
                  Độ khó: {currentQuestion.difficulty}/10
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <FaClock />
                  {formatTime(session.timeSpent)}
                </span>
                <span className="flex items-center gap-1">
                  <FaStar />
                  {session.score} điểm
                </span>
              </div>
            </div>
            <AnimatedProgress 
              value={progress} 
              maxValue={100} 
              size="md"
              label={`${Math.round(progress)}% hoàn thành`}
            />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaBrain className="text-purple-600" />
              {currentQuestion.type === 'multiple_choice' && '📝 Trắc nghiệm'}
              {currentQuestion.type === 'fill_blank' && '✏️ Điền từ'}
              {currentQuestion.type === 'translation' && '🔄 Dịch thuật'}
              {currentQuestion.type === 'audio' && '🎧 Nghe'}
              <Badge className="ml-2">
                {currentQuestion.points} điểm
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Question */}
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-lg font-medium mb-3">{currentQuestion.question}</p>
              
              {/* Audio Button */}
              {currentQuestion.audioUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={playAudio}
                  className="mb-3"
                >
                  <FaVolumeUp className="mr-2" />
                  Nghe audio
                </Button>
              )}
            </div>

            {/* Answer Options */}
            {!showExplanation && (
              <div className="space-y-3">
                {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
                  <div className="grid gap-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                      >
                        <span className="font-medium">
                          {String.fromCharCode(65 + index)}. {option}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {(currentQuestion.type === 'fill_blank' || currentQuestion.type === 'translation') && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Nhập câu trả lời..."
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && userAnswer.trim()) {
                          handleAnswer(userAnswer.trim());
                        }
                      }}
                    />
                    <Button
                      onClick={() => handleAnswer(userAnswer.trim())}
                      disabled={!userAnswer.trim()}
                      className="w-full"
                    >
                      <FaCheck className="mr-2" />
                      Xác nhận
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Hint */}
            {showHint && !showExplanation && (
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-yellow-800">
                  💡 <strong>Gợi ý:</strong> {currentQuestion.hints[0]}
                </p>
              </div>
            )}

            {/* Explanation */}
            {showExplanation && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border-2 ${
                  userAnswer === currentQuestion.correctAnswer 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {userAnswer === currentQuestion.correctAnswer ? (
                      <>
                        <FaCheck className="text-green-600" />
                        <span className="font-semibold text-green-600">Chính xác!</span>
                      </>
                    ) : (
                      <>
                        <FaTimes className="text-red-600" />
                        <span className="font-semibold text-red-600">Chưa đúng</span>
                      </>
                    )}
                  </div>
                  
                  <p className="text-gray-800 mb-2">
                    <strong>Đáp án đúng:</strong> {currentQuestion.correctAnswer}
                  </p>
                  
                  <p className="text-gray-700">
                    <strong>Giải thích:</strong> {currentQuestion.explanation}
                  </p>
                </div>

                <Button
                  onClick={nextQuestion}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành bài tập'}
                </Button>
              </div>
            )}

            {/* Hint Button */}
            {!showExplanation && !showHint && (
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={useHint}
                  className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                >
                  <FaLightbulb className="mr-2" />
                  Xem gợi ý
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}