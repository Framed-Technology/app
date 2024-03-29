"use server";

import { strapi } from "@/api";
import { Post, StrapiContentResponse } from "@/api/types";

export const readPostBySlug = async (
  slug: string
): Promise<StrapiContentResponse<Post>> => {
  const res = await strapi.get("/api/posts", {
    params: {
      populate: "*",
      "filters[slug][$eq]": slug,
    },
  });
  return res.data;
};
