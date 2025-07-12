'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/Media/finalherobg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      {/* Subtle Magical Particles */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400/30 rounded-full floating-particle glow-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-orange-400/30 rounded-full floating-particle-delayed glow-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-red-400/30 rounded-full floating-particle glow-pulse" />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-yellow-300/30 rounded-full floating-particle-delayed glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-orange-300/30 rounded-full floating-particle glow-pulse" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-30">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight font-magical drop-shadow-2xl"
          >
            Where Stories
            <br />
            Come to Life
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed font-medium font-body-alt drop-shadow-lg"
          >
            Explore, create, and rent podcast spaces that spark imagination.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
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
              className="btn-outline-glow play-icon-hover border-2 border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white dark:border-white dark:text-white dark:bg-transparent dark:hover:bg-white/10 px-8 py-6 text-lg font-semibold transition-all duration-300 font-body-alt"
            >
              <Play className="mr-2 h-5 w-5 play-icon transition-transform duration-300" />
              Watch Showreel
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/30 rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}