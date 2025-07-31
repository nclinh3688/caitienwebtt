"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  PlayIcon, 
  PauseIcon, 
  BackwardIcon, 
  ForwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';
import { 
  getLessonProgress,
  updateLastPosition,
  updateTimeSpent,
  markLessonCompleted,
  incrementPlayCount
} from '@/lib/progress';

interface TranscriptItem {
  speaker: string;
  japanese: string;
  vietnamese: string;
  time: string;
}

interface Lesson {
  id: number;
  title: string;
  level: string;
  url: string;
  description: string;
  duration: string;
  vocabulary: string[];
  transcript: TranscriptItem[];
}

interface AudioPlayerProps {
  lesson: Lesson;
  onClose: () => void;
}

export default function AudioPlayer({ lesson, onClose }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showTranscript, setShowTranscript] = useState(true);
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [progress, setProgress] = useState(() => getLessonProgress(lesson.id));
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
  const [lastTimeUpdate, setLastTimeUpdate] = useState(Date.now());

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
      
      // Resume from last position if available
      if (progress.lastPosition > 0 && audio.currentTime === 0) {
        audio.currentTime = progress.lastPosition;
      }
    };

    const setAudioTime = () => {
      const time = audio.currentTime;
      setCurrentTime(time);
      
      // Update progress tracking every 5 seconds
      const now = Date.now();
      if (now - lastTimeUpdate > 5000) {
        updateLastPosition(lesson.id, time);
        setLastTimeUpdate(now);
        
        // Update progress state
        setProgress(getLessonProgress(lesson.id));
      }
    };

    const handleAudioEnd = () => {
      // Mark as completed when audio ends
      markLessonCompleted(lesson.id);
      setProgress(getLessonProgress(lesson.id));
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleAudioEnd);

    // Increment play count
    incrementPlayCount(lesson.id);

    // Auto play when component mounts
    audio.play().then(() => {
      setIsPlaying(true);
      setSessionStartTime(Date.now());
    }).catch(console.error);

    return () => {
      // Save time spent when component unmounts
      const timeSpent = (Date.now() - sessionStartTime) / 1000;
      updateTimeSpent(lesson.id, timeSpent);
      
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleAudioEnd);
    };
  }, [lesson.id, progress.lastPosition, lastTimeUpdate, sessionStartTime]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changePlaybackRate = (rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const audioProgress = duration ? (currentTime / duration) * 100 : 0;

  const handleMarkCompleted = () => {
    markLessonCompleted(lesson.id);
    setProgress(getLessonProgress(lesson.id));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{lesson.title}</h2>
                {progress.completed && (
                  <CheckCircleIcon className="w-6 h-6 text-green-400" />
                )}
              </div>
              <p className="text-blue-100 mb-3">{lesson.description}</p>
              <div className="flex items-center gap-4 text-sm mb-3">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">{lesson.level}</span>
                <span>{lesson.duration}</span>
                <span>🎧 {progress.playCount} lần nghe</span>
                {progress.timeSpent > 0 && (
                  <span>⏱️ {Math.round(progress.timeSpent / 60)}m</span>
                )}
              </div>
              
              {/* Progress indicator */}
              {!progress.completed && audioProgress > 10 && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white bg-opacity-20 rounded-full h-2">
                    <div 
                      className="bg-green-400 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                  <span className="text-sm">{Math.round(audioProgress)}%</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {!progress.completed && audioProgress > 80 && (
                <button
                  onClick={handleMarkCompleted}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  Hoàn thành
                </button>
              )}
              <button
                onClick={onClose}
                className="text-white hover:text-gray-300 text-2xl"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="p-6 border-b">
          <audio ref={audioRef} src={lesson.url} preload="metadata" />
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={audioProgress}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => skipTime(-10)}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <BackwardIcon className="w-6 h-6 text-gray-700" />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              {isPlaying ? (
                <PauseIcon className="w-8 h-8" />
              ) : (
                <PlayIcon className="w-8 h-8" />
              )}
            </button>
            
            <button
              onClick={() => skipTime(10)}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ForwardIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center justify-between">
            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button onClick={toggleMute}>
                {isMuted ? (
                  <SpeakerXMarkIcon className="w-5 h-5 text-gray-600" />
                ) : (
                  <SpeakerWaveIcon className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume * 100}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Speed Control */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Speed:</span>
              {[0.5, 0.75, 1, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => changePlaybackRate(rate)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    playbackRate === rate
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => {setShowTranscript(true); setShowVocabulary(false);}}
              className={`px-6 py-3 font-medium transition-colors ${
                showTranscript
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Transcript
            </button>
            <button
              onClick={() => {setShowVocabulary(true); setShowTranscript(false);}}
              className={`px-6 py-3 font-medium transition-colors ${
                showVocabulary
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Vocabulary ({lesson.vocabulary.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {showTranscript && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Hội thoại</h3>
              {lesson.transcript.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                      {item.speaker}
                    </span>
                    <span className="text-gray-500 text-sm">{item.time}</span>
                  </div>
                  <div className="mb-2">
                    <p className="text-lg font-medium text-gray-900 mb-1">{item.japanese}</p>
                    <p className="text-gray-600">{item.vietnamese}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showVocabulary && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Từ vựng quan trọng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lesson.vocabulary.map((word, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xl font-bold text-gray-900 mb-2">{word}</p>
                    <p className="text-gray-600">Nghĩa: [Cần thêm dữ liệu từ điển]</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}