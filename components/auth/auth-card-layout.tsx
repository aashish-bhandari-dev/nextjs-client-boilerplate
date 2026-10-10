import * as React from "react";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthShowcase } from "./auth-showcase";

interface AuthCardLayoutProps {
  children: React.ReactNode;
}

export function AuthCardLayout({ children }: AuthCardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      {/* Top Announcement Banner */}
      <AnnouncementBanner />

      {/* Platform Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Split Container with Left Showcase Section and Right Form - Zero Shadows */}
        <div className="w-full max-w-4xl xl:max-w-5xl rounded-2xl border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column: Visual Showcase */}
            <AuthShowcase />

            {/* Right Column: Clean Form Container */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="w-full max-w-md mx-auto">
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Platform Footer */}
      <Footer />
    </div>
  );
}
