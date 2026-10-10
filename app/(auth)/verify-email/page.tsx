import type { Metadata } from "next";
import { VerifyEmailView } from "@/components/auth/verify-email-view";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address using the 6-digit confirmation code.",
};

export default function VerifyEmailPage() {
  return <VerifyEmailView />;
}
