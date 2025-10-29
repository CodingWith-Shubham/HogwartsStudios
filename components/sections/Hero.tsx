'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, X } from 'lucide-react';
import { BookingModal } from './BookingModal';
import Image from 'next/image';
export function Hero() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);

  useEffect(() => {
    // Handle escape key for video modal
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showVideo) {
        handleCloseVideo();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showVideo]);

  // Prevent body scroll when video is open
  useEffect(() => {
    if (showVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showVideo]);

  const handleVideoClick = () => {
    setVideoLoading(true);
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    setVideoLoading(false);
  };

  return (
    <>
    <section
  id="home"
  className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16"
>

        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat opacity-50"
          
        />
        <Image
    src="/Media/hogwartsbg8-min.jpeg"
    alt="Hogwarts Background"
    fill
    className="object-cover"
    priority
  />
   {/* Overlay for opacity */}
  <div className="absolute inset-0 bg-black/50"></div>

        {/* Video Background - Only on lg and above */}
        <div className="hidden lg:block absolute inset-0 w-full h-full z-0">
     
        </div>
        
        {/* Mobile/Tablet Slideshow - Only on lg and below */}
        <div className="lg:hidden">
         
        </div>
        
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
            <h1 
              className="text-[43px] md:text-7xl font-bold lg:mb-6 sm:mb-3 text-white leading-tight font-sans drop-shadow-2xl animate-fade-in-up"
              style={{ animationDelay: '0ms' }}
            >
              Where Creativity
              <br />
              Finds Its Frame
            </h1>
            <p 
              className="text-[17px] md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed font-medium font-body-alt drop-shadow-lg animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              Your one-stop studio for professional shoots, product, fashion, podcast, outdoor, and more — crafted with cinematic precision.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              <Button 
                size="lg" 
                className="btn-glow bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-semibold shadow-lg transition-all duration-300 font-body-alt"
                onClick={() => setIsBookingModalOpen(true)}
              >
                Book Service
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-outline-glow play-icon-hover border-2 border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white dark:border-white dark:text-white dark:bg-transparent dark:hover:bg-white/10 px-8 py-6 text-lg font-semibold transition-all duration-300 font-body-alt"
                onClick={handleVideoClick}
              >
                <Play className="mr-2 h-5 w-5 play-icon transition-transform duration-300" />
                Studio Walkthrough
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30 animate-fade-in"
          style={{ animationDelay: '800ms' }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/30 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-6xl">
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 md:-top-14 md:-right-14 text-white hover:text-red-500 transition-colors p-2 rounded-full hover:bg-white/10 z-10"
              aria-label="Close video"
            >
              <X className="h-8 w-8" />
            </button>
            
            <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
              {/* Loading Spinner */}
              {videoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-sm">Loading studio tour...</p>
                  </div>
                </div>
              )}
              
              {/* Video Player */}
              <video
                className="w-full h-auto max-h-[85vh]"
                controls
                autoPlay
                playsInline
                onLoadedData={() => setVideoLoading(false)}
                onError={() => {
                  setVideoLoading(false);
                  alert('Error loading video. Please check if the video file exists at /Media/videos/studiotour.mp4');
                }}
                preload="none"
              >
                <source src="/Media/videos/studiotour.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Video Title */}
            <div className="text-center mt-4">
              <p className="text-white text-lg font-semibold">Hogwarts Studios - Studio Walkthrough</p>
              <p className="text-white/70 text-sm mt-1">Experience our professional setup and facilities</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}