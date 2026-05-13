# Architecture & Organization Guide

Visual guide to the modular architecture of the Zeroaxiis project.

## 📊 Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                        App Layer                             │
│                 (Next.js App Router)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Header     │ │   Content    │ │   Footer     │
│  Component   │ │  (Sections)  │ │  Component   │
└──────────────┘ └──────┬───────┘ └──────────────┘
                        │
     ┌──────────────────┼──────────────────┐
     │                  │                  │
     ▼                  ▼                  ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│    Hero     │  │  Features   │  │ Testimonials│
│  Section    │  │  Section    │  │  Section    │
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       ▼                ▼                ▼
   ┌────────┐      ┌─────────┐      ┌──────────┐
   │ Button │      │  Cards  │      │ Carousel │
   │   UI   │      │Component│      │ + Hooks  │
   └────────┘      └─────────┘      └──────────┘
```

## 🎯 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Application                              │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
  │ Static Data  │ │  Constants   │ │ TypeScript   │
  │ (lib/data)   │ │(lib/constants)│ │ Types        │
  └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
         │                 │                │
         │      ┌──────────┼────────────┐   │
         │      │          │            │   │
         ▼      ▼          ▼            ▼   ▼
      ┌──────────────────────────────────────────┐
      │        React Components                   │
      │  (UI, Layout, Sections, Cards)          │
      │              +                            │
      │        Custom Hooks (lib/hooks)          │
      └──────────────────────────────────────────┘
```

## 📁 Directory Structure Tree

```
zeroaxiis/
│
├── app/                          # Next.js Pages & Routes
│   └── (marketing)/             # Route Group
│       ├── page.tsx             # Home
│       ├── blog/
│       ├── projects/
│       ├── team/
│       └── [other pages]
│
├── components/                  # React Components
│   ├── icons/ ✨ NEW
│   │   ├── arrows.tsx           # Arrow icons
│   │   └── index.ts
│   │
│   ├── ui/                      # Base Components
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── shiny-text.tsx
│   │   └── index.ts
│   │
│   ├── layout/                  # Structural Components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── container.tsx
│   │   └── index.ts
│   │
│   ├── sections/                # Page Sections
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── testimonials.tsx
│   │   └── index.ts
│   │
│   ├── cards/                   # Card Components
│   │   ├── project-card.tsx
│   │   ├── team-member-card.tsx
│   │   └── index.ts
│   │
│   └── forms/                   # Form Components
│       ├── contact-form.tsx
│       ├── form-input.tsx
│       └── index.ts
│
├── hooks/ ✨ NEW                # Custom React Hooks
│   ├── useCarouselScroll.ts
│   └── index.ts
│
├── lib/                         # Utilities & Config
│   ├── constants/ ✨ NEW        # Centralized Constants
│   │   ├── ui.ts               # UI styling constants
│   │   ├── layout.ts           # Layout constants
│   │   ├── animations.ts       # Animation config
│   │   └── index.ts
│   │
│   ├── data/                   # Static Data
│   │   ├── services.ts
│   │   ├── projects.ts
│   │   ├── team.ts
│   │   ├── testimonials.ts
│   │   └── index.ts
│   │
│   ├── site.ts                 # Site Configuration
│   ├── utils.ts                # Utilities (cn, formatDate)
│   └── blog.ts                 # Blog Utilities
│
├── types/                      # TypeScript Definitions
│   └── index.ts
│
├── content/                    # Content Files
│   └── blog/
│
├── public/                     # Static Assets
│   └── images/
│
├── 📖 README.md                # Project Overview (Updated)
├── 📖 DIRECTORY.md             # Structure Guide ✨ NEW
├── 📖 DEVELOPMENT.md           # Dev Guide ✨ NEW
├── 📖 CONFIGURATION.md         # Config Guide ✨ NEW
├── 📖 QUICK_REFERENCE.md       # Quick Checklists ✨ NEW
├── 📖 IMPROVEMENTS.md          # This Summary ✨ NEW
│
└── [Config Files]
    ├── tsconfig.json
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── eslint.config.mjs
    └── postcss.config.mjs
```

## 🔄 Import Patterns

### Before (Scattered & Unclear)

```typescript
// ❌ Old way - hardcoded values everywhere
import { Testimonials } from "@/components/sections/testimonials";

// Values scattered in multiple files
const buttonClass = "bg-primary text-on-primary hover:bg-surface-tint";
const spacing = "gap-6";
const animationSpeed = 3;
```

### After (Modular & Clear)

```typescript
// ✅ New way - centralized and organized
import { Testimonials } from "@/components/sections";
import { BUTTON_VARIANTS, SPACING, ANIMATION_SPEEDS } from "@/lib/constants";
import { useCarouselScroll } from "@/hooks";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

// Use constants
const buttonClass = BUTTON_VARIANTS.primary;
const gap = SPACING.lg;
const speed = ANIMATION_SPEEDS.slow;
```

## 🧩 Component Communication Pattern

```
┌────────────────────────────────────────────────────┐
│               Page Component                        │
│             (Server Component)                      │
└───────────────┬────────────────────────────────────┘
                │
    ┌───────────┼───────────┐
    │           │           │
    ▼           ▼           ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Section  │ │ Section  │ │ Section  │
│Component │ │Component │ │Component │
└────┬─────┘ └────┬─────┘ └────┬─────┘
     │            │            │
     ├─ Uses Data from lib/data/
     ├─ Uses Constants from lib/constants/
     ├─ Uses Hooks from hooks/
     └─ Renders UI & Card Components
         │
         ├─ UI Components (Button, Badge, etc.)
         ├─ Card Components (ProjectCard, etc.)
         └─ Icons (SVG icons)
```

