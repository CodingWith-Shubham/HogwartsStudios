'use client';

import React, { useState, useEffect } from 'react';
import { Star, Sparkles } from 'lucide-react';

// Mock framer-motion for this environment
const motion = {
  div: ({ 
    children, 
    className, 
    initial, 
    animate, 
    exit, 
    transition, 
    layout, 
    ...props 
  }: {
    children: React.ReactNode;
    className?: string;
    initial?: object;
    animate?: object;
    exit?: object;
    transition?: object;
    layout?: boolean | string;
    [key: string]: any;
  }) => (
    <div className={className} {...props}>{children}</div>
  ),
};

const AnimatePresence = ({ 
  mode, 
  children 
}: { 
  mode?: "wait" | "sync" | "popLayout"; 
  children: React.ReactNode 
}) => children;

interface CelebrityClient {
  id: string;
  name: string;
  profession: string;
  image: string;
  clientSince: string;
  status: 'featured' | 'ongoing' | 'vip';
  isActive?: boolean;
}

const celebrityClients: CelebrityClient[] = [
  {
    id: '1',
    name: 'Yo Yo Honey Singh',
    profession: 'Singer & Rapper',
    image: '/Media/celebrity2-min.jpg',
    clientSince: '2023',
    // status: 'featured',
    status: 'vip',
    isActive: true,
  },
  {
    id: '2',
    name: 'Urvashi Rautela',
    profession: 'Actress & Model',
    image: '/Media/celebrity4-min.jpg',
    clientSince: '2023',
    status: 'vip',
    isActive: true,
  },
  {
    id: '3',
    name: 'Sonu Sood',
    profession: 'Actor & DJ',
    image: '/Media/celebrity5-min.jpg',
    clientSince: '2022',
    status: 'vip',
  },
  {
    id: '4',
    name: 'Karuna Gidwani',
    profession: 'Million Dollar Listing',
    image: '/Media/celebrity3-min.png',
    clientSince: '2024',
    status: 'featured',
    isActive: true,
  },
  {
    id: '5',
    name: 'Sanjeev Bhikhchandani',
    profession: 'Venture Capitalist',
    image: '/Media/celebrity1-min.png',
    clientSince: '2024',
    status: 'featured',
    isActive: true,
  },
];

const getStatusBadge = (status: string) => {
  const badges = {
    featured: { 
      label: 'Featured', 
      className: 'bg-red-500 text-white font-semibold' 
    },
    ongoing: { 
      label: 'Ongoing', 
      className: 'bg-gray-300 text-gray-800 font-semibold' 
    },
    vip: { 
      label: 'VIP', 
      className: 'bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold' 
    },
  };
  
  return badges[status as keyof typeof badges] || badges.featured;
};

