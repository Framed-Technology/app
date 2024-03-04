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
      <Flex
        flexDir={"column"}
        gap={4}
        p={4}
        bg={"lily-white.100"}
        shadow={"5px 5px 0 black"}
        borderWidth={2}
        borderColor={"black"}
      >
        <SimpleGrid
          minChildWidth={{ base: "250px", md: "350px" }}
          spacing="20px"
        >
          {articles.data.map((content) => (
            <ArticleCard
              key={content.id}
              id={content.id}
              article={content.attributes}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

const ArticleCard = ({ id, article }: { id: number; article: Article }) => (
  <Link href={`/articles/${id}`} className="h-full">
    <Flex
      className="transition hover:scale-[102%] hover:bg-hollywood-500"
      borderColor={"black"}
      borderWidth={2}
      textColor={"white"}
      flexDir={"column"}
      p={4}
      gap={4}
      bg={colors["pink-salmon"][400]}
      shadow={"5px 5px 0 black"}
      h={"full"}
      justifyContent={"space-between"}
    >
      <Flex flexDir={"column"}>
        <Heading fontSize={"xl"}>{article.title}</Heading>
        <Text>{article.description}</Text>
      </Flex>
      <Box minH={150} w="full">
        <Image
          src="https://picsum.photos/300/200"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt="Article Thumbnail"
        />
      </Box>
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
