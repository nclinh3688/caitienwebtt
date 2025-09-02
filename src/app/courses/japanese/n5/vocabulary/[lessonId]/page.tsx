'use client';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { 
  Volume2, 
  Pause, 
  CheckCircle,
  XCircle,
  BookOpen,
  Target,
  Trophy,
  Heart,
  Settings,
  HelpCircle,
  MessageCircle,
  BookOpen as Dictionary,
  BarChart3,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  BrainCircuit
} from 'lucide-react';
import { VocabularyWord } from '@/data/lesson1-vocabulary';

type LearningModeId = 'list' | 'flashcard' | 'typing' | 'quiz' | 'audio';

export default function DynamicVocabularyLessonPage() {
  const params = useParams();
  const lessonId = params?.lessonId as string;

  const [vocabularyWords, setVocabularyWords] = useState<VocabularyWord[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [activeMode, setActiveMode] = useState<LearningModeId>('list');
  console.log('Current activeMode:', activeMode);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [bookmarkedWords, setBookmarkedWords] = useState<string[]>([]);
  const [hardWords, setHardWords] = useState<string[]>([]);
  const [isReviewMode, setIsReviewMode] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const loadVocabulary = async () => {
      if (lessonId) {
        setLoading(true);
        try {
          const lessonModule = await import(`@/data/lesson${lessonId}-vocabulary`);
          setVocabularyWords(lessonModule[`lesson${lessonId}Vocabulary`]);
        } catch (error) {
          console.error('Failed to load vocabulary data', error);
          setVocabularyWords([]);
        } finally {
          setLoading(false);
        }
      }
    };
    loadVocabulary();
  }, [lessonId]);

  const wordsToPractice = useMemo(() => 
    isReviewMode ? vocabularyWords.filter(word => hardWords.includes(word.id)) : vocabularyWords,
    [isReviewMode, vocabularyWords, hardWords]
  );

  const learningModes: {id: LearningModeId, name: string, description: string, icon: JSX.Element}[] = [
    { id: 'list', name: 'Vocabulary List', description: 'Xem danh sách từ vựng', icon: <BookOpen size={24} /> },
    { id: 'flashcard', name: 'Flashcard Mode', description: 'Học với thẻ ghi nhớ', icon: <BookOpen size={24} /> },
    { id: 'typing', name: 'Typing Practice', description: 'Luyện gõ từ vựng', icon: <Target size={24} /> },
    { id: 'quiz', name: 'Quiz trắc nghiệm', description: 'Chọn nghĩa tiếng Việt đúng', icon: <CheckCircle size={24} /> },
    { id: 'audio', name: 'Audio Practice', description: 'Luyện nghe và phát âm', icon: <Volume2 size={24} /> },
  ];

  useEffect(() => {
    setCurrentWordIndex(0);
    setProgress(0);
    setShowAnswer(false);
    setUserAnswer('');
    setIsCorrect(null);
  }, [isReviewMode, activeMode]);

  const handleNext = () => {
    if (currentWordIndex < wordsToPractice.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowAnswer(false);
      setUserAnswer('');
      setIsCorrect(null);
      setProgress(((currentWordIndex + 2) / wordsToPractice.length) * 100);
    } else {
        if(activeMode === 'quiz') {
            alert(`Quiz Hoàn thành! Điểm của bạn: ${score}`);
        }
    }
  };

  const handlePrev = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowAnswer(false);
      setUserAnswer('');
      setIsCorrect(null);
      setProgress((currentWordIndex / wordsToPractice.length) * 100);
    }
  };

  const handlePracticeAnswer = (answer: string) => {
    const currentWord = wordsToPractice[currentWordIndex];
    let correct = false;
    if (activeMode === 'typing') {
        correct = answer.toLowerCase() === currentWord.hiragana.toLowerCase();
    } else if (activeMode === 'quiz') {
        correct = answer === currentWord.meaning;
    }

    setIsCorrect(correct);
    if (correct) {
      setScore(score + 10);
      setStreak(streak + 1);
    } else {
      setStreak(0);
      if (!hardWords.includes(currentWord.id)) {
        setHardWords([...hardWords, currentWord.id]);
      }
    }
    if (activeMode === 'quiz' || activeMode === 'typing') {
        setTimeout(() => handleNext(), 500);
    }
  };

  const handleBookmark = (wordId: string) => {
    if (bookmarkedWords.includes(wordId)) {
      setBookmarkedWords(bookmarkedWords.filter(id => id !== wordId));
    } else {
      setBookmarkedWords([...bookmarkedWords, wordId]);
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

  const toggleReviewMode = () => {
    setIsReviewMode(!isReviewMode);
  }

  const currentWord = wordsToPractice[currentWordIndex];

  const quizOptions = useMemo(() => {
    if (!currentWord) return [];
    const incorrectOptions = wordsToPractice
      .filter(word => word.id !== currentWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(word => word.meaning);
    return [...incorrectOptions, currentWord.meaning].sort(() => 0.5 - Math.random());
  }, [currentWord, wordsToPractice]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!vocabularyWords || vocabularyWords.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy dữ liệu bài học</h1>
            <p className="text-gray-600">Có vẻ như dữ liệu cho Bài {lessonId} chưa có.</p>
        </div>
      </div>
    );
  }

  const ProgressBar = () => (
    <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
            Từ {currentWordIndex + 1} / {wordsToPractice.length}
        </span>
        <span className="text-sm font-medium text-gray-700">
            {Math.round(progress)}% hoàn thành
        </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
        <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
            animate={{ width: `${progress}%` }}
        />
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <motion.header 
        className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">📚 Bài {lessonId}</h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Minna no Nihongo
                </span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-4">
                <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex flex-col items-center">
                    <Target size={20} className="text-green-600 mb-2" />
                    Chế độ học tập
                </h3>
                <div className="space-y-2">
                    {learningModes.map((mode) => (
                    <motion.button
                        key={mode.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            console.log('Button clicked, setting activeMode to:', mode.id);
                            setActiveMode(mode.id);
                        }}
                        className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                        activeMode === mode.id
                            ? 'border-blue-500 bg-blue-50 shadow-md' 
                            : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50 shadow-sm'
                        }`}
                    >
                        <div className="flex flex-col items-center space-y-2">
                        <div className={`p-2 rounded-lg ${
                            activeMode === mode.id ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                            {mode.icon}
                        </div>
                        <div>
                            <h4 className={`font-medium text-sm text-center ${
                                activeMode === mode.id ? 'text-blue-800' : 'text-gray-500'
                            }`}>{mode.name}</h4>
                            <p className={`text-xs text-center ${
                                activeMode === mode.id ? 'text-blue-600' : 'text-gray-400'
                            }`}>{mode.description}</p>
                        </div>
                        </div>
                    </motion.button>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={toggleReviewMode}
                        disabled={hardWords.length === 0}
                        className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                        isReviewMode 
                            ? 'border-red-500 bg-red-50 shadow-md' 
                            : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                        } ${hardWords.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <div className="flex flex-col items-center space-y-2">
                        <div className={`p-2 rounded-lg ${
                            isReviewMode ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                            <BrainCircuit size={24} className={isReviewMode ? 'text-red-500' : ''} />
                        </div>
                        <div>
                            <h4 className={`font-medium text-sm text-center ${isReviewMode ? 'text-red-800' : 'text-gray-900'}`}>Ôn tập từ khó ({hardWords.length})</h4>
                            <p className={`text-xs text-center ${isReviewMode ? 'text-red-600' : 'text-gray-600'}`}>Luyện tập những từ bạn hay sai</p>
                        </div>
                        </div>
                    </motion.button>
                </div>
                </div>

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
                        animate={{ width: `${progress}%` }}
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
            </div>
          </aside>

          <main className="lg:col-span-10 mt-6 lg:mt-0">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 h-full">
                {activeMode === 'list' && (
                <div className="py-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Danh sách từ vựng</h2>
                    {
                    (() => {
                        const groupedVocabulary = wordsToPractice.reduce((acc, word) => {
                            const section = word.section || 'main';
                            if (!acc[section]) { acc[section] = []; }
                            acc[section].push(word);
                            return acc;
                        }, {} as Record<string, VocabularyWord[]>);

                        const sectionTitles: { [key: string]: string } = {
                        main: '📚 I. TỪ VỰNG CHÍNH (語彙)',
                        conversation: '🗣️ II. 会 thoại (HỘI THOẠI)',
                        reading: '📖 III. ĐỌC THÊM (読み物)',
                        };

                        return (
                        <div className="space-y-8">
                            {Object.keys(sectionTitles).map(sectionKey => {
                            const wordsInSection = groupedVocabulary[sectionKey];
                            if (!wordsInSection || wordsInSection.length === 0) return null;

                            return (
                                <div key={sectionKey}>
                                <h3 className="text-2xl font-bold text-blue-700 mb-4">{sectionTitles[sectionKey]}</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
                                        <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">STT</th>
                                        <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Hiragana</th>
                                        <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Kanji</th>
                                        <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Nghĩa</th>
                                        <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Ví dụ</th>
                                        <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider">Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {wordsInSection.map((word, index) => (
                                        <tr key={word.id} className={index % 2 === 0 ? 'bg-white hover:bg-blue-50' : 'bg-gray-50 hover:bg-blue-50'}>
                                            <td className="px-6 py-5 whitespace-nowrap text-lg font-medium text-gray-900">{index + 1}</td>
                                            <td className="px-6 py-5 whitespace-nowrap text-xl font-extrabold text-blue-800">{word.hiragana}</td>
                                            <td className="px-6 py-5 whitespace-nowrap text-xl font-extrabold text-blue-800">{word.kanji}</td>
                                            <td className="px-6 py-5 whitespace-nowrap text-lg text-indigo-900">{word.meaning}</td>
                                            <td className="px-6 py-5 whitespace-nowrap text-base text-gray-700">{word.example || 'N/A'}</td>
                                            <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center space-x-2">
                                                    <button 
                                                        onClick={() => {
                                                            // Placeholder for audio playback. 
                                                            // Actual audio logic would involve constructing the URL and playing.
                                                            alert(`Playing audio for ${word.hiragana}`);
                                                        }}
                                                        className="text-gray-500 hover:text-blue-600"
                                                        title="Nghe phát âm"
                                                    >
                                                        <Volume2 size={20} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleBookmark(word.id)}
                                                        className={`
                                                            ${bookmarkedWords.includes(word.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}
                                                        `}
                                                        title={bookmarkedWords.includes(word.id) ? 'Bỏ đánh dấu' : 'Đánh dấu từ này'}
                                                    >
                                                        <Heart size={20} fill={bookmarkedWords.includes(word.id) ? 'currentColor' : 'none'} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                            );
                            })}
                        </div>
                        );
                    })()
                    }
                </div>
                )}

                {activeMode === 'flashcard' && wordsToPractice.length > 0 && currentWord && (
                <>
                    <ProgressBar />
                    <div className="text-center py-8">
                    <motion.div
                        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-gray-200 p-8 mb-6 cursor-pointer"
                        onClick={() => setShowAnswer(!showAnswer)}
                    >
                        <div className="text-6xl mb-6">📚</div>
                        {!showAnswer ? (
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">{currentWord.kanji || currentWord.hiragana}</h2>
                            <p className="text-lg text-gray-600">Nhấn để xem đáp án</p>
                        </div>
                        ) : (
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold text-gray-900">{currentWord.kanji || currentWord.hiragana}</h2>
                            <div className="text-2xl font-semibold text-blue-600">{currentWord.hiragana}</div>
                            <div className="text-xl font-medium text-green-600">{currentWord.meaning}</div>
                            {currentWord.example && (
                                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                                    <h4 className="font-semibold text-gray-900 mb-2">Ví dụ:</h4>
                                    <p className="text-lg text-gray-800 mb-2">{currentWord.example}</p>
                                    <p className="text-sm text-gray-600">{currentWord.exampleMeaning}</p>
                                </div>
                            )}
                        </div>
                        )}
                    </motion.div>
                    <div className="flex flex-col items-center space-y-4">
                        <motion.button onClick={handlePrev} disabled={currentWordIndex === 0} className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"><ChevronLeft size={24} /></motion.button>
                        <motion.button onClick={handleNext} disabled={currentWordIndex === wordsToPractice.length - 1} className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300"><ChevronRight size={24} /></motion.button>
                    </div>
                    </div>
                </>
                )}

                {activeMode === 'typing' && wordsToPractice.length > 0 && currentWord && (
                <>
                    <ProgressBar />
                    <div className="text-center py-8">
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-gray-200 p-8 mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Luyện gõ từ vựng</h2>
                        <div className="text-2xl font-bold text-blue-600 mb-4">{currentWord.meaning}</div>
                        <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="Nhập hiragana..." className="w-full max-w-md px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"/>
                        <div className="mt-6">
                            <motion.button onClick={() => handlePracticeAnswer(userAnswer)} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">Kiểm tra</motion.button>
                        </div>
                        {isCorrect !== null && (
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {isCorrect ? <div className="flex items-center justify-center space-x-2"><CheckCircle size={20} /><span>Chính xác!</span></div> : <div className="flex items-center justify-center space-x-2"><XCircle size={20} /><span>Sai rồi! Đáp án đúng là: {currentWord.hiragana}</span></div>}
                            </motion.div>
                        )}
                        </div>
                    </div>
                </>
                )}

                {activeMode === 'quiz' && wordsToPractice.length > 0 && currentWord && (
                    <>
                        <ProgressBar />
                        <div className="text-center py-8">
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-gray-200 p-8 mb-6">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quiz trắc nghiệm</h2>
                            <div className="text-2xl font-bold text-blue-600 mb-4">{currentWord.kanji || currentWord.hiragana}</div>
                            <p className="text-lg text-gray-500 mb-1">({currentWord.hiragana})</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                {quizOptions.map((option, index) => (
                                <motion.button key={index} onClick={() => handlePracticeAnswer(option)} className={`p-4 border-2 rounded-lg transition-all text-left 
    ${isCorrect !== null && option === currentWord.meaning 
        ? 'bg-green-100 border-transparent shadow-md' 
        : isCorrect === false && option === userAnswer 
            ? 'bg-red-100 border-red-500 shadow-md' 
            : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 shadow-sm' 
    }`}>
                                    <span className={`text-lg font-medium ${isCorrect !== null && option === currentWord.meaning ? 'text-green-800' : isCorrect === false && option === userAnswer ? 'text-red-800' : 'text-gray-900'}`}>{option}</span>
                                </motion.button>
                                ))}
                            </div>
                            {isCorrect !== null && (
                                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {isCorrect ? <div className="flex items-center justify-center space-x-2"><CheckCircle size={20} /><span>Chính xác!</span></div> : <div className="flex items-center justify-center space-x-2"><XCircle size={20} /><span>Sai rồi! Đáp án đúng là: {currentWord.meaning}</span></div>}
                                </motion.div>
                            )}
                            </div>
                        </div>
                    </>
                )}

                {activeMode === 'audio' && wordsToPractice.length > 0 && currentWord && (
                    <>
                        <ProgressBar />
                        <div className="text-center py-8">
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border-2 border-gray-200 p-8 mb-6">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Luyện nghe</h2>
                            <div className="mb-6">
                                <motion.button onClick={playAudio} className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all">
                                    {isPlaying ? <Pause size={48} /> : <Volume2 size={48} />}
                                </motion.button>
                            </div>
                            <div className="text-lg text-gray-600 mb-6">Nhấn để nghe và chọn đáp án đúng</div>
                            </div>
                        </div>
                    </>
                )}

                {(isReviewMode && wordsToPractice.length === 0) && (
                <div className="text-center py-20">
                    <div className="text-5xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Tuyệt vời!</h2>
                    <p className="text-gray-600">Bạn đã ôn tập hết các từ khó.</p>
                </div>
                )}
            </div>
          </main>
        </div>
      </div>
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}