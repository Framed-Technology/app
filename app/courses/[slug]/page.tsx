import React from "react";
import { readPathBySlug } from "./actions";
import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
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

  if (path.data.length != 1) {
    return <>No articles for path</>;
  }
  const pathData = path.data[0].attributes;
  const pathArticles = pathData.articles?.data.map((a) => a.attributes)!;
  const numArticles = pathArticles?.length ?? 0;

  return (
    <Flex
      gap={3}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Image
        src={platypusLogo}
        height={100}
        width={100}
        alt="Magenta Platypus"
      />{" "}
      <Flex
        flexDir={"column"}
        gap={1}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading>{pathData.title}</Heading>
        <Text fontSize={"xs"}>
          {numArticles} ARTICLE{numArticles > 1 && "S"}
        </Text>
      </Flex>
      <Text>{pathData.description}</Text>
      <ArticleScroll articles={pathArticles} />
    </Flex>
  );
};


export default Article;
