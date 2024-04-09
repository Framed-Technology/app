import React from "react";
import {
  readPerceivedInvestmentRiskAverages,
  readPerceivedInvestmentRisks,
  readRiskBySessionId,
} from "./actions";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import Card from "@/components/ui/card";
import SignUpCard from "@/components/ui/sign-up-card";
import SummaryChart from "./summary-chart";
import InvestmentChart from "./investment-chart";
import { investmentMap } from "@/static/investments";
import InvestmentCard from "@/components/ui/investment-card";
import Link from "next/link";
import Image from "next/image";
import CopyUrlButton from "@/components/ui/copy-url-button";
import CardContainer from "@/components/ui/card-container";
import { colors } from "@/theme";
import { FaExternalLinkAlt } from "react-icons/fa";
import platypusCalculator from "../../../../public/platypus-calculator.svg";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    resultId: string;
  };
};

const sectionDescriptions = [
  {
    name: "Have your own portfolio that you want to put to the test?",
    description:
      "Checkout our Portfolio 'Risk' Calculator to see how much 'risk' your are taking on with your current portfolio.",
    path: "/tools/rvol-calculator",
    image: platypusCalculator,
  },
];

const RiskSurveyResults = async (props: Props) => {
  const userRisks = await readRiskBySessionId(props.params.resultId);
  const votes = await readPerceivedInvestmentRisks();
  const means = await readPerceivedInvestmentRiskAverages();

  return (
    <Flex flexDir={"column"} gap={12}>
      <Stack flexDir={"column"}>
        <Heading size={"xl"} marginBottom={4}>
          Your Risk Survery Results
        </Heading>
        <Heading fontSize="xl" fontWeight={"normal"}>
          {
            "Compare your risk perceptions (in blue) with each investment's actual 'riskiness' (in yellow), and other nurses' votes (in pink)."
          }
        </Heading>
      </Stack>

      <CardContainer>
        <Heading fontWeight={500} size={"lg"} textAlign={"center"} mb={2}>
          {"Your Perception vs Actual 'Riskiness'"}
        </Heading>
        <InvestmentAccordion userRisks={userRisks} votes={votes} />
        <Accordion allowMultiple bg="lily-white.100">
          <AccordionItem>
            <AccordionButton
              borderWidth="1px"
              borderStyle="solid"
              borderColor="black"
              _expanded={{
                bg: "lily-white.200",
                borderBottomWidth: "0px",
              }}
              py={0}
            >
              <Box as="span" flex="1" textAlign="start">
                <Heading size={"md"} padding={4}>
                  Summary Map
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
              p={4}
              borderWidth="1px"
              borderStyle="solid"
              borderColor="black"
            >
              <SummaryChart userRisks={userRisks} means={means} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <MethodologyAccordion />
        <CopyUrlButton colorScheme="hollywood" marginTop={2}>
          Copy Result Link
        </CopyUrlButton>
      </CardContainer>
      <FurtherLearningSection />
    </Flex>
  );
};

type InvestmentAccordionProps = {
  userRisks: {
    investmentId: string | null;
    riskLevel: number;
  }[];
  votes: {
    investmentId: string | null;
    riskLevel: number;
    count: number;
  }[];
};

