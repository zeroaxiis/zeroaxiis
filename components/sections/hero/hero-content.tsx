import { type ReactNode } from "react";
import styles from "./hero.module.css";

interface HeroContentProps {
  badge?: string;

  badgeHref?: string;

  headline: string;

  description: string;

  ctaLabel?: string;

  ctaHref?: string;

  children?: ReactNode;
}

export function HeroContent({
  badge = "Modern Identity Platform",
  badgeHref = "#platform",
  headline,
  description,
  ctaLabel = "Get Started For Free",
  ctaHref = "#get-started",
  children,
}: HeroContentProps) {
  const headlineParts = headline.split("\n");

  return (
    <div className={styles.content}>
      <div className={styles.contentInner}>
        {}
        <div className={styles.left}>
          {badgeHref ? (
            <a href={badgeHref} className={styles.badge}>
              <span>{badge}</span>
              <span className={styles.badgeArrow}>→</span>
            </a>
          ) : (
            <span className={styles.badge}>
              <span>{badge}</span>
              <span className={styles.badgeArrow}>→</span>
            </span>
          )}

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

        {}
        <div className={styles.right}>
          <p className={styles.description}>{description}</p>
          {ctaHref ? (
            <a href={ctaHref} className={styles.cta}>
              {ctaLabel}
            </a>
          ) : (
            <button className={styles.cta}>{ctaLabel}</button>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}
