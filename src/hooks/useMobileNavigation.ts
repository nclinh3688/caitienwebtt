'use client';

import { useState } from 'react';

export function useMobileNavigation() {
  const [currentView, setCurrentView] = useState<'menu' | 'languages' | 'levels' | 'content'>('menu');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const showLanguages = () => setCurrentView('languages');
  
  const showLevels = (lang: string) => {
    setSelectedLanguage(lang);
    setCurrentView('levels');
  };
  
  const showContent = (level: string) => {
    setSelectedLevel(level);
    setCurrentView('content');
  };
  
  const goBack = () => {
    if (currentView === 'content') {
      setCurrentView('levels');
      setSelectedLevel('');
    } else if (currentView === 'levels') {
      setCurrentView('languages');
      setSelectedLanguage('');
    } else if (currentView === 'languages') {
      setCurrentView('menu');
    }
  };
  
  const resetMobileMenu = () => {
    setCurrentView('menu');
    setSelectedLanguage('');
    setSelectedLevel('');
  };

  return {
    currentView,
    selectedLanguage,
    selectedLevel,
    showLanguages,
    showLevels,
    showContent,
    goBack,
    resetMobileMenu
  };
}
