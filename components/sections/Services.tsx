'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Mic, Camera, Palette, Sparkles } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Mic,
      title: 'Podcast Shoot & Edit',
      description: 'Professional audio recording, video production, and post-production editing for your podcast content.',
      features: ['4K Video Recording', 'Professional Audio', 'Multi-Camera Setup', 'Complete Post-Production'],
      price: 'Starting at $299'
    },
    {
      icon: Camera,
      title: 'Product Photography',
      description: 'Stunning product shots with our 10ft Cyclorama Wall and professional lighting setup.',
      features: ['10ft Cyclorama Wall', '360° Product Views', 'High-Resolution Images', 'Same-Day Delivery'],
      price: 'Starting at $199'
    },
    {
      icon: Palette,
      title: 'Fashion & Makeup Shoot',
      description: 'Complete fashion photography with professional makeup artists and styling services.',
      features: ['Professional Makeup', 'Styling Consultation', 'Multiple Looks', 'Retouching Included'],
      price: 'Starting at $399'
    },
    {
      icon: Sparkles,
      title: 'Ad & Personal Brand Shoot',
      description: 'Create compelling visual content for your advertisements and personal brand campaigns.',
      features: ['Brand Strategy', 'Creative Direction', 'Multiple Deliverables', 'Usage Rights Included'],
      price: 'Starting at $499'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Reduced density background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-300 rounded-full floating-particle glow-pulse" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-yellow-300 rounded-full floating-particle-delayed glow-pulse" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-orange-300 rounded-full floating-particle glow-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Comprehensive creative solutions tailored to bring your vision to life with professional excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <AnimatedCard 
              key={index} 
              delay={index * 0.1}
              duration={0.7}
            >
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-2">{service.title}</CardTitle>
                  <CardDescription className="text-foreground/70">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-foreground/80">
                        <div className="w-2 h-2 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-red-600">{service.price}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="btn-outline-glow border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <AnimatedCard delay={0.4}>
            <Button 
              size="lg" 
              className="btn-glow bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-semibold transition-all duration-300"
            >
              View All Services
            </Button>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}