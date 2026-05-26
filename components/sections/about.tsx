"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Section } from "@/components/layout/section";
import { Reveal, RevealStagger, revealItem } from "@/components/ui/reveal";

const PILLARS = [
  {
    id: "intention",
    title: "Built with intention",
    description: "Architecture-first thinking and refined technical execution at every layer.",
  },
  {
    id: "scale",
    title: "Structured for scale",
    description: "Built for products as they grow in complexity and operational demand.",
  },
  {
    id: "uncompromising",
    title: "Uncompromising craft",
    description: "Engineered to adapt, evolve, and outlast trends. Every decision intentional.",
  },
];

export function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section id="about" className="relative w-full min-h-[100svh] flex flex-col justify-center bg-surface-container-lowest overflow-hidden py-12 md:py-16 px-6 md:px-12 lg:px-24">
      {/* Background Grid Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-50 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_100%)]"
      />
      
      <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row gap-16 lg:gap-20 justify-between items-center px-4 md:px-8">
        
        {/* Left Side: Massive Creative Typography */}
        <div className="w-full md:w-6/12 flex flex-col justify-center relative z-20 pt-8 md:pt-0 md:pl-8 lg:pl-12">
          <Reveal>
            <div className="flex flex-col gap-8 md:gap-10">
              <div className="flex items-center gap-6">
                <div className="h-[2px] w-16 bg-accent" />
                <span className="font-label-mono text-[10px] md:text-[11px] text-accent uppercase tracking-[0.4em]">
                  The Vision
                </span>
              </div>

              <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-[0.95] text-bone tracking-tight">
                We design the systems behind tomorrow's <br className="hidden lg:block" />
                <span className="font-serif italic text-accent font-light">digital ecosystems.</span>
              </h2>
              
              <div className="mt-4 flex flex-col gap-8">
                <p className="font-body-md text-bone-mute text-[16px] md:text-[18px] leading-[1.7] max-w-[480px]">
                  From backend architecture and high-performance infrastructure to immersive product experiences, ZeroAxiis engineers technology that is built to adapt, evolve, and outlast trends.
                </p>
                
                <div className="flex items-start md:items-center gap-6">
                  <div className="h-px w-10 md:w-16 bg-accent/50 mt-3 md:mt-0" />
                  <p className="font-display text-[20px] md:text-[24px] leading-[1.4] text-bone">
                    Every decision is <span className="font-serif italic text-accent font-light">intentional.</span><br />
                    Every system is built with <span className="font-serif italic text-accent font-light">scale in mind.</span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Brutalist Architecture Layout */}
        <div className="w-full md:w-5/12 relative mt-16 md:mt-0 flex justify-center md:justify-end md:pr-4 lg:pr-12">
          <Reveal className="w-full max-w-[480px]">
            <div className="relative w-full h-[460px] md:h-[520px]">
              
              {/* Block 01 - Top Right */}
              <div className="absolute top-0 right-0 w-[75%] bg-background border border-stroke p-5 md:p-6 z-10 transition-all duration-300 hover:-translate-y-2 hover:-translate-x-2 hover:[box-shadow:8px_8px_0_theme(colors.accent.DEFAULT)]">
                <div className="flex justify-between items-center mb-6 border-b border-stroke/30 pb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80" />
                  </div>
                  <span className="font-label-mono text-[9px] text-bone-mute/50 uppercase tracking-widest"></span>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-bone uppercase leading-[1.1] mb-3">
                  Built with intention
                </h3>
                <p className="font-body-sm text-bone-mute text-[13px] md:text-sm leading-relaxed">
                  Architecture-first thinking and refined technical execution at every layer.
                </p>
              </div>

              {/* Block 02 - Middle Left */}
              <div className="absolute top-[130px] md:top-[160px] left-0 w-[85%] bg-surface-container-lowest border border-stroke p-5 md:p-6 z-20 transition-all duration-300 hover:-translate-y-2 hover:-translate-x-2 hover:[box-shadow:8px_8px_0_theme(colors.accent.DEFAULT)]">
                <div className="flex justify-between items-center mb-6 border-b border-stroke/30 pb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80" />
                  </div>
                  <span className="font-label-mono text-[9px] text-bone-mute/50 uppercase tracking-widest"></span>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-bone uppercase leading-[1.1] mb-3">
                  Structured for scale
                </h3>
                <p className="font-body-sm text-bone-mute text-[13px] md:text-sm leading-relaxed">
                  Built for products as they grow in complexity and operational demand.
                </p>
              </div>

              {/* Block 03 - Bottom Right */}
              <div className="absolute bottom-0 right-[5%] w-[80%] bg-surface-layer/80 backdrop-blur-md border border-stroke p-5 md:p-6 z-30 transition-all duration-300 hover:-translate-y-2 hover:-translate-x-2 hover:[box-shadow:8px_8px_0_theme(colors.accent.DEFAULT)]">
                <div className="flex justify-between items-center mb-6 border-b border-stroke/30 pb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80" />
                  </div>
                  <span className="font-label-mono text-[9px] text-bone-mute/50 uppercase tracking-widest"></span>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-bone uppercase leading-[1.1] mb-3">
                  Uncompromising craft
                </h3>
                <p className="font-body-sm text-bone-mute text-[13px] md:text-sm leading-relaxed">
                  Engineered to adapt, evolve, and outlast trends. Every decision intentional.
                </p>
              </div>

            </div>
          </Reveal>
        </div>

      </div>
    </Section>
  );
}
