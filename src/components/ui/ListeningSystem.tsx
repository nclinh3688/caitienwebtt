'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { InteractiveCard } from '@/components/ui/MicroInteractions';
import { GlassCard, AnimatedSection } from '@/components/ui/MagicEffects';
import { 
  FaPlay, 
  FaPause, 
  FaStop,
  FaForward,
  FaBackward,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeOff,
  FaBookmark,
  FaDownload,
  FaShare,
  FaHeart,
  FaHeadphones,
  FaMusic,
  FaClock,
  FaEye,
  FaEyeSlash,
  FaRedo,
  FaFastForward,
  FaTachometerAlt,
  FaWaveSquare,
  FaChartLine,
  FaStar,
  FaFire,
  FaTrophy,
  FaCheckCircle
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

interface AudioLesson {
  id: number;
  title: string;
  level: string;
  url: string;
  duration?: number;
  transcript?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  tags?: string[];
}

interface SongData {
  title: string;
  artist: string;
  audio: string;
  video?: string;
  lyrics: Array<{
    start: number;
    end: number;
    jp: string;
    vn: string;
  }>;
  transcript?: string;
  quiz?: Array<{
    question: string;
    options: string[];
    answer: number;
  }>;
}

// 🎧 Premium Audio Hero Section
export function AudioHero({ 
  title = "Premium Listening Experience",
  subtitle = "Master Japanese through immersive audio content",
  stats 
}: {
  title?: string;
  subtitle?: string;
  stats?: { lessons: number; hours: number; completed: number };
}) {
  return (
    <div className="relative mb-12 overflow-hidden">
      {/* Background with audio wave pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float floating-delayed" />
      </div>

      <div className="relative z-10 py-16 px-8 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <FaHeadphones className="text-cyan-300" />
            <span className="font-medium">Audio Learning Hub</span>
            <HiSparkles className="text-yellow-300 animate-pulse" />
          </div>
          
          <h1 className="text-6xl font-bold mb-6">
            {title}
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* Stats Display */}
          {stats && (
            <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
              <GlassCard className="p-4 text-center">
                <div className="text-2xl font-bold mb-1">{stats.lessons}</div>
                <div className="text-sm text-white/80">Lessons</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <div className="text-2xl font-bold mb-1">{stats.hours}h</div>
                <div className="text-sm text-white/80">Content</div>
              </GlassCard>
              <GlassCard className="p-4 text-center">
                <div className="text-2xl font-bold mb-1">{stats.completed}%</div>
                <div className="text-sm text-white/80">Progress</div>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🎵 Premium Audio Player Component
export function PremiumAudioPlayer({ 
  audioUrl, 
  title, 
  onTimeUpdate,
  onProgress,
  showTranscript = false 
}: {
  audioUrl: string;
  title: string;
  onTimeUpdate?: (currentTime: number) => void;
  onProgress?: (progress: number) => void;
  showTranscript?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>([]);

  // Generate mock waveform data
  useEffect(() => {
    const mockWaveform = Array.from({ length: 100 }, () => Math.random() * 100);
    setWaveformData(mockWaveform);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      setCurrentTime(current);
      onTimeUpdate?.(current);
      
      if (duration > 0) {
        const progress = (current / duration) * 100;
        onProgress?.(progress);
      }
    }
  };

  const handleLoadedData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const changeVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <GlassCard className="p-6 mb-6">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        loop={isLooping}
        hidden
      />

      {/* Player Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaClock />
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            <Badge variant="secondary" className="ml-2">
              {playbackRate}x speed
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <FaBookmark />
          </Button>
          <Button size="sm" variant="outline">
            <FaShare />
          </Button>
          <Button size="sm" variant="outline">
            <FaDownload />
          </Button>
        </div>
      </div>

      {/* Waveform Visualization */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
        <div className="flex items-end justify-center gap-1 h-24 cursor-pointer">
          {waveformData.map((height, index) => (
            <div
              key={index}
              className={`
                w-2 transition-all duration-200 rounded-t
                ${index / waveformData.length <= progressPercentage / 100
                  ? 'bg-gradient-to-t from-purple-500 to-blue-500'
                  : 'bg-gray-300'
                }
              `}
              style={{ height: `${height}%` }}
              onClick={() => seek((index / waveformData.length) * duration)}
            />
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          size="sm"
          variant="outline"
          onClick={() => seek(Math.max(0, currentTime - 10))}
        >
          <FaBackward />
        </Button>
        
        <Button
          size="lg"
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          {isPlaying ? <FaPause className="text-2xl" /> : <FaPlay className="text-2xl ml-1" />}
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => seek(Math.min(duration, currentTime + 10))}
        >
          <FaForward />
        </Button>
      </div>

      {/* Secondary Controls */}
      <div className="flex items-center justify-between">
        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <FaVolumeUp className="text-gray-600" />
          <div className="w-24">
            <Progress 
              value={volume * 100} 
              className="h-2 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const newVolume = x / rect.width;
                changeVolume(Math.max(0, Math.min(1, newVolume)));
              }}
            />
          </div>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-2">
          <FaTachometerAlt className="text-gray-600" />
          <div className="flex gap-1">
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
              <Button
                key={rate}
                size="sm"
                variant={playbackRate === rate ? "default" : "outline"}
                onClick={() => changePlaybackRate(rate)}
                className="text-xs px-2"
              >
                {rate}x
              </Button>
            ))}
          </div>
        </div>

        {/* Loop Toggle */}
        <Button
          size="sm"
          variant={isLooping ? "default" : "outline"}
          onClick={() => setIsLooping(!isLooping)}
        >
          <FaRedo />
        </Button>
      </div>
    </GlassCard>
  );
}

// 📝 Interactive Transcript Component
export function InteractiveTranscript({ 
  lyrics, 
  currentTime,
  onSeek 
}: {
  lyrics: Array<{ start: number; end: number; jp: string; vn: string }>;
  currentTime: number;
  onSeek: (time: number) => void;
}) {
  const [showTranslation, setShowTranslation] = useState(true);
  const currentLyricIndex = lyrics.findIndex(
    lyric => currentTime >= lyric.start && currentTime <= lyric.end
  );

  return (
    <InteractiveCard hoverEffect="lift" className="mb-6">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-xl">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FaEye />
            Interactive Transcript
          </CardTitle>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setShowTranslation(!showTranslation)}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            {showTranslation ? <FaEyeSlash className="mr-1" /> : <FaEye className="mr-1" />}
            {showTranslation ? 'Hide' : 'Show'} Translation
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 max-h-80 overflow-y-auto">
        <div className="space-y-4">
          {lyrics.map((lyric, index) => (
            <div
              key={index}
              onClick={() => onSeek(lyric.start)}
              className={`
                p-4 rounded-lg cursor-pointer transition-all duration-300
                ${index === currentLyricIndex
                  ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-l-4 border-purple-500 shadow-lg scale-105'
                  : 'bg-gray-50 hover:bg-gray-100 border-l-4 border-transparent'
                }
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="font-bold text-lg text-gray-900">
                  {lyric.jp}
                </div>
                <Badge variant="outline" className="text-xs">
                  {Math.floor(lyric.start)}s
                </Badge>
              </div>
              {showTranslation && (
                <div className="text-gray-600 italic">
                  {lyric.vn}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </InteractiveCard>
  );
}

// 🎵 Audio Lesson Card
export function AudioLessonCard({ 
  lesson, 
  isPlaying = false, 
  onPlay, 
  onLike,
  isLiked = false 
}: {
  lesson: AudioLesson;
  isPlaying?: boolean;
  onPlay: () => void;
  onLike?: () => void;
  isLiked?: boolean;
}) {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <InteractiveCard 
      hoverEffect="lift" 
      glowColor="purple"
      className={`
        transition-all duration-300 cursor-pointer
        ${isPlaying ? 'ring-2 ring-purple-500 bg-purple-50' : ''}
      `}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Badge className={`${getDifficultyColor(lesson.difficulty)} text-white`}>
                {lesson.level}
              </Badge>
              {lesson.difficulty && (
                <Badge variant="outline">
                  {lesson.difficulty}
                </Badge>
              )}
              {lesson.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              {lesson.title}
            </h3>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <FaClock />
                <span>{lesson.duration ? `${Math.floor(lesson.duration / 60)}:${(lesson.duration % 60).toString().padStart(2, '0')}` : '2:30'}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaHeadphones />
                <span>Japanese</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <Button
              onClick={onPlay}
              size="lg"
              className={`
                w-16 h-16 rounded-full transition-all duration-300
                ${isPlaying 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse' 
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                }
              `}
            >
              {isPlaying ? <FaPause className="text-xl" /> : <FaPlay className="text-xl ml-1" />}
            </Button>
            
            {onLike && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onLike}
                className={isLiked ? 'text-red-500' : 'text-gray-400'}
              >
                <FaHeart />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </InteractiveCard>
  );
}

// 📊 Listening Progress Sidebar
export function ListeningProgressSidebar({ 
  stats = { totalLessons: 50, completed: 23, streak: 7, totalHours: 12.5 },
  achievements = []
}: {
  stats?: { totalLessons: number; completed: number; streak: number; totalHours: number };
  achievements?: Array<{ icon: any; title: string; unlocked: boolean }>;
}) {
  const progressPercentage = (stats.completed / stats.totalLessons) * 100;

  return (
    <div className="sticky top-8 space-y-6">
      {/* Progress Overview */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaChartLine className="text-purple-500" />
          Your Progress
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Lessons Completed</span>
              <span className="text-sm font-semibold">{stats.completed}/{stats.totalLessons}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.streak}</div>
              <div className="text-xs text-gray-600">Day Streak</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.totalHours}h</div>
              <div className="text-xs text-gray-600">Total Time</div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Quick Achievements */}
      <GlassCard className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          Achievements
        </h3>
        
        <div className="space-y-3">
          {[
            { icon: FaFire, title: "First Lesson", unlocked: true },
            { icon: FaStar, title: "5 Day Streak", unlocked: true },
            { icon: FaCheckCircle, title: "10 Lessons", unlocked: false },
            { icon: FaTrophy, title: "Speed Learner", unlocked: false }
          ].map((achievement, index) => (
            <div
              key={index}
              className={`
                flex items-center gap-3 p-2 rounded-lg transition-all duration-200
                ${achievement.unlocked 
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50' 
                  : 'bg-gray-50 opacity-60'
                }
              `}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${achievement.unlocked 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' 
                  : 'bg-gray-200 text-gray-400'
                }
              `}>
                <achievement.icon className="w-4 h-4" />
              </div>
              <span className={`text-sm font-medium ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                {achievement.title}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}