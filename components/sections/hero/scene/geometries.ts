import * as THREE from "three";

/** Latitude ring as line segments (XZ plane) — for use with <lineSegments> */
export function ringSegmentsGeometry(
  radius: number,
  segments = 128,
): THREE.BufferGeometry {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < segments; i++) {
    const a1 = (i / segments) * Math.PI * 2;
    const a2 = ((i + 1) / segments) * Math.PI * 2;
    pts.push(
      new THREE.Vector3(Math.cos(a1) * radius, 0, Math.sin(a1) * radius),
    );
    pts.push(
      new THREE.Vector3(Math.cos(a2) * radius, 0, Math.sin(a2) * radius),
    );
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

/** Full meridian circle as line segments (XY plane) */
export function meridianSegmentsGeometry(
  radius: number,
  segments = 128,
): THREE.BufferGeometry {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < segments; i++) {
    const a1 = (i / segments) * Math.PI * 2;
    const a2 = ((i + 1) / segments) * Math.PI * 2;
    pts.push(
      new THREE.Vector3(Math.sin(a1) * radius, Math.cos(a1) * radius, 0),
    );
    pts.push(
      new THREE.Vector3(Math.sin(a2) * radius, Math.cos(a2) * radius, 0),
    );
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}
