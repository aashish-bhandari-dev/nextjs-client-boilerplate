# Next.js Client Boilerplate (ClientHub)

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Base--Nova-black)](https://ui.shadcn.com/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-orange)](https://turbo.build/pack)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A production-ready, performant, enterprise-grade client boilerplate built with **Next.js 16 (App Router & Turbopack)**, **React 19**, **Tailwind CSS v4**, **TypeScript**, and **shadcn UI (Base UI primitives)**. Designed from the ground up for modern marketing landing pages, customer-facing portals, SaaS web apps, and high-performance digital experiences.

Pairs seamlessly with [**nextjs-admin-boilerplate**](https://github.com/aashish-bhandari-dev/nextjs-admin-boilerplate) for unified enterprise design systems.

---

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture & Design System](#architecture--design-system)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Running the Application](#running-the-application)
- [Component Library & UI Primitives](#component-library--ui-primitives)
- [Theming & Dark Mode](#theming--dark-mode)
- [Available Scripts](#available-scripts)
- [License](#license)

---

## Key Features

### 🚀 Modern Architecture

- **Next.js 16 App Router & Turbopack**: High-velocity local development and optimized production bundling.
- **React 19 Foundation**: Full compatibility with React Server Components (RSC), asynchronous actions, and streaming hydration.
- **Tailwind CSS v4 & OKLCH**: Modern styling using pure CSS `@theme inline` variables, wide-gamut OKLCH palettes, and zero config overhead.

### 🎨 Modular & Reusable UI

- **shadcn UI & Base UI Primitives**: 16+ accessible, composable atomic components (`button`, `card`, `dialog`, `dropdown-menu`, `input`, `avatar`, `toaster`, `tooltip`, `table`, etc.).
- **Interactive Home Page Layout**:
  - **Announcement Banner**: Dismissible release notice on top of navigation.
  - **Header / Navbar**: Sticky blurred backdrop, dropdown menus with icon lists, quick search trigger, GitHub star badge, theme toggle, and responsive mobile drawer.
  - **Hero Section**: High-converting typography, CTA links, instant terminal clone snippet with copy-to-clipboard, and live preview card.
  - **Stats Section**: Performance and operational metrics cards.
  - **Features Grid**: Filterable category cards with icons and highlight checklists.
  - **Interactive Component Showcase**: Live, interactive test widgets for buttons, inputs, switches, dropdowns, and toast notifications.
  - **How It Works**: Step-by-step developer onboarding with code snippets.
  - **Testimonials Grid**: Developer reviews, star ratings, and avatars.
  - **Pricing Section**: Tiered cards with monthly/yearly billing switcher.
  - **FAQ Section**: Expandable accordion disclosure items.
  - **CTA Banner**: Radiant glow call-to-action banner.
  - **Footer**: Newsletter subscription box with real-time feedback, link directories, live status pill, and social links.

### 🌓 Complete Theme Engine

- **Zero-Flash Theme System**: `ThemeProvider` supporting System, Light, and Dark modes via `useSyncExternalStore` for clean SSR hydration.
- **Animated Theme Toggle**: Dropdown selector with Sun, Moon, and System options.

---

## Tech Stack

| Layer                    | Technology                                                                                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| **Framework**            | [Next.js 16](https://nextjs.org/) (App Router, Turbopack)                                                   |
| **Library**              | [React 19](https://react.dev/)                                                                              |
| **Language**             | [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)                                               |
| **Styling**              | [Tailwind CSS v4](https://tailwindcss.com/), [tw-animate-css](https://www.npmjs.com/package/tw-animate-css) |
| **Component Primitives** | [Base UI](https://base-ui.com/), [shadcn UI](https://ui.shadcn.com/) (base-nova)                            |
| **State & Storage**      | [Zustand 5](https://zustand.docs.pmnd.rs/), [js-cookie](https://github.com/js-cookie/js-cookie)             |
| **Icons**                | [Lucide React](https://lucide.dev/)                                                                         |
| **Code Quality**         | ESLint 9, Prettier                                                                                          |

---

## Directory Structure

```text
├── app/
│   ├── favicon.ico                   # Application favicon
│   ├── globals.css                   # Tailwind CSS v4 variables & OKLCH tokens
│   ├── layout.tsx                    # Root HTML layout with fonts & ThemeProvider
│   └── page.tsx                      # Primary home page composing ClientLayout & HomeView
├── components/
│   ├── home/                         # Domain home page sections
│   │   ├── component-showcase-section.tsx
│   │   ├── cta-section.tsx
│   │   ├── faq-section.tsx
│   │   ├── features-section.tsx
│   │   ├── hero-section.tsx
│   │   ├── home-view.tsx             # Master view orchestrating all sections
│   │   ├── how-it-works-section.tsx
│   │   ├── pricing-section.tsx
│   │   ├── stats-section.tsx
│   │   ├── testimonials-section.tsx
│   │   └── index.ts
│   ├── icons/                        # Custom SVG brand icons (GitHub, Twitter/X)
│   ├── layout/                       # Reusable shell layout components
│   │   ├── announcement-banner.tsx   # Top banner notification
│   │   ├── client-layout.tsx         # Master layout wrapper (Header + Main + Footer)
│   │   ├── footer.tsx                # Reusable multi-column footer with newsletter
│   │   ├── navbar.tsx                # Responsive sticky header with navigation
│   │   └── index.ts
│   ├── theme/                        # Theme system
│   │   ├── theme-provider.tsx        # React 19 useSyncExternalStore provider
│   │   ├── theme-toggle.tsx          # Animated sun/moon dropdown trigger
│   │   └── index.ts
│   └── ui/                           # Atomic shadcn UI primitives (16+ components)
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── date-picker.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── separator.tsx
│       ├── sidebar.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── toaster.tsx
│       └── tooltip.tsx
├── config/
│   └── site.ts                       # Centralized site configuration & navigation links
├── hooks/
│   └── use-mobile.ts                 # Responsive mobile breakpoint detection
├── lib/
│   └── utils.ts                      # Class merging (cn) helper
├── store/
│   ├── index.ts                      # Zustand state stores
│   └── sidebar.store.ts              # Persistent sidebar store
├── types/
│   └── index.ts                      # TypeScript definitions (Nav, Feature, Stats, etc.)
├── components.json                   # shadcn UI CLI configuration
├── next.config.ts                    # Next.js standalone output & API proxy rewrites
└── package.json                      # Project dependencies & scripts
```

---

## Getting Started

### Prerequisites

- **Node.js**: `v20.x` or `v22.x+`
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aashish-bhandari-dev/nextjs-client-boilerplate.git
   cd nextjs-client-boilerplate
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```

### Running the Application

Start the local development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Component Library & UI Primitives

All UI primitives in `components/ui/` are built on `@base-ui/react` and styled with Tailwind CSS v4:

- **Button**: 6 variants (`default`, `secondary`, `outline`, `ghost`, `destructive`, `link`) and 8 sizes.
- **Card**: Full layout cards (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
- **Toaster & toast**: Global toast dispatcher with `toast({ title, description, type })`.
- **DropdownMenu**: Accessible popup menus with items, groups, separators, and shortcuts.
- **Dialog & Popover**: Accessible modal dialogues and floating panels.
- **Form Elements**: Accessible `Input`, `Label`, `Switch`, and `Checkbox`.

---

## Available Scripts

| Script                 | Description                                  |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Starts the development server with Turbopack |
| `npm run build`        | Builds the optimized production bundle       |
| `npm run start`        | Starts the production server                 |
| `npm run lint`         | Runs ESLint 9 checks across all files        |
| `npm run format`       | Formats all code with Prettier               |
| `npm run format:check` | Verifies code formatting compliance          |

---

## License

MIT © [ClientHub](LICENSE)
