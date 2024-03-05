"use server";

import { db } from "@/db";
import { perceivedInvestmentRisk as riskTable } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function readRiskBySessionId(sessionId: string) {
  return await db
    .select({
        investmentId: riskTable.investmentId,
        riskLevel: riskTable.userRisk,
    })
    .from(riskTable)
    .where(eq(riskTable.sessionId, sessionId));
}

export async function readPerceivedInvestmentRisks() {
  return await db
    .select({
      investmentId: riskTable.investmentId,
      riskLevel: riskTable.userRisk,
      count: sql<number>`cast(count(${riskTable.id}) as int)`,
    })
    .from(riskTable)
    .groupBy(riskTable.userRisk, riskTable.investmentId);
}

export async function readPerceivedInvestmentRiskAverages() {
  return await db
    .select({
      investmentId: riskTable.investmentId,
      average: sql<number>`cast(avg(${riskTable.userRisk}) as float)`,
    })
    .from(riskTable)
    .groupBy(riskTable.investmentId);
}
