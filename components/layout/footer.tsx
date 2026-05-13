"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site";
import ScrollFloat from "@/components/ui/scroll-float";

/* ─── Social icon components ──────────────────────────────────────── */

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function IconTwitter() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function IconBehance() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 7h6.5C10.4 7 12 8.3 12 10s-1.1 3-3 3H2V7zM2 13h7c2.2 0 4 1.3 4 3s-1.8 3-4 3H2v-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 9h6M15 14.5h7c0-1.4-1.1-2.5-2.5-2.5S17 13.1 17 14.5c0 1.4 1.1 2.5 2.5 2.5A2.5 2.5 0 0 0 22 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconDribbble() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M2.5 11.5l9-9M4 2.5h7.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const socialItems = [
  { name: "Instagram", href: siteConfig.links.instagram, Icon: IconInstagram },
  { name: "Twitter / X", href: siteConfig.links.twitter, Icon: IconTwitter },
  { name: "Facebook", href: siteConfig.links.facebook, Icon: IconFacebook },
  { name: "LinkedIn", href: siteConfig.links.linkedin, Icon: IconLinkedIn },
  { name: "Behance", href: siteConfig.links.behance, Icon: IconBehance },
  { name: "Dribbble", href: siteConfig.links.dribbble, Icon: IconDribbble },
];

/* ─── Sub-components ──────────────────────────────────────────────── */

function FooterTop() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 border-b border-outline-variant/20">
      <p className="font-display text-2xl md:text-3xl font-semibold text-primary tracking-tight leading-tight max-w-xs">
        {siteConfig.tagline}
      </p>
      <Link
        href={`mailto:${siteConfig.email}`}
        className="group inline-flex items-center gap-2 font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-200"
      >
        {siteConfig.email}
        <ArrowUpRight />
      </Link>
    </div>
  );
}

function FooterSocials() {
  return (
    <div className="py-10 border-b border-outline-variant/20">
      <p className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface-variant mb-6">
        Follow Along
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {socialItems.map(({ name, href, Icon }) => (
          <Link
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-4 border-b border-outline-variant/15 last:border-b-0 sm:[&:nth-last-child(-n+1)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0 hover:border-outline-variant/40 transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-on-surface-variant group-hover:text-primary transition-colors duration-200">
                <Icon />
              </span>
              <span className="font-body-sm text-body-sm font-medium text-on-surface group-hover:text-primary transition-colors duration-200">
                {name}
              </span>
            </div>
            <span className="text-on-surface-variant/40 group-hover:text-primary transition-colors duration-200">
              <ArrowUpRight />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FooterNav() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 py-10 border-b border-outline-variant/20">
      {/* Explore */}
      <div>
        <h3 className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface mb-5">
          Explore
        </h3>
        <ul className="space-y-3">
          {siteConfig.footerNav.explore.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Connect */}
      <div>
        <h3 className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface mb-5">
          Connect
        </h3>
        <ul className="space-y-3">
          {siteConfig.footerNav.connect.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Get In Touch */}
      <div>
        <h3 className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface mb-5">
          Get In Touch
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">
          Start A Project
        </p>
        <Link
          href={`mailto:${siteConfig.email}`}
          className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200 break-all"
        >
          {siteConfig.email}
        </Link>
      </div>

      {/* Office */}
      <div>
        <h3 className="font-label-mono text-label-mono uppercase tracking-widest text-on-surface mb-5">
          Office
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">
          {siteConfig.address.note}
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {siteConfig.address.city}
        </p>
      </div>
    </div>
  );
}

function FooterBrand() {
  return (
    <div className="pt-8 pb-2">
      <ScrollFloat
        animationDuration={1.2}
        ease="back.inOut(2)"
        scrollStart="top bottom"
        scrollEnd="bottom bottom"
        stagger={0.05}
        containerClassName="font-display font-bold text-primary w-full"
        textClassName="text-[clamp(3.5rem,15vw,14rem)] tracking-[-0.04em] leading-none"
      >
        {siteConfig.name}
      </ScrollFloat>
    </div>
  );
}

function FooterBottom() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-5 border-t border-outline-variant/20">
      <div className="flex items-center gap-5">
        {siteConfig.legal.map((item, i) => (
          <span key={item.label} className="flex items-center gap-5">
            <Link
              href={item.href}
              className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-200"
            >
              {item.label}
            </Link>
            {i < siteConfig.legal.length - 1 && (
              <span className="text-outline-variant/50 select-none">·</span>
            )}
          </span>
        ))}
      </div>
      <span className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </span>
    </div>
  );
}

/* ─── Main Footer ─────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-outline-variant/20">
      <div className="max-w-container-max mx-auto px-gutter">
        <FooterTop />
        <FooterSocials />
        <FooterNav />
        <FooterBrand />
        <FooterBottom />
      </div>
    </footer>
  );
}
