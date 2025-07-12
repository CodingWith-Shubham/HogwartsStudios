"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";

export function Wavybgm() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40" containerClassName="min-h-[450px] md:min-h-[400px] lg:min-h-[500px]">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
      Where Sound Becomes Visual
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
      Experience your voice like never before – in motion, in rhythm, in color
      </p>
    </WavyBackground>
  );
}

export default Wavybgm;
