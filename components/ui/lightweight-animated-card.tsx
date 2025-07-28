'use client';

import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

type AnimationType = 'bottom' | 'left' | 'right' | 'zoom';

interface LightweightAnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
  triggerOnce?: boolean;
  animationType?: AnimationType;
}

export function LightweightAnimatedCard({ 
  children, 
  delay = 0, 
  className = '',
  duration = 500,
  triggerOnce = false,
  animationType = 'bottom'
}: LightweightAnimatedCardProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '-50px',
    triggerOnce,
  });

  const animationMap: Record<AnimationType, string> = {
    bottom: 'translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    zoom: 'scale-90',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transform transition-all will-change-opacity will-change-transform',
        'ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
        isVisible 
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
          : `opacity-0 ${animationMap[animationType]}`,
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
