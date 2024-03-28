import RiskSurvey from "@/components/tools/risk-survey";
import { Flex, Text, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { readRiskSurveySubmissionCount } from "../../actions";

const RiskSurveyPage = async () => {
  const riskSurveySubmissionCount = await readRiskSurveySubmissionCount();

  return (
    <Flex flexDir={"column"} gap={12}>
      <Stack flexDir={"column"}>
        <Heading size={"xl"} marginBottom={4}>
          Risk Survey
        </Heading>
        <Heading size="md" fontWeight={"normal"}>
          Understand how you think about risk by framing your percieved risk
          against everyone else who has used this tool.
        </Heading>
      </Stack>
      <RiskSurvey submissionCount={riskSurveySubmissionCount} />
    </Flex>
  );
};

export default RiskSurveyPage;
