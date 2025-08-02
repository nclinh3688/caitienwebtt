'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 🎯 UTILITY FUNCTION FOR COMBINING CLASSES
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 🎨 SHARED STYLING UTILITIES
export const styles = {
  // Card variants
  card: {
    base: "bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200",
    hover: "hover:shadow-md hover:scale-[1.02]",
    interactive: "cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg"
  },
  
  // Button variants
  button: {
    primary: "bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl px-4 py-2 transition-all duration-200",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-xl px-4 py-2 transition-all duration-200",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 font-medium rounded-xl px-4 py-2 transition-all duration-200",
    touch: "min-h-[48px] touch-manipulation active:scale-95"
  },
  
  // Layout helpers
  layout: {
    container: "max-w-7xl mx-auto px-4",
    section: "py-8 space-y-6",
    grid: "grid gap-6",
    flex: "flex items-center gap-4"
  },
  
  // Animation classes
  animation: {
    fadeIn: "animate-fade-in",
    slideUp: "animate-slide-up",
    float: "animate-float",
    pulse: "animate-pulse",
    spin: "animate-spin"
  },
  
  // Responsive text
  text: {
    heading: "text-2xl lg:text-3xl font-bold text-gray-900",
    subheading: "text-lg lg:text-xl font-semibold text-gray-800",
    body: "text-base text-gray-600",
    caption: "text-sm text-gray-500"
  }
};

// 🔧 COMMON COMPONENT PROPS
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface InteractiveProps extends BaseProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface CardProps extends BaseProps {
  variant?: 'default' | 'glass' | 'interactive';
  padding?: 'sm' | 'md' | 'lg';
}

// 🎨 SHARED CARD COMPONENT
export function SharedCard({ 
  children, 
  className = "", 
  variant = "default",
  padding = "md",
  ...props 
}: CardProps & React.HTMLAttributes<HTMLDivElement>) {
  const paddingClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6"
  };

  const variantClasses = {
    default: styles.card.base,
    glass: styles.card.glass,
    interactive: cn(styles.card.base, styles.card.interactive)
  };

  return (
    <div 
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// 🚀 SHARED BUTTON COMPONENT
export function SharedButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg"
  };

  return (
    <button
      className={cn(
        styles.button[variant],
        styles.button.touch,
        sizeClasses[size],
        loading && "opacity-70 cursor-not-allowed",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

// 📱 RESPONSIVE GRID HELPER
export function ResponsiveGrid({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "gap-6",
  className = ""
}: {
  children: React.ReactNode;
  cols?: { mobile: number; tablet: number; desktop: number };
  gap?: string;
  className?: string;
}) {
  return (
    <div className={cn(
      "grid",
      gap,
      `grid-cols-${cols.mobile}`,
      `md:grid-cols-${cols.tablet}`,
      `lg:grid-cols-${cols.desktop}`,
      className
    )}>
      {children}
    </div>
  );
}

// 🎭 LOADING SKELETON
export function LoadingSkeleton({ 
  lines = 3, 
  className = "" 
}: { 
  lines?: number; 
  className?: string; 
}) {
  return (
    <div className={cn("animate-pulse space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className="h-4 bg-gray-200 rounded-md" 
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  );
}

// 🎯 ICON WRAPPER
export function IconWrapper({ 
  icon: Icon, 
  className = "",
  size = "md"
}: { 
  icon: React.ComponentType<any>; 
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5", 
    lg: "w-6 h-6"
  };

  return <Icon className={cn(sizeClasses[size], className)} />;
}