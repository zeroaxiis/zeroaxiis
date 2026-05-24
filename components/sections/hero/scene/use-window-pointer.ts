import { useEffect, useRef } from "react";

/** Singleton pointer state — one window listener feeds every consumer. */
const sharedPointer = { x: 0, y: 0 };
let attached = false;

function ensureAttached() {
  if (attached || typeof window === "undefined") return;
  attached = true;
  window.addEventListener(
    "pointermove",
    (e) => {
      sharedPointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      sharedPointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true },
  );
}

/**
 * Returns a mutable ref that always reflects the current normalized
 * window pointer (-1..1, y-up). Read inside useFrame for per-frame access.
 */
export function useWindowPointer() {
  const ref = useRef(sharedPointer);
  useEffect(() => {
    ensureAttached();
  }, []);
  return ref;
}
