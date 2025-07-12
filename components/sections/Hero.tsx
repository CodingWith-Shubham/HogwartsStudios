'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50 dark:from-red-900/20 dark:via-yellow-900/20 dark:to-orange-900/20" />
      
      {/* Animated Background Elements - Reduced opacity in light mode */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-200 dark:bg-red-700/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-70 animate-pulse" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-200 dark:bg-yellow-700/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-70 animate-pulse delay-300" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-orange-200 dark:bg-orange-700/30 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-70 animate-pulse delay-700" />
      </div>

      {/* Reduced density floating particles (20% fewer) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-red-400 rounded-full floating-particle glow-pulse" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full floating-particle-delayed glow-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-orange-400 rounded-full floating-particle glow-pulse" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-red-300 rounded-full floating-particle-delayed glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-yellow-300 rounded-full floating-particle glow-pulse" />
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-orange-300 rounded-full floating-particle-delayed glow-pulse" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-600 via-yellow-500 to-orange-600 bg-clip-text text-transparent leading-tight font-magical">
            Where Stories
            <br />
            Come to Life
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 dark:text-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed font-medium font-body-alt">
            Professional creative studio bringing your vision to reality through stunning visuals, 
            compelling content, and magical storytelling experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="btn-glow bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-semibold shadow-lg transition-all duration-300 font-body-alt"
            >
              Book a Session
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-outline-glow play-icon-hover border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-6 text-lg font-semibold transition-all duration-300 font-body-alt"
            >
              <Play className="mr-2 h-5 w-5 play-icon transition-transform duration-300" />
              Watch Showreel
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground/30 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}