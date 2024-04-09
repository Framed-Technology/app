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
  Textarea,
} from "@chakra-ui/react";
import Card from "@/components/ui/card";
import { colors } from "@/theme";
import { insertCommunityInterest } from "./action";
import Link from "next/link";
import platypusSurvey from "../../../public/platypus-survey.svg";
import Image from "next/image";
import SignUpCard from "../../../components/ui/sign-up-card";


const CommunityWaitlist = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [registered, setRegistered] = useState(false);
  const canSubmit = name && email && email.includes("@");
  const onSubmit = () => {
    if (canSubmit) {
      insertCommunityInterest({
        name,
        email,
        message,
      });
      setName("");
      setEmail("");
      setMessage("");
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
    color: "black",
    boxShadow: "none",
  };

  Textarea.defaultProps = {
    rounded: "0",
    borderWidth: "1",
    borderColor: "black",
    bg: "white",
    boxShadow: "none",
    color: "black",
    minHeight: "160px",
  };
  return (
    <Flex flexDir={"column"} width="100%" gap={12}>
      <Stack flexDir={"column"}>
        <Heading size={"2xl"}>Comming Soon...</Heading>
      </Stack>
      <Card
        flexDir={{ base: "column" }}
        gap={8}
        alignItems={"center"}
        borderWidth={1}
      >
        <Stack
          flexDir={"column"}
          width="100%"
          justifyContent={"center"}
          gap={6}
          maxW="680px"
        >
          <Heading size={"xl"} color={"black"}>
            An investing community for Nurses{" "}
          </Heading>
          <Stack color={"black"} opacity={0.9} gap={4} fontSize={"lg"}>
            <Text>
              {
                "Connect with other nurses who get what it's like to learn (and miss out on learning) about investing."
              }
            </Text>
            <Text>
              {
                "Hear stories from those who've been through it all - the tough shifts, burnout, fluctuating paychecks, fretting over retirement, and chasing the dream of owning a home."
              }
            </Text>
            <Text>
              {
                "Learn from each other's experiences, so you can sidestep making the same mistakes and navigate your own investing journey with confidence."
              }
            </Text>
          </Stack>
        </Stack>
        <Flex justifyContent={"center"} width={"100%"} maxW={"680px"}>
          <Card
            variant={"gradient"}
            gap={4}
            display="flex"
            flexDirection="column"
            width={"100%"}
            justifyContent={"center"}
            color={"white"}
            shadow= {"5px 5px 0 black"}
          >
            {registered ? (
              <Stack>
                <Heading size={"md"} textAlign={"center"}>
                  {"Thanks!"}
                </Heading>
                <Heading
                  size={"md"}
                  fontWeight={"normal"}
                  textAlign={"center"}
                  opacity={0.8}
                >
                  {"You're on the wait-list. We'll let you know when this goes live."}
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
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message (optional)"
                  />
                </Stack>
                <Text fontSize={"xs"}>
                  {
                    "By registering, you're giving us permission to hold onto the details you've shared with us. So we can respond to your submission."
                  }
                </Text>
                <Button
                  isDisabled={!canSubmit}
                  w="full"
                  colorScheme="hollywood"
                  onClick={onSubmit}
                >
                  Register interest
                </Button>
              </>
            )}
          </Card>
        </Flex>
      </Card>
      {registered && <FurtherLearningSection />}
    </Flex>
  );
};

const sectionDescriptions = [
  {
    name: "'Risk' Perception Survey",
    description:
      "Gain insight into your how your risk perceptions of common investments compares with others in this survey.",
    path: "/tools/risk-survey",
    image: platypusSurvey,
  },
];

const FurtherLearningSection = () => {
  return (
    <Flex flexDir={"column"} gap={12} marginTop={8}>
      <Stack gap={4}>
        <Heading size={"lg"}>...In the meantime...</Heading>
        <Text fontSize="md">
          {
            "If you haven't already, check out our 'Risk' Perception Survey or sign-up for our courses tailor-made for nurses diving into investing education."
          }{" "}
        </Text>
      </Stack>
      <SimpleGrid
        columns={{ sm: 1, lg: 2 }}
        gap={{ base: 4, sm: 4, lg: 6 }}
        alignItems="center"
      >
        <SignUpCard variant="coursesSignup" />
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
      style={{ display: "flex", flexDirection: "column", minHeight: 260 }}
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
            width={100}
            height={100}
            alt={`${section.image}`}
          />
        </Flex>
      </Flex>
    </Card>
  </Link>
);

export default CommunityWaitlist;
