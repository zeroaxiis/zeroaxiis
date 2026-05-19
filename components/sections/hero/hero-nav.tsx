import Link from "next/link";
import { siteConfig } from "@/lib/site";
import styles from "./hero.module.css";

export function HeroNav() {
  const navItems = siteConfig.nav;

  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      <div className={styles.navInner}>
        {}
        <Link href="/" className={styles.navLogo} aria-label={siteConfig.name}>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="18"
              cy="18"
              r="17"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
            <circle cx="12" cy="18" r="2.5" fill="white" />
            <circle cx="18" cy="18" r="2.5" fill="white" />
            <circle cx="24" cy="18" r="2.5" fill="white" />
          </svg>
        </Link>

        {}
        <div className={styles.navLinks}>
          {navItems.slice(1).map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </div>

        {}
        <a href={`mailto:${siteConfig.email}`} className={styles.navConnect}>
          Connect
        </a>
      </div>
    </nav>
  );
}
