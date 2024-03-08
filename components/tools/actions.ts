"use server";
import { tools } from "@/api";
import { db } from "@/db";
import { portfolioRiskReturn as potfolioTable } from "@/db/schema";

export const calculateRvol = async (
  allocations: {
    ticker: string;
    allocation: number;
  }[]
): Promise<{ rvol: number; ret: number }> => {
  try {
    const res = await tools.post("/tool/risk", {
      asset_allocations: allocations,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const savePortfolioRiskReturn = async (
  sessionId: string,
  allocations: {
    ticker: string;
    allocation: number;
  }[],
  rvol: number,
  ret: number
) => {
  try {
    await db.insert(potfolioTable).values([
      {
        sessionId,
        portfolio: allocations,
        rvol,
        ret,
      },
    ]);
  } catch (err) {
    throw err;
  }
};
