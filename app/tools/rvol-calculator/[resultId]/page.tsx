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
import { FaExternalLinkAlt } from "react-icons/fa";
import { colors } from "@/theme";
import platypusWalking from "../../../../public/platypus-walking.svg";

type Props = {
  params: {
    resultId: string;
  };
};

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
          {
            "See your portfolio's 1-year realized volatility and return, and how this compares with others below"
          }
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
          px={{ base: 2, md: 10 }}
        >
          <Flex
            flexDir={"column"}
            gap={2}
            mb={2}
            textAlign={{ base: "center", md: "left" }}
            px={10}
          >
            <Heading textColor={"black"} size={"md"}>
              How do your results compare?
            </Heading>
            <Text color={"black"} opacity={0.8} fontSize={"md"}>
              {
                "Spot your portfolio! You're the blue dot, with other nurses (pink dots) and the S&P500 (yellow). Greater return is shown on the y-axis, while higher 'risk' on the x-axis. FYI you'll stay anonymous. Remember this is a guide - checkout the methodology for more details"
              }
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
                {
                  "This pie chart is not just aesthetically pleasing. It also allows for easy comparison with other portfolios. As you learn more about investing, revisit it to gauge if your asset mix aligns with your risk tolerance"
                }
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
                    "We use the yfinance API to get historical price data for each asset. The returns and realized volatility you see are calculated from the daily prices of the past year, starting from the date you access the form. We make some simplifications: we assume you don't change your allocation during the year, meaning you don't buy or sell any assets, and don't reinvestment any dividends. Note that this may not accurately reflect your actual experience."
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
                  </a>
                  {
                    ". To calculate the realized volatility for the portfolio we first compute the covariance matrix (sounds complicated but it isn't) of daily returns for its assets."
                  }{" "}
                </Text>
                <Text fontSize={"sm"}>
                  {
                    "A matrix is just a big square grid where each box holds a number. In our case, we put all the assets in your portfolio across the top and down the left-hand side. This way, you can see how each asset interacts with every other asset. It's kind of like those tables you see with sports teams and their scores against all the other teams."
                  }
                </Text>
                <Text fontSize={"sm"}>
                  {
                    "Covariance is a statistical measure that shows how variables, like the daily returns of two assets, change together. If the number is positive, it means the variables move in the same direction. If it's negative, they move in opposite directions."
                  }
                </Text>
                <Text fontSize={"sm"}>
                  {
                    "In our covariance matrix, each box in this big square grid contains a number representing the covariance between two assets. For a portfolio with 10 assets, we will have 10 rows and 10 columns."
                  }
                </Text>
                <Text fontSize={"sm"}>
                  {
                    "By weighting this matrix with portfolio allocations, (the percentage of each asset in the portfolio), we calculate how the combined movements influence the overall volatility. The math: The portfolio's realized volatility is determined by taking the square root of the weighted allocations' dot product with the covariance matrix of returns, reflecting the portfolio's risk as the standard deviation of its returns."
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
      </Stack>
      <SignUpCard variant="calculatorResult"/>
    </Flex>
  );
};

export default RiskCalculatorResults;
