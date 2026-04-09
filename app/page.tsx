import Link from "next/link";
import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Acme",
  description: "Operations and collaboration for modern teams.",
};

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.55_0.18_280_/_0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.55_0.18_280_/_0.08),transparent)]"
        aria-hidden
      />

      <header className="relative z-10 border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "gap-2 px-2 text-base font-semibold hover:bg-transparent",
            )}
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Building2 className="size-4" aria-hidden />
            </span>
            Acme
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/sign-in" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
              Sign in
            </Link>
            <Link href="/sign-up" className={cn(buttonVariants({ variant: "default", size: "sm" }))}>
              Create account
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-sm font-medium text-primary">Welcome</p>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Work that stays in sync
          </h1>
          <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
            Acme helps your team ship faster with a single place for accounts, access, and day-to-day
            collaboration.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/sign-up" className={cn(buttonVariants({ size: "lg" }), "sm:min-w-[9.5rem]")}>
              Get started
            </Link>
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "sm:min-w-[9.5rem]")}
            >
              Sign in
            </Link>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Use organization SSO?{" "}
            <Link href="/sign-in?sso=1" className="font-medium text-primary underline-offset-4 hover:underline">
              Continue with SSO
            </Link>
          </p>
        </div>
      </main>

      <footer className="relative z-10 border-t border-border/60 py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Acme Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
