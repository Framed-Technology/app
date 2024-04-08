"use client";

import { useBreakpointValue } from "@chakra-ui/react";
import { investmentMap } from "@/static/investments";
import { colors } from "@/theme";
import { Flex } from "@chakra-ui/react";
import React from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
} from "recharts";

const SummaryChart = ({
  userRisks,
  means,
}: {
  userRisks: {
    investmentId: string | null;
    riskLevel: number;
  }[];
  means: {
    investmentId: string | null;
    average: number;
  }[];
}) => {
  const meanMap = means.reduce<{ [key: string]: number }>((p, c) => {
    p[c.investmentId!] = c.average;
    return p;
  }, {});
  const data = userRisks.map((itm) => {
    return {
      name: itm.investmentId,
      user: itm.riskLevel,
      average: meanMap[itm.investmentId!],
      investmentRvol: investmentMap[itm.investmentId!].rvol,
    };
  });
  const labelFontSize = useBreakpointValue({
    base: "10px",
    sm: "sm",
    md: "sm",
    lg: "md",
  });
  return (
    <Flex w={"full"} h={400} flexDir={"column"}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" fontSize={labelFontSize} />
          <Radar
            name="You"
            dataKey="user"
            stroke={colors["picton-blue"][400]}
            fill={colors["picton-blue"][400]}
            fillOpacity={0.6}
          />
          <Radar
            name="Community average"
            dataKey="average"
            stroke={colors.hollywood[400]}
            fill={colors.hollywood[400]}
            fillOpacity={0.6}
          />
          <Radar
            name={"Actual 'Riskiness'"}
            dataKey="investmentRvol"
            stroke={colors.glowstone[500]}
            fill={colors.glowstone[600]}
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default SummaryChart;
