# Development Guide

Complete guide for developing and maintaining the Zeroaxiis project.

## Table of Contents

1. [Setup](#setup)
2. [Development Workflow](#development-workflow)
3. [Component Development](#component-development)
4. [Styling](#styling)
5. [Code Organization](#code-organization)
6. [Git Workflow](#git-workflow)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)

---

## Setup

### Prerequisites

- Node.js 18+ (check with `node --version`)
- npm 9+ (check with `npm --version`)

### Initial Setup

```bash
# Clone repository
git clone https://github.com/zeroaxiis/zeroaxiis.git
cd zeroaxiis

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Setup

Currently uses only public configuration in `lib/site.ts`. No `.env` file needed.

---

## Development Workflow

### Starting Development

```bash
# Start dev server with hot-reload
npm run dev

# Run type checking
npx tsc --noEmit

# Run linting
npm run lint

# Run linting with fix
npm run lint --fix
```

### Development Commands

| Command         | Purpose                           |
| --------------- | --------------------------------- |
| `npm run dev`   | Start dev server (localhost:3000) |
| `npm run build` | Production build                  |
| `npm start`     | Run production build              |
| `npm run lint`  | Check for linting errors          |

---

## Component Development

### Creating a New Component

#### Step 1: Determine Component Type

- **UI Component** - Base element (button, badge, input)
- **Section Component** - Full-width page section
- **Card Component** - Composite display component
- **Layout Component** - Structural element
- **Icon** - SVG icon component

#### Step 2: Create Component File

```tsx
// components/ui/my-component.tsx
"use client"; // Only if interactive

import React from "react";
import { cn } from "@/lib/utils";

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export function MyComponent({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: MyComponentProps) {
  return (
    <div className={cn("base-styles", className)} {...props}>
      {children}
    </div>
  );
}
```

#### Step 3: Export from Directory Index

```tsx
// components/ui/index.ts
export { MyComponent } from "./my-component";
```

#### Step 4: Use in Pages/Sections

```tsx
import { MyComponent } from "@/components/ui";

export function MySection() {
  return <MyComponent variant="primary" />;
}
```

### Component Best Practices

1. **Props Interface**

   ```tsx
   interface MyComponentProps {
     // Always be explicit
     variant?: "primary" | "secondary";
     disabled?: boolean;
   }
   ```

2. **Use Utilities**

   ```tsx
   import { cn } from "@/lib/utils";

   const classes = cn(
     "base-class",
     variant === "primary" && "primary-class",
     className,
   );
   ```

3. **Destructuring**

   ```tsx
   // Extract commonly used props
   const { children, className, ...props } = componentProps;
   ```

4. **Type Safety**
   ```tsx
   // Use TypeScript types, avoid 'any'
   const element = ref.current as HTMLDivElement;
   ```

---

## Styling

### Design Tokens

Located in `app/globals.css`, uses CSS custom properties (variables):

```css
@theme {
  /* Colors */
  --color-primary: #2f3131;
  --color-on-primary: #ffffff;

  /* Typography */
  --font-family-display: "Inter", sans-serif;
  --font-size-headline-lg: 2rem;
}
```

### Using Tailwind CSS

```tsx
// ✅ Good: Use Tailwind utilities
<div className="flex gap-4 p-6 rounded-lg bg-surface">
  <button className="px-4 py-2 bg-primary text-white rounded">
    Click me
  </button>
</div>

// ❌ Avoid: Inline styles or custom CSS
<div style={{ display: "flex", gap: "16px" }}>
```

### Responsive Design

```tsx
// Mobile-first approach
<div className="
  w-full                    /* Mobile default */
  md:w-1/2                  /* Tablet and up */
  lg:w-1/3                  /* Desktop and up */
  gap-4 md:gap-6 lg:gap-8   /* Responsive gaps */
">
```

### Common Utilities

```tsx
// Container
<div className="max-w-container-max mx-auto px-gutter">

// Spacing
<div className="flex gap-6">
<section className="py-16">

// Gradients
<div className="bg-gradient-to-r from-primary to-blue-600">

// Borders
<div className="border border-outline-variant/30">

// Shadows
<div className="shadow-lg">

// Animations
<div className="transition-all duration-300 hover:scale-105">
```

### CSS Classes Structure

```tsx
// Group related classes with comments
export function Card({ children }: Props) {
  return (
    <div
      className={cn(
        // Layout
        "flex flex-col h-full",
        // Spacing
        "p-8",
        // Colors
        "bg-surface border border-outline-variant/30",
        // Interactive
        "hover:bg-surface-layer-raised transition-all duration-300",
      )}
    >
      {children}
    </div>
  );
}
```

---

## Code Organization

### Import Order

```tsx
// 1. External dependencies
import React, { useState } from "react";
import Image from "next/image";

// 2. Internal components
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";

// 3. Hooks
import { useCarouselScroll } from "@/hooks";

// 4. Utilities
import { cn } from "@/lib/utils";

// 5. Types
import type { Project } from "@/types";

// 6. Data
import { projects } from "@/lib/data";
```

### File Organization

```tsx
// Component template
"use client";

import React from "react";
import type { ReactNode } from "react";

// Type definitions (if local)
interface MyComponentProps {
  children: ReactNode;
}

// Component
export function MyComponent({ children }: MyComponentProps) {
  return <div>{children}</div>;
}

// Exports at end (if multiple)
export { MyComponent };
export type { MyComponentProps };
```

### Barrel Export Pattern

```tsx
// components/ui/index.ts
export { Button } from "./button";
export { Badge } from "./badge";
export type { ButtonProps } from "./button";
```

---

## Git Workflow

### Branching

```bash
# Create feature branch
git checkout -b feature/component-name

# Create bugfix branch
git checkout -b fix/issue-description

# Create documentation branch
git checkout -b docs/guide-name
```

### Committing

```bash
# Good commit messages
git commit -m "feat: add carousel scroll hook"
git commit -m "fix: button hover state in dark mode"
git commit -m "docs: update setup guide"
git commit -m "style: format testimonials component"

# Follow conventional commits:
# feat: new feature
# fix: bug fix
# docs: documentation
# style: formatting
# refactor: code reorganization
# perf: performance improvement
# test: test addition/modification
```

### Pull Request Process

1. Create feature branch from `main`
2. Make changes with clear commits
3. Push to remote and create PR
4. Ensure CI passes (ESLint, TypeScript)
5. Request review
6. Merge when approved

---

## Common Tasks

### Add a New Service

1. Edit `lib/data/services.ts`:

   ```tsx
   export const services: Service[] = [
     // ... existing
     {
       icon: "new_icon",
       title: "New Service",
       description: "Service description...",
     },
   ];
   ```

2. Component automatically picks it up:
   ```tsx
   // components/sections/features.tsx already maps over services
   ```

### Add a Team Member

1. Edit `lib/data/team.ts`:
   ```tsx
   export const teamMembers: TeamMember[] = [
     // ... existing
     {
       name: "John Doe",
       role: "Role",
       description: "Bio...",
       image: "https://...",
       // ...
     },
   ];
   ```

### Add a New Blog Post

1. Create in `lib/data/testimonials.ts` or blog system
2. Add to appropriate data file
3. Component renders automatically

### Update Site Configuration

Edit `lib/site.ts`:

```tsx
export const siteConfig = {
  name: "zeroaxiis",
  tagline: "Updated tagline",
  nav: [
    // Update navigation items
  ],
  // Update links, email, address, etc.
};
```

### Add New Route

1. Create directory in `app/(marketing)/`:

   ```
   app/(marketing)/new-page/
   └── page.tsx
   ```

2. Create `page.tsx`:

   ```tsx
   import { Header } from "@/components/layout/header";
   import { Footer } from "@/components/layout/footer";

   export default function NewPage() {
     return (
       <>
         <Header />
         <main>{/* Content */}</main>
         <Footer />
       </>
     );
   }
   ```

### Modify Theme Colors

Edit `app/globals.css`:

```css
@theme {
  --color-primary: #new-color;
  --color-secondary: #another-color;
  /* Update other tokens */
}
```

### Create New Constants

1. Add to appropriate file in `lib/constants/`:

   ```tsx
   export const MY_CONSTANT = {
     option1: "value",
     option2: "value",
   } as const;
   ```

2. Export from `lib/constants/index.ts`:
   ```tsx
   export * from "./my-file";
   ```

---

## Troubleshooting

### Dev Server Issues

**Port already in use:**

```bash
# Use different port
npm run dev -- -p 3001

# Or kill process on port 3000
lsof -i :3000  # Get PID
kill -9 PID
```

**Build errors:**

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Type Errors

**"Cannot find module":**

```bash
# Check tsconfig.json paths
# Ensure path aliases match imports
# Check file exists at path

# Run type check
npx tsc --noEmit
```

**"Type is not assignable":**

```tsx
// Check prop types match component interface
// Use `as` for type assertions carefully
const element = ref.current as HTMLDivElement;
```

### Import Issues

**Module not found:**

```bash
# Clear node_modules
rm -rf node_modules
npm install

# Restart dev server
npm run dev
```

**Circular dependencies:**

- Restructure imports
- Move shared code to utils
- Use proper index.ts barrel exports

### Performance

**Slow build:**

- Check for large imports
- Use dynamic imports for heavy components
- Run `npm run build` to check bundle size

**Runtime slowdown:**

- Profile with React DevTools
- Check for unnecessary re-renders
- Memoize expensive computations

### ESLint Issues

```bash
# Fix automatically
npm run lint -- --fix

# Or manually fix linting errors
npm run lint
```

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [ESLint](https://eslint.org/docs/latest)

---

## Questions?

- Check `DIRECTORY.md` for structure questions
- Check `README.md` for project overview
- Review existing components for patterns
- Check git history for similar implementations
