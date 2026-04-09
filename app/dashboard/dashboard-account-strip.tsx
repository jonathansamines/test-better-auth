"use client";

import { ChevronDown } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/**
 * Visual analogue to the infrastructure demo’s `AccountSwitcher` trigger
 * (no multi-session plugin in this app).
 */
export function DashboardAccountStrip({ className }: { className?: string }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const initial = user?.name?.charAt(0) ?? user?.email?.charAt(0) ?? "?";

  return (
    <div
      className={cn(
        "flex h-9 w-[250px] shrink-0 items-center justify-between rounded-md border border-input bg-background px-3 text-sm shadow-sm",
        className,
      )}
      role="status"
      aria-label="Current account"
    >
      <span className="flex min-w-0 items-center gap-2">
        <Avatar className="mr-0 h-6 w-6">
          {user?.image ? <AvatarImage src={user.image} alt="" className="object-cover" /> : null}
          <AvatarFallback className="text-[0.65rem]">{initial}</AvatarFallback>
        </Avatar>
        <span className="truncate font-medium">{user?.name ?? user?.email ?? "Account"}</span>
      </span>
      <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" aria-hidden />
    </div>
  );
}
