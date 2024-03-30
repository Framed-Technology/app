"use server";
import { users as UsersTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const deleteUserByEmail = async (email: string) => {
  return await db.delete(UsersTable).where(eq(UsersTable.email, email));
};
