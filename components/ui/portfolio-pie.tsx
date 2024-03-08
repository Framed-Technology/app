"use client";

import { colors } from "@/theme";
import { Flex, Box, Text } from "@chakra-ui/react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const PortfolioPie = ({
  allocations,
}: {
  allocations: {
    ticker: string;
    allocation: number;
  }[];
}) => {
  const colorArray = Object.values(colors.constrast);

  if (allocations.filter((e) => e.allocation > 0).length === 0) {
    return (
      <Flex
        h={300}
        w="full"
        p={4}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
      >
        <Text fontSize={"md"}>No Investments</Text>
        <Text fontSize={"sm"} opacity={0.8}>
          Add investments below to see investment breakdown
        </Text>
      </Flex>
    );
  }

  return (
    <Box h={300} w={300} p={2}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart height={100}>
          <Pie
            dataKey="allocation"
            data={allocations.map((entry) => {
              return { ...entry, name: entry.ticker };
            })}
            paddingAngle={4}
            outerRadius={80}
            innerRadius={55}
          >
            {allocations.map((entry, index) => (
              <Cell
                key={index}
                fill={colorArray[index % colorArray.length]}
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PortfolioPie;
