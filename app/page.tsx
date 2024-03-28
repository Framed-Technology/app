import RiskSurvey from "@/components/tools/risk-survey";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import platypusWalking from "../public/platypus-walking.svg";
import { readRiskSurveySubmissionCount } from "./actions";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: "700" });

const Home = async () => {
  const riskSurveySubmissionCount = await readRiskSurveySubmissionCount();
  return (
    <Flex
      flexDir={"column"}
      gap={12}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        justifyContent={{ base: "none", lg: "space-between" }}
        gap={{ base: 12, lg: 4 }}
        alignItems={"center"}
        pt={16}
        pb={{ base: 16, lg: 24 }}
      >
        <Attention />
        <Interest />
      </Flex>
      <RiskSurvey submissionCount={riskSurveySubmissionCount} />
    </Flex>
  );
};

const Interest = () => (
  <Flex justifyContent={{ base: "center", lg: "end" }} alignItems={"center"} 
  maxW={{ base: "100%", lg: "40%" }} w="full">
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
    <Heading style={lato.style}
      as="h1"
      size={{ base: "3xl", sm: "4xl"}}
      fontSize={{lg:'92px'}}
      textColor={"picton-blue.400"}
      marginBottom={4}
      letterSpacing={-3}
      fontWeight="bold"
    >
      Your Finances Framed
    </Heading>
    <Heading
      as="h4"
      size={{ base: "sm", sm: "md", md: "lg" }}
      fontWeight={"normal"}
    >
      {
        "We're on a mission to help young investors understand their portfolio risk"
      }
    </Heading>
  </Box>
);

export default Home;
