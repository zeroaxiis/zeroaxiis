"use client";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import React, { useState, useEffect, useRef } from "react";
import styles from "./cta.module.css";

const PATH_1 = "M 140 40 L 140 170 L 150 180 L 500 180 L 510 170 L 510 90 L 520 80 L 800 80 L 810 90 L 810 170 L 820 180 L 960 180";
const PATH_2 = "M 500 180 L 510 180 L 510 270 L 520 280 L 800 280 L 810 270 L 810 180 L 820 180";

const MOBILE_PATH_1 = "M 200 60 L 200 560 L 210 570 L 290 570 L 300 580 L 300 860 L 290 870 L 210 870 L 200 880 L 200 1020";
const MOBILE_PATH_2 = "M 210 570 L 200 570 L 110 570 L 100 580 L 100 860 L 110 870 L 200 870 L 210 870";

const DESKTOP_VIAS = [
  [140, 170], [150, 180], [500, 180], [510, 170], [510, 90], [520, 80],
  [800, 80], [810, 90], [810, 170], [820, 180],
  [510, 270], [520, 280], [800, 280], [810, 270]
];

const MOBILE_VIAS = [
  [200, 560], [210, 570], [290, 570], [300, 580], [300, 860], [290, 870], [210, 870], [200, 880],
  [110, 570], [100, 580], [100, 860], [110, 870]
];

type NodeKind = "client" | "brand" | "step";

const NODES: Array<{
  id: string;
  label: string;
  icon: string;
  kind: NodeKind;
  x: number;
  y: number;
  mobile_x: number;
  mobile_y: number;
  delay: string;
  description: string;
}> = [
    {
      id: "request",
      label: "Client",
      icon: "client",
      kind: "client",
      x: 140,
      y: 40,
      mobile_x: 200,
      mobile_y: 50,
      delay: "0s",
      description: "Request lands. Brief drops in.",
    },
    {
      id: "zero",
      label: "ZeroAxiis",
      icon: "brand",
      kind: "brand",
      x: 140,
      y: 180,
      mobile_x: 200,
      mobile_y: 250,
      delay: "2.5s",
      description: "Studio scopes and queues the work.",
    },
    {
      id: "ideate",
      label: "Ideate",
      icon: "lightbulb",
      kind: "step",
      x: 360,
      y: 180,
      mobile_x: 200,
      mobile_y: 450,
      delay: "5.0s",
      description: "Architecture mapped. Scope locked.",
    },
    {
      id: "engineering",
      label: "Build",
      icon: "terminal",
      kind: "step",
      x: 660,
      y: 80,
      mobile_x: 300,
      mobile_y: 720,
      delay: "8.5s",
      description: "Code written, reviewed, deployed.",
    },
    {
      id: "triage",
      label: "Triage",
      icon: "sync",
      kind: "step",
      x: 660,
      y: 280,
      mobile_x: 100,
      mobile_y: 720,
      delay: "8.5s",
      description: "Polished, hardened, ready to ship.",
    },
    {
      id: "delivery",
      label: "Delivery",
      icon: "client",
      kind: "client",
      x: 960,
      y: 180,
      mobile_x: 200,
      mobile_y: 1020,
      delay: "11.0s",
      description: "Shipped — documented, monitored, supported.",
    },
  ];

function ViaNodes({ points }: { points: number[][] }) {
  return (
    <g>
      {points.map(([x, y], i) => (
        <g key={`via-${i}`} transform={`translate(${x}, ${y})`}>
          <circle r="3.5" fill="#0a0a0a" stroke="#d4af37" strokeWidth="1" opacity="0.75" />
          <circle r="1" fill="#d4af37" opacity="0.9" />
        </g>
      ))}
    </g>
  );
}

function SocketFootprint({ x, y }: { x: number; y: number }) {
  const padPositions = Array.from({ length: 12 }).map((_, i) => -55 + i * 10);
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Silkscreen component outline */}
      <rect x="-66" y="-30" width="132" height="60" fill="none" stroke="#ffffff" strokeWidth="1" rx="2" opacity="0.5" />
      <circle cx="-58" cy="-22" r="2" fill="#ffffff" opacity="0.5" />
      <path d="M -66 -10 L -58 0 L -66 10" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.5" /> {/* Notch indicator */}

      {/* Exact ENIG Gold Solder Pads matching 10px pitch */}
      {padPositions.map(px => (
        <React.Fragment key={px}>
          <rect x={px - 2} y="-38" width="4" height="12" fill="#d4af37" rx="1" />
          <rect x={px - 2} y="26" width="4" height="12" fill="#d4af37" rx="1" />
        </React.Fragment>
      ))}
    </g>
  );
}

