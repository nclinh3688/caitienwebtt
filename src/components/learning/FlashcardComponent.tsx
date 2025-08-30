'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Star,
  CheckCircle,
  XCircle,
  Play,
  Pause
} from 'lucide-react';

interface VocabularyWord {
  id: string;
  hiragana: string;
  kanji: string;
  meaning: string;
  example?: string;
  exampleMeaning?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  lesson: string;
}

interface FlashcardProps {
  words: VocabularyWord[];
  onComplete: (results: { wordId: string; correct: boolean; time: number }[]) => void;
}

export default function FlashcardComponent({ words, onComplete }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bookmarkedWords, setBookmarkedWords] = useState<string[]>([]);
  const [studyMode, setStudyMode] = useState<'flashcard' | 'quiz'>('flashcard');
  const [quizResults, setQuizResults] = useState<{ wordId: string; correct: boolean; time: number }[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [showHint, setShowHint] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentWord = words[currentIndex];

  useEffect(() => {
    if (studyMode === 'quiz') {
      setStartTime(Date.now());
    }
  }, [studyMode]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(!showAnswer);
  };

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setShowAnswer(false);
      setShowHint(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setShowAnswer(false);
      setShowHint(false);
    }
  };

  const handleBookmark = () => {
    if (bookmarkedWords.includes(currentWord.id)) {
      setBookmarkedWords(bookmarkedWords.filter(id => id !== currentWord.id));
    } else {
      setBookmarkedWords([...bookmarkedWords, currentWord.id]);
    }
  };

  const handlePlayAudio = () => {
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

  const handleQuizAnswer = (isCorrect: boolean) => {
    const time = Date.now() - startTime;
    const result = {
      wordId: currentWord.id,
      correct: isCorrect,
      time
    };
    
    setQuizResults([...quizResults, result]);
    
    if (currentIndex < words.length - 1) {
      setTimeout(() => {
        handleNext();
        setStartTime(Date.now());
      }, 1000);
    } else {
      // Quiz completed
      onComplete([...quizResults, result]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Dễ';
      case 'medium': return 'Trung bình';
      case 'hard': return 'Khó';
      default: return 'Không xác định';
    }
  };

  if (studyMode === 'quiz') {
    return (
      <div className="flashcard-quiz-container">
        <div className="quiz-header">
          <div className="quiz-progress">
            <span className="text-sm text-gray-600">
              {currentIndex + 1} / {words.length}
            </span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="quiz-timer">
            <span className="text-sm text-gray-600">
              Thời gian: {Math.floor((Date.now() - startTime) / 1000)}s
            </span>
          </div>
        </div>

        <div className="quiz-question">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Từ "{currentWord.hiragana}" có nghĩa là gì?
          </h3>
          
          <div className="quiz-options">
            {[
              currentWord.meaning,
              words[(currentIndex + 1) % words.length]?.meaning || 'Không có',
              words[(currentIndex + 2) % words.length]?.meaning || 'Không có',
              words[(currentIndex + 3) % words.length]?.meaning || 'Không có'
            ].sort(() => Math.random() - 0.5).map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleQuizAnswer(option === currentWord.meaning)}
                className="quiz-option"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="quiz-hint">
          <button
            onClick={() => setShowHint(!showHint)}
            className="hint-button"
          >
            💡 Gợi ý
          </button>
          
          {showHint && (
            <div className="hint-content">
              <p className="text-sm text-gray-600">
                <strong>Hiragana:</strong> {currentWord.hiragana}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Phát âm:</strong> [Hiragana]
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flashcard-container">
      {/* Header */}
      <div className="flashcard-header">
        <div className="flashcard-info">
          <h2 className="text-2xl font-bold text-gray-900">
            Flashcard học từ vựng
          </h2>
          <p className="text-gray-600">
            {currentIndex + 1} / {words.length} từ
          </p>
        </div>
        
        <div className="flashcard-actions">
          <button
            onClick={() => setStudyMode('quiz')}
            className="quiz-mode-button"
          >
            🎯 Chế độ Quiz
          </button>
          
          <button
            onClick={handleBookmark}
            className={`bookmark-button ${bookmarkedWords.includes(currentWord.id) ? 'bookmarked' : ''}`}
          >
            <Bookmark size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {Math.round(((currentIndex + 1) / words.length) * 100)}%
        </span>
      </div>

      {/* Main Flashcard */}
      <div className="flashcard-main">
        <motion.div
          className="flashcard"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          {/* Front Side */}
          <div className={`flashcard-front ${isFlipped ? 'hidden' : ''}`}>
            <div className="word-hiragana">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {currentWord.hiragana}
              </h1>
              {currentWord.kanji && (
                <p className="text-xl text-gray-600 mb-4">
                  {currentWord.kanji}
                </p>
              )}
            </div>
            
            <div className="word-info">
              <div className="info-item">
                <span className="label">Phát âm:</span>
                <span className="value">[{currentWord.hiragana}]</span>
              </div>
              
              <div className="info-item">
                <span className="label">Độ khó:</span>
                <span className={`difficulty-badge ${getDifficultyColor(currentWord.difficulty)}`}>
                  {getDifficultyText(currentWord.difficulty)}
                </span>
              </div>
              
              <div className="info-item">
                <span className="label">Danh mục:</span>
                <span className="value">{currentWord.category}</span>
              </div>
            </div>
            
            <div className="flashcard-actions-main">
              <button
                onClick={handlePlayAudio}
                className="audio-button"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                Nghe phát âm
              </button>
              
              <button
                onClick={handleFlip}
                className="flip-button"
              >
                <RotateCcw size={20} />
                Xem nghĩa
              </button>
            </div>
          </div>

          {/* Back Side */}
          <div className={`flashcard-back ${!isFlipped ? 'hidden' : ''}`}>
            <div className="word-meaning">
              <h2 className="text-3xl font-bold text-blue-600 mb-4">
                {currentWord.meaning}
              </h2>
              
              {currentWord.example && (
                <div className="example-section">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Ví dụ:
                  </h3>
                  <div className="example-content">
                    <p className="text-lg text-gray-700 mb-2">
                      {currentWord.example}
                    </p>
                    {currentWord.exampleMeaning && (
                      <p className="text-sm text-gray-600">
                        {currentWord.exampleMeaning}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flashcard-actions-main">
              <button
                onClick={handleFlip}
                className="flip-button"
              >
                <RotateCcw size={20} />
                Xem từ
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flashcard-navigation">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="nav-button prev"
        >
          <ChevronLeft size={20} />
          Từ trước
        </button>
        
        <div className="navigation-info">
          <span className="text-sm text-gray-600">
            {currentIndex + 1} / {words.length}
          </span>
        </div>
        
        <button
          onClick={handleNext}
          disabled={currentIndex === words.length - 1}
          className="nav-button next"
        >
          Từ tiếp
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        src={`/api/tts?text=${encodeURIComponent(currentWord.hiragana)}`}
      />
    </div>
  );
}
