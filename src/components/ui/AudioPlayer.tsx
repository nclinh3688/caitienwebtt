
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';

interface AudioPlayerProps {
  src: string;
  trackTitle: string;
  onNext: () => void;
  onPrevious: () => void;
  onEnded: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, trackTitle, onNext, onPrevious, onEnded }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (src && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.error("Audio play failed: ", e));
    }
  }, [src]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration || 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-full">
        <audio
            ref={audioRef}
            src={src}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={onEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            hidden
        />
        <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400">Đang phát</div>
            <div className="font-bold text-lg">{trackTitle}</div>
        </div>

        <div className="flex items-center gap-4 mb-3">
            <div className="text-xs w-12 text-right">{formatTime(currentTime)}</div>
            <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-xs w-12">{formatTime(duration)}</div>
        </div>

        <div className="flex items-center justify-center space-x-8">
            <button onClick={onPrevious} className="text-gray-300 hover:text-white transition-colors"><FaBackward size={20} /></button>
            <button onClick={togglePlayPause} className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4">
                {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
            <button onClick={onNext} className="text-gray-300 hover:text-white transition-colors"><FaForward size={20} /></button>
        </div>
    </div>
  );
};

function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

export default AudioPlayer;
