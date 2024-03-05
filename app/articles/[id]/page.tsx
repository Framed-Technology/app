import React from "react";
import { readArticleById } from "./actions";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";

type Props = {
  params: {
    id: number;
  };
};
const Article = async (props: Props) => {
  const articles = await readArticleById(props.params.id);
  if (articles.data.length === 0) {
    return <>TODO: Redirect to 404</>;
  }
  const article = articles.data[0].attributes;

  return (
    <Flex
      p={4}
      borderWidth={2}
      borderColor={"black"}
      shadow={"5px 5px 0 black"}
      flexDir={"column"}
      gap={4}
    >
      <Flex
        flexDir={{base: "column", md: "row"}}
        justifyContent={{base: "start", md: "space-between"}}
        alignItems={"start"}
        borderBottomWidth={2}
        borderColor={"gray.200"}
        w="full"
        pb={2}
      >
        <Box>
          <Heading>{article.title}</Heading>
          <Text>The same description should go here</Text>
          <Text fontSize={"small"} fontStyle={"italic"}>
            {new Date(article.publishedAt).toDateString()}
          </Text>
        </Box>
        <Flex
          flexDir={"column"}
          alignItems={"end"}
          justifyContent={"end"}
          gap={2}
          pt={2}
        >
          <Avatar
            src={article.authorAvatar ?? "https://bit.ly/ryan-florence"}
            size={"sm"}
          />
        </Flex>
      </Flex>
      <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {article.articleMarkdown}
      </Markdown>
    </Flex>
  );
};

export default Article;
