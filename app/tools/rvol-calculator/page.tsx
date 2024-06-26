import RvolCalculator from "@/components/tools/rvol-calculator";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import React from "react";

const RvolCalculatorPage = () => {
  return (
    <Flex flexDir={"column"} gap={12}>
      <Stack flexDir={"column"}>
        <Heading size={"2xl"} marginBottom={4}>
          {"Portfolio 'Risk' Calculator"}
        </Heading>
      </Stack>
      <RvolCalculator />
    </Flex>
  );
};

export default RvolCalculatorPage;
