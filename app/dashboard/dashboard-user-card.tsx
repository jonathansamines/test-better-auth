"use client";

import { Laptop, Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { authClient } from "@/lib/auth-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function truncateMiddle(s: string, max = 72) {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 3)}…`;
}

function useUserAgent() {
  return useSyncExternalStore(
    () => () => {},
    () => navigator.userAgent,
    () => "",
  );
}

export function DashboardUserCard() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const ua = useUserAgent();
  const [signingOut, setSigningOut] = useState(false);

  const user = session?.user;
  const name = user?.name ?? "—";
  const email = user?.email ?? "";
  const initial = user?.name?.charAt(0) ?? user?.email?.charAt(0) ?? "?";

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

  return (
    <Card className="border-border shadow-sm ring-0">
      <CardHeader>
        <CardTitle>User</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                {user?.image ? (
                  <AvatarImage src={user.image} alt="" className="object-cover" />
                ) : null}
                <AvatarFallback>{initial}</AvatarFallback>
              </Avatar>
              <div className="grid min-w-0 gap-0.5">
                <p className="text-sm font-medium leading-none">{name}</p>
                <p className="truncate text-sm text-muted-foreground">{email || "—"}</p>
              </div>
            </div>
          </div>
        </div>

        {user?.emailVerified ? null : (
          <Alert>
            <AlertTitle>Verify your email address</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Please verify your email address. Check your inbox for the verification message from your
              auth provider.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex w-max flex-col gap-1 border-l-2 border-border px-2">
          <p className="text-xs font-medium">Active Sessions</p>
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-black dark:text-white">
            <Laptop className="size-4 shrink-0" aria-hidden />
            <span className="max-w-[min(100%,20rem)] break-all text-muted-foreground">
              {ua ? truncateMiddle(ua) : "This device"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-y border-border py-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm">Passkeys</p>
            <p className="max-w-xs text-xs text-muted-foreground">
              Passkey management is available when you add the passkey client plugin (see the
              infrastructure demo).
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm">Two Factor</p>
            <p className="max-w-xs text-xs text-muted-foreground">
              Enable TOTP and related flows via the two-factor client plugin in the full demo app.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="!mt-0 flex items-center justify-end gap-2 border-0 bg-transparent !p-6 !pt-0">
        <Button className="z-10 gap-2" variant="secondary" onClick={handleSignOut} disabled={signingOut}>
          {signingOut ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <LogOut className="size-4" />
              Sign Out
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
