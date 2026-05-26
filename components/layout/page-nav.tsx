"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { PageEntry } from "@/lib/pages";
import styles from "./page-nav.module.css";

interface PageNavProps {
  pages: PageEntry[];
}

const RADIUS = 260;
const ANGLE_SPACING = 0.34;
const WHEEL_DEBOUNCE_MS = 80;
const SCROLL_LOCK_MS = 420;
const FADE_OUT_MS = 320;

function isActiveHref(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function formatCalcValue(value: number) {
  const formatted = Math.abs(value).toFixed(3);
  return value < 0
    ? `calc(-50% - ${formatted}px)`
    : `calc(-50% + ${formatted}px)`;
}

export function PageNav({ pages }: PageNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const pathnameIndex = useMemo(() => {
    const i = pages.findIndex((p) => isActiveHref(pathname, p.href));
    return i === -1 ? 0 : i;
  }, [pathname, pages]);

  const [activeIndex, setActiveIndex] = useState(pathnameIndex);
  const [currentIndex, setCurrentIndex] = useState(pathnameIndex);
  const [isOpen, setIsOpen] = useState(false);
  const isScrollingRef = useRef(false);
  const lastWheelAt = useRef(0);

  // Sync indices when route changes externally.
  useEffect(() => {
    setActiveIndex(pathnameIndex);
    setCurrentIndex(pathnameIndex);
  }, [pathnameIndex]);

  // Prefetch real routes.
  useEffect(() => {
    pages.forEach((p) => {
      if (!p.href.startsWith("#")) router.prefetch(p.href);
    });
  }, [pages, router]);

  // Reset main opacity on pathname change (after fade-out navigation).
  useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      main.style.transition = "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
      main.style.opacity = "1";
    }
  }, [pathname]);

  // Lock scroll while dial is open.
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Wheel cycles items inside the hitbox.
  useEffect(() => {
    const container = document.getElementById("page-nav-hitbox");
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = performance.now();
      if (isScrollingRef.current) return;
      if (now - lastWheelAt.current < WHEEL_DEBOUNCE_MS) return;
      lastWheelAt.current = now;

      if (e.deltaY > 0 && currentIndex < pages.length - 1) {
        setCurrentIndex((p) => p + 1);
        triggerLock();
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex((p) => p - 1);
        triggerLock();
      }
    };

    const triggerLock = () => {
      isScrollingRef.current = true;
      window.setTimeout(() => {
        isScrollingRef.current = false;
      }, SCROLL_LOCK_MS);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [currentIndex, pages.length]);

  const navigateWithFade = (href: string, newIndex: number) => {
    setActiveIndex(newIndex);
    setIsOpen(false);

    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      else router.push(href);
      return;
    }

    const main = document.querySelector("main");
    if (main) {
      main.style.transition = "opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)";
      main.style.opacity = "0";
      window.setTimeout(() => router.push(href), FADE_OUT_MS);
    } else {
      router.push(href);
    }
  };

  const handleMouseEnter = () => setIsOpen(true);

  const handleMouseLeave = () => {
    setIsOpen(false);
    if (currentIndex !== activeIndex) {
      navigateWithFade(pages[currentIndex].href, currentIndex);
    } else {
      setCurrentIndex(activeIndex);
    }
  };

  const handleClick = (
    e: React.MouseEvent,
    index: number,
    href: string,
  ) => {
    e.preventDefault();
    if (index !== activeIndex) {
      navigateWithFade(href, index);
    } else {
      setIsOpen(false);
    }
  };

  // Swallow stray clicks in the hover zone.
  const handleZoneClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (pages.length === 0) return null;
  const activeLabel = pages[activeIndex]?.label ?? "Menu";
  const triggerLabel = pages[currentIndex]?.label ?? activeLabel;

  return (
    <>
      <div
        className={`${styles.shield} ${isOpen ? styles.shieldOpen : ""}`}
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />

      <div
        id="page-nav-hitbox"
        className={`${styles.hitbox} ${isOpen ? styles.open : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleZoneClick}
      >
        {/* Resting edge rail */}
        <div className={styles.edge} aria-hidden="true">
          <span className={styles.edgeLabel}>{activeLabel}</span>
          <div className={styles.edgeCurrent}>
            <div className={styles.dots}>
              {pages.map((p, i) => (
                <span
                  key={p.href}
                  className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
                />
              ))}
            </div>
          </div>
          <span className={styles.edgeHint}>Menu · Scroll</span>
        </div>

        {/* Italic serif label of the currently-focused dial item */}
        <div className={styles.trigger}>{triggerLabel}</div>

        <nav className={styles.dial} aria-label="Primary">
          {pages.map((page, index) => {
            const offset = index - currentIndex;
            const angle = Math.PI + offset * ANGLE_SPACING;
            const x = Math.cos(angle) * RADIUS;
            const y = -Math.sin(angle) * RADIUS;
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 1;
            const scale = isCenter ? 1.12 : 0.88;
            const isActive = index === activeIndex;

            return (
              <a
                key={page.href}
                href={page.href}
                className={`${styles.pill} ${isCenter ? styles.pillFocus : ""} ${isActive ? styles.pillActive : ""}`}
                onClick={(e) => handleClick(e, index, page.href)}
                style={{
                  transform: `translate(${formatCalcValue(x)}, ${formatCalcValue(y)}) scale(${scale})`,
                  opacity: isVisible ? (isCenter ? 1 : 0.45) : 0,
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                aria-current={isActive ? "page" : undefined}
              >
                {page.label}
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}
