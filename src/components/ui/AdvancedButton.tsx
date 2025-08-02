'use client';
import React, { useState } from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface AdvancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'magic' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  ripple?: boolean;
  glow?: boolean;
  magnetic?: boolean;
  children: React.ReactNode;
}

export default function AdvancedButton({
  variant = 'primary',
  size = 'md',
  icon,
  rightIcon,
  loading = false,
  ripple = true,
  glow = false,
  magnetic = false,
  className,
  children,
  onClick,
  ...props
}: AdvancedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };
      
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }
    
    onClick?.(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (magnetic) {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) * 0.1;
      const y = (e.clientY - centerY) * 0.1;
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    if (magnetic) {
      setMousePosition({ x: 0, y: 0 });
    }
  };

  const variants = {
    primary: 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-900 shadow-md hover:shadow-lg',
    outline: 'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
    magic: 'bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white shadow-lg hover:shadow-2xl bg-size-200 hover:bg-pos-0',
    glow: 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg hover:shadow-emerald-500/50 hover:shadow-2xl border border-emerald-400/50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-12 py-6 text-xl'
  };

  return (
    <button
      className={cn(
        'relative overflow-hidden rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        variants[variant],
        sizes[size],
        glow && 'animate-glow',
        magnetic && 'transition-transform duration-200',
        className
      )}
      style={
        magnetic
          ? {
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(${mousePosition.x === 0 && mousePosition.y === 0 ? 1 : 1.05})`
            }
          : undefined
      }
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={loading}
      {...props}
    >
      {/* Ripple Effect */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            animationDuration: '0.6s'
          }}
        />
      ))}

      {/* Shimmer Effect for Magic Variant */}
      {variant === 'magic' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </span>

      {/* Glow Effect */}
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl blur-lg opacity-30 -z-10 group-hover:opacity-50 transition-opacity duration-300" />
      )}
    </button>
  );
}

// Preset button variants
export function MagicButton({ children, ...props }: Omit<AdvancedButtonProps, 'variant'>) {
  return (
    <AdvancedButton variant="magic" magnetic ripple {...props}>
      {children}
    </AdvancedButton>
  );
}

export function GlowButton({ children, ...props }: Omit<AdvancedButtonProps, 'variant' | 'glow'>) {
  return (
    <AdvancedButton variant="glow" glow magnetic ripple {...props}>
      {children}
    </AdvancedButton>
  );
}