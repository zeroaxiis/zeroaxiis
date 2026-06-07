import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { GlobeLogoIcon } from "@/components/icons";
import styles from "./top-bar.module.css";

export function TopBar() {
  return (
    <header className={styles.bar} aria-label="Primary">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={siteConfig.name}>
          <span className={`${styles.logoMark} -rotate-12`}>
            <GlobeLogoIcon />
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <a href={`mailto:${siteConfig.email}`} className={styles.connect}>
          <span className={styles.connectDot} />
          Start a project
        </a>
      </div>
    </header>
  );
}
