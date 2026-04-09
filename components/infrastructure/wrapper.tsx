"use client";

import Link from "next/link";

import { InfrastructureLogo } from "@/components/infrastructure/logo";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * Shell from `~/dev/infrastructure/examples/nextjs/components/wrapper.tsx`
 * (grid background, top bar, content column).
 */
export function InfrastructureWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full justify-center bg-white bg-grid-small-black/[0.2] dark:bg-black dark:bg-grid-small-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black md:flex" />
      <div className="absolute z-50 flex w-full items-center justify-between border-b border-border bg-white px-4 py-2 dark:bg-black lg:w-8/12 md:px-1">
        <Link href="/">
          <div className="flex cursor-pointer gap-2">
            <InfrastructureLogo />
            <p className="text-black dark:text-white">BETTER-AUTH.</p>
          </div>
        </Link>
        <div className="z-50 flex items-center">
          <ThemeToggle />
        </div>
      </div>
      <div className="mt-20 w-full lg:w-7/12">{children}</div>
    </div>
  );
}
