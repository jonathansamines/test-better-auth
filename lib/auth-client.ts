import { organizationClient } from "better-auth/client/plugins"
import { dashClient } from "@better-auth/dash/client";
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // baseURL: "http://localhost:3000",
    plugins: [
    dashClient(),
    organizationClient()
    ]
})