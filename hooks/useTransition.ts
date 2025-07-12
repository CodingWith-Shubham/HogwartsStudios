import { useState, useEffect, useCallback } from 'react';

interface TransitionOptions {
  duration?: number;
  delay?: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}

export function useTransition(
  isVisible: boolean,
  options: TransitionOptions = {}
) {
  const { duration = 300, delay = 0, easing = 'ease-out' } = options;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const startTransition = useCallback(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, duration + delay);
    return () => clearTimeout(timer);
  }, [duration, delay]);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const cleanup = startTransition();
      return cleanup;
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, startTransition]);

  return {
    shouldRender,
    isTransitioning,
    style: {
      transition: `all ${duration}ms ${easing} ${delay}ms`,
    },
  };
} 