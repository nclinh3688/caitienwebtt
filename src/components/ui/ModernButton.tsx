'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  FaPlay, 
  FaPause, 
  FaArrowRight, 
  FaDownload, 
  FaHeart,
  FaStar,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

interface ModernButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  animation?: 'pulse' | 'bounce' | 'shake' | 'none';
  gradient?: boolean;
  glass?: boolean;
}

export function ModernButton({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  onClick,
  className,
  animation = 'none',
  gradient = false,
  glass = false
}: ModernButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = cn(
    'relative overflow-hidden transition-all duration-300 ease-out',
    'font-semibold rounded-lg border-2',
    'focus:outline-none focus:ring-4 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'transform active:scale-95',
    className
  );

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  const variantClasses = {
    primary: cn(
      'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
      'focus:ring-blue-500 shadow-lg hover:shadow-xl'
    ),
    secondary: cn(
      'bg-purple-600 hover:bg-purple-700 text-white border-purple-600',
      'focus:ring-purple-500 shadow-lg hover:shadow-xl'
    ),
    success: cn(
      'bg-green-600 hover:bg-green-700 text-white border-green-600',
      'focus:ring-green-500 shadow-lg hover:shadow-xl'
    ),
    warning: cn(
      'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-600',
      'focus:ring-yellow-500 shadow-lg hover:shadow-xl'
    ),
    error: cn(
      'bg-red-600 hover:bg-red-700 text-white border-red-600',
      'focus:ring-red-500 shadow-lg hover:shadow-xl'
    ),
    ghost: cn(
      'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent',
      'focus:ring-gray-500'
    ),
    outline: cn(
      'bg-transparent hover:bg-blue-50 text-blue-600 border-blue-600',
      'focus:ring-blue-500'
    )
  };

  const gradientClasses = gradient ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : '';
  const glassClasses = glass ? 'bg-white/20 backdrop-blur-sm border-white/30' : '';
  const animationClasses = {
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    shake: 'animate-shake',
    none: ''
  };

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
      onClick();
    }
  };

  return (
    <Button
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        gradientClasses,
        glassClasses,
        animationClasses[animation],
        isPressed && 'scale-95'
      )}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      
      {/* Content */}
      <div className="relative flex items-center justify-center space-x-2">
        {loading && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        )}
        
        {!loading && icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        
        <span>{children}</span>
        
        {!loading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </div>
    </Button>
  );
}

// Specialized button components
export function PlayButton({ 
  isPlaying, 
  onClick, 
  className 
}: { 
  isPlaying: boolean; 
  onClick: () => void; 
  className?: string; 
}) {
  return (
    <ModernButton
      variant="primary"
      size="lg"
      icon={isPlaying ? <FaPause /> : <FaPlay />}
      onClick={onClick}
      className={cn('rounded-full w-16 h-16 p-0', className)}
      animation="pulse"
    >
      {isPlaying ? 'Pause' : 'Play'}
    </ModernButton>
  );
}

export function ActionButton({ 
  action, 
  onClick, 
  className 
}: { 
  action: 'download' | 'like' | 'star' | 'check' | 'close'; 
  onClick: () => void; 
  className?: string; 
}) {
  const icons = {
    download: <FaDownload />,
    like: <FaHeart />,
    star: <FaStar />,
    check: <FaCheck />,
    close: <FaTimes />
  };

  const variants = {
    download: 'primary' as const,
    like: 'error' as const,
    star: 'warning' as const,
    check: 'success' as const,
    close: 'ghost' as const
  };

  return (
    <ModernButton
      variant={variants[action]}
      size="md"
      icon={icons[action]}
      onClick={onClick}
      className={cn('rounded-full', className)}
      animation="bounce"
    >
      {action.charAt(0).toUpperCase() + action.slice(1)}
    </ModernButton>
  );
}

export function CTAButton({ 
  children, 
  onClick, 
  className 
}: { 
  children: React.ReactNode; 
  onClick: () => void; 
  className?: string; 
}) {
  return (
    <ModernButton
      variant="primary"
      size="lg"
      icon={<FaArrowRight />}
      iconPosition="right"
      onClick={onClick}
      className={cn('shadow-2xl hover:shadow-3xl', className)}
      gradient
      animation="pulse"
    >
      {children}
    </ModernButton>
  );
}

export function FloatingButton({ 
  children, 
  onClick, 
  className 
}: { 
  children: React.ReactNode; 
  onClick: () => void; 
  className?: string; 
}) {
  return (
    <ModernButton
      variant="primary"
      size="lg"
      onClick={onClick}
      className={cn(
        'fixed bottom-6 right-6 rounded-full w-16 h-16 p-0 shadow-2xl',
        'hover:scale-110 hover:shadow-3xl',
        className
      )}
      animation="bounce"
    >
      {children}
    </ModernButton>
  );
} 