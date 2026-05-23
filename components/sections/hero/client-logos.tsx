import { type ReactNode } from "react";
import styles from "./hero.module.css";

interface ClientLogo {
  name: string;

  icon?: ReactNode;

  className?: string;
}

interface ClientLogosProps {
  logos?: ClientLogo[];
}

const DEFAULT_LOGOS: ClientLogo[] = [];

export function ClientLogos({ logos = DEFAULT_LOGOS }: ClientLogosProps) {
  return (
    <div className={styles.clients}>
      <div className={styles.clientsInner}>
        {logos.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className={logo.className || styles.clientLogo}
          >
            {logo.icon}
            {logo.name}
          </div>
        ))}
      </div>
    </div>
  );
}
