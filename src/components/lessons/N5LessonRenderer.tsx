'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ModernButton, PlayButton } from '@/components/ui/ModernButton';
import { 
  FaBook, 
  FaHeadphones, 
  FaPen, 
  FaCheck, 
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaArrowLeft,
  FaArrowRight,
  FaStar,
  FaTrophy,
  FaClock,
  FaGraduationCap
} from 'react-icons/fa';

interface N5LessonRendererProps {
  lessonData: any;
}

export default function N5LessonRenderer({ lessonData }: N5LessonRendererProps) {
  const [currentSection, setCurrentSection] = useState('vocabulary');
  const [progress, setProgress] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [learnedVocabulary, setLearnedVocabulary] = useState<string[]>([]);
  const [learnedGrammar, setLearnedGrammar] = useState<string[]>([]);

  const sections = [
    { id: 'vocabulary', title: 'Từ vựng', icon: <FaBook /> },
    { id: 'grammar', title: 'Ngữ pháp', icon: <FaGraduationCap /> },
    { id: 'kanji', title: 'Kanji', icon: <FaPen /> },
    { id: 'listening', title: 'Luyện nghe', icon: <FaHeadphones /> }
  ];

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('n5-progress');
    if (savedProgress) {
              try {
          const data = JSON.parse(savedProgress);
          setProgress(data.progress || 0);
          setCompletedSections(data.completedSections || []);
          setLearnedVocabulary(data.learnedVocabulary || []);
          setLearnedGrammar(data.learnedGrammar || []);
        } catch (error) {
          console.warn('Invalid progress data, resetting...');
          localStorage.removeItem('n5-progress');
          setProgress(0);
          setCompletedSections([]);
          setLearnedVocabulary([]);
          setLearnedGrammar([]);
        }
    }
  }, [lessonData.metadata?.id]);

  const saveProgress = (newProgress: number, newCompletedSections: string[], newLearnedVocabulary: string[], newLearnedGrammar: string[]) => {
    const progressData = {
      progress: newProgress,
      completedSections: newCompletedSections,
      learnedVocabulary: newLearnedVocabulary,
      learnedGrammar: newLearnedGrammar,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(`n5-lesson-${lessonData.metadata?.id}-progress`, JSON.stringify(progressData));
  };

  const markVocabularyAsLearned = (word: string) => {
    const newLearned = [...learnedVocabulary, word];
    setLearnedVocabulary(newLearned);
    
    const newProgress = Math.min(100, ((newLearned.length + learnedGrammar.length) / 
      ((lessonData.vocabulary?.length || 0) + (lessonData.grammar?.length || 0))) * 100);
    setProgress(newProgress);
    
    saveProgress(newProgress, completedSections, newLearned, learnedGrammar);
  };

  const markGrammarAsLearned = (pattern: string) => {
    const newLearned = [...learnedGrammar, pattern];
    setLearnedGrammar(newLearned);
    
    const newProgress = Math.min(100, ((learnedVocabulary.length + newLearned.length) / 
      ((lessonData.vocabulary?.length || 0) + (lessonData.grammar?.length || 0))) * 100);
    setProgress(newProgress);
    
    saveProgress(newProgress, completedSections, learnedVocabulary, newLearned);
  };

  const completeSection = (sectionId: string) => {
    const newCompleted = [...completedSections, sectionId];
    setCompletedSections(newCompleted);
    saveProgress(progress, newCompleted, learnedVocabulary, learnedGrammar);
  };

  const toggleAudio = () => {
    setAudioPlaying(!audioPlaying);
  };

  const toggleMute = () => {
    setAudioMuted(!audioMuted);
  };

  const renderVocabulary = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Từ vựng</h3>
        <p className="text-gray-600">Học {lessonData.vocabulary?.length || 0} từ vựng mới</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lessonData.vocabulary?.map((word: any, index: number) => (
          <Card 
            key={index} 
            className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
              learnedVocabulary.includes(word.japanese) ? 'border-green-200 bg-green-50' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900 mb-2">{word.japanese}</div>
                  <div className="text-lg text-gray-600 mb-1">{word.reading}</div>
                  <div className="text-gray-500">{word.meaning}</div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {/* Play pronunciation */}}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <FaVolumeUp />
                  </Button>
                  
                  {!learnedVocabulary.includes(word.japanese) && (
                    <ModernButton
                      size="sm"
                      variant="outline"
                      onClick={() => markVocabularyAsLearned(word.japanese)}
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      <FaCheck />
                    </ModernButton>
                  )}
                  
                  {learnedVocabulary.includes(word.japanese) && (
                    <Badge variant="default" className="bg-green-500">
                      <FaCheck className="mr-1" />
                      Đã học
                    </Badge>
                  )}
                </div>
              </div>
              
              {word.example && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Ví dụ:</div>
                  <div className="text-gray-900">{word.example}</div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {learnedVocabulary.length === (lessonData.vocabulary?.length || 0) && (
        <div className="text-center mt-8">
          <ModernButton
            variant="success"
            size="lg"
            onClick={() => completeSection('vocabulary')}
            className="bg-green-600 hover:bg-green-700"
          >
            <FaCheck className="mr-2" />
            Hoàn thành từ vựng
          </ModernButton>
        </div>
      )}
    </div>
  );

  const renderGrammar = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Ngữ pháp</h3>
        <p className="text-gray-600">Học {lessonData.grammar?.length || 0} mẫu câu mới</p>
      </div>
      
      <div className="space-y-6">
        {lessonData.grammar?.map((pattern: any, index: number) => (
          <Card 
            key={index} 
            className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
              learnedGrammar.includes(pattern.pattern) ? 'border-blue-200 bg-blue-50' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="text-xl font-bold text-gray-900 mb-2">{pattern.pattern}</div>
                  <div className="text-gray-600 mb-2">{pattern.meaning}</div>
                  <div className="text-sm text-gray-500 mb-3">{pattern.explanation}</div>
                  
                  <div className="space-y-2">
                    {pattern.examples?.map((example: string, exIndex: number) => (
                      <div key={exIndex} className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-gray-900">{example}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="ml-4">
                  {!learnedGrammar.includes(pattern.pattern) && (
                    <ModernButton
                      size="sm"
                      variant="outline"
                      onClick={() => markGrammarAsLearned(pattern.pattern)}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      <FaCheck />
                    </ModernButton>
                  )}
                  
                  {learnedGrammar.includes(pattern.pattern) && (
                    <Badge variant="default" className="bg-blue-500">
                      <FaCheck className="mr-1" />
                      Đã học
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {learnedGrammar.length === (lessonData.grammar?.length || 0) && (
        <div className="text-center mt-8">
          <ModernButton
            variant="primary"
            size="lg"
            onClick={() => completeSection('grammar')}
          >
            <FaCheck className="mr-2" />
            Hoàn thành ngữ pháp
          </ModernButton>
        </div>
      )}
    </div>
  );

  const renderKanji = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Kanji</h3>
        <p className="text-gray-600">Học {lessonData.kanji?.length || 0} kanji mới</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessonData.kanji?.map((kanji: any, index: number) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-gray-900 mb-3">{kanji.character}</div>
              <div className="text-lg text-gray-600 mb-2">{kanji.reading}</div>
              <div className="text-gray-500 mb-3">{kanji.meaning}</div>
              
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FaPen />
                  <span>{kanji.strokeCount} nét</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaStar />
                  <span>JLPT N5</span>
                </div>
              </div>
              
              {kanji.examples && (
                <div className="mt-4 space-y-2">
                  {kanji.examples.map((example: string, exIndex: number) => (
                    <div key={exIndex} className="p-2 bg-gray-50 rounded text-sm">
                      {example}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <ModernButton
          variant="secondary"
          size="lg"
          onClick={() => completeSection('kanji')}
        >
          <FaCheck className="mr-2" />
          Hoàn thành kanji
        </ModernButton>
      </div>
    </div>
  );

  const renderListening = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Luyện nghe</h3>
        <p className="text-gray-600">Luyện kỹ năng nghe hiểu</p>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🎧</div>
            
            <div className="space-y-4">
              <h4 className="text-xl font-semibold">Bài nghe: {lessonData.metadata?.title}</h4>
              <p className="text-gray-600">Nghe và làm bài tập để kiểm tra khả năng hiểu</p>
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <PlayButton
                isPlaying={audioPlaying}
                onClick={toggleAudio}
                className="w-16 h-16"
              />
              
              <Button
                variant="ghost"
                size="lg"
                onClick={toggleMute}
                className="text-gray-600 hover:text-gray-800"
              >
                {audioMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-2">Câu hỏi:</div>
                <div className="text-gray-900">Bạn có thể nghe và hiểu được bao nhiêu phần trăm?</div>
              </div>
              
              <div className="flex gap-2 justify-center">
                <Button variant="outline">25%</Button>
                <Button variant="outline">50%</Button>
                <Button variant="outline">75%</Button>
                <Button variant="outline">100%</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center mt-8">
        <ModernButton
          variant="primary"
          size="lg"
          onClick={() => completeSection('listening')}
        >
          <FaCheck className="mr-2" />
          Hoàn thành luyện nghe
        </ModernButton>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (currentSection) {
      case 'vocabulary':
        return renderVocabulary();
      case 'grammar':
        return renderGrammar();
      case 'kanji':
        return renderKanji();
      case 'listening':
        return renderListening();
      default:
        return renderVocabulary();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <FaArrowLeft className="mr-2" />
                Quay lại
              </Button>
              
              <div>
                <h1 className="text-xl font-bold text-gray-900">{lessonData.metadata?.title}</h1>
                <p className="text-sm text-gray-600">Bài học N5</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Tiến độ</div>
                <div className="text-lg font-bold text-gray-900">{Math.round(progress)}%</div>
              </div>
              <Progress value={progress} className="w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex space-x-1">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={currentSection === section.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentSection(section.id)}
                className="flex items-center gap-2"
              >
                {section.icon}
                {section.title}
                {completedSections.includes(section.id) && (
                  <FaCheck className="text-green-500" />
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {renderSection()}
      </div>

      {/* Completion Modal */}
      {progress >= 100 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4 animate-bounce-in">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Chúc mừng!</h3>
              <p className="text-gray-600 mb-6">
                Bạn đã hoàn thành bài học này. Hãy tiếp tục với bài học tiếp theo!
              </p>
              
              <div className="flex gap-3">
                <ModernButton
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Ôn tập lại
                </ModernButton>
                
                <ModernButton
                  variant="primary"
                  onClick={() => window.location.href = '/courses/japanese/n5'}
                >
                  Bài tiếp theo
                </ModernButton>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 