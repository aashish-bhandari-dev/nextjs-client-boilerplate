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
    role: "Product Lead",
    company: "Apex Studio",
    avatar: "MV",
    content:
      "This boilerplate saved our team weeks of foundational setup. Having clean authentication, typed API clients, and modern UI components out of the box is incredible.",
    rating: 5,
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Founder & CTO",
    company: "Nova Digital",
    avatar: "SC",
    content:
      "We scaled our web application seamlessly. The Zustand store architecture and clean Next.js 16 setup made shipping features fast and stress-free.",
    rating: 5,
  },
  {
    id: "3",
    name: "Alex Rivera",
    role: "Senior Full-Stack Engineer",
    company: "Chrono Labs",
    avatar: "AR",
    content:
      "The modular architecture, robust form validation with Zod, and rock-solid design system provide a world-class foundation for any product.",
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
            User Feedback
          </Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Loved by Developers and Teams
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            See how founders, engineers, and product teams build modern web
            applications faster with our boilerplate.
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
