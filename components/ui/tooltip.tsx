"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const TooltipContext = React.createContext<TooltipContextValue>({
  open: false,
  setOpen: () => {},
});

function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div
        className="relative inline-block"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  render?: React.ReactNode;
  delay?: number;
}

function TooltipTrigger({
  children,
  render,
  className,
  ...props
}: TooltipTriggerProps) {
  return (
    <div
      data-slot="tooltip-trigger"
      className={cn("inline-block", className)}
      {...props}
    >
      {render || children}
    </div>
  );
}

function TooltipPortal({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end" | string;
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  children,
  ...props
}: TooltipContentProps) {
  const { open } = React.useContext(TooltipContext);

  if (!open) return null;

  return (
    <div
      data-slot="tooltip-content"
      style={{
        [side === "top"
          ? "bottom"
          : side === "bottom"
            ? "top"
            : side === "left"
              ? "right"
              : "left"]: `calc(100% + ${sideOffset}px)`,
      }}
      className={cn(
        "bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-md shadow-md select-none pointer-events-none absolute z-50 whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-100",
        side === "top" || side === "bottom"
          ? "left-1/2 -translate-x-1/2"
          : "top-1/2 -translate-y-1/2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipPortal,
};
