"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";

export default function Home() {
    const router = useRouter();
    const [email, setEmail] = useState("");

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    // const res = await authClient.signIn.sso({
                    //     email: email,
                    //     callbackURL: "/dashboard",
                    // });

                    // console.log(res);
                }}>
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                    <button className="mt-10 rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700" type="submit">
                        Login
                    </button>
                </form>
            </main>
        </div>
    );
}
