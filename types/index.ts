export * from './base.types';
export * from './user.types';
export * from './auth.types';

import { type LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  disabled?: boolean;
  external?: boolean;
  items?: NavItem[];
}

export interface FooterLink {
  title: string;
  href: string;
  external?: boolean;
  badge?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  highlights?: string[];
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  description?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  popular?: boolean;
  features: string[];
  cta: {
    label: string;
    href: string;
    variant?: "default" | "outline" | "secondary";
  };
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    twitter: string;
    discord: string;
    docs: string;
  };
  mainNav: NavItem[];
  footerSections: FooterSection[];
}
