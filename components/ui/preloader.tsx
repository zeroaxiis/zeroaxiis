"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#c8ff00";
const BONE = "#f5f1e8";

// Phase A — fixed intro timeline (ms).
const T_INTRO = [0, 760] as const;
const T_RING_IN = T_INTRO;
const T_COLOR_SHIFT = [1500, 2200] as const;
const T_BUILDUP = [2200, 3260] as const;
const BUILDUP_END = T_BUILDUP[1];

// Phase C — zoom phase length.
const ZOOM_DUR = 350;
const HOLE_OPEN_DUR = 180;

// Floor on total perceived load — prevents the loader from disappearing
// instantly if landing page is already cached.
const MIN_HOLD_AFTER_BUILDUP = 600;

// Detect constrained runtime — drop the 3D sphere, throttle the loop, skip
// expensive glow filters. Pure render-time check, no SSR mismatch since we
// only consult this after first client paint.
function detectLowPower(): boolean {
  if (typeof window === "undefined") return false;
  const reducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reducedMotion) return true;
  const nav = window.navigator as Navigator & {
    deviceMemory?: number;
    hardwareConcurrency?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) return true;
  if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4)
    return true;
  if (nav.connection?.saveData) return true;
  if (
    nav.connection?.effectiveType &&
    /(2g|slow-2g)/.test(nav.connection.effectiveType)
  )
    return true;
  // Pointer-coarse + small viewport = phone/tablet.
  if (
    window.matchMedia?.("(pointer: coarse)").matches &&
    window.innerWidth < 768
  )
    return true;
  return false;
}

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

const SPHERE_R = 36;
const O_OUTER = { rx: 44, ry: 44 };
const O_INNER_START = { rx: 32, ry: 38 };
const O_INNER_END = { rx: 43, ry: 43 };

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

