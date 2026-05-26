"use client";

import { motion } from "motion/react";
import { Section } from "@/components/layout/section";
import { Reveal, RevealStagger, revealItem } from "@/components/ui/reveal";

export function About() {
  return (
    <Section id="about" className="relative w-full bg-transparent pt-24 pb-40 md:pt-32 md:pb-56 px-6 md:px-12 lg:px-24">
      <div className="w-full flex flex-col md:flex-row gap-16 md:gap-24 justify-between items-start">
        
        {/* Left Side: Massive Typographic Statement (Why) */}
        <div className="flex-1 w-full">
          <Reveal>
            <p className="font-label-mono text-label-mono text-bone-mute uppercase tracking-[0.22em] flex items-center gap-3 mb-10">
              <span className="inline-block w-7 h-px bg-accent" />
              
            </p>
            <h2 className="font-display text-[clamp(40px,7vw,96px)] leading-[0.92] text-bone tracking-tight max-w-4xl text-balance">
              We bridge the gap between uncompromised <span className="font-serif italic text-accent font-light">aesthetic vision</span> and bleeding-edge engineering.
            </h2>
          </Reveal>
        </div>

        {/* Right Side: Editorial Grid for How & What */}
        <div className="w-full md:w-5/12 flex flex-col gap-16 md:mt-24">
          <RevealStagger stagger={0.15}>
            
            <motion.div variants={revealItem} className="flex flex-col gap-6">
              <div className="flex items-center gap-4 border-b border-stroke pb-4">
                <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em]"> </span>
                <span className="material-symbols-outlined text-xl text-accent"></span>
              </div>
              <p className="font-body-md text-bone-mute leading-relaxed max-w-md">
                Fusing high-end craftsmanship with scalable infrastructure. We employ rigorous architecture planning followed by precision execution from specialized domain experts, ensuring no detail is compromised.
              </p>
            </motion.div>

            <motion.div variants={revealItem} className="flex flex-col gap-6">
              <div className="flex items-center gap-4 border-b border-stroke pb-4">
                <span className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em]"></span>
                <span className="material-symbols-outlined text-xl text-accent"></span>
              </div>
              <p className="font-body-md text-bone-mute leading-relaxed max-w-md">
                Immersive web applications, robust backend systems, and cohesive brand ecosystems. From low-level systems to front-end UI, we deliver the entire stack with the same standard of care.
              </p>
            </motion.div>

          </RevealStagger>
        </div>

      </div>
    </Section>
  );
}
