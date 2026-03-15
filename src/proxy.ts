// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {isPublicRoute} from "@/servers/utils/publicRoutes.util";
import {authService} from "@/servers/services/auth.service";

export default async function proxy(request: NextRequest) {
    //----> Log the incoming request
    console.log(`Incoming request: ${request.method} ${request.url}`);

    //----> Public routes are allowed to access without authentication.
    const isPublic = isPublicRoute(request);
    if (isPublic) {
        return NextResponse.next();
    }

    //----> Get user session.
    const session = await authService.getUserSession();

    //----> If the user is not authenticated, redirect to the login page.
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    //----> Continue to the next step (route handler or page)
    return NextResponse.next();
}


//----> The matcher config defines the paths where the middleware will be applied
export const config = {
    matcher: [
        "/((?!^_next/static|_next/image|favicon.ico|login|signup|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css)$|^$|^/$).*)",
    ],
};

