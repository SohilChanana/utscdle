// configuration for Auth.js
import NextAuth, { CredentialsSignin, User, DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getUserFromDb } from "@/utils/getUser";
import client from "@/utils/db";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's id. */
      id: string;
    } & DefaultSession["user"];
  }
}

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid credentials!";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to verify if the user exists
        user = await getUserFromDb(credentials.email as string);

        if (
          !user ||
          !bcrypt.compareSync(credentials.password as string, user.password)
        ) {
          // No user found, so this is their first attempt to login
          throw new InvalidLoginError();
        }

        // return user object with their profile data
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        } as User;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  events: {
    async signIn(message) {
      console.log(message);
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 2592000,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token}) {
      session.user.id = token.sub as string;

      return session;
    },
  },
});
