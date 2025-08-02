'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaVolumeMute,
  FaStepForward,
  FaStepBackward,
  FaBookOpen,
  FaHeadphones,
  FaPen,
  FaCheck,
  FaTimes,
  FaStar,
  FaClock,
  FaEye,
  FaEyeSlash,
  FaRedo,
  FaHeart,
  FaLightbulb,
  FaTrophy,
  FaFire,
  FaMicrophone
} from 'react-icons/fa';

interface Vocabulary {
  content: string;
  kanji?: string;
  reading?: string;
  meaning: string;
  audio?: string;
}

interface Grammar {
  content: string;
  reading?: string;
  meaning: string;
  example: string;
  translation_example: string;
  additional_notes: string;
}

interface Kanji {
  kanji: string;
  reading: string;
  meaning: string;
  stroke_count: number;
}

interface LessonData {
  id: string;
  vocabulary: Vocabulary[];
  grammar: Grammar[];
  kanji: Kanji[];
  audio?: string;
  metadata: {
    title: string;
    theme: string;
    estimatedTime: number;
    difficulty: string;
  };
}

interface AdvancedLessonPlayerProps {
  lessonId: string;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
}

export default function AdvancedLessonPlayer({ lessonId, onComplete, onProgress }: AdvancedLessonPlayerProps) {
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [currentSection, setCurrentSection] = useState<'vocabulary' | 'grammar' | 'kanji' | 'quiz'>('vocabulary');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [studyMode, setStudyMode] = useState<'learn' | 'review' | 'test'>('learn');
  const [timeSpent, setTimeSpent] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadLessonData();
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [lessonId]);

  useEffect(() => {
    if (lessonData) {
      const totalItems = getTotalItems();
      const currentProgress = getCurrentProgress();
      const progressPercentage = totalItems > 0 ? (currentProgress / totalItems) * 100 : 0;
      setProgress(progressPercentage);
      onProgress?.(progressPercentage);
    }
  }, [currentIndex, currentSection, lessonData, onProgress]);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
  };

  const loadLessonData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/lesson/${lessonId}`);
      if (response.ok) {
        const data = await response.json();
        setLessonData(data);
      }
    } catch (error) {
      console.error('Error loading lesson data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalItems = () => {
    if (!lessonData) return 0;
    return lessonData.vocabulary.length + lessonData.grammar.length + lessonData.kanji.length;
  };

  const getCurrentProgress = () => {
    if (!lessonData) return 0;
    const sectionProgress = {
      vocabulary: currentSection === 'vocabulary' ? currentIndex : lessonData.vocabulary.length,
      grammar: currentSection === 'grammar' ? currentIndex : lessonData.grammar.length,
      kanji: currentSection === 'kanji' ? currentIndex : lessonData.kanji.length
    };
    return sectionProgress.vocabulary + sectionProgress.grammar + sectionProgress.kanji;
  };

  const playAudio = (audioUrl?: string) => {
    if (audioRef.current) {
      if (audioUrl) {
        audioRef.current.src = audioUrl;
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextItem = () => {
    const currentSectionData = getCurrentSectionData();
    if (currentIndex < currentSectionData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setShowHint(false);
      setStreak(prev => prev + 1);
    } else {
      // Move to next section
      const sections: Array<'vocabulary' | 'grammar' | 'kanji' | 'quiz'> = ['vocabulary', 'grammar', 'kanji', 'quiz'];
      const currentSectionIndex = sections.indexOf(currentSection);
      if (currentSectionIndex < sections.length - 1) {
        setCurrentSection(sections[currentSectionIndex + 1]);
        setCurrentIndex(0);
        setShowAnswer(false);
        setShowHint(false);
      } else {
        // Lesson completed
        onComplete?.();
      }
    }
  };

  const previousItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
      setShowHint(false);
    } else {
      // Move to previous section
      const sections: Array<'vocabulary' | 'grammar' | 'kanji' | 'quiz'> = ['vocabulary', 'grammar', 'kanji', 'quiz'];
      const currentSectionIndex = sections.indexOf(currentSection);
      if (currentSectionIndex > 0) {
        setCurrentSection(sections[currentSectionIndex - 1]);
        const previousSectionData = getSectionData(sections[currentSectionIndex - 1]);
        setCurrentIndex(previousSectionData.length - 1);
        setShowAnswer(false);
        setShowHint(false);
      }
    }
  };

  const getCurrentSectionData = () => {
    if (!lessonData) return [];
    switch (currentSection) {
      case 'vocabulary': return lessonData.vocabulary;
      case 'grammar': return lessonData.grammar;
      case 'kanji': return lessonData.kanji;
      default: return [];
    }
  };

  const getSectionData = (section: 'vocabulary' | 'grammar' | 'kanji' | 'quiz') => {
    if (!lessonData) return [];
    switch (section) {
      case 'vocabulary': return lessonData.vocabulary;
      case 'grammar': return lessonData.grammar;
      case 'kanji': return lessonData.kanji;
      default: return [];
    }
  };

  const handleAnswerSubmit = (answer: string) => {
    const currentItem = getCurrentSectionData()[currentIndex];
    
    if (currentSection === 'vocabulary' && 'meaning' in currentItem) {
      const isCorrect = answer.toLowerCase() === (currentItem as Vocabulary).meaning.toLowerCase();
      
      setUserAnswers(prev => ({ ...prev, [currentIndex]: answer }));
      
      if (isCorrect) {
        setScore(score + 1);
        setStreak(prev => prev + 1);
      } else {
        setStreak(0);
      }
    }
    
    setShowAnswer(true);
  };

  const toggleFavorite = () => {
    const currentItem = getCurrentSectionData()[currentIndex];
    const itemKey = `${currentSection}-${currentIndex}`;
    
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemKey)) {
        newFavorites.delete(itemKey);
      } else {
        newFavorites.add(itemKey);
      }
      return newFavorites;
    });
  };

  const isFavorite = () => {
    const itemKey = `${currentSection}-${currentIndex}`;
    return favorites.has(itemKey);
  };

  const renderVocabularyCard = (vocab: Vocabulary) => (
    <Card className="w-full max-w-2xl mx-auto transform transition-all duration-300 hover:scale-105">
      <CardHeader className="text-center relative">
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFavorite}
            className={isFavorite() ? 'text-red-500' : 'text-gray-400'}
          >
            <FaHeart className={isFavorite() ? 'fill-current' : ''} />
          </Button>
        </div>
        
        <CardTitle className="text-4xl font-bold mb-4 animate-fade-in">
          {vocab.content}
        </CardTitle>
        
        {vocab.kanji && (
          <div className="text-2xl text-gray-600 mb-2 animate-slide-up">
            {vocab.kanji}
          </div>
        )}
        
        {vocab.reading && (
          <div className="text-lg text-gray-500 mb-4 animate-slide-up">
            ({vocab.reading})
          </div>
        )}
        
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => playAudio(vocab.audio)}
            disabled={!vocab.audio}
            className="transition-all hover:bg-blue-50"
          >
            <FaMicrophone className="mr-2" />
            Nghe phát âm
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowAnswer(!showAnswer)}
            className="transition-all hover:bg-green-50"
          >
            {showAnswer ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
            {showAnswer ? 'Ẩn nghĩa' : 'Xem nghĩa'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowHint(!showHint)}
            className="transition-all hover:bg-yellow-50"
          >
            <FaLightbulb className="mr-2" />
            Gợi ý
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="text-center">
        {showAnswer && (
          <div className="text-2xl font-semibold text-green-600 mb-4 animate-fade-in">
            {vocab.meaning}
          </div>
        )}
        
        {showHint && !showAnswer && (
          <div className="text-lg text-yellow-600 mb-4 animate-fade-in">
            💡 Gợi ý: Từ này có {vocab.meaning.length} chữ cái
          </div>
        )}
        
        {!showAnswer && (
          <div className="space-y-3">
            <p className="text-gray-600">Bạn có biết nghĩa của từ này không?</p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => handleAnswerSubmit(vocab.meaning)}
                className="px-6 transition-all hover:scale-105"
              >
                <FaCheck className="mr-2" />
                Biết
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAnswer(true)}
                className="px-6 transition-all hover:scale-105"
              >
                <FaTimes className="mr-2" />
                Không biết
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderGrammarCard = (grammar: Grammar) => (
    <Card className="w-full max-w-2xl mx-auto transform transition-all duration-300 hover:scale-105">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold mb-4 animate-fade-in">
          {grammar.content}
        </CardTitle>
        {grammar.reading && (
          <div className="text-lg text-gray-500 mb-4 animate-slide-up">
            ({grammar.reading})
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center">
          <h4 className="font-semibold mb-2 text-blue-600">Ý nghĩa:</h4>
          <p className="text-gray-700 text-lg">{grammar.meaning}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-blue-800">Ví dụ:</h4>
          <p className="text-blue-900 mb-2">{grammar.example}</p>
          <p className="text-blue-700 italic">{grammar.translation_example}</p>
        </div>
        
        {grammar.additional_notes && (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-yellow-800">Ghi chú:</h4>
            <p className="text-yellow-900">{grammar.additional_notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderKanjiCard = (kanji: Kanji) => (
    <Card className="w-full max-w-2xl mx-auto transform transition-all duration-300 hover:scale-105">
      <CardHeader className="text-center">
        <CardTitle className="text-6xl font-bold mb-4 animate-fade-in">
          {kanji.kanji}
        </CardTitle>
        <div className="text-xl text-gray-600 mb-4 animate-slide-up">
          {kanji.reading}
        </div>
      </CardHeader>
      
      <CardContent className="text-center">
        <div className="text-2xl font-semibold text-green-600 mb-4 animate-fade-in">
          {kanji.meaning}
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 text-purple-800">Thông tin:</h4>
          <p className="text-purple-900">Số nét: {kanji.stroke_count}</p>
        </div>
        
        <div className="mt-4">
          <Button
            variant="outline"
            onClick={() => setShowHint(!showHint)}
            className="transition-all hover:bg-purple-50"
          >
            <FaStar className="mr-2" />
            Xem thứ tự nét
          </Button>
        </div>
        
        {showHint && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fade-in">
            <h4 className="font-semibold mb-2">Thứ tự nét:</h4>
            <div className="flex justify-center gap-2">
              {Array.from({ length: kanji.stroke_count }, (_, i) => (
                <div key={i} className="w-8 h-8 bg-purple-200 rounded flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderCurrentContent = () => {
    const currentData = getCurrentSectionData();
    if (currentData.length === 0) return null;

    const currentItem = currentData[currentIndex];

    switch (currentSection) {
      case 'vocabulary':
        return renderVocabularyCard(currentItem as Vocabulary);
      case 'grammar':
        return renderGrammarCard(currentItem as Grammar);
      case 'kanji':
        return renderKanjiCard(currentItem as Kanji);
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài học...</p>
        </div>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy bài học</h2>
        <p className="text-gray-600">Vui lòng thử lại sau</p>
      </div>
    );
  }

  const currentData = getCurrentSectionData();
  const totalItems = getTotalItems();

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header with Stats */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Bài học {lessonId}</h1>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              {currentIndex + 1} / {currentData.length}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <FaClock className="text-xs" />
              {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
            </Badge>
            {streak > 0 && (
              <Badge variant="default" className="flex items-center gap-1 bg-orange-500">
                <FaFire className="text-xs" />
                {streak}
              </Badge>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Tiến trình: {progress.toFixed(1)}%</span>
            <span>Điểm: {score}/{totalItems}</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Section Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {(['vocabulary', 'grammar', 'kanji'] as const).map((section) => {
            const sectionData = getSectionData(section);
            const isActive = currentSection === section;
            const sections = ['vocabulary', 'grammar', 'kanji', 'quiz'] as const;
            const isCompleted = currentSection !== section && 
              sections.indexOf(currentSection) > sections.indexOf(section);
            
            return (
              <Button
                key={section}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCurrentSection(section);
                  setCurrentIndex(0);
                  setShowAnswer(false);
                  setShowHint(false);
                }}
                className={`flex items-center gap-2 whitespace-nowrap ${
                  isCompleted ? 'bg-green-100 text-green-800' : ''
                }`}
              >
                {section === 'vocabulary' && <FaBookOpen />}
                {section === 'grammar' && <FaPen />}
                {section === 'kanji' && <FaStar />}
                {section === 'vocabulary' ? 'Từ vựng' : 
                 section === 'grammar' ? 'Ngữ pháp' : 'Kanji'}
                <Badge variant="secondary" className="ml-1">
                  {sectionData.length}
                </Badge>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-6">
        {renderCurrentContent()}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={previousItem}
          disabled={currentIndex === 0 && currentSection === 'vocabulary'}
          className="transition-all hover:scale-105"
        >
          <FaStepBackward className="mr-2" />
          Trước
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={toggleMute}
            className="transition-all hover:scale-105"
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              setCurrentIndex(0);
              setShowAnswer(false);
              setShowHint(false);
            }}
            className="transition-all hover:scale-105"
          >
            <FaRedo />
          </Button>
        </div>

        <Button
          onClick={nextItem}
          disabled={currentIndex === currentData.length - 1 && currentSection === 'kanji'}
          className="transition-all hover:scale-105"
        >
          Tiếp
          <FaStepForward className="ml-2" />
        </Button>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </div>
  );
} 