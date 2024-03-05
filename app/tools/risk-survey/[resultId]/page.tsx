import React from "react";
import {
  readPerceivedInvestmentRiskAverages,
  readPerceivedInvestmentRisks,
  readRiskBySessionId,
} from "./actions";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Card from "@/components/ui/card";
import SummaryChart from "./summary-chart";
import InvestmentChart from "./investment-chart";
import { investmentMap } from "@/static/investments";
import InvestmentCard from "@/components/ui/investment-card";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    resultId: string;
  };
};

const RiskSurveyResults = async (props: Props) => {
  const userRisks = await readRiskBySessionId(props.params.resultId);
  const votes = await readPerceivedInvestmentRisks();
  const means = await readPerceivedInvestmentRiskAverages();

  return (
    <Flex flexDir={"column"} gap={4}>
      <Flex flexDir={"column"}>
        <Heading>Risk Survery Results</Heading>
        <Text>
          See how your percieved risk stacks up to everyone else who have filled
          out this form, and each investments{" "}
          <a
            href="https://www.nasdaq.com/glossary/r/realized-volatility"
            target="_blank"
            className="hover:underline text-hollywood-400"
          >
            realised volatility
          </a>
          .
        </Text>
      </Flex>
      <Card>
        <Flex
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          p={4}
          w={"full"}
          textAlign={"center"}
        >
          <Text
            textColor={"white"}
            opacity={0.5}
            fontSize={{ base: "xs", md: "sm", lg: "md" }}
          >
            Summary
          </Text>
          <Text
            color={"black"}
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            fontWeight={500}
          >
            Your Risk Map
          </Text>
          <Text color={"white"} fontSize={"xl"} fontWeight={400}>
            Visualise where your precieved risk overlaps with the community
          </Text>
          <SummaryChart userRisks={userRisks} means={means} />
        </Flex>
      </Card>

      {userRisks.map((itm, key) => (
        <InvestmentCard key={key} investment={investmentMap[itm.investmentId!]}>
          <InvestmentChart
            userRisk={itm.riskLevel}
            investmentId={itm.investmentId!}
            investmentVotes={votes.filter(
              (v) => v.investmentId === itm.investmentId
            )}
          />
        </InvestmentCard>
      ))}
    </Flex>
  );
};

export default RiskSurveyResults;
