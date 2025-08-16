'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Play, 
  Volume2,
  VolumeX,
  ArrowRight,
  Star,
  Target,
  Brain
} from 'lucide-react';

interface Vocabulary {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  example: string;
  difficulty: string;
  order: number;
}

interface VocabularyPracticeProps {
  vocabulary: Vocabulary[];
  onComplete: (score: number, total: number) => void;
  onClose: () => void;
}

type PracticeMode = 'meaning' | 'reading' | 'word' | 'mixed';

export default function VocabularyPractice({ vocabulary, onComplete, onClose }: VocabularyPracticeProps) {
  const [currentMode, setCurrentMode] = useState<PracticeMode>('meaning');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [practiceHistory, setPracticeHistory] = useState<{ [key: string]: number }>({});

  const [questions, setQuestions] = useState<Array<{
    id: string;
    question: string;
    correctAnswer: string;
    options: string[];
    type: PracticeMode;
    vocabulary: Vocabulary;
  }>>([]);

  useEffect(() => {
    generateQuestions();
  }, [currentMode, vocabulary]);

  const generateQuestions = () => {
    const newQuestions = vocabulary.map((vocab, index) => {
      let question: string;
      let correctAnswer: string;
      let options: string[];

      switch (currentMode) {
        case 'meaning':
          question = `Nghĩa của từ "${vocab.word}" là gì?`;
          correctAnswer = vocab.meaning;
          options = generateOptions(vocab.meaning, vocabulary.map(v => v.meaning));
          break;
        case 'reading':
          question = `Cách đọc của từ "${vocab.word}" là gì?`;
          correctAnswer = vocab.reading || vocab.word;
          options = generateOptions(vocab.reading || vocab.word, vocabulary.map(v => v.reading || v.word));
          break;
        case 'word':
          question = `Từ nào có nghĩa "${vocab.meaning}"?`;
          correctAnswer = vocab.word;
          options = generateOptions(vocab.word, vocabulary.map(v => v.word));
          break;
        default: // mixed
          const modes: PracticeMode[] = ['meaning', 'reading', 'word'];
          const randomMode = modes[Math.floor(Math.random() * modes.length)];
          return generateQuestionsForMode(vocab, randomMode, index);
      }

      return {
        id: `${vocab.id}-${index}`,
        question,
        correctAnswer,
        options,
        type: currentMode,
        vocabulary: vocab
      };
    });

    // Shuffle questions and options
    const shuffledQuestions = newQuestions
      .sort(() => Math.random() - 0.5)
      .map(q => ({
        ...q,
        options: q.options.sort(() => Math.random() - 0.5)
      }));

    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
  };

  const generateQuestionsForMode = (vocab: Vocabulary, mode: PracticeMode, index: number) => {
    let question: string;
    let correctAnswer: string;
    let options: string[];

    switch (mode) {
      case 'meaning':
        question = `Nghĩa của từ "${vocab.word}" là gì?`;
        correctAnswer = vocab.meaning;
        options = generateOptions(vocab.meaning, vocabulary.map(v => v.meaning));
        break;
      case 'reading':
        question = `Cách đọc của từ "${vocab.word}" là gì?`;
        correctAnswer = vocab.reading || vocab.word;
        options = generateOptions(vocab.reading || vocab.word, vocabulary.map(v => v.reading || v.word));
        break;
      case 'word':
        question = `Từ nào có nghĩa "${vocab.meaning}"?`;
        correctAnswer = vocab.word;
        options = generateOptions(vocab.word, vocabulary.map(v => v.word));
        break;
      default:
        question = `Nghĩa của từ "${vocab.word}" là gì?`;
        correctAnswer = vocab.meaning;
        options = generateOptions(vocab.meaning, vocabulary.map(v => v.meaning));
        break;
    }

    return {
      id: `${vocab.id}-${index}`,
      question,
      correctAnswer,
      options,
      type: mode,
      vocabulary: vocab
    };
  };

  const generateOptions = (correctAnswer: string, allAnswers: string[]) => {
    const options = [correctAnswer];
    const otherAnswers = allAnswers.filter(answer => answer !== correctAnswer);
    
    // Add 3 random wrong answers
    while (options.length < 4 && otherAnswers.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherAnswers.length);
      const randomAnswer = otherAnswers.splice(randomIndex, 1)[0];
      if (!options.includes(randomAnswer)) {
        options.push(randomAnswer);
      }
    }

    // If we don't have enough options, add some generic ones
    while (options.length < 4) {
      options.push(`Đáp án ${options.length + 1}`);
    }

    return options;
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    const currentQuestion = questions[currentQuestionIndex];
    const correct = answer === currentQuestion.correctAnswer;
    
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
      // Update practice history
      setPracticeHistory(prev => ({
        ...prev,
        [currentQuestion.vocabulary.id]: (prev[currentQuestion.vocabulary.id] || 0) + 1
      }));
    }

    // Show result for 2 seconds, then move to next question
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handleRetry = () => {
    generateQuestions();
  };

  const handleComplete = () => {
    onComplete(score, questions.length);
    onClose();
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tạo câu hỏi...</p>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
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
            Bạn đã trả lời đúng {score}/{questions.length} câu hỏi
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
        className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Luyện tập từ vựng</h2>
              <p className="text-sm text-gray-600">
                Câu {currentQuestionIndex + 1} / {questions.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
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
            <span>{Math.round((currentQuestionIndex / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentQuestionIndex / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {currentQuestion?.question}
          </h3>
          
          {/* Vocabulary Display */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-blue-900 mb-2">
                {currentQuestion?.vocabulary.word}
              </h4>
              {currentQuestion?.vocabulary.reading && (
                <p className="text-lg text-blue-700 mb-2">
                  ({currentQuestion?.vocabulary.reading})
                </p>
              )}
              <p className="text-blue-800">
                {currentQuestion?.vocabulary.meaning}
              </p>
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion?.options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  selectedAnswer === null
                    ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    : selectedAnswer === option
                    ? option === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                    : option === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{option}</span>
                  {selectedAnswer === option && (
                    option === currentQuestion.correctAnswer ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )
                  )}
                  {option === currentQuestion.correctAnswer && selectedAnswer !== null && selectedAnswer !== option && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Điểm số:</span>
            <span className="font-semibold text-blue-600">{score}</span>
            <span className="text-sm text-gray-600">/ {questions.length}</span>
          </div>

          {selectedAnswer !== null && currentQuestionIndex < questions.length - 1 && (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Câu tiếp theo
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
