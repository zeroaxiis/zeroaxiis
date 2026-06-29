"use client";


import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { GlobeLogoIcon, ArrowUpRightIcon } from "@/components/icons";
import { Magnetic } from "@/components/ui/magnetic";
import { useCalModal } from "@/hooks";
import styles from "./top-bar.module.css";

export function TopBar() {
  const handleOpenModal = useCalModal();

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
            className={`${styles.connect} group`}
          >
            Hire us
            <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-ink text-bone transition-transform duration-300 group-hover:-rotate-45">
              <ArrowUpRightIcon width={12} height={12} strokeWidth={2} />
            </span>
          </button>
        </Magnetic>
      </div>
    </header>
  );
}
