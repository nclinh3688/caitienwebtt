
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  RotateCcw,
  RotateCw
} from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  className?: string;
  showControls?: boolean;
  showProgress?: boolean;
  showVolume?: boolean;
}

export function AudioPlayer({
  src,
  title,
  autoPlay = false,
  loop = false,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  className = '',
  showControls = true,
  showProgress = true,
  showVolume = true
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Format time helper
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle play/pause
  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }, [isPlaying]);

  // Handle skip forward/backward
  const skip = useCallback((direction: 'forward' | 'backward') => {
    if (audioRef.current) {
      const skipTime = direction === 'forward' ? 10 : -10;
      audioRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + skipTime));
    }
  }, [currentTime, duration]);

  // Handle volume change
  const handleVolumeChange = useCallback((newVolume: number[]) => {
    const vol = newVolume[0];
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
      setIsMuted(vol === 0);
    }
  }, []);

  // Handle mute toggle
  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  }, [isMuted, volume]);

  // Handle progress change
  const handleProgressChange = useCallback((newProgress: number[]) => {
    const newTime = newProgress[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  }, []);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
      setError(null);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      onTimeUpdate?.(audio.currentTime);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleError = () => {
      setError('Failed to load audio');
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    // Add event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);

    // Set initial volume
    audio.volume = volume;

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
    };
  }, [onPlay, onPause, onEnded, onTimeUpdate, volume]);

  // Auto-play effect
  useEffect(() => {
    if (autoPlay && audioRef.current && !isLoading) {
      audioRef.current.play().catch(() => {
        // Auto-play was prevented
      });
    }
  }, [autoPlay, isLoading]);

  if (error) {
    return (
      <Card className={`p-4 ${className}`}>
        <CardContent className="text-center text-red-500">
          <p>❌ {error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`p-4 ${className}`}>
      <CardContent className="space-y-4">
        {/* Title */}
        {title && (
          <div className="text-center">
            <h3 className="font-medium text-lg">{title}</h3>
          </div>
        )}

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          src={src}
          loop={loop}
          preload="metadata"
        />

        {/* Progress bar */}
        {showProgress && (
          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={handleProgressChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}

        {/* Controls */}
        {showControls && (
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => skip('backward')}
              disabled={isLoading}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={togglePlay}
              disabled={isLoading}
              className="rounded-full w-12 h-12"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
              ) : isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => skip('forward')}
              disabled={isLoading}
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Volume control */}
        {showVolume && (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              disabled={isLoading}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={1}
              step={0.1}
              onValueChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AudioPlayer;
