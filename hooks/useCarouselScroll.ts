/**
 * useCarouselScroll Hook
 * Handles smooth carousel scrolling functionality
 */

import { useRef, useCallback } from "react";

interface UseCarouselScrollOptions {
  cardWidth?: number;
  gap?: number;
}

export function useCarouselScroll(options: UseCarouselScrollOptions = {}) {
  const { cardWidth = 340, gap = 24 } = options;
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback(
    (direction: "prev" | "next") => {
      const el = carouselRef.current;
      if (!el) return;

      const card = el.querySelector<HTMLElement>("[data-card]");
      const scrollAmount = (card?.offsetWidth ?? cardWidth) + gap;

      el.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    },
    [cardWidth, gap],
  );

  return {
    carouselRef,
    scroll,
  };
}
