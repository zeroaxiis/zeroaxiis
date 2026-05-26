"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#c8ff00";
const BONE = "#f5f1e8";

// Timeline (absolute ms) — text + ring fade in together
const T_INTRO = [0, 760] as const;
const T_RING_IN = T_INTRO;
const T_COLOR_SHIFT = [1500, 2200] as const;
const T_BUILDUP = [2200, 3260] as const;
const T_TEXT_OUT = [2200, 3050] as const;
const ZOOM_START = 3260;
const ZOOM_END = ZOOM_START + 350; // post-logo zoom-out = 0.35s
const T_HOLE_OPEN = [ZOOM_START, ZOOM_START + 180] as const;
const TOTAL_MS = ZOOM_END;

// Icosahedron vertices (normalized)
const PHI = (1 + Math.sqrt(5)) / 2;
const NORM = Math.hypot(1, PHI);
const VERTS: Array<[number, number, number]> = (
  [
    [-1, PHI, 0],
    [1, PHI, 0],
    [-1, -PHI, 0],
    [1, -PHI, 0],
    [0, -1, PHI],
    [0, 1, PHI],
    [0, -1, -PHI],
    [0, 1, -PHI],
    [PHI, 0, -1],
    [PHI, 0, 1],
    [-PHI, 0, -1],
    [-PHI, 0, 1],
  ] as Array<[number, number, number]>
).map(([x, y, z]) => [x / NORM, y / NORM, z / NORM]);

const EDGES: Array<[number, number]> = [
  [0, 1],
  [0, 5],
  [0, 7],
  [0, 10],
  [0, 11],
  [1, 5],
  [1, 7],
  [1, 8],
  [1, 9],
  [2, 3],
  [2, 4],
  [2, 6],
  [2, 10],
  [2, 11],
  [3, 4],
  [3, 6],
  [3, 8],
  [3, 9],
  [4, 5],
  [4, 9],
  [4, 11],
  [5, 9],
  [5, 11],
  [6, 7],
  [6, 8],
  [6, 10],
  [7, 8],
  [7, 10],
  [8, 9],
  [10, 11],
];

const SPHERE_R = 36; // sphere radius inside viewBox 100, sits inside O outer
const O_OUTER = { rx: 42, ry: 46 }; // serif O — slightly taller than wide
const O_INNER_START = { rx: 30, ry: 40 }; // thick sides, thinner top/bottom
const O_INNER_END = { rx: 41, ry: 45 }; // thin uniform ring (sphere silhouette)

