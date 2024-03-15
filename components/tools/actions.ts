"use server";
import { tools } from "@/api";
import { db } from "@/db";
import { portfolioRiskReturn as potfolioTable, tickerInfo } from "@/db/schema";
import { TickerInfo } from "@/db/types";

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

export const getTickerInfo = async (ticker: string): Promise<TickerInfo> => {
  try {
    const res = await tools.get("/tool/risk/ticker_info", {
      params: {
        ticker,
      },
    });
    const data = res.data as TickerInfo;
    await db.insert(tickerInfo).values({
      ticker,
      name: data.shortName,
      info: data,
    });

    return data;
  } catch (err) {
    throw err;
  }
};

export const getTickerOptions = async (): Promise<
  {
    value: string;
    label: string;
  }[]
> => {
  try {
    const options = await db
      .select({
        value: tickerInfo.ticker,
        label: tickerInfo.name,
      })
      .from(tickerInfo);
    return options;
  } catch (err) {
    throw err;
  }
};
