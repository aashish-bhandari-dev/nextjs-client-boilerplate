"use client";

import * as React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { type FaqItem } from "@/types";

const faqs: FaqItem[] = [
  {
    id: "1",
    question:
      "How quickly can our team integrate existing databases and services?",
    answer:
      "Most teams complete their first live sync in under 15 minutes. We provide pre-built turnkey connectors for PostgreSQL, MySQL, Snowflake, Stripe, Slack, Segment, and AWS, alongside high-performance REST and GraphQL APIs for proprietary systems.",
  },
  {
    id: "2",
    question:
      "How does Nexus protect sensitive data and ensure regulatory compliance?",
    answer:
      "Nexus is SOC 2 Type II certified and GDPR compliant. All data is encrypted in transit using TLS 1.3 and at rest using AES-256. We support granular field-level permission masks, SAML 2.0 / Okta SSO, IP whitelisting, and immutable audit logs.",
  },
  {
    id: "3",
    question: "Can non-technical team members build and maintain workflows?",
    answer:
      "Yes. The visual workflow builder is designed for cross-functional collaboration. Engineers can author reusable logic modules, while product leads and operators can assemble multi-step event triggers without writing a single line of boilerplate.",
  },
  {
    id: "4",
    question:
      "What happens if our event volume experiences an unexpected traffic spike?",
    answer:
      "We never drop events or arbitrarily throttle your pipelines. High-throughput queues automatically absorb and buffer traffic bursts with zero data loss, guaranteeing at-least-once delivery even during peak demand.",
  },
  {
    id: "5",
    question: "Can we deploy Nexus in our own private cloud or dedicated VPC?",
    answer:
      "Yes. Our Enterprise tier offers dedicated single-tenant VPC deployments across AWS, Google Cloud, and Microsoft Azure, complete with customized regional data residency and tailored 99.99% uptime SLAs.",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = React.useState<string | null>("1");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="border-t border-border/80 bg-muted/20 py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Badge
            variant="outline"
            className="text-xs px-3 py-1 text-primary border-primary/30"
          >
            <HelpCircle className="size-3 mr-1 inline" /> Got Questions?
          </Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Everything you need to know about platform integration, governance,
            and scaling.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <Card
                key={faq.id}
                className="border-border/70 bg-card overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-muted/40 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-foreground pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <CardContent className="px-5 pb-5 pt-0 text-xs text-muted-foreground leading-relaxed animate-in fade-in-50 duration-200">
                    <div className="border-t border-border/60 pt-3">
                      {faq.answer}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
