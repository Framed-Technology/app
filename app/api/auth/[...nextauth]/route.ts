import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { users as UsersTable } from "@/db/schema";
import { db } from "@/db";

type Users = typeof UsersTable.$inferInsert;

const insertUser = async (profile: Users) => {
  return await db.insert(UsersTable).values(profile);
};

const handler = NextAuth({
  callbacks: {
    async signIn({ profile }) {
      console.log(profile)
      const user = profile as Users;
      try {
        await insertUser(user);
      } catch (e) {
        console.log(e)
        console.log("Email already exists...");
      }
      return true;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
});

export { handler as GET, handler as POST };
