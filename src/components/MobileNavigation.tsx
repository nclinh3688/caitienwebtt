'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FaHome, 
  FaBookOpen, 
  FaHeadphones, 
  FaUser, 
  FaTrophy,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute
} from 'react-icons/fa';

interface MobileNavigationProps {
  showAudioControls?: boolean;
  isPlaying?: boolean;
  isMuted?: boolean;
  onPlayPause?: () => void;
  onToggleMute?: () => void;
  currentLesson?: string;
  progress?: number;
}

export default function MobileNavigation({
  showAudioControls = false,
  isPlaying = false,
  isMuted = false,
  onPlayPause,
  onToggleMute,
  currentLesson,
  progress = 0
}: MobileNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('home');

  const navigationItems = [
    {
      id: 'home',
      label: 'Trang chủ',
      icon: FaHome,
      path: '/',
      badge: null
    },
    {
      id: 'courses',
      label: 'Khóa học',
      icon: FaBookOpen,
      path: '/courses',
      badge: null
    },
    {
      id: 'listening',
      label: 'Nghe',
      icon: FaHeadphones,
      path: '/listening',
      badge: null
    },
    {
      id: 'profile',
      label: 'Cá nhân',
      icon: FaUser,
      path: '/profile',
      badge: null
    }
  ];

  const handleNavigation = (item: any) => {
    setActiveTab(item.id);
    router.push(item.path);
  };

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  return (
    <>
      {/* Audio Controls Overlay */}
      {showAudioControls && (
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-3 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <FaPlay className="text-blue-600 text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium">Đang học</p>
                <p className="text-xs text-gray-500">{currentLesson}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onPlayPause}
                className="p-2"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleMute}
                className="p-2"
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex items-center justify-around p-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = isActive(item.path);
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavigation(item)}
                className={`flex flex-col items-center gap-1 p-2 min-w-0 ${
                  isItemActive 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="text-lg" />
                <span className="text-xs">{item.label}</span>
                {item.badge && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Bottom Spacer for content */}
      <div className="h-20"></div>
    </>
  );
} 