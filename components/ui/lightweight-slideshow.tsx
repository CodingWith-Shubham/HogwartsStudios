'use client';

import { useState, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LightweightSlideshowProps {
  children: ReactNode[];
  interval?: number;
  className?: string;
  slideClassName?: string;
}

export function LightweightSlideshow({ 
  children, 
  interval = 3000,
  className = '',
  slideClassName = ''
}: LightweightSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % children.length);
    }, interval);

    return () => clearInterval(timer);
  }, [children.length, interval]);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {children.map((child, index) => (
        <div
          key={index}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000 ease-in-out',
            index === currentSlide ? 'opacity-100' : 'opacity-0',
            slideClassName
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
} 