"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useTheme } from "next-themes";

export function Wavybgm() {
  const { theme } = useTheme();
  
  return (
    <WavyBackground 
      className="max-w-4xl mx-auto lg:pb-40 pb-20" 
      containerClassName="min-h-[450px] md:min-h-[400px] lg:min-h-[500px]"
    >
      <p className={`text-4xl mt-10 md:text-4xl lg:text-7xl font-bold inter-var text-center ${
        theme === 'dark' ? 'text-white' : 'text-black'
      }`}>
        Where Sound Becomes Visual
      </p>
      <p className={`text-base md:text-lg mt-4 font-normal inter-var text-center ${
        theme === 'dark' ? 'text-white' : 'text-black'
      }`}>
        Experience your voice like never before – in motion, in rhythm, in color
      </p>
    </WavyBackground>
  );
}

export default Wavybgm;