const InvestmentAccordion = ({
  userRisks,
  votes,
}: InvestmentAccordionProps) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple borderBottom="0.5px">
      {userRisks.map((itm, key) => (
        <AccordionItem key={key}>
          <AccordionButton
            borderTop="0.5px"
            borderStyle="solid"
            borderColor="gray"
            borderRight="1px"
            borderLeft="1px"
            _expanded={{
              bg: "lily-white.200",
              borderBottomWidth: "0px",
              borderStyle: "solid",
              borderColor: "black",
            }}
          >
            <Box as="span" flex="1" textAlign="left">
              <Heading
                size="md"
                color="black"
                opacity={0.6}
                fontWeight={"normal"}
              >
                {investmentMap[itm.investmentId!].name}
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel p={0}>
            <Box mb={1} mt={0}>
              <InvestmentCard investment={investmentMap[itm.investmentId!]}>
                <InvestmentChart
                  userRisk={itm.riskLevel}
                  investmentRvol={investmentMap[itm.investmentId!].rvol}
                  investmentId={itm.investmentId!}
                  investmentVotes={votes.filter(
                    (v) => v.investmentId === itm.investmentId
                  )}
                />
              </InvestmentCard>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const FurtherLearningSection = () => {
  return (
    <Flex flexDir={"column"} gap={12} marginTop={8}>
      <Stack gap={4}>
        <Heading size={"lg"}>How did you get on?</Heading>
      </Stack>
      <Stack>
        <SimpleGrid
          columns={{ sm: 1, lg: 2 }}
          gap={{ base: 4, sm: 4, lg: 6 }}
          alignItems="center"
        >
          <SignUpCard variant="surveyResult"/>
          {sectionDescriptions.map((section, key) => (
          <Section key={key} section={section} />
        ))}
        </SimpleGrid>
      </Stack>
    </Flex>
  );
};

const Section = ({
  section,
}: {
  section: (typeof sectionDescriptions)[number];
}) => (
  <Link href={section.path}>
    <Card
      variant={"whiteShadow"}
      position={"relative"}
      justifyContent={"space-between"}
      style={{ display: "flex", flexDirection: "column", minHeight: 260 }}
    >
      <Flex
        flexDir="row"
        justifyContent="space-between"
        style={{ flex: 1 }}
        gap={4}
      >
        <Flex flexDir={"column"} gap={4}>
          <Heading size={"md"}>{section.name}</Heading>
          <Text fontSize={"md"}>{section.description}</Text>
        </Flex>
        <Flex minW={"30%"} justifyContent={"center"}>
          <Image
            src={section.image}
            width={100}
            height={100}
            alt={`${section.image}`}
          />
        </Flex>
      </Flex>
    </Card>
  </Link>
);

const MethodologyAccordion = () => {
  return (
    <Accordion allowMultiple bg="lily-white.100">
      <AccordionItem>
        <AccordionButton
          borderWidth="1px"
          borderStyle="solid"
          borderColor="black"
          _expanded={{
            bg: "lily-white.200",
            borderBottomWidth: "0px",
          }}
          py={0}
        >
          <Box as="span" flex="1" textAlign="start">
            <Heading size={"md"} padding={4}>
              {"How we calculate Actual 'Riskiness'"}
            </Heading>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          padding={8}
          borderWidth="1px"
          borderStyle="solid"
          borderColor="black"
        >
          <Stack flexDir={"column"} gap={4}>
            <Heading size={"sm"}>
              {"'Riskiness' vs Realized Volatility"}
            </Heading>
            <Text fontSize={"sm"}>
              {
                "To illustrate 'Riskiness', and the reason why we encased the word in quotes is because we used realized volatility. For an explanation on the difference between risk and volatility check out this "
              }
              <a
                className="hover:underline"
                href="https://www.morningstar.com/markets/risk-not-volatility-is-real-enemy"
                target="_blank"
              >
                Article
                <FaExternalLinkAlt
                  style={{
                    marginLeft: "5px",
                    display: "inline",
                    color: "black",
                    opacity: 0.6,
                  }}
                />
              </a>.
            </Text>
            <Text fontSize={"sm"}>
              {
                "Realized volatility is like a measure of how bumpy a rollercoaster ride is. Except in this case, instead of looking at a rollercoaster we are looking at different types of investments and the bumps are their price movements over a certain period. Our specified time period is from 31-Mar-2023 to 1-Apr-2024."
              }
            </Text>
            <Heading size={"sm"} mt={2}>
              Calculating Realized Volatility
            </Heading>
            <Text fontSize={"sm"}>
              {
                "We start by calculating the daily returns (how much the prices change compared to the previous day) for the corresponding example tickers for each of the different investment types listed above. For bitcoin we used the price in USD. And for cash we used Neos Enhanced Income Cash Alternative ETF (ticker: CSHI)."
              }
            </Text>
            <Text fontSize={"sm"}>
              {
                "Then, we find the standard deviation of these daily returns. Here's where it gets a bit more mathy but stay with me! We measure how each day's movement differs from the average movement over the year and square that difference (as we want to compare how far each movement was from the average without caring if it's above or below)."
              }
            </Text>
            <Text fontSize={"sm"}>
              {
                "We then calculate the variance by finding the average of all these squared differences. Finally, we take the square root of the variance to get the standard deviation, which is realized volatility."
              }
            </Text>
            <Heading size={"sm"} mt={2}>
              {
                "Normalizing the values on a scale from 0 (Cash) to 12 (Bitcoin)"
              }
            </Heading>
            <Text fontSize={"sm"}>
              {
                "To make it easier to compare the relative differences between each investment, we mapped the relative volatility values to a scale from 0 to 12 (with 0 being the volatility of cash (ticker: CSHI) and 12 being Bitcoin's realised volatility.)"
              }
            </Text>
            <Text fontSize={"sm"}>
              {
                "Note that cash typically has a volatility of 0 because when it's in a bank account, its value remains stable. This doesn't necessarily mean that it is risk-free as inflation can erode purchasing power of cash over time, meaning its real value can decrease."
              }
            </Text>
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default RiskSurveyResults;
