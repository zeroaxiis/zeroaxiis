import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-surface-container text-on-surface-variant border border-transparent",
  outline:
    "border border-outline-variant text-on-surface-variant bg-transparent",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 font-label-mono text-[10px] uppercase tracking-wide",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
