"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, LogOut, Mail, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
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
        <div
          className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.55_0.18_280_/_0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.55_0.18_280_/_0.08),transparent)]"
          aria-hidden
        />
        <header className="relative z-10 border-b border-border/60 bg-background/80 backdrop-blur-sm">
          <div className="mx-auto flex h-14 max-w-5xl items-center px-4 sm:px-6">
            <div className="h-8 w-28 animate-pulse rounded-md bg-muted" />
          </div>
        </header>
        <main className="relative z-10 mx-auto max-w-md px-4 py-10 sm:px-6">
          <Card className="border-border/60 bg-card/85 shadow-lg backdrop-blur-sm">
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
          <span className="text-sm font-medium text-muted-foreground">Dashboard</span>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-md flex-1 px-4 py-10 sm:px-6">
        <Card className="border-border/60 bg-card/85 shadow-lg shadow-black/5 backdrop-blur-md dark:shadow-black/20">
          <CardHeader className="flex flex-col items-center space-y-4 text-center sm:items-start sm:text-left">
            <Avatar className="size-20 text-lg">
              {user.image ? <AvatarImage src={user.image} alt="" /> : null}
              <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-xl">{displayName}</CardTitle>
              <CardDescription>Signed in to your Acme workspace.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <dl className="space-y-4 text-sm">
              <div className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <UserRound className="size-4 text-muted-foreground" aria-hidden />
                </div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <dt className="text-muted-foreground">Name</dt>
                  <dd className="font-medium text-foreground">{user.name?.trim() || "—"}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Mail className="size-4 text-muted-foreground" aria-hidden />
                </div>
                <div className="min-w-0 flex-1 space-y-0.5">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="break-all font-medium text-foreground">{email || "—"}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-0 flex-1 space-y-0.5 pl-12">
                  <dt className="text-muted-foreground">Email status</dt>
                  <dd className="font-medium text-foreground">
                    {verified ? "Verified" : "Not verified"}
                  </dd>
                </div>
              </div>
            </dl>

            <Separator />

            <Button
              type="button"
              variant="outline"
              className="w-full gap-2"
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
