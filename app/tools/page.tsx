import RiskSurvey from "@/components/tools/risk-survey";
import Card from "@/components/ui/card";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const toolDescriptions = [
  {
    name: "Risk Survey",
    description:
      "Understand how you think about risk by framing your percieved risk against everyone else who has used this tool.",
    created: new Date("2024-03-06"),
    path: "/tools/risk-survey",
    preview: "/tools/risk-survey.png",
  },
];

const Tools = () => {
  return (
    <Flex flexDir={"column"} gap={4}>
      <Heading>Tools</Heading>
      <SimpleGrid minChildWidth={{ base: "250px", md: "350px" }} spacing="20px">
        {toolDescriptions.map((tool, key) => (
          <Tool key={key} tool={tool} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

const Tool = ({ tool }: { tool: (typeof toolDescriptions)[number] }) => (
  <Card>
    <Flex flexDir={"column"} gap={8}>
      <Flex flexDir={"column"}>
        <Text
          fontWeight={600}
          textColor={"white"}
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
        >
          {tool.name}
        </Text>
        <Text>{tool.description}</Text>
      </Flex>
      <Box
        borderWidth={2}
        borderColor={"black"}
        maxW={{ base: 400, lg: 600 }}
        m={"auto"}
        position={"relative"}
      >
        <Image
          src={tool.preview}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt={`${tool.name} Preview`}
        />
        <Box position={"absolute"} top={0} bottom={0} left={0} right={0} />
      </Box>
      <Flex justifyContent={"center"} w={"full"}>
        <Link href={tool.path} className="w-full md:w-fit">
          <Button
            w={"full"}
            colorScheme="hollywood"
            rightIcon={<FaArrowRight />}
          >
            {tool.name}
          </Button>
        </Link>
      </Flex>
    </Flex>
  </Card>
);

export default Tools;
