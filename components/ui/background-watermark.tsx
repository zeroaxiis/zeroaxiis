"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BackgroundWatermarkProps {
  text: string;
  opacity?: number;
  className?: string;
}

export function BackgroundWatermark({
  text,
  opacity = 0.15,
  className,
}: BackgroundWatermarkProps) {
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden w-full px-8", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="font-display text-[15vw] leading-none text-accent font-bold tracking-tighter whitespace-nowrap"
      >
        {text}
      </motion.div>
    </div>
  );
}
