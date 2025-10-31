import { NextRequest, NextResponse } from "next/server";

const supportedMethods = new Set(["POST", "PUT", "PATCH"]);

export default async function proxy(request: NextRequest) {
    const forwardedHeaders = new Headers(request.headers);

    // Make sure all SCIM endpoints use JSON
    // Some providers may use an incorrect type which would be an error for better-call
    // Additionally, better-call will use this hint to decide whether to parse the body or not
    // This does not play well in all cases (e.g DELETE)

    if (request.nextUrl.pathname.startsWith('/api/auth/scim') && supportedMethods.has(request.method)) {
        forwardedHeaders.set('content-type', 'application/json');
    }

    console.log(`${request.method} ${request.url} ${forwardedHeaders.get('content-type')}`, await request.clone().text());

    return NextResponse.next({
        request: { headers: forwardedHeaders }
    });
}

export const config = {
    matcher: '/api/:path*'
};

//  PUT /api/auth/scim/v2/Users/L9ZuWhfcDlW3WcFztNg946xIQmQaWRCo 400 in 1476ms (compile: 1463ms, render: 13ms)