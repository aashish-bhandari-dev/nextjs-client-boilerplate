"use client";

import * as React from "react";
import { ChevronDown, Layers, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toaster";

export function ComponentShowcaseSection() {
  const [autoScaleEnabled, setAutoScaleEnabled] = React.useState(true);
  const [complianceChecked, setComplianceChecked] = React.useState(true);
  const [queryInput, setQueryInput] = React.useState("");

  const handleTriggerSimulatedAlert = (
    type: "default" | "success" | "error" | "info" | "warning"
  ) => {
    const titles = {
      default: "Pipeline Event Dispatched",
      success: "Database Migration Completed (24ms)",
      error: "Webhook Gateway Timeout (Provider 504)",
      info: "Workspace Policy Updated by Lead",
      warning: "P99 Event Latency Spiked to 48ms",
    };

    const descriptions = {
      default: "Event #evt_991 was acknowledged by the ingestion broker.",
      success: "All 12 read replicas synchronized without schema drift.",
      error: "Automatic retry #2 dispatched to secondary fallback endpoint.",
      info: "Two-factor authentication requirement enforced for all operators.",
      warning: "Cluster auto-scaling triggered: Provisioning 2 worker nodes.",
    };

    toast({
      title: titles[type],
      description: descriptions[type],
      type,
    });
  };

  return (
    <section id="showcase" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Badge
            variant="outline"
            className="text-xs px-3 py-1 text-primary border-primary/30"
          >
            <Layers className="size-3 mr-1 inline" /> Interactive Experience
          </Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Experience the Workspace Interface in Real-Time
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Interact with live operational controls, test workspace automation
            rules, and trigger simulated real-time telemetry alerts.
          </p>
        </div>

        {/* 3 Interactive Showcase Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Action Dispatches & Status Tags */}
          <Card className="border-border/70 bg-card">
            <CardHeader>
              <CardTitle className="text-base font-bold">
                Action Dispatches & Status
              </CardTitle>
              <CardDescription className="text-xs">
                Trigger operational commands and monitor task statuses.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() => handleTriggerSimulatedAlert("success")}
                >
                  Deploy Live
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleTriggerSimulatedAlert("info")}
                >
                  Sync Replicas
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTriggerSimulatedAlert("warning")}
                >
                  Drain Node
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleTriggerSimulatedAlert("error")}
                >
                  Halt Queue
                </Button>
              </div>

              <div className="border-t border-border pt-3 flex flex-wrap gap-2">
                <Badge>Active &middot; Healthy</Badge>
                <Badge variant="secondary">Syncing &middot; 98%</Badge>
                <Badge variant="outline">Standby</Badge>
                <Badge variant="destructive">Degraded SLA</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Automation Rules & Governance */}
          <Card className="border-border/70 bg-card">
            <CardHeader>
              <CardTitle className="text-base font-bold">
                Automation Controls
              </CardTitle>
              <CardDescription className="text-xs">
                Configure runtime thresholds and enforcement rules.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3.5">
              <div className="space-y-1">
                <Label htmlFor="demo-input" className="text-xs">
                  Filter Telemetry Queries
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="demo-input"
                    placeholder="e.g. status:500 AND region:eu-west"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    className="h-8 text-xs"
                  />
                  <Button
                    size="sm"
                    className="h-8 px-2.5"
                    onClick={() => handleTriggerSimulatedAlert("info")}
                  >
                    <Send className="size-3" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-medium text-foreground">
                    Auto-Scale Workers
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    Provision on queue threshold spikes
                  </p>
                </div>
                <Switch
                  checked={autoScaleEnabled}
                  onCheckedChange={setAutoScaleEnabled}
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  id="demo-checkbox"
                  checked={complianceChecked}
                  onCheckedChange={(checked) => setComplianceChecked(!!checked)}
                />
                <Label
                  htmlFor="demo-checkbox"
                  className="text-xs font-normal cursor-pointer"
                >
                  Require 2-person approval for production rollout
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Operator Controls & Live Alerts */}
          <Card className="border-border/70 bg-card">
            <CardHeader>
              <CardTitle className="text-base font-bold">
                Operator Controls & Telemetry
              </CardTitle>
              <CardDescription className="text-xs">
                Simulate production incidents and notification dispatches.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium hover:bg-muted cursor-pointer">
                    <span>Manage Cluster</span>
                    <ChevronDown className="size-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52 p-1 rounded-xl shadow-lg">
                    <DropdownMenuLabel className="text-xs">
                      Cluster Operations
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleTriggerSimulatedAlert("success")}
                      className="cursor-pointer text-xs"
                    >
                      Trigger Health Check
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleTriggerSimulatedAlert("info")}
                      className="cursor-pointer text-xs"
                    >
                      Rotate API Tokens
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleTriggerSimulatedAlert("error")}
                      variant="destructive"
                      className="cursor-pointer text-xs text-destructive"
                    >
                      Emergency Failover
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center gap-2">
                  <Avatar className="size-8 border">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                      OP
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold leading-tight">
                      Lead Operator
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      DevOps Admin
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <span className="text-xs font-medium text-muted-foreground block mb-2">
                  Simulate Live Telemetry Toasts:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleTriggerSimulatedAlert("success")}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    Success Event
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleTriggerSimulatedAlert("error")}
                    className="text-destructive hover:text-destructive"
                  >
                    Failure Alert
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleTriggerSimulatedAlert("warning")}
                    className="text-amber-600 hover:text-amber-700"
                  >
                    Latency Warning
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleTriggerSimulatedAlert("info")}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Policy Update
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
