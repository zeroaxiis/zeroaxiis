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

/** Yellow globe brand mark from user request */
export function GlobeLogoIcon({
  width = 28,
  height = 28,
  className = "",
  accentColor = "#FFCC00",
}: BrandIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="50" cy="50" r="46" fill={accentColor} stroke="#1A1C20" strokeWidth="6" />
      
      {/* Verticals */}
      <path d="M 50 4 L 50 96" fill="none" stroke="#1A1C20" strokeWidth="6" />
      <ellipse cx="50" cy="50" rx="22" ry="46" fill="none" stroke="#1A1C20" strokeWidth="6" />
      
      {/* Horizontals */}
      <path d="M 10 26 Q 50 10 90 26" fill="none" stroke="#1A1C20" strokeWidth="6" strokeLinecap="round" />
      <path d="M 4 50 Q 50 35 96 50" fill="none" stroke="#1A1C20" strokeWidth="6" strokeLinecap="round" />
      <path d="M 10 74 Q 50 60 90 74" fill="none" stroke="#1A1C20" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
