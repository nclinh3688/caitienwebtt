'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { performanceHelpers } from '@/lib/web-vitals';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  systemTheme: ResolvedTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'phuc-khiem-theme';
const THEME_ATTRIBUTE = 'data-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Performance tracking
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<Theme>('system');
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('light');

  // Calculate resolved theme
  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme as ResolvedTheme;

  // Optimized theme detection
  const detectSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Performance-optimized theme application
  const applyTheme = useCallback((targetTheme: ResolvedTheme) => {
    performanceHelpers.mark('theme-apply-start');
    
    const root = document.documentElement;
    root.setAttribute(THEME_ATTRIBUTE, targetTheme);
    root.classList.remove('light', 'dark');
    root.classList.add(targetTheme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', targetTheme === 'dark' ? '#0f172a' : '#ffffff');
    }
    
    performanceHelpers.measure('theme-apply', 'theme-apply-start');
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`🎨 [Theme] Applied: ${targetTheme}`);
    }
  }, []);

  // Set theme with persistence
  const setTheme = useCallback((newTheme: Theme) => {
    performanceHelpers.mark('theme-change-start');
    
    setThemeState(newTheme);
    
    try {
      if (newTheme === 'system') {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Theme] localStorage not available:', error);
      }
    }
    
    performanceHelpers.measure('theme-change', 'theme-change-start');
  }, []);

  // Toggle between light and dark (smart toggle)
  const toggleTheme = useCallback(() => {
    if (theme === 'system') {
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  }, [theme, systemTheme, setTheme]);

  // Initialize theme from storage
  useEffect(() => {
    performanceHelpers.mark('theme-init-start');
    
    let savedTheme: Theme = 'system';
    
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        savedTheme = stored as Theme;
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Theme] Could not read from localStorage:', error);
      }
    }
    
    const currentSystemTheme = detectSystemTheme();
    setSystemTheme(currentSystemTheme);
    setThemeState(savedTheme);
    
    performanceHelpers.measure('theme-init', 'theme-init-start');
    setMounted(true);
  }, [detectSystemTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🌓 [Theme] System theme changed: ${newSystemTheme}`);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Apply theme when resolved theme changes
  useEffect(() => {
    if (!mounted) return;
    applyTheme(resolvedTheme);
  }, [resolvedTheme, mounted, applyTheme]);

  // Prevent hydration mismatch
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    systemTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// High-performance theme hook with memoization
export function useResolvedTheme() {
  const { resolvedTheme } = useTheme();
  return resolvedTheme;
}

// Hook for theme-dependent styles
export function useThemeStyles() {
  const { resolvedTheme } = useTheme();
  
  return {
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    className: `theme-${resolvedTheme}`,
    cssVariables: resolvedTheme === 'dark' ? 'dark-vars' : 'light-vars',
  };
}