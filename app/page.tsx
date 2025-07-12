'use client';

import { useState, useEffect } from 'react';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { Testimonials } from '@/components/sections/Testimonials';
import Wavybgm from '@/components/sections/Wavybgm';
import { Portfolio } from '@/components/sections/Portfolio';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { ThemeProvider } from 'next-themes';

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Wavybgm/>
        <Portfolio />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}