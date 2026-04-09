"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  AuthDivider,
  AuthShell,
  inputClass,
  labelClass,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/auth/auth-shell";
import { AUTH_CALLBACK_PATH, SSO_PROVIDER_ID } from "@/lib/auth-ui";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

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

  return (
    <AuthShell
      title="Create your account"
      subtitle="Sign up with email, Google, or provision via organization SSO."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400"
          >
            Sign in
          </Link>
        </>
      }
    >
      {error ? (
        <div
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <form onSubmit={onEmailSignUp} className="space-y-4">
        <div>
          <label htmlFor="signup-name" className={labelClass}>
            Name
          </label>
          <input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="signup-email" className={labelClass}>
            Email
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="signup-password" className={labelClass}>
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            placeholder="At least 8 characters"
          />
        </div>
        <button type="submit" className={primaryButtonClass} disabled={loading !== null}>
          {loading === "email" ? "Creating account…" : "Create account"}
        </button>
      </form>

      <AuthDivider label="Or continue with" />

      <button
        type="button"
        className={secondaryButtonClass}
        onClick={onGoogleSignUp}
        disabled={loading !== null}
      >
        <GoogleIcon />
        {loading === "google" ? "Redirecting…" : "Google"}
      </button>

      <AuthDivider label="Enterprise SSO" />

      <form onSubmit={onSsoSignUp} className="space-y-4">
        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          If your org uses the configured SAML provider, continue here. New users can be created on
          first successful login when allowed by your setup.
        </p>
        <div>
          <label htmlFor="signup-sso-hint" className={labelClass}>
            Email hint{" "}
            <span className="font-normal text-zinc-500 dark:text-zinc-500">(optional)</span>
          </label>
          <input
            id="signup-sso-hint"
            name="ssoHint"
            type="email"
            autoComplete="username"
            value={ssoHint}
            onChange={(e) => setSsoHint(e.target.value)}
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
        <button type="submit" className={secondaryButtonClass} disabled={loading !== null}>
          {loading === "sso" ? "Redirecting to IdP…" : "Sign up with SSO"}
        </button>
      </form>
    </AuthShell>
  );
}
