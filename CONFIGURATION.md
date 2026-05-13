# Configuration Guide

This guide helps you configure and customize the Zeroaxiis project for your needs.

## Table of Contents

1. [Site Configuration](#site-configuration)
2. [Theme & Colors](#theme--colors)
3. [Navigation & Links](#navigation--links)
4. [Contact Information](#contact-information)
5. [Build Configuration](#build-configuration)

---

## Site Configuration

### Main Config File

Located at: `lib/site.ts`

```typescript
export const siteConfig = {
  name: "zeroaxiis", // Site name
  tagline: "Helping Businesses Grow!", // Short tagline
  description: "Full description...", // SEO description
  url: "https://zeroaxiis.com", // Site URL
  email: "hello@zeroaxiis.com", // Contact email

  address: {
    city: "Mumbai, India",
    note: "By Appointment Only",
  },

  ogImage: "/images/og.png", // Open Graph image

  // ... navigation and links below
};
```

### Updating Site Name

```typescript
export const siteConfig = {
  name: "Your Company Name",
  tagline: "Your tagline here",
  description: "A brief description of your company",
  // ... rest of config
};
```

---

## Theme & Colors

### Theme Tokens

Located at: `app/globals.css`

Find the `@theme` block and update values:

```css
@theme {
  /* Primary Colors */
  --color-primary: #2f3131; /* Main brand color */
  --color-on-primary: #ffffff; /* Text on primary */

  /* Surface Colors */
  --color-surface: #ffffff; /* Backgrounds */
  --color-on-surface: #1c1c1c; /* Text on surface */
  --color-on-surface-variant: #757575; /* Secondary text */

  /* Outline */
  --color-outline: #e0e0e0;
  --color-outline-variant: #d0d0d0;

  /* Font Family */
  --font-family-display: "Inter", sans-serif;
  --font-family-body: "Inter", sans-serif;
  --font-family-mono: "Courier New", monospace;

  /* Font Sizes */
  --font-size-display: 4rem;
  --font-size-headline-lg: 2rem;
  --font-size-body-md: 1rem;

  /* Other tokens... */
}
```

### Color Guide

| Token                     | Usage                | Example         |
| ------------------------- | -------------------- | --------------- |
| `--color-primary`         | Brand color, buttons | Logo, CTAs      |
| `--color-surface`         | Backgrounds          | Cards, sections |
| `--color-on-surface`      | Main text            | Body text       |
| `--color-outline-variant` | Borders              | Card borders    |

### Updating Colors

```css
/* Change primary brand color */
--color-primary: #0066cc; /* From #2f3131 to your color */

/* Change surface/background */
--color-surface: #f5f5f5; /* From #ffffff */

/* Change text color */
--color-on-surface: #222222; /* From #1c1c1c */
```

### Font Customization

```css
/* Update font family */
--font-family-display: "Poppins", sans-serif; /* For headings */
--font-family-body: "Open Sans", sans-serif; /* For body text */

/* Update font sizes */
--font-size-display: 3.5rem; /* Larger/smaller headings */
--font-size-body-md: 1.125rem; /* Adjust body size */
```

---

## Navigation & Links

### Main Navigation

Edit `lib/site.ts` - `nav` array:

```typescript
export const siteConfig = {
  // ...
  nav: [
    { label: "Services", href: "#services" }, // Scroll to section
    { label: "Workflow", href: "#workflow" },
    { label: "Projects", href: "/projects" }, // Link to page
    { label: "Open Source", href: "/projects#open-source" },
    { label: "Team", href: "/team" },
    { label: "Blog", href: "/blog" }, // New link
    { label: "Contact", href: "/contact" }, // New link
  ],
  // ...
};
```

### Footer Navigation

```typescript
export const siteConfig = {
  // ...
  footerNav: {
    explore: [
      { label: "About", href: "/about" },
      { label: "Services", href: "#services" },
      { label: "Case Studies", href: "/projects" },
      { label: "Insights", href: "/blog" },
    ],
    connect: [
      { label: "Instagram", href: "https://instagram.com/yourhandle" },
      { label: "LinkedIn", href: "https://linkedin.com/company/yourcompany" },
      { label: "Twitter", href: "https://twitter.com/yourhandle" },
    ],
  },
  // ...
};
```

### Legal Links

```typescript
export const siteConfig = {
  // ...
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
  // ...
};
```

### Social Links

```typescript
export const siteConfig = {
  // ...
  links: {
    twitter: "https://twitter.com/zeroaxiis",
    github: "https://github.com/zeroaxiis",
    instagram: "https://instagram.com/zeroaxiis",
    linkedin: "https://linkedin.com/company/zeroaxiis",
    behance: "https://behance.net/zeroaxiis",
    dribbble: "https://dribbble.com/zeroaxiis",
    facebook: "https://facebook.com/zeroaxiis",
  },
  // ...
};
```

---

## Contact Information

### Update Email

```typescript
export const siteConfig = {
  // ...
  email: "your-email@yourcompany.com",
  // ...
};
```

Used in:

- Footer contact link
- Contact form submissions
- CTA buttons

### Update Address

```typescript
export const siteConfig = {
  // ...
  address: {
    city: "New York, USA",
    note: "Available 9am-6pm EST",
  },
  // ...
};
```

### Contact Items (Team Page)

Located at: `lib/data/team.ts`

```typescript
export const contactItems: ContactItem[] = [
  {
    label: "Email",
    value: "hello@yourcompany.com",
  },
  {
    label: "Timezone",
    value: "UTC-5 to UTC+0",
  },
  {
    label: "Response Time",
    value: "Within 24 hours",
  },
];
```

---

## Build Configuration

### TypeScript Configuration

Located at: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Next.js Configuration

Located at: `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add custom configuration here
  experimental: {
    // Enable experimental features if needed
  },
};

export default nextConfig;
```

### Tailwind Configuration

Located at: `tailwind.config.ts` (or included in globals.css)

The project uses Tailwind CSS with custom theme tokens in `app/globals.css`.

### ESLint Configuration

Located at: `eslint.config.mjs`

```javascript
import js from "@eslint/js";
import configNext from "eslint-config-next/core";

export default [js.configs.recommended, configNext];
```

---

## Environment Variables

### No Environment Variables Required

Currently, the project doesn't require `.env` files as all configuration is public.

### To Add Environment Variables

If you need to add environment variables:

1. Create `.env.local` (not committed to git)
2. Add variables: `NEXT_PUBLIC_API_URL=https://api.example.com`
3. Access in code: `process.env.NEXT_PUBLIC_API_URL`

---

## Content Configuration

### Services

Located at: `lib/data/services.ts`

```typescript
export const services: Service[] = [
  {
    icon: "terminal", // Material Symbol icon name
    title: "Web Apps",
    description: "High-performance...",
  },
  // Add more services
];
```

### Projects

Located at: `lib/data/projects.ts`

```typescript
export const projects: Project[] = [
  {
    title: "Project Name",
    description: "Project description...",
    tags: ["React", "TypeScript"],
    image: "https://...", // Optional image URL
    imageAlt: "Description of image",
  },
  // Add more projects
];
```

### Team Members

Located at: `lib/data/team.ts`

```typescript
export const teamMembers: TeamMember[] = [
  {
    name: "John Doe",
    role: "Senior Developer",
    description: "Bio...",
    image: "https://...", // Profile image URL
    imageAlt: "John Doe",
    icon: "code", // Material Symbol icon
    socialLinks: [
      { label: "GitHub", href: "https://github.com/..." },
      { label: "Twitter", href: "https://twitter.com/..." },
    ],
  },
  // Add more team members
];
```

### Testimonials

Located at: `lib/data/testimonials.ts`

```typescript
export const testimonials: Testimonial[] = [
  {
    name: "Client Name",
    title: "CEO",
    company: "Company Name",
    location: "City, Country",
    quote: "Great quote about the work...",
    tag: "Case Study",
    avatar: "https://...", // Client image URL
  },
  // Add more testimonials
];
```

---

## Deployment Configuration

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Select `zeroaxiis` project
3. No environment variables needed (unless you add them)
4. Deploy → automatic

### Custom Server

```bash
# Build for production
npm run build

# Start server
npm start
```

Server runs on port 3000 by default.

---

## Troubleshooting Configuration

### Colors not updating

- Clear browser cache
- Restart dev server: `npm run dev`
- Check CSS syntax in `globals.css`

### Navigation links not working

- Check href format (relative `/page` or absolute `https://...`)
- Verify page exists in `app/(marketing)/`
- Check for typos in routes

### Build fails

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Type errors

```bash
# Check TypeScript
npx tsc --noEmit

# Fix configuration in tsconfig.json
```

---

## Quick Reference

| What              | Where                      | How                         |
| ----------------- | -------------------------- | --------------------------- |
| Site name & email | `lib/site.ts`              | Update `siteConfig` object  |
| Colors & fonts    | `app/globals.css`          | Update `@theme` block       |
| Navigation        | `lib/site.ts`              | Update `nav` array          |
| Services          | `lib/data/services.ts`     | Update `services` array     |
| Projects          | `lib/data/projects.ts`     | Update `projects` array     |
| Team              | `lib/data/team.ts`         | Update `teamMembers` array  |
| Testimonials      | `lib/data/testimonials.ts` | Update `testimonials` array |

---

## Next Steps

- [DIRECTORY.md](DIRECTORY.md) - Understand folder structure
- [DEVELOPMENT.md](DEVELOPMENT.md) - Start developing
- [README.md](README.md) - Project overview
