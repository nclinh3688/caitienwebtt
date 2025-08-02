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
  FaEyeSlash
} from 'react-icons/fa';

interface Vocabulary {
  content: string;
  kanji?: string;
  reading?: string;
  meaning: string;
  audio?: string;
}

interface Grammar {
  pattern: string;
  explanation: string;
  examples: string[];
}

interface Kanji {
  character: string;
  reading: string;
  meaning: string;
  strokeOrder?: string[];
}

interface LessonData {
  id: string;
  vocabulary: Vocabulary[];
  grammar: Grammar[];
  kanji: Kanji[];
  audio?: string;
}

interface LessonPlayerProps {
  lessonId: string;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
}

export default function LessonPlayer({ lessonId, onComplete, onProgress }: LessonPlayerProps) {
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
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    loadLessonData();
  }, [lessonId]);

  useEffect(() => {
    // Update progress
    const totalItems = lessonData ? 
      lessonData.vocabulary.length + lessonData.grammar.length + lessonData.kanji.length : 0;
    const currentProgress = currentIndex + 1;
    const progressPercentage = totalItems > 0 ? (currentProgress / totalItems) * 100 : 0;
    setProgress(progressPercentage);
    onProgress?.(progressPercentage);
  }, [currentIndex, lessonData, onProgress]);

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
    } else {
      // Move to next section
      const sections: Array<'vocabulary' | 'grammar' | 'kanji' | 'quiz'> = ['vocabulary', 'grammar', 'kanji', 'quiz'];
      const currentSectionIndex = sections.indexOf(currentSection);
      if (currentSectionIndex < sections.length - 1) {
        setCurrentSection(sections[currentSectionIndex + 1]);
        setCurrentIndex(0);
        setShowAnswer(false);
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
    } else {
      // Move to previous section
      const sections: Array<'vocabulary' | 'grammar' | 'kanji' | 'quiz'> = ['vocabulary', 'grammar', 'kanji', 'quiz'];
      const currentSectionIndex = sections.indexOf(currentSection);
      if (currentSectionIndex > 0) {
        setCurrentSection(sections[currentSectionIndex - 1]);
        const previousSectionData = getSectionData(sections[currentSectionIndex - 1]);
        setCurrentIndex(previousSectionData.length - 1);
        setShowAnswer(false);
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
    
    // Only check meaning for vocabulary items
    if (currentSection === 'vocabulary' && 'meaning' in currentItem) {
      const isCorrect = answer.toLowerCase() === (currentItem as Vocabulary).meaning.toLowerCase();
      
      setUserAnswers(prev => ({ ...prev, [currentIndex]: answer }));
      
      if (isCorrect) {
        setScore(score + 1);
      }
    }
    
    setShowAnswer(true);
  };

  const renderVocabularyCard = (vocab: Vocabulary) => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold mb-4">{vocab.content}</CardTitle>
        {vocab.kanji && (
          <div className="text-2xl text-gray-600 mb-2">{vocab.kanji}</div>
        )}
        {vocab.reading && (
          <div className="text-lg text-gray-500 mb-4">({vocab.reading})</div>
        )}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => playAudio(vocab.audio)}
            disabled={!vocab.audio}
          >
            <FaVolumeUp className="mr-2" />
            Nghe phát âm
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
            {showAnswer ? 'Ẩn nghĩa' : 'Xem nghĩa'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        {showAnswer && (
          <div className="text-2xl font-semibold text-green-600 mb-4">
            {vocab.meaning}
          </div>
        )}
        {!showAnswer && (
          <div className="space-y-3">
            <p className="text-gray-600">Bạn có biết nghĩa của từ này không?</p>
            <div className="flex justify-center">
              <Button
                onClick={() => handleAnswerSubmit(vocab.meaning)}
                className="mr-2"
              >
                <FaCheck className="mr-2" />
                Biết
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAnswer(true)}
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
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold mb-4">{grammar.pattern}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Giải thích:</h4>
          <p className="text-gray-700">{grammar.explanation}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Ví dụ:</h4>
          <ul className="space-y-2">
            {grammar.examples.map((example, index) => (
              <li key={index} className="text-gray-700">• {example}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  const renderKanjiCard = (kanji: Kanji) => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-6xl font-bold mb-4">{kanji.character}</CardTitle>
        <div className="text-xl text-gray-600 mb-4">{kanji.reading}</div>
      </CardHeader>
      <CardContent className="text-center">
        <div className="text-2xl font-semibold text-green-600 mb-4">
          {kanji.meaning}
        </div>
        {kanji.strokeOrder && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Thứ tự nét:</h4>
            <div className="flex justify-center gap-2">
              {kanji.strokeOrder.map((stroke, index) => (
                <div key={index} className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-sm">
                  {index + 1}
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
  const totalItems = lessonData.vocabulary.length + lessonData.grammar.length + lessonData.kanji.length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Bài học {lessonId}</h1>
          <Badge variant="secondary">
            {currentIndex + 1} / {currentData.length}
          </Badge>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Tiến trình: {progress.toFixed(1)}%</span>
            <span>Điểm: {score}/{totalItems}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Section Navigation */}
        <div className="flex gap-2 mb-6">
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
                }}
                className={`flex items-center gap-2 ${
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
        >
          <FaStepBackward className="mr-2" />
          Trước
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={toggleMute}
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </Button>
        </div>

        <Button
          onClick={nextItem}
          disabled={currentIndex === currentData.length - 1 && currentSection === 'kanji'}
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