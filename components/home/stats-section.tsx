import * as React from "react";
import { Clock, ShieldCheck, Users, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { type StatItem } from "@/types";

const defaultStats: (StatItem & { icon: React.ElementType })[] = [
  {
    id: "1",
    label: "Performance Score",
    value: "99",
    suffix: "/100",
    description:
      "Optimized Core Web Vitals, minimal bundle footprint, and instant page rendering.",
    icon: Zap,
  },
  {
    id: "2",
    label: "Platform Reliability",
    value: "99.99",
    suffix: "%",
    description:
      "Production-ready stability with robust error boundaries and request retry logic.",
    icon: ShieldCheck,
  },
  {
    id: "3",
    label: "Average Request Latency",
    value: "<25",
    suffix: "ms",
    description:
      "Low-latency response times with client-side caching and request deduplication.",
    icon: Clock,
  },
  {
    id: "4",
    label: "Active Projects",
    value: "10k",
    suffix: "+",
    description:
      "Teams building and launching modern applications powered by this template.",
    icon: Users,
  },
];

export function StatsSection() {
  return (
    <section className="border-y border-border/80 bg-muted/20 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {defaultStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.id}
                className="border-border/60 bg-card/80 backdrop-blur-xs transition-transform hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </span>
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold tracking-tight text-foreground">
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="text-sm font-bold text-primary">
                        {stat.suffix}
                      </span>
                    )}
                  </div>

                  {stat.description && (
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {stat.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
