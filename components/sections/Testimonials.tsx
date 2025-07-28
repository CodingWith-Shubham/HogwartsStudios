'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LightweightAnimatedCard } from '@/components/ui/lightweight-animated-card';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Podcast Host',
      company: 'The Creative Mind',
      content: 'Hogwarts Studios transformed our podcast from amateur to professional. The team\'s attention to detail and creative vision exceeded our expectations.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Michael Chen',
      role: 'Brand Manager',
      company: 'TechFlow Inc.',
      content: 'The product photography session was outstanding. The 10ft Cyclorama Wall setup gave us exactly the clean, professional look we needed.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Fashion Designer',
      company: 'Elegance Studio',
      content: 'The fashion shoot was magical! The team understood our vision perfectly and delivered stunning results that elevated our brand.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'David Thompson',
      role: 'Entrepreneur',
      company: 'StartupLab',
      content: 'Professional, creative, and efficient. The personal brand shoot captured exactly what I needed for my marketing campaigns.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const clientLogos = [
    { name: 'TechFlow', logo: 'TF' },
    { name: 'Creative Mind', logo: 'CM' },
    { name: 'StartupLab', logo: 'SL' },
    { name: 'Elegance', logo: 'EL' },
    { name: 'BrandCorp', logo: 'BC' },
    { name: 'MediaHub', logo: 'MH' }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans">
            What Our Clients Say
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto font-body-alt">
            Don't just take our word for it - hear from the creative professionals who trust us with their vision
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <LightweightAnimatedCard 
              key={index} 
              delay={index * 150}
              duration={600} triggerOnce={true}
            >
              <Card className="border-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-foreground/80 mb-6 font-quote">"{testimonial.content}"</p>
                  
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-foreground font-body-alt">{testimonial.name}</h4>
                      <p className="text-sm text-foreground/70 font-body-alt">{testimonial.role}</p>
                      <p className="text-sm text-red-600 font-medium font-body-alt">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </LightweightAnimatedCard>
          ))}
        </div>

        {/* Client Logos */}
        <div className="text-center">
          <LightweightAnimatedCard delay={600} duration={600} triggerOnce={true}>
            <p className="text-lg font-semibold text-foreground/80 mb-8 font-body-alt">Trusted by Leading Brands</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {clientLogos.map((client, index) => (
                <LightweightAnimatedCard 
                  key={index} 
                  delay={800 + (index * 100)}
                  duration={600} triggerOnce={true}
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-yellow-500 rounded-lg hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg font-magical">{client.logo}</span>
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