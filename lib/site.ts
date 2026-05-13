export const siteConfig = {
  name: "zeroaxiis",
  tagline: "Helping Businesses Grow!",
  description:
    "A digital agency helping businesses grow through scalable software solutions, creative design, and high-performance engineering.",
  url: "https://zeroaxiis.com",
  email: "hello@zeroaxiis.com",
  address: {
    city: "Mumbai, India",
    note: "By Appointment Only",
  },
  ogImage: "/images/og.png",
  links: {
    twitter: "https://twitter.com/zeroaxiis",
    github: "https://github.com/zeroaxiis",
    instagram: "https://instagram.com/zeroaxiis",
    linkedin: "https://linkedin.com/company/zeroaxiis",
    behance: "https://behance.net/zeroaxiis",
    dribbble: "https://dribbble.com/zeroaxiis",
    facebook: "https://facebook.com/zeroaxiis",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Workflow", href: "#workflow" },
    { label: "Projects", href: "/projects" },
    { label: "Open Source", href: "/projects#open-source" },
    { label: "Team", href: "/team" },
  ],
  footerNav: {
    explore: [
      { label: "About", href: "/about" },
      { label: "Services", href: "#services" },
      { label: "Case Studies", href: "/projects" },
      { label: "Insights", href: "/blog" },
    ],
    connect: [
      { label: "Instagram", href: "https://instagram.com/zeroaxiis" },
      { label: "LinkedIn", href: "https://linkedin.com/company/zeroaxiis" },
      { label: "Dribbble", href: "https://dribbble.com/zeroaxiis" },
    ],
  },
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export type SiteConfig = typeof siteConfig;
