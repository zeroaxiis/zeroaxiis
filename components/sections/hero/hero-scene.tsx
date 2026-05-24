"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

const BONE = new THREE.Color("#ffefc8");
const LIME = new THREE.Color("#c8ff00");
const DIM = new THREE.Color("#5a564d");

const AXIAL_TILT = (23.4 * Math.PI) / 180;
const GLOBE_R = 1.15; // smaller than before

/** Latitude ring around y-axis at given y/radius */
function ringGeometry(radius: number, segments = 128): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius),
    );
  }
  return new THREE.BufferGeometry().setFromPoints(points);
}

/** Full circle through poles for a meridian */
function fullMeridianGeometry(
  radius: number,
  segments = 128,
): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(Math.sin(a) * radius, Math.cos(a) * radius, 0),
    );
  }
  return new THREE.BufferGeometry().setFromPoints(points);
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const orbitRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const limeLinesRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Drag-to-rotate state
  const dragging = useRef(false);
  const dragLast = useRef({ x: 0, y: 0 });
  const rotY = useRef(0); // accumulated yaw
  const rotX = useRef(0); // additional pitch from drag (added to AXIAL_TILT)
  // Inertia
  const velY = useRef(0);
  const velX = useRef(0);

  // Window-level pointer tracking → cursor-following tilt + velocity boost
  const winPointer = useRef({ x: 0, y: 0 });
  const winPointerLast = useRef({ x: 0, y: 0 });
  const winVelocity = useRef(0);
  const spinBoost = useRef(0);
  const followX = useRef(0);
  const followY = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (dragging.current) {
        const dx = e.clientX - dragLast.current.x;
        const dy = e.clientY - dragLast.current.y;
        dragLast.current.x = e.clientX;
        dragLast.current.y = e.clientY;
        const sx = 0.006;
        const sy = 0.005;

        rotY.current += dx * sx;
        rotX.current = THREE.MathUtils.clamp(rotX.current + dy * sy, -1.2, 1.2);
        velY.current = dx * sx;
        velX.current = dy * sy;
      }
      // Always update window pointer for ambient effects
      winPointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      winPointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = "";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Compute window pointer velocity for spin boost
    const px = winPointer.current.x;
    const py = winPointer.current.y;
    const dpx = px - winPointerLast.current.x;
    const dpy = py - winPointerLast.current.y;
    const v = Math.min(Math.sqrt(dpx * dpx + dpy * dpy) * 60, 1.5);
    winPointerLast.current.x = px;
    winPointerLast.current.y = py;
    winVelocity.current = THREE.MathUtils.lerp(winVelocity.current, v, 0.18);
    // Spin boost from velocity decays smoothly
    spinBoost.current = THREE.MathUtils.lerp(
      spinBoost.current,
      winVelocity.current * 1.6,
      0.12,
    );

    // Smooth cursor-following tilt (subtle, ambient)
    followX.current = THREE.MathUtils.lerp(followX.current, py * 0.18, 0.06);
    followY.current = THREE.MathUtils.lerp(followY.current, px * 0.28, 0.06);

    if (!dragging.current) {
      // Inertia decay after release
      rotY.current += velY.current;
      rotX.current = THREE.MathUtils.clamp(
        rotX.current + velX.current,
        -1.2,
        1.2,
      );
      velY.current *= 0.93;
      velX.current *= 0.93;

      // Idle spin + velocity boost from cursor movement
      const spinRate = (hovered ? 0.08 : 0.22) + spinBoost.current;
      rotY.current += spinRate * delta;
    }

    if (meshRef.current) {
      // Base spin + ambient cursor-follow yaw
      meshRef.current.rotation.y = rotY.current + followY.current * 0.6;
    }
    if (groupRef.current) {
      // Tilt = axial + drag-pitch + ambient pointer lean + slow bob
      groupRef.current.rotation.x =
        AXIAL_TILT + rotX.current + followX.current + Math.sin(t * 0.15) * 0.02;
      // Scale also breathes with velocity → globe "feels" the cursor energy
      const breath = 1 + winVelocity.current * 0.04;
      const s = (hovered ? 1.06 : 1) * breath;
      groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.18);
    }
    if (wireRef.current) {
      const m = wireRef.current.material as THREE.LineBasicMaterial;
      m.opacity = THREE.MathUtils.lerp(m.opacity, hovered ? 0.75 : 0.42, 0.12);
    }
    if (innerRef.current) {
      const m = innerRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = THREE.MathUtils.lerp(m.opacity, hovered ? 0.7 : 0.85, 0.12);
    }
    if (limeLinesRef.current) {
      // Pulse lime grid — base sine pulse, brighter on hover + with cursor velocity
      let i = 0;
      const velBoost = winVelocity.current * 0.3;
      limeLinesRef.current.traverse((obj) => {
        const line = obj as THREE.Line;
        const mat = (line as { material?: THREE.LineBasicMaterial }).material;
        if (!mat || !("opacity" in mat)) return;
        const base = 0.7;
        const target = hovered
          ? Math.min(1, 0.85 + velBoost)
          : base + Math.sin(t * 1.3 + i * 0.4) * 0.12 + velBoost;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, target, 0.14);
        i++;
      });
    }
    if (orbitRef.current) {
      const m = orbitRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = THREE.MathUtils.lerp(m.opacity, hovered ? 1 : 0.55, 0.12);
      const s = hovered ? 1.05 : 1;
      orbitRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
    }
    if (haloRef.current) {
      const m = haloRef.current.material as THREE.MeshBasicMaterial;
      const haloTarget = hovered
        ? 0.22 + winVelocity.current * 0.1
        : winVelocity.current * 0.08;
      m.opacity = THREE.MathUtils.lerp(m.opacity, haloTarget, 0.14);
      const s = hovered ? 1 : 0.6 + winVelocity.current * 0.2;
      haloRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.14);
    }
  });

  const sphereForWire = useMemo(
    () => new THREE.SphereGeometry(GLOBE_R, 36, 24),
    [],
  );

  // 5 lime latitudes (equator + 2 above + 2 below)
  const limeLatitudes = useMemo(() => {
    const arr: { y: number; geom: THREE.BufferGeometry; key: string }[] = [];
    const steps = [-50, -25, 0, 25, 50];
    for (const deg of steps) {
      const lat = (deg * Math.PI) / 180;
      const r = Math.cos(lat) * GLOBE_R;
      arr.push({
        y: Math.sin(lat) * GLOBE_R,
        geom: ringGeometry(r * 1.002),
        key: `lat-${deg}`,
      });
    }
    return arr;
  }, []);

  // 6 lime meridians evenly distributed (every 30°)
  const limeMeridians = useMemo(() => {
    const arr: { rot: number; key: string }[] = [];
    for (let i = 0; i < 6; i++) {
      arr.push({ rot: (i * Math.PI) / 6, key: `mer-${i}` });
    }
    return arr;
  }, []);

  const meridianGeom = useMemo(() => fullMeridianGeometry(GLOBE_R * 1.002), []);

  const onOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    if (!dragging.current) document.body.style.cursor = "grab";
  };
  const onOut = () => {
    setHovered(false);
    if (!dragging.current) document.body.style.cursor = "";
  };
  const onDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    dragging.current = true;
    dragLast.current.x = e.clientX;
    dragLast.current.y = e.clientY;
    velY.current = 0;
    velX.current = 0;
    document.body.style.cursor = "grabbing";
  };

  return (
    <group ref={groupRef} rotation={[AXIAL_TILT, 0, 0]}>
      {/* Invisible hit-sphere — captures pointer events for the whole globe */}
      <mesh onPointerOver={onOver} onPointerOut={onOut} onPointerDown={onDown}>
        <sphereGeometry args={[GLOBE_R + 0.15, 24, 24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Lime halo bloom on hover */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[GLOBE_R + 0.28, 32, 32]} />
        <meshBasicMaterial
          color={LIME}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>

      <group ref={meshRef}>
        {/* Bone wireframe — underlying structure */}
        <lineSegments ref={wireRef}>
          <wireframeGeometry args={[sphereForWire]} />
          <lineBasicMaterial
            color={BONE}
            transparent
            opacity={0.42}
            depthWrite={false}
          />
        </lineSegments>

        {/* Dark inner shell */}
        <mesh ref={innerRef}>
          <sphereGeometry args={[GLOBE_R - 0.015, 64, 64]} />
          <meshBasicMaterial
            color={"#0a0a0a"}
            transparent
            opacity={0.85}
            depthWrite={false}
          />
        </mesh>

        {/* Lime lat/long grid — the prominent overlay */}
        <group ref={limeLinesRef}>
          {limeLatitudes.map((lat) => (
            <line key={lat.key} position={[0, lat.y, 0]}>
              <primitive object={lat.geom} attach="geometry" />
              <lineBasicMaterial
                color={LIME}
                transparent
                opacity={0.7}
                depthWrite={false}
              />
            </line>
          ))}
          {limeMeridians.map((m) => (
            <group key={m.key} rotation={[0, m.rot, 0]}>
              <line>
                <primitive object={meridianGeom} attach="geometry" />
                <lineBasicMaterial
                  color={LIME}
                  transparent
                  opacity={0.6}
                  depthWrite={false}
                />
              </line>
            </group>
          ))}
        </group>
      </group>

      {/* Faint outer orbit ring */}
      <mesh ref={orbitRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[GLOBE_R + 0.45, 0.001, 6, 200]} />
        <meshBasicMaterial color={DIM} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

/** Interactive star — twinkles, drifts, glows + halo on hover */
function InteractiveStar({
  position,
  size,
}: {
  position: [number, number, number];
  size: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const drift = useRef({
    phase: Math.random() * Math.PI * 2,
    speed: 0.3 + Math.random() * 0.6,
  });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!meshRef.current) return;

    const twinkle =
      0.55 + Math.sin(t * drift.current.speed + drift.current.phase) * 0.35;
    const coreMat = meshRef.current.material as THREE.MeshBasicMaterial;
    coreMat.opacity = THREE.MathUtils.lerp(
      coreMat.opacity,
      hovered ? 1 : twinkle,
      0.18,
    );
    const targetScale = hovered ? 4 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.2,
    );

    meshRef.current.position.x =
      position[0] + Math.sin(t * 0.16 + drift.current.phase) * 0.05;
    meshRef.current.position.y =
      position[1] + Math.cos(t * 0.13 + drift.current.phase) * 0.05;

    if (ringRef.current) {
      const ringMat = ringRef.current.material as THREE.MeshBasicMaterial;
      const ringScale = hovered ? 1.2 + Math.sin(t * 4) * 0.2 : 0.2;
      ringRef.current.scale.lerp(
        new THREE.Vector3(ringScale, ringScale, ringScale),
        0.18,
      );
      ringMat.opacity = THREE.MathUtils.lerp(
        ringMat.opacity,
        hovered ? 0.9 : 0,
        0.18,
      );
      ringRef.current.position.copy(meshRef.current.position);
    }

    if (haloRef.current) {
      const haloMat = haloRef.current.material as THREE.MeshBasicMaterial;
      const haloScale = hovered ? 1 : 0.001;
      haloRef.current.scale.lerp(
        new THREE.Vector3(haloScale, haloScale, haloScale),
        0.18,
      );
      haloMat.opacity = THREE.MathUtils.lerp(
        haloMat.opacity,
        hovered ? 0.4 : 0,
        0.18,
      );
      haloRef.current.position.copy(meshRef.current.position);
    }
  });

  const onOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "crosshair";
  };
  const onOut = () => {
    setHovered(false);
    document.body.style.cursor = "";
  };

  return (
    <group>
      <mesh ref={haloRef} position={position}>
        <sphereGeometry args={[size * 7, 16, 16]} />
        <meshBasicMaterial
          color={LIME}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringRef} position={position}>
        <ringGeometry args={[size * 3.5, size * 4.2, 32]} />
        <meshBasicMaterial
          color={LIME}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={onOver}
        onPointerOut={onOut}
      >
        <sphereGeometry args={[size, 10, 10]} />
        <meshBasicMaterial
          color={hovered ? LIME : BONE}
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function DriftingStars() {
  const ref = useRef<THREE.Group>(null);
  // Window-level pointer tracking so movement ANYWHERE on the page drives speed,
  // not just where the canvas happens to be the topmost element.
  const pointer = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0 });
  const speedBoost = useRef(0);
  const accumRotY = useRef(0);
  const accumRotX = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const px = pointer.current.x;
    const py = pointer.current.y;

    const dx = px - lastPointer.current.x;
    const dy = py - lastPointer.current.y;
    const velocity = Math.min(Math.sqrt(dx * dx + dy * dy) * 60, 1.5);
    lastPointer.current.x = px;
    lastPointer.current.y = py;

    const proximity = 1 - Math.min(Math.sqrt(px * px + py * py), 1);

    const target = 0.015 + velocity * 0.18 + proximity * 0.04;
    speedBoost.current = THREE.MathUtils.lerp(speedBoost.current, target, 0.08);

    accumRotY.current += speedBoost.current * delta * 60;
    accumRotX.current = Math.sin(t * 0.03) * 0.05 + px * 0.08;

    if (ref.current) {
      ref.current.rotation.y = accumRotY.current * 0.018;
      ref.current.rotation.x = accumRotX.current;
    }
  });
  return (
    <group ref={ref}>
      <Stars
        radius={90}
        depth={60}
        count={4500}
        factor={3.4}
        saturation={0}
        fade
        speed={1.4}
      />
      <Stars
        radius={28}
        depth={14}
        count={900}
        factor={1.3}
        saturation={0}
        fade
        speed={2.2}
      />
    </group>
  );
}

function CursorParallax({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const { pointer } = state;
    target.current.x = THREE.MathUtils.lerp(
      target.current.x,
      pointer.x * 0.35,
      0.05,
    );
    target.current.y = THREE.MathUtils.lerp(
      target.current.y,
      pointer.y * 0.2,
      0.05,
    );
    if (group.current) {
      group.current.rotation.y = target.current.x;
      group.current.rotation.x = -target.current.y;
    }
  });

  return <group ref={group}>{children}</group>;
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />

        <DriftingStars />
        <CursorParallax>
          <group position={[0, 0.5, 0]}>
            <Float
              speed={0.5}
              rotationIntensity={0.15}
              floatIntensity={0.25}
              floatingRange={[-0.06, 0.06]}
            >
              <Globe />
            </Float>
          </group>
        </CursorParallax>
      </Suspense>
    </Canvas>
  );
}
