import { Marquee } from "@/components/ui/marquee";
import { GlobeLogoIcon } from "@/components/icons";
import styles from "./hero.module.css";

const DEFAULT_LOGOS = [
  "Stripe",
  "Linear",
  "ZeroAxiis",
  "Framer",
  "Arc",
  "Raycast",
  "Supabase",
  "Notion",
  "Plaid",
  "Pitch",
];

interface ClientLogosProps {
  logos?: string[];
}

export function ClientLogos({ logos = DEFAULT_LOGOS }: ClientLogosProps) {
  return (
    <div className={styles.clients}>
      <div className={styles.clientsHeader}>
        <span>Trusted by teams shipping at scale</span>
        <span>{logos.length}+ Engagements · 2024–26</span>
      </div>
      <Marquee gap="4.5rem" pauseOnHover>
        {logos.map((logo) => (
          <span key={logo} className={styles.clientLogo}>
            {logo === "ZeroAxiis" ? (
              <span className="flex items-center gap-2">
                <GlobeLogoIcon width={24} height={24} className="opacity-80 -rotate-12" />
                {logo}
              </span>
            ) : (
              logo
            )}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
