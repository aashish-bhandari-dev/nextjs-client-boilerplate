import type { Metadata } from "next";
import { LoginView } from "@/components/auth/login-view";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account to access your workspace and tools.",
};

export default function LoginPage() {
  return <LoginView />;
}
