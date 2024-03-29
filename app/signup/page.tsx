"use client"

import React from "react";
import {
  Flex,
  Heading,
  Center,
  Stack,
} from "@chakra-ui/react";
import Card from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";
import SignUpButton from "@/components/ui/auth/signup-button";
import { useSession } from "next-auth/react";

const SignUp = () => {
  const { data: session } = useSession();
  const isLoggedIn = Boolean(session);
  return (
    <Flex flexDir={"column"} gap={12}>
      <Stack flexDir={"column"}>
        <Heading size={"2xl"} marginBottom={4}>
          Sign Up
        </Heading>
        <Heading fontSize="lg" fontWeight={"normal"}>
          Some copy to describe what this page is all about
        </Heading>
      </Stack>
      <Card variant={"active"} gap={6}>
        <Stack flexDir={"column"} alignItems={"center"}>
          <Heading
            fontWeight={500}
            size={"xl"}
            textAlign={"center"}
            marginBottom={4}
          >
            Create your free account
          </Heading>
          <Heading fontSize="lg" fontWeight={"normal"}>
            100% free. No credit card needed.
          </Heading>
        </Stack>
        <Center>
          {isLoggedIn ? (
            <>You are logged in!</>
          ) : (
            <SignUpButton
              size="md"
              colorScheme="hollywood"
              leftIcon={<FaGoogle size={20} />}
            >
              {"Continue with Google"}
            </SignUpButton>
          )}
        </Center>
      </Card>
    </Flex>
  );
};

export default SignUp;
