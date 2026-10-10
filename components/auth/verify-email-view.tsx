"use client";

import * as React from "react";
import { VerifyEmailForm } from "./verify-email-form";

export function VerifyEmailView() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          Loading verification...
        </div>
      }
    >
      <VerifyEmailForm />
    </React.Suspense>
  );
}
