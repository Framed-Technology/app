"use client";

import React, { useState } from "react";
import {
  Flex,
  Text,
  Heading,
  Input,
  Button,
  Center,
  Stack,
  Divider,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import Card from "@/components/ui/card";
import { colors } from "@/theme";

const aboutPageContent: ContactPageContentProps[] = [
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

// Input.defaultProps = {
//   shadow: "5px 5px 0 black",
//   rounded: 0,
//   borderWidth: 2,
//   borderColor: "black",
//   bg: "white",
// };

// NumberInputField.defaultProps = {
//   shadow: "5px 5px 0 black",
//   rounded: 0,
//   borderWidth: 2,
//   borderColor: "black",
//   bg: "white",
// };

interface ContactFormData {
    name: string;
    email: string;
    message: string;
  }
  
  const ContactForm: = ({ onSubmit } : ContactFormData) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
  
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    };
  
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };
  
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
    };

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
            Contact Us
          </Heading>
          <Divider borderColor="black" opacity={0.6} />
        </Stack>
        <Stack>
          <ContactPageContents content={aboutPageContent[0]} />
        </Stack>
        <Stack gap={8}>
          <Heading
            size={"md"}
            fontWeight={"normal"}
            textAlign={"center"}
            opacity={0.6}
          >
            How can we help you?
          </Heading>
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
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Name"
                />
                <br />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email Address"
                />
                <br />
                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  placeholder="Message"
                ></textarea>
                {/* <br />
                <button onClick={handleSubmit}>Submit</button> */}
              </div>
            </Stack>
          </Card>
        </Stack>
      </Flex>
    </Center>
  );
};

type ContactPageContentProps = {
  heading: string;
  texts: string[];
};

const ContactPageContents = ({
  content,
}: {
  content: ContactPageContentProps;
}) => {
  return (
    <Stack flexDir={"column"} gap={6}>
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

export default Contact;
