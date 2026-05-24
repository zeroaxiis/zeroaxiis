"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { workflowSteps } from "@/lib/data/workflow";
import { Reveal } from "@/components/ui/reveal";
import { ArrowUpRightSmallIcon } from "@/components/icons";

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "100%"]);

  return (
    <Section
      id="workflow"
      className="border-t border-stroke relative overflow-hidden"
    >
      <Container>
        <Reveal className="mb-24">
          <p className="font-label-mono text-label-mono text-bone-mute uppercase tracking-[0.22em] mb-5 flex items-center gap-3">
            <span className="inline-block w-7 h-px bg-accent" />
            Methodology / 02
          </p>
          <div className="flex items-end justify-between gap-12 flex-wrap">
            <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-[0.95] text-bone tracking-[-0.03em] max-w-3xl text-balance">
              A workflow built on{" "}
              <span className="italic text-bone-dim">rituals,</span> not
              processes.
            </h2>
            <p className="font-body-sm text-body-sm text-bone-mute max-w-xs leading-relaxed">
              Every engagement passes through four rituals — from sketch to
              scale. No phases skipped, no shortcuts taken.
            </p>
          </div>
        </Reveal>

        <div ref={sectionRef} className="relative">
          {/* Progress line */}
          <div className="hidden md:block absolute top-9 left-0 right-0 h-px bg-stroke z-0">
            <motion.div
              style={{ width: lineWidth }}
              className="h-full bg-accent origin-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {workflowSteps.map((step, i) => (
              <Reveal
                key={step.number}
                delay={i * 0.12}
                className="flex flex-col items-start text-left"
              >
                <div
                  className={`relative w-[72px] h-[72px] rounded-full mb-8 flex items-center justify-center transition-all duration-500
                    ${
                      step.highlight
                        ? "bg-accent text-ink"
                        : "bg-ink border border-stroke text-bone"
                    }`}
                >
                  <span className="font-label-mono text-[11px] tracking-[0.18em] font-medium">
                    {step.number}
                  </span>
                  {step.highlight && (
                    <span className="absolute inset-0 rounded-full border border-accent/40 animate-pulse-ring" />
                  )}
                </div>

                <h3 className="font-display text-3xl text-bone mb-3 tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="font-body-sm text-body-sm text-bone-mute leading-relaxed max-w-[16ch]">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <Reveal
          delay={0.2}
          className="mt-32 pt-12 border-t border-stroke flex items-end justify-between gap-12 flex-wrap"
        >
          <div className="max-w-2xl">
            <p className="font-label-mono text-label-mono text-bone-mute uppercase tracking-[0.22em] mb-4">
              Ready when you are
            </p>
            <h3 className="font-display text-[clamp(32px,4.5vw,56px)] text-bone leading-[1] tracking-[-0.025em]">
              Let&apos;s build something{" "}
              <span className="italic text-bone-dim">worth keeping.</span>
            </h3>
          </div>
          <a
            href="mailto:hello@zeroaxiis.com"
            className="group inline-flex items-center gap-4 pb-2 border-b border-bone hover:border-accent transition-colors duration-300"
          >
            <span className="font-body-md text-body-md text-bone">
              hello@zeroaxiis.com
            </span>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-bone text-ink group-hover:bg-accent transition-colors duration-300">
              <ArrowUpRightSmallIcon />
            </span>
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}
