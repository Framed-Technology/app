import RiskSurvey from "@/components/tools/risk-survey";
import Card from "@/components/ui/card";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import platypusWalking from "../../public/platypus-walking.svg";
import platypus from "../../public/platypus.svg";
import Image from "next/image";

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

const Tools = () => {
  return (
    <Flex flexDir={"column"} gap={12}>
      <Stack flexDir={"column"}>
        <Heading size={"2xl"} marginBottom={4}>
          Tools
        </Heading>
        <Heading fontSize="lg" fontWeight={"normal"}>
          Some copy to describe what this page is all about
        </Heading>
      </Stack>
      <Stack gap={6}>
        {toolDescriptions.map((tool, key) => (
          <Tool key={key} tool={tool} />
        ))}
      </Stack>
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
          <Heading size={"lg"} fontWeight={500}>
            {tool.name}
          </Heading>
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

export default Tools;
