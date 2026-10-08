"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, X } from "lucide-react";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Announcement"
      className="relative z-50 flex items-center justify-between border-b border-border/40 bg-muted/40 px-4 py-2 text-xs font-medium backdrop-blur-md"
    >
      <div className="mx-auto flex flex-wrap items-center justify-center gap-2 text-center text-muted-foreground">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
          <Sparkles className="size-3" />
          <span>Product Launch</span>
        </span>

        <span className="text-foreground">
          Nexus 2.0 is now live: Experience the next-generation unified
          operational workspace.
        </span>

        <Link
          href="#features"
          className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline ml-1"
        >
          <span>Explore platform</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="absolute right-3 inline-flex size-5 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
        aria-label="Dismiss banner"
      >
        <X className="size-3.5" />
      </button>
    </aside>
  );
}
