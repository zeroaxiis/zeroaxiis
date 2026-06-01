import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
}

export function ContentSection({
  title,
  description,
  viewAllHref,
  viewAllLabel = "View All",
  children,
  className,
  headerClassName,
}: ContentSectionProps) {
  return (
    <section className={cn("py-12 md:py-16 lg:py-24 w-full", className)}>
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-16", headerClassName)}>
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-on-surface mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-on-surface-variant text-body-md text-balance">
                {description}
              </p>
            )}
          </div>

          {viewAllHref && (
            <Link 
              href={viewAllHref}
              className="group inline-flex items-center gap-2 text-on-surface hover:text-accent font-medium transition-colors duration-300 pb-1 border-b border-transparent hover:border-accent"
            >
              <span>{viewAllLabel}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {/* Content */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </section>
  );
}
