import Link from "next/link";
import type { ReactNode } from "react";
import { Building2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/40 px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.55_0.18_280_/_0.18),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.55_0.18_280_/_0.12),transparent)]"
        aria-hidden
      />
      <div className="relative w-full max-w-[440px] space-y-6">
        <div className="text-center">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "inline-flex h-auto gap-2 px-2 py-1 text-base font-semibold",
            )}
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Building2 className="size-5" aria-hidden />
            </span>
            Acme App
          </Link>
        </div>

        <Card className="border-border/60 bg-card/85 shadow-lg shadow-black/5 backdrop-blur-md dark:bg-card/90 dark:shadow-black/20">
          <CardHeader className="space-y-1 border-0 pb-0 text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
            <CardDescription className="text-pretty">{subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">{children}</CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">{footer}</p>
      </div>
    </div>
  );
}

export function AuthDivider({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("relative my-6", className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <Separator className="w-full" />
      </div>
      <div className="relative flex justify-center text-xs font-medium uppercase tracking-wide">
        <span className="bg-card px-3 text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}
