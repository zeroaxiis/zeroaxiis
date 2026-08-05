"use client";

import { motion } from "motion/react";
import { CtaButton } from "@/components/ui/cta-button";
import { BackgroundWatermark } from "@/components/ui/background-watermark";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({ 
  title = "Nothing here.", 
  message = "The signal is lost in the void. We are currently gathering new data." 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto py-16">
      
      {/* Massive EMPTY Watermark */}
      <BackgroundWatermark text="VOID" />

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="font-display text-[clamp(44px,7vw,88px)] leading-[1.05] text-bone tracking-tight mb-6">
          Oops, <span className="font-serif italic text-bone-mute font-light">{title}</span>
        </h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body-md text-bone-mute text-[clamp(15px,2vw,18px)] max-w-[480px] mx-auto mb-10 leading-relaxed"
        >
          {message}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <CtaButton href="/">Return to Base</CtaButton>
        </motion.div>
      </div>
    </div>
  );
}
