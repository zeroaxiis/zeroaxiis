"use client";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { Container } from "@/components/layout/container";
import { BrutalistCard } from "@/components/cards";

const PILLARS = [
  {
    id: "intention",
    title: "Built with intention",
    description: "Architecture-first thinking and refined technical execution at every layer.",
    className: "absolute top-0 right-0 w-[75%] bg-background z-10",
  },
  {
    id: "scale",
    title: "Structured for scale",
    description: "Built for products as they grow in complexity and operational demand.",
    className: "absolute top-[130px] md:top-[160px] left-0 w-[85%] bg-surface-container-lowest z-20",
  },
  {
    id: "uncompromising",
    title: "Uncompromising craft",
    description: "Engineered to adapt, evolve, and outlast trends. Every decision intentional.",
    className: "absolute bottom-0 right-[5%] w-[80%] bg-surface-layer/80 backdrop-blur-md z-30",
  },
];

export function About() {

  return (
    <Section id="about" className="relative w-full min-h-[100svh] flex flex-col justify-center bg-surface-container-lowest overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-50 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_100%)]"
      />

      <Container className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-20 items-center w-full relative z-10">

        {/* Left Side: Massive Creative Typography */}
        <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-center relative z-20">
          <Reveal>
            <div className="flex flex-col gap-8 md:gap-10">
              <div className="flex items-center gap-6">
                <span className="font-label-mono text-[10px] md:text-[11px] text-accent uppercase tracking-[0.4em]">
                  The Vision
                </span>
              </div>

              <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-[0.95] text-bone tracking-tight">
                The systems behind tomorrow&rsquo;s <br className="hidden lg:block" />
                <span className="font-serif italic text-accent font-light">digital ecosystems.</span>
              </h2>

              <div className="mt-8 flex flex-col gap-6">
                <p className="font-display text-[20px] md:text-[26px] leading-[1.3] text-bone">
                  Every decision is <span className="font-serif italic text-accent font-light pr-1">intentional.</span><br />
                  Every system is built with <span className="font-serif italic text-accent font-light">scale in mind.</span>
                </p>

                <p className="font-body-md text-bone-mute text-[15px] md:text-[17px] leading-[1.7] max-w-[480px]">
                  From backend architecture and high-performance infrastructure to immersive product experiences, ZeroAxiis engineers technology that is built to adapt, evolve, and outlast trends.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Brutalist Architecture Layout */}
        <div className="md:col-span-6 lg:col-span-5 lg:col-start-8 relative mt-4 md:mt-0 flex justify-center md:justify-end">
          <Reveal className="w-full max-w-[480px]">
            <div className="relative w-full h-[460px] md:h-[520px]">

              {/* Block 01 - Top Right */}
              {PILLARS.map((pillar) => (
                <BrutalistCard
                  key={pillar.id}
                  title={pillar.title}
                  description={pillar.description}
                  className={pillar.className}
                />
              ))}

            </div>
          </Reveal>
        </div>

      </Container>
    </Section>
  );
}
