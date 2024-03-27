import React from "react";
import {
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Button,
  Box,
  Avatar,
  Tag,
  color,
  Center,
  Stack,
} from "@chakra-ui/react";
import Card from "@/components/ui/card";
import AuthButton from "@/components/ui/auth/auth-button";
import { FaUser } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

const SignUp = () => {
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
          <AuthCta />
        </Center>
      </Card>
    </Flex>
  );
};

const AuthCta = () => (
  <Flex flexDir={"row"} gap={2} px={4}>
    <AuthButton
      size="md"
      colorScheme="hollywood"
      buttonText="Continue with Google"
      leftIcon={<FaGoogle size={20} />}
    />
  </Flex>
);

export default SignUp;
