"use client";

import * as React from "react";
import { ForgotPasswordForm } from "./forgot-password-form";

export function ForgotPasswordView() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          Loading...
        </div>
      }
    >
      <ForgotPasswordForm />
    </React.Suspense>
  );
}
