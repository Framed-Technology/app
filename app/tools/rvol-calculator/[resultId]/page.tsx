import React from "react";
import { readAllRiskReturns, readPortfolioRiskReturn } from "./actions";
import PortfolioPie from "@/components/ui/portfolio-pie";
import Card from "@/components/ui/card";
import SignUpCard from "@/components/ui/sign-up-card";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SimpleGrid,
} from "@chakra-ui/react";
import CommunityRiskReturnScatter from "./community-risk-return-scatter";
import CopyUrlButton from "@/components/ui/copy-url-button";
import CardContainer from "@/components/ui/card-container";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { colors } from "@/theme";
import platypusWalking from "../../../../public/platypus-walking.svg";

type Props = {
  params: {
    resultId: string;
  };
};

const sectionDescriptions = [
  {
    name: "Blog",
    description:
      "Where we write and provide adjacent value like how to buy bitcoin or how to get a locum job in Aussie",
    path: "/blog",
    image: platypusWalking,
  },
];

const RiskCalculatorResults = async (props: Props) => {
  const { portfolio, rvol, ret } = await readPortfolioRiskReturn(
    props.params.resultId
  );
  const allRiskReturns = await readAllRiskReturns();
  return (
    <Flex flexDir={"column"} gap={12}>
      <Stack flexDir={"column"}>
        <Heading size={"xl"} marginBottom={4}>
          Risk Calculator Results
        </Heading>
        <Heading fontSize="lg" fontWeight={"normal"}>
          See how well you understand the risk of your portfolio
        </Heading>
      </Stack>
      <CardContainer>
        <Flex flexDir={{ base: "column", md: "row" }} gap={4}>
          <Card
            w={"full"}
            flexDir={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={2}
          >
            <Flex flexDir={"column"}>
              <Heading textColor={"black"} size={"md"}>
                Realised Volatility
              </Heading>
              <Text color={"black"} opacity={0.8} fontSize={"md"}>
                1 year
              </Text>
            </Flex>
            <Text fontSize={"4xl"} fontWeight={600} textColor={"hollywood.400"}>
              {Math.round(rvol * 100) / 100}%
            </Text>
          </Card>
          <Card
            w={"full"}
            flexDir={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex flexDir={"column"}>
              <Heading textColor={"black"} size={"md"}>
                Return
              </Heading>
              <Text color={"black"} opacity={0.8} fontSize={"md"}>
                1 year
              </Text>
            </Flex>
            <Text fontSize={"4xl"} fontWeight={600} textColor={"hollywood.400"}>
              {Math.round(ret * 100) / 100}%
            </Text>
          </Card>
        </Flex>
        <Card
          flexDir={{ base: "column" }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Flex
            flexDir={"column"}
            gap={2}
            mb={2}
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading textColor={"black"} size={"md"}>
              How do you stack up?
            </Heading>
            <Text color={"black"} opacity={0.8} fontSize={"md"}>
              Understand how your portfolio realized volatility compares to
              others who have filled out the survey!
            </Text>
          </Flex>
          <CommunityRiskReturnScatter
            userRet={ret}
            userRvol={rvol}
            communityRiskReturns={allRiskReturns}
          />
        </Card>
        <Card>
          <Flex
            px={4}
            flexDir={{ base: "column", md: "row" }}
            gap={4}
            justify={"space-between"}
            alignItems={"center"}
          >
            <Flex
              flexDir={"column"}
              gap={2}
              w={{ base: "100%", md: "60%" }}
              textAlign={{ base: "center", md: "left" }}
            >
              <Heading textColor={"black"} size={"md"}>
                Your Asset Allocation
              </Heading>
              <Text color={"black"} opacity={0.8} fontSize={"md"}>
                Understand how your wealth is allocated across your assets.
              </Text>
            </Flex>
            <PortfolioPie allocations={portfolio} />
          </Flex>
        </Card>
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
                  {"How we calculate 'Risk' and Return"}
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
              p={8}
              borderWidth="1px"
              borderStyle="solid"
              borderColor="black"
            >
              <Stack flexDir={"column"} gap={4}>
                <Heading size={"sm"}>Data Retrieval</Heading>
                <Text fontSize={"sm"}>
                  {
                    "We use the yfinance API to get historical price data for each asset. The returns and realized volatility you see are calculated from the daily prices of the past year, starting from the date you access the form. We make some simplifications: we assume you don't change your allocation during the year, meaning you don't buy or sell any assets, and don't reinvestment any dividends."
                  }
                </Text>
                <Heading size={"sm"} mt={2}>
                  {"Portfolio Return"}
                </Heading>
                <Text fontSize={"sm"}>
                  {
                    "We first calculate the daily returns for each asset in the portfolio based on the historical price data. Daily returns measure how much an asset's price changes from one day to the next."
                  }{" "}
                </Text>
                <Text fontSize={"sm"}>
                  {
                    "To calculate the return for the entire portfolio, we aggregate the individual asset returns. This process involves computing a weighted average return, where the return of each asset is weighted based on its allocation within the portfolio. Essentially, assets with higher allocations contribute more to the overall return, reflecting their significance in shaping the portfolio's performance."
                  }{" "}
                </Text>
                <Heading size={"sm"} mt={2}>
                  {"Portfolio 'Risk'"}
                </Heading>
                <Text fontSize={"sm"}>
                  {
                    "To illustrate 'Risk', and the reason why we have encased the word in quotes is because we used realized volatility. For an explanation on the difference between risk and volatility check out this "
                  }
                  <a href="/blog/risk-vs-volatility" className="underline">
                    Blog Post
                  </a>
                  {
                    ". To calculate the realized volatility for the portfolio we first compute the covariance matrix of daily returns for its assets."
                  }{" "}
                </Text>
                <Text fontSize={"sm"}>
                  {
                    "Covariance is a statistical measure that describes the degree to which two random variables (in this case, the daily returns of two assets) change together. A positive covariance indicates that the variables move in the same direction, while a negative covariance suggests they move in opposite directions. A covariance matrix is a square matrix where each element represents the covariance between two variables. For a portfolio of N assets, the covariance matrix is an N x N matrix."
                  }{" "}
                </Text>
                <Text fontSize={"sm"}>
                  {
                    "By weighting this matrix with portfolio allocations, (the percentage of each asset in the portfolio), we calculate how the combined movements influence the overall volatility. The square root of the dot product of the allocation vector and the covariance matrix gives the portfolio's realised volatility."
                  }{" "}
                </Text>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <CopyUrlButton colorScheme="hollywood" marginTop={2}>
          Copy Result Link
        </CopyUrlButton>
      </CardContainer>
      <FurtherLearningSection />
    </Flex>
  );
};

const FurtherLearningSection = async () => {
  return (
    <Flex flexDir={"column"} gap={12} marginTop={8}>
      <Stack gap={4}>
        <Heading size={"lg"}>Want to Learn More?</Heading>
        <Text fontSize="md">
          Checkout two blog posts that will give you a feel of what to expect
        </Text>
      </Stack>
      <SimpleGrid
        columns={{ sm: 1, lg: 2 }}
        gap={{ base: 4, sm: 4, lg: 6 }}
        alignItems="center"
      >
        {sectionDescriptions.map((section, key) => (
          <Section key={key} section={section} />
        ))}
        <SignUpCard />
      </SimpleGrid>
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
      style={{ display: "flex", flexDirection: "column", minHeight: 230 }}
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
            width={150}
            height={150}
            alt={`${section.image}`}
          />
        </Flex>
      </Flex>
    </Card>
  </Link>
);

export default RiskCalculatorResults;
