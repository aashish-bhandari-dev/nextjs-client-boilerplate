import { Code2, Compass, Layers, Lock, Palette, Zap } from "lucide-react";
import { type SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "ClientHub",
  title: "ClientHub — Modern Full-Stack Ready Client Application Boilerplate",
  description:
    "A production-ready client application foundation with secure authentication, modular UI architecture, and robust state management for any modern web project.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og.png",
  links: {
    github: "https://github.com/aashish-bhandari-dev/nextjs-client-boilerplate",
    twitter: "https://twitter.com",
    discord: "https://discord.com",
    docs: "https://nextjs.org/docs",
  },
  mainNav: [
    {
      title: "Features",
      href: "#features",
      items: [
        {
          title: "Authentication Flow",
          href: "#features",
          description:
            "Ready-to-use login, registration, email OTP verification, and password reset.",
          icon: Lock,
        },
        {
          title: "Modular UI Components",
          href: "#features",
          description:
            "Accessible, responsive, and customizable components styled with Tailwind CSS.",
          icon: Palette,
        },
        {
          title: "State Management",
          href: "#features",
          description:
            "Persistent store with Zustand, local storage caching, and cookie sync.",
          icon: Layers,
        },
        {
          title: "API & Data Layer",
          href: "#features",
          description:
            "Pre-configured client & server HTTP layers with caching and error handling.",
          icon: Code2,
        },
        {
          title: "High Performance",
          href: "#features",
          description:
            "Optimized Next.js App Router setup with fast rendering and small bundles.",
          icon: Zap,
        },
        {
          title: "Developer Experience",
          href: "#features",
          description:
            "Strict TypeScript, clean linting, and organized folder architecture.",
          icon: Compass,
        },
      ],
    },
    {
      title: "How It Works",
      href: "#how-it-works",
    },
    {
      title: "Showcase",
      href: "#showcase",
    },
    {
      title: "Pricing",
      href: "#pricing",
    },
    {
      title: "Testimonials",
      href: "#testimonials",
    },
    {
      title: "FAQ",
      href: "#faq",
    },
  ],
  footerSections: [
    {
      title: "Product",
      links: [
        { title: "Features", href: "#features" },
        { title: "Authentication", href: "/login" },
        { title: "Component Showcase", href: "#showcase" },
        { title: "How It Works", href: "#how-it-works" },
        { title: "Pricing Plans", href: "#pricing" },
        { title: "Changelog", href: "#", badge: "v2.0" },
      ],
    },
    {
      title: "Architecture",
      links: [
        { title: "Next.js App Router", href: "#" },
        { title: "Zustand State Store", href: "#" },
        { title: "Tailwind CSS v4", href: "#" },
        { title: "TypeScript Types", href: "#" },
        { title: "API Integration", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Documentation", href: "#", external: false },
        { title: "API Reference", href: "#", external: false },
        { title: "System Status", href: "#", badge: "All Good" },
        { title: "Community Forum", href: "#", external: false },
        {
          title: "GitHub Repository",
          href: "https://github.com/aashish-bhandari-dev/nextjs-client-boilerplate",
          external: true,
        },
      ],
    },
    {
      title: "Company",
      links: [
        { title: "About", href: "#" },
        { title: "Careers", href: "#", badge: "Hiring" },
        { title: "Privacy Policy", href: "#" },
        { title: "Terms of Service", href: "#" },
      ],
    },
  ],
};
