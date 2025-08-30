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
  X,
  Home,
  Car,
  Briefcase,
  GraduationCap,
  ShoppingCart,
  Utensils,
  Heart as HeartIcon,
  Plane,
  Gamepad2,
  Music,
  Camera,
  Phone,
  Mail,
  CreditCard,
  Building,
  Bus,
  Train,
  Car as CarIcon,
  Ship,
  Palette,
  User,
  Cloud,
  Coffee,
  Shirt,
  Shield
} from 'lucide-react';

export default function VocabularyN5Interface() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [currentMode, setCurrentMode] = useState('overview');
  const [showSettings, setShowSettings] = useState(false);

  const lessons = [
    {
      id: '1',
      title: 'Chào hỏi cơ bản',
      description: 'Các từ vựng chào hỏi hàng ngày',
      icon: <Users size={24} />,
      wordCount: 15,
      difficulty: 'easy',
      category: 'Greetings',
      progress: 0,
      completed: false,
      estimatedTime: 20
    },
    {
      id: '2',
      title: 'Số đếm 1-100',
      description: 'Số từ 1-100 và cách đếm',
      icon: <Target size={24} />,
      wordCount: 20,
      difficulty: 'easy',
      category: 'Numbers',
      progress: 0,
      completed: false,
      estimatedTime: 25
    },
    {
      id: '3',
      title: 'Màu sắc cơ bản',
      description: 'Từ vựng về màu sắc cơ bản',
      icon: <Palette size={24} />,
      wordCount: 12,
      difficulty: 'easy',
      category: 'Colors',
      progress: 0,
      completed: false,
      estimatedTime: 15
    },
    {
      id: '4',
      title: 'Gia đình',
      description: 'Từ vựng về các thành viên gia đình',
      icon: <HeartIcon size={24} />,
      wordCount: 18,
      difficulty: 'easy',
      category: 'Family',
      progress: 0,
      completed: false,
      estimatedTime: 20
    },
    {
      id: '5',
      title: 'Thời gian',
      description: 'Từ vựng về thời gian và giờ giấc',
      icon: <Clock size={24} />,
      wordCount: 16,
      difficulty: 'easy',
      category: 'Time',
      progress: 0,
      completed: false,
      estimatedTime: 18
    },
    {
      id: '6',
      title: 'Ngày tháng',
      description: 'Từ vựng về ngày tháng và mùa',
      icon: <Calendar size={24} />,
      wordCount: 14,
      difficulty: 'easy',
      category: 'Dates',
      progress: 0,
      completed: false,
      estimatedTime: 16
    },
    {
      id: '7',
      title: 'Thời tiết',
      description: 'Từ vựng về thời tiết và khí hậu',
      icon: <Cloud size={24} />,
      wordCount: 10,
      difficulty: 'easy',
      category: 'Weather',
      progress: 0,
      completed: false,
      estimatedTime: 12
    },
    {
      id: '8',
      title: 'Đồ ăn cơ bản',
      description: 'Từ vựng về thức ăn và món ăn',
      icon: <Utensils size={24} />,
      wordCount: 22,
      difficulty: 'medium',
      category: 'Food',
      progress: 0,
      completed: false,
      estimatedTime: 25
    },
    {
      id: '9',
      title: 'Đồ uống',
      description: 'Từ vựng về các loại đồ uống',
      icon: <Coffee size={24} />,
      wordCount: 8,
      difficulty: 'easy',
      category: 'Drinks',
      progress: 0,
      completed: false,
      estimatedTime: 10
    },
    {
      id: '10',
      title: 'Quần áo',
      description: 'Từ vựng về trang phục và quần áo',
      icon: <Shirt size={24} />,
      wordCount: 15,
      difficulty: 'easy',
      category: 'Clothing',
      progress: 0,
      completed: false,
      estimatedTime: 18
    },
    {
      id: '11',
      title: 'Cơ thể người',
      description: 'Từ vựng về các bộ phận cơ thể',
      icon: <User size={24} />,
      wordCount: 16,
      difficulty: 'easy',
      category: 'Body',
      progress: 0,
      completed: false,
      estimatedTime: 20
    },
    {
      id: '12',
      title: 'Nhà cửa',
      description: 'Từ vựng về nhà cửa và đồ đạc',
      icon: <Home size={24} />,
      wordCount: 20,
      difficulty: 'medium',
      category: 'House',
      progress: 0,
      completed: false,
      estimatedTime: 25
    },
    {
      id: '13',
      title: 'Giao thông',
      description: 'Từ vựng về phương tiện giao thông',
      icon: <Car size={24} />,
      wordCount: 12,
      difficulty: 'easy',
      category: 'Transport',
      progress: 0,
      completed: false,
      estimatedTime: 15
    },
    {
      id: '14',
      title: 'Nghề nghiệp',
      description: 'Từ vựng về các nghề nghiệp',
      icon: <Briefcase size={24} />,
      wordCount: 18,
      difficulty: 'medium',
      category: 'Jobs',
      progress: 0,
      completed: false,
      estimatedTime: 22
    },
    {
      id: '15',
      title: 'Trường học',
      description: 'Từ vựng về trường học và học tập',
      icon: <GraduationCap size={24} />,
      wordCount: 25,
      difficulty: 'medium',
      category: 'School',
      progress: 0,
      completed: false,
      estimatedTime: 30
    },
    {
      id: '16',
      title: 'Công việc',
      description: 'Từ vựng về công việc và văn phòng',
      icon: <Building size={24} />,
      wordCount: 20,
      difficulty: 'medium',
      category: 'Work',
      progress: 0,
      completed: false,
      estimatedTime: 25
    },
    {
      id: '17',
      title: 'Sở thích',
      description: 'Từ vựng về sở thích và giải trí',
      icon: <Gamepad2 size={24} />,
      wordCount: 15,
      difficulty: 'easy',
      category: 'Hobbies',
      progress: 0,
      completed: false,
      estimatedTime: 18
    },
    {
      id: '18',
      title: 'Thể thao',
      description: 'Từ vựng về thể thao và vận động',
      icon: <Trophy size={24} />,
      wordCount: 12,
      difficulty: 'easy',
      category: 'Sports',
      progress: 0,
      completed: false,
      estimatedTime: 15
    },
    {
      id: '19',
      title: 'Du lịch',
      description: 'Từ vựng về du lịch và khám phá',
      icon: <Plane size={24} />,
      wordCount: 16,
      difficulty: 'medium',
      category: 'Travel',
      progress: 0,
      completed: false,
      estimatedTime: 20
    },
    {
      id: '20',
      title: 'Mua sắm',
      description: 'Từ vựng về mua sắm và thương mại',
      icon: <ShoppingCart size={24} />,
      wordCount: 18,
      difficulty: 'medium',
      category: 'Shopping',
      progress: 0,
      completed: false,
      estimatedTime: 22
    },
    {
      id: '21',
      title: 'Nhà hàng',
      description: 'Từ vựng về nhà hàng và ẩm thực',
      icon: <Utensils size={24} />,
      wordCount: 20,
      difficulty: 'medium',
      category: 'Restaurant',
      progress: 0,
      completed: false,
      estimatedTime: 25
    },
    {
      id: '22',
      title: 'Bệnh viện',
      description: 'Từ vựng về y tế và sức khỏe',
      icon: <HeartIcon size={24} />,
      wordCount: 14,
      difficulty: 'medium',
      category: 'Hospital',
      progress: 0,
      completed: false,
      estimatedTime: 18
    },
    {
      id: '23',
      title: 'Ngân hàng',
      description: 'Từ vựng về ngân hàng và tài chính',
      icon: <CreditCard size={24} />,
      wordCount: 12,
      difficulty: 'medium',
      category: 'Bank',
      progress: 0,
      completed: false,
      estimatedTime: 15
    },
    {
      id: '24',
      title: 'Bưu điện',
      description: 'Từ vựng về bưu điện và giao dịch',
      icon: <Mail size={24} />,
      wordCount: 10,
      difficulty: 'easy',
      category: 'Post Office',
      progress: 0,
      completed: false,
      estimatedTime: 12
    },
    {
      id: '25',
      title: 'Cảnh sát',
      description: 'Từ vựng về an ninh và pháp luật',
      icon: <Shield size={24} />,
      wordCount: 8,
      difficulty: 'easy',
      category: 'Police',
      progress: 0,
      completed: false,
      estimatedTime: 10
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
      icon: <TargetIcon size={24} />,
      difficulty: 'medium',
      estimatedTime: 20
    },
    {
      id: 'audio',
      name: 'Audio Practice',
      description: 'Luyện nghe và phát âm',
      icon: <Volume2 size={24} />,
      difficulty: 'medium',
      estimatedTime: 18
    },
    {
      id: 'sentence',
      name: 'Sentence Context',
      description: 'Học từ vựng qua câu',
      icon: <MessageCircle size={24} />,
      difficulty: 'hard',
      estimatedTime: 25
    },
    {
      id: 'multiple-choice',
      name: 'Multiple Choice',
      description: 'Chọn đáp án đúng',
      icon: <CheckCircle size={24} />,
      difficulty: 'easy',
      estimatedTime: 12
    }
  ];

  const handleLessonSelect = (lessonId: string) => {
    setSelectedLesson(lessonId);
    setCurrentMode('lesson');
  };

  const handleModeSelect = (modeId: string) => {
    setCurrentMode('practice');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTotalProgress = () => {
    const completedLessons = lessons.filter(lesson => lesson.completed).length;
    return (completedLessons / lessons.length) * 100;
  };

  const getTotalWords = () => {
    return lessons.reduce((total, lesson) => total + lesson.wordCount, 0);
  };

  const getTotalEstimatedTime = () => {
    return lessons.reduce((total, lesson) => total + lesson.estimatedTime, 0);
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
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-gray-900">📚 TỪ VỰNG N5</h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  JLPT N5
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
                <span>Progress</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Lesson Categories */}
          <motion.aside
            className="w-80 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Overall Progress */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Trophy size={20} className="text-blue-600 mr-2" />
                Tổng tiến độ
              </h3>
              
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Bài học hoàn thành</span>
                    <span className="text-sm font-bold text-blue-600">
                      {lessons.filter(l => l.completed).length} / {lessons.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${getTotalProgress()}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Tổng từ vựng</span>
                    <span className="text-lg font-bold text-green-600">{getTotalWords()}</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Thời gian ước tính</span>
                    <span className="text-lg font-bold text-orange-600">{getTotalEstimatedTime()} phút</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Categories */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen size={20} className="text-green-600 mr-2" />
                Danh sách bài học ({lessons.length})
              </h3>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {lessons.map((lesson) => (
                  <motion.button
                    key={lesson.id}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLessonSelect(lesson.id)}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedLesson === lesson.id 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        selectedLesson === lesson.id ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {lesson.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{lesson.title}</h4>
                        <p className="text-xs text-gray-600">{lesson.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">{lesson.wordCount} từ</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{lesson.estimatedTime} phút</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                          {lesson.difficulty}
                        </div>
                        {lesson.completed && (
                          <CheckCircle size={16} className="text-green-500" />
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Zap size={20} className="text-purple-600 mr-2" />
                Hành động nhanh
              </h3>
              
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <RotateCcw size={16} />
                  <span>Ôn tập</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Trophy size={16} />
                  <span>Làm bài kiểm tra</span>
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
            {currentMode === 'overview' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Chào mừng đến với Từ vựng N5!</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Học {getTotalWords()} từ vựng cơ bản qua {lessons.length} bài học được thiết kế khoa học
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentMode('lesson')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-lg"
                >
                  Bắt đầu học ngay!
                </motion.button>
              </div>
            )}

            {currentMode === 'lesson' && selectedLesson && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {lessons.find(l => l.id === selectedLesson)?.title}
                  </h2>
                  <p className="text-gray-600">
                    {lessons.find(l => l.id === selectedLesson)?.description}
                  </p>
                </div>

                {/* Learning Modes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {learningModes.map((mode) => (
                    <motion.button
                      key={mode.id}
                      whileHover={{ scale: 1.02, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleModeSelect(mode.id)}
                      className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 text-left"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {mode.icon}
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(mode.difficulty)}`}>
                          {mode.difficulty}
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{mode.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{mode.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={14} className="mr-1" />
                        {mode.estimatedTime} phút
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Lesson Info */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin bài học</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {lessons.find(l => l.id === selectedLesson)?.wordCount}
                      </div>
                      <div className="text-sm text-gray-600">Từ vựng</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {lessons.find(l => l.id === selectedLesson)?.estimatedTime}
                      </div>
                      <div className="text-sm text-gray-600">Phút</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {lessons.find(l => l.id === selectedLesson)?.difficulty}
                      </div>
                      <div className="text-sm text-gray-600">Độ khó</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentMode === 'practice' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Chế độ luyện tập</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Chọn chế độ học phù hợp để bắt đầu luyện tập
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentMode('lesson')}
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-lg"
                >
                  Quay lại bài học
                </motion.button>
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
            {/* Current Lesson Info */}
            {selectedLesson && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen size={20} className="text-green-600 mr-2" />
                  Bài học hiện tại
                </h3>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📝</div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {lessons.find(l => l.id === selectedLesson)?.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {lessons.find(l => l.id === selectedLesson)?.description}
                    </p>
                    <div className="space-y-2 text-xs text-gray-500">
                      <div>Danh mục: {lessons.find(l => l.id === selectedLesson)?.category}</div>
                      <div>Độ khó: {lessons.find(l => l.id === selectedLesson)?.difficulty}</div>
                      <div>Số từ: {lessons.find(l => l.id === selectedLesson)?.wordCount}</div>
                      <div>Thời gian: {lessons.find(l => l.id === selectedLesson)?.estimatedTime} phút</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Learning Tips */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb size={20} className="text-yellow-600 mr-2" />
                Mẹo học tập
              </h3>
              
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-3">
                  <div className="text-sm text-gray-700">
                    <strong>💡 Tip:</strong> Học từ vựng theo chủ đề để dễ nhớ hơn
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3">
                  <div className="text-sm text-gray-700">
                    <strong>🎯 Strategy:</strong> Sử dụng flashcard để ôn tập hiệu quả
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
    </div>
  );
}
