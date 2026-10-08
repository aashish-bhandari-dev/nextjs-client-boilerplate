import * as React from "react";
import { Database, Gauge, Shield, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    step: "01",
    title: "Connect Data Sources",
    description:
      "Plug in your existing databases, API endpoints, payment providers, and webhook sinks in minutes.",
    code: '// Connect webhook source\nPOST /api/v1/integrations/connect\n{\n  "provider": "stripe",\n  "mode": "live_sync"\n}',
    icon: Database,
  },
  {
    step: "02",
    title: "Configure Roles & Guardrails",
    description:
      "Assign role-based access, configure workspace security boundaries, and set approval thresholds.",
    code: '// Define workspace permissions\nconst teamPolicy = {\n  role: "ENGINEERING_LEAD",\n  canApproveDeployments: true,\n  auditLogging: "ENFORCED"\n};',
    icon: Shield,
  },
  {
    step: "03",
    title: "Orchestrate Workflows",
    description:
      "Build automated event loops, conditional logic branches, and notifications using the canvas or code.",
    code: "// Visual or Code-driven trigger\nwhen(Events.CustomerSignup)\n  .verifyKYC()\n  .provisionTenant()\n  .notifySlack('#growth-ops');",
    icon: Workflow,
  },
  {
    step: "04",
    title: "Scale with Live Telemetry",
    description:
      "Observe system health, track business KPIs, and detect bottlenecks with real-time streaming telemetry.",
    code: '// Real-time streaming metrics\nStreamTelemetry.subscribe({\n  metric: "pipeline_latency",\n  p99ThresholdMs: 25\n});',
    icon: Gauge,
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-t border-border/80 bg-muted/20 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Badge
            variant="outline"
            className="text-xs px-3 py-1 text-primary border-primary/30"
          >
            Frictionless Onboarding
          </Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            How Nexus Powers Your Operations
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            From zero to fully automated operations in four straightforward
            steps. No complex infrastructure overhead required.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.step}
                className="relative overflow-hidden border-border/70 bg-card shadow-xs transition-transform hover:-translate-y-1"
              >
                <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-black text-primary/30">
                        {item.step}
                      </span>
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-4" />
                      </div>
                    </div>
                    <h3 className="mt-4 text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/60 p-3 font-mono text-[11px] text-foreground border border-border/50 overflow-x-auto whitespace-pre">
                    {item.code}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
