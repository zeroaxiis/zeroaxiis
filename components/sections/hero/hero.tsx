import { HeroBackground } from "./hero-background";
import { HeroNav } from "./hero-nav";
import { HeroContent } from "./hero-content";
import { ClientLogos } from "./client-logos";
import styles from "./hero.module.css";

/**
 * Hero — Server Component (zero client JS)
 *
 * Composes the hero section from independent subcomponents:
 *   - HeroBackground: Galaxy + Globe layers (separate images, blended via CSS)
 *   - HeroNav: Navigation bar (driven by siteConfig)
 *   - HeroContent: Badge, headline, description, CTA (props-driven, reusable)
 *   - ClientLogos: Trust-signal logo strip (reusable anywhere)
 *
 * Architecture decisions:
 *   - No "use client" — entire hero is server-rendered HTML, zero JS shipped
 *   - CSS Modules — styles are scoped, tree-shaken, and don't pollute globals
 *   - Static image imports — Next.js generates blur placeholders at build time
 *   - Props-driven content — headline/CTA can be changed without touching layout
 */
export function Hero() {
  return (
    <section className={styles.section} id="hero">
      <HeroBackground />
      <HeroNav />

      <HeroContent
        badge="Modern Identity Platform"
        badgeHref="#services"
        headline={"Plan and navigate\nfrom idea to launch."}
        description="Create a clear roadmap and smoothly guide your project from idea to successful launch."
        ctaLabel="Get Started For Free"
        ctaHref="#workflow"
      >
        <ClientLogos />
      </HeroContent>
    </section>
  );
}
