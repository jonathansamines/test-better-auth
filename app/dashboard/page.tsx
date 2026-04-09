"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DashboardAccountStrip } from "./dashboard-account-strip";
import { DashboardOrganizationCard } from "./dashboard-organization-card";
import { DashboardUserCard } from "./dashboard-user-card";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-4">
          <div className="h-9 w-[250px] animate-pulse rounded-md bg-muted" />
          <Card className="border-border shadow-sm ring-0">
            <CardHeader className="space-y-4">
              <div className="h-5 w-24 animate-pulse rounded bg-muted" />
              <div className="flex gap-4">
                <div className="hidden h-9 w-9 animate-pulse rounded-full bg-muted sm:block" />
                <div className="space-y-2">
                  <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-56 animate-pulse rounded bg-muted" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-16 w-full max-w-md animate-pulse rounded-md bg-muted" />
              <div className="h-24 w-full animate-pulse rounded-md bg-muted" />
            </CardContent>
          </Card>
          <Card className="border-border shadow-sm ring-0">
            <CardHeader>
              <div className="h-5 w-36 animate-pulse rounded bg-muted" />
            </CardHeader>
            <CardContent className="h-40 animate-pulse rounded-md bg-muted/60" />
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4 py-16">
        <p className="max-w-md text-center text-sm text-muted-foreground">
          We couldn&apos;t load your session: {error.message}
        </p>
        <Link href="/sign-in" className={cn(buttonVariants({ variant: "default", size: "lg" }))}>
          Back to sign in
        </Link>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <DashboardAccountStrip />
        <DashboardUserCard />
        <DashboardOrganizationCard />
      </div>
    </div>
  );
}
