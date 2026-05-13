"use client";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import ShinyText from "@/components/ui/shiny-text";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative pt-48 pb-32 overflow-hidden border-b border-outline-variant/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none hero-grid-mask" />

      <Container className="relative z-10 text-center md:text-left flex flex-col items-center md:items-start">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-outline-variant/50 rounded-full bg-surface-container-low/50 glass-effect">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest">
            System Status: Optimal
          </span>
        </div>

        <h1 className="font-display text-headline-lg-mobile md:text-display text-primary max-w-4xl mb-8 leading-tight">
          Architecting the Future of Digital Infrastructure
        </h1>

        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mb-12">
          {siteConfig.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            size="xl"
            className="font-label-mono text-label-mono uppercase tracking-widest"
          >
            <ShinyText
              text="View Projects"
              color="#2f3131"
              shineColor="#666666"
              speed={3}
              spread={140}
            />
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </Button>
          <Button
            variant="outline"
            size="xl"
            className="font-label-mono text-label-mono uppercase tracking-widest"
          >
            <ShinyText
              text="Work With Us"
              color="#c4c7c8"
              shineColor="#ffffff"
              speed={3}
              spread={140}
            />
          </Button>
        </div>
      </Container>
    </section>
  );
}
