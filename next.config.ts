import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@libsql/client", "@libsql/kysely-libsql", "libsql", "better-sqlite3", "node:async_hooks"],
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://accounts.google.com https://*.googleusercontent.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
