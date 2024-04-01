"use client";

import React, { useState } from "react";
import {
  Flex,
  Text,
  Heading,
  Input,
  Button,
  Center,
  Stack,
  Divider,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  Textarea,
} from "@chakra-ui/react";
import Card from "@/components/ui/card";
import { colors } from "@/theme";
import { insertCourseInterest } from "./action";

const CoursesWaitlist = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const canSubmit = name && email && email.includes("@");
  const onSubmit = () => {
    if (canSubmit) {
      insertCourseInterest({
        name,
        email,
      });
      setName("");
      setEmail("");
    } else {
      // TODO: sensible form logic (Formik)
      // TODO: onsubmit redirect to thank you page -> checkout delete account option
      alert("There was an error submitting your form...");
    }
  };

  return (
    <Center>
      <Flex
        flexDir={"column"}
        gap={12}
        alignItems={"center"}
        justifyContent={"center"}
        maxW="680px"
      >
        <Stack flexDir={"column"} width="100%">
          <Heading size={"xl"} marginBottom={4} textAlign={"center"}>
            Coming Soon...
          </Heading>
          <Divider borderColor="black" opacity={0.6} />
        </Stack>
        <Stack gap={8}>
          <Heading
            size={"md"}
            fontWeight={"normal"}
            textAlign={"center"}
            opacity={0.6}
          >
            This is the courses waitlist
          </Heading>
          <Card variant={"active"} gap={6}>
            <Stack flexDir={"column"} alignItems={"center"}>
              <Heading
                fontWeight={500}
                size={"xl"}
                textAlign={"center"}
                marginBottom={4}
              >
                Join the waitlist
              </Heading>
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
              <Button
                isDisabled={!canSubmit}
                w="full"
                colorScheme="hollywood"
                onClick={onSubmit}
              >
                Register
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Flex>
    </Center>
  );
};

type ContactPageContentProps = {
  heading: string;
  texts: string[];
};

const ContactPageContents = ({
  content,
}: {
  content: ContactPageContentProps;
}) => {
  return (
    <Stack flexDir={"column"} gap={6}>
      <Heading size={"sm"}>{content.heading}</Heading>
      <Stack flexDir={"column"} gap={4}>
        {content.texts.map((text, index) => (
          <Text key={index} fontSize={"md"}>
            {text}
            <a href="mailto:jack.skerm@gmail.com">jack.skerm@gmail.com</a>
          </Text>
        ))}
      </Stack>
    </Stack>
  );
};

export default CoursesWaitlist;
