'use client';

import { useState, useEffect } from 'react';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { Testimonials } from '@/components/sections/Testimonials';
import { Portfolio } from '@/components/sections/Portfolio';
import Contact from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { ThemeProvider } from 'next-themes';
import PromoPopup from '@/components/sections/PromoPopup';
export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <PromoPopup />
        <Header />
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}