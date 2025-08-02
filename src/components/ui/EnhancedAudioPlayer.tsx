'use client';

import React, { useState, useRef, useEffect, memo, useCallback, useMemo } from 'react';
import { 
  FaPlay, 
  FaPause, 
  FaForward, 
  FaBackward,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeMute,
  FaRedoAlt,
  FaBookmark,
  FaCog,
  FaExpand,
  FaStepForward,
  FaStepBackward,
  FaSync
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Bookmark {
  id: string;
  time: number;
  label: string;
  note?: string;
}

interface Subtitle {
  start: number;
  end: number;
  text: string;
  translation?: string;
}

interface EnhancedAudioPlayerProps {
  src: string;
  trackTitle: string;
  subtitles?: Subtitle[];
  onNext?: () => void;
  onPrevious?: () => void;
  onEnded?: () => void;
  onBookmarkAdded?: (bookmark: Bookmark) => void;
  onProgressUpdate?: (currentTime: number, duration: number) => void;
}

export const EnhancedAudioPlayer = memo(function EnhancedAudioPlayer({ 
  src, 
  trackTitle, 
  subtitles = [],
  onNext, 
  onPrevious, 
  onEnded,
  onBookmarkAdded,
  onProgressUpdate
}: EnhancedAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  
  // Basic playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  // Enhanced features state
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [loopStart, setLoopStart] = useState<number | null>(null);
  const [loopEnd, setLoopEnd] = useState<number | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);
  const [showControls, setShowControls] = useState(true);
  
  // Touch gesture state (optimized with useMemo)
  const [touchState, setTouchState] = useState({
    startX: null as number | null,
    startY: null as number | null,
    startTime: null as number | null,
    isSeeking: false
  });
  
  // Memoized handlers for performance
  const handlePlay = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const handlePause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleSeek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  const handleSpeedChange = useCallback((speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, []);

  // Memoized progress calculation
  const progressPercentage = useMemo(() => 
    duration > 0 ? (currentTime / duration) * 100 : 0, 
    [currentTime, duration]
  );

  // Memoized time formatting
  const formatTime = useCallback((time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Don't trigger shortcuts when typing
      }
      
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekRelative(-5);
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekRelative(5);
          break;
        case 'ArrowUp':
          e.preventDefault();
          adjustVolume(0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          adjustVolume(-0.1);
          break;
        case 'KeyR':
          e.preventDefault();
          toggleLoop();
          break;
        case 'KeyB':
          e.preventDefault();
          addBookmark();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentTime]);

  // Audio event handlers
  const handleTimeUpdate = useCallback(() => {
    const current = audioRef.current?.currentTime || 0;
    setCurrentTime(current);
    onProgressUpdate?.(current, duration);
    
    // Update current subtitle
    const currentSub = subtitles.find(sub => 
      current >= sub.start && current <= sub.end
    );
    setCurrentSubtitle(currentSub || null);
    
    // Handle loop
    if (isLooping && loopEnd && current >= loopEnd) {
      if (audioRef.current && loopStart !== null) {
        audioRef.current.currentTime = loopStart;
      }
    }
  }, [subtitles, isLooping, loopStart, loopEnd, duration, onProgressUpdate]);

  const handleLoadedMetadata = () => {
    const dur = audioRef.current?.duration || 0;
    setDuration(dur);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
              audioRef.current?.play().catch(e => {
          if (process.env.NODE_ENV === 'development') {
            console.error("Audio play failed:", e);
          }
        });
    }
    setIsPlaying(!isPlaying);
  };

  const seekToTime = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(time, duration));
    }
  };

  const seekRelative = (seconds: number) => {
    seekToTime(currentTime + seconds);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      seekToTime(percent * duration);
    }
  };

  // Touch gesture functions for mobile (optimized)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchState(prev => ({
      ...prev,
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now()
    }));
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchState.startX === null || touchState.startY === null) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchState.startX;
    const deltaY = touch.clientY - touchState.startY;
    
    // Horizontal swipe for seeking (minimum 50px movement)
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      setTouchState(prev => ({ ...prev, isSeeking: true }));
      const seekAmount = deltaX > 0 ? 10 : -10; // 10 seconds forward/backward
      seekRelative(seekAmount);
      // Reset touch to prevent continuous seeking
      setTouchState(prev => ({ ...prev, startX: touch.clientX }));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchState.startX === null || touchState.startY === null || touchState.startTime === null) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchState.startX;
    const deltaY = touch.clientY - touchState.startY;
    const deltaTime = Date.now() - touchState.startTime;
    
    // Tap detection (within 300ms and minimal movement)
    if (deltaTime < 300 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && !touchState.isSeeking) {
      togglePlayPause();
    }
    
    // Reset touch state
    setTouchState({
      startX: null,
      startY: null,
      startTime: null,
      isSeeking: false
    });
  };

  const adjustVolume = (delta: number) => {
    const newVolume = Math.max(0, Math.min(1, volume + delta));
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changePlaybackSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const setLoopRegion = () => {
    if (loopStart === null) {
      setLoopStart(currentTime);
    } else if (loopEnd === null && currentTime > loopStart) {
      setLoopEnd(currentTime);
      setIsLooping(true);
    } else {
      clearLoop();
    }
  };

  const clearLoop = () => {
    setLoopStart(null);
    setLoopEnd(null);
    setIsLooping(false);
  };

  const toggleLoop = () => {
    if (isLooping) {
      clearLoop();
    } else {
      setLoopRegion();
    }
  };

  const addBookmark = () => {
    const newBookmark: Bookmark = {
      id: Date.now().toString(),
      time: currentTime,
      label: `Bookmark ${formatTime(currentTime)}`,
      note: currentSubtitle?.text || ''
    };
    
    setBookmarks(prev => [...prev, newBookmark]);
    onBookmarkAdded?.(newBookmark);
  };

  const jumpToBookmark = (bookmark: Bookmark) => {
    seekToTime(bookmark.time);
  };



  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <FaVolumeMute />;
    if (volume < 0.5) return <FaVolumeDown />;
    return <FaVolumeUp />;
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <CardContent 
        className="p-6" 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={src}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            onEnded?.();
          }}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onVolumeChange={() => setVolume(audioRef.current?.volume || 1)}
          hidden
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{trackTitle}</h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              <Badge variant="outline" className="text-white border-gray-400">
                {playbackSpeed}x
              </Badge>
            </div>
            {/* Mobile touch hint */}
            <div className="md:hidden text-xs text-gray-500 mt-2 bg-gray-800 rounded px-2 py-1">
              💡 <strong>Mẹo:</strong> Chạm để play/pause, vuốt ngang để tua ±10s
            </div>
            {isLooping && (
              <Badge variant="secondary" className="bg-blue-600">
                Loop: {formatTime(loopStart || 0)} - {formatTime(loopEnd || duration)}
              </Badge>
            )}
          </div>
          
          <Button
            onClick={() => setShowControls(!showControls)}
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white"
          >
            <FaCog />
          </Button>
        </div>

        {/* Progress Bar with Loop Indicators */}
        <div className="mb-6">
          <div 
            ref={progressRef}
            onClick={handleProgressClick}
            className="relative h-3 bg-gray-700 rounded-full cursor-pointer group"
          >
            {/* Loop region indicator */}
            {loopStart !== null && loopEnd !== null && (
              <div 
                className="absolute h-full bg-blue-400 opacity-30 rounded-full"
                style={{
                  left: `${(loopStart / duration) * 100}%`,
                  width: `${((loopEnd - loopStart) / duration) * 100}%`
                }}
              />
            )}
            
            {/* Progress bar */}
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            
            {/* Bookmarks */}
            {bookmarks.map(bookmark => (
              <div
                key={bookmark.id}
                onClick={(e) => {
                  e.stopPropagation();
                  jumpToBookmark(bookmark);
                }}
                className="absolute top-0 w-1 h-full bg-yellow-400 cursor-pointer hover:w-2 transition-all"
                style={{ left: `${(bookmark.time / duration) * 100}%` }}
                title={bookmark.label}
              />
            ))}
            
            {/* Progress handle */}
            <div 
              className="absolute w-4 h-4 bg-white rounded-full -top-0.5 transform -translate-x-2 shadow-lg"
              style={{ left: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Playback Controls */}
            <Button
              onClick={() => seekRelative(-10)}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
              title="Lùi 10 giây (←)"
            >
              <FaStepBackward />
            </Button>
            
            <Button
              onClick={onPrevious}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
            >
              <FaBackward />
            </Button>
            
            <Button
              onClick={togglePlayPause}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 md:w-14 md:h-14 relative"
            >
              {isPlaying ? <FaPause size={20} className="md:w-6 md:h-6" /> : <FaPlay size={20} className="md:w-6 md:h-6" />}
              {/* Mobile touch hint */}
              <div className="md:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap">
                {touchState.isSeeking ? "Swipe để tua" : "Chạm để play/pause"}
              </div>
            </Button>
            
            <Button
              onClick={onNext}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
            >
              <FaForward />
            </Button>
            
            <Button
              onClick={() => seekRelative(10)}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
              title="Tới 10 giây (→)"
            >
              <FaStepForward />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Button
              onClick={toggleMute}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
            >
              {getVolumeIcon()}
            </Button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => adjustVolume(Number(e.target.value) - volume)}
              className="w-16 md:w-20 accent-blue-500"
            />
          </div>
        </div>

        {/* Advanced Controls */}
        {showControls && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-3 md:p-4 bg-gray-800 rounded-lg mb-4 gap-3 md:gap-0">
            {/* Speed Control */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">Tốc độ:</span>
              {speedOptions.map(speed => (
                <Button
                  key={speed}
                  onClick={() => changePlaybackSpeed(speed)}
                  variant={playbackSpeed === speed ? "default" : "ghost"}
                  size="sm"
                  className="text-xs"
                >
                  {speed}x
                </Button>
              ))}
            </div>

            {/* Loop & Bookmark Controls */}
            <div className="flex items-center gap-2">
              <Button
                onClick={setLoopRegion}
                variant={isLooping ? "default" : "ghost"}
                size="sm"
                className="flex items-center gap-1"
                title="Tạo vòng lặp (R)"
              >
                <FaRedoAlt />
                {loopStart === null ? 'Đặt điểm bắt đầu' : 
                 loopEnd === null ? 'Đặt điểm kết thúc' : 'Xóa loop'}
              </Button>
              
              <Button
                onClick={addBookmark}
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
                title="Thêm bookmark (B)"
              >
                <FaBookmark />
                Bookmark
              </Button>
            </div>
          </div>
        )}

        {/* Subtitles */}
        {showSubtitles && currentSubtitle && (
          <div className="text-center p-4 bg-black bg-opacity-50 rounded-lg">
            <p className="text-lg text-white mb-2">{currentSubtitle.text}</p>
            {currentSubtitle.translation && (
              <p className="text-sm text-gray-300">{currentSubtitle.translation}</p>
            )}
          </div>
        )}

        {/* Bookmarks List */}
        {bookmarks.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Bookmarks</h4>
            <div className="flex flex-wrap gap-2">
              {bookmarks.map(bookmark => (
                <Button
                  key={bookmark.id}
                  onClick={() => jumpToBookmark(bookmark)}
                  variant="outline"
                  size="sm"
                  className="text-xs border-gray-500 text-gray-300 hover:text-white"
                >
                  {formatTime(bookmark.time)}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard Shortcuts Help */}
        <div className="mt-4 text-xs text-gray-400">
          <details>
            <summary className="cursor-pointer hover:text-gray-300">Phím tắt</summary>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <span>Space: Phát/Dừng</span>
              <span>←/→: Tua -/+ 5s</span>
              <span>↑/↓: Âm lượng +/-</span>
              <span>R: Loop</span>
              <span>B: Bookmark</span>
            </div>
          </details>
        </div>
      </CardContent>
    </Card>
  );
});