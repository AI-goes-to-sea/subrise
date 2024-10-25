"use client";

import { SWRConfig } from "swr";

export default function GlobalSWRProvider ({children}: {
  children: React.ReactNode;
}) {
  return <SWRConfig>{children}</SWRConfig>
}