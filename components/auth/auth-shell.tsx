import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 px-4 py-12 font-sans dark:bg-zinc-950">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-18%,rgba(109,40,217,0.22),transparent)] dark:bg-[radial-gradient(ellipse_85%_55%_at_50%_-18%,rgba(139,92,246,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative w-full max-w-[440px]">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 transition hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-lg font-semibold text-white shadow-lg shadow-violet-600/25">
              A
            </span>
            <span className="text-zinc-900 dark:text-zinc-100">Acme App</span>
          </Link>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {title}
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/90 bg-white/90 p-8 shadow-xl shadow-zinc-200/40 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90 dark:shadow-none">
          {children}
        </div>

        <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">{footer}</p>
      </div>
    </div>
  );
}

export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center" aria-hidden>
        <div className="w-full border-t border-zinc-200 dark:border-zinc-700" />
      </div>
      <div className="relative flex justify-center text-xs font-medium uppercase tracking-wide">
        <span className="bg-white px-3 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
          {label}
        </span>
      </div>
    </div>
  );
}

export const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-violet-500";

export const labelClass = "mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300";

export const primaryButtonClass =
  "inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-600/20 transition hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-violet-900/30";

export const secondaryButtonClass =
  "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 shadow-sm transition hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800";