// Mobile Stack Animation Component
// Mobile Stack Animation Component - Responsive Version
const MobileCardStack = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % celebrityClients.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:hidden flex items-center justify-center relative overflow-visible px-4 sm:px-6 py-4"> {/* Reduced py-8 to py-4 */}
      <div className="relative w-full max-w-[280px] sm:max-w-[320px] min-h-[320px]"> {/* Adjusted min-h */}
        {celebrityClients.map((client, index) => {
          const isActive = index === current;
          const isNext = index === (current + 1) % celebrityClients.length;
          const isPrev = index === (current - 1 + celebrityClients.length) % celebrityClients.length;
          
          let className = "absolute inset-0 transition-all duration-700 ease-in-out transform ";
          
          if (isActive) {
            className += "opacity-100 scale-100 translate-y-0 z-30";
          } else if (isNext) {
            className += "opacity-0 scale-90 translate-y-12 z-10";
          } else if (isPrev) {
            className += "opacity-0 scale-90 -translate-y-12 z-10";
          } else {
            className += "opacity-0 scale-80 translate-y-24 z-0";
          }

          return (
            <div key={client.id} className={className}>
              <div className="w-full h-full px-2">
                <CelebrityCard client={client} index={index} />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Stack Indicator - moved up slightly */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {celebrityClients.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current ? 'bg-red-500 w-6' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Desktop Carousel Component - Train-like infinite animation
const DesktopCarousel = () => {
  const [translateX, setTranslateX] = useState(0);
  const cardWidth = 300; // Width + gap
  const totalCards = celebrityClients.length;
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX(prev => {
        const newTranslate = prev - cardWidth;
        // Reset when we've moved one full set
        if (Math.abs(newTranslate) >= cardWidth * totalCards) {
          return 0;
        }
        return newTranslate;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Create infinite loop by duplicating cards
  const duplicatedCards = [...celebrityClients, ...celebrityClients, ...celebrityClients];

  return (
    <div className="hidden md:block relative overflow-hidden">
      {/* Track container */}
      <div className="relative w-full">
        {/* Fade gradients */}
        <div className={`absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r ${isDark ? 'from-black' : 'from-background'} to-transparent z-10 pointer-events-none`} />
        <div className={`absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l ${isDark ? 'from-black' : 'from-background'} to-transparent z-10 pointer-events-none`} />
        
        {/* Train track */}
        <div className="flex items-center justify-center py-8">
          <div 
            className="flex gap-8 transition-transform duration-[1500ms] ease-linear"
            style={{
              transform: `translateX(${translateX}px)`,
              width: `${duplicatedCards.length * cardWidth}px`
            }}
          >
            {duplicatedCards.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0"
                style={{ width: `${cardWidth - 32}px` }}
              >
                <CelebrityCard client={client} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Train track lines */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-800 to-transparent opacity-30"></div>
      <div className="absolute bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent opacity-20"></div>
    </div>
  );
};

import { useTheme } from 'next-themes';

const ClientShowcase = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <section className={`relative py-16 ${isDark ? 'bg-black' : 'bg-background'} overflow-hidden min-h-screen`}>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <Sparkles 
          className="absolute top-20 left-10 text-red-500" 
          size={24}
          style={{ animation: 'float 3s ease-in-out infinite' }}
        />
        <Star 
          className="absolute top-32 right-20 text-gray-500" 
          size={16}
          style={{ animation: 'float 4s ease-in-out infinite 0.5s' }}
        />
        <Sparkles 
          className="absolute bottom-20 left-1/4 text-red-400" 
          size={20}
          style={{ animation: 'float 3.5s ease-in-out infinite 1s' }}
        />
        <Star 
          className="absolute bottom-32 right-1/3 text-red-500" 
          size={14}
          style={{ animation: 'float 4s ease-in-out infinite 1.5s' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div 
            className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-full px-6 py-2 mb-6"
            style={{ animation: 'fadeInUp 0.6s ease-out' }}
          >
            <Star className="text-red-400" size={16} />
            <span className={`${isDark ? 'text-gray-400' : 'text-muted-foreground'} text-sm font-medium`}>Celebrity Portfolio</span>
          </div>
          
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}
          >
            <span className={isDark ? 'text-white' : 'text-foreground'}>Our</span>{' '}
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Star</span>{' '}
            <span className={isDark ? 'text-white' : 'text-foreground'}>Clients</span>
          </h2>
          
          <p 
            className={`text-lg sm:text-xl ${isDark ? 'text-gray-400' : 'text-muted-foreground'} max-w-2xl mx-auto leading-relaxed`}
            style={{ animation: 'fadeInUp 0.6s ease-out 0.4s both' }}
          >
            Icons who trust our lens to capture their most memorable moments
          </p>
        </div>

        {/* Mobile Stack Animation */}
        <MobileCardStack />

        {/* Desktop Looping Carousel */}
        <DesktopCarousel />

        {/* Footer CTA */}
        <div 
          className="text-center mt-16"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.6s both' }}
        >
          <div className={`inline-flex items-center gap-3 ${isDark ? 'text-gray-400' : 'text-muted-foreground'}`}>
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-red-500"></div>
            <span className="text-sm font-medium">Join Our Elite Clientele</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-red-500"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutToLeft {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-slideInFromRight {
          animation: slideInFromRight 0.6s ease-out both;
        }
        
        .animate-slideOutToLeft {
          animation: slideOutToLeft 0.6s ease-out both;
        }
      `}</style>
    </section>
  );
};

interface CelebrityCardProps {
  client: CelebrityClient;
  index: number;
}

const CelebrityCard = ({ client, index }: CelebrityCardProps) => {
  const statusBadge = getStatusBadge(client.status);
  
  return (
    <div className="group relative h-full">
      {/* Status Ribbon */}
      <div className="absolute -top-2 -right-2 z-20">
        <span className={`${statusBadge.className} text-xs px-3 py-1 rounded-full shadow-lg`}>
          {statusBadge.label}
        </span>
      </div>

      {/* Card Container */}
      <div className="relative h-full bg-gray-900/70 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 group-hover:border-red-500/40">
        {/* Shine Effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        </div>

        {/* Profile Image */}
        <div className="relative mb-6 mx-auto w-24 h-24">
          {/* Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-red-700 p-[2px]">
            <div className="w-full h-full rounded-full bg-gray-900 p-1">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
          
          {/* Active Indicator */}
          {client.isActive && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-red-700 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse" />
            </div>
          )}
        </div>

        {/* Client Info */}
        <div className="text-center space-y-3">
          <h3 className="text-white font-bold text-lg leading-tight group-hover:text-red-500 transition-colors duration-300">
            {client.name}
          </h3>
          
          <p className="text-gray-400 text-sm font-medium">
            {client.profession}
          </p>
          
          <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 border border-gray-800/50">
            <Star className="text-red-500" size={12} />
            <span className="text-gray-400 text-xs font-medium">
              Client Since {client.clientSince}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientShowcase;