import { Post } from "@/api/types";
import Card from "./card";
import {
  Heading,
  Center,
  Flex,
  Stack,
  Divider,
  Avatar,
  Text,
} from "@chakra-ui/react";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Image from "next/image";
import { Source_Serif_4 } from "next/font/google";

const sourceSerifFour = Source_Serif_4({ subsets: ["latin"], weight: "500" });

const PostContent = ({ content }: { content: Post }) => {
  const publishedDate = new Date(content.publishedAt);
  const formattedDate = publishedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Center>
      <Flex
        flexDir={"column"}
        gap={12}
        alignItems={"center"}
        justifyContent={"center"}
        maxW="680px"
      >
        <Stack flexDir={"column"} width="100%" gap={12}>
          <Stack gap={10}>
            <Stack gap={6}>
              <Heading size={"2xl"} textAlign={"left"}>
                {content.title}
              </Heading>
              <Heading
                size={"md"}
                fontWeight={"normal"}
                textAlign={"left"}
                opacity={0.6}
              >
                {content.subTitle}
              </Heading>
            </Stack>
            <Flex flexDir={"row"} gap={4}>
              <Avatar size={"md"} src={content.authorAvatar?.data} />
              <Stack flexDir={"column"} gap={1}>
                <Text fontSize={"sm"} fontWeight={"normal"} textAlign={"left"}>
                  {content.authorName}
                </Text>
                <Stack flexDir={"row"} gap={2}>
                  <Text
                    fontSize={"sm"}
                    fontWeight={"normal"}
                    textAlign={"left"}
                    opacity={0.4}
                  >
                    {"Minutes to read: " + content.minsToRead}
                  </Text>
                  <Text
                    fontSize={"sm"}
                    fontWeight={"normal"}
                    textAlign={"left"}
                    opacity={0.4}
                  >
                    •
                  </Text>
                  <Text
                    fontSize={"sm"}
                    fontWeight={"normal"}
                    textAlign={"left"}
                    opacity={0.4}
                  >
                    {formattedDate}
                  </Text>
                </Stack>
              </Stack>
            </Flex>
          </Stack>
          <Divider borderColor="black" opacity={0.6} />
        </Stack>
        <Stack style={{ ...sourceSerifFour.style, lineHeight: 2 }}>
          <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
            {content.content}
          </Markdown>
        </Stack>
      </Flex>
    </Center>
  );
};

export default PostContent;
