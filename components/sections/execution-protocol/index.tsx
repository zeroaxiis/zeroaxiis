"use client";

import React, { useRef } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { TerminalReadout } from "./terminal-readout";
import { ExecutionProtocolDiagram } from "./diagram";

export function ExecutionProtocol() {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <Section id="workflow" className="relative !pb-10 md:!pb-10">
      <Container>
        <Reveal className="mb-20 flex items-end justify-between flex-wrap gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-6 mb-5">
              <span className="font-label-mono text-[10px] md:text-[11px] text-accent uppercase tracking-[0.4em]">
                Execution Protocol
              </span>
            </div>
            <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-[0.95] text-bone tracking-[-0.03em]">
              From your brief{" "}
              <span className="font-serif italic text-accent font-light">to scale.</span>
            </h2>
          </div>
          <div className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em] max-w-xs">
            Every engagement travels the same six rituals — stripped of ceremony, shaped by craft. Watch a request move.
          </div>
        </Reveal>

        <div className="w-full relative">
          {/* Isolated Terminal Readout to prevent parent re-renders */}
          <TerminalReadout nodeRef={nodeRef} />
          
          {/* Static SVG Diagram with purely CSS-driven animations */}
          <ExecutionProtocolDiagram firstNodeRef={nodeRef} />
        </div>
      </Container>
    </Section>
  );
}
