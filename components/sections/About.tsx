'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Trophy, Users, Camera, Award } from 'lucide-react';

export function About() {
  const achievements = [
    {
      icon: Trophy,
      number: '100+',
      label: 'Podcasts Delivered',
      description: 'Successfully produced and delivered over 100 podcast episodes'
    },
    {
      icon: Users,
      number: '500+',
      label: 'Happy Clients',
      description: 'Satisfied customers who trust us with their creative vision'
    },
    {
      icon: Camera,
      number: '1000+',
      label: 'Projects Completed',
      description: 'Diverse range of creative projects across multiple industries'
    },
    {
      icon: Award,
      number: '50+',
      label: 'Awards Won',
      description: 'Recognition for excellence in creative storytelling and production'
    }
  ];

  const reasons = [
    {
      title: 'State-of-the-Art Equipment',
      description: 'Professional-grade cameras, lighting, and audio equipment for pristine quality'
    },
    {
      title: 'Creative Expertise',
      description: 'Experienced team of photographers, videographers, and creative directors'
    },
    {
      title: 'Flexible Packages',
      description: 'Customizable service packages to fit your budget and requirements'
    },
    {
      title: 'Quick Turnaround',
      description: 'Fast delivery without compromising on quality or attention to detail'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
            Why Choose Hogwarts Studios?
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            We transform ideas into compelling visual stories that captivate audiences and drive results
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <AnimatedCard 
              key={index} 
              delay={index * 0.15}
              duration={0.7}
            >
              <Card className="text-center border-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{achievement.number}</h3>
                  <p className="text-lg font-semibold text-red-600 mb-2">{achievement.label}</p>
                  <p className="text-sm text-foreground/70">{achievement.description}</p>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>

        {/* Reasons to Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <AnimatedCard 
              key={index} 
              delay={0.6 + (index * 0.1)}
              duration={0.7}
            >
              <Card className="border-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-gradient-to-r from-red-600 to-yellow-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                      <p className="text-foreground/70">{reason.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <AnimatedCard delay={1.0}>
            <Badge variant="outline" className="text-red-600 border-red-600 px-4 py-2 text-sm">
              Trusted by 500+ Creative Professionals
            </Badge>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}