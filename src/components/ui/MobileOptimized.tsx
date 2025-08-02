'use client';

import { useState, useEffect } from 'react';

// 📱 MOBILE-FIRST LOADING SKELETON
export const MobileSkeleton = ({ 
  lines = 3, 
  className = "" 
}: { 
  lines?: number; 
  className?: string; 
}) => (
  <div className={`animate-pulse space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="h-4 bg-gray-200 rounded-md w-full"></div>
    ))}
  </div>
);

// 📱 RESPONSIVE IMAGE LOADER
export const ResponsiveImage = ({ 
  src, 
  alt, 
  className = "", 
  priority = false 
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg"></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading={priority ? 'eager' : 'lazy'}
      />
      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Failed to load</span>
        </div>
      )}
    </div>
  );
};

// 📱 MOBILE NAVIGATION OPTIMIZATION
export const MobileOptimizedNav = ({ 
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <nav className={`
    fixed bottom-0 left-0 right-0 z-50
    bg-white/90 backdrop-blur-lg border-t border-gray-200
    safe-area-pb transition-transform duration-300
    lg:relative lg:bg-transparent lg:border-0 lg:backdrop-blur-none
    ${className}
  `}>
    <div className="flex justify-around items-center h-16 px-4">
      {children}
    </div>
  </nav>
);

// 📱 PROGRESSIVE LOADING COMPONENT
export const ProgressiveLoader = ({ 
  children,
  fallback,
  delay = 200
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!showContent) {
    return fallback || <MobileSkeleton />;
  }

  return <>{children}</>;
};

// 📱 MOBILE-OPTIMIZED CARD
export const MobileCard = ({ 
  children,
  className = "",
  padding = "p-4"
}: {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}) => (
  <div className={`
    bg-white rounded-xl shadow-sm border border-gray-100
    ${padding} ${className}
    hover:shadow-md transition-shadow duration-200
    touch-manipulation
  `}>
    {children}
  </div>
);

// 📱 TOUCH-OPTIMIZED BUTTON
export const TouchButton = ({ 
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}) => {
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm min-h-[40px]',
    md: 'px-4 py-3 text-base min-h-[48px]',
    lg: 'px-6 py-4 text-lg min-h-[56px]'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-xl font-medium transition-all duration-200
        touch-manipulation active:scale-95
        ${variants[variant]} ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

// 📱 MOBILE-FIRST GRID
export const ResponsiveGrid = ({ 
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "gap-4",
  className = ""
}: {
  children: React.ReactNode;
  cols?: { mobile: number; tablet: number; desktop: number };
  gap?: string;
  className?: string;
}) => (
  <div className={`
    grid ${gap} ${className}
    grid-cols-${cols.mobile}
    md:grid-cols-${cols.tablet}
    lg:grid-cols-${cols.desktop}
  `}>
    {children}
  </div>
);

// 📱 VIRTUAL SCROLL (FOR LARGE LISTS)
export const VirtualizedList = ({ 
  items,
  renderItem,
  itemHeight = 80,
  containerHeight = 400,
  className = ""
}: {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  itemHeight?: number;
  containerHeight?: number;
  className?: string;
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(startIndex, endIndex);
  
  return (
    <div 
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${startIndex * itemHeight}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};