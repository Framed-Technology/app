import { Article } from "@/api/types";
import Card from "./card";
import { Heading } from "@chakra-ui/react";
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const ArticleContent = ({ content }: { content: Article }) => {
  return (
    <Card variant={"whiteShadow"} flexDir={"column"}>
      <Heading>{content.title}</Heading>
      <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {content.content}
      </Markdown>
    </Card>
  );
};

export default ArticleContent;
