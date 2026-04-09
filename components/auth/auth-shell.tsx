import type { ReactNode } from "react";

import { AppLogo } from "@/components/site/app-logo";
import { SiteBackground } from "@/components/site/site-background";
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/50 px-4 py-14 sm:px-6">
      <SiteBackground />
      <div className="relative w-full max-w-[420px] space-y-8">
        <div className="flex justify-center">
          <AppLogo name="Acme App" className="inline-flex" />
        </div>

        <Card className="border-border/50 bg-card/90 shadow-xl shadow-black/[0.04] ring-1 ring-foreground/[0.06] backdrop-blur-md dark:bg-card/80 dark:shadow-black/30 dark:ring-white/[0.08]">
          <CardHeader className="space-y-2 border-0 pb-0 text-center">
            <CardTitle className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
              {title}
            </CardTitle>
            <CardDescription className="text-pretty text-[0.9375rem] leading-relaxed">
              {subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-1">{children}</CardContent>
        </Card>

        <p className="text-center text-sm leading-relaxed text-muted-foreground">{footer}</p>
      </div>
    </div>
  );
}

export function AuthDivider({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("relative my-7", className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <Separator className="w-full opacity-60" />
      </div>
      <div className="relative flex justify-center text-[0.8125rem] font-medium">
        <span className="bg-card px-3 text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}
