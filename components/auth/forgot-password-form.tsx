"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  Loader2,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toaster";
import { authRepo } from "@/repo/auth.repo";
import { forgotPasswordFormSchema } from "@/schemas/auth.schema";

export function ForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successInfo, setSuccessInfo] = React.useState<{
    message: string;
    otp?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const parseResult = forgotPasswordFormSchema.safeParse({ email });
    if (!parseResult.success) {
      const msg = parseResult.error.issues[0]?.message || "Invalid email address.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);

    await authRepo.forgotPassword({
      data: { email: email.trim().toLowerCase() },
      onSuccess: (message, otp) => {
        setIsLoading(false);
        setSuccessInfo({ message, otp });
        toast.success(message);
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
          <KeyRound className="size-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Forgot your password?
        </h2>
        <p className="text-muted-foreground text-sm">
          No worries. Enter your registered email address and we will send you instructions and a reset code.
        </p>
      </div>

      {errorMessage && (
        <div className="border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-2 rounded-lg border p-3 text-xs">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successInfo ? (
        <div className="space-y-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-left">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-foreground">
                Instructions Sent
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {successInfo.message}
              </p>
              {successInfo.otp && (
                <div className="mt-2 rounded-md bg-background/80 border p-2 text-xs font-mono">
                  <span className="text-muted-foreground">Dev Code: </span>
                  <span className="font-bold text-primary">{successInfo.otp}</span>
                </div>
              )}
            </div>
          </div>

          <Button
            type="button"
            onClick={() =>
              router.push(
                `/reset-password?email=${encodeURIComponent(email.trim().toLowerCase())}${
                  successInfo.otp ? `&code=${encodeURIComponent(successInfo.otp)}` : ""
                }`,
              )
            }
            className="w-full text-sm font-semibold h-10"
          >
            Enter Reset Code
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-sm font-semibold h-10"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending reset code...
              </>
            ) : (
              <>
                Send Reset Code
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      )}

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
