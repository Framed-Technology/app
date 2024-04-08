import React from "react";
import Card from "@/components/ui/card";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import platypusWalking from "../../public/platypus-walking.svg";
import platypus from "../../public/platypus.svg";

const sectionDescriptions = [
  {
    name: "Blog",
    description:
      "Where we write and provide adjacent value like how to buy bitcoin or how to get a locum job in Aussie",
    path: "/blog",
    image: platypusWalking,
  },
  {
    name: "Tools",
    description:
      "Some tools that help you conceptualise what you do and do not know. Identify the gaps in your understanding",
    path: "/tools",
    image: platypus,
  },
];

const SectionNavCard = ({
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

export default SectionNavCard;
