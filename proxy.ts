import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
    const forwardedHeaders = new Headers(request.headers);

    if (request.nextUrl.pathname.startsWith('/api/auth/scim')) {
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