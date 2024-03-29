"use client";

import { colors } from "@/theme";
import { Flex } from "@chakra-ui/react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  Label,
  Tooltip,
} from "recharts";

const InvestmentChart = ({
  userRisk,
  investmentRvol,
  investmentId,
  investmentVotes,
}: {
  userRisk: number;
  investmentRvol: number;
  investmentId: string;
  investmentVotes: {
    investmentId: string | null;
    riskLevel: number;
    count: number;
  }[];
}) => {
  const data = Array.from(Array(12).keys()).map((idx) => {
    const riskLevel = idx + 1;
    return {
      investmentId,
      riskLevel,
      count: investmentVotes.find((e) => e.riskLevel === riskLevel)?.count ?? 0,
    };
  });

  return (
    <Flex w={"full"} h={175} gap={0} flexDir={"column"}>
      <ResponsiveContainer width="100%" height={"100%"}>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <Area
            name="Community votes"
            type="monotone"
            dataKey="count"
            stroke={colors.hollywood[400]}
            fill={colors.hollywood[400]}
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Tooltip />
          <XAxis
            type="number"
            label={"Risk Level"}
            dataKey={"riskLevel"}
            domain={[1, 12]}
            tick={false}
          />
          <YAxis
            type="number"
            dataKey={"count"}
            label={"Votes"}
            tick={false}
            rotate={-35}
            textAnchor="end"
          />
          <ReferenceLine
            x={userRisk}
            strokeWidth={2}
            stroke={colors["picton-blue"][400]}
          >
            <Label color="#fff" position={"top"}>
              You
            </Label>
          </ReferenceLine>
          <ReferenceLine
            x={investmentRvol}
            strokeWidth={2}
            stroke={colors.hollywood["600"]}
          >
            <Label color="#fff" position={"top"}>
              rVol {investmentRvol}
            </Label>
          </ReferenceLine>
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default InvestmentChart;
