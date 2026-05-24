"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "word" | "char";
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  splitBy = "word",
  as = "h2",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const tokens =
    splitBy === "word" ? text.split(" ") : Array.from(text);

  const Tag = motion[as];

  return (
    <Tag ref={ref} className={cn("inline-block", className)} aria-label={text}>
      {tokens.map((token, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: splitBy === "word" ? "0.25em" : 0 }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            animate={inView ? { y: 0 } : { y: "115%" }}
            transition={{
              duration: 0.85,
              delay: delay + i * stagger,
              ease: easeOut,
            }}
          >
            {token === " " ? " " : token}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
