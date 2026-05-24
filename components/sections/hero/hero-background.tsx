"use client";

import dynamic from "next/dynamic";
import styles from "./hero.module.css";

const HeroScene = dynamic(
  () => import("./hero-scene").then((m) => m.HeroScene),
  { ssr: false },
);

export function HeroBackground() {
  return (
    <>
      {/* Subtle grid base */}
      <div className={styles.bgGrid} aria-hidden="true" />

      {/* 3D scene */}
      <div className={styles.bgScene} aria-hidden="true">
        <HeroScene />
      </div>

      {/* Ambient radial glow */}
      <div className={styles.bgGlow} aria-hidden="true" />

      {/* Bottom fade into page */}
      <div className={styles.bgGradient} aria-hidden="true" />

      {/* Edge vignette */}
      <div className={styles.bgVignette} aria-hidden="true" />
    </>
  );
}
