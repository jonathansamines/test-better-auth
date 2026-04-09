"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { AuthDivider, AuthShell } from "@/components/auth/auth-shell";
import { GoogleIcon } from "@/components/auth/google-icon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AUTH_CALLBACK_PATH, SSO_PROVIDER_ID } from "@/lib/auth-ui";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ssoHint, setSsoHint] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<"email" | "google" | "sso" | null>(null);

  const callbackURL = AUTH_CALLBACK_PATH;

  async function onEmailSignUp(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading("email");
    await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL,
      },
      {
        onSuccess: () => {
          setLoading(null);
          router.push(callbackURL);
        },
        onError: (ctx) => {
          setError(ctx.error.message ?? "Sign up failed");
          setLoading(null);
        },
      },
    );
  }

  async function onGoogleSignUp() {
    setError(null);
    setLoading("google");
    const { error: err } = await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });
    if (err) {
      setError(err.message ?? "Google sign-up failed");
      setLoading(null);
    }
  }

  async function onSsoSignUp(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading("sso");
    const { error: err } = await authClient.signIn.sso({
      providerId: SSO_PROVIDER_ID,
      callbackURL,
      requestSignUp: true,
      ...(ssoHint.trim() ? { loginHint: ssoHint.trim() } : {}),
    });
    if (err) {
      setError(err.message ?? "SSO sign-up failed");
      setLoading(null);
    }
  }

  const busy = loading !== null;

  return (
    <AuthShell
      title="Create your account"
      subtitle="Sign up with email, Google, or provision via organization SSO."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-primary underline-offset-4 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      {error ? (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <form onSubmit={onEmailSignUp} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-name">Name</Label>
          <Input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            disabled={busy}
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
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
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            disabled={busy}
            className="h-10"
          />
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={busy}>
          {loading === "email" ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <AuthDivider label="Or continue with" />

      <Button
        type="button"
        variant="outline"
        className="w-full"
        size="lg"
        onClick={onGoogleSignUp}
        disabled={busy}
      >
        <GoogleIcon className="size-5" />
        {loading === "google" ? "Redirecting…" : "Continue with Google"}
      </Button>

      <AuthDivider label="Enterprise SSO" />

      <form onSubmit={onSsoSignUp} className="space-y-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          If your org uses the configured SAML provider, continue here. New users can be created on first
          successful login when allowed by your setup.
        </p>
        <div className="space-y-2">
          <Label htmlFor="signup-sso-hint">
            Email hint <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="signup-sso-hint"
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
          {loading === "sso" ? "Redirecting to IdP…" : "Sign up with SSO"}
        </Button>
      </form>
    </AuthShell>
  );
}
