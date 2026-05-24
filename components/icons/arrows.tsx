interface IconProps {
  width?: number;
  height?: number;
  className?: string;
  strokeWidth?: number;
}

export function ArrowLeftIcon({
  width = 20,
  height = 20,
  className = "",
  strokeWidth = 2,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M19 12H5M12 19l-7-7 7-7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon({
  width = 20,
  height = 20,
  className = "",
  strokeWidth = 2,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Small chevron back ("← Back to blog") */
export function ChevronLeftIcon({
  width = 12,
  height = 12,
  className = "",
  strokeWidth = 1.4,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8 6H2M5 3L2 6l3 3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Compact up-right diagonal arrow (used inside circular bubbles) */
export function ArrowUpRightSmallIcon({
  width = 12,
  height = 12,
  className = "",
  strokeWidth = 1.4,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.5 9.5l7-7M4 2.5h5.5V8"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Up-right arrow at 14px native (used by footer rows) */
export function ArrowUpRightIcon({
  width = 14,
  height = 14,
  className = "",
  strokeWidth = 1.5,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.5 11.5l9-9M4 2.5h7.5V10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Inline 12px right-arrow used in feature cards / secondary CTAs */
export function ArrowLongRightIcon({
  width = 12,
  height = 12,
  className = "",
  strokeWidth = 1.2,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 6h8M7 3l3 3-3 3"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 18px diagonal arrow used on feature cards */
export function ArrowDiagonalIcon({
  width = 18,
  height = 18,
  className = "",
  strokeWidth = 1.2,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3.5 14.5l11-11M5.5 3.5h9V12.5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 14px diagonal arrow used on project cards */
export function ArrowDiagonalSmallIcon({
  width = 14,
  height = 14,
  className = "",
  strokeWidth = 1.4,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 11l8-8M5 3h6V9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
