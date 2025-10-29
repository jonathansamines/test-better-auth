import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@libsql/client", "libsql", "better-sqlite3", "node:async_hooks"],
};

export default nextConfig;
