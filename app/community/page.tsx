import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { redirect } from "next/navigation";

const Community = () => {
  // redirect('/');

  return (
    <Flex flexDir={"column"}>
      <Heading>Community</Heading>
      <Text>Comming soon</Text>
    </Flex>
  );
};

export default Community;
