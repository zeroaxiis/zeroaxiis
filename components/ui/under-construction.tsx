"use client";

import { motion } from "motion/react";
import { CtaButton } from "@/components/ui/cta-button";
import { BackgroundWatermark } from "@/components/ui/background-watermark";

interface UnderConstructionProps {
  moduleName: string;
}

export function UnderConstruction({ moduleName }: UnderConstructionProps) {
  return (
    <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto py-16">
      
      {/* Massive OFFLINE Watermark */}
      <BackgroundWatermark text="OFFLINE" />

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="font-display text-[clamp(44px,7vw,88px)] leading-[1.05] text-bone tracking-tight mb-6">
          System <span className="font-serif italic text-bone-mute font-light">Offline.</span>
        </h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body-md text-bone-mute text-[clamp(15px,2vw,18px)] max-w-[480px] mx-auto mb-10 leading-relaxed"
        >
          The backend API endpoint for the <strong className="text-bone font-medium">{moduleName}</strong> module has not been deployed yet. Please check back later.
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
