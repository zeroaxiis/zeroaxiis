interface BrandIconProps {
  width?: number;
  height?: number;
  className?: string;
  accentColor?: string;
}

/** Orbit-dot brand mark used in the hero header */
export function LogoMarkIcon({
  width = 28,
  height = 28,
  className = "",
  accentColor = "#c8ff00",
}: BrandIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="14"
        cy="14"
        r="13"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.35"
      />
      <circle cx="14" cy="14" r="2.4" fill={accentColor} />
      <circle
        cx="14"
        cy="14"
        r="8"
        stroke="currentColor"
        strokeWidth="0.6"
        strokeDasharray="2 3"
        opacity="0.5"
      />
    </svg>
  );
}
