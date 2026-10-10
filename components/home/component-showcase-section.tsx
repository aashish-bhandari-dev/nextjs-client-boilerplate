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
  const [emailAlertsEnabled, setEmailAlertsEnabled] = React.useState(true);
  const [confirmDestructive, setConfirmDestructive] = React.useState(true);
  const [queryInput, setQueryInput] = React.useState("");

  const handleTriggerSimulatedAlert = (
    type: "default" | "success" | "error" | "info" | "warning"
  ) => {
    const titles = {
      default: "Event Dispatched",
      success: "Data Synchronized Successfully",
      error: "Network Request Failed (500)",
      info: "Account Settings Saved",
      warning: "Session Expiring Soon",
    };

    const descriptions = {
      default: "Your action has been processed and recorded.",
      success: "All user records and state caches are up to date.",
      error: "Unable to reach server. Please check your connection.",
      info: "Your profile preferences and notification rules were saved.",
      warning: "Your authenticated session will expire in 5 minutes.",
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
            <Layers className="size-3 mr-1 inline" /> Interactive Showcase
          </Badge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Explore Interactive UI Components
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Test live interactive controls, toast notifications, state toggles,
            and UI elements crafted for any modern web application.
          </p>
        </div>

        {/* 3 Interactive Showcase Cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Action Dispatches & Status Tags */}
          <Card className="border-border/70 bg-card">
            <CardHeader>
              <CardTitle className="text-base font-bold">
                Feedback & Badges
              </CardTitle>
              <CardDescription className="text-xs">
                Trigger toast alerts and explore system status indicators.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() => handleTriggerSimulatedAlert("success")}
                >
                  Success Toast
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleTriggerSimulatedAlert("info")}
                >
                  Info Toast
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTriggerSimulatedAlert("warning")}
                >
                  Warning Toast
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleTriggerSimulatedAlert("error")}
                >
                  Error Toast
                </Button>
              </div>

              <div className="border-t border-border pt-3 flex flex-wrap gap-2">
                <Badge>Active &middot; Healthy</Badge>
                <Badge variant="secondary">Syncing &middot; 98%</Badge>
                <Badge variant="outline">Standby</Badge>
                <Badge variant="destructive">Offline</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Form Controls & Settings */}
          <Card className="border-border/70 bg-card">
            <CardHeader>
              <CardTitle className="text-base font-bold">
                Form & Input Controls
              </CardTitle>
              <CardDescription className="text-xs">
                Interactive text inputs, toggles, and verification checks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3.5">
              <div className="space-y-1">
                <Label htmlFor="demo-input" className="text-xs">
                  Search & Filter Query
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="demo-input"
                    placeholder="e.g. status:active role:admin"
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
                    Email Notifications
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    Send automated activity digest
                  </p>
                </div>
                <Switch
                  checked={emailAlertsEnabled}
                  onCheckedChange={setEmailAlertsEnabled}
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  id="demo-checkbox"
                  checked={confirmDestructive}
                  onCheckedChange={(checked) => setConfirmDestructive(!!checked)}
                />
                <Label
                  htmlFor="demo-checkbox"
                  className="text-xs font-normal cursor-pointer"
                >
                  Require confirmation for critical actions
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: User Actions & Menus */}
          <Card className="border-border/70 bg-card">
            <CardHeader>
              <CardTitle className="text-base font-bold">
                Menus & User Context
              </CardTitle>
              <CardDescription className="text-xs">
                Dropdown menus, account switchers, and user cards.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium hover:bg-muted cursor-pointer">
                    <span>Manage Account</span>
                    <ChevronDown className="size-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52 p-1 rounded-xl shadow-lg">
                    <DropdownMenuLabel className="text-xs">
                      Account Options
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleTriggerSimulatedAlert("info")}
                      className="cursor-pointer text-xs"
                    >
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleTriggerSimulatedAlert("success")}
                      className="cursor-pointer text-xs"
                    >
                      Security Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleTriggerSimulatedAlert("error")}
                      variant="destructive"
                      className="cursor-pointer text-xs text-destructive"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center gap-2">
                  <Avatar className="size-8 border">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold leading-tight">
                      Jane Doe
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      Product Lead
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <span className="text-xs font-medium text-muted-foreground block mb-2">
                  Simulate Live Feedback Toasts:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleTriggerSimulatedAlert("success")}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    Success Toast
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleTriggerSimulatedAlert("error")}
                    className="text-destructive hover:text-destructive"
                  >
                    Error Toast
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleTriggerSimulatedAlert("warning")}
                    className="text-amber-600 hover:text-amber-700"
                  >
                    Warning Toast
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleTriggerSimulatedAlert("info")}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Info Toast
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
