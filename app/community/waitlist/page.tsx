"use client";

import React, { useState } from "react";
import { Flex, Text, Heading, Input, Button, Stack } from "@chakra-ui/react";
import Card from "@/components/ui/card";
import { colors } from "@/theme";
import { insertCommunityInterest } from "./action";

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
        minHeight={{md: "400px"}}
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
            <Heading size={"md"} fontWeight={"normal"} opacity={0.8} textAlign={"center"}>
              Success!<br/>You are on the list
            </Heading>
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
    </Flex>
  );
};

export default CommunityWaitlist;
