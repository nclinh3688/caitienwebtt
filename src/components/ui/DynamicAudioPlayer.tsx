'use client';

import dynamic from 'next/dynamic';
import React from 'react';

interface AudioPlayerFallbackProps {
  trackTitle: string;
}

// Fallback component while audio player loads
function AudioPlayerFallback({ trackTitle }: AudioPlayerFallbackProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 text-white rounded-lg p-6">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="h-6 bg-gray-700 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-32"></div>
          </div>
        </div>
        
        {/* Progress bar skeleton */}
        <div className="h-3 bg-gray-700 rounded-full mb-6"></div>
        
        {/* Controls skeleton */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="w-14 h-14 bg-gray-700 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        </div>
        
        {/* Loading text */}
        <div className="text-center text-gray-400 text-sm">
          Đang tải trình phát audio...
        </div>
      </div>
    </div>
  );
}

// Dynamically import the enhanced audio player for better mobile performance
const EnhancedAudioPlayer = dynamic(
  () => import('@/components/ui/EnhancedAudioPlayer').then(mod => mod.EnhancedAudioPlayer),
  {
    loading: () => <AudioPlayerFallback trackTitle="Loading..." />,
    ssr: false, // Disable SSR for audio player (browser-only features)
  }
);

export { EnhancedAudioPlayer as DynamicAudioPlayer };
export default EnhancedAudioPlayer;