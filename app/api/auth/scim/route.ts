import { auth } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const result = await auth.api.generateSCIMToken({
            body: {
                providerId: "sso",
            },
            headers: request.headers,
        });
        return Response.json(result);
    } catch (error) {
        console.log(error);
        return Response.json({ error: (error as Error).message });
    }
}