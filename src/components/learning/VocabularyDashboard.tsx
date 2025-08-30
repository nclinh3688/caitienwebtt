'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Calendar, 
  Flame, 
  Star, 
  Play, 
  Volume2, 
  CheckCircle, 
  XCircle,
  ChevronRight,
  ChevronLeft,
  Settings,
  MessageCircle,
  BookOpen as Dictionary,
  Brain,
  Zap,
  Award,
  Clock,
  Users,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Bookmark,
  Share2,
  Download,
  QrCode,
  Bell,
  Heart,
  Sparkles
} from 'lucide-react';

export default function VocabularyDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  const learningProgress = {
    totalWords: 200,
    learnedWords: 75,
    todayGoal: 20,
    todayProgress: 15,
    streak: 7,
    level: 'N5',
    experience: 1250,
    nextLevelExp: 2000
  };

  const vocabularyWords = [
    {
      id: '1',
      japanese: 'こんにちは',
      romaji: 'Konnichiwa',
      vietnamese: 'Xin chào (buổi chiều)',
      difficulty: 'easy',
      category: 'Greetings',
      example: 'こんにちは、お元気ですか？',
      mastered: false
    },
    {
      id: '2',
      japanese: 'ありがとう',
      romaji: 'Arigatou',
      vietnamese: 'Cảm ơn',
      difficulty: 'easy',
      category: 'Politeness',
      example: 'ありがとうございます。',
      mastered: false
    },
    {
      id: '3',
      japanese: 'おはよう',
      romaji: 'Ohayou',
      vietnamese: 'Chào buổi sáng',
      difficulty: 'easy',
      category: 'Greetings',
      example: 'おはようございます。',
      mastered: false
    }
  ];

  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Học 10 từ đầu tiên',
      icon: '🎯',
      unlocked: true,
      progress: 10,
      maxProgress: 10
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Học 7 ngày liên tiếp',
      icon: '🔥',
      unlocked: true,
      progress: 7,
      maxProgress: 7
    },
    {
      id: '3',
      title: 'Vocabulary Master',
      description: 'Học 100 từ vựng',
      icon: '🏆',
      unlocked: false,
      progress: 75,
      maxProgress: 100
    }
  ];

  const handleWordMastered = (wordId: string) => {
    console.log('Word mastered:', wordId);
  };

  const handleQuizSubmit = () => {
    const currentWord = vocabularyWords[currentWordIndex];
    const isCorrect = quizAnswer.toLowerCase() === currentWord.vietnamese.toLowerCase();
    setQuizResult(isCorrect ? 'correct' : 'incorrect');
    
    setTimeout(() => {
      setQuizResult(null);
      setQuizAnswer('');
      if (isCorrect) {
        setCurrentWordIndex((prev) => (prev + 1) % vocabularyWords.length);
      }
    }, 2000);
  };

  const getProgressPercentage = () => {
    return (learningProgress.learnedWords / learningProgress.totalWords) * 100;
  };

  const getLevelProgress = () => {
    return (learningProgress.experience / learningProgress.nextLevelExp) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </motion.button>
              <h1 className="text-2xl font-bold text-gray-900">🎯 Vocabulary Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Settings size={16} />
                <span>Settings</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Learning Path */}
          <motion.aside
            className={`${sidebarCollapsed ? 'w-16' : 'w-80'} bg-white rounded-2xl shadow-lg border border-gray-200 p-4 transition-all duration-300`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {!sidebarCollapsed ? (
              <>
                {/* Learning Journey */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen size={20} className="text-blue-600 mr-2" />
                    Learning Journey
                  </h3>
                  
                  {/* Today's Goal */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Today's Goal</span>
                      <span className="text-sm font-bold text-blue-600">{learningProgress.todayProgress}/{learningProgress.todayGoal}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(learningProgress.todayProgress / learningProgress.todayGoal) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Streak */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">🔥 Streak</span>
                      <span className="text-2xl font-bold text-orange-600">{learningProgress.streak}d</span>
                    </div>
                  </div>

                  {/* Level Progress */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Level {learningProgress.level}</span>
                      <span className="text-sm font-bold text-green-600">{learningProgress.experience}/{learningProgress.nextLevelExp} XP</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${getLevelProgress()}%` }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Trophy size={20} className="text-yellow-600 mr-2" />
                    Achievements
                  </h3>
                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-3 rounded-lg border ${
                          achievement.unlocked 
                            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{achievement.icon}</span>
                          <div className="flex-1">
                            <h4 className={`text-sm font-medium ${
                              achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {achievement.title}
                            </h4>
                            <p className={`text-xs ${
                              achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              {achievement.description}
                            </p>
                          </div>
                          {achievement.unlocked ? (
                            <CheckCircle size={16} className="text-green-500" />
                          ) : (
                            <div className="text-xs text-gray-400">
                              {achievement.progress}/{achievement.maxProgress}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Study Calendar */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar size={20} className="text-purple-600 mr-2" />
                    Study Plan
                  </h3>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-2">📅</div>
                      <p className="text-sm text-gray-600">Plan your study sessions</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
                      >
                        View Calendar
                      </motion.button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Collapsed sidebar icons
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"
                >
                  <BookOpen size={20} className="text-blue-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center"
                >
                  <Flame size={20} className="text-orange-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center"
                >
                  <Trophy size={20} className="text-yellow-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center"
                >
                  <Calendar size={20} className="text-purple-600" />
                </motion.button>
              </div>
            )}
          </motion.aside>

          {/* Main Content - Current Focus */}
          <motion.main
            className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Progress Overview */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 Vocabulary Progress</h2>
                  <p className="text-gray-600">Master Japanese vocabulary step by step</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{getProgressPercentage().toFixed(1)}%</div>
                  <div className="text-sm text-gray-500">{learningProgress.learnedWords} / {learningProgress.totalWords} words</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-4 rounded-full relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                </motion.div>
              </div>
            </div>

            {/* Active Lesson */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Target size={20} className="text-green-600 mr-2" />
                Active Lesson: Basic Greetings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vocabularyWords.map((word, index) => (
                  <motion.div
                    key={word.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 transition-all duration-300 ${
                      word.mastered ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-gray-800 mb-2">{word.japanese}</div>
                      <div className="text-lg text-gray-600 mb-1">{word.romaji}</div>
                      <div className="text-sm text-gray-500">{word.vietnamese}</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Category: {word.category}</span>
                        <span className={`px-2 py-1 rounded-full ${
                          word.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          word.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {word.difficulty}
                        </span>
                      </div>
                      
                      <div className="text-xs text-gray-600 italic">"{word.example}"</div>
                      
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center"
                        >
                          <Volume2 size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleWordMastered(word.id)}
                          className={`flex-1 p-2 rounded-lg transition-colors flex items-center justify-center ${
                            word.mastered 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600'
                          }`}
                        >
                          {word.mastered ? <CheckCircle size={16} /> : <Star size={16} />}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interactive Quiz */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Brain size={20} className="text-purple-600 mr-2" />
                Practice Quiz
              </h3>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    What does "{vocabularyWords[currentWordIndex]?.japanese}" mean?
                  </div>
                  <div className="text-lg text-gray-600 mb-4">
                    {vocabularyWords[currentWordIndex]?.romaji}
                  </div>
                </div>
                
                <div className="max-w-md mx-auto space-y-4">
                  <input
                    type="text"
                    value={quizAnswer}
                    onChange={(e) => setQuizAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-center text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleQuizSubmit()}
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleQuizSubmit}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Submit Answer
                  </motion.button>
                  
                  <AnimatePresence>
                    {quizResult && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`p-4 rounded-lg text-center ${
                          quizResult === 'correct' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {quizResult === 'correct' ? (
                          <div className="flex items-center justify-center space-x-2">
                            <CheckCircle size={20} />
                            <span className="font-semibold">Correct! Well done!</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <XCircle size={20} />
                            <span className="font-semibold">Try again!</span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Study Analytics */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 size={20} className="text-indigo-600 mr-2" />
                Study Analytics
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600 mb-2">85</div>
                    <div className="text-sm text-gray-600 mb-2">Score</div>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div>Duration: 45min</div>
                      <div>Words: 15</div>
                      <div>Accuracy: 92%</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">78</div>
                    <div className="text-sm text-gray-600 mb-2">Score</div>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div>Duration: 30min</div>
                      <div>Words: 12</div>
                      <div>Accuracy: 88%</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">92</div>
                    <div className="text-sm text-gray-600 mb-2">Score</div>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div>Duration: 60min</div>
                      <div>Words: 20</div>
                      <div>Accuracy: 95%</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.main>

          {/* Right Panel - Quick Actions */}
          <motion.aside
            className="w-80 bg-white rounded-2xl shadow-lg border border-gray-200 p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* AI Assistant */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Brain size={20} className="text-purple-600 mr-2" />
                AI Assistant
              </h3>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAiChatOpen(!aiChatOpen)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <MessageCircle size={16} />
                  <span>Quick Chat</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles size={16} />
                  <span>AI Practice</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Dictionary size={16} />
                  <span>Dictionary</span>
                </motion.button>
              </div>
            </div>

            {/* Mobile App */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Download size={20} className="text-green-600 mr-2" />
                Mobile App
              </h3>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">📱</div>
                <p className="text-sm text-gray-600 mb-3">Study on the go with our mobile app</p>
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-black text-white p-2 rounded-lg text-sm hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>🍎</span>
                    <span>App Store</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-green-600 text-white p-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>🤖</span>
                    <span>Google Play</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Daily Goal */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target size={20} className="text-orange-600 mr-2" />
                Daily Goal
              </h3>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  {learningProgress.todayProgress}/{learningProgress.todayGoal}
                </div>
                <p className="text-sm text-gray-600 mb-3">words today</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <motion.div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(learningProgress.todayProgress / learningProgress.todayGoal) * 100}%` }}
                    transition={{ duration: 1, delay: 0.9 }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  {learningProgress.todayGoal - learningProgress.todayProgress} more to reach today's goal!
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp size={20} className="text-blue-600 mr-2" />
                Quick Stats
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-600">Total Study Time</span>
                  <span className="text-sm font-semibold text-blue-600">12h 30m</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-gray-600">Accuracy</span>
                  <span className="text-sm font-semibold text-green-600">89%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-gray-600">Streak</span>
                  <span className="text-sm font-semibold text-purple-600">7 days</span>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* Floating AI Chat */}
      <AnimatePresence>
        {aiChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">AI Assistant</h4>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setAiChatOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={20} />
                </motion.button>
              </div>
            </div>
            <div className="p-4">
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-600">Hello! I'm here to help you learn Japanese vocabulary. What would you like to practice today?</p>
              </div>
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-sm"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        >
          <Zap size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
}
