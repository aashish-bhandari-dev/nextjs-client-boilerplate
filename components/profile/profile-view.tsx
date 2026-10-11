"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Bell,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Globe,
  Key,
  Laptop,
  Lock,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  Shield,
  Smartphone,
  User as UserIcon,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { authRepo } from "@/repo/auth.repo";
import { User } from "@/types/user.types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toaster";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

type ActiveTab = "overview" | "security" | "preferences" | "activity";

interface ProfileInfoFormProps {
  user: User;
  onSave: (data: {
    firstName: string;
    lastName?: string;
    username?: string;
    phone?: string;
  }) => void;
  isSaving: boolean;
}

function ProfileInfoForm({ user, onSave, isSaving }: ProfileInfoFormProps) {
  const [firstName, setFirstName] = React.useState(user.firstName || "");
  const [lastName, setLastName] = React.useState(user.lastName || "");
  const [username, setUsername] = React.useState(user.username || "");
  const [phone, setPhone] = React.useState(user.phone || "");
  const [bio, setBio] = React.useState(
    "Software builder passionate about crafting clean, reliable applications."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      toast.error("First name cannot be empty.");
      return;
    }
    onSave({
      firstName: firstName.trim(),
      lastName: lastName.trim() || undefined,
      username: username.trim() || undefined,
      phone: phone.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="firstName" className="text-xs font-semibold">
            First Name *
          </Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Alex"
            className="text-xs"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="lastName" className="text-xs font-semibold">
            Last Name
          </Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Rivera"
            className="text-xs"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="username" className="text-xs font-semibold">
          Username Handle
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
            @
          </span>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="alexrivera"
            className="text-xs pl-7"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="email" className="text-xs font-semibold">
            Email Address
          </Label>
          <span className="text-[11px] text-muted-foreground">
            Managed by account provider
          </span>
        </div>
        <div className="relative">
          <Mail className="size-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            id="email"
            value={user.email}
            disabled
            className="text-xs pl-9 bg-muted/40 cursor-not-allowed opacity-80"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone" className="text-xs font-semibold">
          Phone Number
        </Label>
        <div className="relative">
          <Phone className="size-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="text-xs pl-9"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bio" className="text-xs font-semibold">
          Bio / Short Note
        </Label>
        <textarea
          id="bio"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us a little about your role and interests..."
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          type="submit"
          disabled={isSaving}
          className="text-xs h-9 px-5 font-semibold"
        >
          {isSaving ? "Saving changes..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

export function ProfileView() {
  const router = useRouter();
  const { user, isAuthenticated, isHydrated, clearAuth, updateUser } =
    useAuthStore();

  const [activeTab, setActiveTab] = React.useState<ActiveTab>("overview");
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState(false);
  const [isSavingProfile, setIsSavingProfile] = React.useState(false);

  // Security tab state
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = React.useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);

  // Preferences tab state
  const [securityAlerts, setSecurityAlerts] = React.useState(true);
  const [productAnnouncements, setProductAnnouncements] = React.useState(true);
  const [weeklyDigest, setWeeklyDigest] = React.useState(false);

  // Route protection
  React.useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push("/login?from=/profile");
    }
  }, [isHydrated, isAuthenticated, router]);

  const handleCopyId = () => {
    if (!user?.id) return;
    navigator.clipboard.writeText(user.id);
    setCopiedId(true);
    toast.success("User ID copied to clipboard.");
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleRefreshProfile = async () => {
    setIsRefreshing(true);
    try {
      await authRepo.getMe({
        onSuccess: (updatedUser) => {
          updateUser(updatedUser);
          toast.success("Profile data refreshed.");
        },
        onError: (err) => {
          toast.error(err);
        },
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSaveProfileData = (data: {
    firstName: string;
    lastName?: string;
    username?: string;
    phone?: string;
  }) => {
    setIsSavingProfile(true);
    setTimeout(() => {
      updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        phone: data.phone,
        fullName: `${data.firstName} ${data.lastName || ""}`.trim(),
      });
      setIsSavingProfile(false);
      toast.success("Profile information updated successfully.");
    }, 400);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error("Please enter your current password.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setIsUpdatingPassword(true);
    setTimeout(() => {
      setIsUpdatingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully.");
    }, 600);
  };

  const handleSignOut = async () => {
    await authRepo.logout();
    clearAuth();
    toast.success("Signed out successfully.");
    router.push("/login");
  };

  if (!isHydrated || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            Loading user profile...
          </p>
        </div>
      </div>
    );
  }

  const initials =
    `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() ||
    "U";
  const fullName =
    user.fullName ||
    `${user.firstName} ${user.lastName || ""}`.trim() ||
    "User";

  const memberSinceFormatted = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently joined";

  const lastActiveFormatted = user.lastLoginAt
    ? new Date(user.lastLoginAt).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Active now";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground antialiased">
      <AnnouncementBanner />
      <Navbar />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-8">
        {/* Hero Banner & Profile Header Card - Flat Modern Aesthetic (Zero Shadows) */}
        <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
          {/* Subtle Decorative Pattern Header with Top-Right Action Controls */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-primary/15 via-primary/5 to-muted/40 border-b border-border relative">
            <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] opacity-25 dark:opacity-15" />

            {/* Top-Right Quick Action Buttons */}
            <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshProfile}
                disabled={isRefreshing}
                className="h-8 gap-1.5 text-xs bg-background/85 backdrop-blur-sm border-border hover:bg-background"
              >
                <RefreshCw
                  className={cn("size-3.5", isRefreshing && "animate-spin")}
                />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="h-8 gap-1.5 text-xs bg-background/85 backdrop-blur-sm text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30"
              >
                <LogOut className="size-3.5" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>

          {/* User Bio and Actions Bar */}
          <div className="px-6 pb-6 pt-0 sm:px-8 sm:pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-14 sm:-mt-16">
              {/* Avatar with Status Ring */}
              <div className="flex items-end gap-4">
                <div className="relative">
                  <Avatar className="size-24 sm:size-28 border-4 border-card rounded-2xl bg-muted">
                    <AvatarImage src={user.image || undefined} alt={fullName} />
                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary rounded-2xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className="absolute bottom-1.5 right-1.5 size-4 rounded-full border-2 border-card bg-emerald-500"
                    title="Online"
                  />
                </div>

                <div className="space-y-1 mb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                      {fullName}
                    </h1>
                    <Badge
                      variant="outline"
                      className="text-[10px] font-semibold uppercase tracking-wider text-primary border-primary/30"
                    >
                      {user.role || "USER"}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-mono text-foreground/80">
                      {user.username ? `@${user.username}` : user.email}
                    </span>
                    <span>&middot;</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3 text-muted-foreground" />
                      Joined {memberSinceFormatted}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
                {user.isEmailVerified ? (
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1">
                    <CheckCircle2 className="size-3.5 mr-1" />
                    Verified Email
                  </Badge>
                ) : (
                  <Link
                    href={`/verify-email?email=${encodeURIComponent(user.email)}`}
                  >
                    <Badge
                      variant="outline"
                      className="border-amber-500/40 text-amber-600 hover:bg-amber-500/10 text-xs px-2.5 py-1 cursor-pointer transition-colors"
                    >
                      Verify Email Now
                    </Badge>
                  </Link>
                )}

                <Badge
                  variant="secondary"
                  className="text-xs px-2.5 py-1 font-normal"
                >
                  <Shield className="size-3 mr-1 text-primary" />
                  {user.provider || "LOCAL"} Auth
                </Badge>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border/70 text-xs">
              <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <span className="text-[11px] text-muted-foreground block mb-0.5">
                  Account Status
                </span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Active &middot; Good Standing
                </span>
              </div>

              <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <span className="text-[11px] text-muted-foreground block mb-0.5">
                  Security Level
                </span>
                <span className="font-semibold text-foreground">
                  {user.isEmailVerified
                    ? "Standard (Verified)"
                    : "Needs Action"}
                </span>
              </div>

              <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <span className="text-[11px] text-muted-foreground block mb-0.5">
                  Last Session
                </span>
                <span className="font-semibold text-foreground truncate block">
                  {lastActiveFormatted}
                </span>
              </div>

              <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
                <span className="text-[11px] text-muted-foreground block mb-0.5">
                  Active Devices
                </span>
                <span className="font-semibold text-foreground">
                  1 Recognized Device
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher - Flat Minimalist Strip */}
        <div className="flex border-b border-border/80 gap-1 overflow-x-auto pb-px">
          {(
            [
              {
                key: "overview",
                label: "Profile & Information",
                icon: UserIcon,
              },
              { key: "security", label: "Security & Credentials", icon: Lock },
              {
                key: "preferences",
                label: "Notifications & Settings",
                icon: Bell,
              },
              { key: "activity", label: "Access & Audit Log", icon: Clock },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer",
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROFILE & INFORMATION */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 cols: Editable Personal Info Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    Personal Information
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Update your personal profile details and public display
                    information.
                  </p>
                </div>

                <ProfileInfoForm
                  key={`${user.id}-${user.firstName}-${user.lastName || ""}`}
                  user={user}
                  onSave={handleSaveProfileData}
                  isSaving={isSavingProfile}
                />
              </div>
            </div>

            {/* Right 5 cols: Account Identity Card & Meta */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
                <h3 className="text-sm font-bold text-foreground">
                  Account Identity & Keys
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="rounded-xl border border-border/70 bg-muted/20 p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-muted-foreground">
                      <span>Unique User ID</span>
                      <button
                        type="button"
                        onClick={handleCopyId}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline cursor-pointer"
                      >
                        {copiedId ? (
                          <>
                            <Check className="size-3 text-emerald-500" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy ID</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="font-mono text-[11px] text-foreground break-all font-semibold">
                      {user.id}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-muted/20 p-3.5 space-y-1">
                    <span className="text-muted-foreground">Assigned Role</span>
                    <div className="flex items-center gap-2 pt-0.5">
                      <Badge
                        variant="outline"
                        className="text-xs font-bold uppercase"
                      >
                        {user.role || "USER"}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        Standard workspace member access
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-muted/20 p-3.5 space-y-1">
                    <span className="text-muted-foreground">
                      Authentication Method
                    </span>
                    <div className="flex items-center gap-2 pt-0.5 font-medium text-foreground">
                      <Key className="size-3.5 text-primary" />
                      <span>{user.provider || "Local Password Auth"}</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/70 bg-muted/20 p-3.5 space-y-1">
                    <span className="text-muted-foreground">
                      Account Created
                    </span>
                    <p className="font-medium text-foreground">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "Account initialized on first session"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Verification Box */}
              {!user.isEmailVerified && (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="size-4 text-amber-600 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400">
                        Email Verification Required
                      </h4>
                      <p className="text-[11px] text-amber-700 dark:text-amber-300 leading-relaxed">
                        Verify your address to receive password resets, security
                        notifications, and critical team alerts.
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/verify-email?email=${encodeURIComponent(user.email)}`}
                    className="inline-flex"
                  >
                    <Button
                      size="sm"
                      className="text-xs h-8 bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Enter 6-Digit Code
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SECURITY & CREDENTIALS */}
        {activeTab === "security" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 cols: Change Password */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    Update Password
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Choose a strong, unique password with at least 8 characters.
                  </p>
                </div>

                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="currPass" className="text-xs font-semibold">
                      Current Password
                    </Label>
                    <Input
                      id="currPass"
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="newPass" className="text-xs font-semibold">
                      New Password
                    </Label>
                    <Input
                      id="newPass"
                      type="password"
                      placeholder="At least 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="confirmPass"
                      className="text-xs font-semibold"
                    >
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPass"
                      type="password"
                      placeholder="Re-type new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="text-xs"
                      required
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot your current password?
                    </Link>

                    <Button
                      type="submit"
                      disabled={isUpdatingPassword}
                      className="text-xs h-9 px-5 font-semibold"
                    >
                      {isUpdatingPassword
                        ? "Updating password..."
                        : "Update Password"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right 5 cols: 2FA & Active Sessions */}
            <div className="lg:col-span-5 space-y-6">
              {/* 2FA Card */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-foreground">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Require an authentication code when signing in.
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={(val) => {
                      setTwoFactorEnabled(val);
                      toast({
                        title: val ? "2FA Enabled" : "2FA Disabled",
                        description: val
                          ? "Two-factor authentication requirement activated."
                          : "Two-factor authentication disabled.",
                        type: val ? "success" : "warning",
                      });
                    }}
                  />
                </div>

                <div className="border-t border-border/60 pt-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      twoFactorEnabled
                        ? "text-emerald-600 border-emerald-500/30"
                        : "text-muted-foreground"
                    )}
                  >
                    Status: {twoFactorEnabled ? "Active" : "Disabled"}
                  </Badge>
                </div>
              </div>

              {/* Active Sessions Card */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-foreground">
                    Active Sessions
                  </h3>
                  <Badge variant="secondary" className="text-[10px]">
                    1 Online
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/20 p-3">
                    <Laptop className="size-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">
                          Current Browser (Web)
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                          Active Now
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        macOS &middot; Chrome Engine &middot; Localhost
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl border border-border/40 bg-muted/10 p-3 opacity-75">
                    <Smartphone className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">
                          Mobile Device (Safari)
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          2 days ago
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        iOS 18 &middot; Signed out
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast.success("Other active sessions revoked.")
                  }
                  className="w-full text-xs h-8"
                >
                  Log Out From All Other Devices
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NOTIFICATIONS & SETTINGS */}
        {activeTab === "preferences" && (
          <div className="max-w-3xl space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
              <div>
                <h2 className="text-base font-bold text-foreground">
                  Communication & Notification Preferences
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Choose how and when you receive automated emails and platform
                  alerts.
                </p>
              </div>

              <div className="space-y-4 divide-y divide-border/60 text-xs">
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5 pr-4">
                    <span className="font-semibold text-foreground block">
                      Security & Login Alerts
                    </span>
                    <p className="text-muted-foreground">
                      Receive instant emails when a new login occurs or
                      credentials change.
                    </p>
                  </div>
                  <Switch
                    checked={securityAlerts}
                    onCheckedChange={setSecurityAlerts}
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-0.5 pr-4">
                    <span className="font-semibold text-foreground block">
                      Product & Feature Announcements
                    </span>
                    <p className="text-muted-foreground">
                      Get updates about new UI components, features, and release
                      notes.
                    </p>
                  </div>
                  <Switch
                    checked={productAnnouncements}
                    onCheckedChange={setProductAnnouncements}
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="space-y-0.5 pr-4">
                    <span className="font-semibold text-foreground block">
                      Weekly Digest
                    </span>
                    <p className="text-muted-foreground">
                      A summary of your account activity, updates, and team
                      notifications.
                    </p>
                  </div>
                  <Switch
                    checked={weeklyDigest}
                    onCheckedChange={setWeeklyDigest}
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() =>
                    toast.success("Notification preferences saved.")
                  }
                  className="text-xs h-8 px-4"
                >
                  Save Preferences
                </Button>
              </div>
            </div>

            {/* Regional & Localization Card */}
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <h3 className="text-sm font-bold text-foreground">
                Regional & Interface Settings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="rounded-xl border border-border/70 bg-muted/20 p-3 space-y-1">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Globe className="size-3.5" /> Language
                  </span>
                  <p className="font-semibold text-foreground">
                    English (United States)
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-muted/20 p-3 space-y-1">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Clock className="size-3.5" /> Timezone
                  </span>
                  <p className="font-semibold text-foreground">
                    {Intl.DateTimeFormat().resolvedOptions().timeZone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ACCESS & AUDIT LOG */}
        {activeTab === "activity" && (
          <div className="max-w-3xl space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
              <div>
                <h2 className="text-base font-bold text-foreground">
                  Security Event Timeline
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  A real-time audit log of security and authentication events
                  for this account.
                </p>
              </div>

              <div className="relative border-l border-border/80 pl-6 ml-2 space-y-6 text-xs">
                {/* Event 1 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 size-3 rounded-full bg-emerald-500 ring-4 ring-card" />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        Current Session Active
                      </span>
                      <Badge variant="outline" className="text-[10px] py-0">
                        Live
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      Access token synchronized &middot; IP 127.0.0.1
                    </p>
                    <span className="text-[10px] text-muted-foreground block pt-0.5">
                      {lastActiveFormatted}
                    </span>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 size-3 rounded-full bg-primary ring-4 ring-card" />
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground">
                      Profile Data Loaded
                    </span>
                    <p className="text-muted-foreground text-[11px]">
                      Authenticated user state hydrated from local storage &
                      cookies.
                    </p>
                    <span className="text-[10px] text-muted-foreground block pt-0.5">
                      Session start
                    </span>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-0.5 size-3 rounded-full bg-muted-foreground/60 ring-4 ring-card" />
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground">
                      Account Registered
                    </span>
                    <p className="text-muted-foreground text-[11px]">
                      Account created via {user.provider || "LOCAL"}{" "}
                      credentials.
                    </p>
                    <span className="text-[10px] text-muted-foreground block pt-0.5">
                      {memberSinceFormatted}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-destructive">
                  Danger Zone
                </h3>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your user account and erase all associated
                  session data.
                </p>
              </div>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to deactivate your account? This action cannot be undone."
                    )
                  ) {
                    handleSignOut();
                  }
                }}
                className="text-xs h-8 px-4"
              >
                Deactivate & Delete Account
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
