# Directory Structure Guide

## Overview

This document explains the organization and purpose of each directory in the Zeroaxiis project. The structure follows a feature-based, modular architecture designed for scalability and maintainability.

## Root Level

```
zeroaxiis/
├── app/                 # Next.js 16 App Router (Pages & Layouts)
├── components/          # Reusable React components
├── hooks/              # Custom React hooks
├── lib/                # Utilities, configuration, and data
├── types/              # TypeScript type definitions
├── public/             # Static assets
├── content/            # Content files (MDX, markdown)
└── [Config files]      # TypeScript, ESLint, Tailwind config
```

---

## Directory Details

### `/app` - Next.js App Router

Next.js 16 application structure using the App Router. Handles routing, layouts, and page rendering.

```
app/
├── (marketing)/        # Route group - non-authenticated pages
│   ├── page.tsx       # Home page (/)
│   ├── blog/
│   │   ├── page.tsx   # Blog listing (/blog)
│   │   └── [slug]/
│   │       └── page.tsx   # Individual blog post (/blog/:slug)
│   ├── projects/      # Projects page (/projects)
│   ├── team/          # Team page (/team)
│   └── contact/       # Contact page (/contact)
├── layout.tsx         # Root layout (global header, footer)
├── globals.css        # Global styles & theme tokens
├── not-found.tsx      # 404 page
└── loading.tsx        # Loading skeleton (optional)
```

**Key Files:**

- `layout.tsx` - Root layout with HTML structure
- `globals.css` - CSS variables, theme tokens, global styles
- `not-found.tsx` - Fallback 404 page

---

### `/components` - Reusable Components

Organized by component category and responsibility. Each component is self-contained and reusable.

```
components/
├── icons/             # SVG icon components
│   ├── arrows.tsx    # Arrow icons (ArrowLeft, ArrowRight)
│   └── index.ts      # Barrel export
│
├── ui/                # Base UI components (atoms)
│   ├── button.tsx     # Button component with variants
│   ├── badge.tsx      # Badge component
│   ├── blur-text.tsx  # Text blur effect
│   ├── gradient-divider.tsx  # Visual divider
│   ├── icon-button.tsx        # Icon-only button
│   ├── scroll-float.tsx        # Floating scroll effect
│   ├── shiny-text.tsx          # Text shine animation
│   ├── section-header.tsx      # Section title component
│   ├── tech-tag.tsx            # Technology tag
│   └── index.ts       # Barrel export
│
├── layout/            # Layout components (structural)
│   ├── container.tsx  # Max-width container wrapper
│   ├── section.tsx    # Section wrapper with spacing
│   ├── header.tsx     # Navigation header
│   ├── footer.tsx     # Footer component
│   └── index.ts       # Barrel export
│
├── cards/             # Card components (molecules)
│   ├── project-card.tsx         # Project showcase card
│   ├── open-source-card.tsx      # Open source tool card
│   ├── team-member-card.tsx      # Team member profile card
│   └── index.ts       # Barrel export
│
├── forms/             # Form components
│   ├── contact-form.tsx       # Contact form
│   ├── contact-info.tsx       # Contact information display
│   ├── form-input.tsx         # Input field
│   ├── form-textarea.tsx      # Textarea field
│   └── index.ts       # Barrel export
│
└── sections/          # Page sections (organisms)
    ├── hero.tsx              # Hero banner section
    ├── features.tsx          # Features/Services section
    ├── testimonials.tsx      # Testimonials carousel
    ├── cta.tsx               # Call-to-action section
    └── index.ts       # Barrel export
```

**Component Organization:**

- **Icons** (`/icons`) - SVG icons, visual assets
- **UI** (`/ui`) - Basic building blocks (button, badge, etc.)
- **Layout** (`/layout`) - Structural containers (header, footer, section)
- **Cards** (`/cards`) - Composite components for displaying content
- **Forms** (`/forms`) - Form inputs and form layouts
- **Sections** (`/sections`) - Full-page sections combining multiple components

---

### `/hooks` - Custom React Hooks

Custom hooks for managing component logic and state.

```
hooks/
├── useCarouselScroll.ts    # Carousel scroll functionality
├── index.ts                # Barrel export
```

**Hook Convention:**

- Hooks start with `use` prefix (e.g., `useCarouselScroll`)
- Logic is reusable and testable
- All hooks exported from `index.ts`

---

### `/lib` - Utilities & Configuration

Business logic, utilities, data, and configuration files.

```
lib/
├── constants/          # Application constants
│   ├── ui.ts          # UI constants (colors, sizes)
│   ├── layout.ts      # Layout constants (spacing, breakpoints)
│   ├── animations.ts  # Animation configs
│   └── index.ts       # Barrel export
│
├── data/              # Static data & content
│   ├── services.ts    # Service offerings
│   ├── projects.ts    # Project showcase data
│   ├── team.ts        # Team member info
│   ├── testimonials.ts  # Client testimonials
│   ├── workflow.ts    # Process workflow steps
│   └── index.ts       # Barrel export
│
├── site.ts           # Site-wide configuration
├── blog.ts           # Blog utilities & post metadata
└── utils.ts          # Helper functions (cn, formatDate)
```

**Organization:**

