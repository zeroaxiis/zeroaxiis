"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { useWindowPointer } from "./use-window-pointer";

/**
 * Background star field that reacts to cursor movement anywhere on the page.
 * Speed scales with pointer velocity + proximity to center.
 */
export function DriftingStars() {
  const ref = useRef<THREE.Group>(null);
  const pointer = useWindowPointer();
  const lastPointer = useRef({ x: 0, y: 0 });
  const speedBoost = useRef(0);
  const accumRotY = useRef(0);
  const accumRotX = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const px = pointer.current.x;
    const py = pointer.current.y;

    // Per-frame movement magnitude → velocity proxy
    const dx = px - lastPointer.current.x;
    const dy = py - lastPointer.current.y;
    const velocity = Math.min(Math.sqrt(dx * dx + dy * dy) * 60, 1.5);
    lastPointer.current.x = px;
    lastPointer.current.y = py;

    // Cursor near center → small baseline speed bump
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
