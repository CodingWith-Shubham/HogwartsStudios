'use client';

import { useState, useEffect } from 'react';

const PromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
    }, 1000);

    // Auto-close after 10 seconds
    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(autoCloseTimer);
    };
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Pop-up Container */}
      <div 
        className={`relative pointer-events-auto transform transition-all duration-500 ease-out ${
          isAnimating 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-75 opacity-0 translate-y-8'
        }`}
      >
        {/* Main Pop-up */}
        <div className="w-80 h-96 md:w-[500px] md:h-[500px] bg-black rounded-2xl shadow-2xl overflow-hidden relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors duration-200 group shadow-lg"
            aria-label="Close popup"
          >
            <span className="text-white text-lg font-bold">×</span>
          </button>

          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Christmas ornaments in corners */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-red-500 rounded-full opacity-80"></div>
            <div className="absolute top-8 left-12 w-6 h-6 bg-yellow-400 rounded-full opacity-70"></div>
            <div className="absolute bottom-4 right-12 w-8 h-8 bg-red-500 rounded-full opacity-80"></div>
            <div className="absolute bottom-8 right-4 w-6 h-6 bg-yellow-400 rounded-full opacity-70"></div>
            
            {/* Snowflakes */}
            <div className="absolute top-12 right-20 text-red-400 text-lg opacity-60">❄</div>
            <div className="absolute bottom-16 left-8 text-red-400 text-lg opacity-60">❄</div>
            <div className="absolute top-20 left-20 text-yellow-400 text-sm opacity-50">✨</div>
            <div className="absolute bottom-20 right-20 text-yellow-400 text-sm opacity-50">✨</div>
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
            {/* Brand Logo Area */}
            <div className="mb-2">
              <div className="text-red-400 font-bold text-sm tracking-wider">HOGWARTS STUDIOS</div>
            </div>

            {/* Main Heading */}
            <div className="mb-3">
              {/* "Year end" style text */}
              <h1 className="text-2xl md:text-5xl font-bold text-white mb-1 transform -rotate-2">
                <span className="italic font-script">Year end</span>
              </h1>
              
              {/* "MEGA DEALS" style text */}
              <div className="relative">
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-full transform rotate-1 shadow-lg">
                  <h2 className="text-xl md:text-4xl font-black tracking-tight">
                    MEGA DEALS
                  </h2>
                </div>
                {/* Small decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-orange-400 rounded-full"></div>
              </div>
            </div>

            {/* Subtitle */}
            <div className="bg-yellow-400 text-red-800 px-3 py-1 md:px-4 md:py-2 rounded-lg font-bold text-xs md:text-sm mb-3 shadow-md">
              BIGGEST DEALS OF THE SEASON
            </div>

            {/* Date Range */}
            <div className="bg-gray-800 text-white px-4 py-1 md:px-6 md:py-2 rounded-lg font-bold text-xs md:text-base mb-4">
              25<sup>TH</sup> TO 31<sup>ST</sup> DECEMBER
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => {
               
                handleClose();
              }}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-6 py-2 md:px-8 md:py-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-base md:text-lg"
            >
              Book Now! 🎵
            </button>

            {/* Decorative stars */}
            <div className="absolute top-1/2 left-4 text-yellow-400 text-2xl opacity-80 animate-pulse">⭐</div>
            <div className="absolute top-1/3 right-4 text-yellow-400 text-xl opacity-80 animate-pulse" style={{animationDelay: '0.5s'}}>⭐</div>
          </div>

          {/* Bottom decorative border */}
         
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;