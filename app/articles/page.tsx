import React, { useEffect } from "react";
import { readArticles } from "./actions";
import { Flex, Text, Heading, SimpleGrid, Box, Avatar } from "@chakra-ui/react";
import { Article } from "@/api/types";
import { colors } from "@/theme";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/card";

const Articles = async () => {
  const articles = await readArticles();
  return (
    <Flex flexDir={"column"} gap={4}>
      <Heading>Articles</Heading>
      <Flex gap={4} flexDir={"column"}>
        {articles.data.map((content) => (
          <ArticleCard
            key={content.id}
            id={content.id}
            article={content.attributes}
          />
        ))}
      </Flex>
    </Flex>
  );
};

const ArticleCard = ({ id, article }: { id: number; article: Article }) => (
  <Link href={`/articles/${id}`} className="h-full">
    <Card>
      <Flex
        textColor={"white"}
        flexDir={"row"}
        gap={4}
        justifyContent={"space-between"}
      >
        <Flex w={"60%"} flexDir={"column"} justifyContent={"space-between"}>
          <Box>
            <Heading fontSize={"xl"}>{article.title}</Heading>
            <Text color={"black"}>{article.description}</Text>
          </Box>
          <Flex
            gap={2}
            flexDir={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <Avatar src="https://bit.ly/ryan-florence" size={"sm"} />
            <Text>{new Date(article.publishedAt).toDateString()}</Text>
          </Flex>
        </Flex>
        <Box w={"40%"}>
          <Image
            src="https://picsum.photos/300/200"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="Article Thumbnail"
          />
        </Box>
      </Flex>
    </Card>
  </Link>
);

export default Articles;
