"use client";

import { Provider as ToastProvider } from "@radix-ui/react-toast";

export default function Toast({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
