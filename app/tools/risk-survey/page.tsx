import RiskSurvey from "@/components/tools/risk-survey";
import { Flex, Text, Heading } from "@chakra-ui/react";
import React from "react";

const Page = () => {
  return (
    <Flex flexDir={"column"} gap={4}>
      <Flex flexDir={"column"}>
        <Heading>Risk Survey</Heading>
        <Text>Copy copy copy</Text>
      </Flex>
      <RiskSurvey />
    </Flex>
  );
};

export default Page;
