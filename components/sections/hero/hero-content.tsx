"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import { Magnetic, TextReveal } from "@/components/ui";
import { ArrowUpRightSmallIcon, ArrowLongRightIcon } from "@/components/icons";
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
      <motion.div
        className={styles.eyebrowRow}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: easeOut }}
      >
        <span className={styles.eyebrow}>
          {eyebrow && <span className={styles.eyebrowAccent} />}
          {eyebrow}
        </span>
        <span className={styles.metaCluster}>
          <span className={styles.metaItem}>
            <strong>EST</strong>2024
          </span>
          <span className={styles.metaItem}>
            <strong>BASE</strong>Terra // Virtual Terra
          </span>
          <span className={styles.metaItem}>
            <strong>v</strong>1.0
          </span>
        </span>
      </motion.div>

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
            className={styles.ctaCluster}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.25, ease: easeOut }}
          >
            <Magnetic strength={0.35}>
              <a href={ctaHref} className={styles.cta}>
                <span>{ctaLabel}</span>
                <span className={styles.ctaArrow}>
                  <ArrowUpRightSmallIcon />
                </span>
              </a>
            </Magnetic>

            <a href={secondaryHref} className={styles.ctaSecondary}>
              {secondaryLabel}
              <ArrowLongRightIcon />
            </a>
          </motion.div>
        </div>
      </div>

      {children}
    </div>
  );
}
