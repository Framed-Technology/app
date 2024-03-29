import RvolCalculator from "@/components/tools/rvol-calculator";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import React from "react";

const RvolCalculatorPage = () => {
  return (
    <Flex flexDir={"column"} gap={12}>
      <Stack flexDir={"column"}>
        <Heading size={"xl"} marginBottom={4}>
          Realized Volatility Calculator
        </Heading>
        <Heading size="md" fontWeight={"normal"}>
          Find out how much risk your current portfolio takes on as mesaured by
          realized volatility.
        </Heading>
      </Stack>
      <RvolCalculator />
    </Flex>
  );
};

export default RvolCalculatorPage;
