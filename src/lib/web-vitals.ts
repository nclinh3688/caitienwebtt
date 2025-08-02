// Web Vitals monitoring for performance tracking
import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';

type MetricName = 'CLS' | 'FCP' | 'LCP' | 'TTFB';

interface Metric {
  name: MetricName;
  value: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function getConnectionSpeed(): string {
  const connection = (navigator as any).connection;
  if (!connection) return 'unknown';
  
  const effectiveType = connection.effectiveType;
  const downlink = connection.downlink;
  
  return `${effectiveType}|${downlink}`;
}

function sendToAnalytics(metric: Metric, options: any = {}) {
  const page = window.location.pathname;
  const body = JSON.stringify({
    dsn: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
    id: metric.id,
    page,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
    ...options,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, body);
  } else {
    fetch(vitalsUrl, {
      body,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
  }
}

export function reportWebVitals(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`🚀 [Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
    });
  }

  // Send to analytics
  sendToAnalytics(metric);

  // Store in localStorage for debugging
  if (typeof window !== 'undefined') {
    try {
      const vitals = JSON.parse(localStorage.getItem('web-vitals') || '[]');
      vitals.push({
        ...metric,
        timestamp: Date.now(),
        url: window.location.href,
      });
      
      // Keep only last 50 entries
      if (vitals.length > 50) {
        vitals.splice(0, vitals.length - 50);
      }
      
      localStorage.setItem('web-vitals', JSON.stringify(vitals));
    } catch (error) {
      console.warn('Invalid web-vitals data, resetting...');
      localStorage.removeItem('web-vitals');
    }
  }
}

export function initWebVitals() {
  onCLS(reportWebVitals);
  onFCP(reportWebVitals);
  onLCP(reportWebVitals);
  onTTFB(reportWebVitals);
}

// Performance monitoring utilities
export const performanceHelpers = {
  // Mark performance points
  mark: (name: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(name);
    }
  },

  // Measure between two points
  measure: (name: string, startMark?: string, endMark?: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        const measure = performance.measure(name, startMark, endMark);
        if (process.env.NODE_ENV === 'development') {
          console.log(`⏱️ [Performance] ${name}: ${measure.duration.toFixed(2)}ms`);
        }
        return measure.duration;
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Performance measurement failed:', error);
        }
        return 0;
      }
    }
    return 0;
  },

  // Get current memory usage
  getMemoryUsage: () => {
    if (typeof window !== 'undefined' && 'performance' in window && (performance as any).memory) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
      };
    }
    return null;
  },

  // Get page load timing
  getPageLoadTiming: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const timing = performance.timing;
      return {
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        tcp: timing.connectEnd - timing.connectStart,
        request: timing.responseStart - timing.requestStart,
        response: timing.responseEnd - timing.responseStart,
        dom: timing.domContentLoadedEventEnd - timing.domLoading,
        load: timing.loadEventEnd - timing.loadEventStart,
        total: timing.loadEventEnd - timing.navigationStart,
      };
    }
    return null;
  },
};

// Export for use in _app.tsx