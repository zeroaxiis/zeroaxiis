"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/lib/site";
import styles from "./radial-nav.module.css";

export function RadialNav() {
  const items = siteConfig.nav;
  const pathname = usePathname();
  const router = useRouter();

  const pathnameIndex = useMemo(() => {
    let index = items.findIndex((item) => item.href === pathname);
    if (index === -1) {
      index = items.findIndex(
        (item) =>
          pathname.startsWith(item.href) &&
          item.href !== "/" &&
          !item.href.startsWith("#"),
      );
    }
    return index !== -1 ? index : 0;
  }, [pathname, items]);

  const [activeIndex, setActiveIndex] = useState(pathnameIndex);
  const [currentIndex, setCurrentIndex] = useState(pathnameIndex);
  const [isOpen, setIsOpen] = useState(false);
  const isScrollingRef = useRef(false);
  const lastWheelAt = useRef(0);
  const radius = 260;
  const angleSpacing = 0.34;

  useEffect(() => {
    setActiveIndex(pathnameIndex);
    setCurrentIndex(pathnameIndex);
  }, [pathnameIndex]);

  // Prefetch all real routes for snappy transitions.
  useEffect(() => {
    items.forEach((item) => {
      if (!item.href.startsWith("#")) router.prefetch(item.href);
    });
  }, [items, router]);

  useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      main.style.transition = "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
      main.style.opacity = "1";
    }
  }, [pathname]);

  // Lock page scroll while the dial is open so wheel events only move the dial.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Soft debounce: ignore rapid micro-deltas, then commit one step.
      const now = performance.now();
      if (isScrollingRef.current) return;
      if (now - lastWheelAt.current < 80) return;
      lastWheelAt.current = now;

      const delta = e.deltaY;
      // Natural mapping: scroll down → advance to next (Team direction).
      if (delta > 0 && currentIndex < items.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        triggerScrollLock();
      } else if (delta < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        triggerScrollLock();
      }
    };

    const triggerScrollLock = () => {
      isScrollingRef.current = true;
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 420);
    };

    const container = document.getElementById("nav-container");
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [currentIndex, items.length]);

  const navigateWithFade = (href: string, newIndex: number) => {
    setActiveIndex(newIndex);
    setIsOpen(false);

    const isHash = href.startsWith("#");

    if (isHash) {
      const id = href.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(href);
      }
      return;
    }

    const main = document.querySelector("main");
    if (main) {
      main.style.transition = "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
      main.style.opacity = "0";

      setTimeout(() => {
        router.push(href);
      }, 320);
    } else {
      router.push(href);
    }
  };

  const handleMouseEnter = () => setIsOpen(true);

  const handleMouseLeave = () => {
    setIsOpen(false);
    if (currentIndex !== activeIndex) {
      const targetHref = items[currentIndex].href;
      navigateWithFade(targetHref, currentIndex);
    } else {
      setCurrentIndex(activeIndex);
    }
  };

  const handleClick = (e: React.MouseEvent, index: number, href: string) => {
    e.preventDefault();
    if (index !== activeIndex) {
      navigateWithFade(href, index);
    } else {
      setIsOpen(false);
    }
  };

  // Swallow stray clicks inside the hover zone so page content never wins.
  const handleZoneClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const formatCalcValue = (value: number) => {
    const formatted = Math.abs(value).toFixed(3);
    return value < 0
      ? `calc(-50% - ${formatted}px)`
      : `calc(-50% + ${formatted}px)`;
  };

  const activeLabel = items[activeIndex]?.label || "Menu";

  return (
    <>
      {/* Full-screen click shield while the dial is open. Sits below the dial,
          above page content — guarantees nothing else captures pointer events
          while the user is navigating. */}
      <div
        className={`${styles.shield} ${isOpen ? styles.shieldOpen : ""}`}
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`${styles.navHitbox} ${isOpen ? styles.navHitboxOpen : ""}`}
        id="nav-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleZoneClick}
      >
        {/* Persistent edge rail — always-visible affordance */}
        <div className={styles.edgeRail} aria-hidden="true">
          <span className={styles.edgeLabel}>{activeLabel}</span>
          <div className={styles.edgeCurrent}>
            <div className={styles.edgeDots}>
              {items.map((_, i) => (
                <span
                  key={i}
                  className={`${styles.edgeDot} ${
                    i === activeIndex ? styles.edgeDotActive : ""
                  }`}
                />
              ))}
            </div>
          </div>
          <span className={styles.edgeBrand}>Menu · Scroll</span>
        </div>

        <div className={styles.navTriggerText} id="trigger-text">
          {items[currentIndex]?.label || activeLabel}
        </div>

        <div className={styles.navDial} id="dial">
          {items.map((item, index) => {
            const offset = index - currentIndex;
            const angle = Math.PI + offset * angleSpacing;
            const x = Math.cos(angle) * radius;
            // Negate so lower indices (Home) land at top, higher (Team) at bottom.
            const y = -Math.sin(angle) * radius;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 1;

            const scale = isCenter ? 1.12 : 0.88;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${
                  isCenter ? styles.activeStyle : ""
                }`}
                onClick={(e) => handleClick(e, index, item.href)}
                style={{
                  transform: `translate(${formatCalcValue(x)}, ${formatCalcValue(y)}) scale(${scale})`,
                  opacity: isVisible ? (isCenter ? 1 : 0.45) : 0,
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
