"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Magnetic } from "@/components/ui/magnetic";
import ScrollFloat from "@/components/ui/scroll-float";
import { FooterVisualization } from "@/components/ui/footer-visualization";
import {
  InstagramIcon,
  TwitterIcon,
  LinkedInIcon,
  DribbbleIcon,
  BehanceIcon,
  FacebookIcon,
  ArrowUpRightIcon,
} from "@/components/icons";

const socialItems = [
  { name: "Instagram", href: siteConfig.links.instagram, Icon: InstagramIcon },
  { name: "Twitter / X", href: siteConfig.links.twitter, Icon: TwitterIcon },
  { name: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedInIcon },
  { name: "Dribbble", href: siteConfig.links.dribbble, Icon: DribbbleIcon },
  { name: "Behance", href: siteConfig.links.behance, Icon: BehanceIcon },
  { name: "Facebook", href: siteConfig.links.facebook, Icon: FacebookIcon },
];

function FooterTop() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-10 pb-14 border-b border-stroke">
      <div className="max-w-xl">
        <p className="font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em] mb-6 flex items-center gap-3">
          Closing transmission
        </p>
        <p className="font-display text-[clamp(36px,5vw,64px)] leading-[0.95] text-bone tracking-[-0.025em] text-balance">
          {siteConfig.tagline.replace("!", "")}{" "}
          <span className="italic text-bone-dim">together.</span>
        </p>
      </div>
      <Magnetic strength={0.25}>
        <Link
          href={`mailto:${siteConfig.email}`}
          className="group inline-flex items-center gap-3 pb-2 border-b border-bone hover:border-accent transition-colors duration-500 font-body-md text-body-md text-bone shrink-0"
        >
          <span className="transition-[transform,color] duration-500 group-hover:text-accent group-hover:translate-x-0.5">
            {siteConfig.email}
          </span>
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-bone text-ink group-hover:bg-accent group-hover:rotate-45 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500">
            <ArrowUpRightIcon width={12} height={12} strokeWidth={1.4} />
          </span>
        </Link>
      </Magnetic>
    </div>
  );
}

function FooterSocials() {
  return (
    <div className="py-14 border-b border-stroke">
      <p className="font-label-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute mb-10 flex items-center gap-3">
        Follow along
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12">
        {socialItems.map(({ name, href, Icon }) => (
          <Magnetic key={name} strength={0.22}>
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 py-5 border-b border-stroke last:border-b-0 hover:border-accent/60 transition-colors duration-500"
            >
              <span className="flex items-center gap-5">
                <span className="text-bone-mute group-hover:text-accent transition-colors duration-300 shrink-0">
                  <Icon />
                </span>
                <span className="font-display text-[clamp(20px,2vw,28px)] tracking-[-0.015em] text-bone leading-none transition-[transform,color] duration-500 group-hover:text-accent group-hover:translate-x-1">
                  {name}
                </span>
              </span>
              <span className="text-bone-mute/40 group-hover:text-accent group-hover:rotate-45 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500 shrink-0">
                <ArrowUpRightIcon width={16} height={16} strokeWidth={1.4} />
              </span>
            </Link>
          </Magnetic>
        ))}
      </div>
    </div>
  );
}

function FooterNav() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 py-14 border-b border-stroke">
      <div>
        <h3 className="font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone mb-6">
          Explore
        </h3>
        <ul className="space-y-4">
          {siteConfig.footerNav.explore.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="font-body-sm text-body-sm text-bone-mute hover:text-accent transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone mb-6">
          Get in touch
        </h3>
        <p className="font-body-sm text-body-sm text-bone-mute mb-2">
          Start a project
        </p>
        <Link
          href={`mailto:${siteConfig.email}`}
          className="font-body-sm text-body-sm text-bone hover:text-accent transition-colors duration-200 break-all"
        >
          {siteConfig.email}
        </Link>
      </div>

      <div>
        <h3 className="font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone mb-6">
          Studio
        </h3>
        <p className="font-body-sm text-body-sm text-bone-mute mb-2">
          {siteConfig.address.note}
        </p>
        <p className="font-body-sm text-body-sm text-bone">
          {siteConfig.address.city}
        </p>
      </div>
    </div>
  );
}

function FooterBrand() {
  // Key by pathname so ScrollFloat fully remounts after client-side nav —
  // Footer lives in the root layout and would otherwise reuse stale
  // ScrollTrigger positions from the previous page.
  const pathname = usePathname();
  return (
    <div className="pt-12 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="overflow-hidden flex-1">
        <ScrollFloat
          key={pathname}
          animationDuration={1.2}
          ease="back.inOut(2)"
          scrollStart="top bottom"
          scrollEnd="bottom bottom"
          stagger={0.05}
          containerClassName="font-display font-normal text-bone w-full"
          textClassName="text-[clamp(3.5rem,17vw,18rem)] tracking-[-0.05em] leading-[0.85]"
        >
          {siteConfig.name.toLowerCase()}
        </ScrollFloat>
      </div>
      <div className="flex items-center justify-end shrink-0 md:pb-5">
        <FooterVisualization />
      </div>
    </div>
  );
}

function FooterBottom() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-stroke">
      <div className="flex items-center gap-5 flex-wrap">
        {siteConfig.legal.map((item, i) => (
          <span key={item.label} className="flex items-center gap-5">
            <Link
              href={item.href}
              className="font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute hover:text-accent transition-colors duration-200"
            >
              {item.label}
            </Link>
            {i < siteConfig.legal.length - 1 && (
              <span className="text-bone-mute/40 select-none">·</span>
            )}
          </span>
        ))}
      </div>
      <span className="font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute">
        © {new Date().getFullYear()} {siteConfig.name} — All systems quiet.
      </span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full bg-ink border-t border-stroke z-10">
      <Container>
        <FooterTop />
        <FooterSocials />
        <FooterNav />
        <FooterBrand />
        <FooterBottom />
      </Container>
    </footer>
  );
}
