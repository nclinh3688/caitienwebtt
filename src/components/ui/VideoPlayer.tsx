'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  RotateCcw,
  RotateCw,
  Maximize,
  Minimize,
  Settings
} from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  className?: string;
  showControls?: boolean;
  showProgress?: boolean;
  showVolume?: boolean;
  showFullscreen?: boolean;
}

export function VideoPlayer({
  src,
  poster,
  title,
  autoPlay = false,
  loop = false,
  muted = false,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  className = '',
  showControls = true,
  showProgress = true,
  showVolume = true,
  showFullscreen = true
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControlsOverlay, setShowControlsOverlay] = useState(false);

  // Format time helper
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle play/pause
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isPlaying]);

  // Handle skip forward/backward
  const skip = useCallback((direction: 'forward' | 'backward') => {
    if (videoRef.current) {
      const skipTime = direction === 'forward' ? 10 : -10;
      videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + skipTime));
    }
  }, [currentTime, duration]);

  // Handle volume change
  const handleVolumeChange = useCallback((newVolume: number[]) => {
    const vol = newVolume[0];
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setIsMuted(vol === 0);
    }
  }, []);

  // Handle mute toggle
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  }, [isMuted, volume]);

  // Handle progress change
  const handleProgressChange = useCallback((newProgress: number[]) => {
    const newTime = newProgress[0];
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  }, []);

  // Handle fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
      setError(null);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onTimeUpdate?.(video.currentTime);
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
      setError('Failed to load video');
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setError(null);
    };

    // Add event listeners
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);

    // Set initial volume and muted state
    video.volume = volume;
    video.muted = isMuted;

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, [onPlay, onPause, onEnded, onTimeUpdate, volume, isMuted]);

  // Auto-play effect
  useEffect(() => {
    if (autoPlay && videoRef.current && !isLoading) {
      videoRef.current.play().catch(() => {
        // Auto-play was prevented
      });
    }
  }, [autoPlay, isLoading]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

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
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div 
          ref={containerRef}
          className="relative group"
          onMouseEnter={() => setShowControlsOverlay(true)}
          onMouseLeave={() => setShowControlsOverlay(false)}
        >
          {/* Video element */}
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            loop={loop}
            muted={isMuted}
            preload="metadata"
            className="w-full h-auto"
            onClick={togglePlay}
          />

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
            </div>
          )}

          {/* Controls overlay */}
          {showControls && showControlsOverlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
              {/* Title */}
              {title && (
                <div className="absolute top-4 left-4 text-white">
                  <h3 className="font-medium">{title}</h3>
                </div>
              )}

              {/* Progress bar */}
              {showProgress && (
                <div className="absolute bottom-16 left-4 right-4">
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={0.1}
                    onValueChange={handleProgressChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-white mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              )}

              {/* Control buttons */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlay}
                    disabled={isLoading}
                    className="text-white hover:bg-white/20"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                    ) : isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => skip('backward')}
                    disabled={isLoading}
                    className="text-white hover:bg-white/20"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => skip('forward')}
                    disabled={isLoading}
                    className="text-white hover:bg-white/20"
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>

                  {showVolume && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMute}
                        disabled={isLoading}
                        className="text-white hover:bg-white/20"
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
                        className="w-20"
                      />
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {showFullscreen && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleFullscreen}
                      className="text-white hover:bg-white/20"
                    >
                      {isFullscreen ? (
                        <Minimize className="h-4 w-4" />
                      ) : (
                        <Maximize className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default VideoPlayer; 