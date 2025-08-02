'use client';

import React, { memo, useMemo, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// High-performance wrapper for heavy components
export const MemoizedCard = memo(Card);
export const MemoizedButton = memo(Button);

// Lazy-loaded components for better performance
export const LazyAudioPlayer = lazy(() => import('@/components/ui/AudioPlayer'));
export const LazyCourseDropdown = lazy(() => import('@/components/ui/CourseDropdown'));

// Performance-optimized component wrapper
interface OptimizedWrapperProps {
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  enableSuspense?: boolean;
}

export const OptimizedWrapper = memo(function OptimizedWrapper({
  children,
  loadingFallback = <div className="animate-pulse bg-gray-200 rounded h-20" />,
  enableSuspense = true
}: OptimizedWrapperProps) {
  const content = useMemo(() => children, [children]);

  if (enableSuspense) {
    return (
      <Suspense fallback={loadingFallback}>
        {content}
      </Suspense>
    );
  }

  return <>{content}</>;
});

// Heavy component state reducer for better performance
export interface ComponentState {
  loading: boolean;
  data: any;
  error?: string;
  lastUpdated?: Date;
}

export type ComponentAction = 
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; payload: any }
  | { type: 'ERROR'; payload: string }
  | { type: 'RESET' };

export function componentStateReducer(state: ComponentState, action: ComponentAction): ComponentState {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: undefined };
    case 'SUCCESS':
      return { 
        ...state, 
        loading: false, 
        data: action.payload, 
        error: undefined,
        lastUpdated: new Date()
      };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'RESET':
      return { loading: false, data: null, error: undefined };
    default:
      return state;
  }
}

// Performance monitoring HOC
export function withPerformanceMonitoring<T extends object>(
  Component: React.ComponentType<T>,
  componentName: string
) {
  return memo(function PerformanceMonitoredComponent(props: T) {
    const startTime = useMemo(() => performance.now(), []);
    
    React.useEffect(() => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (process.env.NODE_ENV === 'development' && renderTime > 16) {
        console.warn(`🐌 [Performance] ${componentName} render took ${renderTime.toFixed(2)}ms (>16ms)`);
      }
    });

    return <Component {...props} />;
  });
}

// Virtual scrolling utility for large lists
interface VirtualScrollProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  overscan?: number;
}

export const VirtualScroll = memo(function VirtualScroll({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5
}: VirtualScrollProps) {
  const [scrollTop, setScrollTop] = React.useState(0);

  const visibleStart = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleEnd = Math.min(
    items.length,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = useMemo(() => 
    items.slice(visibleStart, visibleEnd).map((item, index) => ({
      item,
      index: visibleStart + index
    })),
    [items, visibleStart, visibleEnd]
  );

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map(({ item, index }) => (
            <div key={index} style={{ height: itemHeight }}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// Image optimization wrapper
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  placeholder?: 'blur' | 'empty';
}

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  placeholder = 'empty'
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width, height }}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          Image unavailable
        </div>
      )}
    </div>
  );
});