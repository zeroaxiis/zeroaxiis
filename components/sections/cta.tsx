import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import React from "react";
import styles from "./cta.module.css";

const PATH_1 = "M 140 80 L 140 180 L 510 180 L 510 80 L 810 80 L 810 180 L 960 180";
const PATH_2 = "M 510 180 L 510 280 L 810 280 L 810 180";

const MOBILE_PATH_1 = "M 200 100 L 200 200 L 200 420 L 200 570 L 300 570 L 300 720 L 300 870 L 200 870 L 200 1020";
const MOBILE_PATH_2 = "M 200 570 L 100 570 L 100 720 L 100 870 L 200 870";

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
      y: 80,
      mobile_x: 200,
      mobile_y: 100,
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
      mobile_x: 200,
      mobile_y: 200,
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
      mobile_x: 200,
      mobile_y: 420,
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

        <div className="w-full pb-8">
          <div
            className={`${styles.canvas} relative w-full aspect-[400/1100] md:w-[1100px] md:min-w-[1100px] md:aspect-auto md:h-[360px] mx-auto`}
          >
            {/* Desktop SVG */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full hidden md:block"
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

            {/* Mobile SVG */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full md:hidden"
              viewBox="0 0 400 1100"
              preserveAspectRatio="none"
            >
              <path
                d={MOBILE_PATH_1}
                stroke="rgba(245,241,232,0.18)"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d={MOBILE_PATH_2}
                stroke="rgba(245,241,232,0.18)"
                strokeWidth="1.5"
                fill="none"
              />

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

            {NODES.map((node) => (
              <div
                key={node.id}
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
