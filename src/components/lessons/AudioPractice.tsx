'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff,
  CheckCircle,
  XCircle,
  Star,
  Target,
  Headphones,
  Activity,
  SkipBack,
  SkipForward
} from 'lucide-react';

interface AudioItem {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  duration: number;
  type: 'pronunciation' | 'conversation' | 'vocabulary' | 'grammar';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  transcript?: string;
  translation?: string;
}

interface AudioPracticeProps {
  audioItems: AudioItem[];
  onComplete: (progress: { [key: string]: boolean }) => void;
  onClose: () => void;
}

export default function AudioPractice({ audioItems, onComplete, onClose }: AudioPracticeProps) {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'listen' | 'repeat' | 'shadow'>('listen');
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({});

  const audioRef = useRef<HTMLAudioElement>(null);
  const currentAudio = audioItems[currentAudioIndex];

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleSkipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, currentTime - 10);
    }
  };

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, currentTime + 10);
    }
  };

  const handlePreviousAudio = () => {
    if (currentAudioIndex > 0) {
      setCurrentAudioIndex(prev => prev - 1);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleNextAudio = () => {
    if (currentAudioIndex < audioItems.length - 1) {
      setCurrentAudioIndex(prev => prev + 1);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log('Recording stopped');
  };

  const handleComplete = () => {
    onComplete(progress);
    onClose();
  };

  const completedCount = Object.values(progress).filter(Boolean).length;
  const totalCount = audioItems.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Headphones className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">Luyện nghe & Phát âm</h2>
              <p className="text-sm text-gray-600">
                Bài {currentAudioIndex + 1} / {audioItems.length}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Tiến độ</span>
            <span>{completedCount}/{totalCount} hoàn thành</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Audio Player */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{currentAudio.title}</h3>
            <p className="text-gray-600 mb-4">{currentAudio.description}</p>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentAudio.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                currentAudio.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {currentAudio.difficulty === 'beginner' ? 'Sơ cấp' :
                 currentAudio.difficulty === 'intermediate' ? 'Trung cấp' : 'Cao cấp'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {currentAudio.type === 'pronunciation' ? 'Phát âm' :
                 currentAudio.type === 'conversation' ? 'Hội thoại' :
                 currentAudio.type === 'vocabulary' ? 'Từ vựng' : 'Ngữ pháp'}
              </span>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={handleSkipBack}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <SkipBack className="w-5 h-5 text-gray-600" />
            </button>

            <button
              onClick={handlePlayPause}
              className="p-4 rounded-full bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-110"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
            </button>

            <button
              onClick={handleSkipForward}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <SkipForward className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Volume Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleMuteToggle}
              className="p-2 rounded-lg hover:bg-white hover:shadow-md transition-all"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-gray-600" /> : <Volume2 className="w-5 h-5 text-gray-600" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={currentAudio.fileUrl}
            preload="metadata"
          />
        </div>

        {/* Practice Mode Selection */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Chế độ luyện tập:</h4>
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: 'listen', label: 'Chỉ nghe', icon: Headphones },
              { key: 'repeat', label: 'Lặp lại', icon: Mic },
              { key: 'shadow', label: 'Shadowing', icon: Activity }
            ].map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.key}
                  onClick={() => setPracticeMode(mode.key as any)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    practiceMode === mode.key
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recording Section */}
        {(practiceMode === 'repeat' || practiceMode === 'shadow') && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Mic className="w-5 h-5 text-green-600" />
              Ghi âm phát âm của bạn
            </h4>
            
            <div className="text-center mb-4">
              {isRecording ? (
                <div className="flex items-center justify-center gap-4">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 font-semibold">Đang ghi âm...</span>
                </div>
              ) : (
                <p className="text-gray-600">
                  {practiceMode === 'repeat' 
                    ? 'Nghe và lặp lại chính xác' 
                    : 'Nghe và đọc cùng lúc với audio'}
                </p>
              )}
            </div>

            <div className="flex justify-center gap-4">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Mic className="w-5 h-5" />
                  Bắt đầu ghi âm
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <MicOff className="w-5 h-5" />
                  Dừng ghi âm
                </button>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePreviousAudio}
            disabled={currentAudioIndex === 0}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <SkipBack className="w-4 h-4" />
            Bài trước
          </button>

          <button
            onClick={handleComplete}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Hoàn thành
          </button>

          <button
            onClick={handleNextAudio}
            disabled={currentAudioIndex === audioItems.length - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Bài tiếp theo
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
