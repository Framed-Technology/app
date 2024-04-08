import RiskSurvey from "@/components/tools/risk-survey";
import { Flex, Text, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { readRiskSurveySubmissionCount } from "../../actions";

export const dynamic = "force-dynamic";

const RiskSurveyPage = async () => {
  const riskSurveySubmissionCount = await readRiskSurveySubmissionCount();

  return (
    <Flex flexDir={"column"} gap={12}>
      <Stack flexDir={"column"}>
        <Heading size={"2xl"} marginBottom={4}>
          {"'Risk' Perception Survey"}
        </Heading>
      </Stack>
      <RiskSurvey submissionCount={riskSurveySubmissionCount} />
    </Flex>
  );
};

export default RiskSurveyPage;
