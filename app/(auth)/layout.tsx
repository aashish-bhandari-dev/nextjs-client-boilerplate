import * as React from "react";
import type { Metadata } from "next";
import { AuthCardLayout } from "@/components/auth/auth-card-layout";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `Authentication | ${siteConfig.name}`,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthCardLayout>{children}</AuthCardLayout>;
}
