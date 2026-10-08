import { Activity, Bot, Lock, Puzzle, Users2, Workflow } from "lucide-react";
import { type SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Nexus",
  title:
    "Nexus — The Intelligent Operational Workspace & Real-Time Intelligence Platform",
  description:
    "Unify your team operations, automated workflows, and business intelligence in one high-performance platform. Engineered for fast-growing companies and enterprise teams.",
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
      title: "Platform",
      href: "#features",
      items: [
        {
          title: "Intelligent Workflows",
          href: "#features",
          description:
            "Automate multi-step business operations with event-driven triggers.",
          icon: Workflow,
        },
        {
          title: "Live Analytics & Telemetry",
          href: "#features",
          description:
            "Real-time revenue metrics, funnel telemetry, and retention diagnostics.",
          icon: Activity,
        },
        {
          title: "AI Co-pilot & Automation",
          href: "#features",
          description:
            "Predictive insights and natural language query generation for your data.",
          icon: Bot,
        },
        {
          title: "Team Workspaces",
          href: "#features",
          description:
            "Collaborative canvas with multiplayer presence and thread discussions.",
          icon: Users2,
        },
        {
          title: "Enterprise Governance",
          href: "#features",
          description:
            "SOC 2 Type II, field-level RBAC, SAML/SSO, and encrypted audit trails.",
          icon: Lock,
        },
        {
          title: "Ecosystem Integrations",
          href: "#features",
          description:
            "Direct 2-way sync with Slack, Stripe, GitHub, Segment, and 200+ apps.",
          icon: Puzzle,
        },
      ],
    },
    {
      title: "Solutions",
      href: "#how-it-works",
    },
    {
      title: "Interactive Demo",
      href: "#showcase",
    },
    {
      title: "Pricing",
      href: "#pricing",
    },
    {
      title: "Customers",
      href: "#testimonials",
    },
    {
      title: "FAQ",
      href: "#faq",
    },
  ],
  footerSections: [
    {
      title: "Platform",
      links: [
        { title: "Intelligent Workflows", href: "#features" },
        { title: "Real-Time Telemetry", href: "#features" },
        { title: "AI Automation", href: "#features" },
        { title: "Team Workspaces", href: "#features" },
        { title: "Security & Compliance", href: "#features" },
        { title: "Changelog", href: "#", badge: "v2.4" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { title: "High-Growth Startups", href: "#how-it-works" },
        { title: "Scale-ups & SaaS", href: "#how-it-works" },
        { title: "Global Enterprise", href: "#how-it-works" },
        { title: "FinTech & Banking", href: "#how-it-works" },
        { title: "Customer Case Studies", href: "#testimonials" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Platform Documentation", href: "#", external: false },
        { title: "API Reference & SDKs", href: "#", external: false },
        { title: "System Status", href: "#", badge: "99.99%" },
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
        { title: "About Nexus", href: "#" },
        { title: "Careers", href: "#", badge: "We're Hiring" },
        { title: "Press & Brand Assets", href: "#" },
        { title: "Privacy Policy", href: "#" },
        { title: "Terms of Service", href: "#" },
      ],
    },
  ],
};
