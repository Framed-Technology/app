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
  Legend,
} from "recharts";

type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    value: number;
    payload: any;
  }[];
};

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const xValue = payload[0].payload.riskLevel;
    const yValue = payload[0].value;
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "4px",
          border: "1px solid #ccc",
        }}
      >
        <p>{"'Risk' Level: " + xValue}</p>
        <p>Community votes: {yValue}</p>
      </div>
    );
  }
  return null;
};

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
          {...{
            overflow: 'visible'
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
          <Tooltip content={<CustomTooltip />} />
          <XAxis
            type="number"
            dataKey={"riskLevel"}
            domain={[1, 12]}
            tick={false}
          />
          <Legend
          />
          <ReferenceLine
            x={userRisk}
            strokeWidth={2}
            stroke={colors["picton-blue"][400]}
          >
            <Label position={"top"} dy={20} dx={-10} fill={colors["picton-blue"][400]}>
              {"You: " + userRisk}
            </Label>
          </ReferenceLine>
          <ReferenceLine
            x={investmentRvol}
            strokeWidth={2}
            stroke={colors.glowstone[500]}
          >
            <Label fill={colors.glowstone[500]} position={"top"}>
              {"Actual 'Riskiness': " + investmentRvol}
            </Label>
          </ReferenceLine>
          <ReferenceLine x={1} strokeWidth={0}>
            <Label position="bottom" dx={-20} opacity={0.6}>
              {"Cash: 0"}
            </Label>
          </ReferenceLine>
          <ReferenceLine x={12} strokeWidth={0}>
            <Label position="bottom" dx={-10} opacity={0.6}>
              {"Bitcoin: 12"}
            </Label>
          </ReferenceLine>
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default InvestmentChart;
