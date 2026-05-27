"use client";

import { motion } from "motion/react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { services } from "@/lib/data/services";
import { Reveal, RevealStagger, revealItem } from "@/components/ui/reveal";
// import { ArrowDiagonalIcon } from "@/components/icons";

export function Features() {
  return (
    <Section
      id="services"
      className="relative bg-surface-container-lowest overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-50 pointer-events-none [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]"
      />
      <Container>
        <Reveal className="mb-20 flex items-end justify-between flex-wrap gap-8">
          <div className="max-w-2xl">
            <p className="font-label-mono text-label-mono text-bone-mute uppercase tracking-[0.22em] mb-5 flex items-center gap-3">
              <span className="inline-block w-7 h-px bg-accent" />
              Core Competencies / 01
            </p>
            <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-[0.95] text-bone tracking-[-0.03em] text-balance">
              Six disciplines.{" "}
              <span className="italic text-bone-dim">One craft.</span>
            </h2>
          </div>
          <div className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em] max-w-xs">
            From low-level systems to UI — we ship the entire stack with the
            same standard of care.
          </div>
        </Reveal>

        <RevealStagger
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-stroke -mr-px -mb-px"
          stagger={0.06}
        >
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              variants={revealItem}
              className="group relative p-10 border-r border-b border-stroke hover:bg-surface-layer transition-colors duration-500"
            >
              <span
                aria-hidden="true"
                className="absolute top-6 right-6 font-label-mono text-[10px] text-bone-mute opacity-70"
              >
                / 0{i + 1}
              </span>

              <div className="mb-10 flex items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-bone-mute group-hover:text-accent transition-colors duration-500">
                  {service.icon}
                </span>
                <span className="h-px w-10 bg-stroke group-hover:bg-accent group-hover:w-16 transition-all duration-500" />
              </div>

              <h3 className="font-display text-3xl text-bone mb-4 tracking-[-0.02em] leading-tight">
                {service.title}
              </h3>

              <p className="font-body-sm text-body-sm text-bone-mute leading-relaxed max-w-sm">
                {service.description}
              </p>

              <span
                aria-hidden="true"
                className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500 text-bone-mute"
              >
                {/* <ArrowDiagonalIcon /> */}
              </span>
            </motion.article>
          ))}
        </RevealStagger>
      </Container>
    </Section>
  );
}
