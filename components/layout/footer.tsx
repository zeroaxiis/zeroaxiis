"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { Container } from "@/components/layout/container";
import { Magnetic } from "@/components/ui/magnetic";
import ScrollFloat from "@/components/ui/scroll-float";
import {
  InstagramIcon,
  TwitterIcon,
  LinkedInIcon,
  DiscordIcon,
  GithubIcon,
  YoutubeIcon,
  ArrowUpRightIcon,
} from "@/components/icons";

const socialItems = [
  { name: "Instagram", href: siteConfig.links.instagram, Icon: InstagramIcon },
  { name: "Twitter / X", href: siteConfig.links.twitter, Icon: TwitterIcon },
  { name: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedInIcon },
  { name: "Discord", href: siteConfig.links.discord, Icon: DiscordIcon },
  { name: "GitHub", href: siteConfig.links.github, Icon: GithubIcon },
  { name: "YouTube", href: siteConfig.links.youtube, Icon: YoutubeIcon },
];

function FooterTop() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-10 pb-14 border-b border-stroke">
      <div className="max-w-xl">
        <p className="font-display text-[clamp(36px,5vw,64px)] leading-[1.02] text-bone tracking-[-0.025em] whitespace-pre-line">
          {siteConfig.tagline.replace("!", "")}{" "}
          <span className="italic text-accent">footer.</span>
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
    <div className="py-8 border-b border-stroke">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 py-8 border-b border-stroke">
      {siteConfig.footerNav.exploreGroups.map((group) => (
        <div key={group.heading}>
          <h3 className="font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone mb-6">
            {group.heading}
          </h3>
          <ul className="space-y-4">
            {group.items.map((item) => (
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
      ))}

      <div>
        <h3 className="font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone mb-6">
          Contact
        </h3>
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
        <p className="font-body-sm text-body-sm text-bone">
          {siteConfig.address.city}
        </p>
        <p className="font-label-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute mt-2">
          {siteConfig.address.note}
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
    <div className="pt-8 pb-8 relative w-full">
      <ScrollFloat
        key={pathname}
        animationDuration={1.2}
        ease="back.inOut(2)"
        scrollStart="top bottom"
        scrollEnd="center bottom"
        stagger={0.05}
        containerClassName="font-display font-normal text-bone w-full"
        textClassName="text-[clamp(3.5rem,17vw,18rem)] tracking-[-0.05em] leading-[1]"
      >
        {siteConfig.name.toLowerCase()}
      </ScrollFloat>

      <div className="absolute top-1/2 -translate-y-1/2 right-[5%] lg:right-[15%] w-[clamp(3.5rem,17vw,18rem)] h-[clamp(3.5rem,17vw,18rem)] pointer-events-none z-20">
        <style>{`
          @keyframes cellPop {
            0%, 100% { opacity: 0.1; }
            40% { opacity: 1; }
          }
          .band-4 { animation: cellPop 2.5s ease-in-out infinite 0.0s; }
          .band-3 { animation: cellPop 2.5s ease-in-out infinite 0.25s; }
          .band-2 { animation: cellPop 2.5s ease-in-out infinite 0.5s; }
          .band-1 { animation: cellPop 2.5s ease-in-out infinite 0.75s; }
        `}</style>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          <defs>
            <mask id="globeGridMask">
              <circle cx="50" cy="50" r="46" fill="white" />
              <g stroke="black" strokeWidth="3.5" fill="none">
                <circle cx="50" cy="50" r="46" strokeWidth="5" />
                <path d="M 50 4 L 50 96" />
                <ellipse cx="50" cy="50" rx="22" ry="46" />
                <path d="M 10 26 Q 50 10 90 26" strokeLinecap="round" />
                <path d="M 4 50 Q 50 35 96 50" strokeLinecap="round" />
                <path d="M 10 74 Q 50 60 90 74" strokeLinecap="round" />
              </g>
            </mask>
          </defs>
          
          <g transform="rotate(23.5 50 50)">
            <g mask="url(#globeGridMask)" fill="#ffffff">
              {/* Top Band */}
              <path d="M 0 0 L 100 0 L 100 26 L 90 26 Q 50 10 10 26 L 0 26 Z" className="band-1" />
              {/* Upper Middle Band */}
              <path d="M 0 26 L 10 26 Q 50 10 90 26 L 100 26 L 100 50 L 96 50 Q 50 35 4 50 L 0 50 Z" className="band-2" />
              {/* Lower Middle Band */}
              <path d="M 0 50 L 4 50 Q 50 35 96 50 L 100 50 L 100 74 L 90 74 Q 50 60 10 74 L 0 74 Z" className="band-3" />
              {/* Bottom Band */}
              <path d="M 0 74 L 10 74 Q 50 60 90 74 L 100 74 L 100 100 L 0 100 Z" className="band-4" />
            </g>
          </g>
        </svg>
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
    <footer className="relative w-full bg-ink z-10 border-t border-stroke pt-6">
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
