"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BadgeCheck, LogOut, Mail, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { AppLogo } from "@/components/site/app-logo";
import { SiteBackground } from "@/components/site/site-background";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function getInitials(name: string | null | undefined, email: string | null | undefined) {
  const n = name?.trim();
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  }
  const e = email?.trim();
  if (e) return e.slice(0, 2).toUpperCase();
  return "?";
}

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  async function handleSignOut() {
    setSigningOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/"),
        onError: () => setSigningOut(false),
      },
    });
    setSigningOut(false);
  }

  if (isPending) {
    return (
      <div className="relative min-h-screen bg-background">
        <SiteBackground />
        <header className="relative z-10 border-b border-border/50 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex h-14 max-w-5xl items-center px-4 sm:h-16 sm:px-6">
            <div className="h-8 w-28 animate-pulse rounded-md bg-muted" />
          </div>
        </header>
        <main className="relative z-10 mx-auto max-w-lg px-4 py-12 sm:px-6 sm:py-16">
          <Card className="border-border/50 bg-card/90 shadow-xl shadow-black/[0.04] ring-1 ring-foreground/[0.06] backdrop-blur-md dark:shadow-black/25 dark:ring-white/[0.08]">
            <CardHeader className="space-y-4">
              <div className="size-16 animate-pulse rounded-full bg-muted" />
              <div className="h-6 w-40 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-full max-w-xs animate-pulse rounded-md bg-muted" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
              <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4">
        <p className="text-center text-sm text-muted-foreground">
          We couldn&apos;t load your session: {error.message}
        </p>
        <Link href="/sign-in" className={cn(buttonVariants({ variant: "default" }))}>
          Back to sign in
        </Link>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const { user } = session;
  const displayName = user.name?.trim() || "Your account";
  const email = user.email ?? "";
  const initials = getInitials(user.name, user.email);
  const verified = Boolean(user.emailVerified);

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteBackground />

      <header className="relative z-10 border-b border-border/50 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
          <AppLogo />
          <span className="rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
            Dashboard
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-lg flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <Card className="border-border/50 bg-card/90 shadow-xl shadow-black/[0.04] ring-1 ring-foreground/[0.06] backdrop-blur-md dark:shadow-black/25 dark:ring-white/[0.08]">
          <CardHeader className="flex flex-col items-center space-y-4 text-center sm:items-start sm:text-left">
            <Avatar className="size-[4.5rem] text-lg ring-2 ring-background shadow-md">
              {user.image ? <AvatarImage src={user.image} alt="" /> : null}
              <AvatarFallback className="bg-primary/12 text-lg font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1.5">
              <CardTitle className="font-heading text-xl font-semibold tracking-tight">{displayName}</CardTitle>
              <CardDescription className="text-[0.9375rem] leading-relaxed">
                Signed in to your Acme workspace.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <dl className="space-y-3 text-sm">
              <div className="flex gap-3 rounded-xl border border-border/50 bg-muted/25 p-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background/80 ring-1 ring-border/50">
                  <UserRound className="size-4 text-muted-foreground" aria-hidden />
                </div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <dt className="text-xs font-medium text-muted-foreground">Name</dt>
                  <dd className="font-medium text-foreground">{user.name?.trim() || "—"}</dd>
                </div>
              </div>
              <div className="flex gap-3 rounded-xl border border-border/50 bg-muted/25 p-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background/80 ring-1 ring-border/50">
                  <Mail className="size-4 text-muted-foreground" aria-hidden />
                </div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <dt className="text-xs font-medium text-muted-foreground">Email</dt>
                  <dd className="break-all font-medium text-foreground">{email || "—"}</dd>
                </div>
              </div>
              <div className="flex gap-3 rounded-xl border border-border/50 bg-muted/25 p-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background/80 ring-1 ring-border/50">
                  <BadgeCheck className="size-4 text-muted-foreground" aria-hidden />
                </div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <dt className="text-xs font-medium text-muted-foreground">Email status</dt>
                  <dd className="font-medium text-foreground">
                    {verified ? "Verified" : "Not verified"}
                  </dd>
                </div>
              </div>
            </dl>

            <Separator className="opacity-60" />

            <Button
              type="button"
              variant="outline"
              className="w-full gap-2 border-border/70 bg-background/40 backdrop-blur-sm"
              onClick={handleSignOut}
              disabled={signingOut}
            >
              <LogOut className="size-4" aria-hidden />
              {signingOut ? "Signing out…" : "Sign out"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
