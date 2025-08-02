'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface LazyComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
}

export function LazyComponent({ 
  children, 
  fallback = <div className="h-32 animate-pulse bg-gray-200 rounded-lg" />,
  className = '',
  rootMargin = '100px',
  threshold = 0.1
}: LazyComponentProps) {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsInView(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold, hasLoaded]);

  return (
    <div ref={componentRef} className={className}>
      {isInView ? children : fallback}
    </div>
  );
}

export default LazyComponent;