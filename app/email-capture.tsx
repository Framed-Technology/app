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
  const canSubmit = email && email.includes("@");
  const onSubmit = () => {
    if (canSubmit) {
      insertLandingInterest({
        email,
      });
      setEmail("");
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
    borderBottom: "0px",
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center" // Center vertically on small screens
      width="full"
    >
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
        borderWidth= "2px"
        onClick={onSubmit}
        _disabled={{ colorScheme: "glowstone", opacity: 1,}}
        cursor={canSubmit ? "pointer" : "not-allowed"}
        >
        {"Register your interest"}
      </Button>
    </Flex>
  );
};

export default EmailCapture;
