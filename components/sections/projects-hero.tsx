"use client";

import { motion } from "motion/react";
import { ArrowUpRightSmallIcon } from "@/components/icons";
import { Magnetic } from "@/components/ui/magnetic";
import styles from "@/components/sections/hero/hero.module.css";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense } from "react";
import { Globe } from "@/components/sections/hero/scene";

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
    <section className="relative w-full overflow-hidden pt-36 pb-0">
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-lg opacity-30 [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)] pointer-events-none"
      />

      <div className="mx-auto max-w-footer-max px-[clamp(1rem,6vw,7rem)]">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12">
          {/* Left: copy */}
          <div className="w-full max-w-lg shrink-0 pb-12 lg:pb-20 pt-4">
            {/* Label */}
            <motion.p
              className="font-label-mono text-label-mono text-accent uppercase tracking-[0.22em] mb-8 flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              CLIENT PROJECTS
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
            <Magnetic strength={0.35} className="inline-block w-fit">
              <motion.a
                href="#"
                className={styles.cta}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span>Start a project</span>
                <span className={styles.ctaArrow}>
                  <ArrowUpRightSmallIcon />
                </span>
              </motion.a>
            </Magnetic>
          </div>

          {/* Right: orbit diagram */}
          <div className="relative w-full max-w-2xl lg:flex-1 h-[380px] hidden md:block">
            <OrbitDiagram />

            {/* 3D Globe overlay at the center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
              <div className="w-[180px] h-[180px]">
                <Canvas
                  camera={{ position: [0, 0, 4.5], fov: 42 }}
                  dpr={[1, 1.6]}
                  gl={{ antialias: true, alpha: true }}
                  style={{ background: "transparent" }}
                >
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.4} />
                    <Float
                      speed={0.5}
                      rotationIntensity={0.15}
                      floatIntensity={0.25}
                      floatingRange={[-0.06, 0.06]}
                    >
                      <Globe tiltX={(20 * Math.PI) / 180} tiltZ={(18 * Math.PI) / 180} interactive={false} />
                    </Float>
                  </Suspense>
                </Canvas>
              </div>
            </div>
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
  const rx1 = 240;
  const ry1 = 120;
  // Inner ellipse
  const rx2 = 140;
  const ry2 = 70;

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

      <g transform={`rotate(-12 ${cx} ${cy})`}>
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
                transform={`rotate(12 ${labelX} ${outerPt.y - 6})`}
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
                transform={`rotate(12 ${labelX} ${outerPt.y + 9})`}
              >
                {node.sub}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
