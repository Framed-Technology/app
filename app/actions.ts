"use server";

import { db } from "@/db";
import { perceivedInvestmentRisk as riskTable } from "@/db/schema";
import { sql } from "drizzle-orm";

export type InvestmentRisk = typeof riskTable.$inferInsert;

export async function insertPerceivedInvestmentRisk(data: InvestmentRisk[]) {
  return await db.insert(riskTable).values(data);
}

export async function readRiskSurveySubmissionCount() {
  const res = await db
    .select({
      count: sql<number>`cast(count(distinct ${riskTable.sessionId}) as int)`,
    })
    .from(riskTable);
  return res[0].count;
}
