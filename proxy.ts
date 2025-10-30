import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
    console.log(`${request.method} ${request.url} ${request.headers.get('content-type')}`, await request.text(),);
    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*'
};

//  PUT /api/auth/scim/v2/Users/L9ZuWhfcDlW3WcFztNg946xIQmQaWRCo 400 in 1476ms (compile: 1463ms, render: 13ms)