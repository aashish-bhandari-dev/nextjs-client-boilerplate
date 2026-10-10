"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toaster";
import { authRepo } from "@/repo/auth.repo";
import { resetPasswordFormSchema } from "@/schemas/auth.schema";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailParam = searchParams.get("email") || "";
  const codeParam = searchParams.get("code") || searchParams.get("token") || "";

  const [email, setEmail] = React.useState(emailParam);
  const [tokenOrOtp, setTokenOrOtp] = React.useState(codeParam);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const parseResult = resetPasswordFormSchema.safeParse({
      email,
      tokenOrOtp,
      newPassword,
      confirmPassword,
    });

    if (!parseResult.success) {
      const msg =
        parseResult.error.issues[0]?.message || "Please check the form fields.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);

    await authRepo.resetPassword({
      data: {
        email: email.trim().toLowerCase(),
        tokenOrOtp: tokenOrOtp.trim(),
        newPassword,
      },
      onSuccess: (message) => {
        setIsLoading(false);
        toast.success(message);
        router.push(`/login?email=${encodeURIComponent(email.trim().toLowerCase())}`);
      },
      onError: (message) => {
        setIsLoading(false);
        setErrorMessage(message);
        toast.error(message);
      },
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Brand Icon & Header */}
      <div className="space-y-2 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 mb-3">
          <ShieldCheck className="size-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Reset your password
        </h2>
        <p className="text-muted-foreground text-sm">
          Enter the reset code sent to your email and choose a strong new password.
        </p>
      </div>

      {errorMessage && (
        <div className="border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-2 rounded-lg border p-3 text-xs">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 pointer-events-none" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="pl-9 text-sm"
              required
            />
          </div>
        </div>

        {/* Reset Code / Token */}
        <div className="space-y-1.5">
          <Label htmlFor="tokenOrOtp" className="text-xs font-semibold">
            Reset Code or Token
          </Label>
          <div className="relative">
            <KeyRound className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 pointer-events-none" />
            <Input
              id="tokenOrOtp"
              type="text"
              placeholder="Enter OTP code or token"
              value={tokenOrOtp}
              onChange={(e) => setTokenOrOtp(e.target.value)}
              disabled={isLoading}
              className="pl-9 text-sm font-mono"
              required
            />
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <Label htmlFor="newPassword" className="text-xs font-semibold">
            New Password
          </Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 pointer-events-none" />
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Minimum 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isLoading}
              className="px-9 text-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 p-0.5 rounded cursor-pointer"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" className="text-xs font-semibold">
            Confirm New Password
          </Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 pointer-events-none" />
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              className="pl-9 text-sm"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full text-sm font-semibold h-10 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting password...
            </>
          ) : (
            <>
              Update Password
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {/* Return to login link */}
      <div className="text-center pt-2">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
