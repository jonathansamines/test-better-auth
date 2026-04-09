import { organizationClient } from "better-auth/client/plugins";
import { dashClient, sentinelClient } from "@better-auth/infra/client";
import { ssoClient } from "@better-auth/sso/client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL: "http://localhost:3000",
  plugins: [
    dashClient(),
    sentinelClient({
      autoSolveChallenge: true,
    }),
    organizationClient(),
    ssoClient(),
  ],
});