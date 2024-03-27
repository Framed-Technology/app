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
      <Card variant={"active"}>
        <Center>
          <AuthCta />
        </Center>
      </Card>
    </Flex>
  );
};

const AuthCta = () => (
  <Flex flexDir={"row"} gap={2} position={"absolute"} px={4}>
    <AuthButton buttonText="Continue with Google" icon={<FaUser />} />
  </Flex>
);

export default SignUp;
