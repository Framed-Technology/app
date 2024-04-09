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
import platypusSurvey from "../../../public/platypus-survey.svg";
import SignUpCard from "../../../components/ui/sign-up-card";

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
    color: "black",
    boxShadow: "none",
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
        boxShadow="none"
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
            {"Investment Education for Nurses"}
          </Heading>
          <Stack color={"black"} opacity={0.9} gap={4} fontSize={"lg"}>
            <Text>
              {
                "We feel your struggle. The gruelling shifts, the emotional toll, and the feeling that the system is stacked against you."
              }
            </Text>
            <Text>
              {
                "You pour your heart into your work, yet what do you get in return?"
              }
            </Text>
            <Text>
              {
                "Often, it's minimal pay and a constant hustle just to make ends meet."
              }
            </Text>
            <Text>
              {
                "No one has shown you the path to financial freedom, leaving you stranded in uncertainty about where even to start."
              }
            </Text>
            <Text>
              {"The stakes? Risking burnout without a clear road to retirement."}
            </Text>
            <Text>
              {
                "We are here to help. Let us fill the gaps in your investing knowledge so that you can more confidently navigate conversations and decisions about your financial future."
              }
            </Text>
            <Text>
              {
                "Our courses are tailor-made for nurses. They're straightforward, engaging, and accessible. Designed to fit seamlessly into your unstructured life – whether you're on a late-night shift or scrolling through your phone in bed after a rough night's sleep."
              }
            </Text>
            <Text>
              {
                "Because Nurses deserve more than just a wage – it's time someone cared for you and your financial well-being."
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
            "If you haven't already, explore our 'Risk' Perception Survey or join our supportive community of fellow Nurses on their investing education journey."
          }
        </Text>
      </Stack>
      <SimpleGrid
        columns={{ sm: 1, lg: 2 }}
        gap={{ base: 4, sm: 4, lg: 6 }}
        alignItems="center"
      >
        <SignUpCard variant="communitySignup" />
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

export default CoursesWaitlist;
