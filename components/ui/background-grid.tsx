import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundGridProps {
  maskImage?: string;
  opacity?: number;
  className?: string;
}

export function BackgroundGrid({
  maskImage = "linear-gradient(to bottom, transparent, black 15%, black 100%)",
  opacity = 50,
  className,
}: BackgroundGridProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 bg-grid-pattern-lg pointer-events-none",
        className
      )}
      style={{
        opacity: opacity / 100,
        WebkitMaskImage: maskImage,
        maskImage: maskImage,
      }}
    />
  );
}
