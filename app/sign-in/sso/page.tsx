import { redirect } from "next/navigation";

/**
 * Legacy URL: same SSO flow as the main sign-in page (Enterprise SSO section).
 */
export default function SignInSsoRedirectPage() {
  redirect("/sign-in?sso=1");
}
