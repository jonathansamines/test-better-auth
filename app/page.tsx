"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <p>Welcome</p>
        <Link href="/sign-up" className="mt-10 rounded bg-white-600 px-4 py-2 font-medium text-white hover:bg-white-700" >
          Dasboard
        </Link>
        <Link href="/sign-up" className="mt-10 rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700" >
          Sign Up
        </Link>
        <Link href="/sign-in" className="mt-10 rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
          Login
        </Link>
        <Link href="/sign-in/sso" className="mt-10 rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700">
          SSO
        </Link>
      </main>
    </div>
  );
}
