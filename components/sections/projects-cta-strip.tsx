"use client";

import { motion } from "motion/react";
import { ArrowUpRightSmallIcon } from "@/components/icons";

export function ProjectsCTAStrip() {
  return (
    <section className="border-t border-stroke bg-surface-container-lowest relative overflow-hidden">
      {/* Subtle dots */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"
      />

      {/* Small star decorations */}
      <span
        aria-hidden="true"
        className="absolute left-[40%] top-5 w-1 h-1 rounded-full bg-accent opacity-50"
      />
      <span
        aria-hidden="true"
        className="absolute right-[30%] top-8 w-0.5 h-0.5 rounded-full bg-bone-mute opacity-40"
      />

      <div className="mx-auto max-w-footer-max px-[clamp(1rem,6vw,7rem)] py-10">
        <div className="flex items-center gap-6 justify-between flex-wrap">
          {/* Left: icon + copy */}
          <div className="flex items-center gap-5">
            {/* Star icon in rounded square */}
            <motion.div
              className="flex-shrink-0 w-14 h-14 rounded-xl bg-surface-container border border-stroke flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
                  fill="#c8ff00"
                  opacity="0.9"
                />
              </svg>
            </motion.div>

            <div>
              <p className="font-display text-[clamp(18px,2.2vw,26px)] tracking-[-0.02em] text-bone leading-tight">
                Have a project in mind?
              </p>
              <p className="font-body-sm text-body-sm text-bone-mute mt-0.5">
                Let&apos;s build something great together.
              </p>
            </div>
          </div>

          {/* Right: CTA button */}
          <motion.a
            href="#"
            id="projects-cta-lets-talk"
            className="group inline-flex items-center gap-3 border border-stroke hover:border-accent px-7 py-4 font-label-mono text-[11px] uppercase tracking-[0.22em] text-bone hover:text-accent transition-all duration-300"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.25 }}
          >
            LET&apos;S TALK
            <span className="inline-flex items-center justify-center w-5 h-5 border border-current rounded-sm group-hover:bg-accent group-hover:border-accent group-hover:text-ink transition-all duration-300">
              <ArrowUpRightSmallIcon width={10} height={10} strokeWidth={1.6} />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
