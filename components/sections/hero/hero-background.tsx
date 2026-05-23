import Image from "next/image";
import galaxyBg from "@/assets/glaxay-bg.webp";
import globeImg from "@/assets/hero-bg.webp";
import styles from "./hero.module.css";

export function HeroBackground() {
  return (
    <>
      {}
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

      {}
      <div className={styles.bgGlobe}>
        <Image
          src={globeImg}
          alt="Glowing wireframe sphere"
          quality={85}
          placeholder="blur"
          sizes="(max-width: 768px) 90vw, 55vw"
          className={styles.globeImage}
        />
      </div>

      {}
      <div className={styles.bgGradient} />
    </>
  );
}
