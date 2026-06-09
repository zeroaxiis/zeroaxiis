import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

/**
 * Vertical rhythm wrapper. Uses fluid `clamp()` padding so spacing scales
 * smoothly across phone → desktop without breakpoint jumps.
 */
export function Section({ children, id, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        // Uniform vertical padding — 48px mobile → 64px desktop
        "py-12 md:py-16",
        className,
      )}
    >
      {children}
    </section>
  );
}
