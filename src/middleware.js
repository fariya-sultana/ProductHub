// middleware.js
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
    // Reads the NextAuth JWT from cookies and verifies it using your secret
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    const { pathname, searchParams } = req.nextUrl
    const isProtected = pathname.startsWith("/dashboard")

    // Block unauthenticated access to protected routes
    if (isProtected && !token) {
        const loginUrl = new URL("/login", req.url)
        // Preserve where the user was trying to go
        loginUrl.searchParams.set("redirect", pathname + (req.nextUrl.search || ""))
        return NextResponse.redirect(loginUrl)
    }

    // If already logged in and visiting /login, bounce to dashboard (or ?redirect)
    if (pathname === "/login" && token) {
        const redirectTo = searchParams.get("redirect") || "/dashboard"
        return NextResponse.redirect(new URL(redirectTo, req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
}