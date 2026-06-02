"use client";

import { useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { BONE, LIME } from "./constants";

interface InteractiveStarProps {
  position: [number, number, number];
  size: number;
}

/** Single twinkling star with hover halo + pulse ring */
export function InteractiveStar({ position, size }: InteractiveStarProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [drift] = useState(() => ({
    phase: Math.random() * Math.PI * 2,
    speed: 0.3 + Math.random() * 0.6,
  }));

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!meshRef.current) return;

    const twinkle =
      0.55 + Math.sin(t * drift.speed + drift.phase) * 0.35;
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
      position[0] + Math.sin(t * 0.16 + drift.phase) * 0.05;
    meshRef.current.position.y =
      position[1] + Math.cos(t * 0.13 + drift.phase) * 0.05;

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

interface InteractiveStarFieldProps {
  count?: number;
}

/** Scatters a cloud of InteractiveStar instances on a spherical shell. */
export function InteractiveStarField({
  count = 160,
}: InteractiveStarFieldProps) {
  const [stars] = useState(() => {
    const arr: { pos: [number, number, number]; size: number }[] = [];
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) - 1;
      arr.push({
        pos: [x, y, z],
        size: 0.014 + Math.random() * 0.03,
      });
    }
    return arr;
  });

  return (
    <group>
      {stars.map((s, i) => (
        <InteractiveStar key={i} position={s.pos} size={s.size} />
      ))}
    </group>
  );
}
