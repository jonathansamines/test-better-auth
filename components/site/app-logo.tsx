import Link from "next/link";
import { Building2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppLogoProps = {
  href?: string;
  /** e.g. "Acme App" on auth; default "Acme" on marketing. */
  name?: string;
  className?: string;
};

export function AppLogo({ href = "/", name = "Acme", className }: AppLogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "gap-2.5 px-2 py-1 text-[0.9375rem] font-semibold tracking-tight hover:bg-transparent",
        className,
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm ring-1 ring-foreground/10 dark:ring-white/15">
        <Building2 className="size-4" aria-hidden />
      </span>
      {name}
    </Link>
  );
}
