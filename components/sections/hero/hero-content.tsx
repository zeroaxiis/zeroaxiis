"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import { TextReveal } from "@/components/ui";
import { ArrowLongRightIcon } from "@/components/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CtaButton, CtaButtonCluster } from "@/components/ui/cta-button";
import { SecondaryButton } from "@/components/ui/secondary-button";
import styles from "./hero.module.css";

interface HeroContentProps {
  eyebrow?: string;
  headlineLead: string;
  headlineSlant: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  children?: ReactNode;
}


const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroContent({
  eyebrow = "",
  headlineLead,
  headlineSlant,
  description,
  ctaLabel = "Start a project",
  ctaHref = "#workflow",
  secondaryLabel = "See selected work",
  secondaryHref = "/projects",
  children,
}: HeroContentProps) {
  return (
    <div className={styles.content}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: easeOut }}
        >
          <Eyebrow className={styles.eyebrowRow}>
            {eyebrow}
          </Eyebrow>
        </motion.div>
      )}

      <div className={styles.headlineWrap}>
        <h1 className={styles.headline}>
          <TextReveal
            text={headlineLead}
            as="span"
            splitBy="word"
            stagger={0.07}
            delay={0.35}
          />
          <br />
          <span className={styles.headlineSlant}>
            <TextReveal
              text={headlineSlant}
              as="span"
              splitBy="word"
              stagger={0.07}
              delay={0.6}
            />
          </span>
        </h1>

        <div className={styles.subRow}>
          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: easeOut }}
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.25, ease: easeOut }}
          >
            <CtaButtonCluster>
              <CtaButton href={ctaHref}>
                {ctaLabel}
              </CtaButton>

              <SecondaryButton href={secondaryHref}>
                {secondaryLabel}
                <ArrowLongRightIcon />
              </SecondaryButton>
            </CtaButtonCluster>
          </motion.div>
        </div>
      </div>

      {children}
    </div>
  );
}
