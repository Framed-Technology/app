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
} from "recharts";

type Props = {
  communityRiskReturns: {
    rvol: number;
    ret: number;
  }[];
  userRvol: number;
  userRet: number;
};

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
            <Label>Risk</Label>
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
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={communityRiskReturns} fill={colors.hollywood["400"]} />
          <ReferenceDot
            fill={colors["picton-blue"][400]}
            stroke="0"
            x={userRvol}
            y={userRet}
          >
            <Label position={"bottom"}>
              You
            </Label>
          </ReferenceDot>
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CommunityRiskReturnScatter;
