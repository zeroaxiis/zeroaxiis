interface TechTagProps {
  children: string;
  className?: string;
}

export function TechTag({ children, className = "" }: TechTagProps) {
  return (
    <span
      className={`tech-tag px-3 py-1 font-label-mono text-label-mono text-secondary ${className}`}
    >
      {children}
    </span>
  );
}
