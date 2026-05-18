import { type ReactNode } from "react";
import styles from "./hero.module.css";

/* ─── Types ─────────────────────────────────────────────────── */

interface HeroContentProps {
  /** Badge label text */
  badge?: string;
  /** Badge link href */
  badgeHref?: string;
  /** Main headline — supports line breaks via \n */
  headline: string;
  /** Supporting description paragraph */
  description: string;
  /** CTA button label */
  ctaLabel?: string;
  /** CTA button href */
  ctaHref?: string;
  /** Optional children rendered below the content (e.g. ClientLogos) */
  children?: ReactNode;
}

/**
 * HeroContent — Server Component
 *
 * The split-column content area: badge + headline (left), description + CTA (right).
 * Fully configurable via props for reuse on different landing pages.
 */
export function HeroContent({
  badge = "Modern Identity Platform",
  badgeHref = "#platform",
  headline,
  description,
  ctaLabel = "Get Started For Free",
  ctaHref = "#get-started",
  children,
}: HeroContentProps) {
  // Split headline on \n to support line breaks
  const headlineParts = headline.split("\n");

  return (
    <div className={styles.content}>
      <div className={styles.contentInner}>
        {/* Left column */}
        <div className={styles.left}>
          <a href={badgeHref} className={styles.badge}>
            <span>{badge}</span>
            <span className={styles.badgeArrow}>→</span>
          </a>

          <h1 className={styles.headline}>
            {headlineParts.map((part, i) => (
              <span key={i}>
                {part}
                {i < headlineParts.length - 1 && (
                  <>
                    {" "}
                    <br className={styles.brDesktop} />
                  </>
                )}
              </span>
            ))}
          </h1>
        </div>

        {/* Right column */}
        <div className={styles.right}>
          <p className={styles.description}>{description}</p>
          <a href={ctaHref} className={styles.cta}>
            {ctaLabel}
          </a>
        </div>
      </div>

      {children}
    </div>
  );
}
