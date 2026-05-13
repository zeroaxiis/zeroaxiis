interface SectionHeaderProps {
  title: string;
  description?: string;
  label?: string;
  compact?: boolean;
}

export function SectionHeader({
  title,
  description,
  label,
  compact = false,
}: SectionHeaderProps) {
  return (
    <div className={compact ? "mb-8" : "mb-16"}>
      <div className="flex items-center justify-between">
        <div>
          <h2
            className={
              compact
                ? "font-headline-lg text-headline-lg text-primary"
                : "font-display text-display text-primary mb-4"
            }
          >
            {title}
          </h2>
        </div>
        {label && (
          <div className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-widest">
            {label}
          </div>
        )}
      </div>
      {description && (
        <p className="font-body-md text-body-md text-secondary max-w-2xl mt-4">
          {description}
        </p>
      )}
    </div>
  );
}
