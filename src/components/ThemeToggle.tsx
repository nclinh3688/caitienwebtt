'use client';

import React, { memo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'icon' | 'text' | 'dropdown';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

const ThemeToggle = memo(function ThemeToggle({ 
  variant = 'icon', 
  size = 'default',
  className = '' 
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme, toggleTheme } = useTheme();

  // Performance optimized icon mapping
  const getIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="h-4 w-4" />;
      case 'dark': return <Moon className="h-4 w-4" />;
      case 'system': return <Monitor className="h-4 w-4" />;
      default: return <Sun className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light': return 'Sáng';
      case 'dark': return 'Tối';
      case 'system': return 'Hệ thống';
      default: return 'Sáng';
    }
  };

  // Simple toggle for icon variant
  if (variant === 'icon') {
    return (
      <Button
        variant="ghost"
        size={size}
        onClick={toggleTheme}
        className={`relative ${className}`}
        aria-label={`Chuyển theme (hiện tại: ${getLabel()})`}
        title={`Theme hiện tại: ${getLabel()}`}
      >
        <div className="relative w-4 h-4">
          {getIcon()}
        </div>
        <span className="sr-only">Chuyển đổi theme</span>
      </Button>
    );
  }

  // Text variant with current theme display
  if (variant === 'text') {
    return (
      <Button
        variant="outline"
        size={size}
        onClick={toggleTheme}
        className={`gap-2 ${className}`}
        aria-label={`Chuyển theme (hiện tại: ${getLabel()})`}
      >
        {getIcon()}
        <span>{getLabel()}</span>
      </Button>
    );
  }

  // Dropdown variant with all options
  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <Button
          variant="ghost"
          size={size}
          onClick={toggleTheme}
          className="gap-2"
          aria-label="Theme options"
        >
          {getIcon()}
          <span className="hidden sm:inline">{getLabel()}</span>
        </Button>
        
        {/* Mini theme status indicator */}
        <div 
          className={`absolute -top-1 -right-1 w-2 h-2 rounded-full transition-colors duration-200 ${
            resolvedTheme === 'dark' 
              ? 'bg-blue-500' 
              : 'bg-yellow-500'
          }`}
          aria-hidden="true"
        />
      </div>
    );
  }

  return null;
});

// Advanced theme selector component
export const ThemeSelector = memo(function ThemeSelector() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themes = [
    { value: 'light' as const, label: 'Sáng', icon: Sun },
    { value: 'dark' as const, label: 'Tối', icon: Moon },
    { value: 'system' as const, label: 'Hệ thống', icon: Monitor },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
      {themes.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          variant={theme === value ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTheme(value)}
          className={`gap-2 transition-all duration-200 ${
            theme === value 
              ? 'shadow-sm' 
              : 'hover:bg-muted-foreground/10'
          }`}
          aria-label={`Chọn theme ${label}`}
          aria-pressed={theme === value}
        >
          <Icon className="h-3 w-3" />
          <span className="text-xs">{label}</span>
        </Button>
      ))}
    </div>
  );
});

export default ThemeToggle;