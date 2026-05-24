"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Exactly 5 seconds for the entire sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          initial={{ backgroundColor: "#0a0a0a" }}
          animate={{
            backgroundColor: [
              "#0a0a0a",
              "#0a0a0a",
              "#0a0a0a",
              "#0a0a0a",
              "rgba(10, 10, 10, 0)",
            ],
          }}
          transition={{
            times: [0, 0.3, 0.6, 0.9, 1], // 0s, 1.5s, 3s, 4.5s, 5s
            duration: 5,
            ease: "linear",
          }}
        >
          {/* Subtle noise overlay that fades out with the background */}
          <motion.div
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            initial={{ opacity: 0.035 }}
            animate={{ opacity: [0.035, 0.035, 0.035, 0.035, 0] }}
            transition={{ times: [0, 0.3, 0.6, 0.9, 1], duration: 5 }}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
          />

          <div className="relative z-10 flex items-center font-display text-[60px] md:text-[80px] lg:text-[100px] text-bone tracking-tight">
            {/* "zer" */}
            <motion.span
              animate={{
                opacity: [1, 1, 1, 0, 0],
                x: [0, 0, 0, -60, -60], // Pushed away by the expanding globe
                filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(10px)", "blur(10px)"],
              }}
              transition={{
                times: [0, 0.3, 0.6, 0.85, 1],
                duration: 5,
                ease: ["linear", "linear", [0.76, 0, 0.24, 1], "linear"],
              }}
            >
              zer
            </motion.span>

            {/* The Globe ('O') */}
            <motion.svg
              width="1em"
              height="1em"
              viewBox="0 0 100 100"
              className="mx-[2px] md:mx-[4px] overflow-visible"
              animate={{
                scale: [1, 1, 1, 80, 80], // Massive zoom
                opacity: [1, 1, 1, 0.9, 0], // Fades out as it merges
                rotate: [0, 0, 0, 90, 90], // Dramatic twist during expansion
              }}
              transition={{
                times: [0, 0.3, 0.6, 0.9, 1],
                duration: 5,
                ease: ["linear", "linear", [0.76, 0, 0.24, 1], "easeOut"], // Cinematic Expo easing for the zoom
              }}
            >
              {/* Outer circle */}
              <circle
                cx="50"
                cy="50"
                r="46"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />

              {/* Inner Wireframe (drawn between 1.5s and 3s) */}
              {/* Colored in Accent (Lime) to match the Hero Globe */}
              <motion.g
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1, 1, 1] }}
                transition={{
                  times: [0, 0.3, 0.6, 0.9, 1],
                  duration: 5,
                  ease: "easeInOut",
                }}
              >
                {/* Equator */}
                <motion.line
                  x1="4"
                  y1="50"
                  x2="96"
                  y2="50"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 0, 1, 1, 1] }}
                  transition={{
                    times: [0, 0.3, 0.6, 0.9, 1],
                    duration: 5,
                    ease: "easeInOut",
                  }}
                />
                {/* Prime Meridian */}
                <motion.line
                  x1="50"
                  y1="4"
                  x2="50"
                  y2="96"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 0, 1, 1, 1] }}
                  transition={{
                    times: [0, 0.3, 0.6, 0.9, 1],
                    duration: 5,
                    ease: "easeInOut",
                  }}
                />
                {/* Curved Latitudes */}
                <motion.ellipse
                  cx="50"
                  cy="50"
                  rx="46"
                  ry="23"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 0, 1, 1, 1] }}
                  transition={{
                    times: [0, 0.3, 0.6, 0.9, 1],
                    duration: 5,
                    ease: "easeInOut",
                  }}
                />
                {/* Curved Meridians */}
                <motion.ellipse
                  cx="50"
                  cy="50"
                  rx="23"
                  ry="46"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 0, 1, 1, 1] }}
                  transition={{
                    times: [0, 0.3, 0.6, 0.9, 1],
                    duration: 5,
                    ease: "easeInOut",
                  }}
                />
              </motion.g>
            </motion.svg>

            {/* "axiis" */}
            <motion.span
              animate={{
                opacity: [1, 1, 1, 0, 0],
                x: [0, 0, 0, 60, 60], // Pushed away by the expanding globe
                filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(10px)", "blur(10px)"],
              }}
              transition={{
                times: [0, 0.3, 0.6, 0.85, 1],
                duration: 5,
                ease: ["linear", "linear", [0.76, 0, 0.24, 1], "linear"],
              }}
            >
              axiis
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
