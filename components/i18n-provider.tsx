"use client";

import { useEffect } from "react";
import "@/lib/i18n";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // i18n is initialized in the imported module
  return <>{children}</>;
}
