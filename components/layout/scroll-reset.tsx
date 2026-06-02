"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Resets scroll to top on every client-side route change.
 * Mount once in the root layout.
 */
export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // `instant` skips the smooth-scroll animation so the new page never
    // flashes mid-scroll.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [pathname]);

  return null;
}
