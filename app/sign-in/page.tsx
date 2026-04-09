"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { AuthDivider, AuthShell } from "@/components/auth/auth-shell";
import { GoogleIcon } from "@/components/auth/google-icon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AUTH_CALLBACK_PATH, SSO_PROVIDER_ID } from "@/lib/auth-ui";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ssoFromQuery = searchParams.get("sso") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ssoHint, setSsoHint] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<"email" | "google" | "sso" | null>(null);

  const callbackURL = AUTH_CALLBACK_PATH;

  async function onEmailSignIn(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading("email");
    await authClient.signIn.email({
      email,
      password,
      callbackURL,
      fetchOptions: {
        onSuccess: () => {
          setLoading(null);
          router.push(callbackURL);
        },
        onError: (ctx) => {
          setError(ctx.error.message ?? "Sign in failed");
          setLoading(null);
        },
      },
    });
  }

  async function onGoogleSignIn() {
    setError(null);
    setLoading("google");
    const { error: err } = await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });
    if (err) {
      setError(err.message ?? "Google sign-in failed");
      setLoading(null);
    }
  }

  async function onSsoSignIn(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading("sso");
    const { error: err } = await authClient.signIn.sso({
      providerId: SSO_PROVIDER_ID,
      callbackURL,
      ...(ssoHint.trim() ? { loginHint: ssoHint.trim() } : {}),
    });
    if (err) {
      setError(err.message ?? "SSO sign-in failed");
      setLoading(null);
    }
  }

  const busy = loading !== null;

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in with email, Google, or your organization SSO."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-medium text-primary underline-offset-4 hover:underline">
            Create one
          </Link>
        </>
      }
    >
      {error ? (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle />
          <AlertTitle>Could not sign in</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <form onSubmit={onEmailSignIn} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signin-email">Email</Label>
          <Input
            id="signin-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            disabled={busy}
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signin-password">Password</Label>
          <Input
            id="signin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={busy}
            className="h-10"
          />
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={busy}>
          {loading === "email" ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <AuthDivider label="Or continue with" />

      <Button
        type="button"
        variant="outline"
        className="w-full"
        size="lg"
        onClick={onGoogleSignIn}
        disabled={busy}
      >
        <GoogleIcon className="size-5" />
        {loading === "google" ? "Redirecting…" : "Continue with Google"}
      </Button>

      <AuthDivider label="Enterprise SSO" />

      <form onSubmit={onSsoSignIn} className="space-y-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {ssoFromQuery
            ? "You opened the SSO entry point. Add an optional email hint for your IdP, then continue."
            : "Use the SAML provider configured for this app (same flow as /sign-in/sso)."}
        </p>
        <div className="space-y-2">
          <Label htmlFor="sso-hint">
            Email hint <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="sso-hint"
            name="ssoHint"
            type="email"
            autoComplete="username"
            value={ssoHint}
            onChange={(e) => setSsoHint(e.target.value)}
            placeholder="you@company.com"
            disabled={busy}
            className="h-10"
          />
        </div>
        <Button type="submit" variant="outline" className="w-full" size="lg" disabled={busy}>
          {loading === "sso" ? "Redirecting to IdP…" : "Continue with SSO"}
        </Button>
      </form>
    </AuthShell>
  );
}

function SignInFallback() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Loading…"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-medium text-primary underline-offset-4 hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <div className="space-y-4">
        <div className="h-10 animate-pulse rounded-lg bg-muted" />
        <div className="h-10 animate-pulse rounded-lg bg-muted" />
        <div className="h-10 animate-pulse rounded-lg bg-muted" />
      </div>
    </AuthShell>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInFallback />}>
      <SignInForm />
    </Suspense>
  );
}
