import type { ReactNode } from "react";

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

/** Auth body only — root layout provides the demo-style header, ripple background, and content width. */
export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center justify-center px-4 md:py-10">
        <div className="w-full max-w-[420px] md:w-[400px]">
          <Card className="w-full max-h-[90vh] overflow-y-auto rounded-none border-border shadow-none ring-0">
            <CardHeader className="space-y-2 border-0 pb-0 text-center">
              <CardTitle className="text-lg font-semibold tracking-tight md:text-xl">
                {title}
              </CardTitle>
              <CardDescription className="text-pretty text-xs leading-relaxed md:text-sm">
                {subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-1">{children}</CardContent>
          </Card>

          <p className="mt-8 text-center text-sm leading-relaxed text-muted-foreground">{footer}</p>
        </div>
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
