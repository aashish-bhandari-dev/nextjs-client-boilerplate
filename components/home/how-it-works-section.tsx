import * as React from "react";
import { Code, Globe, Layers, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    step: "01",
    title: "Configure & Connect",
    description:
      "Set your environment variables, customize site branding, and point to your backend API endpoints.",
    code: '// .env configuration\nNEXT_PUBLIC_APP_NAME="YourApp"\nNEXT_PUBLIC_API_URL="https://api.domain.com"',
    icon: Code,
  },
  {
    step: "02",
    title: "Authenticate Users",
    description:
      "Ready-to-use registration, login, email OTP verification, and JWT session handling via Zustand.",
    code: '// Complete auth hooks & repo\nawait authRepo.login({\n  credentials: { identifier, password },\n  onSuccess: (data) => setAuth(data)\n});',
    icon: UserCheck,
  },
  {
    step: "03",
    title: "Build Your Features",
    description:
      "Assemble user interfaces quickly using our modular Tailwind CSS components and state stores.",
    code: '// Modular UI & Store\nconst { user } = useAuthStore();\nreturn <DashboardView user={user} />;',
    icon: Layers,
  },
  {
    step: "04",
    title: "Deploy to Production",
    description:
      "Deploy anywhere with confidence using Next.js App Router, Docker support, and optimized assets.",
    code: '// Production build & start\nnpm run build\nnpm run start',
    icon: Globe,
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
            Streamlined Architecture
          </Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            From Setup to Production in Minutes
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            A clean, developer-friendly workflow engineered to get your application
            from initial setup to production deployment without friction.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.step}
                className="relative overflow-hidden border-border/70 bg-card transition-transform hover:-translate-y-1"
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

                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Code snippet preview */}
                  <div className="rounded-lg border border-border/60 bg-muted/40 p-3 font-mono text-[11px] text-muted-foreground leading-tight overflow-x-auto whitespace-pre">
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