## 📊 Constants Organization

```
lib/constants/
│
├── ui.ts
│   ├── BUTTON_VARIANTS         # Button styling
│   ├── BUTTON_SIZES            # Button sizes
│   ├── BUTTON_BASE             # Base button classes
│   ├── CARD_BASE               # Card styling
│   ├── ICON_BASE               # Icon styling
│   ├── SECTION_HEADER          # Header styling
│   ├── GLASS_EFFECT            # Glass effect classes
│   └── GRID_VARIANTS           # Grid configurations
│
├── layout.ts
│   ├── CONTAINER_SIZES         # Container widths
│   ├── SPACING                 # Gap/margin utilities
│   ├── HERO_PADDING            # Hero section padding
│   ├── SECTION_PADDING         # General section padding
│   └── BREAKPOINTS             # Responsive breakpoints
│
├── animations.ts
│   ├── ANIMATION_SPEEDS        # Animation speed presets
│   ├── SHINY_TEXT_CONFIG       # Shiny text settings
│   ├── CAROUSEL_CONFIG         # Carousel settings
│   └── TRANSITION_DURATION     # Tailwind transitions
│
└── index.ts
    └── Re-exports all constants
```

## 🪝 Custom Hooks Architecture

```
hooks/
│
├── useCarouselScroll.ts
│   ├── Input: options (cardWidth, gap)
│   ├── Returns:
│   │   ├── carouselRef (useRef)
│   │   └── scroll function
│   └── Usage: Testimonials, any carousel
│
└── index.ts
    └── Re-exports all hooks
```

## 📦 Data Architecture

```
lib/data/
│
├── services.ts
│   └── services: Service[]
│
├── projects.ts
│   ├── projects: Project[]
│   └── openSourceTools: OpenSourceTool[]
│
├── team.ts
│   ├── teamMembers: TeamMember[]
│   └── contactItems: ContactItem[]
│
├── testimonials.ts
│   └── testimonials: Testimonial[]
│
├── workflow.ts
│   └── workflowSteps: WorkflowStep[]
│
└── index.ts
    └── Re-exports all data
        └── Also re-exports related types from types/index.ts
```

## 🔗 Type System

```
types/index.ts
│
├── BlogPost
├── Service
├── Project
├── OpenSourceTool
├── TeamMember
├── ContactItem
├── Testimonial
├── WorkflowStep
└── [Other types]

Used by:
├── Components (as prop interfaces)
├── Data files (array type definitions)
└── Imported wherever types are needed
```

## 🎨 Styling Architecture

```
CSS Hierarchy:
│
├── Global Styles (app/globals.css)
│   ├── @theme (CSS Variables)
│   ├── Typography
│   └── Layout utilities
│
├── Tailwind CSS (config in postcss.config.mjs)
│   ├── Utility classes
│   └── Custom components
│
└── Component Inline Classes
    └── Styled with Tailwind utilities
        (No CSS-in-JS, no separate .css files)

Constants Bridge:
└── lib/constants/ui.ts
    └── Predefined class combinations
        ├── BUTTON_VARIANTS
        ├── CARD_BASE
        └── [Other class sets]
```

## 📄 Import Priority

```
1. External Dependencies
   ├── React
   ├── Next.js
   └── Third-party libraries

2. Internal Components & Types
   ├── Components (from @/components)
   ├── Types (from @/types)
   └── Hooks (from @/hooks)

3. Utilities & Constants
   ├── Utils (from @/lib/utils)
   ├── Constants (from @/lib/constants)
   └── Data (from @/lib/data)

4. Configuration
   └── Site config (from @/lib/site)
```

## 🚀 Developer Workflow

```
Developer Opens Project
│
├─ Reads QUICK_REFERENCE.md (for quick tasks)
├─ Reads DIRECTORY.md (to understand structure)
├─ Reads DEVELOPMENT.md (for setup and patterns)
└─ Reads CONFIGURATION.md (to customize)
│
Then:
├─ Find relevant constants in lib/constants/
├─ Extract logic to custom hooks if needed
├─ Use existing components or create new ones
├─ Follow patterns from existing code
└─ Reference documentation as needed
```

## 📈 Scalability Path

```
Current State (MVP)
│
├─ UI Components (basic)
├─ Section Components (page sections)
├─ Simple Data structure
└─ Basic styling
│
├─ Add Feature
│   ├─ Create new data file in lib/data/
│   ├─ Create component(s) for display
│   ├─ Add constants to lib/constants/ if needed
│   ├─ Extract logic to hook if reusable
│   └─ Update documentation
│
└─ Scale to Large Project
    ├─ More granular component organization
    ├─ Expanded constants system
    ├─ More specialized hooks
    ├─ Possibly add state management (if needed)
    └─ More comprehensive documentation
```

## 🎯 Design Principles Applied

1. **Modularity** - Each part is independent and reusable
2. **Single Responsibility** - Each file/component has one job
3. **DRY (Don't Repeat Yourself)** - Constants prevent duplication
4. **Clear Naming** - Purpose is obvious from naming
5. **Type Safety** - TypeScript throughout
6. **Accessibility** - Semantic HTML and ARIA
7. **Performance** - Server components by default
8. **Maintainability** - Clear structure and documentation

---

This architecture provides a strong foundation for building, scaling, and maintaining a modern web application.
