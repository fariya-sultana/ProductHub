import bcrypt from "bcryptjs"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "./mongodb"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"



export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("product-management-app");
        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");
        const isValid = await db.collection("users").findOne({ password: credentials.password });
        if (!isValid) throw new Error("Invalid password");
        return { id: user._id, email: user.email, name: user.name };
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}