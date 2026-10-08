"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Play,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const trustedCompanies = [
  { name: "VORTEX", symbol: "⚡" },
  { name: "CHRONO", symbol: "⏱" },
  { name: "HYPERION", symbol: "▲" },
  { name: "LATTICE", symbol: "❖" },
  { name: "STELLAR", symbol: "★" },
  { name: "OMNIA", symbol: "◎" },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = React.useState<
    "overview" | "telemetry" | "automation"
  >("overview");

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background Decorative Ambient Gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="size-[550px] rounded-full bg-primary/5 blur-3xl" />
        <div className="size-[450px] -translate-x-1/3 translate-y-1/4 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Top Pill / Product Release Badge */}
          <Link
            href="#features"
            className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-3.5 py-1 text-xs font-medium text-foreground backdrop-blur-xs transition-colors hover:bg-muted"
          >
            <span className="flex items-center gap-1 rounded-full bg-primary px-1.5 py-0.2 text-[10px] font-bold text-primary-foreground">
              <Sparkles className="size-2.5" />
              <span>New</span>
            </span>
            <span>Nexus 2.4 — Autonomous Event Orchestration & Telemetry</span>
            <ChevronRight className="size-3 text-muted-foreground" />
          </Link>

          {/* Impactful Headline */}
          <h1 className="mt-6 max-w-4xl font-extrabold text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
            Unify Your Operations.{" "}
            <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-indigo-300">
              Automate Workflows.
            </span>
          </h1>

          {/* Subtitle / Product Value Proposition */}
          <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Nexus unites your data streams, automates multi-step business
            operations, and delivers real-time operational telemetry in one
            intelligent workspace. Built for modern engineering, product, and
            operations teams.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="#pricing"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full sm:w-auto h-11 px-7 text-sm font-semibold shadow-md flex items-center justify-center gap-2"
              )}
            >
              <span>Start 14-Day Free Trial</span>
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="#showcase"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-auto h-11 px-7 text-sm font-semibold flex items-center justify-center gap-2"
              )}
            >
              <Play className="size-3.5 fill-current" />
              <span>Interactive Platform Tour</span>
            </Link>
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              No credit card required
            </span>
            <span>&middot;</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              SOC 2 Type II Certified
            </span>
            <span className="hidden sm:inline">&middot;</span>
            <span className="hidden sm:flex items-center gap-1">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              Instant Setup
            </span>
          </div>

          {/* Trusted Companies Banner */}
          <div className="mt-14 w-full">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/80">
              Trusted by 10,000+ high-growth operators and engineering teams
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {trustedCompanies.map((company) => (
                <div
                  key={company.name}
                  className="flex items-center gap-1.5 font-bold tracking-wider text-muted-foreground/70 hover:text-foreground transition-colors text-xs sm:text-sm"
                >
                  <span className="text-base text-primary/70">
                    {company.symbol}
                  </span>
                  <span>{company.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero SaaS Platform Live Preview Mockup Card */}
          <div className="mt-14 w-full max-w-5xl rounded-2xl border border-border bg-card/80 p-2 sm:p-4 shadow-2xl backdrop-blur-md">
            {/* Mock Header Controls */}
            <div className="flex flex-wrap items-center justify-between border-b border-border/80 pb-3 px-3 gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-red-500/80" />
                  <div className="size-3 rounded-full bg-amber-500/80" />
                  <div className="size-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-semibold text-foreground ml-2">
                  Production Workspace &middot; Global Cluster
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live 18ms
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
                {(["overview", "automation", "telemetry"] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "px-2.5 py-1 text-[11px] font-medium rounded-md capitalize transition-colors cursor-pointer",
                        activeTab === tab
                          ? "bg-background text-foreground shadow-xs font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Dashboard Content Mock */}
            <div className="p-4 sm:p-6 text-left space-y-6">
              {/* 3 Live KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-border/60 bg-muted/20">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        Annual Run Rate
                      </span>
                      <span className="flex items-center text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 gap-0.5">
                        <TrendingUp className="size-3" /> +24.8%
                      </span>
                    </div>
                    <div className="text-2xl font-extrabold text-foreground">
                      NPR 4,284,500
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Real-time revenue velocity across all enterprise cohorts.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/60 bg-muted/20">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        Automated Operations
                      </span>
                      <Badge variant="secondary" className="text-[10px]">
                        99.98% Success
                      </Badge>
                    </div>
                    <div className="text-2xl font-extrabold text-foreground">
                      1.84M / day
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Event triggers processed without manual operator
                      intervention.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/60 bg-muted/20">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        Active Team Operators
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[10px] text-primary border-primary/30"
                      >
                        Multiplayer
                      </Badge>
                    </div>
                    <div className="text-2xl font-extrabold text-foreground">
                      148 Online
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Concurrent engineers and product leads collaborating in
                      canvas.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Workflow Pipeline Simulation Strip */}
              <div className="rounded-xl border border-border/80 bg-background/60 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Workflow className="size-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground">
                      Active Event Pipeline: Payment Completed &rarr; Provision
                      Workspace &rarr; Notify Slack
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                  >
                    Healthy &middot; Avg 42ms
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="rounded-lg border bg-muted/30 p-2.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground mb-1">
                      <span>Trigger 01</span>
                      <span className="text-emerald-500">Completed</span>
                    </div>
                    <div className="font-medium text-foreground">
                      Stripe Invoice Finalized
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">
                      Event ID: evt_98412 &middot; NPR 15,000
                    </div>
                  </div>

                  <div className="rounded-lg border bg-muted/30 p-2.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground mb-1">
                      <span>Action 02</span>
                      <span className="text-emerald-500">Completed</span>
                    </div>
                    <div className="font-medium text-foreground">
                      Provision Kubernetes Pod
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">
                      Cluster: us-east-1 &middot; 3 Nodes Ready
                    </div>
                  </div>

                  <div className="rounded-lg border bg-muted/30 p-2.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground mb-1">
                      <span>Dispatch 03</span>
                      <span className="text-emerald-500">Live</span>
                    </div>
                    <div className="font-medium text-foreground">
                      Post to #engineering-ops
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">
                      Webhook dispatched to Slack & Discord
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
