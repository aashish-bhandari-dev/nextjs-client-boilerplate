import type { Metadata } from "next";
import { ResetPasswordView } from "@/components/auth/reset-password-view";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your account.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordView />;
}
