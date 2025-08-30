'use client';

import { useEffect } from 'react';

export default function AccessibilityEnhancer() {
  useEffect(() => {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-blue-500';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach((button, index) => {
      if (!button.textContent?.trim()) {
        button.setAttribute('aria-label', `Button ${index + 1}`);
      }
    });

    // Add focus management
    const focusableElements = document.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((element) => {
      element.addEventListener('keydown', (e: Event) => {
        const keyEvent = e as KeyboardEvent;
        if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
          e.preventDefault();
          if (element instanceof HTMLElement) {
            element.click();
          }
        }
      });
    });

    // Add high contrast mode support
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)');
    if (prefersHighContrast.matches) {
      document.documentElement.classList.add('high-contrast');
    }

    // Add reduced motion support
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduced-motion');
    }
  }, []);

  return null;
}
