"use client";

import { useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { GlobeLogoIcon, ArrowUpRightIcon } from "@/components/icons";
import { Magnetic } from "@/components/ui/magnetic";
import { getCalApi } from "@calcom/embed-react";
import styles from "./top-bar.module.css";

export function TopBar() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#c8ff00" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  const handleOpenModal = async () => {
    const cal = await getCalApi({ namespace: "30min" });
    const link = "zerozxiis/30min";
    cal("modal", {
      calLink: link,
      config: {
        layout: "month_view",
        theme: "dark",
        hideBranding: "true",
        useSlotsViewOnSmallScreen: "true"
      }
    });
  };

  return (
    <header className={styles.bar} aria-label="Primary">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label={siteConfig.name}>
          <span className={`${styles.logoMark} -rotate-12`}>
            <GlobeLogoIcon />
          </span>
          <span>{siteConfig.name}</span>
        </Link>

        <Magnetic strength={0.25}>
          <button 
            onClick={handleOpenModal} 
            className={`${styles.connect} group !gap-2 !pl-4 !pr-2`}
          >
            Hire us
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-ink text-bone transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRightIcon width={12} height={12} strokeWidth={2} />
            </span>
          </button>
        </Magnetic>
      </div>
    </header>
  );
}
