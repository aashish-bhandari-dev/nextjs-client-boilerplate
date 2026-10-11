"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers, Send } from "lucide-react";
import { Github, Twitter } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toaster";

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please provide a valid email address.",
        type: "error",
      });
      return;
    }

    setSubscribed(true);
    toast({
      title: "Subscribed successfully!",
      description: "Thank you for subscribing to our developer newsletter.",
      type: "success",
    });
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      {/* Top Section: Newsletter Banner & Brand Summary */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 rounded-2xl border border-border/80 bg-muted/30 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Layers className="size-4" />
              </div>
              <span className="font-bold text-lg">
                {siteConfig.name} Newsletter
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Join 35,000+ developers and digital product builders receiving our
              weekly updates on web development, modern architecture, and
              component libraries.
            </p>
          </div>

          <div className="flex flex-col justify-center lg:col-span-6">
            {subscribed ? (
              <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>
                  You are subscribed! Look out for our upcoming editions.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-2"
              >
                <Input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background h-10 text-sm"
                  aria-label="Email address"
                />
                <Button type="submit" className="h-10 shrink-0 gap-1.5 px-4">
                  <span>Subscribe</span>
                  <Send className="size-3.5" />
                </Button>
              </form>
            )}
            <span className="mt-2 text-[11px] text-muted-foreground">
              By subscribing, you agree to our Terms of Service and Privacy
              Policy.
            </span>
          </div>
        </div>

        {/* Middle Section: Columns of Links & Brand Bio */}
        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12">
          {/* Brand Bio */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Layers className="size-4" />
              </div>
              <span className="font-bold text-base">{siteConfig.name}</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A comprehensive client application boilerplate built with Next.js,
              TypeScript, Zustand, and Tailwind CSS to jumpstart your next web
              project.
            </p>

            {/* Operational Status Badge */}
            <div className="mt-4 flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-[11px] text-muted-foreground w-fit">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Dynamic Footer Sections */}
          {siteConfig.footerSections.map((section) => (
            <div key={section.title} className="flex flex-col">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2.5 text-xs">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span>{link.title}</span>
                      {link.badge && (
                        <Badge
                          variant="secondary"
                          className="text-[9px] px-1 py-0 h-3.5 font-normal"
                        >
                          {link.badge}
                        </Badge>
                      )}
                      {link.external && (
                        <ArrowRight className="size-2.5 -rotate-45 opacity-60" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {siteConfig.name}. Built with Next.js 16, React
            19 & Tailwind CSS v4.
          </p>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="GitHub repository"
            >
              <Github className="size-4" />
            </a>
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Twitter profile"
            >
              <Twitter className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
