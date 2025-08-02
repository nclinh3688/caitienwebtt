'use client';
import React from 'react';
import { HiSparkles, HiAcademicCap } from 'react-icons/hi';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'minimal' | 'dots' | 'pulse';
  text?: string;
  fullScreen?: boolean;
}

function LoadingSpinner({ 
  size = 'md', 
  variant = 'primary', 
  text = 'Đang tải...', 
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const containerClass = fullScreen 
    ? 'fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50'
    : 'flex items-center justify-center p-4';

  if (variant === 'minimal') {
    return (
      <div className={containerClass}>
        <div className={`${sizeClasses[size]} border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin`}></div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={containerClass}>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
        {text && <p className="text-gray-600 text-sm mt-3">{text}</p>}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={containerClass}>
        <div className="relative">
          <div className={`${sizeClasses[size]} bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse`}></div>
          <div className={`absolute inset-0 ${sizeClasses[size]} bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-ping opacity-75`}></div>
        </div>
        {text && <p className="text-gray-600 text-sm mt-3">{text}</p>}
      </div>
    );
  }

  // Primary variant (default)
  return (
    <div className={containerClass}>
      <div className="text-center">
        <div className="relative inline-block">
          {/* Outer rotating ring */}
          <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin`}>
            <div className="absolute inset-0 border-4 border-transparent border-t-emerald-500 border-r-blue-500 rounded-full animate-spin"></div>
          </div>
          
          {/* Inner icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <HiAcademicCap className="text-emerald-600 text-lg animate-pulse" />
          </div>
          
          {/* Sparkle effects */}
          <HiSparkles className="absolute -top-1 -right-1 text-yellow-400 text-sm animate-ping" />
          <HiSparkles className="absolute -bottom-1 -left-1 text-orange-400 text-xs animate-ping" style={{animationDelay: '0.5s'}} />
        </div>
        
        {text && (
          <div className="mt-4">
            <p className="text-gray-700 font-medium">{text}</p>
            <div className="mt-2 w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Page Loading Component
export function PageLoading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          {/* Main logo */}
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl mb-6 animate-bounce">
            <HiAcademicCap className="text-white text-3xl" />
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-spin">
            <HiSparkles className="text-white text-xs" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">PHÚC KHIÊM EDU</h2>
        <p className="text-gray-600 mb-6">AI Learning Platform</p>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">Đang khởi tạo trải nghiệm học tập...</p>
      </div>
    </div>
  );
}

// Skeleton Components
export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-2xl h-48 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`h-4 bg-gray-200 rounded ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}></div>
      ))}
    </div>
  );
}

// SlideIn Animation Component
export function SlideIn({ 
  children, 
  direction = 'up', 
  delay = 0, 
  className = '' 
}: { 
  children: React.ReactNode; 
  direction?: 'up' | 'down' | 'left' | 'right'; 
  delay?: number;
  className?: string;
}) {
  const directions = {
    up: 'animate-slide-up',
    down: 'animate-slide-down',
    left: 'animate-slide-left',
    right: 'animate-slide-right'
  };

  return (
    <div 
      className={`${directions[direction]} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Export default and named exports
export default LoadingSpinner;
export { LoadingSpinner };