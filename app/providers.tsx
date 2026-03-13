"use client";

import dynamic from "next/dynamic";

const HeroUIProvider = dynamic(
  () => import("@heroui/react").then((mod) => mod.HeroUIProvider),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
