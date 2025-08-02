'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaVolumeMute,
  FaMicrophone,
  FaMicrophoneSlash,
  FaDownload,
  FaHeadphones,
  FaMusic,
  FaClock,
  FaRedo
} from 'react-icons/fa';

interface AudioIntegrationProps {
  audioUrl?: string;
  word?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  autoPlay?: boolean;
  showControls?: boolean;
  className?: string;
}

export default function AudioIntegration({
  audioUrl,
  word,
  onPlay,
  onPause,
  onEnd,
  autoPlay = false,
  showControls = true,
  className = ''
}: AudioIntegrationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [userAudio, setUserAudio] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (autoPlay && audioUrl) {
      playAudio();
    }
  }, [audioUrl, autoPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onEnd?.();
    };
    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };
    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
      setError('Không thể phát âm thanh');
      setIsLoading(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [onPlay, onPause, onEnd]);

  const playAudio = async () => {
    if (!audioRef.current) return;

    try {
      setError(null);
      setIsLoading(true);
      await audioRef.current.play();
    } catch (err) {
      setError('Không thể phát âm thanh');
      setIsLoading(false);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const restartAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      playAudio();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setUserAudio(url);
        setIsRecording(false);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError('Không thể truy cập microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const downloadAudio = () => {
    if (userAudio) {
      const a = document.createElement('a');
      a.href = userAudio;
      a.download = `${word || 'pronunciation'}.wav`;
      a.click();
    }
  };

  if (!audioUrl && !showControls) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Audio Player */}
      {audioUrl && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FaHeadphones className="text-blue-600" />
              <span className="font-medium text-sm">
                {word ? `Phát âm: ${word}` : 'Phát âm'}
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              <FaClock className="mr-1" />
              {formatTime(duration)}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                onClick={togglePlayPause}
                disabled={isLoading}
                className="w-10 h-10 rounded-full p-0"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : isPlaying ? (
                  <FaPause />
                ) : (
                  <FaPlay />
                )}
              </Button>

              <Button
                variant="outline"
                onClick={restartAudio}
                className="w-8 h-8 rounded-full p-0"
              >
                <FaRedo className="text-xs" />
              </Button>

              <Button
                variant="outline"
                onClick={toggleMute}
                className="w-8 h-8 rounded-full p-0"
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <FaVolumeUp className="text-gray-400 text-xs" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>
      )}

      {/* Recording Section */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FaMicrophone className="text-blue-600" />
            <span className="font-medium text-sm">Ghi âm phát âm</span>
          </div>
          {isRecording && (
            <Badge variant="destructive" className="text-xs animate-pulse">
              Đang ghi âm...
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={toggleRecording}
            variant={isRecording ? "destructive" : "default"}
            className="flex items-center gap-2"
          >
            {isRecording ? (
              <>
                <FaMicrophoneSlash />
                Dừng ghi âm
              </>
            ) : (
              <>
                <FaMicrophone />
                Bắt đầu ghi âm
              </>
            )}
          </Button>

          {userAudio && (
            <Button
              variant="outline"
              onClick={downloadAudio}
              className="flex items-center gap-2"
            >
              <FaDownload />
              Tải xuống
            </Button>
          )}
        </div>

        {/* User Audio Player */}
        {userAudio && (
          <div className="mt-3 p-3 bg-white rounded border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Phát âm của bạn:</span>
              <Badge variant="outline" className="text-xs">
                <FaMusic className="mr-1" />
                Ghi âm
              </Badge>
            </div>
            <audio controls className="w-full" src={userAudio} />
          </div>
        )}
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
      />
    </div>
  );
} 