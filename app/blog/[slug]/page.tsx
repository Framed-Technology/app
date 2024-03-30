import React from "react";
import { readPostBySlug } from "./actions";
import PostContent from "@/components/ui/post-content";

type PostProps = {
  params: {
    slug: string;
  };
};

const PostPage = async ({ params }: PostProps) => {
  const slug = params.slug;
  const postResponse = await readPostBySlug(slug);
  const post = postResponse.data[0].attributes;
  return <PostContent content={post} />;
};

export default PostPage;
