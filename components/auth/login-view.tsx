"use client";

import * as React from "react";
import { LoginForm } from "./login-form";

export function LoginView() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          Loading sign in...
        </div>
      }
    >
      <LoginForm />
    </React.Suspense>
  );
}
