"use client";

import { motion } from "motion/react";
import { ArrowUpRightIcon } from "@/components/icons";

const ORBIT_NODES = [
  {
    id: "collaboration",
    label: "COLLABORATION",
    sub: "Long-term partnerships",
    angle: 270, // top centre
    rx: 38,
    ry: 38,
  },
  {
    id: "product",
    label: "PRODUCT THINKING",
    sub: "Solutions that scale",
    angle: 190, // bottom left
    rx: 38,
    ry: 38,
  },
  {
    id: "clean",
    label: "CLEAN DESIGN",
    sub: "Interfaces that connect",
    angle: 350, // top right
    rx: 38,
    ry: 38,
  },
  {
    id: "tech",
    label: "TECHNOLOGY",
    sub: "Built for performance",
    angle: 155, // bottom right
    rx: 38,
    ry: 38,
  },
];

export function ProjectsHero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-stroke pt-36 pb-0">
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-30 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)] pointer-events-none"
      />

      <div className="mx-auto max-w-footer-max px-[clamp(1rem,6vw,7rem)]">
        <div className="flex items-start justify-between gap-8">
          {/* Left: copy */}
          <div className="max-w-lg shrink-0 pb-20 pt-4">
            {/* Label */}
            <motion.p
              className="font-label-mono text-label-mono text-accent uppercase tracking-[0.22em] mb-8 flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              CLIENT PROJECTS{" "}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse-ring" />
            </motion.p>

            {/* Headline */}
            <motion.h1
              className="font-display text-[clamp(52px,7vw,96px)] leading-[0.92] tracking-[-0.03em] text-bone mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Work that
              <br />
              <span className="italic text-accent">creates</span> impact.
            </motion.h1>

            {/* Body */}
            <motion.p
              className="font-body-md text-body-md text-bone-mute max-w-sm leading-relaxed mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              A collection of digital products and experiences we&apos;ve
              crafted for ambitious teams and brands.
            </motion.p>

            {/* CTA */}
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 font-label-mono text-label-mono text-accent uppercase tracking-[0.18em] group"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              START A PROJECT
              <span className="inline-flex items-center justify-center w-6 h-6 border border-accent rounded-sm group-hover:bg-accent group-hover:text-ink transition-all duration-300">
                <ArrowUpRightIcon width={12} height={12} strokeWidth={2} />
              </span>
            </motion.a>
          </div>

          {/* Right: orbit diagram */}
          <div className="relative flex-1 min-w-0 h-[380px] hidden md:block">
            <OrbitDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitDiagram() {
  // Centre of our SVG viewport
  const cx = 340;
  const cy = 190;
  // Outer ellipse
  const rx1 = 280;
  const ry1 = 140;
  // Inner ellipse
  const rx2 = 160;
  const ry2 = 80;

  // Compute node positions on the outer ellipse
  const nodes = [
    { id: "collaboration", label: "COLLABORATION", sub: "Long-term partnerships", angleDeg: -90 }, // top
    { id: "product", label: "PRODUCT THINKING", sub: "Solutions that scale", angleDeg: 160 },     // bottom-left
    { id: "clean", label: "CLEAN DESIGN", sub: "Interfaces that connect", angleDeg: -20 },        // top-right
    { id: "tech", label: "TECHNOLOGY", sub: "Built for performance", angleDeg: 120 },              // bottom-right
  ];

  function ellipsePoint(rx: number, ry: number, angleDeg: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + rx * Math.cos(rad),
      y: cy + ry * Math.sin(rad),
    };
  }

  return (
    <svg
      viewBox="0 0 680 380"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="orbit-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c8ff00" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#c8ff00" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow circle behind centre */}
      <ellipse cx={cx} cy={cy} rx={rx2 + 20} ry={ry2 + 20} fill="url(#orbit-glow)" />

      {/* Outer dashed ellipse */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx1}
        ry={ry1}
        fill="none"
        stroke="rgba(245,241,232,0.12)"
        strokeWidth="1"
        strokeDasharray="6 8"
      />
      {/* Inner dashed ellipse */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx2}
        ry={ry2}
        fill="none"
        stroke="rgba(245,241,232,0.18)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />

      {/* Centre icon */}
      <circle cx={cx} cy={cy} r={32} fill="#181614" stroke="rgba(245,241,232,0.18)" strokeWidth="1" />
      {/* X mark (zeroaxiis logo-ish) */}
      <line x1={cx - 10} y1={cy - 10} x2={cx + 10} y2={cy + 10} stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" />
      <line x1={cx + 10} y1={cy - 10} x2={cx - 10} y2={cy + 10} stroke="#c8ff00" strokeWidth="2.5" strokeLinecap="round" />

      {/* Nodes */}
      {nodes.map((node) => {
        const outerPt = ellipsePoint(rx1, ry1, node.angleDeg);
        const innerPt = ellipsePoint(rx2, ry2, node.angleDeg);
        const isLeft = outerPt.x < cx;
        const textAnchor = isLeft ? "end" : "start";
        const labelX = isLeft ? outerPt.x - 16 : outerPt.x + 16;

        return (
          <g key={node.id}>
            {/* Spoke from inner to outer ellipse */}
            <line
              x1={innerPt.x}
              y1={innerPt.y}
              x2={outerPt.x}
              y2={outerPt.y}
              stroke="rgba(245,241,232,0.1)"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            {/* Node dot */}
            <circle cx={outerPt.x} cy={outerPt.y} r={5} fill="#c8ff00" opacity="0.9" />
            <circle cx={outerPt.x} cy={outerPt.y} r={10} fill="none" stroke="#c8ff00" strokeWidth="0.5" opacity="0.4" />
            {/* Labels */}
            <text
              x={labelX}
              y={outerPt.y - 6}
              textAnchor={textAnchor}
              fill="rgba(245,241,232,0.85)"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
              letterSpacing="0.12em"
            >
              {node.label}
            </text>
            <text
              x={labelX}
              y={outerPt.y + 9}
              textAnchor={textAnchor}
              fill="rgba(245,241,232,0.38)"
              fontSize="8"
              fontFamily="JetBrains Mono, monospace"
            >
              {node.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
