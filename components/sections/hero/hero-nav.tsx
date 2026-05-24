import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { LogoMarkIcon } from "@/components/icons";
import styles from "./hero.module.css";

export function HeroNav() {
  return (
    <header className={styles.nav} aria-label="Primary">
      <div className={styles.navInner}>
        <Link href="/" className={styles.navLogo} aria-label={siteConfig.name}>
          <span className={styles.navLogoMark}>
            <LogoMarkIcon />
          </span>
          <span>{siteConfig.name.toLowerCase()}</span>
          <span className={styles.navStatus}>
            <span className={styles.navStatusDot} />
            <span>Available · Q3</span>
          </span>
        </Link>

        <a href={`mailto:${siteConfig.email}`} className={styles.navConnect}>
          <span className={styles.navConnectDot} />
          Start a project
        </a>
      </div>
    </header>
  );
}
