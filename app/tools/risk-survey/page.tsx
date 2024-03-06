import RiskSurvey from "@/components/tools/risk-survey";
import { Flex, Text, Heading } from "@chakra-ui/react";
import React from "react";
import { readRiskSurveySubmissionCount } from "../../actions";

const Page = async () => {
  const riskSurveySubmissionCount = await readRiskSurveySubmissionCount();

  return (
    <Flex flexDir={"column"} gap={4}>
      <Flex flexDir={"column"}>
        <Heading>Risk Survey</Heading>
        <Text>
          Understand how you think about risk by framing your percieved risk
          against everyone else who has used this tool.
        </Text>
      </Flex>
      <RiskSurvey submissionCount={riskSurveySubmissionCount} />
    </Flex>
  );
};

export default Page;
