'use client';

import { useState, useEffect } from 'react';
import { FaClock, FaBook } from 'react-icons/fa';
import SimpleVocabularyTable from '@/components/learning/SimpleVocabularyTable';
import GroupedVocabularyTable from '@/components/learning/GroupedVocabularyTable';
import { lesson1Vocabulary } from '@/data/lesson1-vocabulary';
import { lesson2Vocabulary } from '@/data/lesson2-vocabulary';
import { lesson3Vocabulary } from '@/data/lesson3-vocabulary';
import { lesson4Vocabulary } from '@/data/lesson4-vocabulary';
import { lesson5Vocabulary } from '@/data/lesson5-vocabulary';
import { lesson6Vocabulary } from '@/data/lesson6-vocabulary';
import { lesson7Vocabulary } from '@/data/lesson7-vocabulary';
import { lesson8Vocabulary } from '@/data/lesson8-vocabulary';
import { lesson9Vocabulary } from '@/data/lesson9-vocabulary';
import { lesson10Vocabulary } from '@/data/lesson10-vocabulary';
import { lesson11Vocabulary } from '@/data/lesson11-vocabulary';
import { lesson12Vocabulary } from '@/data/lesson12-vocabulary';
import { lesson13Vocabulary } from '@/data/lesson13-vocabulary';
import { lesson14Vocabulary } from '@/data/lesson14-vocabulary';
import { lesson15Vocabulary } from '@/data/lesson15-vocabulary';
import { lesson16Vocabulary } from '@/data/lesson16-vocabulary';
import { lesson17Vocabulary } from '@/data/lesson17-vocabulary';
import { lesson18Vocabulary } from '@/data/lesson18-vocabulary';
import { lesson19Vocabulary } from '@/data/lesson19-vocabulary';
import { lesson20Vocabulary } from '@/data/lesson20-vocabulary';
import { lesson21Vocabulary } from '@/data/lesson21-vocabulary';
import { lesson22Vocabulary } from '@/data/lesson22-vocabulary';
import { lesson23Vocabulary } from '@/data/lesson23-vocabulary';
import { lesson24Vocabulary } from '@/data/lesson24-vocabulary';
import { lesson25Vocabulary } from '@/data/lesson25-vocabulary';
import FlashcardComponent from '@/components/learning/FlashcardComponent';

