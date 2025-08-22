// middleware.js
import { withAuth } from "next-auth/middleware"

export default withAuth(
    // Optional: custom redirect logic
    function middleware(req) { },
    {
        callbacks: {
            // Restrict only authenticated users
            authorized: ({ token }) => {
                // console.log("Middleware token:", token) // 👈 check logs
                return !!token
            },

        },
        pages: {
            signIn: "/login", // redirect here if not logged in
        },
    }
)

// Protect only these routes
export const config = {
    matcher: ["/dashboard/:path*"], // protects /dashboard and its sub-routes
}
