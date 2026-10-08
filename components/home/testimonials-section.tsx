import * as React from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { type TestimonialItem } from "@/types";

const testimonials: TestimonialItem[] = [
  {
    id: "1",
    name: "Marcus Vance",
    role: "VP of Platform Engineering",
    company: "HyperLogic Cloud",
    avatar: "MV",
    content:
      "Nexus cut our cross-service incident resolution time by 72%. Consolidating fragmented data pipelines and manual approval workflows into a single real-time canvas was a monumental upgrade.",
    rating: 5,
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Chief Technology Officer",
    company: "Nova FinTech",
    avatar: "SC",
    content:
      "We scaled our platform from 50,000 to over 3.5 million daily event transactions with zero operational regressions. Nexus's event orchestration handled our peak traffic effortlessly.",
    rating: 5,
  },
  {
    id: "3",
    name: "Alex Rivera",
    role: "Head of Product Operations",
    company: "Chrono Labs",
    avatar: "AR",
    content:
      "The combination of autonomous event triggers and granular field-level RBAC gave us enterprise-grade governance from day one. Our operators ship with 10x more confidence.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="border-t border-border/80 bg-muted/20 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Badge
            variant="outline"
            className="text-xs px-3 py-1 text-primary border-primary/30"
          >
            Customer Success
          </Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Proven at Scale by World-Class Teams
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            See how engineering and operations leaders rely on Nexus to
            orchestrate mission-critical operations every second.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card
              key={item.id}
              className="border-border/70 bg-card shadow-xs transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-500" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                  <Avatar className="size-9 border">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                      {item.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-foreground">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {item.role} &middot; {item.company}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
