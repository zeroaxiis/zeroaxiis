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
  const isScrollingRef = useRef(false);
  const radius = 250;
  const angleSpacing = 0.35;
  const [prevPathnameIndex, setPrevPathnameIndex] = useState(pathnameIndex);

  if (prevPathnameIndex !== pathnameIndex) {
    setPrevPathnameIndex(pathnameIndex);
    setActiveIndex(pathnameIndex);
    setCurrentIndex(pathnameIndex);
  }

  useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      main.style.transition = "opacity 0.4s ease";
      main.style.opacity = "1";
    }
  }, [pathname]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrollingRef.current) return;

      if (e.deltaY < 0 && currentIndex < items.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        triggerScrollLock();
      } else if (e.deltaY > 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        triggerScrollLock();
      }
    };

    const triggerScrollLock = () => {
      isScrollingRef.current = true;
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 350);
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

    const isHash = href.startsWith("#");

    if (isHash) {
      router.push(href);
      return;
    }

    const main = document.querySelector("main");
    if (main) {
      main.style.transition = "opacity 0.4s ease";
      main.style.opacity = "0";

      setTimeout(() => {
        router.push(href);
      }, 400);
    } else {
      router.push(href);
    }
  };

  const handleMouseLeave = () => {
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
    }
  };

  return (
    <div
      className={styles.navHitbox}
      id="nav-container"
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.navTriggerText} id="trigger-text">
        {items[activeIndex]?.label || "Menu"}
      </div>

      <div className={styles.navDial} id="dial">
        {items.map((item, index) => {
          const offset = index - currentIndex;
          const angle = Math.PI + offset * angleSpacing;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 1;

          const scale = isCenter ? 1.1 : 0.9;

          return (
            <a
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${
                isCenter ? styles.activeStyle : ""
              }`}
              onClick={(e) => handleClick(e, index, item.href)}
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
                opacity: isVisible ? (isCenter ? 1 : 0.5) : 0,
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
