"use server";

import { db } from "@/db";
import { perceivedInvestmentRisk as riskTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export type InvestmentRisk = typeof riskTable.$inferInsert;

export async function insertPerceivedInvestmentRisk(data: InvestmentRisk[]) {
  return await db.insert(riskTable).values(data);
}

export async function readPerceivedInvestmentRisk(investmentId: string) {
  return await db
    .select({
      investmentId: riskTable.investmentId,
      riskLevel: riskTable.userRisk,
      count: sql<number>`cast(count(${riskTable.id}) as int)`,
    })
    .from(riskTable)
    .where(eq(riskTable.investmentId, investmentId))
    .groupBy(riskTable.userRisk, riskTable.investmentId);
    
}
