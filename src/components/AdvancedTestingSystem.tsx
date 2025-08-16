'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  FaBolt,
  FaEye,
  FaEyeSlash,
  FaRedo,
  FaShare,
  FaDownload,
  FaMobile
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

// 🎯 ADAPTIVE TESTING ENGINE
export function AdaptiveTestingEngine() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    generateBaseQuestions();
  }, []);

  const generateBaseQuestions = () => {
    // This would fetch from database
    const baseQuestions = [
      { id: '1', text: 'Sample question 1', category: 'grammar', difficulty: 'medium' },
      { id: '2', text: 'Sample question 2', category: 'vocabulary', difficulty: 'easy' },
      { id: '3', text: 'Sample question 3', category: 'listening', difficulty: 'hard' }
    ];
    setQuestions(baseQuestions);
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const submitTest = () => {
    // Calculate score based on answers
    let correct = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === 'correct') {
        correct++;
      }
    });
    setScore((correct / questions.length) * 100);
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-8">
        <FaClipboardList className="text-4xl text-gray-400 mx-auto mb-4" />
        <p>Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Question {currentQuestion + 1} of {questions.length}</h3>
        <div className="flex items-center gap-2">
          <FaClock className="text-gray-500" />
          <span className="text-sm">{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>
      
      <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-full" />
      
      <div className="p-4 border rounded-lg">
        <p className="mb-4">{questions[currentQuestion]?.text}</p>
        <div className="space-y-2">
          {['A', 'B', 'C', 'D'].map((option) => (
            <Button
              key={option}
              variant={userAnswers[questions[currentQuestion]?.id] === option ? 'default' : 'outline'}
              onClick={() => handleAnswer(questions[currentQuestion]?.id, option)}
              className="w-full justify-start"
            >
              {option}. Sample answer {option}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        
        {currentQuestion === questions.length - 1 ? (
          <Button onClick={submitTest} className="bg-green-600 hover:bg-green-700">
            Submit Test
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={!userAnswers[questions[currentQuestion]?.id]}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

// 📊 DETAILED TEST ANALYTICS
export function TestAnalytics({ testResults }: { testResults: any }) {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    // Mock analytics data
    setAnalytics({
      accuracy: 85,
      speed: 78,
      consistency: 92,
      skills: {
        grammar: 80,
        vocabulary: 85,
        listening: 70,
        reading: 75
      }
    });
  }, []);

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <FaChartLine className="text-4xl text-gray-400 mx-auto mb-4" />
        <p>Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{analytics.accuracy}%</div>
          <div className="text-sm text-blue-600">Accuracy</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{analytics.speed}%</div>
          <div className="text-sm text-green-600">Speed</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-semibold">Skill Breakdown</h4>
        {Object.entries(analytics.skills).map(([skill, score]: [string, any]) => (
          <div key={skill} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="capitalize">{skill}</span>
              <span>{score}%</span>
            </div>
            <Progress value={score} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎮 INTERACTIVE QUESTION TYPES
export function InteractiveQuestionTypes() {
  const [selectedType, setSelectedType] = useState('multiple-choice');

  const questionTypes = [
    { id: 'multiple-choice', name: 'Multiple Choice', icon: FaCheckCircle, color: 'text-blue-500' },
    { id: 'fill-blank', name: 'Fill in the Blank', icon: FaPen, color: 'text-green-500' },
    { id: 'matching', name: 'Matching', icon: FaRandom, color: 'text-purple-500' },
    { id: 'audio', name: 'Audio Questions', icon: FaVolumeUp, color: 'text-orange-500' }
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Question Types</h4>
      <div className="grid grid-cols-2 gap-3">
        {questionTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div
              key={type.id}
              className={`p-3 border rounded-lg cursor-pointer transition-all ${
                selectedType === type.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="flex items-center gap-2">
                <Icon className={type.color} />
                <span className="text-sm font-medium">{type.name}</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-sm text-gray-600">
          Selected: <span className="font-medium">{questionTypes.find(t => t.id === selectedType)?.name}</span>
        </p>
      </div>
    </div>
  );
}

// 🏆 ACHIEVEMENT SYSTEM
export function TestAchievementSystem({ score, timeSpent, accuracy }: { score: number; timeSpent: number; accuracy: number; }) {
  const getAchievement = () => {
    if (score >= 90) return { name: 'Perfect Score', icon: '🏆', color: 'text-yellow-500' };
    if (score >= 80) return { name: 'Excellent', icon: '⭐', color: 'text-blue-500' };
    if (score >= 70) return { name: 'Good Job', icon: '👍', color: 'text-green-500' };
    return { name: 'Keep Trying', icon: '💪', color: 'text-gray-500' };
  };

  const achievement = getAchievement();

  return (
    <div className="text-center space-y-4">
      <div className="text-6xl">{achievement.icon}</div>
      <h3 className={`text-xl font-bold ${achievement.color}`}>{achievement.name}</h3>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="font-bold">{score}%</div>
          <div className="text-gray-600">Score</div>
        </div>
        <div>
          <div className="font-bold">{timeSpent}min</div>
          <div className="text-gray-600">Time</div>
        </div>
        <div>
          <div className="font-bold">{accuracy}%</div>
          <div className="text-gray-600">Accuracy</div>
        </div>
      </div>
    </div>
  );
}

// 📱 MOBILE-OPTIMIZED TEST INTERFACE
export function MobileTestInterface({ testData, onComplete }: { testData: any; onComplete: (results: any) => void; }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const submitTest = () => {
    onComplete({ answers, score: 85 });
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Question {currentQuestion + 1}</h3>
        <p className="text-sm text-gray-600">Tap to answer</p>
      </div>
      
      <div className="space-y-3">
        {['A', 'B', 'C', 'D'].map((option) => (
          <Button
            key={option}
            variant={answers[`q${currentQuestion}`] === option ? 'default' : 'outline'}
            onClick={() => handleAnswer(`q${currentQuestion}`, option)}
            className="w-full h-16 text-lg"
          >
            {option}. Sample answer
          </Button>
        ))}
      </div>
      
      <Button onClick={submitTest} className="w-full">
        Submit Answer
      </Button>
    </div>
  );
}

// 🔄 TEST RETRY SYSTEM
export function TestRetrySystem({ previousResults, onRetry }: { previousResults: any; onRetry: (testId: string) => void; }) {
  if (!previousResults || Object.keys(previousResults).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <FaRedo className="text-4xl mx-auto mb-4" />
        <p>No previous test results to retry</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Previous Results</h4>
      <div className="space-y-3">
        {Object.entries(previousResults).map(([testId, result]: [string, any]) => (
          <div key={testId} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium">{result.testName || `Test ${testId}`}</p>
              <p className="text-sm text-gray-600">Score: {result.score}%</p>
            </div>
            <Button size="sm" onClick={() => onRetry(testId)}>
              <FaRedo className="mr-2" />
              Retry
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🎯 MAIN COMPONENT EXPORT
export default function AdvancedTestingSystem() {
  const [activeTab, setActiveTab] = useState('adaptive');

  const tabs = [
    { id: 'adaptive', label: 'Adaptive Testing', icon: FaBrain },
    { id: 'analytics', label: 'Test Analytics', icon: FaChartLine },
    { id: 'interactive', label: 'Interactive Questions', icon: FaLightbulb },
    { id: 'achievements', label: 'Achievements', icon: FaTrophy },
    { id: 'mobile', label: 'Mobile Interface', icon: FaMobile },
    { id: 'retry', label: 'Retry System', icon: FaRedo }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'adaptive':
        return <AdaptiveTestingEngine />;
      case 'analytics':
        return <TestAnalytics testResults={[]} />;
      case 'interactive':
        return <InteractiveQuestionTypes />;
      case 'achievements':
        return <TestAchievementSystem score={85} timeSpent={45} accuracy={92} />;
      case 'mobile':
        return <MobileTestInterface testData={{}} onComplete={() => {}} />;
      case 'retry':
        return <TestRetrySystem previousResults={[]} onRetry={() => {}} />;
      default:
        return <AdaptiveTestingEngine />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaBrain className="text-blue-600" />
            Advanced Testing System
          </h1>
          <p className="text-gray-600 mt-1">
            Hệ thống testing nâng cao với AI và adaptive learning
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline">
            <FaDownload className="mr-2" />
            Export Results
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <FaRocket className="mr-2" />
            Start New Test
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="pt-6">
        {renderTabContent()}
      </div>
    </div>
  );
}