function NodeMark({ kind }: { kind: NodeKind }) {
  if (kind === "client") {
    return (
      <svg
        viewBox="0 0 20 20"
        width="14"
        height="14"
        aria-hidden="true"
        className={styles.markIcon}
      >
        <circle cx="10" cy="6.5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M 3.5 17 C 3.5 13.4 6.4 11.5 10 11.5 C 13.6 11.5 16.5 13.4 16.5 17"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "brand") {
    return (
      <svg
        viewBox="0 0 20 20"
        width="14"
        height="14"
        aria-hidden="true"
        className={`${styles.markIcon} ${styles.markIconBrand}`}
      >
        <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <ellipse cx="10" cy="10" rx="7" ry="3" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.85" />
        <line x1="10" y1="3" x2="10" y2="17" stroke="currentColor" strokeWidth="1.1" opacity="0.85" />
      </svg>
    );
  }
  return null;
}

export function CTA() {
  const [activeNode, setActiveNode] = useState("Client Brief");
  const [timeToNext, setTimeToNext] = useState("2.50s");
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cycleDuration = 15000;

    // Map exact CSS delays to phases
    const phases = [
      { name: "Client Brief", start: 0, next: 2.5 },
      { name: "ZeroAxiis", start: 2.5, next: 5.0 },
      { name: "Ideate", start: 5.0, next: 8.5 },
      { name: "Build & Triage", start: 8.5, next: 11.0 },
      { name: "Delivery", start: 11.0, next: 15.0 },
    ];

    const interval = setInterval(() => {
      let elapsedSec = 0;
      
      // Sync perfectly with the physical CSS animation running in the DOM
      if (nodeRef.current) {
        const animations = nodeRef.current.getAnimations();
        // The animation we want to track is the 15s nodePulse
        const pulseAnim = animations.find(a => typeof a.animationName === 'string' && a.animationName.includes('nodePulse'));
        
        if (pulseAnim && pulseAnim.currentTime !== null) {
          elapsedSec = (Number(pulseAnim.currentTime) % cycleDuration) / 1000;
        } else {
          return; // Animation hasn't initialized yet
        }
      } else {
        return;
      }
      
      const currentPhase = phases.find(p => elapsedSec >= p.start && elapsedSec < p.next) || phases[0];
      
      setActiveNode(currentPhase.name);
      setTimeToNext((currentPhase.next - elapsedSec).toFixed(2) + "s");
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section
      id="workflow"
      className="relative"
    >
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

        <div className="w-full pb-8 relative">
          {/* Fixed Terminal Easter Egg */}
          <div className="absolute top-[60%] md:top-[70%] right-0 w-[320px] text-left font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em] whitespace-pre leading-loose pointer-events-none z-20">
            {`SYNCING_NODES\nCURRENT NODE: ${activeNode}\nLATENCY: ${timeToNext} TO NEXT\nPACKET_LOSS: 0%\n> OVERRIDE_AUTH\n[ EXECUTING ]\nZEROAXIIS_FRAMEWORK_V1`}
          </div>

          <div
            className={`${styles.canvas} relative w-full aspect-[400/1100] md:w-[1100px] md:min-w-[1100px] md:aspect-auto md:h-[360px] mx-auto`}
          >

            {/* Desktop SVG */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full hidden md:block"
              viewBox="0 0 1100 360"
            >
              <rect width="100%" height="100%" fill="transparent" />

              {/* Sockets */}
              {NODES.map((node) => (
                <SocketFootprint key={`socket-desktop-${node.id}`} x={node.x} y={node.y} />
              ))}

              {/* Vias */}
              <ViaNodes points={DESKTOP_VIAS} />

              {/* Base Thick Trace */}
              <path d={PATH_1} stroke="rgba(255,255,255,0.02)" strokeWidth="12" fill="none" />
              <path d={PATH_2} stroke="rgba(255,255,255,0.02)" strokeWidth="12" fill="none" />
              
              {/* ENIG Gold Trace */}
              <path d={PATH_1} stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.3" />
              <path d={PATH_2} stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.3" />
              
              {/* Digital Data Pattern Overlay */}
              <path d={PATH_1} stroke="#c8ff00" strokeWidth="1.5" strokeDasharray="4 12" fill="none" opacity="0.25" />
              <path d={PATH_2} stroke="#c8ff00" strokeWidth="1.5" strokeDasharray="4 12" fill="none" opacity="0.25" />

              {[0, 1, 2, 3].map((layer) => (
                <React.Fragment key={`trace1-${layer}`}>
                  <path
                    d={PATH_1}
                    stroke="rgba(200,255,0,0.32)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="40 9999"
                    className={`${styles.traceHalo} ${styles[`traceHaloLayer${layer}`]} ${styles[`trace1_${layer}`]}`}
                  />
                  <path
                    d={PATH_1}
                    stroke="#c8ff00"
                    strokeWidth="2.2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="40 9999"
                    className={`${styles.trace} ${styles[`traceLayer${layer}`]} ${styles[`trace1_${layer}`]}`}
                  />
                </React.Fragment>
              ))}

              {[0, 1, 2, 3].map((layer) => (
                <React.Fragment key={`trace2-${layer}`}>
                  <path
                    d={PATH_2}
                    stroke="rgba(200,255,0,0.32)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="40 9999"
                    className={`${styles.traceHalo} ${styles[`traceHaloLayer${layer}`]} ${styles[`trace2_${layer}`]}`}
                  />
                  <path
                    d={PATH_2}
                    stroke="#c8ff00"
                    strokeWidth="2.2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="40 9999"
                    className={`${styles.trace} ${styles[`traceLayer${layer}`]} ${styles[`trace2_${layer}`]}`}
                  />
                </React.Fragment>
              ))}
            </svg>

            {/* Mobile SVG */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full md:hidden"
              viewBox="0 0 400 1100"
              preserveAspectRatio="none"
            >
              <rect width="100%" height="100%" fill="transparent" />

              {/* Sockets Mobile */}
              {NODES.map((node) => (
                <SocketFootprint key={`socket-mobile-${node.id}`} x={node.mobile_x} y={node.mobile_y} />
              ))}

              {/* Vias */}
              <ViaNodes points={MOBILE_VIAS} />

              {/* Base Thick Trace */}
              <path d={MOBILE_PATH_1} stroke="rgba(255,255,255,0.02)" strokeWidth="12" fill="none" />
              <path d={MOBILE_PATH_2} stroke="rgba(255,255,255,0.02)" strokeWidth="12" fill="none" />
              
              {/* ENIG Gold Trace */}
              <path d={MOBILE_PATH_1} stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.3" />
              <path d={MOBILE_PATH_2} stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.3" />
              
              {/* Digital Data Pattern Overlay */}
              <path d={MOBILE_PATH_1} stroke="#c8ff00" strokeWidth="1.5" strokeDasharray="4 12" fill="none" opacity="0.25" />
              <path d={MOBILE_PATH_2} stroke="#c8ff00" strokeWidth="1.5" strokeDasharray="4 12" fill="none" opacity="0.25" />

              {[0, 1, 2, 3].map((layer) => (
                <React.Fragment key={`mobile-trace1-${layer}`}>
                  <path
                    d={MOBILE_PATH_1}
                    stroke="rgba(200,255,0,0.32)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="40 9999"
                    className={`${styles.traceHalo} ${styles[`traceHaloLayer${layer}`]} ${styles[`trace1_${layer}`]}`}
                  />
                  <path
                    d={MOBILE_PATH_1}
                    stroke="#c8ff00"
                    strokeWidth="2.2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="40 9999"
                    className={`${styles.trace} ${styles[`traceLayer${layer}`]} ${styles[`trace1_${layer}`]}`}
                  />
                </React.Fragment>
              ))}

              {[0, 1, 2, 3].map((layer) => (
                <React.Fragment key={`mobile-trace2-${layer}`}>
                  <path
                    d={MOBILE_PATH_2}
                    stroke="rgba(200,255,0,0.32)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="40 9999"
                    className={`${styles.traceHalo} ${styles[`traceHaloLayer${layer}`]} ${styles[`trace2_${layer}`]}`}
                  />
                  <path
                    d={MOBILE_PATH_2}
                    stroke="#c8ff00"
                    strokeWidth="2.2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="40 9999"
                    className={`${styles.trace} ${styles[`traceLayer${layer}`]} ${styles[`trace2_${layer}`]}`}
                  />
                </React.Fragment>
              ))}
            </svg>

            {/* Nodes */}
            {NODES.map((node, i) => (
              <div
                key={node.id}
                ref={i === 0 ? nodeRef : null}
                className={`${styles.unifiedNode} ${node.kind === "brand" ? styles.unifiedNodeBrand : ""
                  } ${node.kind === "client" ? styles.unifiedNodeClient : ""}`}
                style={
                  {
                    "--desktop-x": `${(node.x / 1100) * 100}%`,
                    "--desktop-y": `${(node.y / 360) * 100}%`,
                    "--mobile-x": `${(node.mobile_x / 400) * 100}%`,
                    "--mobile-y": `${(node.mobile_y / 1100) * 100}%`,
                    "--delay": node.delay,
                  } as React.CSSProperties
                }
              >
                <div className={styles.nodeHead}>
                  {node.kind === "step" ? (
                    <span className="material-symbols-outlined">{node.icon}</span>
                  ) : (
                    <NodeMark kind={node.kind} />
                  )}
                  <span>{node.label}</span>
                </div>
                <div className={styles.nodeBody}>{node.description}</div>
              </div>
            ))}
          </div>
        </div>

      </Container>
    </Section>
  );
}
