import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import React from "react";
import styles from "./cta.module.css";

// Path geometry — viewBox 1000x500. Two parallel paths converge through a
// diamond in the middle so the request can split into Concept / Engineering
// then re-merge at Triage. Tightened to match arrival-delay math below.
const PATHS = {
  bg: "M 120 120 L 120 300 L 440 300 L 440 180 L 690 180 L 690 300 L 960 300 M 440 300 L 440 420 L 690 420 L 690 300",
  flow1:
    "M 120 120 L 120 300 L 440 300 L 440 180 L 690 180 L 690 300 L 960 300",
  flow2:
    "M 120 120 L 120 300 L 440 300 L 440 420 L 690 420 L 690 300 L 960 300",
};

// Single shared timeline. 7s active travel + 3s hold = 10s loop.
const CYCLE_SECONDS = 10;
const TRAVEL_FRACTION = 0.7;

// Each node's arrival expressed as 0..1 along the active travel window.
// Multiplied by (TRAVEL_FRACTION * CYCLE_SECONDS) = 7s to get real seconds.
// Keeps box-pulse delays locked to mask-glow arrival.
const tt = (arrival: number) =>
  `${(arrival * TRAVEL_FRACTION * CYCLE_SECONDS).toFixed(2)}s`;

type NodeKind = "client" | "brand" | "step";

const NODES: Array<{
  id: string;
  label: string;
  icon: string;
  kind: NodeKind;
  x: number;
  y: number;
  delay: string;
}> = [
  { id: "request", label: "Your Req", icon: "client", kind: "client", x: 120, y: 120, delay: tt(0) },
  { id: "zero", label: "ZeroAxiis", icon: "brand", kind: "brand", x: 120, y: 300, delay: tt(0.15) },
  { id: "ideate", label: "Ideate", icon: "description", kind: "step", x: 320, y: 300, delay: tt(0.3) },
  { id: "concept", label: "Concept", icon: "lightbulb", kind: "step", x: 565, y: 180, delay: tt(0.55) },
  { id: "engineering", label: "Engineering", icon: "code_blocks", kind: "step", x: 565, y: 420, delay: tt(0.55) },
  { id: "triage", label: "Triage", icon: "sync", kind: "step", x: 810, y: 300, delay: tt(0.82) },
  { id: "client", label: "Client", icon: "client", kind: "client", x: 960, y: 300, delay: tt(1) },
];

function NodeMark({ kind }: { kind: NodeKind }) {
  if (kind === "client") {
    return (
      <svg
        viewBox="0 0 20 20"
        width="16"
        height="16"
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
        width="16"
        height="16"
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
  return (
    <Section
      id="workflow"
      className="border-t border-stroke relative overflow-hidden"
    >
      <Container>
        <Reveal className="mb-20 max-w-4xl">
          <p className="font-label-mono text-label-mono text-bone-mute uppercase tracking-[0.22em] mb-5 flex items-center gap-3">
            <span className="inline-block w-7 h-px bg-accent" />
            Methodology / 02
          </p>
          <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-[0.95] text-bone tracking-[-0.03em] text-balance">
            From your brief{" "}
            <span className="italic text-bone-dim">to scale.</span>
          </h2>
          <p className="mt-6 font-body-md text-body-md text-bone-mute max-w-2xl">
            Every engagement travels the same four rituals — stripped of
            ceremony, shaped by craft. Watch a request move.
          </p>
        </Reveal>

        <div className="w-full overflow-x-auto pb-12 custom-scrollbar">
          <div className={`${styles.canvas} relative w-[1000px] min-w-[1000px] h-[500px] mx-auto`}>
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 500"
            >
              <defs>
                <radialGradient id="cta-mask-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="55%" stopColor="white" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>

                <mask id="cta-glow-mask-1">
                  <circle r="80" fill="url(#cta-mask-glow)">
                    <animateMotion
                      dur={`${CYCLE_SECONDS}s`}
                      repeatCount="indefinite"
                      keyPoints="0;1;1"
                      keyTimes="0;0.7;1"
                      calcMode="linear"
                    >
                      <mpath href="#cta-flow-1" />
                    </animateMotion>
                    <animate
                      attributeName="opacity"
                      values="1;1;0;0"
                      keyTimes="0;0.7;0.75;1"
                      dur={`${CYCLE_SECONDS}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </mask>
                <mask id="cta-glow-mask-2">
                  <circle r="80" fill="url(#cta-mask-glow)">
                    <animateMotion
                      dur={`${CYCLE_SECONDS}s`}
                      repeatCount="indefinite"
                      keyPoints="0;1;1"
                      keyTimes="0;0.7;1"
                      calcMode="linear"
                    >
                      <mpath href="#cta-flow-2" />
                    </animateMotion>
                    <animate
                      attributeName="opacity"
                      values="1;1;0;0"
                      keyTimes="0;0.7;0.75;1"
                      dur={`${CYCLE_SECONDS}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </mask>

                <path id="cta-flow-1" d={PATHS.flow1} />
                <path id="cta-flow-2" d={PATHS.flow2} />
              </defs>

              {/* Base rail — subtle dashed guide. */}
              <path
                d={PATHS.bg}
                stroke="rgba(245,241,232,0.14)"
                strokeWidth="1.5"
                strokeDasharray="5 7"
                fill="none"
                strokeLinecap="round"
              />

              {/* Lit rail beneath the mask — shows only inside the glow halo. */}
              <path
                d={PATHS.flow1}
                stroke="#c8ff00"
                strokeWidth="2.2"
                strokeDasharray="5 7"
                fill="none"
                strokeLinecap="round"
                mask="url(#cta-glow-mask-1)"
              />
              <path
                d={PATHS.flow2}
                stroke="#c8ff00"
                strokeWidth="2.2"
                strokeDasharray="5 7"
                fill="none"
                strokeLinecap="round"
                mask="url(#cta-glow-mask-2)"
              />

              {/* Path endpoint markers. */}
              <circle cx="120" cy="120" r="3" fill="#c8ff00" opacity="0.6" />
              <circle cx="960" cy="300" r="3" fill="#c8ff00" opacity="0.6" />
            </svg>

            {NODES.map((node) => (
              <div
                key={node.id}
                className={`${styles.unifiedNode} ${
                  node.kind === "brand" ? styles.unifiedNodeBrand : ""
                } ${node.kind === "client" ? styles.unifiedNodeClient : ""}`}
                style={
                  {
                    left: node.x,
                    top: node.y,
                    "--delay": node.delay,
                  } as React.CSSProperties
                }
              >
                {node.kind === "step" ? (
                  <span className="material-symbols-outlined">{node.icon}</span>
                ) : (
                  <NodeMark kind={node.kind} />
                )}
                <span>{node.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
