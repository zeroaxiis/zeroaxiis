"use client";

import { motion, useInView, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "span" | "p" | "li" | "section";
}

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  y = 28,
  once = true,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y, filter: "blur(6px)" }
      }
      transition={{ duration, delay, ease: easeOut }}
    >
      {children}
    </MotionTag>
  );
}

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}

export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  once = true,
  amount = 0.2,
}: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOut },
  },
};
