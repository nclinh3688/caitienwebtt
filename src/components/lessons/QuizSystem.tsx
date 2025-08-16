'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Play, 
  Clock,
  ArrowRight,
  ArrowLeft,
  Star,
  Target,
  Brain,
  BookOpen,
  AlertCircle,
  Timer
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'matching';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  category: 'grammar' | 'vocabulary' | 'comprehension' | 'listening';
}

interface QuizSystemProps {
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  onComplete: (score: number, total: number, timeSpent: number) => void;
  onClose: () => void;
}

export default function QuizSystem({ questions, timeLimit, onComplete, onClose }: QuizSystemProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit ? timeLimit * 60 : 0); // Convert to seconds
  const [timeSpent, setTimeSpent] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted && timeLimit && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpent(prev => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, timeLeft, timeLimit]);

  const handleTimeUp = () => {
    // Auto-submit quiz when time is up
    handleSubmitQuiz();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (questionId: string, answer: string | string[]) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmitQuiz = () => {
    let totalScore = 0;
    
    questions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];
      if (userAnswer) {
        if (Array.isArray(question.correctAnswer)) {
          // For matching questions
          if (Array.isArray(userAnswer) && 
              userAnswer.length === question.correctAnswer.length &&
              userAnswer.every((ans, index) => ans === question.correctAnswer[index])) {
            totalScore += question.points;
          }
        } else {
          // For single answer questions
          if (userAnswer === question.correctAnswer) {
            totalScore += question.points;
          }
        }
      }
    });

    setScore(totalScore);
    setShowResult(true);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswers({});
    setShowResult(false);
    setTimeLeft(timeLimit ? timeLimit * 60 : 0);
    setTimeSpent(0);
    setQuizStarted(false);
    setShowExplanation(false);
  };

  const handleComplete = () => {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    onComplete(score, totalPoints, timeSpent);
    onClose();
  };

  const currentQuestion = questions[currentQuestionIndex];
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const answeredQuestions = Object.keys(selectedAnswers).length;
  const progressPercentage = (answeredQuestions / questions.length) * 100;

  if (!quizStarted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center"
        >
          <div className="mb-6">
            <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bài kiểm tra</h2>
            <p className="text-gray-600">
              Kiểm tra kiến thức của bạn với {questions.length} câu hỏi
            </p>
          </div>

          <div className="space-y-4 mb-6 text-left">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-700">{questions.length} câu hỏi</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-700">{totalPoints} điểm tối đa</span>
            </div>
            {timeLimit && (
              <div className="flex items-center gap-3">
                <Timer className="w-5 h-5 text-red-600" />
                <span className="text-sm text-gray-700">Thời gian: {timeLimit} phút</span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleStartQuiz}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Bắt đầu
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / totalPoints) * 100);
    const isExcellent = percentage >= 90;
    const isGood = percentage >= 70;
    const isPass = percentage >= 60;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center"
        >
          <div className="mb-6">
            {isExcellent && <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4" />}
            {isGood && <Target className="w-16 h-16 text-green-500 mx-auto mb-4" />}
            {isPass && <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />}
            {!isPass && <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isExcellent ? 'Xuất sắc!' : isGood ? 'Tốt lắm!' : isPass ? 'Đạt yêu cầu!' : 'Cần cải thiện!'}
          </h2>
          
          <p className="text-gray-600 mb-4">
            Bạn đã đạt {score}/{totalPoints} điểm
          </p>

          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ${
                  isExcellent ? 'bg-yellow-500' : isGood ? 'bg-green-500' : isPass ? 'bg-blue-500' : 'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{percentage}%</p>
          </div>

          {timeLimit && (
            <p className="text-sm text-gray-600 mb-4">
              Thời gian hoàn thành: {formatTime(timeSpent)}
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Thử lại
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Hoàn thành
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Bài kiểm tra</h2>
              <p className="text-sm text-gray-600">
                Câu {currentQuestionIndex + 1} / {questions.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {timeLimit && (
              <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="text-red-600 font-semibold">
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Tiến độ</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentQuestion.category === 'grammar' ? 'bg-blue-100 text-blue-800' :
              currentQuestion.category === 'vocabulary' ? 'bg-green-100 text-green-800' :
              currentQuestion.category === 'comprehension' ? 'bg-purple-100 text-purple-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {currentQuestion.category === 'grammar' ? 'Ngữ pháp' :
               currentQuestion.category === 'vocabulary' ? 'Từ vựng' :
               currentQuestion.category === 'comprehension' ? 'Đọc hiểu' : 'Nghe hiểu'}
            </span>
            <span className="text-sm text-gray-500">{currentQuestion.points} điểm</span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h3>

          {/* Answer Options */}
          {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                  className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                    selectedAnswers[currentQuestion.id] === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                      {selectedAnswers[currentQuestion.id] === option && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'true-false' && (
            <div className="grid grid-cols-2 gap-4">
              {['Đúng', 'Sai'].map((option) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                  className={`p-4 border-2 rounded-xl text-center transition-all ${
                    selectedAnswers[currentQuestion.id] === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <span className="font-medium text-gray-900">{option}</span>
                </motion.button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'fill-blank' && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nhập câu trả lời của bạn..."
                value={selectedAnswers[currentQuestion.id] as string || ''}
                onChange={(e) => handleAnswerSelect(currentQuestion.id, e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Câu trước
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Đã trả lời:</span>
              <span className="font-semibold text-blue-600">{answeredQuestions}</span>
              <span className="text-sm text-gray-600">/ {questions.length}</span>
            </div>
          </div>

          <div className="flex gap-3">
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Câu tiếp theo
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                Nộp bài
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
