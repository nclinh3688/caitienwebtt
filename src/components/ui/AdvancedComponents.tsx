'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// ===== GLASSMORPHISM CARD =====
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  blur?: 'sm' | 'md' | 'lg';
}

export function GlassCard({ children, className = '', hover = true, blur = 'md' }: GlassCardProps) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  };

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/20',
        'bg-white/10 backdrop-blur-md shadow-xl',
        hover && 'hover:bg-white/15 hover:border-white/30 transition-all duration-300',
        blurClasses[blur],
        className
      )}
      whileHover={hover ? { 
        y: -8, 
        scale: 1.02,
        boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.25)'
      } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
}

// ===== GRADIENT BUTTON =====
interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'accent';
  loading?: boolean;
}

export function GradientButton({ 
  children, 
  onClick, 
  className = '', 
  size = 'md',
  variant = 'primary',
  loading = false 
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const gradientClasses = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800',
    secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-700 hover:from-secondary-700 hover:to-secondary-800',
    accent: 'bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800'
  };

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden rounded-xl font-semibold text-white',
        'shadow-lg hover:shadow-xl transition-all duration-300',
        'focus:outline-none focus:ring-4 focus:ring-primary-500/50',
        sizeClasses[size],
        gradientClasses[variant],
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={loading}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {children}
      </span>
    </motion.button>
  );
}

// ===== FLOATING CARD =====
interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingCard({ children, className = '', delay = 0 }: FloatingCardProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md',
        'border border-white/20 shadow-2xl',
        className
      )}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: delay * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25)'
      }}
    >
      {/* Floating animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 1, -1, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
}

// ===== PROGRESS RING =====
interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: 'primary' | 'accent' | 'success';
}

export function ProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  className = '',
  color = 'primary'
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colorClasses = {
    primary: 'stroke-primary-600',
    accent: 'stroke-accent-600',
    success: 'stroke-success-600'
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          className={colorClasses[color]}
          style={{
            strokeDasharray,
            strokeDashoffset
          }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}

// ===== ANIMATED STATS CARD =====
interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, icon, trend, className = '' }: StatsCardProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-2xl p-6',
        'bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-md',
        'border border-white/20 shadow-lg',
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          {icon && (
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500/10 to-accent-500/10">
              {icon}
            </div>
          )}
          {trend && (
            <div className={cn(
              'flex items-center gap-1 text-sm font-medium',
              trend.isPositive ? 'text-success-600' : 'text-error-600'
            )}>
              <span>{trend.isPositive ? '↗' : '↘'}</span>
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
        
        <div className="mb-2">
          <motion.div
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {value}
          </motion.div>
        </div>
        
        <div className="text-sm text-gray-600 font-medium">
          {title}
        </div>
      </div>
    </motion.div>
  );
}

// ===== INTERACTIVE NAVIGATION =====
interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  badge?: string | number;
}

export function NavItem({ href, icon, label, isActive = false, badge }: NavItemProps) {
  return (
    <motion.a
      href={href}
      className={cn(
        'relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200',
        'hover:bg-white/10 hover:scale-105',
        isActive 
          ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-700' 
          : 'text-gray-700 hover:text-gray-900'
      )}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-r-full"
          layoutId="activeIndicator"
        />
      )}
      
      <div className="flex items-center gap-3">
        <div className="text-xl">{icon}</div>
        <span>{label}</span>
      </div>
      
      {badge && (
        <motion.div
          className="ml-auto px-2 py-1 text-xs font-bold text-white bg-accent-500 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {badge}
        </motion.div>
      )}
    </motion.a>
  );
}

// ===== LOADING SPINNER =====
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'white';
}

export function LoadingSpinner({ size = 'md', color = 'primary' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-primary-500',
    accent: 'border-accent-500',
    white: 'border-white'
  };

  return (
    <motion.div
      className={cn(
        'border-2 border-gray-200 rounded-full',
        sizeClasses[size],
        colorClasses[color]
      )}
      style={{ borderTopColor: 'transparent' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ===== TOAST NOTIFICATION =====
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  duration?: number;
}

export function Toast({ message, type = 'info', onClose, duration = 3000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        setTimeout(onClose, 300);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeClasses = {
    success: 'bg-success-500 border-success-600',
    error: 'bg-error-500 border-error-600',
    warning: 'bg-warning-500 border-warning-600',
    info: 'bg-primary-500 border-primary-600'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            'fixed top-4 right-4 z-50 px-6 py-4 rounded-xl text-white shadow-2xl',
            'border backdrop-blur-md',
            typeClasses[type]
          )}
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <span>{message}</span>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-2 hover:opacity-80 transition-opacity"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 