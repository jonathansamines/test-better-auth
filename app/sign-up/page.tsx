"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Home() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const { data, error } = await authClient.signUp.email({
                        email,
                        password,
                        name: username,
                        callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
                    }, {
                        onSuccess: (ctx) => {
                            router.push("/dashboard");
                        },
                        onError: (ctx) => {
                            // display the error message

                            alert(ctx.error.message);
                        },
                    });

                    console.log({ data, error });
                }}>
                    <label htmlFor="username">Username:</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />

                    <label htmlFor="email">Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />

                    <label htmlFor="password">Password:</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />

                    <button className="mt-10 rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700" type="submit">
                        Sign Up
                    </button>
                </form>
            </main>
        </div>
    );
}
