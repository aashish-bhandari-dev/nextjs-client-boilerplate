import type { Metadata } from "next";
import { RegisterView } from "@/components/auth/register-view";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Get started with your free account. No credit card required.",
};

export default function RegisterPage() {
  return <RegisterView />;
}
