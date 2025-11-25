"use client";

import { SessionProvider } from "next-auth/react";
import { DataProvider } from "@/context/DataContext";

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <DataProvider>{children}</DataProvider>
    </SessionProvider>
  );
}
