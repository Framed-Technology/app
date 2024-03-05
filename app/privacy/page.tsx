import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

const Privacy = () => {
  return (
    <Flex
      flexDir={"column"}
      gap={4}
      bg={"lily-white.100"}
      p={4}
      borderWidth={2}
      borderColor={"black"}
      shadow={"5px 5px 0 black"}
    >
      <Heading>Private Policy</Heading>
      <Text>
        Our default privacy policy is never to gather, store or sell information
        about you, or to engage in any other behavior that would compromise your
        privacy and security in any way. By default we do not gather personally
        identifying information.
      </Text>
      <Heading fontSize={"xl"}>Anonymous Metrics</Heading>
      <Text>
        We collect anonymous website usage data (with no personally identifying
        information attached) to improve our sites. For example, we measure what
        pages people are visiting and how long visitors stay on our site. We use
        Google Analytics for this purpose.
      </Text>
      <Heading fontSize={"xl"}>Contact Form</Heading>
      <Text>
        Do not submit sensitive information, such as payment information or
        passwords, via our contact form. Information sent via our contact form
        may be shared amongst our team. We will not use your contact information
        for any purpose, including marketing emails, except to contact you
        regarding your inquiry.
      </Text>
    </Flex>
  );
};

export default Privacy;
