import { type ReactNode } from "react";
import styles from "./hero.module.css";

/* ─── Types ─────────────────────────────────────────────────── */

interface ClientLogo {
  /** Display name */
  name: string;
  /** Optional SVG icon rendered before the name */
  icon?: ReactNode;
  /** CSS module class for brand-specific typography */
  className?: string;
}

interface ClientLogosProps {
  /** Array of client logos to display */
  logos?: ClientLogo[];
}

/* ─── Default logos ─────────────────────────────────────────── */

const DEFAULT_LOGOS: ClientLogo[] = [
  // Placeholder: Add your brand logos here later
];

/**
 * ClientLogos — Server Component
 *
 * A reusable trust-signal logo strip. Pass custom logos or use the defaults.
 * Can be dropped into any section (hero, footer, pricing, etc.)
 */
export function ClientLogos({ logos = DEFAULT_LOGOS }: ClientLogosProps) {
  return (
    <div className={styles.clients}>
      <div className={styles.clientsInner}>
        {logos.map((logo, i) => (
          <div key={`${logo.name}-${i}`} className={logo.className || styles.clientLogo}>
            {logo.icon}
            {logo.name}
          </div>
        ))}
      </div>
    </div>
  );
}
