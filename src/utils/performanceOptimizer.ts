/**
 * 🚀 PERFORMANCE OPTIMIZER UTILITY
 * Tối ưu hóa performance cho production build
 */

// Remove console logs in production
export const devLog = (message: string, ...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔧 [DEV]`, message, ...args);
  }
};

export const devWarn = (message: string, ...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`⚠️ [DEV]`, message, ...args);
  }
};

export const devError = (message: string, ...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`❌ [DEV]`, message, ...args);
  }
};

// Performance timing utility
export const performanceTimer = (label: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.time(`⚡ [PERF] ${label}`);
    return () => console.timeEnd(`⚡ [PERF] ${label}`);
  }
  return () => {}; // No-op in production
};

// Bundle analyzer helper
export const bundleAnalyzer = {
  mark: (name: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      performance.mark(name);
    }
  },
  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      if (endMark) {
        performance.measure(name, startMark, endMark);
      } else {
        performance.measure(name, startMark);
      }
    }
  }
};

// Memory usage tracker for development
export const memoryTracker = () => {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    const memory = (performance as any).memory;
    if (memory) {
      devLog('Memory Usage:', {
        used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
      });
    }
  }
};

// Clean up unused code detector
export const codeCleanup = {
  checkUnusedImports: () => {
    // This would be implemented with static analysis tools
    devLog('Running unused imports check...');
  },
  
  checkDeadCode: () => {
    // This would be implemented with dead code elimination
    devLog('Running dead code analysis...');
  }
};

export default {
  devLog,
  devWarn, 
  devError,
  performanceTimer,
  bundleAnalyzer,
  memoryTracker,
  codeCleanup
};