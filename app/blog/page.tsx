import React from "react";
import { readPosts } from "./actions";
import Card from "@/components/ui/card";
import { Post } from "@/api/types";
import {
  Box,
  Flex,
  Heading,
  Tag,
  Text,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

const Blog = async () => {
  redirect("/");

  const postsContent = await readPosts();
  const posts = postsContent.data.map((p) => p.attributes);
  return (
    <Flex flexDir={"column"} gap={12}>
      <Stack flexDir={"column"}>
        <Heading size={"2xl"} marginBottom={4}>
          Blog
        </Heading>
        <Heading size="md" fontWeight={"normal"}>
          Checkout some of the blog posts to get a feel of what to expect
        </Heading>
      </Stack>
      <Stack gap={6}>
        <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={{ base: 4, sm: 4, lg: 6 }}>
          {posts.map((post, key) => (
            <BlogPost key={key} post={post} />
          ))}
        </SimpleGrid>
      </Stack>
    </Flex>
  );
};

const BlogPost = ({ post }: { post: Post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
  <Card
    variant={"whiteShadow"}
    position={"relative"}
    flexDir={"row"}
    justifyContent={"space-between"}
    style={{ display: "flex", flexDirection: "column", minHeight: 200 }}
  >
        <Flex
          flexDir="row"
          justifyContent="space-between"
          style={{ flex: 1 }}
          gap={4}
        >
          <Flex flexDir={"column"} gap={2}>
            <Tag
              w={"fit-content"}
              size={"sm"}
              bg="glowstone.500"
              letterSpacing={1}
              mr={2}
              maxWidth={{ base: "100%", md: "fit-content" }}
              whiteSpace="nowrap"
            >
              Blog
            </Tag>
            <Heading size={"md"}>{post.title}</Heading>
            <Text>{post.description}</Text>
          </Flex>
          <Flex minW={"25%"} justifyContent={"center"}>
            <Image
              alt={"Post Thumbnail"}
              width={150}
              height={150}
              src={post.thumbnail?.data ?? "https://picsum.photos/300/200"}
            />
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};

export default Blog;
