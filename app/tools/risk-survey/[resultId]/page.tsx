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
import SummaryChart from "./summary-chart";
import InvestmentChart from "./investment-chart";
import { investmentMap } from "@/static/investments";
import InvestmentCard from "@/components/ui/investment-card";
import Link from "next/link";
import { FaCalculator } from "react-icons/fa";
import CopyUrlButton from "@/components/ui/copy-url-button";
import CardContainer from "@/components/ui/card-container";
import { colors } from "@/theme";
import { Path as PathProps } from "@/api/types";
import platypus from "../../../../public/platypus.svg";
import platypusWalking from "../../../../public/platypus-walking.svg";
import Image from "next/image";

export const dynamic = "force-dynamic";

const methodologyDataRisk: MethodologyData[] = [
  {
    heading: "Calculation",
    text: "",
  },
  {
    heading: "Normalisation",
    text: "Consectetur adipiscing elit. Proin elementum volutpat lectus in pellentesque. Phasellus lobortis libero ut scelerisque cursus. Praesent in suscipit justo. Phasellus tempus auctor orci, id euismod arcu egestas vitae. Suspendisse rutrum ante vitae auctor varius. Proin pharetra molestie metus et bibendum. Aliquam pulvinar faucibus felis, non semper metus aliquet molestie. In hac habitasse platea dictumst. Sed ultrices eget nisi at venenatis. Nullam id nunc eu sapien consequ.",
  },
  {
    heading: "Time frame",
    text: "Consectetur adipiscing elit. Proin elementum volutpat lectus in pellentesque. Phasellus lobortis libero ut scelerisque cursus. Praesent in suscipit justo. Phasellus tempus auctor orci, id euismod arcu egestas vitae. Suspendisse rutrum ante vitae auctor varius. Proin pharetra molestie metus et bibendum. Aliquam pulvinar faucibus felis, non semper metus aliquet molestie. In hac habitasse platea dictumst. Sed ultrices eget nisi at venenatis. Nullam id nunc eu sapien consequ.",
  },
];

const toolDescriptions = [
  {
    name: "Risk Calculator",
    description:
      "Find out if you're correct about your portfolios risk by measuring its realized volatility.",
    created: new Date("2024-03-08"),
    path: "/tools/rvol-calculator",
    preview: "/tools/rvol-calculator.png",
    image: platypus,
  },
];

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
    <Flex flexDir={"column"} gap={12}>
      <Stack flexDir={"column"}>
        <Heading size={"xl"} marginBottom={4}>
          Risk Survery Results
        </Heading>
        <Heading fontSize="lg" fontWeight={"normal"}>
          See how your percieved risk stacks up to everyone else who have filled
          out this form, and each investments{" "}
          <a
            href="https://www.nasdaq.com/glossary/r/realized-volatility"
            target="_blank"
            className="hover:underline text-hollywood-400"
          >
            realized volatility
          </a>
          .
        </Heading>
      </Stack>

      <CardContainer>
        <Stack gap={0}>
          <Box
            as="span"
            flex="1"
            textAlign="start"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="black"
            borderBottom="0px"
            padding={4}
            bg="lily-white.100"
          >
            <Heading fontWeight={500} size={"lg"} textAlign={"center"} my={4}>
              {"Your Perception vs Actual 'Riskiness'"}
            </Heading>
          </Box>
          <InvestmentAccordion userRisks={userRisks} votes={votes} />
        </Stack>
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
        <MethodologyAccordion methodologyData={methodologyDataRisk} />
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
        <Heading size={"lg"}>Want to Learn More?</Heading>
        <Text fontSize="md">
          Checkout two blog posts that will give you a feel of what to expect
        </Text>
      </Stack>
      <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={{ base: 4, sm: 4, lg: 6 }}>
        <Stack gap={6}>
          {toolDescriptions.map((tool, key) => (
            <Tool key={key} tool={tool} />
          ))}
        </Stack>
        <BlogCard />
      </SimpleGrid>
    </Flex>
  );
};

const Tool = ({ tool }: { tool: (typeof toolDescriptions)[number] }) => (
  <Link href={tool.path}>
    <Card
      variant={"whiteShadow"}
      position={"relative"}
      flexDir={"row"}
      justifyContent={"space-between"}
      style={{ display: "flex", flexDirection: "column", minHeight: 0 }}
    >
      <Flex
        flexDir="row"
        justifyContent="space-between"
        style={{ flex: 1 }}
        gap={4}
      >
        <Flex flexDir={"column"} gap={4}>
          <Heading size={"md"}>{tool.name}</Heading>
          <Text fontSize={"md"}>{tool.description}</Text>
        </Flex>
        <Flex minW={"30%"} justifyContent={"center"}>
          <Image
            src={tool.image}
            width={150}
            height={150}
            alt={`${tool.image}`}
          />
        </Flex>
      </Flex>
    </Card>
  </Link>
);

const BlogCard = () => {
  return (
    <Card
      variant={"whiteShadow"}
      position={"relative"}
      flexDir={"row"}
      justifyContent={"space-between"}
      style={{ display: "flex", flexDirection: "column", minHeight: 0 }}
    >
      <Flex
        flexDir="row"
        justifyContent="space-between"
        style={{ flex: 1 }}
        gap={4}
      >
        <Flex flexDir={"column"} gap={4}>
          <Heading size={"md"}>Blog Post</Heading>
          <Text fontSize={"md"} color={"red"}>
            Link with specific Blog-post-slug, make the blog page first
          </Text>
        </Flex>
        <Flex minW={"30%"} justifyContent={"center"}>
          <Image
            src={platypusWalking}
            width={150}
            height={150}
            alt="Magenta Platypus Walking"
          />
        </Flex>
      </Flex>
    </Card>
  );
};

const MethodologyAccordion = ({
  methodologyData,
}: {
  methodologyData: MethodologyData[];
}) => {
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
              {"How have we calculated Actual 'Riskiness'"}
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
          {methodologyData.map((item, index) => (
            <MethodologyContent key={index} content={item} />
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

type MethodologyData = {
  heading: string;
  text: string;
};

const MethodologyContent = ({ content }: { content: MethodologyData }) => {
  return (
    <Stack flexDir={"column"} gap={2}>
      <Heading size={"sm"}>{content.heading}</Heading>
      <Text fontSize={"md"} marginBottom={2}>
        {content.text}
      </Text>
    </Stack>
  );
};

export default RiskSurveyResults;
