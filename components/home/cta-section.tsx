import * as React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/10 via-primary/5 to-background p-8 sm:p-12 md:p-16 text-center shadow-xl">
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              <span>Get Started In Minutes</span>
            </span>

            <h2 className="mt-6 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              Ready to Supercharge Your Operational Velocity?
            </h2>

            <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
              Join thousands of ambitious teams automating multi-system
              workflows, eliminating operational silos, and scaling with
              real-time intelligence.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link
                href="#pricing"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-auto h-11 px-8 text-sm font-semibold shadow-md flex items-center justify-center gap-2"
                )}
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="#showcase"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto h-11 px-8 text-sm font-semibold flex items-center justify-center gap-2"
                )}
              >
                <span>Explore Interactive Demo</span>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" />
                No Credit Card Required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" />
                14-Day Full Access Trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" />
                SOC 2 Type II Certified
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" />
                Cancel Anytime
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
