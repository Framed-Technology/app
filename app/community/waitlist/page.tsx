"use client";

import React, { useState } from "react";
import { Flex, Text, Heading, Input, Button, Stack, SimpleGrid } from "@chakra-ui/react";
import Card from "@/components/ui/card";
import { colors } from "@/theme";
import { insertCommunityInterest } from "./action";
import Link from "next/link";
import platypus from "../../../public/platypus.svg";
import platypusWalking from "../../../public/platypus-walking.svg";
import Image from "next/image";

const toolDescriptions = [
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


const CommunityWaitlist = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);
  const canSubmit = name && email && email.includes("@");
  const onSubmit = () => {
    if (canSubmit) {
      insertCommunityInterest({
        name,
        email,
      });
      setName("");
      setEmail("");
      setRegistered(true);
    } else {
      // TODO: sensible form logic (Formik)
      // TODO: onsubmit redirect to thank you page -> checkout delete account option
      alert("There was an error submitting your form...");
    }
  };

  Input.defaultProps = {
    rounded: "0",
    borderWidth: "1",
    borderColor: "black",
    bg: "white",
    boxShadow: "none",
  };

  return (
    <Flex flexDir={"column"} width="100%" gap={12}>
      <Card
        variant="gradient"
        flexDir={{ base: "column", md: "row" }}
        border="0px"
        gap={8}
        minHeight={{ md: "400px" }}
      >
        <Stack flexDir={"column"} width="100%" justifyContent={"center"}>
          <Heading size={"xl"} color={"white"}>
            Community coming soon...
          </Heading>
          <Heading
            size={"md"}
            fontWeight={"normal"}
            color={"white"}
            opacity={0.8}
          >
            This is a bit more cheeky copy that will hopefully make you trust us
            more with your email and add it below
          </Heading>
        </Stack>
        <Card
          variant={"active"}
          gap={4}
          display="flex"
          flexDirection="column"
          width={{ base: "100%" }}
          maxWidth={{ base: "100%", md: "45%" }}
          justifyContent={"center"}
        >
          {registered ? (
            <Stack>
              <Heading size={"lg"} textAlign={"center"}>
                {"Thanks!"}
              </Heading>
              <Heading size={"lg"} fontWeight={"500"} textAlign={"center"}>
                {"You're on the wait-list"}
              </Heading>
              <Heading size={"md"} fontWeight={"normal"} textAlign={"center"} opacity={0.8}>
                {"We'll let you know when this is ready"}
              </Heading>
            </Stack>
          ) : (
            <>
              <Heading fontWeight={500} size={"lg"} textAlign={"center"}>
                Join the waitlist
              </Heading>
              <Stack gap={2}>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                />
              </Stack>
              <Text fontSize={"xs"}>
                By registering you consent to this website storing your
                submitted information so that it can respond to your inquiry
              </Text>
              <Button
                isDisabled={!canSubmit}
                w="full"
                colorScheme="hollywood"
                onClick={onSubmit}
              >
                Register
              </Button>
            </>
          )}
        </Card>
      </Card>
      {registered && <FurtherLearningSection />}
    </Flex>
  );
};

const FurtherLearningSection = () => {
  return (
    <Flex flexDir={"column"} gap={12} marginTop={8}>
      <Stack gap={4}>
        <Heading size={"lg"}>...In the meantime...</Heading>
        <Text fontSize="md">
          Checkout two blog posts that will give you a feel of what to expect
        </Text>
      </Stack>
      <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={{ base: 4, sm: 4, lg: 6 }}>
        <Stack gap={6}>
          {toolDescriptions.map((tool, key) => (
            <Tool key={key} tool={tool} />
          ))}
        </Stack>
        <BlogCard />
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

const BlogCard = () => {
  return (
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
  );
};

export default CommunityWaitlist;