- **`constants/`** - Centralized configuration values
- **`data/`** - Static data files (team, projects, services)
- **`site.ts`** - Site configuration (name, nav, contact)
- **`blog.ts`** - Blog post helpers and metadata
- **`utils.ts`** - Utility functions used across the app

---

### `/types` - TypeScript Definitions

Shared TypeScript types used across the application.

```
types/
├── index.ts    # All type definitions
```

**Common Types:**

- `BlogPost` - Blog post metadata
- `Service` - Service offering
- `Project` - Project showcase item
- `TeamMember` - Team member profile
- `WorkflowStep` - Process step
- `OpenSourceTool` - Open source project

---

### `/content` - Content Files

Static content files (markdown, MDX files for blog posts).

```
content/
├── blog/           # Blog post markdown files
│   ├── post-1.mdx  # Individual blog posts
│   └── post-2.mdx
```

---

### `/public` - Static Assets

Static files served directly by Next.js (images, fonts, icons).

```
public/
└── images/         # Image assets
    ├── og.png      # Open Graph image
    └── [other images]
```

---

## Component Communication

### Component Hierarchy

```
App (layout.tsx)
├── Header (components/layout/header.tsx)
├── Page Content
│   ├── Hero (components/sections/hero.tsx)
│   │   └── Button (components/ui/button.tsx)
│   ├── Features (components/sections/features.tsx)
│   │   └── Cards (components/cards/project-card.tsx)
│   └── Testimonials (components/sections/testimonials.tsx)
│       ├── useCarouselScroll (hooks/useCarouselScroll.ts)
│       └── Arrow Icons (components/icons/arrows.tsx)
└── Footer (components/layout/footer.tsx)
```

### Data Flow

1. **Static Data** → `lib/data/*.ts` → Components
2. **Constants** → `lib/constants/*.ts` → Components
3. **Types** → `types/index.ts` → Data & Components
4. **Configuration** → `lib/site.ts` → App

---

## Adding New Features

### New Component

1. Create component file in appropriate directory:
   - UI component → `/components/ui/my-component.tsx`
   - Section → `/components/sections/my-section.tsx`

2. Add type definition to `/types/index.ts` if needed

3. Export from directory's `index.ts`:
   ```tsx
   export { MyComponent } from "./my-component";
   ```

### New Hook

1. Create hook file in `/hooks/useMyHook.ts`
2. Export from `/hooks/index.ts`:
   ```tsx
   export { useMyHook } from "./useMyHook";
   ```

### New Data

1. Add type to `/types/index.ts`
2. Create data file in `/lib/data/my-data.ts`
3. Export from `/lib/data/index.ts`

### New Constants

1. Add to appropriate file in `/lib/constants/`
2. Export from `/lib/constants/index.ts`

---

## Naming Conventions

| Item        | Convention                  | Example           |
| ----------- | --------------------------- | ----------------- |
| Components  | PascalCase                  | `MyComponent.tsx` |
| Hooks       | camelCase with `use` prefix | `useMyHook.ts`    |
| Utilities   | camelCase                   | `formatDate.ts`   |
| Types       | PascalCase                  | `MyType`          |
| Constants   | UPPER_CASE                  | `BUTTON_VARIANTS` |
| Directories | kebab-case                  | `my-directory/`   |

---

## Import Patterns

### Absolute Imports (Preferred)

```tsx
import { Button } from "@/components/ui/button";
import { useCarouselScroll } from "@/hooks";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";
```

### Barrel Exports

Each directory with multiple exports has an `index.ts`:

```tsx
// ❌ Avoid
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ✅ Prefer (when possible)
import { Button, Badge } from "@/components/ui";
```

---

## File Size Guidelines

| File Type | Target      | Max       |
| --------- | ----------- | --------- |
| Component | < 300 lines | 500 lines |
| Page      | < 400 lines | 600 lines |
| Hook      | < 100 lines | 200 lines |
| Utility   | < 150 lines | 250 lines |

If a file exceeds limits, consider splitting into smaller, focused files.

---

## Best Practices

1. **Single Responsibility** - Each component/hook has one job
2. **Reusability** - Extract common patterns into components/hooks
3. **Type Safety** - Use TypeScript for all files
4. **Consistency** - Follow naming and structure conventions
5. **Documentation** - Add JSDoc comments for complex logic
6. **Barrel Exports** - Always export from `index.ts` files
7. **Constants** - Use centralized constants, avoid magic strings/numbers
8. **Accessibility** - Use semantic HTML and ARIA attributes
9. **Performance** - Use `"use client"` only when necessary
10. **Testing** - Keep components pure and testable

---

## Common Tasks

### Find a Component

```bash
grep -r "ComponentName" components/
```

### Add New Route

1. Create directory in `app/(marketing)/`
2. Add `page.tsx` file
3. Import layout components

### Update Site Config

Edit `lib/site.ts` - contains nav, links, contact info

### Update Services/Projects

Edit files in `lib/data/`

### Modify Theme

Edit CSS variables in `app/globals.css`

---

## Performance Considerations

- Components use `"use client"` only when needed (e.g., interactivity)
- Static components are Server Components by default
- Data is imported at build time when possible
- Images use Next.js `Image` component for optimization
- CSS is scoped to components when possible
