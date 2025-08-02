'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 z-50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium">Đang chuyển trang...</p>
          </div>
        </div>
      )}
      
      {/* Page Content */}
      <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {children}
      </div>
    </>
  );
}

// Route Loading Bar Component
export function RouteLoadingBar() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 200);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div 
        className="h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}