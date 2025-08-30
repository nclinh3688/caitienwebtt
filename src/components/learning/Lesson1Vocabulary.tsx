'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack,
  RotateCcw,
  CheckCircle,
  XCircle,
  BookOpen,
  Target,
  Trophy,
  Clock,
  Eye,
  EyeOff,
  Heart,
  Share2,
  Download,
  Settings,
  HelpCircle,
  MessageCircle,
  BookOpen as Dictionary,
  Zap,
  Star,
  Award,
  TrendingUp,
  BarChart3,
  Lightbulb,
  Bookmark,
  BookmarkPlus,
  Mic,
  MicOff,
  Timer,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Volume1,
  Volume2 as VolumeHigh
} from 'lucide-react';

export default function Lesson1Vocabulary() {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [currentMode, setCurrentMode] = useState<'flashcard' | 'typing' | 'multiple-choice' | 'audio'>('flashcard');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showRomanji, setShowRomanji] = useState<boolean>(true);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [bookmarkedWords, setBookmarkedWords] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const vocabularyWords = [
    {
      id: '1',
      japanese: 'はじめまして',
      romaji: 'hajimemashite',
      vietnamese: 'Rất vui được gặp bạn',
      english: 'Nice to meet you',
      audio: '/audio/hajimemashite.mp3',
      difficulty: 'easy',
      category: 'Greetings',
      example: 'はじめまして、田中です。どうぞよろしく。',
      exampleTranslation: 'Rất vui được gặp bạn, tôi là Tanaka. Rất mong được giúp đỡ.',
      mastered: false,
      reviewCount: 0,
      lastReviewed: ''
    },
    {
      id: '2',
      japanese: 'どうぞよろしく',
      romaji: 'douzo yoroshiku',
      vietnamese: 'Rất mong được giúp đỡ',
      english: 'Please treat me well',
      audio: '/audio/douzo-yoroshiku.mp3',
      difficulty: 'easy',
      category: 'Greetings',
      example: '田中です。どうぞよろしくお願いします。',
      exampleTranslation: 'Tôi là Tanaka. Rất mong được giúp đỡ.',
      mastered: false,
      reviewCount: 0,
      lastReviewed: ''
    },
    {
      id: '3',
      japanese: 'おはようございます',
      romaji: 'ohayou gozaimasu',
      vietnamese: 'Chào buổi sáng',
      english: 'Good morning',
      audio: '/audio/ohayou-gozaimasu.mp3',
      difficulty: 'easy',
      category: 'Greetings',
      example: 'おはようございます。今日もよろしくお願いします。',
      exampleTranslation: 'Chào buổi sáng. Hôm nay cũng mong được giúp đỡ.',
      mastered: false,
      reviewCount: 0,
      lastReviewed: ''
    },
    {
      id: '4',
      japanese: 'こんにちは',
      romaji: 'konnichiwa',
      vietnamese: 'Chào buổi chiều',
      english: 'Good afternoon',
      audio: '/audio/konnichiwa.mp3',
      difficulty: 'easy',
      category: 'Greetings',
      example: 'こんにちは。お元気ですか。',
      exampleTranslation: 'Chào buổi chiều. Bạn có khỏe không?',
      mastered: false,
      reviewCount: 0,
      lastReviewed: ''
    },
    {
      id: '5',
      japanese: 'こんばんは',
      romaji: 'konbanwa',
      vietnamese: 'Chào buổi tối',
      english: 'Good evening',
      audio: '/audio/konbanwa.mp3',
      difficulty: 'easy',
      category: 'Greetings',
      example: 'こんばんは。今日はお疲れ様でした。',
      exampleTranslation: 'Chào buổi tối. Hôm nay bạn đã vất vả rồi.',
      mastered: false,
      reviewCount: 0,
      lastReviewed: ''
    },
    {
      id: '6',
      japanese: 'おやすみなさい',
      romaji: 'oyasuminasai',
      vietnamese: 'Chúc ngủ ngon',
      english: 'Good night',
      audio: '/audio/oyasuminasai.mp3',
      difficulty: 'easy',
      category: 'Greetings',
      example: 'おやすみなさい。明日も頑張りましょう。',
      exampleTranslation: 'Chúc ngủ ngon. Ngày mai chúng ta cùng cố gắng nhé.',
      mastered: false,
      reviewCount: 0,
      lastReviewed: ''
    },
    {
      id: '7',
      japanese: 'ありがとうございます',
      romaji: 'arigatou gozaimasu',
      vietnamese: 'Cảm ơn bạn',
      english: 'Thank you very much',
      audio: '/audio/arigatou-gozaimasu.mp3',
      difficulty: 'easy',
      category: 'Greetings',
      example: 'ありがとうございます。本当に助かりました。',
      exampleTranslation: 'Cảm ơn bạn. Thực sự đã giúp tôi rất nhiều.',
      mastered: false,
      reviewCount: 0,
      lastReviewed: ''
    },
    {
      id: '8',
      japanese: 'すみません',
      romaji: 'sumimasen',
      vietnamese: 'Xin lỗi',
      english: 'Excuse me / I\'m sorry',
      audio: '/audio/sumimasen.mp3',
      difficulty: 'easy',
      category: 'Greetings',
      example: 'すみません。道を教えてください。',
      exampleTranslation: 'Xin lỗi. Hãy chỉ đường cho tôi.',
      mastered: false,
      reviewCount: 0,
      lastReviewed: ''
    },
    {
      id: '9',
      japanese: 'さようなら',
      romaji: 'sayounara',
      vietnamese: 'Tạm biệt',
      english: 'Goodbye',
      audio: '/audio/sayounara.mp3',
      difficulty: 'easy',
      category: 'Greetings',
      example: 'さようなら。また会いましょう。',
      exampleTranslation: 'Tạm biệt. Hẹn gặp lại.',
      mastered: false,
      reviewCount: 0,
      lastReviewed: ''
    },
    {
      id: '10',
      japanese: 'また明日',
      romaji: 'mata ashita',
      vietnamese: 'Hẹn gặp lại ngày mai',
      english: 'See you tomorrow',
      audio: '/audio/mata-ashita.mp3',
      difficulty: 'easy',
      category: 'Greetings',
      example: 'また明日。お疲れ様でした。',
      exampleTranslation: 'Hẹn gặp lại ngày mai. Bạn đã vất vả rồi.',
      mastered: false,
      reviewCount: 0,
      lastReviewed: ''
    }
  ];

  const learningModes = [
    {
      id: 'flashcard',
      name: 'Flashcard Mode',
      description: 'Học từ vựng với thẻ ghi nhớ',
      icon: <BookOpen size={24} />,
      difficulty: 'easy',
      estimatedTime: 15
    },
    {
      id: 'typing',
      name: 'Typing Practice',
      description: 'Luyện gõ từ vựng',
      icon: <Target size={24} />,
      difficulty: 'medium',
      estimatedTime: 20
    },
    {
      id: 'multiple-choice',
      name: 'Multiple Choice',
      description: 'Chọn đáp án đúng',
      icon: <CheckCircle size={24} />,
      difficulty: 'easy',
      estimatedTime: 12
    },
    {
      id: 'audio',
      name: 'Audio Practice',
      description: 'Luyện nghe và phát âm',
      icon: <Volume2 size={24} />,
      difficulty: 'medium',
      estimatedTime: 18
    }
  ];

  const handleNext = () => {
    if (currentWordIndex < vocabularyWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowAnswer(false);
      setUserAnswer('');
      setIsCorrect(null);
      setProgress(((currentWordIndex + 1) / vocabularyWords.length) * 100);
    }
  };

  const handlePrev = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowAnswer(false);
      setUserAnswer('');
      setIsCorrect(null);
      setProgress((currentWordIndex / vocabularyWords.length) * 100);
    }
  };

  const handleFlip = () => {
    setShowAnswer(!showAnswer);
  };

  const handlePracticeAnswer = (answer: string) => {
    const currentWord = vocabularyWords[currentWordIndex];
    const correct = answer.toLowerCase() === currentWord.romaji.toLowerCase();
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 10);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleBookmark = () => {
    const currentWord = vocabularyWords[currentWordIndex];
    if (bookmarkedWords.includes(currentWord.id)) {
      setBookmarkedWords(bookmarkedWords.filter(id => id !== currentWord.id));
    } else {
      setBookmarkedWords([...bookmarkedWords, currentWord.id]);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const currentWord = vocabularyWords[currentWordIndex];

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
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-gray-900">📚 Bài 1: はじめまして</h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Minna no Nihongo
                </span>
              </div>
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
                <span>Progress: {Math.round(progress)}%</span>
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
            {/* Lesson Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen size={20} className="text-blue-600 mr-2" />
                Thông tin bài học
              </h3>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">🇯🇵</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Bài 1: はじめまして</h4>
                  <p className="text-sm text-gray-600 mb-3">Lời chào hỏi cơ bản</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div>Danh mục: Greetings</div>
                    <div>Độ khó: Easy</div>
                    <div>Số từ: {vocabularyWords.length}</div>
                    <div>Thời gian: 20 phút</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Modes */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target size={20} className="text-green-600 mr-2" />
                Chế độ học tập
              </h3>
              
              <div className="space-y-2">
                {learningModes.map((mode) => (
                  <motion.button
                    key={mode.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentMode(mode.id as 'flashcard' | 'typing' | 'multiple-choice' | 'audio')}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                      currentMode === mode.id 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        currentMode === mode.id ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {mode.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{mode.name}</h4>
                        <p className="text-xs text-gray-600">{mode.description}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Clock size={12} className="mr-1" />
                          {mode.estimatedTime} phút
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(mode.difficulty)}`}>
                        {mode.difficulty}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Progress Stats */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Trophy size={20} className="text-yellow-600 mr-2" />
                Thống kê học tập
              </h3>
              
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Tiến độ</span>
                    <span className="text-sm font-bold text-green-600">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Điểm số</span>
                    <span className="text-lg font-bold text-blue-600">{score}</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Chuỗi đúng</span>
                    <span className="text-lg font-bold text-orange-600">{streak}</span>
                  </div>
                </div>
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
                <span className="text-sm font-medium text-gray-700">
                  Từ {currentWordIndex + 1} / {vocabularyWords.length}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round(progress)}% hoàn thành
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>

            {/* Flashcard Display */}
            {currentMode === 'flashcard' && (
              <div className="text-center py-8">
                <motion.div
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-gray-200 p-8 mb-6 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFlip}
                >
                  <div className="text-6xl mb-6">📚</div>
                  
                  {!showAnswer ? (
                    <div>
                      <h2 className="text-4xl font-bold text-gray-900 mb-4">{currentWord.japanese}</h2>
                      <p className="text-lg text-gray-600">Nhấn để xem đáp án</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h2 className="text-4xl font-bold text-gray-900">{currentWord.japanese}</h2>
                      <div className="text-2xl font-semibold text-blue-600">{currentWord.romaji}</div>
                      <div className="text-xl font-medium text-green-600">{currentWord.vietnamese}</div>
                      <div className="text-lg text-gray-600">{currentWord.english}</div>
                      
                      {/* Example Sentence */}
                      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                        <h4 className="font-semibold text-gray-900 mb-2">Ví dụ:</h4>
                        <p className="text-lg text-gray-800 mb-2">{currentWord.example}</p>
                        <p className="text-sm text-gray-600">{currentWord.exampleTranslation}</p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Audio Controls */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={playAudio}
                    className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all"
                  >
                    {isPlaying ? <Pause size={24} /> : <Volume2 size={24} />}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBookmark}
                    className={`p-3 rounded-full transition-all ${
                      bookmarkedWords.includes(currentWord.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    <Heart size={24} />
                  </motion.button>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrev}
                    disabled={currentWordIndex === 0}
                    className={`p-3 rounded-full transition-all ${
                      currentWordIndex === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    disabled={currentWordIndex === vocabularyWords.length - 1}
                    className={`p-3 rounded-full transition-all ${
                      currentWordIndex === vocabularyWords.length - 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    <ChevronRight size={24} />
                  </motion.button>
                </div>
              </div>
            )}

            {/* Typing Practice Mode */}
            {currentMode === 'typing' && (
              <div className="text-center py-8">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-gray-200 p-8 mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Luyện gõ từ vựng</h2>
                  <div className="text-2xl font-bold text-blue-600 mb-4">{currentWord.japanese}</div>
                  <div className="text-lg text-gray-600 mb-6">{currentWord.vietnamese}</div>
                  
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Nhập romaji của từ này..."
                    className="w-full max-w-md px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                  
                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePracticeAnswer(userAnswer)}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Kiểm tra
                    </motion.button>
                  </div>
                  
                  {isCorrect !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`mt-4 p-4 rounded-lg ${
                        isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {isCorrect ? (
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircle size={20} />
                          <span>Chính xác! {currentWord.romaji}</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <XCircle size={20} />
                          <span>Sai rồi! Đáp án đúng là: {currentWord.romaji}</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Multiple Choice Mode */}
            {currentMode === 'multiple-choice' && (
              <div className="text-center py-8">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-gray-200 p-8 mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Chọn đáp án đúng</h2>
                  <div className="text-2xl font-bold text-blue-600 mb-4">{currentWord.japanese}</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {[
                      currentWord.romaji,
                      'incorrect1',
                      'incorrect2',
                      'incorrect3'
                    ].sort(() => Math.random() - 0.5).map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePracticeAnswer(option)}
                        className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-all text-left"
                      >
                        <span className="text-lg font-medium text-gray-900">{option}</span>
                      </motion.button>
                    ))}
                  </div>
                  
                  {isCorrect !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`mt-6 p-4 rounded-lg ${
                        isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {isCorrect ? (
                        <div className="flex items-center justify-center space-x-2">
                          <CheckCircle size={20} />
                          <span>Chính xác!</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <XCircle size={20} />
                          <span>Sai rồi! Đáp án đúng là: {currentWord.romaji}</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Audio Practice Mode */}
            {currentMode === 'audio' && (
              <div className="text-center py-8">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-gray-200 p-8 mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Luyện nghe và phát âm</h2>
                  
                  <div className="mb-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={playAudio}
                      className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all"
                    >
                      {isPlaying ? <Pause size={48} /> : <Volume2 size={48} />}
                    </motion.button>
                  </div>
                  
                  <div className="text-lg text-gray-600 mb-6">
                    Nghe và nhắc lại từ vựng
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Từ vựng:</h4>
                      <p className="text-2xl font-bold text-blue-600">{currentWord.japanese}</p>
                      <p className="text-lg text-gray-700">{currentWord.romaji}</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Nghĩa:</h4>
                      <p className="text-lg text-gray-700">{currentWord.vietnamese}</p>
                      <p className="text-sm text-gray-600">{currentWord.english}</p>
                    </div>
                  </div>
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
                Thông tin từ vựng
              </h3>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">📝</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{currentWord.japanese}</h4>
                  <p className="text-sm text-gray-600 mb-3">{currentWord.romaji}</p>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div>Danh mục: {currentWord.category}</div>
                    <div>Độ khó: {currentWord.difficulty}</div>
                    <div>Đã ôn: {currentWord.reviewCount} lần</div>
                    <div>Trạng thái: {currentWord.mastered ? 'Đã thuộc' : 'Chưa thuộc'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Tips */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb size={20} className="text-yellow-600 mr-2" />
                Mẹo học tập
              </h3>
              
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-3">
                  <div className="text-sm text-gray-700">
                    <strong>💡 Tip:</strong> Nghe và nhắc lại nhiều lần để nhớ phát âm
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3">
                  <div className="text-sm text-gray-700">
                    <strong>🎯 Strategy:</strong> Học từ vựng theo chủ đề để dễ nhớ
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3">
                  <div className="text-sm text-gray-700">
                    <strong>📚 Review:</strong> Ôn tập đều đặn mỗi ngày
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <HelpCircle size={20} className="text-purple-600 mr-2" />
                Trợ giúp nhanh
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
                  <span>Từ điển</span>
                </motion.button>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}
