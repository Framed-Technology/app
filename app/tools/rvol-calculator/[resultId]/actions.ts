"use server";

import { db } from "@/db";
import { portfolioRiskReturn as portfolioTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const readPortfolioRiskReturn = async (sessionId: string) => {
  const res = await db
    .select()
    .from(portfolioTable)
    .where(eq(portfolioTable.sessionId, sessionId));
  if (res.length === 0) {
    throw new Error("No data");
  }
  return res[0];
};

export const readAllRiskReturns = async () => {
  const res = await db
    .select({
      rvol: portfolioTable.rvol,
      ret: portfolioTable.ret,
    })
    .from(portfolioTable);
  return res;
};
