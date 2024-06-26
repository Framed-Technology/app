import React from "react";
import { readArticleBySlug } from "./actions";
import ArticleContent from "@/components/ui/article-content";

type PostProps = {
  params: {
    slug: string;
  };
};

const PostPage = async ({ params }: PostProps) => {
  const slug = params.slug;
  const postResponse = await readArticleBySlug(slug);
  const post = postResponse.data[0].attributes;
  return <ArticleContent content={post} />;
};

export default PostPage;
