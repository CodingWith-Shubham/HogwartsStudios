'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const videoUrls = [
  "https://res.cloudinary.com/dvolcl889/video/upload/v1762110832/testimonial8_1_n221mz.mp4",
  "https://res.cloudinary.com/dvolcl889/video/upload/v1762110745/testimonial7_1_r9q9pj.mp4",
  "https://res.cloudinary.com/dvolcl889/video/upload/v1762110504/testimonial4_1_nfyefe.mp4",
  "https://res.cloudinary.com/dvolcl889/video/upload/v1762110242/testimonial1_1_1_uk2xun.mp4",
  "https://res.cloudinary.com/dvolcl889/video/upload/v1762108039/testimonial5_1_jxzfdu.mp4",
  "https://res.cloudinary.com/dvolcl889/video/upload/v1762107973/testimonial6_1_uwu4yu.mp4",
  "https://res.cloudinary.com/dvolcl889/video/upload/v1762107411/testimonial2_1_uqrzax.mp4",
  "https://res.cloudinary.com/dvolcl889/video/upload/v1762107401/testimonial3_1_ltsbtm.mp4",
];

const VideoShowcase = () => {
  const [current, setCurrent] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(e => console.log('Play failed:', e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [current, isPlaying]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % videoUrls.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + videoUrls.length) % videoUrls.length);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative py-16 bg-black overflow-hidden min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-white">From</span>{' '}
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Client's</span>{' '}
            <span className="text-white">Diary</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Icons who trust our lens to capture their most memorable moments
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Video Container */}
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden">
            <div className="relative aspect-[9/16] sm:aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden">
              <video
                ref={videoRef}
                src={videoUrls[current]}
                loop
                muted={isMuted}
                playsInline
                autoPlay
                className="w-full h-full object-contain bg-black"
              />
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
              aria-label="Previous video"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300"
              aria-label="Next video"
            >
              <ChevronRight size={24} />
            </button>

            {/* Bottom Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <button
                onClick={toggleMute}
                className="bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full backdrop-blur-sm transition-all duration-300"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              
              <button
                onClick={togglePlayPause}
                className="bg-black/50 hover:bg-black/70 text-white p-2.5 rounded-full backdrop-blur-sm transition-all duration-300"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2 ml-2">
                {videoUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === current ? 'bg-white w-8' : 'bg-gray-500 w-2'
                    }`}
                    aria-label={`Go to video ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;