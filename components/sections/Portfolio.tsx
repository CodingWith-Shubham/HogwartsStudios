'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Eye, ExternalLink } from 'lucide-react';
import type React from "react"

import {useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
export function Portfolio() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const slides = [
    {
      id: 1,
      image: "/Media/hogwartsbg1-min.jpeg",
      caption: "The Hogwarts Studio Entrance",
      description: "Step into the magical world where creativity begins.",
    },
    {
      id: 2,
      image: "/Media/hogwartsbg2-min.jpeg",
      caption: "Enchanting Workspace",
      description: "Where spells of innovation and artistry are cast.",
    },
    {
      id: 3,
      image: "/Media/hogwartsbg3-min.jpeg",
      caption: "Studio Gear & Setup",
      description: "State-of-the-art equipment for magical productions.",
    },
    {
      id: 4,
      image: "/Media/hogwartsbg4-min.jpeg",
      caption: "Creative Collaboration",
      description: "Wizards and witches at work, crafting stories together.",
    },
    {
      id: 5,
      image: "/Media/hogwartsbg5-min.jpeg",
      caption: "Recording in Progress",
      description: "Capturing enchanting audio and visual moments.",
    },
    {
      id: 6,
      image: "/Media/hogwartsbg6-min.jpeg",
      caption: "Editing Magic",
      description: "Transforming raw footage into spellbinding content.",
    },
    {
      id: 7,
      image: "/Media/hogwartsbg7-min.jpeg",
      caption: "Studio Lounge",
      description: "A cozy corner for creative breaks and inspiration.",
    },
    {
      id: 8,
      image: "/Media/hogwartsbg8-min.jpeg",
      caption: "The Grand Reveal",
      description: "Showcasing the final magical masterpiece to the world.",
    },
  ]
  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 2000) // 2 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, isPaused, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrevious()
    }
  }

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-300 rounded-full floating-particle glow-pulse" />
        <div className="absolute top-1/3 right-16 w-3 h-3 bg-red-300 rounded-full floating-particle-delayed glow-pulse" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-orange-300 rounded-full floating-particle glow-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedCard delay={0.2} duration={1.5} triggerOnce={false}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent font-magical">
              Behind the Mic
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto font-body-alt">
              Step into our magical studio and witness the creation of enchanting podcast moments
            </p>
          </AnimatedCard>
        </div>

        {/* Slideshow Container */}
        <AnimatedCard delay={0.4} duration={1.5} triggerOnce={false}>
          <div className="relative max-w-6xl mx-auto">
            <Card className="overflow-hidden border-0 bg-white/5 backdrop-blur-sm shadow-2xl">
              <div
                className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Images */}
                <div
                  className="flex transition-transform duration-700 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {slides.map((slide, index) => (
                    <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
                      <img
                        src={slide.image || "/placeholder.svg"}
                        alt={slide.caption}
                        className="w-full h-full object-cover rounded-lg ken-burns-effect"
                      />
                      {/* Caption Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <h3 className="text-2xl font-bold mb-2 font-magical-alt">{slide.caption}</h3>
                          <p className="text-lg opacity-90 font-body-alt">{slide.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={goToPrevious}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 shadow-lg"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={goToNext}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 shadow-lg"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>

                {/* Play/Pause Button */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={togglePlayPause}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 shadow-lg"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-red-600 scale-125 shadow-lg" : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </AnimatedCard>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <AnimatedCard delay={0.6} duration={1.5} triggerOnce={false}>
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground font-magical-alt">
                Ready to Create Magic?
              </h3>
              <p className="text-lg text-foreground/80 mb-8 font-body-alt">
                Book your podcast recording session and join us in creating enchanting audio experiences
              </p>
              <Button
                size="lg"
                className="btn-glow bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 text-lg font-semibold transition-all duration-300 font-body-alt shadow-xl"
              >
                Book Your Session
              </Button>
            </div>
          </AnimatedCard>
        </div>
      </div>

      <style jsx>{`
        .ken-burns-effect {
          animation: kenBurns 20s ease-in-out infinite alternate;
        }
        
        @keyframes kenBurns {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.05);
          }
        }
        
        .floating-particle {
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-particle-delayed {
          animation: float 6s ease-in-out infinite 2s;
        }
        
        .glow-pulse {
          animation: glowPulse 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.4;
            box-shadow: 0 0 5px currentColor;
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px currentColor;
          }
        }
        
        .btn-glow {
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
        }
        
        .btn-glow:hover {
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.5);
        }
      `}</style>
    </section>
  )
}