'use client';

import { useState, useEffect } from 'react';
import { FaClock, FaBook } from 'react-icons/fa';
import SimpleVocabularyTable from '@/components/learning/SimpleVocabularyTable';
import GroupedVocabularyTable from '@/components/learning/GroupedVocabularyTable';
import { lesson26Vocabulary } from '@/data/lesson26-vocabulary';
import { lesson27Vocabulary } from '@/data/lesson27-vocabulary';
import { lesson28Vocabulary } from '@/data/lesson28-vocabulary';
import { lesson29Vocabulary } from '@/data/lesson29-vocabulary';
import { lesson30Vocabulary } from '@/data/lesson30-vocabulary';
import { lesson31Vocabulary } from '@/data/lesson31-vocabulary';
import { lesson32Vocabulary } from '@/data/lesson32-vocabulary';
import { lesson33Vocabulary } from '@/data/lesson33-vocabulary';
import { lesson34Vocabulary } from '@/data/lesson34-vocabulary';
import { lesson35Vocabulary } from '@/data/lesson35-vocabulary';
import { lesson36Vocabulary } from '@/data/lesson36-vocabulary';
import { lesson37Vocabulary } from '@/data/lesson37-vocabulary';
import { lesson38Vocabulary } from '@/data/lesson38-vocabulary';
import { lesson39Vocabulary } from '@/data/lesson39-vocabulary';
import { lesson40Vocabulary } from '@/data/lesson40-vocabulary';
import { lesson41Vocabulary } from '@/data/lesson41-vocabulary';
import { lesson42Vocabulary } from '@/data/lesson42-vocabulary';
import { lesson43Vocabulary } from '@/data/lesson43-vocabulary';
import { lesson44Vocabulary } from '@/data/lesson44-vocabulary';
import { lesson45Vocabulary } from '@/data/lesson45-vocabulary';
import { lesson46Vocabulary } from '@/data/lesson46-vocabulary';
import { lesson47Vocabulary } from '@/data/lesson47-vocabulary';
import { lesson48Vocabulary } from '@/data/lesson48-vocabulary';
import { lesson49Vocabulary } from '@/data/lesson49-vocabulary';
import { lesson50Vocabulary } from '@/data/lesson50-vocabulary';
import { lesson1Vocabulary } from '@/data/lesson1-vocabulary';
import FlashcardComponent from '@/components/learning/FlashcardComponent';

