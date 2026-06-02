import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "main" | "section" | "article";
}

/**
 * Shared layout wrapper. Centralizes width + horizontal padding for every
 * page and major section. Override via `className` for page-specific spacing.
 *
 * Base: `mx-auto max-w-footer-max px-[clamp(1rem,6vw,7rem)]`
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        // Fluid horizontal padding via clamp — scales 16px → 112px across
        // viewports. Larger right gutter keeps content clear of the radial-nav
        // hover hitbox (~120px) on the right edge.
        "mx-auto max-w-footer-max px-[clamp(1rem,6vw,7rem)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
