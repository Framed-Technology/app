"use server";
import { tools } from "@/api";

export const calculateRvol = async (
  allocations: {
    ticker: string;
    allocation: number;
  }[]
) => {
  try {
    const res = await tools.post("/tool/risk", {
      asset_allocations: allocations,
    });

    return res.data;
  } catch (err) {
    console.error(err);
  }
  return allocations;
};
