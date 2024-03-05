"use server";

import { db } from "@/db";
import { perceivedInvestmentRisk as riskTable } from "@/db/schema";

export type InvestmentRisk = typeof riskTable.$inferInsert;

export async function insertPerceivedInvestmentRisk(data: InvestmentRisk[]) {
  return await db.insert(riskTable).values(data);
}
