"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "starter",
    name: "Starter",
    description:
      "Ideal for early-stage teams, prototypes, and growing startups.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    popular: false,
    features: [
      "Up to 3 team seats included",
      "50,000 monthly event transactions",
      "5 active automated workflows",
      "Standard telemetry retention (7 days)",
      "Community Discord & standard support",
    ],
    cta: "Start Free Forever",
  },
  {
    id: "growth",
    name: "Growth",
    description:
      "Built for scaling teams requiring high throughput, automation, and collaboration.",
    monthlyPrice: 4999,
    yearlyPrice: 3999,
    popular: true,
    features: [
      "Up to 25 team seats included",
      "1,500,000 monthly event transactions",
      "Unlimited automated event workflows",
      "Extended telemetry retention (90 days)",
      "AI anomaly detection & root-cause insights",
      "Priority 24/7 Slack & email support",
    ],
    cta: "Start 14-Day Free Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description:
      "For organizations demanding bespoke governance, dedicated infrastructure, and SLAs.",
    monthlyPrice: 19999,
    yearlyPrice: 15999,
    popular: false,
    features: [
      "Unlimited team seats & workspaces",
      "Unlimited monthly event throughput",
      "Dedicated multi-region VPC cluster",
      "SAML 2.0 / Okta SSO & SCIM directory sync",
      "99.99% Guaranteed uptime SLA",
      "Dedicated Technical Account Manager",
    ],
    cta: "Contact Enterprise Team",
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = React.useState(true);

  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Badge
            variant="outline"
            className="text-xs px-3 py-1 text-primary border-primary/30"
          >
            Transparent Pricing
          </Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Predictable Plans that Scale with Your Growth
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Start for free, then scale smoothly as your operations expand. No
            hidden fees or unexpected surge charges.
          </p>

          {/* Monthly / Yearly Billing Switcher */}
          <div className="mt-8 flex items-center gap-3 rounded-full border border-border bg-muted/40 p-1">
            <button
              type="button"
              onClick={() => setIsYearly(false)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                !isYearly
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setIsYearly(true)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                isYearly
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>Yearly Billing</span>
              <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <Card
                key={plan.id}
                className={cn(
                  "relative flex flex-col justify-between border-border/80 bg-card transition-all duration-200 overflow-visible",
                  plan.popular
                    ? "border-primary shadow-xl ring-2 ring-primary/20 md:-translate-y-2 mt-4 md:mt-0"
                    : "hover:-translate-y-1 hover:shadow-md"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-[11px] font-bold text-primary-foreground shadow-md ring-2 ring-background">
                      <Sparkles className="size-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="pt-6">
                  <CardTitle className="text-xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-1">
                    {plan.description}
                  </CardDescription>

                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-muted-foreground">
                      NPR
                    </span>
                    <span className="text-4xl font-extrabold tracking-tight text-foreground">
                      {price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      / month {isYearly && "(billed yearly)"}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="border-t border-border/60 pt-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-3">
                      Included in this plan:
                    </span>
                    <ul className="space-y-2.5 text-xs text-muted-foreground">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="size-4 text-emerald-500 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-border/40">
                  <Link
                    href="#showcase"
                    className={cn(
                      buttonVariants({
                        variant: plan.popular ? "default" : "outline",
                      }),
                      "w-full justify-center gap-2 font-semibold text-xs h-10"
                    )}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
