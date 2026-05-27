import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { LogoMarkIcon } from "@/components/icons";
import styles from "./top-bar.module.css";

export function TopBar() {
  return (
    <header className={styles.bar} aria-label="Primary">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={siteConfig.name}>
          <span className={styles.logoMark}>
            <LogoMarkIcon />
          </span>
          <span>{siteConfig.name.toLowerCase()}</span>
          <span className={styles.status}>
            <span className={styles.statusDot} />
            <span>Available · Q3</span>
          </span>
        </Link>

        <a href={`mailto:${siteConfig.email}`} className={styles.connect}>
          <span className={styles.connectDot} />
          Start a project
        </a>
      </div>
    </header>
  );
}
