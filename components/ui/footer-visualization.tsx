"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function FooterVisualization() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const steps = [
      { duration: 450, next: 1 },  // Step 0: Dot
      { duration: 600, next: 2 },  // Step 1: Globe
      { duration: 750, next: 3 },  // Step 2: Wordmark (zer-globe-axis)
      { duration: 750, next: 4 },  // Step 3: System Graphic
      { duration: 750, next: 5 },  // Step 4: System Signals
      { duration: 450, next: 0 },  // Step 5: Collapse
    ];

    const currentStep = steps[step];
    const timer = setTimeout(() => {
      setStep(currentStep.next);
    }, currentStep.duration);

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="relative w-[320px] sm:w-[480px] h-[100px] sm:h-[130px] flex items-center justify-center overflow-hidden bg-transparent p-2">
      <AnimatePresence>
        {step === 0 && (
          <motion.div
            key="step-dot"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-accent flex items-center justify-center"
            style={{ filter: "drop-shadow(0px 0px 8px rgba(200, 255, 0, 0.6))" }}
          >
            <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-45" />
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-globe"
            initial={{ scale: 0.2, opacity: 0, rotate: -60 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.2, opacity: 0, rotate: 60 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center text-bone"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Outer boundary */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.35"
                fill="none"
              />
              {/* Longitudes */}
              <ellipse
                cx="50"
                cy="50"
                rx="16"
                ry="40"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeOpacity="0.25"
                fill="none"
              />
              <ellipse
                cx="50"
                cy="50"
                rx="28"
                ry="40"
                stroke="currentColor"
                strokeWidth="0.6"
                strokeOpacity="0.15"
                fill="none"
              />
              {/* Polar axis rod */}
              <line
                x1="50"
                y1="5"
                x2="50"
                y2="95"
                stroke="var(--color-accent)"
                strokeWidth="1.6"
                strokeOpacity="0.9"
                style={{ filter: "drop-shadow(0px 0px 4px rgba(200, 255, 0, 0.45))" }}
              />
              {/* Latitudes */}
              <ellipse
                cx="50"
                cy="50"
                rx="40"
                ry="14"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeOpacity="0.25"
                fill="none"
              />
              <ellipse
                cx="50"
                cy="50"
                rx="40"
                ry="26"
                stroke="currentColor"
                strokeWidth="0.6"
                strokeOpacity="0.15"
                fill="none"
              />
              {/* Equator */}
              <line
                x1="10"
                y1="50"
                x2="90"
                y2="50"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeOpacity="0.35"
              />
            </svg>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-wordmark"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute flex items-center gap-0.5 sm:gap-1 font-label-mono text-sm sm:text-[22px] uppercase tracking-[0.25em] text-bone font-semibold select-none"
          >
            <motion.span
              initial={{ x: -16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              zer
            </motion.span>

            {/* The Globe motif as 'o' */}
            <motion.div
              initial={{ scale: 0.3, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              className="w-3.5 h-3.5 sm:w-5.5 sm:h-5.5 text-accent flex items-center justify-center"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ filter: "drop-shadow(0px 0px 4px rgba(200, 255, 0, 0.4))" }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                />
                <ellipse
                  cx="50"
                  cy="50"
                  rx="18"
                  ry="42"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  fill="none"
                />
                <line
                  x1="50"
                  y1="5"
                  x2="50"
                  y2="95"
                  stroke="var(--color-accent)"
                  strokeWidth="3.2"
                />
                <ellipse
                  cx="50"
                  cy="50"
                  rx="42"
                  ry="18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  fill="none"
                />
              </svg>
            </motion.div>

            <motion.span
              initial={{ x: 16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              axiis
            </motion.span>
          </motion.div>
        )}

        {(step === 3 || step === 4) && (
          <motion.div
            key="step-system"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.1, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-full h-full flex items-center justify-center text-bone-mute"
          >
            <svg viewBox="0 0 480 120" className="w-full h-full">
              {/* Corner bracket decorations */}
              <path d="M 10 25 L 10 10 L 25 10" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />
              <path d="M 470 25 L 470 10 L 455 10" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />
              <path d="M 10 95 L 10 110 L 25 110" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />
              <path d="M 470 95 L 470 110 L 455 110" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />

              {/* Dotted backdrop grid */}
              <defs>
                <pattern id="grid-pattern-large" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.6" fill="currentColor" fillOpacity="0.2" />
                </pattern>
              </defs>
              <rect x="15" y="15" width="450" height="90" fill="url(#grid-pattern-large)" />

              {/* Connection logic paths */}
              <path d="M 120 52 L 160 52 L 160 44 L 200 44" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.25" fill="none" />
              <path d="M 120 68 L 160 68 L 160 76 L 200 76" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.25" fill="none" />
              <path d="M 280 60 L 360 60" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.25" fill="none" />

              {/* System nodes */}
              {/* Node A (Left Input) */}
              <rect x="40" y="38" width="80" height="44" rx="2" fill="#060605" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
              <text x="80" y="58" fontSize="8.5" fontFamily="var(--font-label-mono), monospace" fontWeight="600" textAnchor="middle" fill="currentColor" fillOpacity="0.8" letterSpacing="0.05em">IN.01</text>
              <text x="80" y="70" fontSize="6" fontFamily="var(--font-label-mono), monospace" textAnchor="middle" fill="currentColor" fillOpacity="0.4" letterSpacing="0.05em">SYS.READY</text>

              {/* Node B (Center Processing Core) */}
              <rect x="200" y="30" width="80" height="60" rx="2" fill="#060605" stroke="var(--color-accent)" strokeWidth="1.4" style={{ filter: "drop-shadow(0px 0px 4px rgba(200, 255, 0, 0.4))" }} />
              <text x="240" y="56" fontSize="8.5" fontFamily="var(--font-label-mono), monospace" fontWeight="600" textAnchor="middle" fill="var(--color-accent)" letterSpacing="0.05em">CORE.X</text>
              <text x="240" y="72" fontSize="6" fontFamily="var(--font-label-mono), monospace" textAnchor="middle" fill="currentColor" fillOpacity="0.5" letterSpacing="0.05em">PROCESSING</text>
              {/* Concentric computational rings inside B */}
              <circle cx="240" cy="60" r="26" stroke="var(--color-accent)" strokeWidth="0.6" strokeOpacity="0.12" fill="none" />

              {/* Node C (Right Output) */}
              <rect x="360" y="38" width="80" height="44" rx="2" fill="#060605" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
              <text x="400" y="58" fontSize="8.5" fontFamily="var(--font-label-mono), monospace" fontWeight="600" textAnchor="middle" fill="currentColor" fillOpacity="0.8" letterSpacing="0.05em">OUT.02</text>
              <text x="400" y="70" fontSize="6" fontFamily="var(--font-label-mono), monospace" textAnchor="middle" fill="currentColor" fillOpacity="0.4" letterSpacing="0.05em">DISPATCH</text>

              {/* Animated signals only shown in step 4 */}
              {step === 4 && (
                <>
                  <motion.circle
                    cx="120"
                    cy="52"
                    r="2.2"
                    fill="var(--color-accent)"
                    style={{ filter: "drop-shadow(0px 0px 3px var(--color-accent))" }}
                    animate={{ cx: [120, 160, 160, 200], cy: [52, 52, 44, 44] }}
                    transition={{ duration: 0.55, ease: "easeInOut", repeat: Infinity }}
                  />
                  <motion.circle
                    cx="120"
                    cy="68"
                    r="2.2"
                    fill="var(--color-accent)"
                    style={{ filter: "drop-shadow(0px 0px 3px var(--color-accent))" }}
                    animate={{ cx: [120, 160, 160, 200], cy: [68, 68, 76, 76] }}
                    transition={{ duration: 0.55, ease: "easeInOut", repeat: Infinity }}
                  />
                  <motion.circle
                    cx="280"
                    cy="60"
                    r="2.2"
                    fill="var(--color-accent)"
                    style={{ filter: "drop-shadow(0px 0px 3px var(--color-accent))" }}
                    animate={{ cx: [280, 360], cy: [60, 60] }}
                    transition={{ duration: 0.45, ease: "easeInOut", repeat: Infinity, delay: 0.15 }}
                  />
                </>
              )}
            </svg>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step-collapse"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-28 h-28 flex items-center justify-center"
          >
            <div
              className="w-5 h-5 rounded-full bg-accent"
              style={{ filter: "drop-shadow(0px 0px 8px rgba(200, 255, 0, 0.6))" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
