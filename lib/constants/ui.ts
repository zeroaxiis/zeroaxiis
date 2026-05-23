export const BUTTON_VARIANTS = {
  primary: "bg-primary text-on-primary hover:bg-surface-tint",
  secondary:
    "bg-surface-container text-on-surface hover:bg-surface-container-high",
  ghost: "text-on-surface hover:bg-surface-container",
  outline:
    "border border-outline-variant text-primary hover:border-primary hover:bg-surface-container-lowest",
} as const;

export const BUTTON_SIZES = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-8 py-4 text-sm",
} as const;

export const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50";

export const CARD_BASE =
  "group bg-surface-container border border-outline-variant/30 rounded-lg p-8 glow-top hover:bg-surface-layer-raised hover:border-outline-variant transition-all duration-300 flex flex-col h-full";

export const ICON_BASE =
  "w-12 h-12 rounded bg-surface border border-outline-variant/50 flex items-center justify-center mb-6 group-hover:border-primary/50 transition-colors";

export const SECTION_HEADER = {
  label:
    "font-label-mono text-label-mono text-secondary uppercase tracking-widest mb-4",
  title: "font-headline-lg text-headline-lg text-primary",
} as const;

export const GLASS_EFFECT = "glass-effect bg-surface-container-low/50";

export const GRID_VARIANTS = {
  cols1: "grid-cols-1",
  cols2md: "md:grid-cols-2",
  cols3lg: "lg:grid-cols-3",
  gap6: "gap-6",
} as const;
