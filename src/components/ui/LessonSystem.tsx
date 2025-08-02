'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { InteractiveCard } from '@/components/ui/MicroInteractions';
import { GlassCard, AnimatedSection, GradientText, AnimatedCounter } from '@/components/ui/MagicEffects';
import { 
  FaBook, 
  FaPen, 
  FaHeadphones, 
  FaClipboardList, 
  FaMicrophone,
  FaPlay,
  FaPause,
  FaCheck,
  FaStar,
  FaBookmark,
  FaEye,
  FaEyeSlash,
  FaRocket,
  FaFire,
  FaTrophy,
  FaChevronRight,
  FaChevronDown,
  FaLightbulb,
  FaHeart,
  FaGraduationCap
} from 'react-icons/fa';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';

// 🎯 Enhanced Lesson Header
export function LessonHero({ 
  lessonNumber, 
  title, 
  level = "N5",
  progress = 0,
  onStartLesson 
}: {
  lessonNumber: string;
  title?: string;
  level?: string;
  progress?: number;
  onStartLesson?: () => void;
}) {
  return (
    <div className="relative mb-12 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float floating-delayed" />
      </div>

      <div className="relative z-10 py-16 px-8 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white border-white/30">
            <FaGraduationCap className="mr-2" />
            JLPT {level} Course
          </Badge>
          
          <h1 className="text-6xl font-bold mb-4 flex items-center justify-center gap-4">
            <span className="text-yellow-300">第{lessonNumber}課</span>
            <HiSparkles className="text-yellow-300 animate-pulse" />
          </h1>
          
          {title && (
            <h2 className="text-2xl text-white/90 mb-6">{title}</h2>
          )}

          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-white/80">Lesson Progress</span>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {Math.round(progress)}%
              </Badge>
            </div>
            <div className="max-w-md mx-auto">
              <Progress value={progress} className="h-3 bg-white/20" />
            </div>
          </div>

          {/* Action Button */}
          {onStartLesson && (
            <Button
              onClick={onStartLesson}
              size="lg"
              className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <FaRocket className="mr-2" />
              {progress > 0 ? 'Continue Learning' : 'Start Lesson'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// 📖 Interactive Vocabulary Card
export function VocabularyCard({ 
  vocabulary, 
  onComplete 
}: { 
  vocabulary: any[]; 
  onComplete?: () => void; 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [masteredWords, setMasteredWords] = useState<Set<number>>(new Set());
  const [mode, setMode] = useState<'table' | 'flashcard'>('table');

  const currentWord = vocabulary[currentIndex];
  const masteryProgress = (masteredWords.size / vocabulary.length) * 100;

  const markAsMastered = (index: number) => {
    const newMastered = new Set(masteredWords);
    newMastered.add(index);
    setMasteredWords(newMastered);
    
    if (newMastered.size === vocabulary.length) {
      onComplete?.();
    }
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % vocabulary.length);
    setShowMeaning(false);
  };

  return (
    <AnimatedSection>
      <InteractiveCard hoverEffect="lift" glowColor="emerald" className="mb-8">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-3">
              <FaBook />
              Vocabulary ({vocabulary.length} words)
            </CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setMode(mode === 'table' ? 'flashcard' : 'table')}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                {mode === 'table' ? <FaFire className="mr-1" /> : <FaBook className="mr-1" />}
                {mode === 'table' ? 'Flashcards' : 'Table View'}
              </Button>
            </div>
          </div>
          
          {/* Mastery Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Mastery Progress</span>
              <span>{masteredWords.size}/{vocabulary.length}</span>
            </div>
            <Progress value={masteryProgress} className="h-2 bg-white/20" />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {mode === 'table' ? (
            // Table Mode
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700">
                    <th className="py-3 px-4 text-left font-semibold">Word</th>
                    <th className="py-3 px-4 text-left font-semibold">Kanji</th>
                    <th className="py-3 px-4 text-left font-semibold">Meaning</th>
                    <th className="py-3 px-4 text-center font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vocabulary.map((vocab, index) => (
                    <tr 
                      key={index} 
                      className={`
                        border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200
                        ${masteredWords.has(index) ? 'bg-green-50' : ''}
                      `}
                    >
                      <td className="py-4 px-4 font-medium text-lg">{vocab.content}</td>
                      <td className="py-4 px-4 text-gray-600">{vocab.kanji || '-'}</td>
                      <td className="py-4 px-4 text-gray-800">{vocab.meaning}</td>
                      <td className="py-4 px-4 text-center">
                        {masteredWords.has(index) ? (
                          <Badge className="bg-green-500 hover:bg-green-600">
                            <FaCheck className="mr-1" />
                            Mastered
                          </Badge>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsMastered(index)}
                            className="hover:bg-green-50 hover:border-green-300"
                          >
                            <FaHeart className="mr-1" />
                            Mark
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Flashcard Mode
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <Badge variant="secondary" className="mb-4">
                  Card {currentIndex + 1} of {vocabulary.length}
                </Badge>
                
                <div onClick={() => setShowMeaning(!showMeaning)}>
                  <InteractiveCard 
                    hoverEffect="tilt" 
                    className="h-64 cursor-pointer"
                  >
                    <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50">
                    {!showMeaning ? (
                      <>
                        <div className="text-4xl font-bold text-gray-900 mb-4">
                          {currentWord.content}
                        </div>
                        {currentWord.kanji && (
                          <div className="text-2xl text-gray-600 mb-4">
                            {currentWord.kanji}
                          </div>
                        )}
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <FaEye />
                          Click to reveal meaning
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-3xl font-bold text-blue-600 mb-4">
                          {currentWord.meaning}
                        </div>
                        <div className="text-lg text-gray-600 mb-4">
                          {currentWord.content}
                          {currentWord.kanji && ` (${currentWord.kanji})`}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <FaEyeSlash />
                          Click to hide
                        </div>
                      </>
                    )}
                    </div>
                  </InteractiveCard>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={nextCard}
                  className="flex-1 hover:bg-blue-50"
                >
                  <FaChevronRight className="mr-2" />
                  Next Card
                </Button>
                <Button
                  onClick={() => {
                    markAsMastered(currentIndex);
                    nextCard();
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  disabled={masteredWords.has(currentIndex)}
                >
                  <FaCheck className="mr-2" />
                  {masteredWords.has(currentIndex) ? 'Mastered' : 'Got it!'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </InteractiveCard>
    </AnimatedSection>
  );
}

// 📝 Interactive Grammar Section
export function GrammarSection({ 
  grammar, 
  onComplete 
}: { 
  grammar: any[]; 
  onComplete?: () => void; 
}) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const markCompleted = (index: number) => {
    const newCompleted = new Set(completedItems);
    newCompleted.add(index);
    setCompletedItems(newCompleted);
    
    if (newCompleted.size === grammar.length) {
      onComplete?.();
    }
  };

  const completionProgress = (completedItems.size / grammar.length) * 100;

  return (
    <AnimatedSection>
      <InteractiveCard hoverEffect="lift" glowColor="purple" className="mb-8">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-3">
              <FaPen />
              Grammar Points ({grammar.length})
            </CardTitle>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {Math.round(completionProgress)}% Complete
            </Badge>
          </div>
          
          <div className="mt-4">
            <Progress value={completionProgress} className="h-2 bg-white/20" />
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {grammar.map((grammarPoint, index) => (
            <InteractiveCard 
              key={index} 
              hoverEffect="scale"
              className={`
                transition-all duration-300 
                ${completedItems.has(index) ? 'ring-2 ring-green-500 bg-green-50' : ''}
              `}
            >
              <div className="p-6">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleExpanded(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-700 mb-1">
                        {grammarPoint.content}
                      </h3>
                      <p className="text-gray-600">
                        {grammarPoint.meaning}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {completedItems.has(index) && (
                      <Badge className="bg-green-500">
                        <FaCheck className="mr-1" />
                        Learned
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      {expandedItems.has(index) ? <FaChevronDown /> : <FaChevronRight />}
                    </Button>
                  </div>
                </div>

                {expandedItems.has(index) && (
                  <div className="mt-6 pt-6 border-t border-gray-200 animate-slide-down">
                    {grammarPoint.example && (
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <FaLightbulb className="text-blue-500" />
                          <span className="font-semibold text-blue-700">Example:</span>
                        </div>
                        <p className="text-gray-800 mb-2">{grammarPoint.example}</p>
                        {grammarPoint.translation_example && (
                          <p className="text-gray-600 italic">
                            Translation: {grammarPoint.translation_example}
                          </p>
                        )}
                      </div>
                    )}

                    {grammarPoint.additional_notes && (
                      <div className="mb-4 p-4 bg-yellow-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                                                <FaStar className="text-yellow-500" />
                      <span className="font-semibold text-yellow-700">Notes:</span>
                        </div>
                        <p className="text-gray-700">{grammarPoint.additional_notes}</p>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button
                        onClick={() => markCompleted(index)}
                        disabled={completedItems.has(index)}
                        className={
                          completedItems.has(index) 
                            ? "bg-green-500 hover:bg-green-600" 
                            : "bg-purple-500 hover:bg-purple-600"
                        }
                      >
                        {completedItems.has(index) ? (
                          <>
                            <FaCheck className="mr-2" />
                            Learned
                          </>
                        ) : (
                          <>
                            <FaTrophy className="mr-2" />
                            Mark as Learned
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </InteractiveCard>
          ))}
        </CardContent>
      </InteractiveCard>
    </AnimatedSection>
  );
}

// 🎧 Enhanced Audio Section
export function AudioSection({ 
  audioUrl, 
  transcript, 
  onComplete 
}: { 
  audioUrl?: string; 
  transcript?: string; 
  onComplete?: () => void; 
}) {
  const [hasListened, setHasListened] = useState(false);
  const [transcriptVisible, setTranscriptVisible] = useState(false);

  return (
    <AnimatedSection>
      <InteractiveCard hoverEffect="glow" glowColor="blue" className="mb-8">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-xl">
          <CardTitle className="text-2xl flex items-center gap-3">
            <FaHeadphones />
            Audio & Conversation
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          {audioUrl && (
            <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg">
                  <FaPlay className="w-8 h-8" />
                </div>
              </div>
              <div className="text-center">
                <audio 
                  controls 
                  className="mx-auto mb-4"
                  onPlay={() => setHasListened(true)}
                >
                  <source src={audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                {hasListened && (
                  <Badge className="bg-green-500">
                    <FaCheck className="mr-1" />
                    Listened
                  </Badge>
                )}
              </div>
            </div>
          )}

          {transcript && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <FaMicrophone className="text-blue-500" />
                  Transcript
                </h3>
                <Button
                  variant="outline"
                  onClick={() => setTranscriptVisible(!transcriptVisible)}
                  className="hover:bg-blue-50"
                >
                  {transcriptVisible ? <FaEyeSlash className="mr-2" /> : <FaEye className="mr-2" />}
                  {transcriptVisible ? 'Hide' : 'Show'} Transcript
                </Button>
              </div>

              {transcriptVisible && (
                <div className="p-6 bg-gray-50 rounded-xl animate-slide-down">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
                    {transcript}
                  </p>
                </div>
              )}
            </div>
          )}

          {hasListened && onComplete && (
            <div className="mt-6 text-center">
              <Button
                onClick={onComplete}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <FaCheck className="mr-2" />
                Complete Audio Section
              </Button>
            </div>
          )}
        </CardContent>
      </InteractiveCard>
    </AnimatedSection>
  );
}

// 📊 Lesson Progress Sidebar
export function LessonProgressSidebar({ 
  sections = [], 
  currentSection = 0,
  onSectionClick 
}: {
  sections: Array<{ id: string; name: string; icon: any; completed: boolean }>;
  currentSection?: number;
  onSectionClick?: (index: number) => void;
}) {
  const completedCount = sections.filter(s => s.completed).length;
  const progress = (completedCount / sections.length) * 100;

  return (
    <div className="sticky top-8">
      <GlassCard className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaClipboardList className="text-purple-500" />
          Lesson Progress
        </h3>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Overall Progress</span>
            <span className="text-sm font-semibold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="space-y-3">
          {sections.map((section, index) => (
            <div
              key={section.id}
              onClick={() => onSectionClick?.(index)}
              className={`
                flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                ${currentSection === index 
                  ? 'bg-blue-500 text-white shadow-lg' 
                  : section.completed 
                    ? 'bg-green-50 hover:bg-green-100 text-green-700'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }
              `}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${currentSection === index 
                  ? 'bg-white/20' 
                  : section.completed 
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200'
                }
              `}>
                {section.completed ? (
                  <FaCheck className="w-4 h-4" />
                ) : (
                  <section.icon className="w-4 h-4" />
                )}
              </div>
              <span className="font-medium">{section.name}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}