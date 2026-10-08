"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Layers,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md shadow-xs"
          : "border-b border-transparent bg-background/50 backdrop-blur-xs"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Navigation Links */}
        <div className="flex items-center gap-6 lg:gap-8 min-w-0">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
              <Layers className="size-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-foreground">
                  {siteConfig.name}
                </span>
                <Badge
                  variant="outline"
                  className="hidden sm:inline-flex text-[10px] px-1.5 py-0 font-medium border-primary/30 text-primary"
                >
                  Platform
                </Badge>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {siteConfig.mainNav.map((item) => {
              if (item.items && item.items.length > 0) {
                return (
                  <DropdownMenu key={item.title}>
                    <DropdownMenuTrigger className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 cursor-pointer whitespace-nowrap">
                      <span>{item.title}</span>
                      <ChevronDown className="size-3.5 transition-transform duration-200" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      sideOffset={8}
                      className="w-80 p-2 rounded-xl shadow-lg"
                    >
                      <div className="grid gap-1">
                        {item.items.map((subItem) => {
                          const Icon = subItem.icon || Sparkles;
                          return (
                            <DropdownMenuItem
                              key={subItem.title}
                              className="p-0"
                            >
                              <Link
                                href={subItem.href}
                                className="flex w-full items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                              >
                                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                                  <Icon className="size-4" />
                                </div>
                                <div className="flex flex-col text-left">
                                  <span className="text-xs font-semibold text-foreground">
                                    {subItem.title}
                                  </span>
                                  {subItem.description && (
                                    <span className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                                      {subItem.description}
                                    </span>
                                  )}
                                </div>
                              </Link>
                            </DropdownMenuItem>
                          );
                        })}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-md px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 whitespace-nowrap"
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: ThemeToggle & CTA Buttons */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Dark / Light Theme Toggle */}
          <ThemeToggle />

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="#pricing"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Sign In
            </Link>
            <Link
              href="#pricing"
              className={cn(
                buttonVariants({ size: "sm" }),
                "flex items-center gap-1.5 whitespace-nowrap"
              )}
            >
              <span>Start Free Trial</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-md px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {siteConfig.mainNav.map((item) => (
              <div key={item.title} className="flex flex-col">
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge variant="outline" className="text-[10px]">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
                {item.items && (
                  <div className="ml-3 mt-1 flex flex-col space-y-1 border-l pl-3">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-border flex flex-col gap-2">
              <Link
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full justify-center"
                )}
              >
                Sign In
              </Link>
              <Link
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(buttonVariants(), "w-full justify-center")}
              >
                Get Started Free
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
