'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Lightbulb,
  Trophy,
  Target,
  BookOpen
} from 'lucide-react';

interface AIPracticeQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'sentence-building';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

interface AIPracticeSession {
  id: string;
  title: string;
  description: string;
  questions: AIPracticeQuestion[];
  totalQuestions: number;
  currentQuestion: number;
  correctAnswers: number;
  timeSpent: number;
  isCompleted: boolean;
}

interface AIPracticeGeneratorProps {
  pageType: 'vocabulary' | 'grammar' | 'kanji';
  currentItem?: any;
  category?: string;
  onComplete?: (session: AIPracticeSession) => void;
}

export default function AIPracticeGenerator({ 
  pageType, 
  currentItem, 
  category, 
  onComplete 
}: AIPracticeGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSession, setCurrentSession] = useState<AIPracticeSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeStart, setTimeStart] = useState<Date | null>(null);

  const generatePracticeSession = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI generating practice questions
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const questions = generateQuestions(pageType, currentItem, category);
      const session: AIPracticeSession = {
        id: Date.now().toString(),
        title: `Bài tập ${getPageTypeTitle(pageType)}`,
        description: `Bài tập được tạo bởi AI cho ${category || 'chủ đề hiện tại'}`,
        questions,
        totalQuestions: questions.length,
        currentQuestion: 0,
        correctAnswers: 0,
        timeSpent: 0,
        isCompleted: false
      };
      
      setCurrentSession(session);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setShowResults(false);
      setTimeStart(new Date());
    } catch (error) {
      console.error('Error generating practice session:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateQuestions = (type: string, item?: any, cat?: string): AIPracticeQuestion[] => {
    const questions: AIPracticeQuestion[] = [];
    
    switch (type) {
      case 'vocabulary':
        questions.push(
          {
            id: 'v1',
            type: 'multiple-choice',
            question: `Từ "${item?.japanese || 'こんにちは'}" có nghĩa là gì?`,
            options: [
              item?.meaning || 'Xin chào',
              'Tạm biệt',
              'Cảm ơn',
              'Xin lỗi'
            ],
            correctAnswer: 0,
            explanation: `"${item?.japanese || 'こんにちは'}" có nghĩa là "${item?.meaning || 'Xin chào'}" trong tiếng Việt.`,
            difficulty: 'easy',
            category: cat || 'vocabulary'
          },
          {
            id: 'v2',
            type: 'fill-blank',
            question: `Điền từ còn thiếu: "私は___です。" (Tôi là học sinh.)`,
            correctAnswer: '学生',
            explanation: '学生 (gakusei) có nghĩa là "học sinh" trong tiếng Nhật.',
            difficulty: 'medium',
            category: cat || 'vocabulary'
          }
        );
        break;
        
      case 'grammar':
        questions.push(
          {
            id: 'g1',
            type: 'multiple-choice',
            question: `Trợ từ "${item?.pattern || 'は'}" dùng để làm gì?`,
            options: [
              'Đánh dấu chủ ngữ',
              'Đánh dấu tân ngữ',
              'Chỉ thời gian',
              'Chỉ địa điểm'
            ],
            correctAnswer: 0,
            explanation: `Trợ từ "${item?.pattern || 'は'}" dùng để đánh dấu chủ ngữ hoặc chủ đề của câu.`,
            difficulty: 'easy',
            category: cat || 'grammar'
          },
          {
            id: 'g2',
            type: 'sentence-building',
            question: 'Sắp xếp các từ thành câu đúng: 学生 / です / 田中 / は',
            correctAnswer: '田中は学生です',
            explanation: 'Câu đúng là: 田中は学生です (Tanaka wa gakusei desu) - Tanaka là học sinh.',
            difficulty: 'medium',
            category: cat || 'grammar'
          }
        );
        break;
        
      case 'kanji':
        questions.push(
          {
            id: 'k1',
            type: 'multiple-choice',
            question: `Kanji "${item?.character || '人'}" có nghĩa là gì?`,
            options: [
              item?.meaning || 'Người',
              'Nhà',
              'Nước',
              'Lửa'
            ],
            correctAnswer: 0,
            explanation: `Kanji "${item?.character || '人'}" có nghĩa là "${item?.meaning || 'Người'}"`,
            difficulty: 'easy',
            category: cat || 'kanji'
          },
          {
            id: 'k2',
            type: 'matching',
            question: 'Nối kanji với cách đọc đúng: 人',
            options: ['じん (jin)', 'にん (nin)', 'ひと (hito)', 'じん (jin)'],
            correctAnswer: 2,
            explanation: 'Kanji 人 có kunyomi là ひと (hito) và onyomi là じん (jin).',
            difficulty: 'medium',
            category: cat || 'kanji'
          }
        );
        break;
    }
    
    return questions;
  };

  const getPageTypeTitle = (type: string) => {
    switch (type) {
      case 'vocabulary': return 'Từ vựng';
      case 'grammar': return 'Ngữ pháp';
      case 'kanji': return 'Kanji';
      default: return 'Học tập';
    }
  };

  const handleAnswer = (answer: string | number) => {
    if (!currentSession) return;
    
    const questionId = currentSession.questions[currentQuestionIndex].id;
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    // Move to next question or complete session
    if (currentQuestionIndex < currentSession.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      completeSession();
    }
  };

  const completeSession = () => {
    if (!currentSession || !timeStart) return;
    
    const timeSpent = Math.floor((Date.now() - timeStart.getTime()) / 1000);
    const correctAnswers = currentSession.questions.reduce((count, question, index) => {
      const userAnswer = userAnswers[question.id];
      return count + (userAnswer === question.correctAnswer ? 1 : 0);
    }, 0);
    
    const completedSession: AIPracticeSession = {
      ...currentSession,
      currentQuestion: currentSession.questions.length,
      correctAnswers,
      timeSpent,
      isCompleted: true
    };
    
    setCurrentSession(completedSession);
    setShowResults(true);
    onComplete?.(completedSession);
  };

  const resetSession = () => {
    setCurrentSession(null);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
    setTimeStart(null);
  };

  const getCurrentQuestion = () => {
    if (!currentSession) return null;
    return currentSession.questions[currentQuestionIndex];
  };

  const getProgress = () => {
    if (!currentSession) return 0;
    return (currentQuestionIndex / currentSession.questions.length) * 100;
  };

  const getScore = () => {
    if (!currentSession) return 0;
    return Math.round((currentSession.correctAnswers / currentSession.totalQuestions) * 100);
  };

  if (!currentSession) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            AI Practice Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-sm">
            Tạo bài tập tùy chỉnh với AI để luyện tập {getPageTypeTitle(pageType)} N5
          </p>
          
          <Button 
            onClick={generatePracticeSession}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Đang tạo bài tập...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Tạo bài tập AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Kết quả bài tập
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {getScore()}%
            </div>
            <div className="text-sm text-gray-600">
              {currentSession.correctAnswers}/{currentSession.totalQuestions} câu đúng
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Thời gian: {Math.floor(currentSession.timeSpent / 60)}:{(currentSession.timeSpent % 60).toString().padStart(2, '0')}
            </div>
          </div>
          
          <div className="space-y-2">
            {currentSession.questions.map((question, index) => {
              const userAnswer = userAnswers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                  {isCorrect ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">
                    Câu {index + 1}: {isCorrect ? 'Đúng' : 'Sai'}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="flex gap-2">
            <Button onClick={resetSession} variant="outline" className="flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              Làm lại
            </Button>
            <Button onClick={generatePracticeSession} className="flex-1">
              <Sparkles className="h-4 w-4 mr-2" />
              Bài mới
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) return null;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Câu {currentQuestionIndex + 1}/{currentSession.totalQuestions}
          </CardTitle>
          <Badge variant={currentQuestion.difficulty === 'easy' ? 'default' : currentQuestion.difficulty === 'medium' ? 'secondary' : 'destructive'}>
            {currentQuestion.difficulty === 'easy' ? 'Dễ' : currentQuestion.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
          </Badge>
        </div>
        <Progress value={getProgress()} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            {currentQuestion.question}
          </h3>
          
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => handleAnswer(index)}
                >
                  <span className="mr-2 font-mono">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          )}
          
          {currentQuestion.type === 'fill-blank' && (
            <div className="space-y-2">
              <Input 
                placeholder="Nhập câu trả lời..."
                onKeyPress={(e) => e.key === 'Enter' && handleAnswer(e.currentTarget.value)}
              />
              <Button onClick={() => {
                const input = document.querySelector('input');
                if (input) handleAnswer(input.value);
              }}>
                Trả lời
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Lightbulb className="h-3 w-3" />
          <span>AI đã tạo bài tập này dựa trên nội dung bạn đang học</span>
        </div>
      </CardContent>
    </Card>
  );
}
