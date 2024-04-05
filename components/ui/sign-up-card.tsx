import React from "react";
import Card from "@/components/ui/card";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { colors } from "@/theme";

const SignUpCard = () => {
  return (
    <Link href="/courses/waitlist">
      <Card
        variant="gradient"
        minHeight={{ md: "200px" }}
        boxShadow="5px 5px 0 black"
        style={{ display: "flex", flexDirection: "column", minHeight: 230 }}
      >
        <Flex
          flexDir="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ flex: 1 }}
          gap={12}
        >
          <Flex flexDir={"column"} gap={4}>
            <Heading size={"lg"} color={"white"}>
              Pretty off base?
            </Heading>
            <Text
              fontSize={"md"}
              fontWeight={"normal"}
              color={"white"}
              opacity={0.8}
            >
              Sign up for some courses that will put your mind at ease
            </Text>
          </Flex>
          <FaArrowRight
            size={40}
            style={{ color: colors.glowstone[500], marginRight: "0.5rem" }}
          />
        </Flex>
      </Card>
    </Link>
  );
};

export default SignUpCard;
