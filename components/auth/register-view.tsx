"use client";

import * as React from "react";
import { RegisterForm } from "./register-form";

export function RegisterView() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          Loading registration...
        </div>
      }
    >
      <RegisterForm />
    </React.Suspense>
  );
}
