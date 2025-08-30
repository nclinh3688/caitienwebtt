'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  BookOpen,
  Clock,
  Star,
  BarChart3,
  Play,
  CheckCircle,
  XCircle,
  TrendingUp,
  Award,
  Timer,
  Zap
} from 'lucide-react';

interface PracticeTest {
  id: string;
  title: string;
  description: string;
  type: 'vocabulary' | 'grammar' | 'listening' | 'reading' | 'mixed';
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  questions: number;
  timeLimit: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  score?: number;
  lastAttempt?: string;
}

interface PracticeSession {
  id: string;
  title: string;
  type: string;
  progress: number;
  totalQuestions: number;
  currentQuestion: number;
  timeRemaining: number;
  score: number;
}

export default function PracticePage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSession, setActiveSession] = useState<PracticeSession | null>(null);

  const [practiceTests] = useState<PracticeTest[]>([
    {
      id: '1',
      title: 'Từ vựng cơ bản N5',
      description: 'Kiểm tra 50 từ vựng cơ bản trình độ N5',
      type: 'vocabulary',
      level: 'N5',
      questions: 50,
      timeLimit: 30,
      difficulty: 'easy',
      completed: true,
      score: 85,
      lastAttempt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Ngữ pháp N5 - Bài 1',
      description: 'Ôn tập ngữ pháp cơ bản với 30 câu hỏi',
      type: 'grammar',
      level: 'N5',
      questions: 30,
      timeLimit: 25,
      difficulty: 'medium',
      completed: false
    },
    {
      id: '3',
      title: 'Luyện nghe N5',
      description: 'Luyện kỹ năng nghe với 20 câu hỏi',
      type: 'listening',
      level: 'N5',
      questions: 20,
      timeLimit: 20,
      difficulty: 'medium',
      completed: true,
      score: 72,
      lastAttempt: '2024-01-18'
    },
    {
      id: '4',
      title: 'Đọc hiểu N5',
      description: 'Bài đọc hiểu với 15 câu hỏi',
      type: 'reading',
      level: 'N5',
      questions: 15,
      timeLimit: 20,
      difficulty: 'hard',
      completed: false
    },
    {
      id: '5',
      title: 'Tổng hợp N5',
      description: 'Bài test tổng hợp tất cả kỹ năng',
      type: 'mixed',
      level: 'N5',
      questions: 100,
      timeLimit: 90,
      difficulty: 'hard',
      completed: false
    }
  ]);

  const types = [
    { key: 'all', label: 'Tất cả', icon: <Target className="w-4 h-4" /> },
    { key: 'vocabulary', label: 'Từ vựng', icon: <BookOpen className="w-4 h-4" /> },
    { key: 'grammar', label: 'Ngữ pháp', icon: <BarChart3 className="w-4 h-4" /> },
    { key: 'listening', label: 'Luyện nghe', icon: <Clock className="w-4 h-4" /> },
    { key: 'reading', label: 'Đọc hiểu', icon: <Star className="w-4 h-4" /> },
    { key: 'mixed', label: 'Tổng hợp', icon: <Zap className="w-4 h-4" /> }
  ];

  const levels = [
    { key: 'all', label: 'Tất cả', color: 'from-gray-500 to-gray-600' },
    { key: 'N5', label: 'N5', color: 'from-green-500 to-green-600' },
    { key: 'N4', label: 'N4', color: 'from-blue-500 to-blue-600' },
    { key: 'N3', label: 'N3', color: 'from-yellow-500 to-yellow-600' },
    { key: 'N2', label: 'N2', color: 'from-orange-500 to-orange-600' },
    { key: 'N1', label: 'N1', color: 'from-red-500 to-red-600' }
  ];

  const filteredTests = practiceTests.filter(test => {
    if (selectedType !== 'all' && test.type !== selectedType) return false;
    if (selectedLevel !== 'all' && test.level !== selectedLevel) return false;
    if (searchQuery && !test.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vocabulary': return '📚';
      case 'grammar': return '📖';
      case 'listening': return '🎧';
      case 'reading': return '📰';
      case 'mixed': return '🎯';
      default: return '📝';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    const lvl = levels.find(l => l.key === level);
    return lvl ? lvl.color : 'from-gray-500 to-gray-600';
  };

  const startPractice = (test: PracticeTest) => {
    const session: PracticeSession = {
      id: test.id,
      title: test.title,
      type: test.type,
      progress: 0,
      totalQuestions: test.questions,
      currentQuestion: 1,
      timeRemaining: test.timeLimit * 60,
      score: 0
    };
    setActiveSession(session);
  };

  const stats = {
    totalTests: practiceTests.length,
    completedTests: practiceTests.filter(t => t.completed).length,
    averageScore: Math.round(practiceTests.filter(t => t.completed).reduce((sum, t) => sum + (t.score || 0), 0) / practiceTests.filter(t => t.completed).length),
    totalTime: practiceTests.filter(t => t.completed).reduce((sum, t) => sum + t.timeLimit, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Luyện thi 🎯
              </h1>
              <p className="text-lg text-gray-600">
                Hệ thống bài tập và kiểm tra toàn diện cho mọi trình độ
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Xem báo cáo</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Thành tích</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng bài test</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalTests}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã hoàn thành</p>
                <p className="text-2xl font-bold text-green-600">{stats.completedTests}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Điểm trung bình</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.averageScore}%</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng thời gian</p>
                <p className="text-2xl font-bold text-purple-600">{Math.round(stats.totalTime / 60)}h</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm bài test..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {/* Type Filter */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {types.map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setSelectedType(type.key)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      selectedType === type.key
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {type.icon}
                    <span className="hidden sm:inline">{type.label}</span>
                  </button>
                ))}
              </div>

              {/* Level Filter */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {levels.map((level) => (
                  <button
                    key={level.key}
                    onClick={() => setSelectedLevel(level.key)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      selectedLevel === level.key
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Practice Tests Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{getTypeIcon(test.type)}</div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                    {test.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">{test.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{test.description}</p>
                
                {/* Level Badge */}
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getLevelColor(test.level)}`}>
                  {test.level}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{test.questions}</div>
                  <div className="text-xs text-gray-500">Câu hỏi</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{test.timeLimit}</div>
                  <div className="text-xs text-gray-500">Phút</div>
                </div>
              </div>

              {/* Progress or Score */}
              {test.completed ? (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Điểm số</span>
                    <span>{test.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        (test.score || 0) >= 80 ? 'bg-green-500' :
                        (test.score || 0) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${test.score}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Lần cuối: {test.lastAttempt && new Date(test.lastAttempt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              ) : (
                <div className="mb-4 text-center">
                  <div className="text-sm text-gray-500">Chưa hoàn thành</div>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => startPractice(test)}
                className={`w-full py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                  test.completed
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {test.completed ? (
                  <>
                    <Play className="w-4 h-4" />
                    Làm lại
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Bắt đầu
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Active Session */}
        {activeSession && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bắt đầu luyện tập</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bài test:</span>
                  <span className="font-medium">{activeSession.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số câu hỏi:</span>
                  <span className="font-medium">{activeSession.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-medium">{Math.round(activeSession.timeRemaining / 60)} phút</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveSession(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Hủy
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                  Bắt đầu
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
