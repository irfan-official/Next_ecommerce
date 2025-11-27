import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import { fetchWithRetry } from "@/context/DataContext";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: string | null;
      isEmailVerified?: boolean;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    provider?: string | null;
    isEmailVerified?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    provider?: string | null;
    isEmailVerified?: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await UserModel.findOne({ email: credentials?.email });
        if (!user) throw new Error("User not found");
        // if (!user.isEmailVerified) throw new Error("Email not verified");

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          image: user.imageUrl,
          provider: "credentials",
          isEmailVerified: user.isEmailVerified,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user?.name,
            email: user?.email,
            image: user?.image,
          }),
        });

        // if (!res.ok) return false;

        const updatedUser = await res.json();

        // Attach updated user to the "user" object
        user.id = updatedUser.id;
        user.name = updatedUser.name;
        user.email = updatedUser.email;
        user.image = updatedUser.image;
        (user as any).provider = updatedUser.provider;
        (user as any).isEmailVerified = updatedUser.isEmailVerified;
      }

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      // When profile is updated using session.update()
      if (trigger === "update" && session) {
        token.name = session.name || token.name;
        token.email = session.email || token.email;
        token.image = session.image || token.image;
        token.isEmailVerified =
          session.isEmailVerified ?? token.isEmailVerified;
      }

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.isEmailVerified = (user as any).isEmailVerified ?? false;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.provider = token.provider;
      session.user.isEmailVerified = token.isEmailVerified; // <-- must stay
      return session;
    },
  },

  session: { strategy: "jwt" },
  pages: { signIn: "/auth/sign-in" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
