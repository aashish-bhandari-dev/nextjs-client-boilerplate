"use client";

import * as React from "react";
import {
  Activity,
  Bot,
  CheckCircle2,
  Lock,
  Puzzle,
  Sparkles,
  Users2,
  Workflow,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Feature {
  id: string;
  category: "all" | "automation" | "telemetry" | "security";
  title: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  highlights: string[];
}

const features: Feature[] = [
  {
    id: "workflows",
    category: "automation",
    title: "Autonomous Workflow Orchestration",
    description:
      "Compose complex multi-system pipelines with conditional triggers, scheduled cron loops, and automated error retries without writing boilerplate.",
    icon: Workflow,
    badge: "Automation",
    highlights: [
      "Visual drag-and-drop workflow builder",
      "Sub-second event trigger execution",
      "Automated rollbacks & dead-letter queues",
    ],
  },
  {
    id: "telemetry",
    category: "telemetry",
    title: "Real-Time Telemetry & Funnels",
    description:
      "Stream live business metrics, conversion funnels, and retention curves with millisecond-resolution telemetry and custom alerts.",
    icon: Activity,
    badge: "Intelligence",
    highlights: [
      "Live interactive time-series telemetry",
      "Cohort retention & conversion heatmaps",
      "Instant incident alerting to Slack & PagerDuty",
    ],
  },
  {
    id: "ai-copilot",
    category: "automation",
    title: "AI Predictive Anomaly Detection",
    description:
      "Intelligent models monitor your operational pipelines 24/7, diagnosing revenue regressions and system bottlenecks before they impact customers.",
    icon: Bot,
    badge: "AI Powered",
    highlights: [
      "Automated root-cause diagnostic reports",
      "Natural language queries for complex schemas",
      "Predictive resource capacity forecasting",
    ],
  },
  {
    id: "governance",
    category: "security",
    title: "Enterprise RBAC & Security Governance",
    description:
      "Protect sensitive records with granular field-level permission matrices, SAML/SSO integration, and immutable compliance audit logs.",
    icon: Lock,
    badge: "Security",
    highlights: [
      "SOC 2 Type II & HIPAA certified infrastructure",
      "SAML 2.0 / Okta / Azure AD SSO integration",
      "Cryptographically signed audit logs",
    ],
  },
  {
    id: "workspaces",
    category: "telemetry",
    title: "Multiplayer Team Workspaces",
    description:
      "Live presence, synced cursor tracking, and shared operational canvases eliminate silos between engineering, product, and operations.",
    icon: Users2,
    badge: "Collaboration",
    highlights: [
      "Real-time multiplayer cursor presence",
      "Threaded contextual workspace discussions",
      "Immutable workspace version history",
    ],
  },
  {
    id: "integrations",
    category: "automation",
    title: "200+ Turnkey Integrations",
    description:
      "Plug directly into Stripe, GitHub, Slack, Segment, AWS, and PostgreSQL with bidirectional synchronization and zero data loss.",
    icon: Puzzle,
    badge: "Integrations",
    highlights: [
      "Bi-directional two-way sync pipelines",
      "Native webhooks and REST / GraphQL endpoints",
      "Guaranteed at-least-once event delivery",
    ],
  },
];

export function FeaturesSection() {
  const [activeCategory, setActiveCategory] = React.useState<
    "all" | "automation" | "telemetry" | "security"
  >("all");

  const filteredFeatures =
    activeCategory === "all"
      ? features
      : features.filter((f) => f.category === activeCategory);

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <Badge
            variant="outline"
            className="text-xs px-3 py-1 text-primary border-primary/30"
          >
            <Sparkles className="size-3 mr-1 inline" /> Built For High-Velocity
            Teams
          </Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Complete Operational Command in One Platform
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Replace disconnected spreadsheets, fragile custom scripts, and
            fragmented tools with a unified platform engineered for clarity,
            speed, and scale.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Capabilities" },
              { id: "automation", label: "Workflows & Automation" },
              { id: "telemetry", label: "Telemetry & Insights" },
              { id: "security", label: "Security & Governance" },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeCategory === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setActiveCategory(tab.id as typeof activeCategory)
                }
                className="rounded-full text-xs cursor-pointer transition-all"
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.id}
                className="group relative overflow-hidden border-border/70 bg-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <CardHeader className="space-y-3 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-medium"
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold tracking-tight text-foreground">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="space-y-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                    {feature.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
