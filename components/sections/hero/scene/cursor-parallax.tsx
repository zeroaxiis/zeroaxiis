"use client";

import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CursorParallaxProps {
  children: ReactNode;
  strengthX?: number;
  strengthY?: number;
  damping?: number;
}

/**
 * Wraps children in a group whose rotation lerps toward the canvas pointer,
 * giving everything inside a subtle parallax-with-cursor feel.
 */
export function CursorParallax({
  children,
  strengthX = 0.35,
  strengthY = 0.2,
  damping = 0.05,
}: CursorParallaxProps) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const { pointer } = state;
    target.current.x = THREE.MathUtils.lerp(
      target.current.x,
      pointer.x * strengthX,
      damping,
    );
    target.current.y = THREE.MathUtils.lerp(
      target.current.y,
      pointer.y * strengthY,
      damping,
    );
    if (group.current) {
      group.current.rotation.y = target.current.x;
      group.current.rotation.x = -target.current.y;
    }
  });

  return <group ref={group}>{children}</group>;
}
