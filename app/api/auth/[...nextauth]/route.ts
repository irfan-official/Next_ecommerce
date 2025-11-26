import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
config();

export const authOptions = {
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
        if (!user.isEmailVerified) throw new Error("Email not verified");

        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.username, // map username -> name
          email: user.email,
          image: user.imageUrl, // map imageUrl -> image
          role: "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name; // always 'name'
        token.email = user.email;
        token.image = user.image; // always 'image'
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.role = token.role;
      return session;
    },
  },

  session: { strategy: "jwt" },
  pages: { signIn: "/auth/sign-in" },

  // ⭐ REQUIRED
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
