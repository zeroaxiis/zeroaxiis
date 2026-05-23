import { HeroBackground } from "./hero-background";
import { HeroNav } from "./hero-nav";
import { HeroContent } from "./hero-content";
import { ClientLogos } from "./client-logos";
import styles from "./hero.module.css";

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
