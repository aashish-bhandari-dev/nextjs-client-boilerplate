"use client";

import * as React from "react";
import { ResetPasswordForm } from "./reset-password-form";

export function ResetPasswordView() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          Loading reset form...
        </div>
      }
    >
      <ResetPasswordForm />
    </React.Suspense>
  );
}
