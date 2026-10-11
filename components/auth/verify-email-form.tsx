"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  KeyRound,
  Loader2,
  Mail,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toaster";
import { authRepo } from "@/repo/auth.repo";
import { useAuthStore } from "@/store/auth.store";
import { verifyEmailOtpFormSchema } from "@/schemas/auth.schema";

export function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, user } = useAuthStore();

  const initialEmail = searchParams.get("email") || user?.email || "";
  const [email, setEmail] = React.useState(initialEmail);
  const [otp, setOtp] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isResending, setIsResending] = React.useState(false);
  const [resendCooldown, setResendCooldown] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const parseResult = verifyEmailOtpFormSchema.safeParse({ email, otp });
    if (!parseResult.success) {
      const msg =
        parseResult.error.issues[0]?.message ||
        "Please enter a valid 6-digit OTP code.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);

    await authRepo.verifyEmailOtp({
      data: {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      },
      onSuccess: (verifiedUser) => {
        setIsLoading(false);
        setUser(verifiedUser);
        toast.success("Email verified successfully! You can now log in.");
        router.push(
          `/login?email=${encodeURIComponent(email.trim().toLowerCase())}`
        );
      },
      onError: (message) => {
        setIsLoading(false);
        setErrorMessage(message);
        toast.error(message);
      },
    });
  };

  const handleResend = async () => {
    if (!email || resendCooldown > 0 || isResending) return;
    setIsResending(true);
    setErrorMessage(null);

    await authRepo.resendVerificationOtp({
      email: email.trim().toLowerCase(),
      onSuccess: (message, devOtp) => {
        setIsResending(false);
        setResendCooldown(60);
        toast.success(message);
        if (devOtp) {
          toast.info(`Development OTP: ${devOtp}`, { duration: 10000 });
        }
      },
      onError: (message) => {
        setIsResending(false);
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
          <Mail className="size-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Verify your email
        </h2>
        <p className="text-muted-foreground text-sm">
          We&apos;ve sent a 6-digit confirmation code to your email address.
          Enter it below to activate your account.
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
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="pl-9 text-sm"
              required
            />
          </div>
        </div>

        {/* 6-Digit OTP */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="otp" className="text-xs font-semibold">
              6-Digit Verification Code
            </Label>
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending || resendCooldown > 0 || !email}
              className="text-primary hover:text-primary/80 disabled:text-muted-foreground text-xs font-medium hover:underline inline-flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw
                className={`h-3 w-3 ${isResending ? "animate-spin" : ""}`}
              />
              <span>
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : isResending
                    ? "Sending..."
                    : "Resend Code"}
              </span>
            </button>
          </div>
          <div className="relative">
            <KeyRound className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 pointer-events-none" />
            <Input
              id="otp"
              type="text"
              maxLength={6}
              placeholder="123456"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))
              }
              disabled={isLoading}
              className="pl-9 text-base tracking-widest font-mono text-center sm:text-left"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading || otp.length !== 6}
          className="w-full text-sm font-semibold h-10 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying code...
            </>
          ) : (
            <>
              Verify & Continue
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
