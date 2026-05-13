import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export function Section({ children, id, className }: SectionProps) {
  return (
    <section id={id} className={cn("py-32", className)}>
      {children}
    </section>
  );
}