// Danh sách 25 bài học N4 (Bài 26-50)
const lessons = [
  {
    id: 'lesson-1',
    number: 'Bài 26',
    title: 'Bài 26',
    japaneseTitle: '第二十六課',
    progress: 0,
    wordCount: lesson26Vocabulary.length,
    estimatedTime: 60,

  },
  {
    id: 'lesson-2',
    number: 'Bài 27',
    title: 'Bài 27',
    japaneseTitle: '第二十七課',
    progress: 0,
    wordCount: lesson27Vocabulary.length,
    estimatedTime: 60
  },
  {
    id: 'lesson-3',
    number: 'Bài 28',
    title: 'Bài 28',
    japaneseTitle: '第二十八課',
    progress: 0,
    wordCount: lesson28Vocabulary.length,
    estimatedTime: 60
  },
  {
    id: 'lesson-4',
    number: 'Bài 29',
    title: 'Bài 29',
    japaneseTitle: '第二十九課',
    progress: 0,
    wordCount: lesson29Vocabulary.length,
    estimatedTime: 60
  },
  {
    id: 'lesson-5',
    number: 'Bài 30',
    title: 'Bài 30',
    japaneseTitle: '第三十課',
    progress: 0,
    wordCount: lesson30Vocabulary.length,
    estimatedTime: 60
  },
  {
    id: 'lesson-6',
    number: 'Bài 31',
    title: 'Bài 31',
    japaneseTitle: '第三十一課',
    progress: 0,
    wordCount: lesson31Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-7',
    number: 'Bài 32',
    title: 'Bài 32',
    japaneseTitle: '第三十二課',
    progress: 0,
    wordCount: lesson32Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-8',
    number: 'Bài 33',
    title: 'Bài 33',
    japaneseTitle: '第三十三課',
    progress: 0,
    wordCount: lesson33Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-9',
    number: 'Bài 34',
    title: 'Bài 34',
    japaneseTitle: '第三十四課',
    progress: 0,
    wordCount: lesson34Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-10',
    number: 'Bài 35',
    title: 'Bài 35',
    japaneseTitle: '第三十五課',
    progress: 0,
    wordCount: lesson35Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-11',
    number: 'Bài 36',
    title: 'Bài 36',
    japaneseTitle: '第三十六課',
    progress: 0,
    wordCount: lesson36Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-12',
    number: 'Bài 37',
    title: 'Bài 37',
    japaneseTitle: '第三十七課',
    progress: 0,
    wordCount: lesson37Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-13',
    number: 'Bài 38',
    title: 'Bài 38',
    japaneseTitle: '第三十八課',
    progress: 0,
    wordCount: lesson38Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-14',
    number: 'Bài 39',
    title: 'Bài 39',
    japaneseTitle: '第三十九課',
    progress: 0,
    wordCount: lesson39Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-15',
    number: 'Bài 40',
    title: 'Bài 40',
    japaneseTitle: '第四十課',
    progress: 0,
    wordCount: lesson40Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-16',
    number: 'Bài 41',
    title: 'Bài 41',
    japaneseTitle: '第四十一課',
    progress: 0,
    wordCount: lesson41Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-17',
    number: 'Bài 42',
    title: 'Bài 42',
    japaneseTitle: '第四十二課',
    progress: 0,
    wordCount: lesson42Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-18',
    number: 'Bài 43',
    title: 'Bài 43',
    japaneseTitle: '第四十三課',
    progress: 0,
    wordCount: lesson43Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-19',
    number: 'Bài 44',
    title: 'Bài 44',
    japaneseTitle: '第四十四課',
    progress: 0,
    wordCount: lesson44Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-20',
    number: 'Bài 45',
    title: 'Bài 45',
    japaneseTitle: '第四十五課',
    progress: 0,
    wordCount: lesson45Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-21',
    number: 'Bài 46',
    title: 'Bài 46',
    japaneseTitle: '第四十六課',
    progress: 0,
    wordCount: lesson46Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-22',
    number: 'Bài 47',
    title: 'Bài 47',
    japaneseTitle: '第四十七課',
    progress: 0,
    wordCount: lesson47Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-23',
    number: 'Bài 48',
    title: 'Bài 48',
    japaneseTitle: '第四十八課',
    progress: 0,
    wordCount: lesson48Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-24',
    number: 'Bài 49',
    title: 'Bài 49',
    japaneseTitle: '第四十九課',
    progress: 0,
    wordCount: lesson49Vocabulary.length,
    estimatedTime: 60,
  },
  {
    id: 'lesson-25',
    number: 'Bài 50',
    title: 'Bài 50',
    japaneseTitle: '第五十課',
    progress: 0,
    wordCount: lesson50Vocabulary.length,
    estimatedTime: 60,
  }
];

