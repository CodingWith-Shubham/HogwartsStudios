'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LightweightMobileMenuProps {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
  duration?: number;
}

export function LightweightMobileMenu({ 
  isOpen, 
  children, 
  className = '',
  duration = 400
}: LightweightMobileMenuProps) {
  return (
    <div
      className={cn(
        'overflow-hidden transition-all duration-600 ease-in-out',
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
        className
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}

interface MenuItemProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function MenuItem({ children, delay = 0, className = '' }: MenuItemProps) {
  return (
    <div
      className={cn(
        'transform transition-all duration-600 ease-out',
        'opacity-100 translate-y-0',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
} 