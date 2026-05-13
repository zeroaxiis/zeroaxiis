/**
 * Layout Constants
 * Centralized layout and spacing configuration
 */

export const CONTAINER_SIZES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
} as const;

export const SPACING = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
  "3xl": "gap-16",
} as const;

export const HERO_PADDING = {
  top: "pt-48",
  bottom: "pb-32",
} as const;

export const SECTION_PADDING = {
  top: "pt-16",
  bottom: "pb-16",
} as const;

export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;
