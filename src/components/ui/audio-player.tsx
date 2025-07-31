'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  FaPlay, 
  FaPause, 
  FaStop, 
  FaVolumeUp, 
  FaVolumeDown, 
  FaVolumeMute,
  FaRedo,
  FaStepBackward,
  FaStepForward,
  FaDownload,
  FaExpandArrowsAlt,
  FaCog
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface AudioPlayerProps {
  src: string;
  title: string;
  subtitle?: string;
  onProgress?: (currentTime: number, duration: number) => void;
  autoPlay?: boolean;
  showDownload?: boolean;
  showSubtitles?: boolean;
  subtitles?: Array<{
    start: number;
    end: number;
    text: string;
    japanese?: string;
    vietnamese?: string;
  }>;
}

export function AudioPlayer({ 
  src, 
  title, 
  subtitle, 
  onProgress, 
  autoPlay = false,
  showDownload = true,
  showSubtitles = true,
  subtitles = []
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'segment'>('none');
  const [segmentStart, setSegmentStart] = useState<number | null>(null);
  const [segmentEnd, setSegmentEnd] = useState<number | null>(null);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      const current = audio.currentTime;
      setCurrentTime(current);
      onProgress?.(current, audio.duration);

      // Handle subtitle display
      const subtitle = subtitles.find(
        sub => current >= sub.start && current <= sub.end
      );
      setCurrentSubtitle(subtitle?.text || '');

      // Handle segment repeat
      if (repeatMode === 'segment' && segmentEnd && current >= segmentEnd) {
        audio.currentTime = segmentStart || 0;
      }
    };

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onProgress, subtitles, repeatMode, segmentStart, segmentEnd]);

  // Play/Pause toggle
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Stop audio
  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  // Seek to position
  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (value[0] / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Volume control
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Playback speed
  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  // Skip functions
  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(duration, audio.currentTime + 10);
  };

  // Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Download audio
  const downloadAudio = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${title}.mp3`;
    link.click();
  };

  // Set segment for repeat
  const setSegment = () => {
    setSegmentStart(currentTime);
    setSegmentEnd(currentTime + 10); // 10 second segment
    setRepeatMode('segment');
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <Progress 
          value={progress} 
          className="h-2 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            handleSeek([percent]);
          }}
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Subtitles */}
      {showSubtitles && (
        <div className="mb-6 min-h-[60px] bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-lg text-gray-800 leading-relaxed">
            {currentSubtitle || 'Không có phụ đề cho phần này'}
          </p>
        </div>
      )}

      {/* Main Controls */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <Button variant="outline" size="sm" onClick={skipBackward}>
          <FaStepBackward className="h-4 w-4" />
        </Button>
        
        <Button 
          onClick={togglePlayPause} 
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : isPlaying ? (
            <FaPause className="h-5 w-5" />
          ) : (
            <FaPlay className="h-5 w-5" />
          )}
        </Button>
        
        <Button variant="outline" size="sm" onClick={stopAudio}>
          <FaStop className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" size="sm" onClick={skipForward}>
          <FaStepForward className="h-4 w-4" />
        </Button>
      </div>

      {/* Advanced Controls */}
      <div className="flex items-center justify-between">
        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <FaVolumeUp className="text-gray-600" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => handleVolumeChange([parseInt(e.target.value)])}
            className="w-20"
          />
        </div>

        {/* Speed Control */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Tốc độ:</span>
          {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
            <Button
              key={speed}
              variant={playbackRate === speed ? "default" : "outline"}
              size="sm"
              onClick={() => handleSpeedChange(speed)}
              className="text-xs px-2"
            >
              {speed}x
            </Button>
          ))}
        </div>

        {/* Additional Features */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRepeatMode(repeatMode === 'one' ? 'none' : 'one')}
            className={repeatMode === 'one' ? 'bg-blue-100' : ''}
          >
            <FaRedo className={`h-4 w-4 ${repeatMode === 'one' ? 'text-blue-600' : ''}`} />
          </Button>
          
          <Button variant="outline" size="sm" onClick={setSegment}>
            📎
          </Button>
          
          {showDownload && (
            <Button variant="outline" size="sm" onClick={downloadAudio}>
              <FaDownload className="h-4 w-4" />
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowSettings(!showSettings)}
          >
            <FaCog className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">Cài đặt nâng cao</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Chế độ lặp</label>
              <select 
                value={repeatMode} 
                onChange={(e) => setRepeatMode(e.target.value as any)}
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="none">Không lặp</option>
                <option value="one">Lặp bài này</option>
                <option value="segment">Lặp đoạn</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Hiển thị phụ đề</label>
              <input
                type="checkbox"
                checked={showSubtitles}
                onChange={(e) => showSubtitles = e.target.checked}
                className="mt-2"
              />
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Info */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Phím tắt: Space (Play/Pause) | ← → (Tua 10s) | ↑ ↓ (Âm lượng)
      </div>
    </div>
  );
}