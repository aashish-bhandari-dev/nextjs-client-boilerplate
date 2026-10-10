"use client";

import * as React from "react";
import {
  CheckCircle2,
  Code2,
  Database,
  Layers,
  Lock,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Feature {
  id: string;
  category: "all" | "auth" | "frontend" | "architecture";
  title: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  highlights: string[];
}

const features: Feature[] = [
  {
    id: "auth",
    category: "auth",
    title: "Complete Authentication Flow",
    description:
      "Full authentication suite out-of-the-box: Sign in, registration, email OTP verification, password reset, and route protection.",
    icon: Lock,
    badge: "Authentication",
    highlights: [
      "Access & refresh token cookie management",
      "Interactive 6-digit OTP email verification",
      "Password reset and recovery flow",
    ],
  },
  {
    id: "components",
    category: "frontend",
    title: "Modular UI Component Library",
    description:
      "Comprehensive set of accessible, responsive, and customizable components styled with Tailwind CSS for fast UI construction.",
    icon: Palette,
    badge: "Components",
    highlights: [
      "Buttons, inputs, dropdowns, and dialogs",
      "Accessible keyboard navigation support",
      "Consistent typography and spacing tokens",
    ],
  },
  {
    id: "state",
    category: "architecture",
    title: "Zustand State Management",
    description:
      "Lightweight, reactive global store with local storage persistence, cookie synchronization, and seamless hydration handling.",
    icon: Layers,
    badge: "State Store",
    highlights: [
      "Synchronized session cookie storage",
      "Persistent user state across reloads",
      "Modular, easy-to-extend store slices",
    ],
  },
  {
    id: "api",
    category: "architecture",
    title: "Client & Server API Layer",
    description:
      "Pre-configured Axios client and Next.js server fetch wrapper with bearer token injection, request caching, and error formatting.",
    icon: Database,
    badge: "API Layer",
    highlights: [
      "Automatic token attachment on requests",
      "In-flight request deduplication & TTL cache",
      "Standardized error parsing utility",
    ],
  },
  {
    id: "theme",
    category: "frontend",
    title: "Theme Provider & Dark Mode",
    description:
      "Seamless dark and light theme switching with system detection, localStorage persistence, and no flash of unstyled content.",
    icon: Zap,
    badge: "Theming",
    highlights: [
      "System preference auto-detection",
      "Instant theme toggle in navigation",
      "Tailwind CSS v4 variable tokens",
    ],
  },
  {
    id: "dx",
    category: "architecture",
    title: "TypeScript & Production Ready",
    description:
      "End-to-end type safety, strict TypeScript configuration, and Next.js App Router best practices ready for production.",
    icon: Code2,
    badge: "Architecture",
    highlights: [
      "Strict TypeScript types for models and APIs",
      "Next.js App Router layout composition",
      "Linted and optimized build pipeline",
    ],
  },
];

export function FeaturesSection() {
  const [activeCategory, setActiveCategory] = React.useState<
    "all" | "auth" | "frontend" | "architecture"
  >("all");

  const filteredFeatures =
    activeCategory === "all"
      ? features
      : features.filter((f) => f.category === activeCategory);

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <Badge
            variant="outline"
            className="text-xs px-3 py-1 text-primary border-primary/30"
          >
            <Sparkles className="size-3 mr-1 inline" /> Built For Any Web Project
          </Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Everything You Need To Build Modern Apps
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            A solid, extensible foundation with authentication, responsive layouts,
            API integrations, and modern state management ready to deploy.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Features" },
              { id: "auth", label: "Auth & Security" },
              { id: "frontend", label: "UI & Components" },
              { id: "architecture", label: "State & Architecture" },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeCategory === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setActiveCategory(tab.id as typeof activeCategory)
                }
                className="rounded-full text-xs cursor-pointer transition-all"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                className="group relative overflow-hidden border-border/70 bg-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/40"
              >
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-medium"
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold tracking-tight text-foreground">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="space-y-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                    {feature.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
