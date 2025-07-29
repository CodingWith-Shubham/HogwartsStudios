'use client';
import PastClients from './PastClients'
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LightweightAnimatedCard } from '@/components/ui/lightweight-animated-card';
import { Star } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect, useRef } from 'react';

// ✅ Type definitions
interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  trigger?: number;
}

interface ScrollTriggeredTypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

interface ClientLogo {
  name: string;
  darkLogo: string;
  lightLogo: string;
  mobileWidth: string;
  mobileHeight: string;
  desktopWidth: string;
  desktopHeight: string;
}

// ✅ Typewriter Effect Component
function TypewriterText({ text, delay = 0, speed = 100, trigger = 0 }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typeTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeTimerRef.current) {
      clearInterval(typeTimerRef.current);
    }

    setDisplayText('');
    setIsTyping(false);

    const timer = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      typeTimerRef.current = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          if (typeTimerRef.current) clearInterval(typeTimerRef.current);
          setIsTyping(false);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (typeTimerRef.current) {
        clearInterval(typeTimerRef.current);
      }
    };
  }, [text, delay, speed, trigger]);

  return (
    <span>
      {displayText}
      <span className={`${isTyping ? 'animate-pulse' : 'opacity-0'}`}>|</span>
    </span>
  );
}

// ✅ Scroll-triggered Typewriter Wrapper
function ScrollTriggeredTypewriter({ text, delay = 0, speed = 100 }: ScrollTriggeredTypewriterProps) {
  const [trigger, setTrigger] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTrigger(prev => prev + 1);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <span ref={elementRef}>
      <TypewriterText text={text} delay={delay} speed={speed} trigger={trigger} />
    </span>
  );
}

// ✅ Main Testimonials Component
export function Testimonials() {

  const { theme } = useTheme();

  const clientLogos: ClientLogo[] = [
    {
      name: 'Nikyaa',
      darkLogo: '/Media/Nikyaalogo_on_bothdarkandlightmode.png',
      lightLogo: '/Media/Nikyaalogo_on_bothdarkandlightmode.png',
      mobileWidth: '90px',
      mobileHeight: '90px',
      desktopWidth: '200px',
      desktopHeight: '200px'
    },
    {
      name: "Papa Don't Preach",
      darkLogo: '/Media/papadontpreach_on_darkmode.png',
      lightLogo: '/Media/papadontpreach_on_lightmode.png',
      mobileWidth: '160px',
      mobileHeight: '150px',
      desktopWidth: '300px',
      desktopHeight: '300px'
    },
    {
      name: 'Rimzim Dadu',
      darkLogo: '/Media/Rimzimdadu_on_darkmode.png',
      lightLogo: '/Media/Rimzimdadu_on_lightmode.png',
      mobileWidth: '160px',
      mobileHeight: '120px',
      desktopWidth: '180px',
      desktopHeight: '55px'
    },
    {
      name: 'Cartier',
      darkLogo: '/Media/cartierlogo_on_darkmodee.png',
      lightLogo: '/Media/cartierlogo_on_lightmodee.png',
      mobileWidth: '80px',
      mobileHeight: '80px',
      desktopWidth: '190px',
      desktopHeight: '50px'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        
<PastClients/>
      

        {/* Client Logos */}
        <div className="text-center md:mb-20 md:mt-40">
          <LightweightAnimatedCard delay={600} duration={600} triggerOnce={true}>
            <p className="md:text-5xl text-3xl font-semibold text-foreground dark:text-foreground md:mb-4 font-body-alt min-h-[1.2em]">
              <ScrollTriggeredTypewriter text="Trusted By" delay={100} speed={150} />
            </p>
            <div className="grid grid-cols-2 place-items-center md:gap-x-8 md:gap-y-6 max-w-lg mx-auto gap-x-4 gap-y-4">
              {clientLogos.map((client, index) => (
                <LightweightAnimatedCard 
                  key={index}
                  delay={800 + (index * 100)}
                  duration={600}
                  triggerOnce={true}
                >
                  <div className="p-2 rounded-xl bg-transparent hover:scale-105 transition-transform duration-300">
                    <div className="block md:hidden">
                      <img
                        src={theme === 'dark' ? client.darkLogo : client.lightLogo}
                        alt={client.name}
                        className="object-contain"
                        style={{ 
                          width: client.mobileWidth, 
                          height: client.mobileHeight 
                        }}
                        loading="lazy"
                      />
                    </div>
                    <div className="hidden md:block">
                      <img
                        src={theme === 'dark' ? client.darkLogo : client.lightLogo}
                        alt={client.name}
                        className="object-contain"
                        style={{ 
                          width: client.desktopWidth, 
                          height: client.desktopHeight 
                        }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </LightweightAnimatedCard>
              ))}
            </div>
          </LightweightAnimatedCard>
        </div>
      </div>
    </section>
  );
}
