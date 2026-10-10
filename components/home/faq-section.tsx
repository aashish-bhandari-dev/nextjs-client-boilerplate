"use client";

import * as React from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { type FaqItem } from "@/types";

const faqs: FaqItem[] = [
  {
    id: "1",
    question: "How do I get started with this application boilerplate?",
    answer:
      "Clone the repository, install dependencies with npm install, set up your .env configuration, and run npm run dev. The complete authentication system, layouts, and components are ready immediately.",
  },
  {
    id: "2",
    question: "How does the authentication flow work?",
    answer:
      "The boilerplate includes a full authentication suite: email/username sign in, new account registration, 6-digit email OTP verification, password recovery, and session cookies managed via Zustand.",
  },
  {
    id: "3",
    question: "Can I customize the styling, colors, and branding?",
    answer:
      "Yes, completely. Styling is built using Tailwind CSS v4 and CSS custom variables in globals.css. You can change colors, typography, border radii, and dark/light mode tokens in seconds.",
  },
  {
    id: "4",
    question: "How do I connect this frontend to my backend API?",
    answer:
      "Set your backend URL in NEXT_PUBLIC_API_URL. The pre-configured clientApi (Axios) and serverApi (Fetch) modules automatically attach Bearer tokens, deduplicate requests, and format errors.",
  },
  {
    id: "5",
    question: "Is this boilerplate ready for production deployment?",
    answer:
      "Yes. It is equipped with strict TypeScript validation, Next.js App Router route handling, ESLint configurations, Docker support, and production build optimization out of the box.",
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
            <HelpCircle className="size-3 mr-1 inline" /> Common Inquiries
          </Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Everything you need to know about setting up, customizing, and scaling
            your web application.
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
                  <CardContent className="px-5 pt-0 pb-5 text-xs text-muted-foreground leading-relaxed border-t border-border/40 mt-1">
                    <p className="pt-3">{faq.answer}</p>
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
