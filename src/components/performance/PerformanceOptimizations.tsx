'use client';

import React, { memo, useCallback, useMemo, lazy, Suspense } from 'react';

// Performance optimized component wrappers
export const withMemoization = <T extends object>(
  Component: React.ComponentType<T>,
  arePropsEqual?: (prevProps: T, nextProps: T) => boolean
) => {
  return memo(Component, arePropsEqual);
};

// Lazy loading with error boundary
export const withLazyLoading = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(importFunc);
  
  return function LazyWrapper(props: any) {
    return (
      <Suspense fallback={fallback || <div className="animate-pulse bg-gray-200 h-20 rounded" />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

// Performance monitoring wrapper
export const withPerformanceMonitoring = <T extends object>(
  Component: React.ComponentType<T>,
  componentName: string
) => {
  return memo(function PerformanceMonitoredComponent(props: T) {
    const renderStart = useMemo(() => performance.now(), []);
    
    React.useEffect(() => {
      const renderTime = performance.now() - renderStart;
      if (process.env.NODE_ENV === 'development' && renderTime > 16) {
        console.warn(`🐌 [Performance] ${componentName} render: ${renderTime.toFixed(2)}ms`);
      }
    });

    return <Component {...props} />;
  });
};

// Optimized state reducer for complex components
export interface OptimizedComponentState<T = any> {
  loading: boolean;
  data: T;
  error?: string;
  lastUpdated?: Date;
  cache?: Map<string, any>;
}

export type OptimizedComponentAction<T = any> = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DATA'; payload: T }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_CACHE'; key: string; value: any }
  | { type: 'CLEAR_CACHE' }
  | { type: 'RESET' };

export function optimizedComponentReducer<T>(
  state: OptimizedComponentState<T>, 
  action: OptimizedComponentAction<T>
): OptimizedComponentState<T> {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_DATA':
      return { 
        ...state, 
        loading: false, 
        data: action.payload, 
        error: undefined,
        lastUpdated: new Date()
      };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: undefined };
    case 'SET_CACHE':
      const newCache = new Map(state.cache);
      newCache.set(action.key, action.value);
      return { ...state, cache: newCache };
    case 'CLEAR_CACHE':
      return { ...state, cache: new Map() };
    case 'RESET':
      return { 
        loading: false, 
        data: null as T, 
        error: undefined, 
        cache: new Map() 
      };
    default:
      return state;
  }
}

// Hook for debounced values
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook for optimized callback with dependencies
export function useOptimizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return useCallback(callback, deps);
}

// Hook for memoized expensive calculations
export function useExpensiveCalculation<T>(
  calculate: () => T,
  deps: React.DependencyList
): T {
  return useMemo(calculate, deps);
}

// Virtual scrolling component for large lists
interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
}

export function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className = ''
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = React.useState(0);

  const visibleRange = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(
      items.length,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { start, end };
  }, [scrollTop, itemHeight, containerHeight, overscan, items.length]);

  const visibleItems = useMemo(() => 
    items.slice(visibleRange.start, visibleRange.end).map((item, index) => ({
      item,
      index: visibleRange.start + index
    })),
    [items, visibleRange.start, visibleRange.end]
  );

  const totalHeight = items.length * itemHeight;
  const offsetY = visibleRange.start * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
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
}

// Intersection Observer hook for lazy loading
export function useInView(
  threshold = 0.1,
  rootMargin = '0px'
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return [ref, isInView];
}

// Optimized image component with lazy loading
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  onLoad,
  onError
}: OptimizedImageProps) {
  const [ref, isInView] = useInView(0.1, '50px');
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setError(true);
    onError?.();
  }, [onError]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
          Failed to load
        </div>
      )}
    </div>
  );
});

export { memo, useCallback, useMemo } from 'react';