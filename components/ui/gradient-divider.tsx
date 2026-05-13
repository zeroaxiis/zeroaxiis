interface GradientDividerProps {
  className?: string;
}

export function GradientDivider({ className = "" }: GradientDividerProps) {
  return <div className={`gradient-divider ${className}`} />;
}