function project(v: [number, number, number], ry: number, rx: number) {
  let [x, y, z] = v;
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  [x, z] = [x * cy + z * sy, -x * sy + z * cy];
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  [y, z] = [y * cx - z * sx, y * sx + z * cx];
  return { x: 50 + x * SPHERE_R, y: 50 + y * SPHERE_R, z };
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
const easeInQuart = (t: number) => t * t * t * t;
const seg = (t: number, a: number, b: number) =>
  Math.max(0, Math.min(1, (t - a) / (b - a)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}
const BONE_RGB = hexToRgb(BONE);
const ACCENT_RGB = hexToRgb(ACCENT);
function lerpColor(t: number) {
  const r = Math.round(lerp(BONE_RGB.r, ACCENT_RGB.r, t));
  const g = Math.round(lerp(BONE_RGB.g, ACCENT_RGB.g, t));
  const b = Math.round(lerp(BONE_RGB.b, ACCENT_RGB.b, t));
  return `rgb(${r}, ${g}, ${b})`;
}

function buildOPath(innerRx: number, innerRy: number): string {
  return [
    `M 50 ${50 - O_OUTER.ry}`,
    `A ${O_OUTER.rx} ${O_OUTER.ry} 0 0 1 50 ${50 + O_OUTER.ry}`,
    `A ${O_OUTER.rx} ${O_OUTER.ry} 0 0 1 50 ${50 - O_OUTER.ry}`,
    `Z`,
    `M 50 ${50 - innerRy}`,
    `A ${innerRx} ${innerRy} 0 0 0 50 ${50 + innerRy}`,
    `A ${innerRx} ${innerRy} 0 0 0 50 ${50 - innerRy}`,
    `Z`,
  ].join(" ");
}

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [p, setP] = useState(0);
  const [holeBasePx, setHoleBasePx] = useState(40);
  const slotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let raf = 0;
    let cancelled = false;
    const startLoop = () => {
      if (cancelled) return;
      const start = performance.now();
      const loop = (now: number) => {
        const t = Math.min(1, (now - start) / TOTAL_MS);
        setP(t);
        if (t < 1) raf = requestAnimationFrame(loop);
        else window.setTimeout(() => setIsLoading(false), 80);
      };
      raf = requestAnimationFrame(loop);
    };
    // Wait for the display font to load so text + ring appear together
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(startLoop).catch(startLoop);
    } else {
      startLoop();
    }
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  // Measure O slot to compute iris hole radius in screen pixels
  useEffect(() => {
    const measure = () => {
      if (!slotRef.current) return;
      const rect = slotRef.current.getBoundingClientRect();
      const side = Math.min(rect.width, rect.height);
      setHoleBasePx((O_OUTER.ry / 100) * side);
    };
    measure();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  if (!isLoading) return null;

  // Timeline (ms-based — zoom phase = 500ms regardless of how earlier phases retune)
  const tMs = p * TOTAL_MS;
  const segMs = (a: readonly [number, number]) => seg(tMs, a[0], a[1]);
  const introIn = easeOut(segMs(T_INTRO));
  const ringIn = easeOut(segMs(T_RING_IN));
  const colorShift = easeInOut(segMs(T_COLOR_SHIFT));
  const buildup = easeOut(segMs(T_BUILDUP));
  const textOut = easeInOut(segMs(T_TEXT_OUT));
  const zoom = seg(tMs, ZOOM_START, ZOOM_END);
  const zoomEase = easeInQuart(zoom);

  const rotProgress = seg(tMs, 1500, ZOOM_END);
  const rotY = rotProgress * Math.PI * 1.5 + zoomEase * Math.PI * 0.6;
  const rotX = -0.32 + Math.sin(p * Math.PI) * 0.06;

  const projected = VERTS.map((v) => project(v, rotY, rotX));

  const buildSpan = T_BUILDUP[1] - T_BUILDUP[0];
  const nodeVis = VERTS.map((_, i) => {
    const a = T_BUILDUP[0] + (i / VERTS.length) * buildSpan * 0.4;
    return easeOut(seg(tMs, a, a + buildSpan * 0.45));
  });
  const edgeVis = EDGES.map((_, i) => {
    const a =
      T_BUILDUP[0] + buildSpan * 0.2 + (i / EDGES.length) * buildSpan * 0.5;
    return easeOut(seg(tMs, a, a + buildSpan * 0.5));
  });

  const containerScale = 1 + zoomEase * 50;

  const ringColor = lerpColor(colorShift);
  const ringOpacity = ringIn;
  const glow = (colorShift * 0.7 + buildup * 0.35) * (1 - zoom * 0.7);

  const innerRx = lerp(O_INNER_START.rx, O_INNER_END.rx, buildup);
  const innerRy = lerp(O_INNER_START.ry, O_INNER_END.ry, buildup);
  const oPath = buildOPath(innerRx, innerRy);

  // Iris hole only opens once zoom phase starts — before that the dark backdrop is solid.
  const holeOpening = easeOut(segMs(T_HOLE_OPEN));
  const holeR = Math.max(0, holeBasePx * containerScale * holeOpening);
  const irisMask = `radial-gradient(circle at center, transparent 0, transparent ${holeR}px, rgba(0,0,0,1) ${holeR + 1}px, rgba(0,0,0,1) 100%)`;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Iris-masked layer: dark backdrop + grain + glow.
          The radial-gradient mask cuts a hole that grows with the sphere ring. */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: irisMask,
          maskImage: irisMask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            opacity: 0.035,
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: glow,
            background:
              "radial-gradient(circle at center, rgba(200,255,0,0.22) 0%, rgba(200,255,0,0.06) 28%, transparent 60%)",
          }}
        />
      </div>

      {/* Wordmark layer — O slot is the viewport-centered element (so it aligns exactly
          with the iris-mask center). "Zer" and "Axiis" flank it via absolute positioning. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative text-[60px] md:text-[80px] lg:text-[100px] text-bone tracking-tight leading-none"
          style={{
            fontFamily: "var(--font-display-sans)",
            fontWeight: 500,
            transform: `scale(${containerScale})`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          {/* O slot — square so the donut centers on the cap-height of the side text */}
          <span
            ref={slotRef}
            className="relative inline-flex items-center justify-center align-middle"
            style={{ width: "0.78em", height: "0.78em" }}
          >
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full overflow-visible"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {/* Donut "O" letterform — thick sides, thinner top/bottom (serif feel).
                  Inner ellipse expands during buildup → thin sphere silhouette. */}
              <path
                d={oPath}
                fill={ringColor}
                fillRule="evenodd"
                fillOpacity={ringOpacity}
                style={{
                  filter: `drop-shadow(0 0 ${6 + glow * 14}px rgba(200,255,0,${glow * 0.75}))`,
                }}
              />

              {/* Sphere edges */}
              {EDGES.map(([a, b], i) => {
                const pa = projected[a];
                const pb = projected[b];
                const v = edgeVis[i];
                if (v <= 0) return null;
                const depth = ((pa.z + pb.z) / 2 + 1) / 2;
                const opacity = (0.2 + 0.6 * depth) * v;
                return (
                  <line
                    key={`e${i}`}
                    x1={pa.x}
                    y1={pa.y}
                    x2={pb.x}
                    y2={pb.y}
                    stroke={ACCENT}
                    strokeWidth={lerp(0.6, 1.3, depth)}
                    strokeOpacity={opacity}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              {/* Sphere nodes (back-to-front for proper depth layering) */}
              {projected
                .map((node, i) => ({ node, i }))
                .sort((a, b) => a.node.z - b.node.z)
                .map(({ node, i }) => {
                  const v = nodeVis[i];
                  if (v <= 0) return null;
                  const depth = (node.z + 1) / 2;
                  const r = lerp(1.7, 3.4, depth) * v;
                  const opacity = (0.45 + 0.55 * depth) * v;
                  return (
                    <g key={`n${i}`}>
                      {depth > 0.55 && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={r * 2.4}
                          fill={ACCENT}
                          opacity={(depth - 0.55) * 0.5 * v}
                          style={{ filter: "blur(2.5px)" }}
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={r}
                        fill={ACCENT}
                        opacity={opacity}
                      />
                    </g>
                  );
                })}
            </svg>
          </span>

          {/* "Zer" — flanks slot to the left, perfectly outside its bounds */}
          <span
            style={{
              position: "absolute",
              top: "50%",
              right: "100%",
              opacity: introIn * (1 - textOut),
              transform: `translate(${-textOut * 90}px, calc(-50% + 0.06em))`,
              filter: `blur(${textOut * 12}px)`,
              whiteSpace: "nowrap",
              willChange: "transform, opacity, filter",
            }}
          >
            Zer
          </span>

          {/* "Axiis" — flanks slot to the right */}
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "100%",
              opacity: introIn * (1 - textOut),
              transform: `translate(${textOut * 90}px, calc(-50% + 0.06em))`,
              filter: `blur(${textOut * 12}px)`,
              whiteSpace: "nowrap",
              willChange: "transform, opacity, filter",
            }}
          >
            Axiis
          </span>
        </div>
      </div>
    </div>
  );
}