type Phase = "intro" | "hold" | "zoom";
type AnimState = {
  phase: Phase;
  tIntro: number;
  tHold: number;
  tZoom: number;
};

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [anim, setAnim] = useState<AnimState>({
    phase: "intro",
    tIntro: 0,
    tHold: 0,
    tZoom: 0,
  });
  const [lowPower] = useState(() => detectLowPower());
  const [loadComplete, setLoadComplete] = useState(false);
  const loadCompleteRef = useRef(false);
  const [holeBasePx, setHoleBasePx] = useState(40);
  const slotRef = useRef<HTMLSpanElement>(null);

  // Track real landing-page load — we hold the preloader until both the
  // window `load` event and `document.fonts.ready` have resolved.
  useEffect(() => {
    let cancelled = false;
    const markDone = () => {
      if (cancelled) return;
      loadCompleteRef.current = true;
      setLoadComplete(true);
    };

    const fontsReady = document.fonts?.ready
      ? document.fonts.ready.then(() => {})
      : Promise.resolve();

    const windowLoaded = new Promise<void>((res) => {
      if (document.readyState === "complete") {
        res();
        return;
      }
      const handler = () => res();
      window.addEventListener("load", handler, { once: true });
    });

    Promise.all([fontsReady, windowLoaded]).then(markDone);

    return () => {
      cancelled = true;
    };
  }, []);

  // Scroll lock — separate from the rAF loop so cleanup runs the moment
  // isLoading flips, not just on full unmount. Without this, the preloader
  // component stays mounted (in the root layout) after returning null and
  // body overflow stays "hidden" forever — scroll dead until full reload.
  useEffect(() => {
    if (!isLoading) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    let raf = 0;
    let cancelled = false;
    const start = performance.now();

    // Local mutable state — committed to React via setAnim each tick.
    let phase: Phase = "intro";
    let holdStart = 0;
    let tZoom = 0;
    let lastNow = start;
    let lastCommit = 0;
    // Low-power devices repaint every ~33ms; capable devices every frame.
    const commitInterval = lowPower ? 33 : 0;

    const loop = (now: number) => {
      if (cancelled) return;
      const dt = now - lastNow;
      lastNow = now;

      let tIntro = 0;
      let tHold = 0;

      if (phase === "intro") {
        tIntro = Math.min(BUILDUP_END, now - start);
        if (tIntro >= BUILDUP_END) {
          phase = "hold";
          holdStart = now;
        }
      } else if (phase === "hold") {
        tIntro = BUILDUP_END;
        tHold = now - holdStart;
        const minDone = tHold >= MIN_HOLD_AFTER_BUILDUP;
        if (loadCompleteRef.current && minDone) {
          phase = "zoom";
          tZoom = 0;
        }
      } else {
        tIntro = BUILDUP_END;
        tHold = now - holdStart;
        tZoom += dt;
        if (tZoom >= ZOOM_DUR + 80) {
          setIsLoading(false);
          return;
        }
      }

      if (now - lastCommit >= commitInterval) {
        lastCommit = now;
        setAnim({ phase, tIntro, tHold, tZoom });
      }
      raf = requestAnimationFrame(loop);
    };

    const startWhenReady = () => {
      if (cancelled) return;
      raf = requestAnimationFrame((t) => {
        lastNow = t;
        loop(t);
      });
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(startWhenReady).catch(startWhenReady);
    } else {
      startWhenReady();
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [lowPower]);

  // Measure O slot to compute iris hole radius in screen pixels
  useEffect(() => {
    const measure = () => {
      if (!slotRef.current) return;
      const rect = slotRef.current.getBoundingClientRect();
      const side = Math.min(rect.width, rect.height);
      setHoleBasePx((O_OUTER.ry / 100) * side);
    };
    measure();
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  if (!isLoading) return null;

  const { phase, tIntro, tHold, tZoom } = anim;

  const segMs = (t: number, a: readonly [number, number]) => seg(t, a[0], a[1]);
  const introIn = easeOut(segMs(tIntro, T_INTRO));
  const ringIn = easeOut(segMs(tIntro, T_RING_IN));
  const colorShift = easeInOut(segMs(tIntro, T_COLOR_SHIFT));
  const buildup = easeOut(segMs(tIntro, T_BUILDUP));

  // textOut is driven by phase, not intro time — keeps "Zer Axiis" visible
  // during the hold so the wordmark stays branded while the bar fills.
  const textOutPhase =
    phase === "intro"
      ? easeInOut(segMs(tIntro, [T_BUILDUP[0], T_BUILDUP[1] - 200]))
      : phase === "hold"
        ? 1
        : 1;

  // Zoom progress drives the iris-mask reveal + container scale-up.
  const zoom = phase === "zoom" ? Math.min(1, tZoom / ZOOM_DUR) : 0;
  const zoomEase = easeInQuart(zoom);
  const holeOpening =
    phase === "zoom" ? easeOut(Math.min(1, tZoom / HOLE_OPEN_DUR)) : 0;

  // Rotation — fixed intro spin, then continuous spin during hold until load
  // completes. Decouples the rotation from the fixed timeline.
  const introRot = seg(tIntro, 1500, BUILDUP_END);
  const baseRotY = introRot * Math.PI * 1.5;
  const holdRotY =
    phase === "hold" || phase === "zoom" ? (tHold / 1000) * Math.PI * 0.9 : 0;
  const rotY = baseRotY + holdRotY;
  // Subtle wobble on rotX through whole life.
  const rotX = -0.32 + Math.sin((tIntro + tHold) * 0.0006) * 0.06;

  const projected = VERTS.map((v) => project(v, rotY, rotX));

  const buildSpan = T_BUILDUP[1] - T_BUILDUP[0];
  const nodeVis = VERTS.map((_, i) => {
    const a = T_BUILDUP[0] + (i / VERTS.length) * buildSpan * 0.4;
    return easeOut(seg(tIntro, a, a + buildSpan * 0.45));
  });
  const edgeVis = EDGES.map((_, i) => {
    const a =
      T_BUILDUP[0] + buildSpan * 0.2 + (i / EDGES.length) * buildSpan * 0.5;
    return easeOut(seg(tIntro, a, a + buildSpan * 0.5));
  });

  const containerScale = 1 + zoomEase * 50;

  const ringColor = lerpColor(colorShift);
  const ringOpacity = ringIn;
  const baseGlow = colorShift * 0.7 + buildup * 0.35;

  const innerRx = lerp(O_INNER_START.rx, O_INNER_END.rx, buildup);
  const innerRy = lerp(O_INNER_START.ry, O_INNER_END.ry, buildup);
  const oPath = buildOPath(innerRx, innerRy);

  const holeR = Math.max(0, holeBasePx * containerScale * holeOpening);
  const irisMask = `radial-gradient(circle at center, transparent 0, transparent ${holeR}px, rgba(0,0,0,1) ${holeR + 1}px, rgba(0,0,0,1) 100%)`;

  // Progress bar — eases up to ~90% while waiting for load, snaps to 100%
  // once load completes. Same UX trick browsers use for indeterminate work.
  const introCovered = Math.min(1, tIntro / BUILDUP_END);
  const holdProgress = loadComplete ? 1 : 0.55 + Math.min(0.35, tHold / 4000);
  const progress =
    phase === "intro"
      ? introCovered * 0.45
      : phase === "hold"
        ? Math.max(0.45, holdProgress)
        : 1;
  const barOpacity = phase === "zoom" ? Math.max(0, 1 - zoom * 1.6) : introIn;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden pointer-events-none">
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
        {zoom < 1 && (
          <div
            className={`absolute inset-0 pointer-events-none ${zoom > 0 ? "" : "mix-blend-overlay"}`}
            style={{
              opacity: 0.035 * (1 - zoom),
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
          />
        )}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">
        <div
          className="relative text-[60px] md:text-[80px] lg:text-[100px] text-bone tracking-tight leading-none"
          style={{
            fontFamily: '"Crimson Text", "Instrument Serif", serif',
            fontWeight: 600,
            fontStyle: "italic",
            transform: `scale(${containerScale})`,
            transformOrigin: "center center",
          }}
        >
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
              <path
                d={oPath}
                fill={ringColor}
                fillRule="evenodd"
                fillOpacity={ringOpacity}
                style={{
                  filter:
                    baseGlow > 0.01 && zoom === 0
                      ? `drop-shadow(0 0 ${6 + baseGlow * 14}px rgba(200,255,0,${baseGlow * 0.75}))`
                      : "none",
                }}
              />

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
                      {depth > 0.55 && zoom === 0 && (
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

          <span
            style={{
              position: "absolute",
              top: "50%",
              right: "100%",
              opacity: introIn * (1 - textOutPhase),
              transform: `translate(${-textOutPhase * 90}px, calc(-50% + 0.06em))`,
              filter: `blur(${textOutPhase * 12}px)`,
              whiteSpace: "nowrap",
              willChange: "transform, opacity, filter",
            }}
          >
            Zer
          </span>

          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "100%",
              opacity: introIn * (1 - textOutPhase),
              transform: `translate(${textOutPhase * 90}px, calc(-50% + 0.06em))`,
              filter: `blur(${textOutPhase * 12}px)`,
              whiteSpace: "nowrap",
              willChange: "transform, opacity, filter",
            }}
          >
            Axiis
          </span>
        </div>

        {/* Progress bar — stacks below wordmark in the same flex column. */}
        <div
          className="w-[clamp(180px,22vw,300px)]"
          style={{ opacity: barOpacity }}
        >
        <div className="relative h-[2px] w-full bg-bone/10 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-accent"
            style={{
              width: `${progress * 100}%`,
              transition: "width 220ms cubic-bezier(0.22, 1, 0.36, 1)",
              boxShadow: "0 0 12px rgba(200,255,0,0.55)",
            }}
          />
        </div>
        <div
          className="mt-3 flex items-center justify-between font-mono uppercase"
          style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: "10px",
            letterSpacing: "0.28em",
            color: "rgba(245,241,232,0.5)",
          }}
        >
          <span>Loading</span>
          <span>{Math.round(progress * 100)}%</span>
        </div>
        </div>
      </div>
    </div>
  );
}
