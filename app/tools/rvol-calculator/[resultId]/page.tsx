import React from "react";
import { readAllRiskReturns, readPortfolioRiskReturn } from "./actions";
import PortfolioPie from "@/components/ui/portfolio-pie";
import Card from "@/components/ui/card";
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
import platypus from "../../../../public/platypus.svg";
import platypusWalking from "../../../../public/platypus-walking.svg";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    resultId: string;
  };
};

const toolDescriptions = [
  {
    name: "Risk Survey",
    description:
      "Understand how you think about risk by framing your percieved risk against everyone else who has used this tool.",
    created: new Date("2024-03-06"),
    path: "/tools/risk-survey",
    preview: "/tools/risk-survey.png",
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
          >
            <Flex flexDir={"column"}>
              <Heading textColor={"black"} size={"md"}>
                {" "}
                Realised Vol
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
        <Card
          flexDir={{ base: "column", md: "row" }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Flex
            flexDir={"column"}
            gap={2}
            w={{ base: "100%", md: "60%" }}
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
                  Methodology
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
              <Stack flexDir={"column"} gap={2}>
                <Heading size={"sm"}>Calculation</Heading>
                <Text fontSize={"md"} marginBottom={2}>
                  Consectetur adipiscing elit. Proin elementum volutpat lectus
                  in pellentesque. Phasellus lobortis libero ut scelerisque
                  cursus. Praesent in suscipit justo. Phasellus tempus auctor
                  orci, id euismod arcu egestas vitae. Suspendisse rutrum ante
                  vitae auctor varius. Proin pharetra molestie metus et
                  bibendum. Aliquam pulvinar faucibus felis, non semper metus
                  aliquet molestie. In hac habitasse platea dictumst. Sed
                  ultrices eget nisi at venenatis. Nullam id nunc eu sapien
                  consequ
                </Text>
                <Heading size={"sm"}>What are you looking at</Heading>
                <Text fontSize={"md"} marginBottom={2}>
                  Consectetur adipiscing elit. Proin elementum volutpat lectus
                  in pellentesque. Phasellus lobortis libero ut scelerisque
                  cursus. Praesent in suscipit justo. Phasellus tempus auctor
                  orci, id euismod arcu egestas vitae. Suspendisse rutrum ante
                  vitae auctor varius. Proin pharetra molestie metus et
                  bibendum. Aliquam pulvinar faucibus felis, non semper metus
                  aliquet molestie. In hac habitasse platea dictumst. Sed
                  ultrices eget nisi at venenatis. Nullam id nunc eu sapien
                  consequ
                </Text>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <CopyUrlButton colorScheme="hollywood" marginTop={2}>
          Copy Result Link
        </CopyUrlButton>
      </CardContainer>
      <Flex flexDir={"column"}>
        <Heading size={"lg"} marginBottom={4} marginTop={8}>
          Want to Learn More?
        </Heading>
        <Text fontSize="md">
          Checkout two blog posts that will give you a feel of what to expect
        </Text>
      </Flex>
      <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={{ sm: 4, lg: 6 }}>
        <Stack gap={6}>
          {toolDescriptions.map((tool, key) => (
            <Tool key={key} tool={tool} />
          ))}
        </Stack>
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

export default RiskCalculatorResults;
