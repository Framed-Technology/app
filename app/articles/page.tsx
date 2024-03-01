import React, { useEffect } from "react";
import { readArticles } from "./actions";
import { Flex, Text, Heading, SimpleGrid, Box, Avatar } from "@chakra-ui/react";
import { Article } from "@/api/types";
import { colors } from "@/theme";
import Image from "next/image";
import Link from "next/link";

const Articles = async () => {
  const articles = await readArticles();
  return (
    <Flex flexDir={"column"} gap={4}>
      <Heading>Articles</Heading>
      <SimpleGrid minChildWidth="350px" spacing="30px">
        {articles.data.map((content) => (
          <ArticleCard
            key={content.id}
            id={content.id}
            article={content.attributes}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

const ArticleCard = ({ id, article }: { id: number; article: Article }) => (
  <Link href={`/articles/${id}`}>
    <Flex
      className="transition hover:scale-105 hover:bg-hollywood-500"
      borderColor={"black"}
      borderWidth={2}
      textColor={"white"}
      flexDir={"column"}
      p={6}
      gap={4}
      bg={colors["pink-salmon"][400]}
      shadow={"5px 5px 0 black"}
    >
      <Flex flexDir={"column"}>
        <Heading fontSize={"xl"}>{article.Title}</Heading>
        <Text>Quick Description Should go here?</Text>
      </Flex>
      <Image
        src="https://picsum.photos/300/200"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        alt="Article Thumbnail"
      />
      <Flex
        flexDir={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Avatar src="https://bit.ly/ryan-florence" size={"sm"} />
        <Text>{new Date(article.publishedAt).toDateString()}</Text>
      </Flex>
    </Flex>
  </Link>
);

export default Articles;
