"use client";

import React, { useState } from "react";
import {
  Flex,
  Text,
  Heading,
  Input,
  Button,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import Card from "@/components/ui/card";
import { colors } from "@/theme";
import { insertCourseInterest } from "./action";
import Link from "next/link";
import Image from "next/image";
import platypus from "../../../public/platypus.svg";
import platypusWalking from "../../../public/platypus-walking.svg";

const CoursesWaitlist = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);
  const canSubmit = name && email && email.includes("@");
  const onSubmit = () => {
    if (canSubmit) {
      insertCourseInterest({
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
            Courses coming soon...
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
              <Heading
                size={"md"}
                fontWeight={"normal"}
                textAlign={"center"}
                opacity={0.8}
              >
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

const FurtherLearningSection = () => {
  return (
    <Flex flexDir={"column"} gap={12} marginTop={8}>
      <Stack gap={4}>
        <Heading size={"lg"}>...In the meantime...</Heading>
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
      flexDir={"row"}
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

export default CoursesWaitlist;
