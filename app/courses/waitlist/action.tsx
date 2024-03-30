// We want to save contacts in the DB

// 1. We need a new tables, called 'contacts' DONE
// 2. We need to have some code that runs on the server, that takes {email, name, message}
//    and writes it to the new table, and replis with a 'error | null'
// 3. We want the UI to collect the user input

"use server";

import { db } from "@/db";
import { coursesInterest as coursesInterestTable } from "@/db/schema";

export type CourseInterestType = typeof coursesInterestTable.$inferInsert;

export async function insertCourseInterest(data: CourseInterestType) {
  return await db.insert(coursesInterestTable).values(data);
}
