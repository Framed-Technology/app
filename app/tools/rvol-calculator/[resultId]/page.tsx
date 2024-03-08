import React from "react";
import { readPortfolioRiskReturn } from "./actions";
import PortfolioPie from "@/components/ui/portfolio-pie";
import Card from "@/components/ui/card";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

type Props = {
  params: {
    resultId: string;
  };
};

const RiskCalculatorResults = async (props: Props) => {
  const { portfolio, rvol, ret } = await readPortfolioRiskReturn(
    props.params.resultId
  );
  return (
    <Flex flexDir={"column"} gap={4}>
      <Box>
        <Heading>Risk Calculator Results</Heading>
        <Text>See how well you understand the risk of your portfolio!</Text>
      </Box>
      <Card>
        <Flex
          px={4}
          flexDir={{ base: "column", md: "row" }}
          gap={4}
          justify={"space-between"}
          alignItems={"center"}
        >
          <Flex
            flexDir={"column"}
            gap={2}
            w={{ base: "100%", md: "60%" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Text fontSize={"xl"} fontWeight={500} color={"white"}>
              Your Asset Allocation
            </Text>
            <Text>
              Understand how your wealth is allocated across your assets.
            </Text>
          </Flex>
          <PortfolioPie allocations={portfolio} />
        </Flex>
      </Card>
      <Flex flexDir={{base: "column", md: "row"}} gap={4}>
        <Card
          w={"full"}
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Flex flexDir={"column"}>
            <Text fontWeight={"500"} fontSize={"xl"} color={"white"}>
              Realised Vol
            </Text>
            <Text>1 year</Text>
          </Flex>
          <Text fontSize={"4xl"} fontWeight={600} textColor={"hollywood.400"}>
            {Math.round(rvol * 100) / 100}% 
          </Text>
        </Card>
        <Card
          w={"full"}
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Flex flexDir={"column"}>
            <Text fontWeight={"500"} fontSize={"xl"} color={"white"}>
              Return
            </Text>
            <Text>1 year</Text>
          </Flex>
          <Text fontSize={"4xl"} fontWeight={600} textColor={"hollywood.400"}>
            {Math.round(ret * 100) / 100}%
          </Text>
        </Card>
      </Flex>
    </Flex>
  );
};

export default RiskCalculatorResults;
