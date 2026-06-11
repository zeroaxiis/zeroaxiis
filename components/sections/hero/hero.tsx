import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section className={styles.section} id="hero">
      <HeroBackground />

      <HeroContent
        headlineLead="Engineering systems"
        headlineSlant="that scale beautifully."
        description="Software systems, infrastructure, and digital experiences engineered to endure."
        ctaLabel="Start a project"
        ctaHref="#workflow"
        secondaryLabel="See selected work"
        secondaryHref="/projects"
      />
    </section>
  );
}
