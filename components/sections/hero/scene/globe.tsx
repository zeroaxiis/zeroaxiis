"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { AXIAL_TILT, BONE, DIM, GLOBE_R, LIME } from "./constants";
import {
  meridianSegmentsGeometry,
  ringSegmentsGeometry,
} from "./geometries";
import { useWindowPointer } from "./use-window-pointer";

/**
 * Wireframe globe with:
 * - bone wireframe shell + lime lat/long grid (5 lats + 6 meridians)
 * - drag-to-rotate with inertia
 * - cursor-following tilt + velocity-driven spin boost
 * - hover halo + grid pulse
 */
export interface GlobeProps {
  tiltX?: number;
  tiltZ?: number;
  interactive?: boolean;
}

export function Globe({ tiltX = AXIAL_TILT, tiltZ = 0, interactive = true }: GlobeProps = {}) {
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
  const rotY = useRef(0);
  const rotX = useRef(0);
  const velY = useRef(0);
  const velX = useRef(0);

  // Window-level pointer tracking → cursor-follow tilt + velocity-driven energy
  const winPointer = useWindowPointer();
  const winPointerLast = useRef({ x: 0, y: 0 });
  const winVelocity = useRef(0);
  const spinBoost = useRef(0);
  const followX = useRef(0);
  const followY = useRef(0);

  // Drag handlers — attached at window level so dragging continues outside
  // the hit-sphere and outside the canvas bounds.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!interactive || !dragging.current) return;
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

  // Geometries — computed once, shared across all matching positions
  const sphereForWire = useMemo(
    () => new THREE.SphereGeometry(GLOBE_R, 36, 24),
    [],
  );

  const limeLatitudes = useMemo(() => {
    const steps = [-50, -25, 0, 25, 50];
    return steps.map((deg) => {
      const lat = (deg * Math.PI) / 180;
      const r = Math.cos(lat) * GLOBE_R;
      return {
        y: Math.sin(lat) * GLOBE_R,
        geom: ringSegmentsGeometry(r * 1.002),
        key: `lat-${deg}`,
      };
    });
  }, []);

  const limeMeridians = useMemo(() => {
    const geom = meridianSegmentsGeometry(GLOBE_R * 1.002);
    return Array.from({ length: 6 }, (_, i) => ({
      rot: (i * Math.PI) / 6,
      geom,
      key: `mer-${i}`,
    }));
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Pointer velocity → drives spin boost + halo intensity
    const px = interactive ? winPointer.current.x : 0;
    const py = interactive ? winPointer.current.y : 0;
    const dpx = px - winPointerLast.current.x;
    const dpy = py - winPointerLast.current.y;
    const v = Math.min(Math.sqrt(dpx * dpx + dpy * dpy) * 60, 1.5);
    winPointerLast.current.x = px;
    winPointerLast.current.y = py;
    winVelocity.current = THREE.MathUtils.lerp(winVelocity.current, v, 0.18);
    spinBoost.current = THREE.MathUtils.lerp(
      spinBoost.current,
      winVelocity.current * 1.6,
      0.12,
    );

    // Cursor-following tilt (ambient lean)
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

      const spinRate = (hovered ? 0.08 : 0.22) + spinBoost.current;
      rotY.current += spinRate * delta;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = rotY.current + followY.current * 0.6;
    }
    if (groupRef.current) {
      groupRef.current.rotation.x =
        tiltX +
        rotX.current +
        followX.current +
        Math.sin(t * 0.15) * 0.02;
      groupRef.current.rotation.z = tiltZ;
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
      // Pulse lime grid — base sine + hover boost + velocity boost
      let i = 0;
      const velBoost = winVelocity.current * 0.3;
      limeLinesRef.current.traverse((obj) => {
        const mat = (obj as unknown as { material?: THREE.LineBasicMaterial })
          .material;
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

  const onOver = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    setHovered(true);
    if (!dragging.current) document.body.style.cursor = "grab";
  };
  const onOut = () => {
    if (!interactive) return;
    setHovered(false);
    if (!dragging.current) document.body.style.cursor = "";
  };
  const onDown = (e: ThreeEvent<PointerEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    dragging.current = true;
    dragLast.current.x = e.clientX;
    dragLast.current.y = e.clientY;
    velY.current = 0;
    velX.current = 0;
    document.body.style.cursor = "grabbing";
  };

  return (
    <group ref={groupRef} rotation={[tiltX, 0, tiltZ]}>
      {/* Invisible hit-sphere — captures pointer events for the whole globe */}
      <mesh onPointerOver={onOver} onPointerOut={onOut} onPointerDown={onDown}>
        <sphereGeometry args={[GLOBE_R + 0.15, 24, 24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Lime halo bloom — fades in with hover + velocity */}
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

        {/* Dark inner shell — gives the globe weight */}
        <mesh ref={innerRef}>
          <sphereGeometry args={[GLOBE_R - 0.015, 64, 64]} />
          <meshBasicMaterial
            color={"#0a0a0a"}
            transparent
            opacity={0.85}
            depthWrite={false}
          />
        </mesh>

        {/* Lime lat/long overlay — the prominent grid */}
        <group ref={limeLinesRef}>
          {limeLatitudes.map((lat) => (
            <group key={lat.key} position={[0, lat.y, 0]}>
              <lineSegments>
                <primitive object={lat.geom} attach="geometry" />
                <lineBasicMaterial
                  color={LIME}
                  transparent
                  opacity={0.75}
                  depthWrite={false}
                />
              </lineSegments>
            </group>
          ))}
          {limeMeridians.map((m) => (
            <group key={m.key} rotation={[0, m.rot, 0]}>
              <lineSegments>
                <primitive object={m.geom} attach="geometry" />
                <lineBasicMaterial
                  color={LIME}
                  transparent
                  opacity={0.65}
                  depthWrite={false}
                />
              </lineSegments>
            </group>
          ))}
        </group>

        {/* Lime polar axis rod — through both poles, doesn't spin with the globe */}
        <mesh>
          <cylinderGeometry args={[0.006, 0.006, GLOBE_R * 2 + 0.5, 12]} />
          <meshBasicMaterial color={LIME} transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Faint outer reference orbit ring */}
      <mesh ref={orbitRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[GLOBE_R + 0.45, 0.001, 6, 200]} />
        <meshBasicMaterial color={DIM} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}
