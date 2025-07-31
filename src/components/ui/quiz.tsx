'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FaCheck, 
  FaTimes, 
  FaQuestion, 
  FaClock, 
  FaTrophy,
  FaRedo,
  FaVolumeUp,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'listening' | 'kanji-reading' | 'grammar';
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  category: 'vocabulary' | 'grammar' | 'kanji' | 'listening' | 'reading';
  question: string;
  questionJapanese?: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  hint?: string;
  audioUrl?: string;
  imageUrl?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
}

interface QuizProps {
  questions: QuizQuestion[];
  title: string;
  timeLimit?: number; // in minutes
  showProgress?: boolean;
  showHints?: boolean;
  randomOrder?: boolean;
  onComplete?: (results: QuizResults) => void;
}

interface QuizResults {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  timeSpent: number;
  accuracy: number;
  questionResults: Array<{
    questionId: string;
    isCorrect: boolean;
    userAnswer: string | number;
    correctAnswer: string | number;
    timeSpent: number;
  }>;
}

export function Quiz({ 
  questions, 
  title, 
  timeLimit, 
  showProgress = true, 
  showHints = true,
  randomOrder = false,
  onComplete 
}: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Map<string, string | number>>(new Map());
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timeRemaining, setTimeRemaining] = useState(timeLimit ? timeLimit * 60 : null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<QuizResults | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [shuffledQuestions] = useState(() => 
    randomOrder ? [...questions].sort(() => Math.random() - 0.5) : questions
  );

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;

  // Timer effect
  useEffect(() => {
    if (timeLimit && timeRemaining !== null && timeRemaining > 0 && !isCompleted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleQuizComplete();
    }
  }, [timeRemaining, isCompleted, timeLimit]);

  const handleAnswer = (answer: string | number) => {
    const newAnswers = new Map(userAnswers);
    newAnswers.set(currentQuestion.id, answer);
    setUserAnswers(newAnswers);
    setShowAnswer(true);
  };

  const handleNext = () => {
    setShowAnswer(false);
    setShowHint(false);
    setQuestionStartTime(Date.now());
    
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    const totalTime = (Date.now() - quizStartTime) / 1000;
    let correctCount = 0;
    const questionResults = shuffledQuestions.map(question => {
      const userAnswer = userAnswers.get(question.id);
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) correctCount++;
      
      return {
        questionId: question.id,
        isCorrect,
        userAnswer: userAnswer || '',
        correctAnswer: question.correctAnswer,
        timeSpent: 30 // Simplified - in real app, track per question
      };
    });

    const quizResults: QuizResults = {
      score: Math.round((correctCount / shuffledQuestions.length) * 100),
      totalQuestions: shuffledQuestions.length,
      correctAnswers: correctCount,
      incorrectAnswers: shuffledQuestions.length - correctCount,
      timeSpent: totalTime,
      accuracy: (correctCount / shuffledQuestions.length) * 100,
      questionResults
    };

    setResults(quizResults);
    setIsCompleted(true);
    onComplete?.(quizResults);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(new Map());
    setShowAnswer(false);
    setIsCompleted(false);
    setResults(null);
    setShowHint(false);
    setQuestionStartTime(Date.now());
    if (timeLimit) {
      setTimeRemaining(timeLimit * 60);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <Button
                key={index}
                variant={userAnswers.get(currentQuestion.id) === index ? 'default' : 'outline'}
                className={`w-full text-left justify-start p-4 h-auto ${
                  showAnswer && index === currentQuestion.correctAnswer 
                    ? 'bg-green-100 border-green-500' 
                    : showAnswer && userAnswers.get(currentQuestion.id) === index && index !== currentQuestion.correctAnswer
                    ? 'bg-red-100 border-red-500'
                    : ''
                }`}
                onClick={() => !showAnswer && handleAnswer(index)}
                disabled={showAnswer}
              >
                <span className="mr-3 font-semibold">{String.fromCharCode(65 + index)}.</span>
                {option}
                {showAnswer && index === currentQuestion.correctAnswer && (
                  <FaCheck className="ml-auto text-green-600" />
                )}
                {showAnswer && userAnswers.get(currentQuestion.id) === index && index !== currentQuestion.correctAnswer && (
                  <FaTimes className="ml-auto text-red-600" />
                )}
              </Button>
            ))}
          </div>
        );

      case 'fill-blank':
        return (
          <div className="space-y-4">
            <div className="text-lg" dangerouslySetInnerHTML={{ 
              __html: currentQuestion.question.replace('___', '<span class="bg-yellow-200 px-2 py-1 mx-1">___</span>')
            }} />
            <input
              type="text"
              className={`w-full p-3 border rounded-lg text-lg ${
                showAnswer 
                  ? userAnswers.get(currentQuestion.id) === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-gray-300'
              }`}
              placeholder="Nhập câu trả lời..."
              value={userAnswers.get(currentQuestion.id) || ''}
              onChange={(e) => !showAnswer && handleAnswer(e.target.value)}
              disabled={showAnswer}
              onKeyPress={(e) => e.key === 'Enter' && !showAnswer && setShowAnswer(true)}
            />
            {!showAnswer && (
              <Button onClick={() => setShowAnswer(true)} className="w-full">
                Xác nhận đáp án
              </Button>
            )}
          </div>
        );

      case 'listening':
        return (
          <div className="space-y-4">
            {currentQuestion.audioUrl && (
              <div className="text-center">
                <Button variant="outline" size="lg" className="mb-4">
                  <FaVolumeUp className="mr-2" />
                  Nghe audio
                </Button>
                <audio controls className="w-full">
                  <source src={currentQuestion.audioUrl} type="audio/mpeg" />
                </audio>
              </div>
            )}
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={userAnswers.get(currentQuestion.id) === index ? 'default' : 'outline'}
                  className={`w-full text-left justify-start p-4 h-auto ${
                    showAnswer && index === currentQuestion.correctAnswer 
                      ? 'bg-green-100 border-green-500' 
                      : showAnswer && userAnswers.get(currentQuestion.id) === index && index !== currentQuestion.correctAnswer
                      ? 'bg-red-100 border-red-500'
                      : ''
                  }`}
                  onClick={() => !showAnswer && handleAnswer(index)}
                  disabled={showAnswer}
                >
                  <span className="mr-3 font-semibold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case 'kanji-reading':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-800 mb-4 p-8 bg-gray-50 rounded-lg">
                {currentQuestion.questionJapanese}
              </div>
              <p className="text-lg text-gray-600">Chọn cách đọc đúng:</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={userAnswers.get(currentQuestion.id) === index ? 'default' : 'outline'}
                  className={`p-4 text-lg ${
                    showAnswer && index === currentQuestion.correctAnswer 
                      ? 'bg-green-100 border-green-500' 
                      : showAnswer && userAnswers.get(currentQuestion.id) === index && index !== currentQuestion.correctAnswer
                      ? 'bg-red-100 border-red-500'
                      : ''
                  }`}
                  onClick={() => !showAnswer && handleAnswer(index)}
                  disabled={showAnswer}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Loại câu hỏi không được hỗ trợ</div>;
    }
  };

  // Results screen
  if (isCompleted && results) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-4">
            <FaTrophy className="inline mr-3 text-yellow-500" />
            Kết quả Quiz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold mb-4 ${
              results.score >= 80 ? 'text-green-600' : 
              results.score >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {results.score}%
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{results.correctAnswers}</div>
                <div className="text-gray-600">Đúng</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{results.incorrectAnswers}</div>
                <div className="text-gray-600">Sai</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{formatTime(Math.floor(results.timeSpent))}</div>
                <div className="text-gray-600">Thời gian</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Chi tiết từng câu:</h3>
            {results.questionResults.map((result, index) => (
              <div key={result.questionId} className={`p-4 rounded-lg border ${
                result.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Câu {index + 1}</span>
                  {result.isCorrect ? (
                    <FaCheck className="text-green-600" />
                  ) : (
                    <FaTimes className="text-red-600" />
                  )}
                </div>
                {!result.isCorrect && (
                  <div className="mt-2 text-sm">
                    <div>Bạn trả lời: <span className="text-red-600">{result.userAnswer}</span></div>
                    <div>Đáp án đúng: <span className="text-green-600">{result.correctAnswer}</span></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <Button onClick={restartQuiz} size="lg">
              <FaRedo className="mr-2" />
              Làm lại
            </Button>
            <Button variant="outline" size="lg">
              Xem đáp án chi tiết
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Main quiz interface
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <div className="flex items-center space-x-4">
            {timeRemaining !== null && (
              <div className={`flex items-center ${timeRemaining < 60 ? 'text-red-600' : 'text-gray-600'}`}>
                <FaClock className="mr-2" />
                {formatTime(timeRemaining)}
              </div>
            )}
            <div className="text-gray-600">
              {currentQuestionIndex + 1} / {shuffledQuestions.length}
            </div>
          </div>
        </div>
        {showProgress && (
          <Progress value={progress} className="mt-4" />
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Question Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                currentQuestion.level === 'N5' ? 'bg-green-100 text-green-800' :
                currentQuestion.level === 'N4' ? 'bg-blue-100 text-blue-800' :
                currentQuestion.level === 'N3' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {currentQuestion.level}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                {currentQuestion.category}
              </span>
              <div className="flex">
                {[...Array(currentQuestion.difficulty)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
            </div>
            
            {showHints && currentQuestion.hint && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHint(!showHint)}
              >
                {showHint ? <FaEyeSlash /> : <FaEye />}
                Gợi ý
              </Button>
            )}
          </div>

          {/* Hint */}
          {showHint && currentQuestion.hint && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center text-blue-800 mb-2">
                <FaQuestion className="mr-2" />
                <span className="font-semibold">Gợi ý:</span>
              </div>
              <p className="text-blue-700">{currentQuestion.hint}</p>
            </div>
          )}

          {/* Question */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
            {renderQuestion()}
          </div>

          {/* Explanation (shown after answer) */}
          {showAnswer && currentQuestion.explanation && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center text-yellow-800 mb-2">
                <FaQuestion className="mr-2" />
                <span className="font-semibold">Giải thích:</span>
              </div>
              <p className="text-yellow-700">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            >
              Câu trước
            </Button>
            
            {showAnswer && (
              <Button onClick={handleNext} size="lg">
                {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}