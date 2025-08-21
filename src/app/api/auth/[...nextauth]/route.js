import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        // Google OAuth Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),

        // Credentials Provider
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Replace this with your actual authentication logic, e.g., MongoDB
                // Example static login
                if (
                    credentials?.email === "test@test.com" &&
                    credentials?.password === "123456"
                ) {
                    return { id: "1", name: "Test User", email: "test@test.com" };
                }
                // Return null if invalid credentials
                return null;
            },
        }),
    ],

    // Optional pages override
    pages: {
        signIn: "/login", // Redirect to custom login page
    },

    session: {
        strategy: "jwt", // Use JWT for session
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
            }
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };