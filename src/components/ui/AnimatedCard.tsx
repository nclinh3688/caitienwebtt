'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient' | 'hover-lift' | 'hover-scale';
  animation?: 'fade-in' | 'scale-in' | 'slide-up' | 'bounce-in' | 'fade-in-up';
  delay?: number;
  onClick?: () => void;
}

export function AnimatedCard({
  children,
  className,
  variant = 'default',
  animation = 'fade-in',
  delay = 0,
  onClick
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = cn(
    'transition-all duration-300 ease-out',
    'border border-gray-200 rounded-xl',
    'bg-white shadow-md',
    'hover:shadow-xl',
    className
  );

  const variantClasses = {
    default: 'hover:border-primary-300',
    glass: 'bg-white/80 backdrop-blur-sm border-white/20',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50',
    'hover-lift': 'hover:-translate-y-2 hover:shadow-2xl',
    'hover-scale': 'hover:scale-105'
  };

  const animationClasses = {
    'fade-in': 'animate-fade-in',
    'scale-in': 'animate-scale-in',
    'slide-up': 'animate-fade-in-up',
    'bounce-in': 'animate-bounce-in',
    'fade-in-up': 'animate-fade-in-up'
  };

  const style = {
    animationDelay: `${delay}ms`,
    animationFillMode: 'both'
  };

  return (
    <Card
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        onClick && 'cursor-pointer'
      )}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </Card>
  );
}

// Specialized card components
export function FeatureCard({
  icon,
  title,
  description,
  className
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <AnimatedCard
      variant="hover-lift"
      animation="fade-in-up"
      className={cn('text-center p-6', className)}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </AnimatedCard>
  );
}

export function StatsCard({
  value,
  label,
  icon,
  trend,
  className
}: {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  className?: string;
}) {
  return (
    <AnimatedCard
      variant="glass"
      animation="scale-in"
      className={cn('p-6', className)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={cn(
              'text-sm mt-1',
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            )}>
              {trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        {icon && (
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
            {icon}
          </div>
        )}
      </div>
    </AnimatedCard>
  );
}

export function TestimonialCard({
  quote,
  author,
  role,
  avatar,
  className
}: {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  className?: string;
}) {
  return (
    <AnimatedCard
      variant="default"
      animation="fade-in"
      className={cn('p-6', className)}
    >
      <div className="space-y-4">
        <div className="text-gray-600 italic">"{quote}"</div>
        <div className="flex items-center space-x-3">
          {avatar && (
            <img
              src={avatar}
              alt={author}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900">{author}</p>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
}

interface AnimatedProgressProps {
  value: number;
  maxValue: number;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  label?: string;
}

export function AnimatedProgress({ 
  value, 
  maxValue, 
  color = 'blue',
  size = 'md',
  animated = true,
  label 
}: AnimatedProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.min((value / maxValue) * 100, 100);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedValue(percentage);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(percentage);
    }
  }, [percentage, animated]);

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600', 
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-500">{value}/{maxValue}</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`
            ${sizeClasses[size]} bg-gradient-to-r ${colorClasses[color]}
            transition-all duration-1000 ease-out
            relative overflow-hidden
          `}
          style={{ width: `${animatedValue}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          )}
        </div>
      </div>
    </div>
  );
}

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ 
  end, 
  start = 0, 
  duration = 2000,
  prefix = '',
  suffix = '',
  className = ''
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = start;
    const endValue = end;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(startValue + (endValue - startValue) * easeOutCubic);
      
      setCount(currentValue);

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [isVisible, start, end, duration]);

  return (
    <span ref={counterRef} className={`font-bold ${className}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

interface PulseLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'purple' | 'orange';
  className?: string;
}

export function PulseLoader({ size = 'md', color = 'blue', className = '' }: PulseLoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`
        ${sizeClasses[size]} ${colorClasses[color]}
        rounded-full animate-pulse
        shadow-lg opacity-75
      `} />
    </div>
  );
}

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  color?: 'blue' | 'green' | 'purple' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function FloatingActionButton({
  icon,
  onClick,
  position = 'bottom-right',
  color = 'blue',
  size = 'md',
  className = ''
}: FloatingActionButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6', 
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-16 h-16 text-lg'
  };

  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/50',
    green: 'bg-green-500 hover:bg-green-600 shadow-green-500/50',
    purple: 'bg-purple-500 hover:bg-purple-600 shadow-purple-500/50',
    orange: 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/50'
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        fixed ${positionClasses[position]} ${sizeClasses[size]} ${colorClasses[color]}
        rounded-full text-white font-bold
        transition-all duration-200 ease-out
        shadow-lg hover:shadow-xl
        z-50
        flex items-center justify-center
        ${isPressed ? 'scale-95' : 'scale-100 hover:scale-105'}
        ${className}
      `}
    >
      <div className={`transition-transform duration-200 ${isPressed ? 'scale-90' : 'scale-100'}`}>
        {icon}
      </div>
    </button>
  );
}