import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { workflowSteps } from "@/lib/data/workflow";
import styles from "./cta.module.css";

type FlowNode = {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  accent?: boolean;
  caption?: string;
};

// Path mirrors the reference: enters right, threads left through nodes.
const COORDS: Array<{ x: number; y: number }> = [
  { x: 93, y: 60 },
  { x: 73, y: 20 },
  { x: 47, y: 36 },
  { x: 26, y: 84 },
];

const NODES: FlowNode[] = workflowSteps.map((step, i) => ({
  id: step.title.toLowerCase(),
  label: step.title,
  icon: step.icon,
  x: COORDS[i].x,
  y: COORDS[i].y,
  accent: step.highlight,
  caption: i === 0 ? "Your brief" : undefined,
}));

const PATH = `M ${COORDS[0].x},${COORDS[0].y} L ${COORDS[1].x},${COORDS[1].y} L ${COORDS[2].x},${COORDS[2].y} L ${COORDS[2].x},${68} L ${COORDS[3].x},${COORDS[3].y} L 6,70`;
const CYCLE_SECONDS = 7;

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

        <div
          className={`${styles.canvas} relative h-[460px] md:h-[520px] lg:h-[560px]`}
        >
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <defs>
              <radialGradient id="cta-particle-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(200,255,0,0.9)" />
                <stop offset="40%" stopColor="rgba(200,255,0,0.35)" />
                <stop offset="100%" stopColor="rgba(200,255,0,0)" />
              </radialGradient>
            </defs>
            <path
              id="cta-flow-path"
              d={PATH}
              stroke="rgba(245,241,232,0.18)"
              strokeWidth="0.18"
              strokeDasharray="0.7 0.9"
              fill="none"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <circle r="2.4" fill="url(#cta-particle-glow)">
              <animateMotion
                dur={`${CYCLE_SECONDS}s`}
                repeatCount="indefinite"
                rotate="auto"
              >
                <mpath href="#cta-flow-path" />
              </animateMotion>
            </circle>
            <circle r="0.55" fill="#c8ff00">
              <animateMotion
                dur={`${CYCLE_SECONDS}s`}
                repeatCount="indefinite"
              >
                <mpath href="#cta-flow-path" />
              </animateMotion>
            </circle>
          </svg>

          {NODES.map((node) => (
            <span
              key={node.id}
              className={`${styles.node} ${node.accent ? styles.nodeAccent : ""}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <span className="material-symbols-outlined text-[16px] leading-none">
                {node.icon}
              </span>
              {node.label}
            </span>
          ))}

          {NODES.filter((n) => n.caption).map((n) => (
            <span
              key={`cap-${n.id}`}
              className={styles.caption}
              style={{ left: `${n.x}%`, top: `${Math.max(2, n.y - 12)}%` }}
            >
              {n.caption}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}
