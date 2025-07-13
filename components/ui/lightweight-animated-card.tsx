'use client';

import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface LightweightAnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
  triggerOnce?: boolean;
}

export function LightweightAnimatedCard({ 
  children, 
  delay = 0, 
  className = '',
  duration = 500,
  triggerOnce = false
}: LightweightAnimatedCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '-50px',
    triggerOnce,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'transform transition-all duration-700 ease-out',
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95',
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
} 