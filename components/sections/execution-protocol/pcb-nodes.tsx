import React from "react";
import styles from "./execution-protocol.module.css";
import { NodeKind } from "./types";

export function ViaNodes({ points }: { points: number[][] }) {
  return (
    <g>
      {points.map(([x, y], i) => (
        <g key={`via-${i}`} transform={`translate(${x}, ${y})`}>
          <circle r="3.5" fill="#0a0a0a" stroke="#d4af37" strokeWidth="1" opacity="0.75" />
          <circle r="1" fill="#d4af37" opacity="0.9" />
        </g>
      ))}
    </g>
  );
}

// Precomputed exact ENIG Gold Solder Pads matching 10px pitch
const PAD_POSITIONS = [-55, -45, -35, -25, -15, -5, 5, 15, 25, 35, 45, 55];

export function SocketFootprint({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Silkscreen component outline */}
      <rect x="-66" y="-30" width="132" height="60" fill="none" stroke="#ffffff" strokeWidth="1" rx="2" opacity="0.5" />
      <circle cx="-58" cy="-22" r="2" fill="#ffffff" opacity="0.5" />
      <path d="M -66 -10 L -58 0 L -66 10" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.5" /> {/* Notch indicator */}

      {/* Solder Pads */}
      {PAD_POSITIONS.map(px => (
        <React.Fragment key={`pad-${px}`}>
          <rect x={px - 2} y="-38" width="4" height="12" fill="#d4af37" rx="1" />
          <rect x={px - 2} y="26" width="4" height="12" fill="#d4af37" rx="1" />
        </React.Fragment>
      ))}
    </g>
  );
}

export function NodeMark({ kind }: { kind: NodeKind }) {
  if (kind === "client") {
    return (
      <svg
        viewBox="0 0 20 20"
        width="14"
        height="14"
        aria-hidden="true"
        className={styles.markIcon}
      >
        <circle cx="10" cy="6.5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M 3.5 17 C 3.5 13.4 6.4 11.5 10 11.5 C 13.6 11.5 16.5 13.4 16.5 17"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "brand") {
    return (
      <svg
        viewBox="0 0 20 20"
        width="14"
        height="14"
        aria-hidden="true"
        className={`${styles.markIcon} ${styles.markIconBrand}`}
      >
        <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <ellipse cx="10" cy="10" rx="7" ry="3" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.85" />
        <line x1="10" y1="3" x2="10" y2="17" stroke="currentColor" strokeWidth="1.1" opacity="0.85" />
      </svg>
    );
  }
  return null;
}
