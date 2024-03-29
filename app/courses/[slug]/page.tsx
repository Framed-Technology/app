import React from "react";
import { readPathBySlug } from "./actions";
import { Box, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import "katex/dist/katex.min.css";
import Image from "next/image";
import platypusLogo from "../../../public/platypus.svg";
import ArticleScroll from "./article-scroll";

type Props = {
  params: {
    slug: string;
  };
};

const Article = async (props: Props) => {
  const path = await readPathBySlug(props.params.slug);

  if (path.data.length !== 1) {
    return <>No articles for path</>;
  }
  const pathData = path.data[0].attributes;
  const pathArticles = pathData.articles?.data.map((a) => a.attributes)!;
  const numArticles = pathArticles?.length ?? 0;

  return (
    <Flex
      gap={12}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack flexDir={"column"} alignItems={"center"} gap={4}>
        <Image
          src={platypusLogo}
          height={100}
          width={100}
          alt="Magenta Platypus"
        />{" "}
        <Flex
          flexDir={"column"}
          gap={4}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Heading size={"xl"} mt={4}>
            {pathData.title}
          </Heading>
          <Heading fontSize="lg" fontWeight={"normal"}>
            {pathData.description}
          </Heading>
          <Text fontSize={"sm"} textColor={"black"} opacity={0.4}>
            {numArticles} ARTICLE{numArticles != 1 && "S"}
          </Text>
        </Flex>
      </Stack>
      <ArticleScroll articles={pathArticles} />
      <Flex flexDir={"column"}>
        <Heading size={"lg"} marginBottom={4} marginTop={8}>
          Disclaimer
        </Heading>
        <Text fontSize="md">
          This may or may not be a disclaimer which clearly states that this is
          not financial advice{" "}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Article;
