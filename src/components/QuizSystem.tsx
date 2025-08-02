'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FaCheck, 
  FaTimes, 
  FaStar, 
  FaTrophy, 
  FaFire,
  FaRedo,
  FaArrowRight
} from 'react-icons/fa';

interface QuizQuestion {
  id: string;
  type: 'vocabulary' | 'grammar' | 'kanji';
  question: string;
  correctAnswer: string;
  options: string[];
  explanation?: string;
}

interface QuizSystemProps {
  lessonData: any;
  onComplete: (score: number, total: number) => void;
}

export default function QuizSystem({ lessonData, onComplete }: QuizSystemProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    generateQuestions();
  }, [lessonData]);

  const generateQuestions = () => {
    const quizQuestions: QuizQuestion[] = [];
    
    // Generate vocabulary questions
    if (lessonData.vocabulary) {
      lessonData.vocabulary.slice(0, 10).forEach((vocab: any, index: number) => {
        quizQuestions.push({
          id: `vocab-${index}`,
          type: 'vocabulary',
          question: `Nghĩa của từ "${vocab.content}" là gì?`,
          correctAnswer: vocab.meaning,
          options: generateOptions(vocab.meaning, lessonData.vocabulary),
          explanation: `"${vocab.content}" có nghĩa là "${vocab.meaning}"`
        });
      });
    }

    // Generate grammar questions
    if (lessonData.grammar) {
      lessonData.grammar.slice(0, 5).forEach((grammar: any, index: number) => {
        quizQuestions.push({
          id: `grammar-${index}`,
          type: 'grammar',
          question: `Ý nghĩa của ngữ pháp "${grammar.content}" là gì?`,
          correctAnswer: grammar.meaning,
          options: generateOptions(grammar.meaning, lessonData.grammar),
          explanation: grammar.additional_notes
        });
      });
    }

    // Shuffle questions
    const shuffledQuestions = quizQuestions.sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  };

  const generateOptions = (correctAnswer: string, data: any[]) => {
    const options = [correctAnswer];
    const meanings = data.map(item => item.meaning).filter(meaning => meaning !== correctAnswer);
    
    // Add 3 random wrong answers
    for (let i = 0; i < 3 && meanings.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * meanings.length);
      options.push(meanings[randomIndex]);
      meanings.splice(randomIndex, 1);
    }

    // Shuffle options
    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return; // Prevent multiple selections
    
    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
    } else {
      setStreak(0);
    }
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
      onComplete(score, questions.length);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCompleted(false);
    generateQuestions();
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (completed) {
    const percentage = (score / questions.length) * 100;
    const isExcellent = percentage >= 90;
    const isGood = percentage >= 70;
    const isPass = percentage >= 60;

    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaTrophy className="text-4xl text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            {isExcellent ? 'Xuất sắc!' : isGood ? 'Tốt!' : isPass ? 'Đạt!' : 'Cần cố gắng hơn!'}
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Bạn đã hoàn thành bài kiểm tra
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {score}/{questions.length}
              </div>
              <div className="text-sm text-gray-600">Điểm số</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {percentage.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Tỷ lệ đúng</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {maxStreak}
              </div>
              <div className="text-sm text-gray-600">Streak cao nhất</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={handleRetry}
            className="w-full md:w-auto"
          >
            <FaRedo className="mr-2" />
            Làm lại
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Bài kiểm tra</h1>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              {currentQuestion + 1} / {questions.length}
            </Badge>
            <Badge variant="outline">
              Điểm: {score}
            </Badge>
            {streak > 0 && (
              <Badge variant="default" className="flex items-center gap-1 bg-orange-500">
                <FaFire className="text-xs" />
                {streak}
              </Badge>
            )}
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="w-full max-w-2xl mx-auto mb-6">
        <CardHeader>
          <CardTitle className="text-xl mb-4">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  selectedAnswer === option
                    ? option === currentQ.correctAnswer
                      ? "default"
                      : "destructive"
                    : "outline"
                }
                className="w-full justify-start h-auto p-4 text-left transition-all"
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
              >
                <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                {option}
                {showResult && selectedAnswer === option && (
                  <span className="ml-auto">
                    {option === currentQ.correctAnswer ? (
                      <FaCheck className="text-green-600" />
                    ) : (
                      <FaTimes className="text-red-600" />
                    )}
                  </span>
                )}
              </Button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2 text-blue-800">
                {selectedAnswer === currentQ.correctAnswer ? 'Chính xác!' : 'Sai rồi!'}
              </h4>
              {currentQ.explanation && (
                <p className="text-blue-900">{currentQ.explanation}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-center">
        <Button
          onClick={handleNext}
          disabled={!showResult}
          className="transition-all hover:scale-105"
        >
          {currentQuestion < questions.length - 1 ? 'Tiếp theo' : 'Hoàn thành'}
          <FaArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
} 