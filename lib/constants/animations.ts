export const ANIMATION_SPEEDS = {
  slow: 3,
  normal: 2,
  fast: 1,
} as const;

export const SHINY_TEXT_CONFIG = {
  hero: {
    light: {
      color: "#2f3131",
      shineColor: "#666666",
      speed: 3,
      spread: 140,
    },
    dark: {
      color: "#c4c7c8",
      shineColor: "#ffffff",
      speed: 3,
      spread: 140,
    },
  },
} as const;

export const CAROUSEL_CONFIG = {
  itemsPerView: 1,
  gap: 16,
  autoPlay: false,
} as const;

export const TRANSITION_DURATION = {
  fast: "duration-300",
  normal: "duration-500",
  slow: "duration-1000",
} as const;
