'use client';

import React, { useState, useEffect } from 'react';
import { SharedCard, ResponsiveGrid, cn, styles } from './SharedUtils';
import { ComponentLoader } from '../LazyComponents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaTimes,
  FaStar,
  FaBrain,
  FaRocket,
  FaBullseye,
  FaLightbulb,
  FaPlay,
  FaPause,
  FaFlag,
  FaTrophy,
  FaRandom,
  FaChartLine,
  FaBookOpen,
  FaHeadphones,
  FaPen,
  FaVolumeUp,
  FaGraduationCap,
  FaBolt
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

// 🎯 TEST SELECTION HUB
export function TestSelectionHub() {
  const testCategories = [
    {
      id: 'level',
      title: 'Level Assessment',
      description: 'Full JLPT-style tests by level',
      icon: FaGraduationCap,
      color: 'blue',
      tests: [
        { id: 'n5', title: 'JLPT N5', duration: 45, questions: 60, difficulty: 'Beginner' },
        { id: 'n4', title: 'JLPT N4', duration: 60, questions: 80, difficulty: 'Elementary' },
        { id: 'n3', title: 'JLPT N3', duration: 90, questions: 100, difficulty: 'Intermediate' }
      ]
    },
    {
      id: 'skill',
      title: 'Skill Focus',
      description: 'Target specific language skills',
      icon: FaBullseye,
      color: 'green',
      tests: [
        { id: 'vocabulary', title: 'Vocabulary', duration: 15, questions: 30, difficulty: 'All Levels' },
        { id: 'grammar', title: 'Grammar', duration: 20, questions: 25, difficulty: 'All Levels' },
        { id: 'listening', title: 'Listening', duration: 25, questions: 20, difficulty: 'All Levels' },
        { id: 'reading', title: 'Reading', duration: 30, questions: 15, difficulty: 'All Levels' }
      ]
    },
    {
      id: 'quick',
      title: 'Quick Practice',
      description: 'Short tests for daily practice',
      icon: FaBolt,
      color: 'orange',
      tests: [
        { id: 'daily', title: 'Daily Quiz', duration: 5, questions: 10, difficulty: 'Mixed' },
        { id: 'flashcards', title: 'Flashcard Review', duration: 10, questions: 20, difficulty: 'Adaptive' },
        { id: 'pronunciation', title: 'Pronunciation', duration: 8, questions: 15, difficulty: 'Speaking' }
      ]
    },
    {
      id: 'ai',
      title: 'AI-Generated',
      description: 'Personalized tests based on your progress',
      icon: HiSparkles,
      color: 'purple',
      tests: [
        { id: 'adaptive', title: 'Adaptive Practice', duration: 15, questions: 'Variable', difficulty: 'Personalized' },
        { id: 'weakness', title: 'Weakness Focus', duration: 20, questions: 'Variable', difficulty: 'Targeted' },
        { id: 'review', title: 'Review Mode', duration: 12, questions: 'Variable', difficulty: 'Spaced Repetition' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {testCategories.map((category) => (
        <TestCategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}

// 📝 TEST CATEGORY CARD
function TestCategoryCard({ category }: { category: any }) {
  const colorClasses = {
    blue: "from-blue-500 to-purple-500",
    green: "from-green-500 to-blue-500", 
    orange: "from-orange-500 to-red-500",
    purple: "from-purple-500 to-pink-500"
  };

  return (
    <SharedCard className="overflow-hidden">
      <CardHeader className={cn(
        "bg-gradient-to-r text-white",
        colorClasses[category.color as keyof typeof colorClasses]
      )}>
        <CardTitle className="flex items-center gap-3">
          <category.icon className="text-2xl" />
          <div>
            <h3 className="text-xl font-bold">{category.title}</h3>
            <p className="text-white/90 text-sm">{category.description}</p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <ResponsiveGrid cols={{ mobile: 1, tablet: 2, desktop: 3 }} gap="gap-4">
          {category.tests.map((test: any) => (
            <TestCard key={test.id} test={test} categoryColor={category.color} />
          ))}
        </ResponsiveGrid>
      </CardContent>
    </SharedCard>
  );
}

// 🧪 INDIVIDUAL TEST CARD
function TestCard({ test, categoryColor }: { test: any; categoryColor: string }) {
  const colorClasses = {
    blue: "border-blue-200 hover:border-blue-300 hover:bg-blue-50",
    green: "border-green-200 hover:border-green-300 hover:bg-green-50",
    orange: "border-orange-200 hover:border-orange-300 hover:bg-orange-50", 
    purple: "border-purple-200 hover:border-purple-300 hover:bg-purple-50"
  };

  return (
    <div className={cn(
      "p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:scale-105",
      colorClasses[categoryColor as keyof typeof colorClasses]
    )}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-900">{test.title}</h4>
        <Badge variant="outline">{test.difficulty}</Badge>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <FaClock />
          <span>{test.duration} minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClipboardList />
          <span>{test.questions} questions</span>
        </div>
      </div>
      
      <Button className="w-full" size="sm">
        <FaPlay className="mr-2" />
        Start Test
      </Button>
    </div>
  );
}

// 🎮 INTERACTIVE TEST INTERFACE
export function TestInterface({ 
  testData,
  onComplete,
  onExit 
}: {
  testData: any;
  onComplete?: (results: any) => void;
  onExit?: () => void;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(testData.duration * 60); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(timeRemaining => timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleSubmitTest();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining]);

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmitTest = () => {
    setIsActive(false);
    const results = calculateResults();
    setShowResults(true);
    onComplete?.(results);
  };

  const calculateResults = () => {
    const totalQuestions = testData.questions?.length || 0;
    const answeredQuestions = Object.keys(selectedAnswers).length;
    const correctAnswers = Object.entries(selectedAnswers).filter(
      ([index, answer]) => answer === testData.questions[parseInt(index)]?.correct
    ).length;
    
    return {
      score: Math.round((correctAnswers / totalQuestions) * 100),
      correct: correctAnswers,
      total: totalQuestions,
      timeUsed: (testData.duration * 60) - timeRemaining,
      answered: answeredQuestions
    };
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    return <TestResults results={calculateResults()} onRestart={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Test Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{testData.title}</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {testData.questions?.length || 0}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={cn(
                "px-3 py-2 rounded-lg font-mono font-bold",
                timeRemaining < 300 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
              )}>
                <FaClock className="inline mr-2" />
                {formatTime(timeRemaining)}
              </div>
              
              <Button variant="outline" onClick={onExit}>
                <FaTimes className="mr-2" />
                Exit
              </Button>
            </div>
          </div>
          
          <Progress 
            value={((currentQuestion + 1) / (testData.questions?.length || 1)) * 100} 
            className="mt-4"
          />
        </div>
      </div>

      {/* Question Area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {testData.questions && testData.questions[currentQuestion] && (
          <QuestionCard
            question={testData.questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            selectedAnswer={selectedAnswers[currentQuestion]}
            onAnswerSelect={(answer) => handleAnswerSelect(currentQuestion, answer)}
          />
        )}
        
        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            {!isActive && (
              <Button
                onClick={() => setIsActive(true)}
                className="bg-green-500 hover:bg-green-600"
              >
                <FaPlay className="mr-2" />
                Start Timer
              </Button>
            )}
            
            {isActive && (
              <Button
                onClick={() => setIsActive(false)}
                variant="outline"
              >
                <FaPause className="mr-2" />
                Pause
              </Button>
            )}
          </div>
          
          {currentQuestion < (testData.questions?.length || 1) - 1 ? (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={!selectedAnswers[currentQuestion]}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmitTest}
              className="bg-blue-500 hover:bg-blue-600"
              disabled={Object.keys(selectedAnswers).length === 0}
            >
              <FaFlag className="mr-2" />
              Submit Test
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ❓ QUESTION CARD COMPONENT
function QuestionCard({ 
  question, 
  questionNumber, 
  selectedAnswer, 
  onAnswerSelect 
}: {
  question: any;
  questionNumber: number;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
}) {
  return (
    <SharedCard className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Badge className="bg-blue-500">{questionNumber}</Badge>
          <Badge variant="outline">{question.type}</Badge>
          {question.difficulty && (
            <Badge variant="secondary">{question.difficulty}</Badge>
          )}
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {question.question}
        </h2>
        
        {question.audio && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
              <FaVolumeUp className="mr-2" />
              Play Audio
            </Button>
          </div>
        )}
        
        {question.image && (
          <div className="mb-4">
            <img 
              src={question.image} 
              alt="Question illustration" 
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {question.options?.map((option: string, index: number) => {
          const optionId = String.fromCharCode(65 + index); // A, B, C, D
          const isSelected = selectedAnswer === optionId;
          
          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(optionId)}
              className={cn(
                "w-full p-4 text-left rounded-lg border-2 transition-all duration-200",
                isSelected 
                  ? "border-blue-500 bg-blue-50 text-blue-900"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                  isSelected 
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                )}>
                  {optionId}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </SharedCard>
  );
}

// 🏆 TEST RESULTS COMPONENT
function TestResults({ 
  results, 
  onRestart 
}: { 
  results: any; 
  onRestart: () => void; 
}) {
  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-600', message: 'Excellent!' };
    if (score >= 80) return { grade: 'A', color: 'text-green-500', message: 'Great job!' };
    if (score >= 70) return { grade: 'B', color: 'text-blue-500', message: 'Good work!' };
    if (score >= 60) return { grade: 'C', color: 'text-yellow-500', message: 'Keep practicing!' };
    return { grade: 'D', color: 'text-red-500', message: 'Need more study!' };
  };

  const grade = getGrade(results.score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <SharedCard className="max-w-2xl w-full p-8 text-center">
        <div className="mb-8">
          <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Complete!</h1>
          <p className="text-gray-600">{grade.message}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className={cn("text-3xl font-bold mb-1", grade.color)}>
              {results.score}%
            </div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {results.correct}
            </div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {results.total}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {Math.floor(results.timeUsed / 60)}m
            </div>
            <div className="text-sm text-gray-600">Time Used</div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Button onClick={onRestart} className="bg-blue-500 hover:bg-blue-600">
            <FaRocket className="mr-2" />
            Try Again
          </Button>
          
          <Button variant="outline" onClick={() => window.location.href = '/test'}>
            <FaClipboardList className="mr-2" />
            More Tests
          </Button>
          
          <Button variant="outline" onClick={() => window.location.href = '/profile'}>
            <FaChartLine className="mr-2" />
            View Progress
          </Button>
        </div>
      </SharedCard>
    </div>
  );
}