// Danh sách 25 bài học N5
const lessons = [
  {
    id: 'lesson-1',
    number: 'Bài 1',
    title: 'Bài 1',
    japaneseTitle: '第一課',
    description: 'Từ vựng cơ bản N5',
    progress: 85,
    wordCount: lesson1Vocabulary.length,
    estimatedTime: 15,
    icon: '👋'
  },
  {
    id: 'lesson-2',
    number: 'Bài 2',
    title: 'Bài 2',
    japaneseTitle: '第二課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson2Vocabulary.length,
    estimatedTime: 15,
    icon: '📝'
  },
  {
    id: 'lesson-3',
    number: 'Bài 3',
    title: 'Bài 3',
    japaneseTitle: '第三課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson3Vocabulary.length,
    estimatedTime: 15,
    icon: '📚'
  },
  {
    id: 'lesson-4',
    number: 'Bài 4',
    title: 'Bài 4',
    japaneseTitle: '第四課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson4Vocabulary.length,
    estimatedTime: 15,
    icon: '📖'
  },
  {
    id: 'lesson-5',
    number: 'Bài 5',
    title: 'Bài 5',
    japaneseTitle: '第五課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson5Vocabulary.length,
    estimatedTime: 15,
    icon: '📘'
  },
  {
    id: 'lesson-6',
    number: 'Bài 6',
    title: 'Bài 6',
    japaneseTitle: '第六課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson6Vocabulary.length,
    estimatedTime: 15,
    icon: '📙'
  },
  {
    id: 'lesson-7',
    number: 'Bài 7',
    title: 'Bài 7',
    japaneseTitle: '第七課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson7Vocabulary.length,
    estimatedTime: 15,
    icon: '📗'
  },
  {
    id: 'lesson-8',
    number: 'Bài 8',
    title: 'Bài 8',
    japaneseTitle: '第八課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson8Vocabulary.length,
    estimatedTime: 15,
    icon: '📓'
  },
  {
    id: 'lesson-9',
    number: 'Bài 9',
    title: 'Bài 9',
    japaneseTitle: '第九課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson9Vocabulary.length,
    estimatedTime: 15,
    icon: '📔'
  },
  {
    id: 'lesson-10',
    number: 'Bài 10',
    title: 'Bài 10',
    japaneseTitle: '第十課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson10Vocabulary.length,
    estimatedTime: 15,
    icon: '📕'
  },
  {
    id: 'lesson-11',
    number: 'Bài 11',
    title: 'Bài 11',
    japaneseTitle: '第十一課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson11Vocabulary.length,
    estimatedTime: 15,
    icon: '📖'
  },
  {
    id: 'lesson-12',
    number: 'Bài 12',
    title: 'Bài 12',
    japaneseTitle: '第十二課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson12Vocabulary.length,
    estimatedTime: 15,
    icon: '📝'
  },
  {
    id: 'lesson-13',
    number: 'Bài 13',
    title: 'Bài 13',
    japaneseTitle: '第十三課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson13Vocabulary.length,
    estimatedTime: 15,
    icon: '📘'
  },
  {
    id: 'lesson-14',
    number: 'Bài 14',
    title: 'Bài 14',
    japaneseTitle: '第十四課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson14Vocabulary.length,
    estimatedTime: 15,
    icon: '📙'
  },
  {
    id: 'lesson-15',
    number: 'Bài 15',
    title: 'Bài 15',
    japaneseTitle: '第十五課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson15Vocabulary.length,
    estimatedTime: 15,
    icon: '📗'
  },
  {
    id: 'lesson-16',
    number: 'Bài 16',
    title: 'Bài 16',
    japaneseTitle: '第十六課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson16Vocabulary.length,
    estimatedTime: 15,
    icon: '📓'
  },
  {
    id: 'lesson-17',
    number: 'Bài 17',
    title: 'Bài 17',
    japaneseTitle: '第十七課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson17Vocabulary.length,
    estimatedTime: 15,
    icon: '📔'
  },
  {
    id: 'lesson-18',
    number: 'Bài 18',
    title: 'Bài 18',
    japaneseTitle: '第十八課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson18Vocabulary.length,
    estimatedTime: 15,
    icon: '📕'
  },
  {
    id: 'lesson-19',
    number: 'Bài 19',
    title: 'Bài 19',
    japaneseTitle: '第十九課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson19Vocabulary.length,
    estimatedTime: 15,
    icon: '📖'
  },
  {
    id: 'lesson-20',
    number: 'Bài 20',
    title: 'Bài 20',
    japaneseTitle: '第二十課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson20Vocabulary.length,
    estimatedTime: 15,
    icon: '📝'
  },
  {
    id: 'lesson-21',
    number: 'Bài 21',
    title: 'Bài 21',
    japaneseTitle: '第二十一課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson21Vocabulary.length,
    estimatedTime: 15,
    icon: '📘'
  },
  {
    id: 'lesson-22',
    number: 'Bài 22',
    title: 'Bài 22',
    japaneseTitle: '第二十二課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson22Vocabulary.length,
    estimatedTime: 15,
    icon: '📙'
  },
  {
    id: 'lesson-23',
    number: 'Bài 23',
    title: 'Bài 23',
    japaneseTitle: '第二十三課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson23Vocabulary.length,
    estimatedTime: 15,
    icon: '📗'
  },
  {
    id: 'lesson-24',
    number: 'Bài 24',
    title: 'Bài 24',
    japaneseTitle: '第二十四課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson24Vocabulary.length,
    estimatedTime: 15,
    icon: '📓'
  },
  {
    id: 'lesson-25',
    number: 'Bài 25',
    title: 'Bài 25',
    japaneseTitle: '第二十五課',
    description: 'Từ vựng cơ bản N5',
    progress: 0,
    wordCount: lesson25Vocabulary.length,
    estimatedTime: 15,
    icon: '📔'
  }
];

