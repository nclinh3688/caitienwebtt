'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 🎯 Hover Card with Advanced Effects
export function InteractiveCard({ 
  children, 
  className = '', 
  hoverEffect = 'lift',
  glowColor = 'blue',
  style
}: {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'lift' | 'tilt' | 'glow' | 'scale';
  glowColor?: 'blue' | 'purple' | 'emerald' | 'orange' | 'yellow';
  style?: React.CSSProperties;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColors = {
    blue: 'rgba(59, 130, 246, 0.3)',
    purple: 'rgba(147, 51, 234, 0.3)',
    emerald: 'rgba(16, 185, 129, 0.3)',
    orange: 'rgba(245, 158, 11, 0.3)',
    yellow: 'rgba(252, 211, 77, 0.3)'
  };

  const hoverEffects = {
    lift: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
    tilt: isHovered ? `perspective(1000px) rotateX(${(mousePosition.y - 150) / 10}deg) rotateY(${(mousePosition.x - 150) / 10}deg)` : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    glow: isHovered ? 'translateY(-4px)' : 'translateY(0)',
    scale: isHovered ? 'scale(1.05)' : 'scale(1)'
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer
        ${hoverEffect === 'glow' && isHovered ? 'shadow-2xl' : 'shadow-lg'}
        ${className}
      `}
      style={{
        transform: hoverEffects[hoverEffect],
        boxShadow: hoverEffect === 'glow' && isHovered 
          ? `0 20px 40px ${glowColors[glowColor]}, 0 0 20px ${glowColors[glowColor]}`
          : undefined,
        ...style
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Gradient Overlay on Hover */}
      <div 
        className={`
          absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none
          ${isHovered ? 'opacity-10' : 'opacity-0'}
        `}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor]}, transparent 50%)`
        }}
      />
      
      {children}
    </div>
  );
}

// 🎯 Button with Ripple Effect
export function RippleButton({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary' 
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newRipple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
    secondary: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white',
    success: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
  };

  return (
    <button
      className={`
        relative overflow-hidden px-6 py-3 rounded-lg font-medium transition-all duration-200
        hover:shadow-lg hover:scale-105 active:scale-95
        ${variants[variant]}
        ${className}
      `}
      onClick={handleClick}
    >
      {children}
      
      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </button>
  );
}

// 🎯 Loading Skeleton with Shimmer
export function ShimmerSkeleton({ 
  className = '',
  lines = 3,
  variant = 'text' 
}: {
  className?: string;
  lines?: number;
  variant?: 'text' | 'card' | 'chart' | 'avatar';
}) {
  const variants = {
    text: (
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i}
            className={`h-4 bg-gray-200 rounded animate-shimmer ${
              i === lines - 1 ? 'w-2/3' : 'w-full'
            }`}
          />
        ))}
      </div>
    ),
    card: (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg animate-shimmer" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-shimmer" />
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-shimmer" />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="h-3 bg-gray-200 rounded animate-shimmer" />
          <div className="h-3 bg-gray-200 rounded w-5/6 animate-shimmer" />
        </div>
      </div>
    ),
    chart: (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-gray-200 rounded w-32 animate-shimmer" />
          <div className="w-8 h-8 bg-gray-200 rounded animate-shimmer" />
        </div>
        <div className="h-64 bg-gray-200 rounded-lg animate-shimmer" />
      </div>
    ),
    avatar: (
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-shimmer" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-24 animate-shimmer" />
          <div className="h-3 bg-gray-200 rounded w-16 animate-shimmer" />
        </div>
      </div>
    )
  };

  return (
    <div className={className}>
      {variants[variant]}
    </div>
  );
}

// 🎯 Progress Ring with Animation
export function AnimatedProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 8,
  color = 'blue',
  showPercentage = true,
  className = '' 
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: 'blue' | 'emerald' | 'purple' | 'orange';
  showPercentage?: boolean;
  className?: string;
}) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 300);
    return () => clearTimeout(timer);
  }, [progress]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  const colors = {
    blue: '#3B82F6',
    emerald: '#10B981',
    purple: '#8B5CF6',
    orange: '#F59E0B'
  };

  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors[color]}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${colors[color]}40)`
          }}
        />
      </svg>
      
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">
            {Math.round(animatedProgress)}%
          </span>
        </div>
      )}
    </div>
  );
}

// 🎯 Toast Notification System
export function ToastNotification({ 
  message, 
  type = 'info',
  isVisible,
  onClose 
}: {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const typeStyles = {
    success: 'bg-emerald-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white'
  };

  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className={`
            fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg
            ${typeStyles[type]}
          `}
        >
          <span className="text-xl">{icons[type]}</span>
          <span className="font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-white/80 hover:text-white"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}