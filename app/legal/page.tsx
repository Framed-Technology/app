import Card from "@/components/ui/card";
import { Flex, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

const legalPageDescriptions = [
  {
    name: "Privacy Policy",
    path: "/legal/privacy-policy",
  },
  {
    name: "Terms of Use",
    path: "/legal/terms-of-use",
  },
  {
    name: "Cookies Policy",
    path: "/legal/cookies-policy",
  },
  {
    name: "Disclaimer",
    path: "/legal/disclaimer",
  },
];

const LegalPages = () => {
  return (
    <Flex flexDir={"column"} gap={12}>
      <Stack flexDir={"column"}>
        <Heading size={"2xl"} marginBottom={4}>
          Legal Stuff
        </Heading>
        <Heading fontSize="lg" fontWeight={"normal"}>
          Some copy to describe what this page is all about
        </Heading>
      </Stack>
      <Stack gap={6}>
        <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={{ base: 4, sm: 4, lg: 6 }}>
          {legalPageDescriptions.map((legalPage, key) => (
            <LegalPage key={key} legalPage={legalPage} />
          ))}
        </SimpleGrid>
      </Stack>
    </Flex>
  );
};

const LegalPage = ({
  legalPage,
}: {
  legalPage: (typeof legalPageDescriptions)[number];
}) => (
  <Link href={legalPage.path}>
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
            {legalPage.name}
          </Heading>
        </Flex>
      </Flex>
    </Card>
  </Link>
);

export default LegalPages;
