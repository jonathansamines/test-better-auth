"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const {
        data: session,
        isPending, //loading state
        error, //error object
    } = authClient.useSession()

    if (isPending) {
        return <div>Loading session...</div>;
    }

    if (error) {
        return <div>Error loading session: {error.message}</div>;
    }

    if (!session) {
        return <div>No active session. Please log in.</div>;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <p>Hello user {session?.user.name}</p>
                <button className="mt-10 rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700" onClick={async () => {
                    await authClient.signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                console.log('User signed out');
                                router.push("/"); // redirect to login page
                            },
                        },
                    });
                }}>
                    Logout
                </button>
                <button className="mt-10 rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700" onClick={async () => {
                    await authClient.organization.create({
                        name: "My Organization", // required
                        slug: "my-org", // required
                        logo: "https://example.com/logo.png",
                        keepCurrentActiveOrganization: false,
                    })
                }}>
                    add organization
                </button>
            </main>
        </div>
    );
}
