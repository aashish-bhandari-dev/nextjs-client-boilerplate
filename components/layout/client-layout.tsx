"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { AnnouncementBanner } from "./announcement-banner";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Button } from "@/components/ui/button";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  showBanner?: boolean;
}

export function ClientLayoutWrapper({
  children,
  showBanner = true,
}: ClientLayoutWrapperProps) {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/10 selection:text-primary">
      {/* Optional Top Announcement */}
      {showBanner && <AnnouncementBanner />}

      {/* Primary Sticky Header / Navigation */}
      <Navbar />

      {/* Main Content Viewport */}
      <main id="main-content" className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Reusable Platform Footer */}
      <Footer />

      {/* Floating Scroll to Top Action */}
      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg transition-all hover:scale-105 bg-background/90 backdrop-blur-xs"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="size-4" />
        </Button>
      )}
    </div>
  );
}
