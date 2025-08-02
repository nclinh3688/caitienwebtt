'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface MemoryInfo {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
}

interface PerformanceMetrics {
  fps: number;
  memory: MemoryInfo | null;
  pageLoadTime: number | null;
  lcp: number | null;
  cls: number | null;
  renderTime: number;
  jsHeapSize: number;
}

interface UsePerformanceOptions {
  trackFPS?: boolean;
  trackMemory?: boolean;
  trackWebVitals?: boolean;
  updateInterval?: number;
}

export function usePerformance(options: UsePerformanceOptions = {}) {
  const {
    trackFPS = true,
    trackMemory = true,
    trackWebVitals = true,
    updateInterval = 1000,
  } = options;

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memory: null,
    pageLoadTime: null,
    lcp: null,
    cls: null,
    renderTime: 0,
    jsHeapSize: 0,
  });

  const frameCountRef = useRef(0);
  const lastFrameTimeRef = useRef(performance.now());
  const animationFrameRef = useRef<number | undefined>(undefined);
  const webVitalsRef = useRef({
    lcp: null as number | null,
    cls: null as number | null,
  });

  // Performance-optimized FPS tracking
  const trackFPSMetrics = useCallback(() => {
    if (!trackFPS) return;

    const measureFPS = (currentTime: number) => {
      frameCountRef.current++;
      const elapsed = currentTime - lastFrameTimeRef.current;

      if (elapsed >= updateInterval) {
        const fps = Math.round((frameCountRef.current * 1000) / elapsed);
        setMetrics(prev => ({ ...prev, fps }));
        frameCountRef.current = 0;
        lastFrameTimeRef.current = currentTime;
      }

      animationFrameRef.current = requestAnimationFrame(measureFPS);
    };

    animationFrameRef.current = requestAnimationFrame(measureFPS);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [trackFPS, updateInterval]);

  // Memory usage tracking
  const trackMemoryUsage = useCallback(() => {
    if (!trackMemory || typeof window === 'undefined') return;

    const updateMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory as MemoryInfo;
        const jsHeapSize = memory.usedJSHeapSize / (1024 * 1024); // MB
        
        setMetrics(prev => ({
          ...prev,
          memory,
          jsHeapSize
        }));
      }
    };

    updateMemory();
    const interval = setInterval(updateMemory, updateInterval);
    return () => clearInterval(interval);
  }, [trackMemory, updateInterval]);

  // Web Vitals tracking
  const trackWebVitalsMetrics = useCallback(() => {
    if (!trackWebVitals || typeof window === 'undefined') return;

    // Track page load time
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const pageLoadTime = navigationEntry.loadEventEnd - navigationEntry.loadEventStart;
      setMetrics(prev => ({ ...prev, pageLoadTime }));
    }

    // Track render time
    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    if (fcp) {
      setMetrics(prev => ({ ...prev, renderTime: fcp.startTime }));
    }

    // Dynamic import for web-vitals to avoid bundle bloat
    import('web-vitals').then(({ onLCP, onCLS }) => {
      onLCP((metric) => {
        webVitalsRef.current.lcp = metric.value;
        setMetrics(prev => ({ ...prev, lcp: metric.value }));
      });

      onCLS((metric) => {
        webVitalsRef.current.cls = metric.value;
        setMetrics(prev => ({ ...prev, cls: metric.value }));
      });
    }).catch((error) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Performance] Failed to load web-vitals:', error);
      }
    });
  }, [trackWebVitals]);

  // Initialize tracking
  useEffect(() => {
    const cleanupFPS = trackFPSMetrics();
    const cleanupMemory = trackMemoryUsage();
    trackWebVitalsMetrics();

    return () => {
      cleanupFPS?.();
      cleanupMemory?.();
    };
  }, [trackFPSMetrics, trackMemoryUsage, trackWebVitalsMetrics]);

  // Performance score calculation
  const getPerformanceScore = useCallback(() => {
    let score = 100;
    
    // FPS score (60 FPS = perfect)
    if (metrics.fps > 0) {
      const fpsScore = Math.min(metrics.fps / 60, 1) * 25;
      score = score - 25 + fpsScore;
    }

    // Memory score
    if (metrics.jsHeapSize > 0) {
      const memoryScore = metrics.jsHeapSize < 50 ? 25 : 
                         metrics.jsHeapSize < 100 ? 20 :
                         metrics.jsHeapSize < 200 ? 15 : 10;
      score = score - 25 + memoryScore;
    }

    // LCP score (< 2.5s = good)
    if (metrics.lcp) {
      const lcpScore = metrics.lcp < 2500 ? 25 : 
                      metrics.lcp < 4000 ? 15 : 5;
      score = score - 25 + lcpScore;
    }

    // CLS score (< 0.1 = good)
    if (metrics.cls !== null) {
      const clsScore = metrics.cls < 0.1 ? 25 : 
                      metrics.cls < 0.25 ? 15 : 5;
      score = score - 25 + clsScore;
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  }, [metrics]);

  return {
    ...metrics,
    performanceScore: getPerformanceScore(),
    isGoodPerformance: getPerformanceScore() >= 80,
  };
}