import * as THREE from "three";

export const BONE = new THREE.Color("#ffefc8");
export const LIME = new THREE.Color("#c8ff00");
export const DIM = new THREE.Color("#5a564d");

/** Earth-like axial tilt in radians */
export const AXIAL_TILT = (23.4 * Math.PI) / 180;

/** Visible globe sphere radius */
export const GLOBE_R = 1;

export const EASE_OUT_QUART = [0.16, 1, 0.3, 1] as const;
