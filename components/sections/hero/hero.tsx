import { HeroBackground } from "./hero-background";
import { HeroNav } from "./hero-nav";
import { HeroContent } from "./hero-content";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section className={styles.section} id="hero">
      <HeroBackground />
      <HeroNav />

      <HeroContent
        eyebrow="Zeroaxiis — Digital Atelier"
        headlineLead="Engineering systems"
        headlineSlant="that scale beautifully."
        description="A small collective shipping high-craft software, brand systems, and infrastructure for teams who care about how it feels — not just what it does."
        ctaLabel="Start a project"
        ctaHref="#workflow"
        secondaryLabel="See selected work"
        secondaryHref="/projects"
      />

      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <span className={styles.scrollHintLine} />
      </div>
    </section>
  );
}
