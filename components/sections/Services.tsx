'use client';

import { Card, CardContent } from '@/components/ui/card';
import { LightweightAnimatedCard } from '@/components/ui/lightweight-animated-card';
import { Mic, Camera, Palette, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';

export function Services() {
  const services = [
    {
      icon: Mic,
      title: 'SETS ON RENT',
      image: "/Media/hogwartsbg1-min.jpeg",
      rating: 4.8,
      features: ['4K Video Recording', 'Professional Audio'],
      price: 'Starting at ₹ 3500/hour'
    },
    {
      icon: Camera,
      title: 'SETS + SHOOT',
      image: "/Media/hogwartsbg2-min.jpeg",
      rating: 4.5,
      features: ['10ft Cyclorama Wall', '360° Product Views'],
      price: 'Starting at ₹ 3999 only'
    },
    {
      icon: Palette,
      title: ' SET + SHOOT + EDIT',
      image: "/Media/hogwartsbg3-min.jpeg",
      rating: 4.9,
      features: ['Professional Makeup', 'Styling Consultation'],
      price: 'Starting at ₹ 6999 only'
    },
    {
      icon: Sparkles,
      title: 'SOCIAL MEDIA MANAGEMENT AND MARKETING ',
      image: "/Media/hogwartsbg4-min.jpeg",
      rating: 4.7,
      features: ['Brand Strategy', 'Creative Direction'],
      
      price: 'Starting at ₹ 9,999 only'
    }
  ];

  const animations = ['right', 'left', 'right', 'left'] as const;

  return (
    <section id="services" className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 font-sans lg:mb-7">
          Services We Master At 
          </h2>
          <p className="text-[15px] text-foreground/80 max-w-2xl mx-auto font-body-alt">
          Discover what suits you best—don't miss out on our top picks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const animationType = animations[index % animations.length];

            return (
              <LightweightAnimatedCard 
                key={index}
                delay={index * 100}
                duration={900}
                triggerOnce={true}
                animationType={animationType}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm h-full">
                  <div className="relative">
                    <div className="relative w-full h-48">
                      <Image 
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover"
                        priority={index < 2}
                      />
                    </div>
                    
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold">{service.title}</h3>
                      <div className="flex items-center bg-green-600 text-white px-2 py-0.5 rounded-md text-sm">
                        {service.rating} <Star className="w-3 h-3 ml-1 text-white" />
                      </div>
                    </div>
                    <p className="text-foreground/70 text-sm mb-2">{service.features.join(' • ')}</p>
                    <p className="text-lg font-semibold">{service.price}</p>
                  </CardContent>
                </Card>
              </LightweightAnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}