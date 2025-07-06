'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Eye, ExternalLink } from 'lucide-react';

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'podcast', name: 'Podcasts' },
    { id: 'product', name: 'Product' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'brand', name: 'Brand' }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Tech Startup Podcast',
      category: 'podcast',
      image: 'https://images.pexels.com/photos/7130549/pexels-photo-7130549.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Weekly tech podcast with industry leaders'
    },
    {
      id: 2,
      title: 'Luxury Watch Collection',
      category: 'product',
      image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'High-end product photography for luxury brand'
    },
    {
      id: 3,
      title: 'Fashion Week Editorial',
      category: 'fashion',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Editorial fashion shoot for emerging designer'
    },
    {
      id: 4,
      title: 'CEO Personal Brand',
      category: 'brand',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Personal branding session for tech executive'
    },
    {
      id: 5,
      title: 'Fitness Equipment Line',
      category: 'product',
      image: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Product photography for fitness equipment'
    },
    {
      id: 6,
      title: 'Creative Agency Podcast',
      category: 'podcast',
      image: 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Creative industry insights and interviews'
    },
    {
      id: 7,
      title: 'Sustainable Fashion Brand',
      category: 'fashion',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Eco-friendly fashion brand campaign'
    },
    {
      id: 8,
      title: 'Startup Founder Series',
      category: 'brand',
      image: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=500',
      description: 'Personal branding for startup founders'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Reduced density background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-2 h-2 bg-yellow-300 rounded-full floating-particle glow-pulse" />
        <div className="absolute top-1/2 right-20 w-3 h-3 bg-red-300 rounded-full floating-particle-delayed glow-pulse" />
        <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-orange-300 rounded-full floating-particle glow-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent">
            Our Portfolio
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Explore our diverse collection of creative projects that showcase our expertise across different industries
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <AnimatedCard key={category.id} delay={index * 0.1}>
              <Button
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? 'btn-glow bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300' 
                  : 'btn-outline-glow border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300'
                }
              >
                {category.name}
              </Button>
            </AnimatedCard>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => (
            <AnimatedCard 
              key={`${item.id}-${selectedCategory}`} 
              delay={index * 0.1}
              duration={0.6}
            >
              <Card className="group overflow-hidden border-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <Button size="icon" variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Eye className="h-4 w-4 text-white" />
                      </Button>
                      <Button size="icon" variant="secondary" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <ExternalLink className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <Badge variant="outline" className="text-xs text-red-600 border-red-600">
                      {categories.find(c => c.id === item.category)?.name}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground/70">{item.description}</p>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <AnimatedCard delay={0.8}>
            <Button 
              size="lg" 
              className="btn-glow bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-semibold transition-all duration-300"
            >
              View Full Portfolio
            </Button>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
}