import RiskSurvey from "@/components/tools/risk-survey";
import { Box, Flex, Heading, Text, Button, Stack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import platypusWalking from "../public/platypus-walking.svg";
import { readRiskSurveySubmissionCount } from "./actions";
import { Lato } from "next/font/google";
import Card from "../components/ui/card";
import { FaArrowRight } from "react-icons/fa";
import EmailCapture from "../app/email-capture";

const lato = Lato({ subsets: ["latin"], weight: "700" });

export const dynamic = "force-dynamic";

const Home = async () => {
  const riskSurveySubmissionCount = await readRiskSurveySubmissionCount();
  return (
    <Flex
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={12}
    >
      <Flex
        flexDir={{ base: "column", lg: "row-reverse" }}
        justifyContent={{ base: "none", md: "space-between" }}
        gap={{ base: 8, lg: 12 }}
        alignItems={"center"}
        pt={{ base: 4, lg: 8 }}
        pb={{ base: 12, lg: 12 }}
      >
        <Interest />
        <Stack
          flexDir={"column"}
          gap={6}
          justifyContent={{ base: "center", lg: "start" }}
          maxW={{ base: "100%", lg: "60%" }}
          w="full"
        >
          <Attention />
          <Stack maxW={{ base: "100%", lg: "400px" }}>
        <EmailCapture />
      </Stack>
        </Stack>
      </Flex>
      <Flex flexDir={"column"} gap={6}>
        <Card>
        <Flex alignItems="end">
          <Heading
            style={lato.style}
            as="h1"
            size={{ base: "2xl", md: "3xl" }}
            fontSize={{ lg: "56px" }}
            textColor={"picton-blue.400"}
            letterSpacing={-3}
            fontWeight="bold"
            marginRight={2}
          >
            {"#1"}
          </Heading>
          <Heading
            style={lato.style}
            as="h1"
            size={{ base: "lg", md: "xl" }}
            textColor={"picton-blue.400"}
            letterSpacing={{ base: -1, md: -2 }}
            fontWeight="bold"
            marginRight={4}
          >
            {"Understanding Risk before the Returns:"}
          </Heading>
        </Flex>
        </Card>
        <RiskSurvey submissionCount={riskSurveySubmissionCount} />
      </Flex>
    </Flex>
  );
};

const Interest = () => (
  <Flex
    justifyContent={{ base: "center", lg: "end" }}
    alignItems={"center"}
    maxW={{ base: "100%", lg: "100%" }}
    flexDir={{ base: "column", lg: "row" }}
  >
    <Image
      src={platypusWalking}
      alt="Platypus Walking"
      width={400}
      height={400}
    />
  </Flex>
);

const Attention = () => (
  <Box
    textAlign={{ base: "center", lg: "left" }}
    maxW={{ base: "100%", lg: "100%" }}
    w="full"
  >
    <Heading
      style={lato.style}
      as="h1"
      size={{ base: "3xl", md: "3xl" }}
      fontSize={{ lg: "84px" }}
      textColor={"picton-blue.400"}
      marginBottom={4}
      letterSpacing={-3}
      fontWeight="bold"
    >
      We Help Nurses Understand Investing
    </Heading>
    <Text fontSize={{ base: "sm", md: "md", lg: "xl" }} fontWeight={"normal"}>
      {
        "Don't let financial uncertainty contribute to your already sleepless night"
      }
      <Text as="span" fontStyle="italic">
        -shifts
      </Text>
      {
        ". Let us cut the jargon and guide you through the investing landscape. Because Nurses deserve more than just a wage – it's time someone cared for you and your financial well-being."
      }
    </Text>
  </Box>
);

export default Home;
