import Image from "next/image";
import galaxyBg from "@/assets/glaxay-bg.png";
import globeImg from "@/assets/hero-bg.png";
import styles from "./hero.module.css";

/**
 * HeroBackground — Server Component
 *
 * Renders the composited background as two independent layers:
 *   1. Galaxy starfield (full-cover)
 *   2. Globe wireframe (centered, blend-mode: screen)
 *   3. Bottom gradient fade for text readability
 *
 * Both images are statically imported so Next.js can:
 *   - Generate blur placeholders at build time
 *   - Hash filenames for aggressive CDN caching
 *   - Tree-shake unused imports
 */
export function HeroBackground() {
  return (
    <>
      {/* Layer 1 — Galaxy: covers full viewport */}
      <div className={styles.bgGalaxy}>
        <Image
          src={galaxyBg}
          alt=""
          fill
          priority
          quality={80}
          placeholder="blur"
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center center" }}
        />
      </div>

      {/* Layer 2 — Globe: centered, independently sized */}
      <div className={styles.bgGlobe}>
        <Image
          src={globeImg}
          alt="Glowing wireframe sphere"
          priority
          quality={85}
          placeholder="blur"
          className={styles.globeImage}
        />
      </div>

      {/* Layer 3 — Bottom gradient fade */}
      <div className={styles.bgGradient} />
    </>
  );
}
