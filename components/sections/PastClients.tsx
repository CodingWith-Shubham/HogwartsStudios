'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Sparkles } from 'lucide-react';

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
    image: '/media/celebrity-1.jpg',
    clientSince: '2023',
    status: 'featured',
    isActive: true,
  },
  {
    id: '2',
    name: 'Urvashi Rautela',
    profession: 'Actress & Model',
    image: '/media/celebrity-2.jpg',
    clientSince: '2023',
    status: 'ongoing',
    isActive: true,
  },
  {
    id: '3',
    name: 'Arjun Rampal',
    profession: 'Actor & Producer',
    image: '/media/celebrity-3.jpg',
    clientSince: '2022',
    status: 'vip',
  },
  {
    id: '4',
    name: 'Kriti Sanon',
    profession: 'Actress',
    image: '/media/celebrity-4.jpg',
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

const ClientShowcase = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative py-10 bg-gradient-to-b from-gray-1000 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <Sparkles className="absolute top-20 left-10 text-red-400 animate-float" size={24} />
        <Star className="absolute top-32 right-20 text-gray-300 animate-pulse" size={16} />
        <Sparkles className="absolute bottom-20 left-1/4 text-red-300 animate-float" size={20} />
        <Star className="absolute bottom-32 right-1/3 text-red-400 animate-pulse" size={14} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-gray-600/20 rounded-full px-6 py-2 mb-6">
            <Star className="text-red-400" size={16} />
            <span className="text-gray-300 text-sm font-medium">Celebrity Portfolio</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Our <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Star</span> Clients
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Icons who trust our lens to capture their most memorable moments
          </p>
        </motion.div>

        {/* Celebrity Grid - Desktop */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        >
          {celebrityClients.map((client, index) => (
            <motion.div key={client.id} variants={item}>
              <CelebrityCard client={client} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Celebrity Scroll - Mobile */}
        <div className="md:hidden">
          <div className="flex gap-6 overflow-x-auto pb-4 px-4 -mx-4 snap-x snap-mandatory">
            {celebrityClients.map((client, index) => (
              <div key={client.id} className="flex-shrink-0 w-72 snap-center">
                <CelebrityCard client={client} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 text-gray-300">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-red-500"></div>
            <span className="text-sm font-medium">Join Our Elite Clientele</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-red-500"></div>
          </div>
        </motion.div>
      </div>
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
    <motion.div 
      className="group relative h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
    >
      {/* Status Ribbon */}
      <div className="absolute -top-2 -right-2 z-20">
        <span className={`${statusBadge.className} text-xs px-3 py-1 rounded-full shadow-lg`}>
          {statusBadge.label}
        </span>
      </div>

      {/* Card Container */}
      <div className="relative h-full bg-gray-800/50 backdrop-blur-xl border border-gray-700/20 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-red-500/10 group-hover:border-red-500/30">
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
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 384px"
                  priority={index < 2} // Only preload first 2 images
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
          
          <p className="text-gray-300 text-sm font-medium">
            {client.profession}
          </p>
          
          <div className="inline-flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm rounded-full px-3 py-1 border border-gray-700/30">
            <Star className="text-red-500" size={12} />
            <span className="text-gray-300 text-xs font-medium">
              Client Since {client.clientSince}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientShowcase;