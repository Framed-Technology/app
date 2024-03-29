"use server";

import { strapi } from "@/api";
import { Post, StrapiContentResponse } from "@/api/types";

export const readPosts = async (): Promise<StrapiContentResponse<Post>> => {
  const res = await strapi.get("/api/posts", {
    params: {
      populate: "*",
      sort: "publishedAt:desc",
    },
  });
  return res.data;
};
