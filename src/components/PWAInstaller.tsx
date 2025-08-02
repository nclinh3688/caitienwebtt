'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FaDownload, FaTimes, FaMobile, FaDesktop } from 'react-icons/fa';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      if (process.env.NODE_ENV === 'development') console.log('📱 App is already installed');
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      if (process.env.NODE_ENV === 'development') console.log('📱 Install prompt available');
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      
      // Show banner after 3 seconds if user hasn't dismissed it
      const dismissedTime = localStorage.getItem('pwa-install-dismissed');
      const now = Date.now();
      
      if (!dismissedTime || (now - parseInt(dismissedTime)) > 7 * 24 * 60 * 60 * 1000) { // 7 days
        setTimeout(() => setShowInstallBanner(true), 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          if (process.env.NODE_ENV === 'development') console.log('✅ Service Worker registered:', registration);
        })
        .catch(error => {
          if (process.env.NODE_ENV === 'development') console.error('❌ Service Worker registration failed:', error);
        });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Hide the banner
    setShowInstallBanner(false);

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for user choice
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      if (process.env.NODE_ENV === 'development') console.log('📱 User accepted install');
    } else {
      if (process.env.NODE_ENV === 'development') console.log('❌ User dismissed install');
    }

    // Reset the prompt
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  const IOSInstallInstructions = () => (
    <Card className="m-4 border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <FaMobile className="text-blue-600 mt-1" size={20} />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-2">Cài đặt ứng dụng trên iOS</h3>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Nhấn nút <strong>Chia sẻ</strong> (⬆️) ở thanh công cụ</li>
              <li>2. Cuộn xuống và chọn <strong>"Thêm vào Màn hình chính"</strong></li>
              <li>3. Nhấn <strong>"Thêm"</strong> để xác nhận</li>
            </ol>
          </div>
          <button 
            onClick={handleDismiss}
            className="text-blue-400 hover:text-blue-600"
          >
            <FaTimes />
          </button>
        </div>
      </CardContent>
    </Card>
  );

  // Show iOS instructions
  if (isIOS && showInstallBanner) {
    return <IOSInstallInstructions />;
  }

  // Show install banner for compatible browsers
  if (showInstallBanner && isInstallable) {
    return (
      <Card className="fixed bottom-4 left-4 right-4 z-50 border-green-200 bg-green-50 shadow-lg md:left-auto md:right-4 md:w-96">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <FaDownload className="text-white" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-green-900 mb-1">
                Cài đặt ứng dụng
              </h3>
              <p className="text-sm text-green-800 mb-3">
                Thêm PHÚC KHIÊM EDU vào màn hình chính để truy cập nhanh và học offline
              </p>
              <div className="flex gap-2">
                <Button 
                  onClick={handleInstallClick}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <FaDownload className="mr-2" size={14} />
                  Cài đặt
                </Button>
                <Button 
                  onClick={handleDismiss}
                  variant="outline"
                  size="sm"
                  className="border-green-300 text-green-700 hover:bg-green-100"
                >
                  Để sau
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}

export default PWAInstaller;