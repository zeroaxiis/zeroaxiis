"use client";

import { Container } from "@/components/layout/container";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { BackgroundWatermark } from "@/components/ui/background-watermark";
import { CtaButton } from "@/components/ui/cta-button";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-[clamp(600px,100svh,1080px)] bg-surface-container-lowest overflow-hidden">
      
      {/* Abstract Grid Background using Reusable Component */}
      <BackgroundGrid 
        maskImage="radial-gradient(ellipse 50% 50% at 50% 50%, black 40%, transparent 100%)" 
        opacity={30} 
      />

      {/* Massive 404 Watermark */}
      <BackgroundWatermark text="404" />

      <Container className="relative z-10 flex flex-col items-center text-center">


        {/* Display Typography */}
        <motion.h1 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[clamp(44px,7vw,88px)] leading-[1.05] text-bone tracking-tight mb-6"
        >
          Not <span className="font-serif italic text-bone-mute font-light">Found.</span>
        </motion.h1>

        {/* Technical Description */}
        <motion.p 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body-md text-bone-mute text-[clamp(15px,2vw,18px)] max-w-[480px] mx-auto mb-10 leading-relaxed"
        >
          The system could not locate the requested protocol. It may have been relocated, deleted, or never existed in this timeline.
        </motion.p>

        {/* Magnetic CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <CtaButton href="/">Return to Base</CtaButton>
        </motion.div>
      </Container>
    </main>
  );
}
