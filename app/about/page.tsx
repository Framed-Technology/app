import React from "react";
import {
  Flex,
  Text,
  Heading,
  Stack,
  Center,
  Divider,
  Box,
} from "@chakra-ui/react";
import platypusWalking from "../../public/platypus-walking.svg";
import platypusLogo from "../../public/platypus.svg";
import Image from "next/image";

const aboutPageContent: AboutPageContentProps[] = [
  {
    heading: "What are you looking at",
    texts: [
      "Consectetur adipiscing elit. Proin elementum volutpat lectus in pellentesque. Phasellus lobortis libero ut scelerisque cursus. Praesent in suscipit justo. Phasellus tempus auctor orci, id euismod arcu egestas vitae. Suspendisse rutrum ante vitae auctor varius. Proin pharetra molestie metus et bibendum. Aliquam pulvinar faucibus felis, non semper metus aliquet molestie. In hac habitasse platea dictumst. Sed ultrices eget nisi at venenatis. Nullam id nunc eu sapien consequ.",
      "Consectetur adipiscing elit. Proin elementum volutpat lectus in pellentesque. Phasellus lobortis libero ut scelerisque cursus. Praesent in suscipit justo. Phasellus tempus auctor orci, id euismod arcu egestas vitae. Suspendisse rutrum ante vitae auctor varius. Proin pharetra molestie metus et bibendum. Aliquam pulvinar faucibus felis, non semper metus aliquet molestie. In hac habitasse platea dictumst. Sed ultrices eget nisi at venenatis. Nullam id nunc eu sapien consequ.",
    ],
  },
  {
    heading: "What are you looking at",
    texts: [
      "Consectetur adipiscing elit. Proin elementum volutpat lectus in pellentesque. Phasellus lobortis libero ut scelerisque cursus. Praesent in suscipit justo. Phasellus tempus auctor orci, id euismod arcu egestas vitae. Suspendisse rutrum ante vitae auctor varius. Proin pharetra molestie metus et bibendum. Aliquam pulvinar faucibus felis, non semper metus aliquet molestie. In hac habitasse platea dictumst. Sed ultrices eget nisi at venenatis. Nullam id nunc eu sapien consequ.",
      "Consectetur adipiscing elit. Proin elementum volutpat lectus in pellentesque. Phasellus lobortis libero ut scelerisque cursus. Praesent in suscipit justo. Phasellus tempus auctor orci, id euismod arcu egestas vitae. Suspendisse rutrum ante vitae auctor varius. Proin pharetra molestie metus et bibendum. Aliquam pulvinar faucibus felis, non semper metus aliquet molestie. In hac habitasse platea dictumst. Sed ultrices eget nisi at venenatis. Nullam id nunc eu sapien consequ.",
    ],
  },
  {
    heading: "What are you looking at",
    texts: [
      "Consectetur adipiscing elit. Proin elementum volutpat lectus in pellentesque. Phasellus lobortis libero ut scelerisque cursus. Praesent in suscipit justo. Phasellus tempus auctor orci, id euismod arcu egestas vitae. Suspendisse rutrum ante vitae auctor varius. Proin pharetra molestie metus et bibendum. Aliquam pulvinar faucibus felis, non semper metus aliquet molestie. In hac habitasse platea dictumst. Sed ultrices eget nisi at venenatis. Nullam id nunc eu sapien consequ.",
      "Consectetur adipiscing elit. Proin elementum volutpat lectus in pellentesque. Phasellus lobortis libero ut scelerisque cursus. Praesent in suscipit justo. Phasellus tempus auctor orci, id euismod arcu egestas vitae. Suspendisse rutrum ante vitae auctor varius. Proin pharetra molestie metus et bibendum. Aliquam pulvinar faucibus felis, non semper metus aliquet molestie. In hac habitasse platea dictumst. Sed ultrices eget nisi at venenatis. Nullam id nunc eu sapien consequ.",
    ],
  },
];

const About = () => {
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
            Our Story
          </Heading>
          <Divider borderColor="black" opacity={0.6} />
          <Center>
            <Flex
              minWidth={300}
              maxWidth={400}
              my={8}
              alignItems="center"
              justifyContent="center"
            >
              <Image src={platypusWalking} alt="Platypus Walking" />
            </Flex>
          </Center>
          <Heading
            size={"md"}
            fontWeight={"normal"}
            textAlign={"center"}
            opacity={0.6}
          >
            {"Hey, I'm Nicolas"}
          </Heading>
        </Stack>
        <Stack>
          <AboutPageContents content={aboutPageContent[0]} />
          <Center>
            <Flex
              minWidth={300}
              maxWidth={400}
              my={8}
              alignItems="center"
              justifyContent="center"
            >
              <Image src={platypusLogo} alt="Magenta Platypus" />
            </Flex>
          </Center>
          <AboutPageContents content={aboutPageContent[1]} />
        </Stack>
      </Flex>
    </Center>
  );
};

type AboutPageContentProps = {
  heading: string;
  texts: string[];
};

const AboutPageContents = ({ content }: { content: AboutPageContentProps }) => {
  return (
    <Stack flexDir={"column"} gap={6} mb={8}>
      <Heading size={"sm"}>{content.heading}</Heading>
      <Stack flexDir={"column"} gap={4}>
        {content.texts.map((text, index) => (
          <Text key={index} fontSize={"md"}>
            {text}
          </Text>
        ))}
      </Stack>
    </Stack>
  );
};

export default About;