export default function VocabularyPage() {
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [currentMode, setCurrentMode] = useState<'vocabulary' | 'flashcard' | 'memory-training'>('vocabulary');
  
  // Quiz state mới - Đơn giản và chính xác
  const [quizState, setQuizState] = useState({
    isActive: false,
    currentQuestion: 0,
    questions: [] as Array<{
      word: any,
      options: string[],
      correctAnswer: string,
      correctIndex: number
    }>,
    userAnswer: null as string | null,
    score: { correct: 0, total: 0 }
  });

  // Lấy từ vựng theo bài học được chọn
      const getCurrentLessonVocabulary = () => {
    if (!selectedLesson) return lesson1Vocabulary;
    
    const lessonNumber = selectedLesson.number;
    switch (lessonNumber) {
      case 'Bài 1':
          return lesson1Vocabulary;
      case 'Bài 2':
          return lesson2Vocabulary;
      case 'Bài 3':
          return lesson3Vocabulary;
      case 'Bài 4':
          return lesson4Vocabulary;
      case 'Bài 5':
          return lesson5Vocabulary;
      case 'Bài 6':
          return lesson6Vocabulary;
      case 'Bài 7':
          return lesson7Vocabulary;
      case 'Bài 8':
          return lesson8Vocabulary;
      case 'Bài 9':
          return lesson9Vocabulary;
      case 'Bài 10':
          return lesson10Vocabulary;
      case 'Bài 11':
          return lesson11Vocabulary;
      case 'Bài 12':
          return lesson12Vocabulary;
      case 'Bài 13':
          return lesson13Vocabulary;
      case 'Bài 14':
          return lesson14Vocabulary;
      case 'Bài 15':
          return lesson15Vocabulary;
      case 'Bài 16':
          return lesson16Vocabulary;
      case 'Bài 17':
          return lesson17Vocabulary;
      case 'Bài 18':
          return lesson18Vocabulary;
      case 'Bài 19':
          return lesson19Vocabulary;
      case 'Bài 20':
          return lesson20Vocabulary;
      case 'Bài 21':
          return lesson21Vocabulary;
      case 'Bài 22':
          return lesson22Vocabulary;
      case 'Bài 23':
          return lesson23Vocabulary;
      case 'Bài 24':
          return lesson24Vocabulary;
      case 'Bài 25':
          return lesson25Vocabulary;
        default:
          return lesson1Vocabulary; // Mặc định là Bài 1
      }
    };

  // Chia từ vựng thành 3 cấp độ - Giới hạn số từ cho Quiz và Memory Game
  const getWordsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    const currentVocabulary = getCurrentLessonVocabulary();
    const totalWords = currentVocabulary.length;
    
    // Giới hạn số từ cho Quiz và Memory Game (chỉ dùng từ vựng chính)
    let maxWordsForGame = totalWords;
    if (totalWords > 50) {
      maxWordsForGame = 50; // Giới hạn 50 từ cho các bài có nhiều từ vựng
    } else if (totalWords > 40) {
      maxWordsForGame = 40; // Giới hạn 40 từ cho các bài có trung bình
    }
    // Các bài có ít từ (≤40) giữ nguyên
    
    const limitedVocabulary = currentVocabulary.slice(0, maxWordsForGame);
    const limitedTotalWords = limitedVocabulary.length;
    
    switch (difficulty) {
      case 'easy':
        return limitedVocabulary.slice(0, Math.floor(limitedTotalWords / 3)); // 1/3 từ đầu
      case 'medium':
        return limitedVocabulary.slice(Math.floor(limitedTotalWords / 3), Math.floor(limitedTotalWords * 2 / 3)); // 1/3 từ giữa
      case 'hard':
        return limitedVocabulary.slice(Math.floor(limitedTotalWords * 2 / 3)); // 1/3 từ cuối
      default:
        return [];
    }
  };

  const getDifficultyProgress = (difficulty: 'easy' | 'medium' | 'hard') => {
    // Kiểm tra điều kiện mở khóa dựa trên kết quả quiz
    const easyQuizResults = localStorage.getItem('easy-quiz-results');
    const mediumQuizResults = localStorage.getItem('medium-quiz-results');
    
    switch (difficulty) {
      case 'easy':
        return { completed: 30, total: 30, unlocked: true };
      case 'medium':
        // Mở khóa nếu đúng ≥20 câu hoặc ≥75% ở cấp độ Dễ
        if (easyQuizResults) {
          const results = JSON.parse(easyQuizResults);
          const isUnlocked = results.correct >= 20 || (results.correct / results.total) >= 0.75;
          return { 
            completed: isUnlocked ? (mediumQuizResults ? JSON.parse(mediumQuizResults).correct : 0) : 0, 
            total: 31, 
            unlocked: isUnlocked 
          };
        }
        return { completed: 0, total: 31, unlocked: false };
      case 'hard':
        // Mở khóa nếu đúng ≥20 câu hoặc ≥75% ở cấp độ Trung bình
        if (mediumQuizResults) {
          const results = JSON.parse(mediumQuizResults);
          const isUnlocked = results.correct >= 20 || (results.correct / results.total) >= 0.75;
          return { 
            completed: isUnlocked ? (localStorage.getItem('hard-quiz-results') ? JSON.parse(localStorage.getItem('hard-quiz-results')!).correct : 0) : 0, 
            total: 30, 
            unlocked: isUnlocked 
          };
        }
        return { completed: 0, total: 30, unlocked: false };
      default:
        return { completed: 0, total: 0, unlocked: false };
    }
  };

  // Hàm reset quiz - Quay về chọn cấp độ
  const resetQuiz = () => {
    setQuizState({
      isActive: false,
      currentQuestion: 0,
      questions: [],
      userAnswer: null,
      score: { correct: 0, total: 0 }
    });
  };

  const getSelectedLessonData = () => {
    if (!selectedLesson) return null;
    return lessons.find(lesson => lesson.id === selectedLesson);
  };

  // Tạo câu hỏi quiz mới - Debug hoàn chỉnh
  const createQuiz = () => {
    const vocabulary = getCurrentLessonVocabulary();
    console.log('=== DEBUG: Creating quiz ===');
    console.log('Vocabulary length:', vocabulary.length);
    console.log('First few words:', vocabulary.slice(0, 3));
    
    if (vocabulary.length === 0) {
      console.log('ERROR: No vocabulary found, cannot create quiz');
      return;
    }

    const questions = vocabulary.map((word, index) => {
      // Tạo 4 đáp án: 1 đúng + 3 sai
      const correctAnswer = word.meaning;
      
      // Lấy 3 đáp án sai từ các từ khác
      let wrongAnswers = vocabulary
        .filter(v => v.meaning !== correctAnswer)
        .map(v => v.meaning);
      
      // Nếu không đủ 3 đáp án sai, thêm đáp án mặc định
      if (wrongAnswers.length < 3) {
        const defaults = ['Không có', 'Không xác định', 'Không rõ'];
        wrongAnswers = [...wrongAnswers, ...defaults];
      }
      
      // Lấy 3 đáp án sai ngẫu nhiên
      wrongAnswers = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 3);
      
      // Tạo 4 đáp án và xáo trộn vị trí
      const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
      const correctIndex = options.indexOf(correctAnswer);
      
      console.log(`=== Question ${index + 1} ===`);
      console.log('Word:', word.hiragana, word.kanji || '');
      console.log('Correct Answer:', correctAnswer);
      console.log('Wrong Answers:', wrongAnswers);
      console.log('Final Options:', options);
      console.log('Correct Index:', correctIndex);
      console.log('Verification:', options[correctIndex] === correctAnswer ? '✅ MATCH' : '❌ MISMATCH');
      
      return {
        word: word,
        options: options,
        correctAnswer: correctAnswer,
        correctIndex: correctIndex
      };
    });

    console.log('=== Quiz Summary ===');
    console.log('Total questions created:', questions.length);
    console.log('Questions array:', questions);
    
    setQuizState({
      isActive: true,
      currentQuestion: 0,
      questions: questions,
      userAnswer: null,
      score: { correct: 0, total: 0 }
    });
    
    console.log('=== Quiz State Set ===');
    console.log('Quiz state after creation:', {
      isActive: true,
      currentQuestion: 0,
      questionsLength: questions.length,
      firstQuestion: questions[0]
    });
  };

  // Xử lý khi chọn đáp án - Debug hoàn chỉnh
  const handleQuizAnswer = (selectedAnswer: string) => {
    if (quizState.userAnswer !== null) return; // Đã trả lời rồi

    const currentQ = quizState.questions[quizState.currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    
    console.log('=== DEBUG: Answer Selected ===');
    console.log('Current Question Index:', quizState.currentQuestion);
    console.log('Current Word:', currentQ.word.hiragana, currentQ.word.kanji || '');
    console.log('Selected Answer:', selectedAnswer);
    console.log('Correct Answer:', currentQ.correctAnswer);
    console.log('All Options:', currentQ.options);
    console.log('Is Correct:', isCorrect);
    console.log('Verification:', selectedAnswer === currentQ.correctAnswer ? '✅ CORRECT' : '❌ WRONG');

    setQuizState(prev => ({
      ...prev,
      userAnswer: selectedAnswer,
      score: {
        correct: prev.score.correct + (isCorrect ? 1 : 0),
        total: prev.score.total + 1
      }
    }));

    // Chuyển câu hỏi tiếp theo sau 1 giây (nhanh hơn)
    setTimeout(() => {
      if (quizState.currentQuestion < quizState.questions.length - 1) {
        console.log('=== Moving to Next Question ===');
        const nextIndex = quizState.currentQuestion + 1;
        console.log('Next Question Index:', nextIndex);
        console.log('Next Word:', quizState.questions[nextIndex].word.hiragana);
        console.log('Next Options:', quizState.questions[nextIndex].options);
        console.log('Next Correct Answer:', quizState.questions[nextIndex].correctAnswer);
        
        setQuizState(prev => ({
          ...prev,
          currentQuestion: nextIndex,
          userAnswer: null
        }));
      } else {
        console.log('=== Quiz Completed ===');
        // Hoàn thành quiz
        setQuizState(prev => ({
          ...prev,
          isActive: false
        }));
      }
    }, 1000); // Giảm từ 2000ms xuống 1000ms
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-2">
        {/* Lessons Grid - Hiển thị tất cả bài học */}
        {!selectedLesson && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="p-3 text-center">
                  <div className="text-xl font-bold text-blue-600 mb-2">{lesson.japaneseTitle}</div>
                  
                  {lesson.title && (
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{lesson.title}</h3>
                  )}
                  

                  
                  <button 
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
                    onClick={() => {
                      console.log('Clicked lesson:', lesson);
                      setSelectedLesson(lesson); // Set toàn bộ lesson object
                      // Reset về mode vocabulary khi chọn bài học mới
                      setCurrentMode('vocabulary');
                      resetQuiz();
                    }}
                  >
                    Bắt đầu học
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lesson Detail */}
        {selectedLesson && (
          <div className="bg-white rounded-lg shadow-lg">
            {/* Header với nút quay lại và mode selection - Layout cải thiện */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 px-6 pt-6 relative">
              {/* Nút quay lại */}
              <button 
                className="absolute -left-6 sm:-left-3 md:left-2 lg:left-6 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-700 hover:text-gray-800 transition-all duration-200 hover:scale-110"
                onClick={() => {
                  setSelectedLesson(null);
                  // Reset tất cả state khi quay lại
                  setCurrentMode('vocabulary');
                  setQuizState({
                    isActive: false,
                    currentQuestion: 0,
                    questions: [],
                    userAnswer: null,
                    score: { correct: 0, total: 0 }
                  });
                }}
              >
                <span className="text-xs sm:text-sm md:text-lg lg:text-2xl font-bold">←</span>
              </button>

              {/* Learning Modes Selection - Căn giữa */}
              <div className="flex gap-3 sm:gap-4 mx-auto">
                <div 
                  className={`bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-105 min-w-[100px] ${
                    currentMode === 'vocabulary' ? 'ring-2 ring-white ring-opacity-50' : ''
                  }`}
                  onClick={() => {
                    console.log('Clicked vocabulary mode');
                    setCurrentMode('vocabulary');
                  }}
                >
                  <h3 className="text-lg font-semibold text-white font-inter whitespace-nowrap">📚 Từ vựng</h3>
                </div>

                <div 
                  className={`bg-gradient-to-br from-green-500 to-teal-600 rounded-xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-105 min-w-[100px] ${
                    currentMode === 'flashcard' ? 'ring-2 ring-white ring-opacity-50' : ''
                  }`}
                  onClick={() => {
                    console.log('Clicked quiz mode');
                    setCurrentMode('flashcard');
                  }}
                >
                  <h3 className="text-lg font-semibold text-white font-inter whitespace-nowrap">🎯 Quiz</h3>
                </div>
              </div>
            </div>

            {/* Mode Content */}
            {currentMode === 'vocabulary' && (
              <div className="px-6 pb-6">
                {/* Sử dụng GroupedVocabularyTable để hiển thị đúng theo section */}
                <GroupedVocabularyTable 
                  words={getCurrentLessonVocabulary()} 
                  lessonTitle={getSelectedLessonData()?.title || 'Bài 1'} 
                />
              </div>
            )}

            {/* Quiz Mode - Logic mới hoàn toàn */}
            {currentMode === 'flashcard' && (
              <div>
                {/* Quiz tự động bắt đầu ngay */}
                {(() => {
                  // Tự động bắt đầu quiz khi vào tab
                  if (!quizState.isActive && quizState.questions.length === 0) {
                    console.log('Auto-starting quiz...');
                    createQuiz();
                  }
                  return null;
                })()}

                {/* Quiz Content - Hiển thị ngay */}
                {quizState.isActive && quizState.questions.length > 0 && quizState.currentQuestion < quizState.questions.length && (
                  <div className="animate-fadeIn">
                    {(() => {
                      const currentQ = quizState.questions[quizState.currentQuestion];
                      console.log('=== DEBUG: Rendering Quiz ===');
                      console.log('Current Question Index:', quizState.currentQuestion);
                      console.log('Current Word:', currentQ.word.hiragana, currentQ.word.kanji || '');
                      console.log('Current Options:', currentQ.options);
                      console.log('Current Correct Answer:', currentQ.correctAnswer);
                      console.log('Verification - Options contains correct answer:', currentQ.options.includes(currentQ.correctAnswer));
                      return null;
                    })()}
                    
                          <div className="text-center">
                      <div className="mb-6 animate-slideInDown">
                        <div className="text-4xl font-bold text-gray-800 mb-4">
                          {quizState.questions[quizState.currentQuestion].word.hiragana}
                          </div>
                        {quizState.questions[quizState.currentQuestion].word.kanji && (
                          <div className="text-2xl text-gray-600 mb-4">
                            {quizState.questions[quizState.currentQuestion].word.kanji}
                          </div>
                        )}
                        </div>
                        
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto animate-slideInUp">
                        {quizState.questions[quizState.currentQuestion].options.map((option, index) => (
                            <button
                              key={index}
                            onClick={() => handleQuizAnswer(option)}
                            disabled={quizState.userAnswer !== null}
                            className={`p-4 text-left rounded-xl border-2 transition-all duration-200 transform hover:scale-105 hover:shadow-xl ${
                              quizState.userAnswer !== null
                                ? option === quizState.questions[quizState.currentQuestion].correctAnswer
                                  ? 'border-green-500 bg-green-100 shadow-xl scale-105 ring-2 ring-green-200' // Đáp án đúng luôn xanh
                                  : option === quizState.userAnswer
                                    ? 'border-red-500 bg-red-100 shadow-xl scale-105 ring-2 ring-red-200' // Đáp án sai được chọn
                                    : 'border-gray-300 bg-gray-100' // Các đáp án khác
                                : 'border-gray-300 bg-gray-100 hover:border-blue-500 hover:bg-blue-100 hover:shadow-2xl hover:ring-2 hover:ring-blue-200'
                            }`}
                          >
                            <div className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center text-xs font-bold ${
                                quizState.userAnswer !== null
                                  ? option === quizState.questions[quizState.currentQuestion].correctAnswer
                                    ? 'border-green-600 bg-green-600 text-white' // Đáp án đúng luôn xanh
                                    : option === quizState.userAnswer
                                      ? 'border-red-600 bg-red-600 text-white' // Đáp án sai được chọn
                                      : 'border-gray-500 bg-gray-500 text-white' // Các đáp án khác
                                  : 'border-gray-500 bg-gray-500 text-white'
                                    }`}>
                                      {String.fromCharCode(65 + index)}
                                  </div>
                              <span className="font-semibold text-gray-900">{option}</span>
                            </div>
                          </button>
                        ))}
                                </div>

                      {quizState.userAnswer !== null && (
                        <div className={`mt-6 p-4 rounded-lg animate-bounceIn ${
                          quizState.userAnswer === quizState.questions[quizState.currentQuestion].correctAnswer
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {quizState.userAnswer === quizState.questions[quizState.currentQuestion].correctAnswer
                            ? '✅ Đúng rồi!'
                            : `❌ Sai rồi! Đáp án đúng là: ${quizState.questions[quizState.currentQuestion].correctAnswer}`
                          }
                                </div>
                      )}
                              </div>
                  </div>
                )}

                {/* Loading state khi đang tạo quiz */}
                {currentMode === 'flashcard' && !quizState.isActive && quizState.questions.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-lg text-gray-600">Đang tạo quiz...</div>
                      </div>
                    )}

                {/* Quiz Results - Hoàn thành */}
                {!quizState.isActive && quizState.score.total > 0 && (
                      <div className="text-center mt-2">
                        <h4 className="text-lg font-bold text-green-800 mb-2">🎉 Hoàn thành!</h4>
                        <div className="text-sm text-gray-700 mb-2">
                      {quizState.score.correct}/{quizState.score.total} câu đúng
                        </div>
                        <button
                          onClick={resetQuiz}
                          className="px-4 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                        >
                          Làm lại
                        </button>
                  </div>
                )}
              </div>
            )}

            {currentMode === 'memory-training' && (
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-200">
                  <h3 className="text-xl font-bold text-purple-800">🧠 Luyện ghi nhớ - {getSelectedLessonData()?.title}</h3>
                  <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                    Memory Game
                  </div>
                </div>
                
                {/* Memory Game Introduction */}
                <div className="text-center py-8">
                  <div className="text-6xl mb-4 animate-bounce">🎮</div>
                  <h4 className="text-3xl font-bold text-purple-800 mb-4">Trò chơi ghi nhớ từ vựng</h4>
                  <p className="text-lg text-purple-600 mb-6 max-w-2xl mx-auto">
                    Ghép đúng từ tiếng Nhật với nghĩa tiếng Việt để luyện ghi nhớ hiệu quả! 
                    Trò chơi này giúp bạn nhớ từ vựng lâu hơn và học tập thú vị hơn.
                  </p>
                  
                  {/* Game Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200 transform hover:scale-105 transition-all duration-300">
                      <div className="text-4xl mb-3"></div>
                      <h5 className="text-xl font-bold text-purple-800 mb-2">Ghép từ chính xác</h5>
                      <p className="text-purple-600">Click để ghép đúng cặp từ tiếng Nhật - tiếng Việt</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200 transform hover:scale-105 transition-all duration-300">
                      <div className="text-4xl mb-3">⚡</div>
                      <h5 className="text-xl font-bold text-purple-800 mb-2">Tốc độ nhanh</h5>
                      <p className="text-purple-600">Hoàn thành càng nhanh càng đạt điểm cao</p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200 transform hover:scale-105 transition-all duration-300">
                      <div className="text-4xl mb-3">🏆</div>
                      <h5 className="text-xl font-bold text-purple-800 mb-2">Thành tích cao</h5>
                      <p className="text-purple-600">Đạt điểm cao và mở khóa thành tích mới</p>
                    </div>
                  </div>
                  
                  {/* Game Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg border-2 border-purple-200 p-4">
                                              <h5 className="font-bold text-purple-800 mb-2">Chế độ chơi</h5>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="radio" name="gameMode" value="easy" defaultChecked className="mr-2" />
                          <span>Dễ (10 từ)</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="gameMode" value="medium" className="mr-2" />
                          <span>Trung bình (20 từ)</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="gameMode" value="hard" className="mr-2" />
                          <span>Khó (30 từ)</span>
                        </label>
                      </div>
                      <p className="text-xs text-purple-500 mt-2">
                        💡 Sẽ sử dụng {getCurrentLessonVocabulary().length > 50 ? '50 từ đầu' : getCurrentLessonVocabulary().length > 40 ? '40 từ đầu' : 'tất cả'} từ vựng chính
                      </p>
                    </div>
                    
                    <div className="bg-white rounded-lg border-2 border-purple-200 p-4">
                      <h5 className="font-bold text-purple-800 mb-2">⚙️ Tùy chọn</h5>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span>Hiệu ứng âm thanh</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span>Gợi ý khi cần</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Chế độ thời gian</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Start Game Button */}
                  <button
                    onClick={() => {
                      const selectedMode = document.querySelector('input[name="gameMode"]:checked') as HTMLInputElement;
                      const gameMode = selectedMode?.value || 'easy';
                      const lessonWords = getCurrentLessonVocabulary();
                      
                      // Giới hạn số từ cho Memory Game (cùng logic với Quiz)
                      let maxWordsForGame = lessonWords.length;
                      if (lessonWords.length > 50) {
                        maxWordsForGame = 50; // Giới hạn 50 từ cho các bài có nhiều từ vựng
                      } else if (lessonWords.length > 40) {
                        maxWordsForGame = 40; // Giới hạn 40 từ cho các bài có trung bình
                      }
                      // Các bài có ít từ (≤40) giữ nguyên
                      
                      const limitedWords = lessonWords.slice(0, maxWordsForGame);
                      const wordCount = gameMode === 'easy' ? 10 : gameMode === 'medium' ? 20 : 30;
                      const selectedWords = limitedWords.slice(0, Math.min(wordCount, limitedWords.length));
                      
                      // Tạo URL với dữ liệu từ vựng
                      const gameData = encodeURIComponent(JSON.stringify({
                        lesson: selectedLesson,
                        mode: gameMode,
                        words: selectedWords,
                        totalWords: limitedWords.length
                      }));
                      
                      window.open(`/memory-game?data=${gameData}`, '_blank');
                    }}
                    className="px-10 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white rounded-2xl font-bold text-xl hover:shadow-2xl transition-all hover:scale-110 active:scale-95 transform duration-300"
                  >
                    🚀 Bắt đầu chơi ngay!
                  </button>
                  
                  <p className="text-purple-500 mt-4 text-sm">
                    💡 Trò chơi sẽ mở trong tab mới để bạn có thể chơi và học cùng lúc
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
