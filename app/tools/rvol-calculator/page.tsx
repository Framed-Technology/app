import RvolCalculator from "@/components/tools/rvol-calculator-";
import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

const RvolCalculatorPage = () => {
  return (
    <Flex flexDir={"column"} gap={4}>
      <Flex flexDir={"column"}>
        <Heading>Realized Volatility Calculator</Heading>
        <Text>
          Find out how much risk your current portfolio takes on as mesaured by
          realized volatility.
        </Text>
      </Flex>
      <RvolCalculator />
    </Flex>
  );
};

export default RvolCalculatorPage;
