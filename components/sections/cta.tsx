import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import React from "react";
import styles from "./cta.module.css";

const PATHS = {
  bg: "M 120 120 L 120 300 L 440 300 L 440 180 L 690 180 L 690 300 L 960 300 M 440 300 L 440 420 L 690 420 L 690 300",
  flow1: "M 120 120 L 120 300 L 440 300 L 440 180 L 690 180 L 690 300 L 960 300",
  flow2: "M 120 120 L 120 300 L 440 300 L 440 420 L 690 420 L 690 300 L 960 300",
};

const CYCLE_SECONDS = 10; // Total 10s loop (7s active + 3s hold)

const NODES = [
  { id: 'request', label: 'Your Req', icon: 'CL', isLogo: true, x: 120, y: 120, delay: '0s' },
  { id: 'zero', label: 'ZeroAxiis', icon: 'ZA', isLogo: true, x: 120, y: 300, delay: '1s' },
  { id: 'ideate', label: 'Ideate', icon: 'description', x: 320, y: 300, delay: '2.11s' },
  { id: 'concept', label: 'CONCEPT', icon: 'lightbulb', x: 580, y: 180, delay: '4.22s' },
  { id: 'engineering', label: 'ENGINEERING', icon: 'code_blocks', x: 580, y: 420, delay: '4.22s' },
  { id: 'triage', label: 'TRIAGE', icon: 'sync', x: 780, y: 300, delay: '6s' },
  { id: 'client', label: 'Client', icon: 'CL', isLogo: true, x: 960, y: 300, delay: '7s' },
];

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
                <radialGradient id="mask-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="60%" stopColor="white" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                
                <mask id="glow-mask-1">
                  <circle r="70" fill="url(#mask-glow)">
                    <animateMotion dur={`${CYCLE_SECONDS}s`} repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear">
                      <mpath href="#flow-path-1" />
                    </animateMotion>
                    <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.7;0.75;1" dur={`${CYCLE_SECONDS}s`} repeatCount="indefinite" />
                  </circle>
                </mask>
                <mask id="glow-mask-2">
                  <circle r="70" fill="url(#mask-glow)">
                    <animateMotion dur={`${CYCLE_SECONDS}s`} repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear">
                      <mpath href="#flow-path-2" />
                    </animateMotion>
                    <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.7;0.75;1" dur={`${CYCLE_SECONDS}s`} repeatCount="indefinite" />
                  </circle>
                </mask>
                
                <path id="flow-path-1" d={PATHS.flow1} />
                <path id="flow-path-2" d={PATHS.flow2} />
              </defs>

              {/* Base grey dashed path */}
              <path
                d={PATHS.bg}
                stroke="rgba(245,241,232,0.18)"
                strokeWidth="2"
                strokeDasharray="6 8"
                fill="none"
                strokeLinecap="round"
              />

              {/* Animated bright paths masked by the moving glowing circles */}
              <path
                d={PATHS.flow1}
                stroke="#c8ff00"
                strokeWidth="2.5"
                strokeDasharray="6 8"
                fill="none"
                strokeLinecap="round"
                mask="url(#glow-mask-1)"
              />
              <path
                d={PATHS.flow2}
                stroke="#c8ff00"
                strokeWidth="2.5"
                strokeDasharray="6 8"
                fill="none"
                strokeLinecap="round"
                mask="url(#glow-mask-2)"
              />
            </svg>

            {NODES.map((node) => (
              <div 
                key={node.id} 
                className={styles.unifiedNode} 
                style={{ left: node.x, top: node.y, '--delay': node.delay } as React.CSSProperties}
              >
                {node.isLogo ? (
                  <div className={styles.logoCircle}>{node.icon}</div>
                ) : (
                  <span className="material-symbols-outlined">{node.icon}</span>
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

