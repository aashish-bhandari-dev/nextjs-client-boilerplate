import type { Metadata } from "next";
import { ForgotPasswordView } from "@/components/auth/forgot-password-view";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your account password with your registered email.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
