"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, X } from "lucide-react";

const STORAGE_KEY = "app_announcement_dismissed";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("app_announcement_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("app_announcement_change", callback);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem(STORAGE_KEY) !== "true";
  } catch {
    return true;
  }
}

function getServerSnapshot() {
  return true;
}

export function AnnouncementBanner() {
  const isVisible = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
      window.dispatchEvent(new Event("app_announcement_change"));
    } catch {
      // Storage unavailable
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Announcement"
      className="relative z-50 flex items-center justify-between border-b border-border/40 bg-muted/40 px-4 py-2 text-xs font-medium backdrop-blur-md"
    >
      <div className="mx-auto flex flex-wrap items-center justify-center gap-2 text-center text-muted-foreground pr-6 sm:pr-0">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
          <Sparkles className="size-3" />
          <span>New Release</span>
        </span>

        <span className="text-foreground">
          Version 2.0 is now live: Explore our modular components and complete authentication flow.
        </span>

        <Link
          href="/#features"
          className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline ml-1"
        >
          <span>Explore features</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        className="absolute right-3 inline-flex size-5 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
        aria-label="Dismiss banner"
        title="Dismiss announcement"
      >
        <X className="size-3.5" />
      </button>
    </aside>
  );
}
