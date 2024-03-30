import React from "react";
import { readPosts } from "./actions";
import Card from "@/components/ui/card";
import { Post } from "@/api/types";
import { Box, Flex, Heading, Tag, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

const Blog = async () => {
  const postsContent = await readPosts();
  const posts = postsContent.data.map((p) => p.attributes);
  return (
    <Box>
      {posts.map((post, key) => (
        <BlogPost key={key} post={post} />
      ))}
    </Box>
  );
};

const BlogPost = ({ post }: { post: Post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card variant="whiteShadow">
        <Flex
          flexDir={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Flex
            gap={2}
            flexDir={"column"}
            justifyContent={"start"}
            alignItems={"baseline"}
          >
            <Tag colorScheme="glowstone">Blog</Tag>
            <Heading size={"md"}>{post.title}</Heading>
            <Text>{post.subTitle}</Text>
          </Flex>
          <Image
            alt={"Post Thumbnail"}
            width={300}
            height={200}
            src={post.thumbnail?.data ?? "https://picsum.photos/300/200"}
          />
        </Flex>
      </Card>
    </Link>
  );
};

export default Blog;
