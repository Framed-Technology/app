import RiskSurvey from "@/components/tools/risk-survey";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import platypusWalking from "../public/platypus-walking.svg"

export default function Home() {
  return (
    <Flex
      flexDir={"column"}
      gap={12}
      justifyContent={"center"}
      alignItems={"center"}
      px={4}
    >
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        justifyContent={{ base: "none", lg: "space-between" }}
        gap={{ base: 8, lg: 4 }}
        alignItems={"center"}
        py={8}
      >
        <Attention />
        <Interest />
      </Flex>
      <RiskSurvey/>
    </Flex>
  );
}

const Interest = () => (
  <Flex justifyContent={"center"} alignItems={"center"} w="full" p={4}>
    <Image
      src={platypusWalking}
      alt="Platypus Walking"
      width={500}
      height={500}
    />
  </Flex>
);

const Attention = () => (
  <Box
    textAlign={{ base: "center", lg: "left" }}
    maxW={{ base: "100%", lg: 600 }}
  >
    <Heading as="h1" size={{ base: "xl", sm: "2xl", md: "3xl" }}>
      Your Finances Framed
    </Heading>
    <Heading
      as="h2"
      size={{ base: "md", sm: "lg", md: "xl" }}
      fontWeight={"400"}
    >
      {
        "We're on a mission to help young investors understand their portfolio risk."
      }
    </Heading>
  </Box>
);
