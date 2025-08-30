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
  Sparkles,
  RotateCcw,
  SkipForward,
  SkipBack,
  Pause,
  BookmarkPlus,
  Mic,
  MicOff,
  VolumeX,
  Volume1,
  Volume2 as VolumeHigh,
  Eye,
  EyeOff,
  HelpCircle,
  Timer,
  Target as TargetIcon,
  Check,
  X
} from 'lucide-react';

export default function VocabularyLearningInterface() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentMode, setCurrentMode] = useState('flashcard');
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showRomanji, setShowRomanji] = useState(true);
  const [showTranslation, setShowTranslation] = useState(false);
  const [bookmarkedWords, setBookmarkedWords] = useState<string[]>([]);

  const vocabularyWords = [
    {
      id: '1',
      japanese: 'こんにちは',
      romaji: 'Konnichiwa',
      vietnamese: 'Xin chào (buổi chiều)',
      english: 'Hello (afternoon)',
      difficulty: 'easy',
      category: 'Greetings',
      example: 'こんにちは、お元気ですか？',
      exampleTranslation: 'Xin chào, bạn có khỏe không?'
    },
    {
      id: '2',
      japanese: 'ありがとう',
      romaji: 'Arigatou',
      vietnamese: 'Cảm ơn',
      english: 'Thank you',
      difficulty: 'easy',
      category: 'Politeness',
      example: 'ありがとうございます。',
      exampleTranslation: 'Cảm ơn bạn rất nhiều.'
    },
    {
      id: '3',
      japanese: 'おはよう',
      romaji: 'Ohayou',
      vietnamese: 'Chào buổi sáng',
      english: 'Good morning',
      difficulty: 'easy',
      category: 'Greetings',
      example: 'おはようございます。',
      exampleTranslation: 'Chào buổi sáng.'
    }
  ];

  const currentWord = vocabularyWords[currentWordIndex];

  const handleNextWord = () => {
    setShowAnswer(false);
    setUserAnswer('');
    setIsCorrect(null);
    setCurrentWordIndex((prev) => (prev + 1) % vocabularyWords.length);
  };

  const handlePreviousWord = () => {
    setShowAnswer(false);
    setUserAnswer('');
    setIsCorrect(null);
    setCurrentWordIndex((prev) => prev === 0 ? vocabularyWords.length - 1 : prev - 1);
  };

  const handleFlipCard = () => {
    setShowAnswer(!showAnswer);
  };

  const handlePracticeAnswer = () => {
    const correct = userAnswer.toLowerCase() === currentWord.vietnamese.toLowerCase();
    setIsCorrect(correct);
    
    setTimeout(() => {
      setIsCorrect(null);
      setUserAnswer('');
      handleNextWord();
    }, 2000);
  };

  const handleBookmark = () => {
    if (bookmarkedWords.includes(currentWord.id)) {
      setBookmarkedWords(prev => prev.filter(id => id !== currentWord.id));
    } else {
      setBookmarkedWords(prev => [...prev, currentWord.id]);
    }
  };

  const playAudio = () => {
    console.log('Playing audio for:', currentWord.japanese);
  };

  const getProgressPercentage = () => {
    return ((currentWordIndex + 1) / vocabularyWords.length) * 100;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <motion.header 
        className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50"
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
              >
                <ChevronLeft size={20} />
              </motion.button>
              <h1 className="text-2xl font-bold text-gray-900">📚 Vocabulary Learning</h1>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Settings size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <BarChart3 size={16} />
                <span>Progress</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Learning Modes */}
          <motion.aside
            className="w-80 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Learning Modes */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target size={20} className="text-blue-600 mr-2" />
                Learning Modes
              </h3>
              
              <div className="space-y-3">
                {['flashcard', 'typing', 'multiple-choice', 'audio'].map((mode) => (
                  <motion.button
                    key={mode}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentMode(mode)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      currentMode === mode 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        currentMode === mode ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <BookOpen size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 capitalize">{mode.replace('-', ' ')}</h4>
                        <p className="text-sm text-gray-600">Practice {mode} mode</p>
                      </div>
                      <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        easy
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Session Stats */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 size={20} className="text-green-600 mr-2" />
                Session Stats
              </h3>
              
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Words Learned</span>
                    <span className="text-lg font-bold text-green-600">0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Accuracy</span>
                    <span className="text-lg font-bold text-blue-600">0%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Zap size={20} className="text-purple-600 mr-2" />
                Quick Actions
              </h3>
              
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <RotateCcw size={16} />
                  <span>Review Mode</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Trophy size={16} />
                  <span>Take Quiz</span>
                </motion.button>
              </div>
            </div>
          </motion.aside>

          {/* Main Content - Learning Area */}
          <motion.main
            className="flex-1 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Progress: {currentWordIndex + 1} / {vocabularyWords.length}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {getProgressPercentage().toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                </motion.div>
              </div>
            </div>

            {/* Flashcard Area */}
            <div className="text-center mb-8">
              <motion.div
                key={currentWord.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                {/* Flashcard */}
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border-2 border-gray-200 shadow-xl max-w-2xl mx-auto">
                  {/* Word Display */}
                  <div className="mb-6">
                    <motion.div
                      className="text-6xl font-bold text-gray-800 mb-4"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {currentWord.japanese}
                    </motion.div>
                    
                    {showRomanji && (
                      <motion.div
                        className="text-2xl text-gray-600 mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        {currentWord.romaji}
                      </motion.div>
                    )}
                    
                    {showTranslation && (
                      <motion.div
                        className="text-xl text-gray-700 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                      >
                        {currentWord.vietnamese}
                      </motion.div>
                    )}
                  </div>

                  {/* Audio Controls */}
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={playAudio}
                      className="p-3 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      <Volume2 size={24} />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleBookmark}
                      className={`p-3 rounded-full transition-colors ${
                        bookmarkedWords.includes(currentWord.id)
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600'
                      }`}
                    >
                      <BookmarkPlus size={24} />
                    </motion.button>
                  </div>

                  {/* Example Sentence */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="text-lg text-gray-800 mb-2 font-medium">Example:</div>
                    <div className="text-xl text-gray-700 mb-2">{currentWord.example}</div>
                    <div className="text-sm text-gray-600 italic">{currentWord.exampleTranslation}</div>
                  </div>

                  {/* Difficulty & Category */}
                  <div className="flex items-center justify-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentWord.difficulty)}`}>
                      {currentWord.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {currentWord.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePreviousWord}
                className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                <SkipBack size={24} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFlipCard}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {showTranslation ? 'Hide Translation' : 'Show Translation'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextWord}
                className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                <SkipForward size={24} />
              </motion.button>
            </div>

            {/* Practice Mode */}
            {currentMode === 'typing' && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Practice Mode</h3>
                
                <div className="max-w-md mx-auto space-y-4">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type the Vietnamese translation..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-center text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handlePracticeAnswer()}
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePracticeAnswer}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Check Answer
                  </motion.button>
                  
                  <AnimatePresence>
                    {isCorrect !== null && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`p-4 rounded-lg text-center ${
                          isCorrect 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {isCorrect ? (
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
            )}
          </motion.main>

          {/* Right Panel - Tools & Help */}
          <motion.aside
            className="w-80 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Current Word Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen size={20} className="text-green-600 mr-2" />
                Word Info
              </h3>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">📝</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{currentWord.japanese}</h4>
                  <p className="text-sm text-gray-600 mb-3">{currentWord.romaji}</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div>Category: {currentWord.category}</div>
                    <div>Difficulty: {currentWord.difficulty}</div>
                    <div>Reviews: 0</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Tips */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb size={20} className="text-yellow-600 mr-2" />
                Learning Tips
              </h3>
              
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-3">
                  <div className="text-sm text-gray-700">
                    <strong>💡 Tip:</strong> Listen to the audio multiple times to improve pronunciation
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3">
                  <div className="text-sm text-gray-700">
                    <strong>🎯 Strategy:</strong> Use the example sentence to understand context
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3">
                  <div className="text-sm text-gray-700">
                    <strong>📚 Review:</strong> Practice regularly with spaced repetition
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <HelpCircle size={20} className="text-purple-600 mr-2" />
                Quick Help
              </h3>
              
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <MessageCircle size={16} />
                  <span>AI Tutor</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Dictionary size={16} />
                  <span>Dictionary</span>
                </motion.button>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
