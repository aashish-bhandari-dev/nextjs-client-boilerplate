"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Layers,
  Loader2,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/auth.store";
import { authRepo } from "@/repo/auth.repo";
import { registerFormSchema } from "@/schemas/auth.schema";

export function RegisterForm() {
  const router = useRouter();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [terms, setTerms] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const parseResult = registerFormSchema.safeParse({
      firstName,
      lastName,
      username: username || undefined,
      email,
      phone: phone || undefined,
      password,
      confirmPassword,
      terms,
    });

    if (!parseResult.success) {
      const msg =
        parseResult.error.issues[0]?.message ||
        "Please check your registration details.";
      setErrorMessage(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);

    await authRepo.register({
      data: {
        firstName,
        lastName: lastName || undefined,
        username: username || undefined,
        email,
        phone: phone || undefined,
        password,
      },
      onSuccess: (data) => {
        setIsLoading(false);

        // Check if user needs email verification
        if (data.requiresVerification?.email || !data.tokens?.accessToken) {
          toast.success(
            "Account created! Please check your email for the verification code."
          );
          if (data.otp) {
            toast.info(`Development OTP: ${data.otp}`, { duration: 10000 });
          }
          router.push(
            `/verify-email?email=${encodeURIComponent(email.trim().toLowerCase())}`
          );
        } else {
          // Direct login if tokens are provided
          setAuth(data, true);
          toast.success(
            `Welcome, ${data.user.firstName}! Your account is ready.`
          );
          router.push("/");
          router.refresh();
        }
      },
      onError: (message) => {
        setErrorMessage(message);
        toast.error(message);
        setIsLoading(false);
      },
    });
  };

  return (
    <div className="w-full space-y-5">
      {/* Brand Icon & Header */}
      <div className="space-y-1.5 text-center">
        <div className="mx-auto flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-3">
          <Layers className="size-6" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Create an account
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Get started with your free workspace. No credit card required.
        </p>
      </div>

      {errorMessage && (
        <div className="border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-2 rounded-lg border p-3 text-xs">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Name Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-xs font-semibold">
              First Name *
            </Label>
            <div className="relative">
              <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 pointer-events-none" />
              <Input
                id="firstName"
                type="text"
                placeholder="Alex"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isLoading}
                className="pl-9 text-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-xs font-semibold">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Morgan"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
              className="text-sm"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold">
            Email Address *
          </Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 pointer-events-none" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="pl-9 text-sm"
              required
            />
          </div>
        </div>

        {/* Username & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="username" className="text-xs font-semibold">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              autoComplete="username"
              placeholder="alexm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 pointer-events-none" />
              <Input
                id="phone"
                type="tel"
                placeholder="+1 234 567 890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
                className="pl-9 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Password Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-semibold">
              Password *
            </Label>
            <div className="relative">
              <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 pointer-events-none" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Min 6 chars"
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

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword" className="text-xs font-semibold">
              Confirm Password *
            </Label>
            <div className="relative">
              <Lock className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 pointer-events-none" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className="pl-9 text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start space-x-2 pt-1">
          <Checkbox
            id="terms"
            checked={terms}
            onCheckedChange={(checked) => setTerms(!!checked)}
            disabled={isLoading}
            className="mt-0.5"
          />
          <Label
            htmlFor="terms"
            className="text-muted-foreground text-xs font-normal leading-snug cursor-pointer select-none"
          >
            I agree to the{" "}
            <Link href="#terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
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
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {/* Footer link to sign in */}
      <div className="text-muted-foreground text-center text-xs pt-1">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
