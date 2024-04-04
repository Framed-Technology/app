"use client";

import { colors } from "@/theme";
import { Box } from "@chakra-ui/react";
import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  Label,
  ReferenceDot,
  ReferenceLine,
  Legend,
} from "recharts";

type Props = {
  communityRiskReturns: {
    rvol: number;
    ret: number;
  }[];
  userRvol: number;
  userRet: number;
};

const sAndPFiveHundred = [
  { rvol: 1, ret: 10 },
];

const CommunityRiskReturnScatter = ({
  communityRiskReturns,
  userRvol,
  userRet,
}: Props) => {
  return (
    <Box h={350} w="full" px={0} py={8}>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart
          margin={{
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          }}
        >
          <XAxis
            tick={false}
            domain={["dataMin - 0.1", "dataMax + 0.1"]}
            type="number"
            dataKey="rvol"
            name="Risk"
            unit="%"
          >
            <Label>{"'Risk': Realised Volatility (1yr)"}</Label>
          </XAxis>
          <YAxis
            tick={false}
            domain={["dataMin - 5", "dataMax + 5"]}
            type="number"
            dataKey="ret"
            name="Return"
            unit="%"
            textAnchor="end"
          >
            <Label>Return</Label>
          </YAxis>
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value: number, name: string) => {
              return [`${name}: ${value.toFixed(2)}`];
            }}
          />{" "}
          <Scatter
            data={communityRiskReturns}
            fill={colors.hollywood["400"]}
            name="Community Results"
          />
          <Scatter
            data={sAndPFiveHundred}
            fill={colors.glowstone["400"]}
            name="S&P500"
          />
          <ReferenceDot
            fill={colors["picton-blue"][400]}
            stroke="0"
            x={userRvol}
            y={userRet}
          >
            <Label position={"bottom"}>You</Label>
          </ReferenceDot>
          <ReferenceLine y={0} strokeDasharray="3 3">
            <Label value="0" position="insideLeft" offset={-15} />
          </ReferenceLine>
          <Legend />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CommunityRiskReturnScatter;
