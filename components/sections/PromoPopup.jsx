'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

const PromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 50);
    }, 10000);

    return () => clearTimeout(showTimer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 400);
  };

  const handleWhatsApp = () => {
    const phoneNumber = '919667474789';
    const message = encodeURIComponent('Hi! I\'m interested in your customized offers!');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    handleClose();
  };

  const handleCall = () => {
    window.location.href = 'tel:+919667474789';
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
      {/* Backdrop with subtle blur */}
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-md transition-all duration-500 pointer-events-auto ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />
      
      {/* Pop-up Container */}
      <div 
        className={`relative pointer-events-auto transform transition-all duration-700 ease-out ${
          isAnimating 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 translate-y-12'
        }`}
      >
        {/* Main Pop-up with glassmorphism */}
        <div className="relative w-[90vw] max-w-lg">
          {/* Gradient background glow - Red theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 via-rose-600/20 to-red-800/30 rounded-3xl blur-3xl opacity-70" />
          
          {/* Glass card */}
          <div className="relative bg-gradient-to-br from-black/95 via-zinc-950/95 to-black/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-900/20 overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 z-20 w-10 h-10 bg-red-600/20 hover:bg-red-600/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group border border-red-500/30 hover:border-red-500/50"
              aria-label="Close popup"
            >
              <X size={18} className="text-red-300 group-hover:text-white transition-colors" />
            </button>

            {/* Content */}
            <div className="relative px-8 py-12 md:px-12 md:py-16">
              {/* Brand mark */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-950/30 backdrop-blur-sm rounded-full border border-red-900/30">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-red-500 to-rose-500 rounded-full animate-pulse" />
                  <span className="text-red-200/70 text-xs font-medium tracking-widest uppercase">
                    Hogwarts Studios
                  </span>
                </div>
              </div>

              {/* Main Heading */}
              <div className="mb-6 space-y-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                  Connect for
                  <br />
                  <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
                    Customised Offers
                  </span>
                </h1>

                {/* Subtle accent line */}
                <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-full" />
              </div>

              {/* Subtitle */}
              <p className="text-gray-400 text-base md:text-lg mb-10 max-w-md leading-relaxed">
                Exclusive offer for the season – Get your Services Tailored
              </p>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* WhatsApp Button */}
                <button 
                  onClick={handleWhatsApp}
                  className="group flex-1 relative bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-medium px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/25 flex items-center justify-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <MessageCircle size={20} className="relative z-10" />
                  <span className="relative z-10">WhatsApp</span>
                </button>

                {/* Call Button */}
                <button 
                  onClick={handleCall}
                  className="group flex-1 relative bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-3 border border-red-500/20 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Phone size={20} className="relative z-10" />
                  <span className="relative z-10">Call Now</span>
                </button>
              </div>

              {/* Footer note */}
              <div className="mt-8 pt-6 border-t border-red-900/20">
                <p className="text-gray-500 text-xs text-center">
                  Reach out now - Whatsapp/call 9667474789
                </p>
              </div>
            </div>

            {/* Subtle ambient gradient overlays - Red theme */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;