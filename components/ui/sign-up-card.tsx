import React from "react";
import Card from "@/components/ui/card";
import {
  Flex,
  Heading,
  Text,
  Button,
  FlexProps,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { colors } from "@/theme";

type SignUpCardProps = {
  variant?:
    | "surveyResult"
    | "calculatorResult"
    | "communitySignup"
    | "coursesSignup";
} & FlexProps;

const SignUpCard = (props: SignUpCardProps) => {
  const { variant, ...rest } = props;

  switch (variant) {
    case "surveyResult":
      return <SurveyResult {...rest} />;
    case "calculatorResult":
      return <CalculatorResult {...rest} />;
    case "communitySignup":
      return <CommunitySignup {...rest} />;
    case "coursesSignup":
      return <CoursesSignup {...rest} />;
  }
};

const CalculatorResult = () => {
  return (
    <Link href="/courses/waitlist">
      <Card
        variant="gradient"
        display="flex"
        flexDirection="column"
        gap={6}
        shadow="5px 5px 0 black"
      >
        <Flex display="flex" flexDirection="column" gap={4}>
          <Heading size={"md"} color={"white"}>
            {"Let's turn uncertainty into confidence"}
          </Heading>
          <Text
            fontSize={"md"}
            fontWeight={"normal"}
            color={"white"}
            opacity={0.8}
          >
            {
              "Whether the risk calculator had you feeling like an investment pro or left you a bit bewildered, remember: past success doesn't guarantee future gains. Dive into our courses tailor-made for nurses eager to learn more about the world of investing."
            }
          </Text>
        </Flex>
        <Link href={"/courses/waitlist"}>
          <Button colorScheme="hollywood">
            Sign up{" "}
            <FaArrowRight
              size={20}
              style={{
                color: "white",
                marginLeft: "0.5rem",
              }}
            />
          </Button>
        </Link>
      </Card>
    </Link>
  );
};

const SurveyResult = () => {
  return (
    <Link href="/courses/waitlist">
      <Card
        variant="gradient"
        display="flex"
        flexDirection="column"
        gap={6}
        shadow="5px 5px 0 black"
        minHeight={{md:"260px"}}
      >
        <Flex display="flex" flexDirection="column" gap={4}>
          <Heading size={"md"} color={"white"}>
            {"Identify gaps in your knowledge?"}
          </Heading>
          <Text
            fontSize={"md"}
            fontWeight={"normal"}
            color={"white"}
            opacity={0.8}
          >
            {"If so, no worries! It's all part of the learning journey."}
            <br />
            {"Sign-up for our straightforward, engaging, and accessible courses to expand your investing knowledge."}
          </Text>
        </Flex>
        <Link href={"/courses/waitlist"}>
          <Button colorScheme="hollywood">
            Sign up{" "}
            <FaArrowRight
              size={20}
              style={{
                color: "white",
                marginLeft: "0.5rem",
              }}
            />
          </Button>
        </Link>
      </Card>
    </Link>
  );
};

const CommunitySignup = () => {
  return (
    <Link href="/community/waitlist">
      <Card
        variant="whiteShadow"
        display="flex"
        flexDirection="column"
        gap={6}
        shadow="5px 5px 0 black"
        minHeight={{md:"260px"}}
      >
        <Flex display="flex" flexDirection="column" gap={4}>
          <Heading size={"md"} color={"black"}>
            {"Join our community"}
          </Heading>
          <Text
            fontSize={"md"}
            fontWeight={"normal"}
            color={"black"}
            opacity={0.8}
          >
            {
              "Share experiences, ask questions, and learn from other Nurses who understand the unique challenges you face when it comes to learning about investing."
            }
          </Text>
        </Flex>
        <Link href={"/community/waitlist"}>
          <Button colorScheme="hollywood">
            Sign up{" "}
            <FaArrowRight
              size={20}
              style={{
                color: "white",
                marginLeft: "0.5rem",
              }}
            />
          </Button>
        </Link>
      </Card>
    </Link>
  );
};

const CoursesSignup = () => {
  return (
    <Link href="/courses/waitlist">
      <Card
        variant="whiteShadow"
        display="flex"
        flexDirection="column"
        gap={6}
        shadow="5px 5px 0 black"
        minHeight={{md:"260px"}}
      >
        <Flex display="flex" flexDirection="column" gap={4}>
          <Heading size={"md"} color={"black"}>
            {"Investment Education for Nurses"}
          </Heading>
          <Text
            fontSize={"md"}
            fontWeight={"normal"}
            color={"black"}
            opacity={0.8}
          >
            {"Straightforward, engaging, and accessible courses tailor-made for nurses to fit seamlessly into your unstructured life."}
          </Text>
        </Flex>
        <Link href={"/courses/waitlist"}>
          <Button colorScheme="hollywood">
            Sign up{" "}
            <FaArrowRight
              size={20}
              style={{
                color: "white",
                marginLeft: "0.5rem",
              }}
            />
          </Button>
        </Link>
      </Card>
    </Link>
  );
};

export default SignUpCard;
