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
import { insertLandingInterest } from "./actions";

const EmailCapture = () => {
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);
  const canSubmit = email && email.includes("@");
  const onSubmit = () => {
    if (canSubmit) {
      insertLandingInterest({
        email,
      });
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
    borderColor: "black",
    bg: "white",
    boxShadow: "none",
    borderWidth: "2px",
  };

  return (
    <Flex
      flexDirection="column"
      alignItems={{ base: "center", lg: "start" }}
      justifyContent={{ base: "center", lg: "start" }}
      width="full"
    >
      {registered ? (
        <Flex>
          <Text
            fontWeight={600}
            borderWidth="2px"
            color={"white"}
            borderColor="black"
            bg={"glowstone.500"}
            px={4}
            py={2}
            textAlign="left"
            w="full"
            maxWidth={"400px"}
          >
            {"Thanks for registering your interest!"}
          </Text>
        </Flex>
      ) : (
        <>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
          <Button
            isDisabled={!canSubmit}
            w="full"
            colorScheme="glowstone"
            borderTop="0px"
            borderWidth="2px"
            onClick={onSubmit}
            _disabled={{ colorScheme: "glowstone", opacity: 1 }}
            cursor={canSubmit ? "pointer" : "not-allowed"}
          >
            {"Register your interest"}
          </Button>
        </>
      )}
    </Flex>
  );
};

export default EmailCapture;
