import { CheckCircle2, Code2, Layers, Sparkles, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";

const highlights = [
  "Complete authentication & session management",
  "Modular, accessible UI components",
  "Light & dark mode with instant switching",
  "Pre-configured client & server API layer",
];

export function AuthShowcase() {
  return (
    <div className="hidden h-full flex-col justify-between border-r border-border bg-muted/30 dark:bg-zinc-950/40 p-8 xl:p-10 text-foreground lg:flex">
      {/* Top Tagline */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-foreground">
          <Layers className="h-3.5 w-3.5 text-primary" />
          {siteConfig.name}
        </span>
      </div>

      {/* Hero Content */}
      <div className="my-auto max-w-md space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
          Build faster and launch your project with confidence.
        </h2>
        <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
          A flexible, modern application boilerplate engineered with clean code,
          modular architecture, and essential features built in.
        </p>

        {/* Feature Highlights */}
        <div className="grid gap-2.5 pt-2">
          {highlights.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2.5 text-xs text-foreground font-medium"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Architecture Callout */}
        <div className="mt-4 space-y-2 rounded-xl border border-border bg-background/60 p-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Code2 className="h-3.5 w-3.5 text-primary" />
              <span>Clean Architecture</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
              <Sparkles className="h-2.5 w-2.5" />
              <span>Next.js & TypeScript</span>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Easily adapt this boilerplate for SaaS platforms, client portals,
            internal tools, or public-facing applications.
          </p>
        </div>
      </div>

      {/* Bottom Status */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-4 border-t border-border/60">
        <span className="flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5" />
          <span>Production Ready</span>
        </span>
        <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          <span>All systems ready</span>
        </span>
      </div>
    </div>
  );
}
