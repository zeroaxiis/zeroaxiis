"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Vision() {
  const containerRef = useRef<HTMLElement>(null);

  // Create a beautiful, subtle parallax effect tied to scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-background flex flex-col items-center justify-center overflow-hidden"
      id="vision"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* Glowing Orb */}
        <div className="absolute w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-accent/5 rounded-full blur-[140px]" />

        {/* Subtle Grain Overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }}
        />
      </div>

      <motion.div
        style={{ y, opacity, filter: blur }}
        className="relative z-10 max-w-[1200px] mx-auto w-full flex flex-col items-center text-center gap-16 md:gap-24"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-[1px] h-12 bg-accent/50" />
          <span className="font-label-mono text-[10px] md:text-[12px] text-accent uppercase tracking-[0.3em]">
            01 / Our Vision
          </span>
        </div>

        <div className="flex flex-col items-center gap-8 md:gap-16 w-full">
          {/* Mixed Typography Header */}
          <h2 className="font-display text-[48px] md:text-[80px] lg:text-[110px] leading-[0.85] tracking-tight text-bone">
            We forge immersive <br />
            <span className="font-serif italic text-accent font-light tracking-normal pr-4">digital realms</span>
          </h2>

          {/* Supporting Statement */}
          <p className="font-display text-[24px] md:text-[36px] lg:text-[48px] leading-[1.2] tracking-tight text-bone-mute max-w-[900px]">
            because the web is not a static canvas. By fusing uncompromised aesthetic vision with <span className="text-bone">bleeding-edge engineering</span>, we transform utility into art.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
