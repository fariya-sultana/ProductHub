import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/app/lib/mongodb";
 // make sure you import your db connection

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
                try {
                    const client = await clientPromise;
                    const db = client.db("product-management-app");

                    const user = await db.collection("users").findOne({ email: credentials.email });

                    if (!user) {
                        // ❌ No user found
                        return null;
                    }

                    if (user.password !== credentials.password) {
                        // ❌ Wrong password
                        return null;
                    }

                    // ✅ Auth success
                    return { id: user._id.toString(), name: user.name, email: user.email };
                } catch (err) {
                    console.error("Authorize error:", err);
                    return null;
                }
            },
        }),
    ],

    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            if (token) session.user.id = token.id;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
