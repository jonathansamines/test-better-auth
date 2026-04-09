import Link from "next/link";
import type { Metadata } from "next";
import { LogIn } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Better Auth",
  description: "The most comprehensive authentication library for typescript",
};

const features = [
  { name: "Email & Password", link: "https://www.better-auth.com/docs/authentication/email-password" },
  { name: "Organization | Teams", link: "https://www.better-auth.com/docs/plugins/organization" },
  { name: "Passkeys", link: "https://www.better-auth.com/docs/plugins/passkey" },
  { name: "Multi Factor", link: "https://www.better-auth.com/docs/plugins/2fa" },
  {
    name: "Password Reset",
    link: "https://www.better-auth.com/docs/authentication/email-password#request-password-reset",
  },
  {
    name: "Email Verification",
    link: "https://www.better-auth.com/docs/authentication/email-password#email-verification",
  },
  {
    name: "Roles & Permissions",
    link: "https://www.better-auth.com/docs/plugins/organization#roles",
  },
  {
    name: "Rate Limiting",
    link: "https://www.better-auth.com/docs/reference/security#rate-limiting",
  },
  { name: "Session Management", link: "https://www.better-auth.com/docs/concepts/session-management" },
] as const;

export default function HomePage() {
  return (
    <div className="no-visible-scrollbar flex min-h-[80vh] items-center justify-center overflow-hidden px-6 md:px-0">
      <main className="row-start-2 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-center text-4xl font-bold text-black dark:text-white">Better Auth.</h3>
          <p className="break-words text-center text-sm md:text-base">
            Official demo to showcase{" "}
            <a href="https://better-auth.com" target="_blank" className="italic underline" rel="noreferrer">
              better-auth.
            </a>{" "}
            features and capabilities. <br />
          </p>
        </div>
        <div className="flex w-full flex-col gap-4 md:w-10/12">
          <div className="flex flex-col flex-wrap gap-3 pt-2">
            <div className="border-y border-dotted border-border bg-secondary/60 py-2 opacity-80">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="text-center">
                  All features on this demo are implemented with Better Auth without any custom backend code
                </span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {features.map((feature) => (
                <a
                  className="flex cursor-pointer items-center gap-1 border-b border-transparent pb-1 text-xs text-muted-foreground transition-all duration-150 ease-in-out hover:border-foreground hover:text-foreground"
                  key={feature.name}
                  href={feature.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {feature.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "inline-flex gap-2 self-center",
              )}
            >
              <LogIn className="size-[1.2em]" aria-hidden />
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Create account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
