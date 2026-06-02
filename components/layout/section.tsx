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
        // Fluid vertical padding — 56px mobile → 128px desktop
        "py-[clamp(3.5rem,8vw,8rem)]",
        className,
      )}
    >
      {children}
    </section>
  );
}
