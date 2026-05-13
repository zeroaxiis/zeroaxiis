# Quick Reference Checklist

Quick checklists for common development tasks in the Zeroaxiis project.

## 🚀 Starting Development

- [ ] Clone repository: `git clone https://github.com/zeroaxiis/zeroaxiis.git`
- [ ] Install dependencies: `npm install`
- [ ] Start dev server: `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Read [DIRECTORY.md](DIRECTORY.md) to understand structure

## 📝 Adding a New Service

- [ ] Edit `lib/data/services.ts`
- [ ] Add new entry to `services` array:
  ```typescript
  {
    icon: "icon_name",        // Material Symbol icon
    title: "Service Title",
    description: "Description...",
  }
  ```
- [ ] Component auto-renders in Features section
- [ ] No additional component changes needed

## 👥 Adding a Team Member

- [ ] Edit `lib/data/team.ts`
- [ ] Add new entry to `teamMembers` array:
  ```typescript
  {
    name: "Name",
    role: "Role",
    description: "Bio...",
    image: "https://...",
    imageAlt: "Name",
    icon: "icon_name",
    socialLinks: [
      { label: "GitHub", href: "https://..." }
    ],
  }
  ```
- [ ] Team page auto-updates

## 🎯 Adding a Project

- [ ] Edit `lib/data/projects.ts`
- [ ] Add new entry to `projects` array:
  ```typescript
  {
    title: "Project Name",
    description: "Description...",
    tags: ["React", "TypeScript"],
    image: "https://...",
    imageAlt: "Description",
  }
  ```
- [ ] Projects page auto-updates

## 💬 Adding a Testimonial

- [ ] Edit `lib/data/testimonials.ts`
- [ ] Add new entry:
  ```typescript
  {
    name: "Client Name",
    title: "Title",
    company: "Company",
    location: "City",
    quote: "Quote...",
    tag: "Tag",
    avatar: "https://...",
  }
  ```

## 🎨 Updating Site Configuration

- [ ] Edit `lib/site.ts` for:
  - [ ] Site name and tagline
  - [ ] Navigation links
  - [ ] Social media links
  - [ ] Email and address

## 🎭 Customizing Theme Colors

- [ ] Edit `app/globals.css`
- [ ] Find `@theme` block
- [ ] Update colors:
  ```css
  --color-primary: #your-color;
  --color-on-surface: #your-text-color;
  /* ... other colors */
  ```
- [ ] Restart dev server to see changes

## 📄 Creating a New Page

- [ ] Create directory: `app/(marketing)/new-page/`
- [ ] Create `page.tsx` with:

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

- [ ] Route available at `/new-page`

## 🧩 Creating a New Component

- [ ] Determine type: UI / Section / Card
- [ ] Create file in appropriate directory
- [ ] Add TypeScript interface for props
- [ ] Implement component
- [ ] Export from `index.ts` in directory
- [ ] Import and use in pages/components

```tsx
// components/ui/my-component.tsx
"use client"; // Only if interactive

interface MyComponentProps {
  variant?: "primary" | "secondary";
}

export function MyComponent({ variant = "primary" }: MyComponentProps) {
  return <div>{/* Component */}</div>;
}
```

## 🪝 Creating a Custom Hook

- [ ] Create file: `hooks/useMyHook.ts`
- [ ] Implement hook logic
- [ ] Export from `hooks/index.ts`
- [ ] Use in components:

```typescript
// hooks/useMyHook.ts
export function useMyHook() {
  // Logic here
  return {
    /* return value */
  };
}

// In component
import { useMyHook } from "@/hooks";
```

## 🔧 Adding Constants

- [ ] Add to `lib/constants/ui.ts`, `layout.ts`, or `animations.ts`
- [ ] Export from `lib/constants/index.ts`
- [ ] Use in components:

```typescript
import { MY_CONSTANT } from "@/lib/constants";
```

## 🧪 Quality Checks

Before committing:

- [ ] Run linter: `npm run lint`
- [ ] Check types: `npx tsc --noEmit`
- [ ] Manual testing in browser
- [ ] Responsive design check (mobile/tablet/desktop)
- [ ] Links work correctly
- [ ] Images load properly

## 🐛 Debugging

- [ ] Check browser console for errors
- [ ] Use React DevTools extension
- [ ] Check Network tab for failed requests
- [ ] Verify component props with TypeScript

## 📦 Build & Deploy

- [ ] Run build: `npm run build`
- [ ] Check for errors
- [ ] Test production build: `npm start`
- [ ] Deploy to Vercel or custom server

## 📋 Git Workflow

- [ ] Create feature branch: `git checkout -b feature/name`
- [ ] Make changes with clear commits
- [ ] Push: `git push origin feature/name`
- [ ] Create pull request
- [ ] Ensure CI passes
- [ ] Merge when approved

## 🔗 Important Files Reference

| Task          | File                       |
| ------------- | -------------------------- |
| Site config   | `lib/site.ts`              |
| Theme colors  | `app/globals.css`          |
| Services data | `lib/data/services.ts`     |
| Projects data | `lib/data/projects.ts`     |
| Team data     | `lib/data/team.ts`         |
| Testimonials  | `lib/data/testimonials.ts` |
| Types         | `types/index.ts`           |
| Constants     | `lib/constants/`           |

## 📚 Documentation Files

- **[README.md](README.md)** - Project overview
- **[DIRECTORY.md](DIRECTORY.md)** - Folder structure & organization
- **[DEVELOPMENT.md](DEVELOPMENT.md)** - Development workflow & best practices
- **[CONFIGURATION.md](CONFIGURATION.md)** - How to configure everything

## ⚡ Common Commands

```bash
npm run dev           # Start dev server
npm run build         # Build for production
npm start             # Run production build
npm run lint          # Check linting
npm run lint -- --fix # Fix linting issues
npx tsc --noEmit      # Type check
```

## 🆘 Need Help?

1. Check [DIRECTORY.md](DIRECTORY.md) - Understand the structure
2. Check [DEVELOPMENT.md](DEVELOPMENT.md) - Development guidance
3. Check [CONFIGURATION.md](CONFIGURATION.md) - Configuration help
4. Review existing components for patterns
5. Check git history for similar implementations

## ✅ Pre-Commit Checklist

- [ ] Code is TypeScript strict compliant
- [ ] Components are exported from index.ts
- [ ] No unused imports
- [ ] Props are typed
- [ ] No console.log() left in code
- [ ] Images have alt text
- [ ] Links are accessible
- [ ] Tests pass (if applicable)
- [ ] Build succeeds: `npm run build`
- [ ] Linter passes: `npm run lint`

---

**Last Updated**: 2024
