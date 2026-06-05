import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import React from "react";
import styles from "./cta.module.css";

const PATH_1 = "M 140 80 L 140 180 L 510 180 L 510 80 L 810 80 L 810 180 L 960 180";
const PATH_2 = "M 510 180 L 510 280 L 810 280 L 810 180";

type NodeKind = "client" | "brand" | "step";

const NODES: Array<{
  id: string;
  label: string;
  icon: string;
  kind: NodeKind;
  x: number;
  y: number;
  delay: string;
  description: string;
}> = [
    {
      id: "request",
      label: "Client",
      icon: "client",
      kind: "client",
      x: 140,
      y: 80,
      delay: "1.0s",
      description: "Request lands — the brief drops in.",
    },
    {
      id: "zero",
      label: "ZeroAxiis",
      icon: "brand",
      kind: "brand",
      x: 140,
      y: 180,
      delay: "3.5s",
      description: "Studio scopes, owns, and queues the work.",
    },
    {
      id: "ideate",
      label: "Ideate",
      icon: "description",
      kind: "step",
      x: 360,
      y: 180,
      delay: "6.0s",
      description: "Architecture mapped. Scope locked.",
    },
    {
      id: "engineering",
      label: "Build",
      icon: "code_blocks",
      kind: "step",
      x: 660,
      y: 80,
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
      delay: "11.0s",
      description: "Shipped — documented, monitored, supported.",
    },
  ];

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
            Every engagement travels the same six rituals — stripped of
            ceremony, shaped by craft. Watch a request move.
          </p>
        </Reveal>

        <div className="w-full overflow-x-auto pb-8 custom-scrollbar">
          <div
            className={`${styles.canvas} relative w-[1100px] min-w-[1100px] h-[360px] mx-auto`}
          >
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1100 360"
            >
              <path
                d={PATH_1}
                stroke="rgba(245,241,232,0.18)"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d={PATH_2}
                stroke="rgba(245,241,232,0.18)"
                strokeWidth="1.5"
                fill="none"
              />

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

            {NODES.map((node) => (
              <div
                key={node.id}
                className={`${styles.unifiedNode} ${node.kind === "brand" ? styles.unifiedNodeBrand : ""
                  } ${node.kind === "client" ? styles.unifiedNodeClient : ""}`}
                style={
                  {
                    left: `${(node.x / 1100) * 100}%`,
                    top: `${(node.y / 360) * 100}%`,
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
