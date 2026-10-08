import * as React from "react";
import { Activity, Clock, Coins, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { type StatItem } from "@/types";

const defaultStats: (StatItem & { icon: React.ElementType })[] = [
  {
    id: "1",
    label: "Processed Volume",
    value: "NPR 1.4B",
    suffix: "+",
    description:
      "Annual transactional and operational throughput across connected customer platforms in Nepal and globally.",
    icon: Coins,
  },
  {
    id: "2",
    label: "Guaranteed SLA Uptime",
    value: "99.99",
    suffix: "%",
    description:
      "Carrier-grade reliability with automated multi-region failover and 24/7 telemetry.",
    icon: ShieldCheck,
  },
  {
    id: "3",
    label: "Global Event Latency",
    value: "<18",
    suffix: "ms",
    description:
      "Sub-second streaming pipeline execution and edge dispatch across 240+ PoPs.",
    icon: Clock,
  },
  {
    id: "4",
    label: "Active Daily Operators",
    value: "150k",
    suffix: "+",
    description:
      "Engineers, analysts, and operations leads coordinating in Nexus workspaces.",
    icon: Activity,
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
                className="border-border/60 bg-card/80 backdrop-blur-xs transition-transform hover:-translate-y-1 hover:shadow-md"
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
                    <span className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="text-xl font-bold text-muted-foreground">
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
