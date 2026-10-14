"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { PageEntry } from "@/lib/pages";
import styles from "./page-nav.module.css";

interface PageNavProps {
  pages: PageEntry[];
}

export function PageNav({ pages }: PageNavProps) {
  const pathname = usePathname();

  return <Navigation key={pathname} pages={pages} pathname={pathname} />;
}

function Navigation({ pages, pathname }: PageNavProps & { pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const servicesRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const serviceLinkRef = useRef<HTMLAnchorElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const closeMenu = () => {
    cancelClose();
    setIsOpen(false);
    setServicesOpen(false);
  };

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    const breakpoint = window.matchMedia("(max-width: 1000px)");
    const resetMenus = () => {
      setIsOpen(false);
      setServicesOpen(false);
    };
    breakpoint.addEventListener("change", resetMenus);
    return () => breakpoint.removeEventListener("change", resetMenus);
  }, []);

  useEffect(() => {
    if (!isOpen && !servicesOpen) return;

    const handleOutsidePress = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setIsOpen(false);
        setServicesOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (servicesOpen) {
        setServicesOpen(false);
        if (navRef.current?.contains(document.activeElement)) servicesRef.current?.focus();
      } else {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handleOutsidePress);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePress);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, servicesOpen]);

  if (pages.length === 0) return null;

  return (
    <nav
      ref={navRef}
      className={styles.nav}
      aria-label="Primary"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}
    >
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={isOpen}
        aria-controls="primary-navigation-links"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => {
          setIsOpen((open) => !open);
          setServicesOpen(false);
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d={isOpen ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
        <span>Menu</span>
      </button>

      <ul
        id="primary-navigation-links"
        className={`${styles.links} ${isOpen ? styles.open : ""}`}
      >
        {pages.map((page) => {
          const isActive = page.href === "/"
            ? pathname === "/"
            : pathname === page.href || pathname.startsWith(`${page.href}/`);

          return (
            <li key={page.href}>
              <Link
                href={page.href}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={closeMenu}
              >
                {page.label}
              </Link>
            </li>
          );
        })}
        <li
          className={styles.services}
          onFocusCapture={cancelClose}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") {
              cancelClose();
              setServicesOpen(true);
            }
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse" && !event.currentTarget.querySelector(":focus-visible")) {
              cancelClose();
              closeTimer.current = setTimeout(() => setServicesOpen(false), 160);
            }
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false);
          }}
        >
          <button
            ref={servicesRef}
            type="button"
            className={`${styles.link} ${styles.servicesToggle}`}
            aria-expanded={servicesOpen}
            aria-controls="services-navigation-links"
            onClick={(event) => {
              cancelClose();
              if (event.detail > 0 && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                setServicesOpen(true);
              } else {
                setServicesOpen((open) => !open);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                cancelClose();
                setServicesOpen(true);
                requestAnimationFrame(() => serviceLinkRef.current?.focus());
              }
            }}
          >
            Services
            <ChevronDown className={styles.chevron} size={12} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <div className={styles.dropdown} hidden={!servicesOpen} id="services-navigation-links">
            <ul className={styles.serviceLinks}>
              <li>
                <a ref={serviceLinkRef} href="https://halomail.zeroaxiis.tech" className={styles.serviceLink} onClick={closeMenu}>
                  Halomail
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}