export default function VocabularyPage() {
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [currentMode, setCurrentMode] = useState<'vocabulary' | 'flashcard' | 'quiz' | 'memory'>('vocabulary');
  
  // Quiz state mới - Đơn giản và chính xác
  const [quizState, setQuizState] = useState({
    isActive: false,
    currentQuestion: 0,
    questions: [] as Array<{
      word: any,
      options: string[],
      correctAnswer: string
    }>,
    userAnswer: null as string | null,
    score: { correct: 0, total: 0 }
  });

  const getCurrentLessonVocabulary = () => {
    if (!selectedLesson) return [];
    
    const lessonNumber = selectedLesson.number;
    switch (lessonNumber) {
      case 'Bài 26':
        return lesson26Vocabulary;
      case 'Bài 27':
        return lesson27Vocabulary;
      case 'Bài 28':
        return lesson28Vocabulary;
      case 'Bài 29':
        return lesson29Vocabulary;
      case 'Bài 30':
        return lesson30Vocabulary;
      case 'Bài 31':
        return lesson31Vocabulary;
      case 'Bài 32':
        return lesson32Vocabulary;
      case 'Bài 33':
        return lesson33Vocabulary;
      case 'Bài 34':
        return lesson34Vocabulary;
      case 'Bài 35':
        return lesson35Vocabulary;
      case 'Bài 36':
        return lesson36Vocabulary;
      case 'Bài 37':
        return lesson37Vocabulary;
      case 'Bài 38':
        return lesson38Vocabulary;
      case 'Bài 39':
        return lesson39Vocabulary;
      case 'Bài 40':
        return lesson40Vocabulary;
      case 'Bài 41':
        return lesson41Vocabulary;
      case 'Bài 42':
        return lesson42Vocabulary;
      case 'Bài 43':
        return lesson43Vocabulary;
      case 'Bài 44':
        return lesson44Vocabulary;
      case 'Bài 45':
        return lesson45Vocabulary;
      case 'Bài 46':
        return lesson46Vocabulary;
      case 'Bài 47':
        return lesson47Vocabulary;
      case 'Bài 48':
        return lesson48Vocabulary;
      case 'Bài 49':
        return lesson49Vocabulary;
      case 'Bài 50':
        return lesson50Vocabulary;
      default:
        return lesson26Vocabulary;
    }
  };

  const getSelectedLessonData = () => {
    if (!selectedLesson) return null;
    
    const lessonNumber = selectedLesson.number;
    const vocabulary = getCurrentLessonVocabulary();
    
    return {
      title: lessonNumber,
      japaneseTitle: selectedLesson.japaneseTitle,
      vocabulary: vocabulary,
      wordCount: vocabulary.length
    };
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

  // Reset quiz
  const resetQuiz = () => {
    setQuizState({
      isActive: false,
      currentQuestion: 0,
      questions: [],
      userAnswer: null,
      score: { correct: 0, total: 0 }
    });
  };

  const handleLessonClick = (lesson: any) => {
    setSelectedLesson(lesson);
    setCurrentMode('vocabulary');
    resetQuiz();
  };

  const filteredVocabulary = getCurrentLessonVocabulary();

  const handleFlashcardComplete = () => {
    setCurrentMode('quiz');
    resetQuiz();
  };

  const restartQuiz = () => {
    resetQuiz();
    setCurrentMode('quiz');
  };



  if (selectedLesson) {
    const lessonData = getSelectedLessonData();
    if (!lessonData) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-6 py-2">
          {/* Header với nút quay lại và mode selection - Layout cải thiện */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 relative">
            {/* Nút quay lại */}
            <button
              onClick={() => {
                setSelectedLesson(null);
                setCurrentMode('vocabulary');
                resetQuiz();
              }}
              className="absolute -left-6 sm:-left-3 md:left-0 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-700 hover:text-gray-800 transition-all duration-200 hover:scale-110"
            >
              <span className="text-xs sm:text-sm md:text-lg lg:text-2xl font-bold">←</span>
            </button>

            {/* Learning Modes Selection - Căn giữa */}
            <div className="flex gap-3 sm:gap-4 mx-auto">
              <div 
                className={`bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-105 min-w-[100px] ${
                  currentMode === 'vocabulary' ? 'ring-2 ring-white ring-opacity-50' : ''
                }`}
                onClick={() => setCurrentMode('vocabulary')}
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

          {currentMode === 'memory' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Luyện trí nhớ ({filteredVocabulary.length} từ)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVocabulary.map((word, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-lg font-medium text-gray-800 mb-2">
                      {word.hiragana}
                    </div>
                    {word.kanji && (
                      <div className="text-sm text-gray-600 mb-2">
                        {word.kanji}
                      </div>
                    )}
                    <div className="text-sm text-gray-500 mb-2">
                      
                    </div>
                    <div className="text-sm text-gray-700">
                      {word.meaning}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-2">
        {/* Lessons Grid - Hiển thị tất cả bài học */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => (
            <div key={lesson.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
              <div className="p-6">

                
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h3>
                  <p className="text-lg font-semibold text-gray-700">{lesson.japaneseTitle}</p>
                </div>

                
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaBook className="mr-2" />
                    {lesson.wordCount} từ
                  </div>
                  <div className="flex items-center">
                    <FaClock className="mr-2" />
                    {lesson.estimatedTime} phút
                  </div>
                </div>
                
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
      </div>
    </div>
  );
}
