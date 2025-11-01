'use client';
import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LightweightAnimatedCard } from '@/components/ui/lightweight-animated-card';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";

export function Portfolio() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const hasPlayedRef = useRef<boolean>(false);

  const videos = [
    {
      id: 1,
      src: "/Media/videos/set1.mp4",
      
    },
    {
      id: 2,
      src: "/Media/videos/set2.mp4",
      
    },
    {
      id: 3,
      src: "/Media/videos/set3.mp4",
      
    },
    {
      id: 4,
      src: "/Media/videos/set4.mp4",
      
    },
  ];

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    hasPlayedRef.current = false;
    setCurrentSlide((prev) => (prev + 1) % videos.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    hasPlayedRef.current = false;
    setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    hasPlayedRef.current = false;
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  // Handle video playback
  useEffect(() => {
    const currentVideo = videoRefs.current[currentSlide];
    if (!currentVideo) return;

    // Always reset the video to start
    currentVideo.currentTime = 0;
    currentVideo.muted = isMuted;
    hasPlayedRef.current = false;

    // Remove any existing event listeners
    const handleEnded = () => {
      if (!hasPlayedRef.current && isPlaying && !isPaused) {
        hasPlayedRef.current = true;
        goToNext();
      }
    };

    currentVideo.addEventListener("ended", handleEnded);

    // Play if conditions are met
    if (isPlaying && !isPaused) {
      const playPromise = currentVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.log("Video play prevented:", err));
      }
    } else {
      currentVideo.pause();
    }

    return () => {
      currentVideo.removeEventListener("ended", handleEnded);
      currentVideo.pause();
    };
  }, [currentSlide, isPlaying, isPaused, isMuted]);

  // Pause all non-active videos
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== currentSlide) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentSlide]);

  // Handle play/pause state changes
  useEffect(() => {
    const currentVideo = videoRefs.current[currentSlide];
    if (!currentVideo) return;

    if (isPlaying && !isPaused) {
      const playPromise = currentVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.log("Video play prevented:", err));
      }
    } else {
      currentVideo.pause();
    }
  }, [isPlaying, isPaused, currentSlide]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    videoRefs.current.forEach((video) => {
      if (video) video.muted = !isMuted;
    });
  };

  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) goToNext();
    else if (distance < -50) goToPrevious();
    touchStartX.current = null;
    touchEndX.current = null;
  };

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
        <div className="text-center lg:mb-16 mb-7">
          <LightweightAnimatedCard delay={200} duration={600} triggerOnce={true}>
            <h2 className="text-3xl md:text-5xl font-bold mb-2 font-sans">Behind the Magic</h2>
            <p className="text-[15px] text-foreground/80 max-w-2xl mx-auto font-body-alt">
              Explore the world of Hogwarts Studios — where every reel, product, and campaign is born from pure creativity.
            </p>
          </LightweightAnimatedCard>
        </div>

        {/* Video Carousel */}
        <LightweightAnimatedCard delay={400} duration={600} triggerOnce={true}>
          <div className="relative max-w-6xl mx-auto">
            <Card className="overflow-hidden border-0 bg-white/5 backdrop-blur-sm shadow-2xl">
              <div
                className="relative h-[320px] md:h-[500px] lg:h-[600px] overflow-hidden group"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Videos */}
                <div
                  className="flex transition-transform duration-700 ease-in-out h-full"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {videos.map((video, i) => (
                    <div key={video.id} className="w-full h-full flex-shrink-0 relative flex items-center justify-center bg-black">
                      <video
                        ref={(el) => (videoRefs.current[i] = el)}
                        className="h-full w-auto max-w-full md:w-full md:h-full md:object-cover"
                        playsInline
                        muted={isMuted}
                        preload={i === 0 ? "auto" : "metadata"}
                        loop={false}
                      >
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
                </div>

                {/* Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg pointer-events-none">
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 font-magical-alt transition-all duration-700">
                      
                    </h3>
                    <p className="text-lg opacity-90 font-body-alt transition-all duration-700">
                     
                    </p>
                  </div>
                </div>

                {/* Arrows */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={goToPrevious}
                    disabled={isTransitioning}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 shadow-lg pointer-events-auto"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={goToNext}
                    disabled={isTransitioning}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 shadow-lg pointer-events-auto"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>

                {/* Controls */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:flex">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={toggleMute}
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-0 shadow-lg"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
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

            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {videos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  disabled={isTransitioning}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentSlide ? "bg-red-600 scale-125 shadow-lg" : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to video ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </LightweightAnimatedCard>

        {/* CTA */}
        <div className="text-center mt-16">
          <LightweightAnimatedCard delay={400} duration={600} triggerOnce={true}>
            <p className="text-xl text-foreground/80 mb-5 font-body-alt">
              Book your session and join us in creating enchanting experiences.
            </p>
          </LightweightAnimatedCard>
        </div>
      </div>

      <style jsx>{`
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
        video {
          background-color: #000;
        }
      `}</style>
    </section>
  );
}