import Link from "next/link";
import type { Metadata } from "next";
import { AppLogo } from "@/components/site/app-logo";
import { SiteBackground } from "@/components/site/site-background";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Acme",
  description: "Demo app with email, social, and enterprise SSO—Better Auth style UI.",
};

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteBackground />

      <header className="relative z-10 border-b border-border/50 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
          <AppLogo />
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "text-muted-foreground hover:text-foreground",
              )}
            >
              Sign in
            </Link>
            <Link href="/sign-up" className={cn(buttonVariants({ variant: "default", size: "sm" }))}>
              Create account
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm ring-1 ring-foreground/[0.04] backdrop-blur-sm dark:bg-card/50">
            <span className="size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(14,35,196,0.55)]" />
            Better Auth demo
          </p>
          <h1 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.1]">
            Authentication that feels built-in
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Email, social login, and enterprise SSO in one flow—polished UI you can ship beside your product.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/sign-up" className={cn(buttonVariants({ size: "lg" }), "h-10 px-6 sm:min-w-[10rem]")}>
              Get started
            </Link>
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-10 border-border/70 bg-background/50 px-6 backdrop-blur-sm sm:min-w-[10rem]",
              )}
            >
              Sign in
            </Link>
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Organization SSO?{" "}
            <Link href="/sign-in?sso=1" className="font-medium text-primary underline-offset-4 hover:underline">
              Continue with SSO
            </Link>
          </p>
        </div>
      </main>

      <footer className="relative z-10 border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Acme Inc.</p>
      </footer>
    </div>
  );
}
