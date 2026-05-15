# Zeroaxiis

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Clone & install
git clone https://github.com/zeroaxiis/zeroaxiis.git
cd zeroaxiis
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Create production build
npm start        # Run production build
npm run lint     # Run ESLint
npm run lint --fix   # Fix linting issues
```

---

## 📚 Documentation

### Project Overview

- **[README.md](README.md)** - This file, project overview
- **[DIRECTORY.md](DIRECTORY.md)** - Complete directory structure guide
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Developer setup & workflow guide

### Quick Links

Start with what you need:

1. **Understanding the structure?** → Read [DIRECTORY.md](DIRECTORY.md)
2. **Setting up development?** → Read [DEVELOPMENT.md](DEVELOPMENT.md)
3. **Need to modify something?** → See [Common Tasks](#common-tasks) below

---

## 🏗️ Tech Stack

| Layer          | Technology             | Version      |
| -------------- | ---------------------- | ------------ |
| **Framework**  | Next.js (App Router)   | 16.1.1       |
| **UI Library** | React                  | 19.2.3       |
| **Styling**    | Tailwind CSS + PostCSS | 4.0          |
| **Language**   | TypeScript             | 5.0          |
| **Animation**  | GSAP + Motion          | 3.15 + 12.38 |
| **Linting**    | ESLint                 | 9.0          |

---

## 📁 Project Structure

```
zeroaxiis/
├── app/                    # Next.js pages & layouts
│   └── (marketing)/        # Marketing pages
├── components/             # React components (UI, sections, cards)
│   ├── ui/                 # Base components (button, badge, etc.)
│   ├── layout/             # Layout components (header, footer)
│   ├── sections/           # Page sections (hero, features)
│   ├── cards/              # Card components (project, team)
│   ├── forms/              # Form components
│   ├── icons/              # Icon components
│   └── index.ts            # Barrel exports
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities & configuration
│   ├── constants/          # Constants (UI, layout, animations)
│   ├── data/               # Static data (services, projects, team)
│   ├── site.ts             # Site configuration
│   ├── utils.ts            # Helper functions
│   └── blog.ts             # Blog utilities
├── types/                  # TypeScript type definitions
├── content/                # Content files (markdown, MDX)
├── public/                 # Static assets
├── DIRECTORY.md            # 📖 Full structure guide
├── DEVELOPMENT.md          # 👨‍💻 Developer guide
└── [Config files]          # TypeScript, ESLint, Tailwind
```

**→ See [DIRECTORY.md](DIRECTORY.md) for detailed explanation of each directory**

---

## 🎨 Component Architecture

The codebase is organized by component type (atomic design influenced):

```
Icons (SVG)
    ↓
UI Components (Button, Badge, Input)
    ↓
Layout Components (Header, Footer, Container)
    ↓
Card Components (ProjectCard, TeamCard)
    ↓
Section Components (Hero, Features, Testimonials)
    ↓
Pages (home, projects, team, blog)
```

**Component Guidelines:**

- Each component has a single responsibility
- Props are typed with TypeScript interfaces
- Styling uses Tailwind CSS utility classes
- Complex logic extracted into custom hooks
- All exports use barrel pattern (via `index.ts`)

---

## ⚙️ Configuration

### Site Configuration

Edit `lib/site.ts` to customize:

```ts
export const siteConfig = {
  name: "zeroaxiis",
  tagline: "Your tagline",
  description: "Your description",
  nav: [
    { label: "Services", href: "#services" },
    // Add navigation items
  ],
  links: {
    twitter: "https://twitter.com/zeroaxiis",
    // Add social links
  },
};
```

### Theme & Colors

Edit CSS variables in `app/globals.css`:

```css
@theme {
  --color-primary: #2f3131;
  --color-secondary: #757575;
  --font-family-display: "Inter", sans-serif;
  /* Update theme tokens */
}
```

### Layout Constants

Centralized in `lib/constants/layout.ts`:

```ts
export const SPACING = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  // Use in components
};
```

---

## 🚀 Common Tasks

### Add a New Page

1. Create directory in `app/(marketing)/your-page/`
2. Add `page.tsx` file
3. Import layout components (Header, Footer)

```tsx
// app/(marketing)/your-page/page.tsx
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function YourPage() {
  return (
    <>
      <Header />
      <main>{/* Your content */}</main>
      <Footer />
    </>
  );
}
```

### Add a Service

Edit `lib/data/services.ts`:

```ts
export const services: Service[] = [
  {
    icon: "terminal",
    title: "Service Name",
    description: "Service description",
  },
  // ... automatically rendered by Features section
];
```

### Add a Team Member

Edit `lib/data/team.ts`:

```ts
export const teamMembers: TeamMember[] = [
  {
    name: "Name",
    role: "Role",
    description: "Bio",
    image: "https://...",
    // ... automatically rendered in Team section
  },
];
```

### Create a Custom Hook

1. Create `hooks/useMyHook.ts`
2. Export from `hooks/index.ts`
3. Use in components

```tsx
// hooks/useMyHook.ts
export function useMyHook() {
  // Hook logic
  return {
    /* return value */
  };
}

// Use in component
import { useMyHook } from "@/hooks";
```

### Add New Constants

1. Add to `lib/constants/ui.ts`, `layout.ts`, or `animations.ts`
2. Export from `lib/constants/index.ts`
3. Import and use in components

```ts
// lib/constants/ui.ts
export const MY_BUTTON_CLASS = "px-4 py-2 rounded";

// In component
import { MY_BUTTON_CLASS } from "@/lib/constants";
```

---

## 📋 Code Quality

### Type Safety

This project uses **strict TypeScript** for safety:

```tsx
// ✅ Good
interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
}

// ❌ Avoid
function Button(props: any) {}
```

### Linting

```bash
# Check for linting errors
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

### Type Checking

```bash
# Check types without building
npx tsc --noEmit
```

---

## 🎯 Best Practices

1. **Modular Components** - Each component has one responsibility
2. **Type Safety** - No `any` types; use TypeScript fully
3. **Reusability** - Extract common patterns into hooks/components
4. **Constants** - Use centralized constants, avoid magic values
5. **Naming** - Follow conventions (PascalCase components, camelCase functions)
6. **Accessibility** - Semantic HTML and ARIA attributes
7. **Performance** - Use `"use client"` only when needed
8. **Responsive** - Mobile-first design with Tailwind breakpoints

---

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 📖 More Information

- **Structure questions?** → See [DIRECTORY.md](DIRECTORY.md)
- **Development help?** → See [DEVELOPMENT.md](DEVELOPMENT.md)
- **Component examples?** → Check `components/` folder
- **Data formats?** → Check `types/index.ts`

---

## 🔗 Useful Commands

```bash
# Development
npm run dev           # Start dev server
npm run build         # Build for production
npm start             # Run production build

# Code Quality
npm run lint          # Run linter
npm run lint --fix    # Auto-fix issues

# Type Checking
npx tsc --noEmit      # Check types
```

---

## 📝 License

This project is maintained by the Zeroaxiis team.

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes with clear commits
3. Push and create a Pull Request
4. Ensure linting and types pass

For detailed development guidelines, see [DEVELOPMENT.md](DEVELOPMENT.md)
