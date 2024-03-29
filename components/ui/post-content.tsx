import { Post } from "@/api/types";
import Card from "./card";
import { Heading } from "@chakra-ui/react";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const PostContent = ({ content }: { content: Post }) => {
  return (
    <Card variant={"whiteShadow"} flexDir={"column"}>
      <Heading>{content.title}</Heading>
      <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {content.content}
      </Markdown>
    </Card>
  );
};

export default PostContent;
