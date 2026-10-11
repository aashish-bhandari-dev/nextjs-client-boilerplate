"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Layers,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/auth.store";
import { authRepo } from "@/repo/auth.repo";
import { loginFormSchema } from "@/schemas/auth.schema";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const parseResult = loginFormSchema.safeParse({
      identifier,
      password,
      rememberMe,
    });

    if (!parseResult.success) {
      const msg =
        parseResult.error.issues[0]?.message ||
        "Please enter valid credentials.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    const trimmedIdentifier = identifier.trim();
    setIsLoading(true);

    await authRepo.login({
      credentials: { identifier: trimmedIdentifier, password },
      onSuccess: (data) => {
        setAuth(data, rememberMe);
        toast.success(`Welcome back, ${data.user.firstName || "User"}!`);
        const redirectUrl = searchParams.get("from") || "/";
        router.push(redirectUrl);
        router.refresh();
      },
      onError: (message) => {
        setErrorMessage(message);
        toast.error(message);
        setIsLoading(false);

        // If email is not verified, suggest verification page
        if (
          message.toLowerCase().includes("verify") ||
          message.toLowerCase().includes("not verified")
        ) {
          setTimeout(() => {
            router.push(
              `/verify-email?email=${encodeURIComponent(trimmedIdentifier)}`
            );
          }, 1500);
        }
      },
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Brand Icon & Header */}
      <div className="space-y-2 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-3">
          <Layers className="size-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome back
        </h2>
        <p className="text-muted-foreground text-sm">
          Enter your account credentials to access your workspace.
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
        {/* Identifier Field */}
        <div className="space-y-1.5">
          <Label htmlFor="identifier" className="text-xs font-semibold">
            Email, Username, or Phone
          </Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 pointer-events-none" />
            <Input
              id="identifier"
              type="text"
              autoComplete="username"
              placeholder="name@example.com or username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={isLoading}
              className="pl-9 text-sm"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-semibold">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-primary hover:text-primary/80 text-xs font-medium hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 pointer-events-none" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Remember Me */}
        <div className="flex items-center space-x-2 pt-0.5">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(!!checked)}
            disabled={isLoading}
          />
          <Label
            htmlFor="rememberMe"
            className="text-muted-foreground text-xs font-normal cursor-pointer select-none"
          >
            Keep me signed in for 30 days
          </Label>
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
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {/* Footer link to register */}
      <div className="text-muted-foreground text-center text-xs pt-2">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}
